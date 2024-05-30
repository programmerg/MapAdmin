<?php

namespace App;

class Request {

  private $method = 'GET';
  private $url = '';
  private $path = '';
  private $header = [];
  private $body = [];

  public function __get (string $name) {
    return $this->$name ?? null;
  }

  /**
   * Request promerties are readonly
   */
  public function __set (string $name, $value) {
    return $value;
  }

  /**
   * Get information about the request
   */
  public function __construct() {

    // Detect the HTTP method
    if (isset($_SERVER['REQUEST_METHOD'])) {
      $this->method = strtoupper(trim($_SERVER['REQUEST_METHOD']));
    }
    // in some cases special requests are hidden inside a POST
    if ($this->method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
      if (in_array($_SERVER['HTTP_X_HTTP_METHOD'], ['OPTIONS', 'PUT', 'PATCH', 'DELETE'])) {
        $this->method = $_SERVER['HTTP_X_HTTP_METHOD'];
      }
    }
    
    $this->protocol = $_SERVER['SERVER_PROTOCOL'] ?? '';
    $this->scheme = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != '') ? 'https://' : 'http://';
    $this->port = $_SERVER['SERVER_PORT'] ?? '';
    $this->host = str_replace(':'.$this->port, '', $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? $_SERVER['SERVER_ADDR']);
    $this->path = str_replace('?', '/', $_SERVER['REQUEST_URI']);
    $this->url = $this->scheme . $this->host . (!in_array($this->port, ['80', '443']) ? ':'.$this->port : '') . $this->path;

    // Collect the request headers
    if (function_exists('getallheaders')) {
      $this->header = getallheaders();
    } 
    else {
      foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
          $key = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
          $this->header[$key] = $value;
        }
      }
    }

    // Collect the request data
    switch ($this->method) {
      case 'OPTIONS': // 
      case 'HEAD':    // same with GET but must not contain body
      case 'GET':     // read
      case 'DELETE':  // delete

        // HEAD, OPTIONS and DELETE are not standard in PHP, so we find the url params in GET
        $this->body = &$_GET; // KVP=key-value-pairs
        break;

      case 'POST':    // create
      case 'PUT':     // update - replace
      case 'PATCH':   // update - modify

        // GET and POST are standard in PHP, others needs some raw data hack
        $content_type = isset($_SERVER['CONTENT_TYPE']) ? strtolower($_SERVER['CONTENT_TYPE']) : '';
        switch ($content_type) {
          case 'application/json':
          case 'application/json;charset=utf-8':
            $this->body = @json_decode(file_get_contents('php://input'), true);
            break;
          case 'text/xml':
            $this->body = @simplexml_load_string(file_get_contents('php://input'));
            break;
          case 'application/x-www-form-urlencoded':
            parse_str(urldecode(file_get_contents('php://input')), $this->body);
            break;
          case 'multipart/form-data':
          default:
            if ($this->method === 'POST') {
              $this->body = &$_POST;
            } else {
              $this->body = $this->parse_raw_query(file_get_contents('php://input'));
            }
            break;
        }
        break;
    }
    
    // Convert all URL parts to lowercase
    if (is_array($this->body)) {
      $this->body = array_change_key_case($this->body, CASE_LOWER);
    }
  }

  public function parse_raw_query($input) {
    $result = [];

    // grab multipart boundary from content type header
    preg_match('/boundary=(.*)$/', $_SERVER['CONTENT_TYPE'], $matches);

    // content type is probably regular form-encoded
    if (!count($matches)) {
      parse_str(urldecode($input), $result);
      return $result;
    }

    if (!strpos($input, $matches[1])) {
      parse_str($input, $result);
      return $result;
    }

    // split content by boundary and get rid of last -- element
    $boundary = $matches[1];
    $blocks = preg_split("/-+".preg_quote($boundary)."/", $input);
    array_pop($blocks);

    // loop data blocks
    foreach ($blocks as $key => $block) {
      if (trim($block) === '') continue;
      
      if (strpos($block, 'application/octet-stream') !== false) {
        // match "name", then everything after "stream" (optional) except for prepending newlines
        preg_match('/name=\"([^\"]*)\".*stream[\n|\r]+([^\n\r].*)?$/s', $block, $match);
        $result[$match[1]] = (isset($match[2]) ? $match[2] : '');

      } elseif (strpos($block, 'filename') !== false) {
        //$this->file_stream($block);

        // match "name" and optional value in between newline sequences
        preg_match('/name=\"([^\"]*)\"; filename=\"([^\"]*)\"[\n|\r]+([^\n\r].*)?\r$/s', $block, $matches);
        preg_match('/Content-Type: (.*)?/', $matches[3], $mime);
        
        if ($matches[2] == "") continue;

        $file = preg_replace('/Content-Type: (.*)[^\n\r]/', '', $matches[3]);
        //$path = sys_get_temp_dir().'/php'.substr(sha1(rand()), 0, 6);
        $path = tempnam(ini_get('upload_tmp_dir') ? ini_get('upload_tmp_dir') : sys_get_temp_dir(), 'php');
        $err = file_put_contents($path, ltrim($file));

        // Did the user use the infamous for multiple file uploads?
        if (preg_match('/^(.*)\[\]$/i', $matches[1], $tmp)) {
          $name = $tmp[1];
        } else {
          $name = $matches[1];
        }

        // Create the remainder of the $_FILES super global
        $_FILES[$name]['name'][] = $matches[2];
        $_FILES[$name]['type'][] = $mime[1];
        $_FILES[$name]['tmp_name'][] = $path;
        $_FILES[$name]['error'][] = ($err === FALSE) ? $err : 0;
        $_FILES[$name]['size'][] = filesize($path);

      } else { // all other fields
        // match "name" and optional value in between newline sequences
        if (preg_match('/name=\"([^\"]*)\"[\n|\r]+([^\n\r].*)?\r$/s', $block, $match)) {
          if (preg_match('/^(.*)\[\]$/i', $match[1], $tmp)) {
            $result[$tmp[1]][] = (isset($match[2]) ? $match[2] : '');
          } else {
            $result[$match[1]] = (isset($match[2]) ? $match[2] : '');
          }
        }
      }
    }

    return $result;
  }

  private function file_stream($data) {

    $data = ltrim($data);
    $idx = strpos($data, "\r\n\r\n");
    if ($idx !== false) {
      $headers = substr($data, 0, $idx);
      $content = substr($data, $idx + 4, -2); // Skip the leading \r\n and strip the final \r\n

      $name = '-unknown-';
      $filename = '-unknown-';
      $filetype = 'application/octet-stream';

      $header = strtok($headers, "\r\n");
      while ($header !== false) {
        if (substr($header, 0, strlen("Content-Disposition: ")) == "Content-Disposition: ") {
          // Content-Disposition: form-data; name="attach_file[TESTING]"; filename="label2.jpg"
          if (preg_match('/name=\"([^\"]*)\"/', $header, $nmatch)) {
            // Did the user use the infamous for multiple file uploads?
            if (preg_match('/^(.*)\[\]$/i', $nmatch[1], $tmp)) {
              $name = $tmp[1];
            } else {
              $name = $nmatch[1];
            }
          }
          if (preg_match('/filename=\"([^\"]*)\"/', $header, $nmatch)) {
            $filename = $nmatch[1];
          }
        } elseif (substr($header, 0, strlen("Content-Type: ")) == "Content-Type: ") {
          // Content-Type: image/jpg
          $filetype = trim(substr($header, strlen("Content-Type: ")));
        }

        $header = strtok("\r\n");
      }

      if (substr($data, -2) === "\r\n") {
        $data = substr($data, 0, -2);
      }

      //$path = sys_get_temp_dir() . '/php' . substr(sha1(rand()), 0, 6);
      $path = tempnam(ini_get('upload_tmp_dir') ? ini_get('upload_tmp_dir') : sys_get_temp_dir(), 'php');

      $bytes = file_put_contents($path, $content);

      // Create the remainder of the $_FILES super global
      $_FILES[$name]['name'][] = $filename;
      $_FILES[$name]['type'][] = $filetype;
      $_FILES[$name]['tmp_name'][] = $path;
      $_FILES[$name]['error'][] = ($bytes !== false) ? UPLOAD_ERR_NO_FILE : UPLOAD_ERR_OK;
      $_FILES[$name]['size'][] = $bytes;
    }
  }

  public function getHeaders() {
    return $this->header;
  }

  public function hasHeader($key) {
    $key = ucwords(strtolower($key));
    return isset($this->header[$key]);
  }

  public function getHeader($key) {
    $key = ucwords(strtolower($key));
    $header = $this->header[$key] ?? null;
    return is_array($header) ? $header : [$header];
  }

  public function getHeaderLine($key) {
    $key = ucwords(strtolower($key));
    $header = $this->header[$key] ?? null;
    return is_array($header) ? implode(',', $header) : $header;
  }

  public function getBody() {
    return $this->body;
  }

  public function getMethod() {
    return $this->method;
  }

  public function withMethod($value) {
    $this->method = $value;
    return $this;
  }

  public function getUri() {
    return $this->url;
  }

  public function withUri($uri) {
    $this->url = $uri;
    return $this;
  }

}

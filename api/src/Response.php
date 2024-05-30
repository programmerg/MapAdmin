<?php

namespace App;

class Response {
  
  private $status = 200;
  private $format = '';
  private $header = [];
  private $body;

  public function __get (string $name) {
    return $this->$name ?? null;
  }

  /**
   * Request promerties are readonly
   */
  public function __set (string $name, $value) {
    return $value;
  }

  public static $statusCodes = [
    // SUCCESS
    200 => 'OK',                    // << success
    201 => 'Created',               
		202 => 'Accepted',
	//203 => 'Non-Authoritative Information',
    204 => 'No Content',
		205 => 'Reset Content',
		206 => 'Partial Content',

    // REDIRECTION
	//300 => 'Multiple Choices',
		301 => 'Moved Permanently',     // << moved
		302 => 'Found',
	//303 => 'See Other',
    304 => 'Not Modified',
	//305 => 'Use Proxy',
	//306 => '(Not used)',
		307 => 'Temporary Redirect',    // << redirect

    // CLIENT ERROR
    400 => 'Bad Request',           // << failed
    401 => 'Unauthorized',          // << unauthorized
		402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable', // Accept header
	//407 => 'Proxy Authentication Required',
	//408 => 'Request Timeout',
    409 => 'Conflict',
	//410 => 'Gone',
	//411 => 'Length Required',
	//412 => 'Precondition Failed',
	//413 => 'Request Entity Too Large',
	//414 => 'Request-URI Too Long',
    415 => 'Unsupported Media Type', // client sends unknown format
	//416 => 'Requested Range Not Satisfiable',
	//417 => 'Expectation Failed',
    429 => 'Too Many Requests',

    // SERVER ERROR
    500 => 'Internal Server Error',
    501 => 'Not Implemented',
	//502 => 'Bad Gateway',
    503 => 'Service Unavailable',
	//504 => 'Gateway Timeout',
	//505 => 'HTTP Version Not Supported',
  ];

  public static $mimeTypes = [
    'html' => 'text/html',
    'text' => 'text/plain',
    'xml' => 'application/xml',
    'json' => 'application/json',
  ];
  
  public function getStatusCode() {
    return $this->status;
  }

  public function status($value) {
    $this->status = intval($value);
    return $this;
  }

  public function withStatus($status) {
    $this->status = intval($status);
    return $this;
  }

  public function header($key, $value) {
    $key = ucwords(strtolower($key));
    $this->header[$key] = $value;
    return $this;
  }

  public function withHeader($key, $value) {
    $key = ucwords(strtolower($key));
    $this->header[$key] = $value;
    return $this;
  }

  public function withoutHeader($key) {
    $key = ucwords(strtolower($key));
    unset($this->header[$key]);
    return $this;
  }

  public function withAddedHeader($key, $value) {
    $key = ucwords(strtolower($key));
    if (!is_array($this->header[$key])) {
      $this->header[$key] = [$this->header[$key]];
    }
    $this->header[$key][] = $value;
    return $this;
  }

  public function getBody() {
    return $this->body;
  }

  public function body($value) {
    $this->body = $value;
    return $this;
  }

  public function withBody($value) {
    $this->body = $value;
    return $this;
  }

  public function format($value) {
    $this->format = $value;
    return $this;
  }

  public function redirect($destination) {
    $this->status(302)->header('Location', $destination)->render();
  }

  public function exception($name, $text, $code) {
    $accept = strtolower(str_replace(' ', '', $_SERVER['HTTP_ACCEPT']));
    if ($this->format === 'html' || (
      $this->format == '' && !strstr($accept, 'application/json')
    )) {
      $body = "<h1>$name</h1><p>$text</p>";
    } else {
      $body = (object)[
        'exceptions' => [ 
          (object)['code' => $name, 'text' => $text] 
        ]
      ];
    }
    $this->status($code)->body($body)->render();
  }

  /**
   * Write the response to the output
   */
  public function render() {

    // Set HTTP status code
    header('HTTP/1.1 ' . $this->status . ' ' . (
      isset(self::$statusCodes[$this->status]) 
      ? self::$statusCodes[$this->status] 
      : 'unknown'
    ));

    // Try to determine the output format, when not set
    if ($this->format == '') {
      $accept = strtolower(str_replace(' ', '', $_SERVER['HTTP_ACCEPT']));
      if (strstr($accept, 'application/json')) $this->format = 'json';
      else if (strstr($accept, 'text/html')) $this->format = 'html';
      else if (strstr($accept, 'application/xml')) $this->format = 'xml';
      else $this->format = 'json';
    }

    // Set the content-type header
    header('Content-Type: ' . (
      isset(self::$mimeTypes[$this->format])
      ? self::$mimeTypes[$this->format]
      : ''
    ) . '; charset=utf-8');

    // Set additional headers
    foreach ($this->header as $key => $value) {
      if (is_array($value)) $value = implode(',', $value);
      header("$key: $value");
    }

    // Create the body string
    $body = '';
    if (is_string($this->body)) {
      $body = $this->body; // text
    }
    else {
      if ($this->format == 'xml') {
        $body = self::xml_encode($this->body);
      }
      else {
        $body = json_encode($this->body, JSON_UNESCAPED_UNICODE);
      }
    }
        
    $obStatus = ob_get_status();
    if ($obStatus['buffer_used'] < 1) {
      header('Content-Length: ' . strlen($body));
    }

    // Cacheing
    header('Cache-Control: private');
    if (strtoupper(trim($_SERVER['REQUEST_METHOD'])) == 'GET') {
      $hash = md5($body);
      header('ETag: "' . $hash . '"');
      // Save bandwith when nothing changed
      if (@trim($_SERVER['HTTP_IF_NONE_MATCH']) == $hash) {
        header('HTTP/1.1 304 Not Modified');
        exit;
      }
    }
    header_remove("Expires");
    header_remove("Pragma");
    header_remove('X-Powered-By');
    
    // Compressing
    // if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) {
    //   ob_start("ob_gzhandler");
    // }

    // Write data to the output and close the output
    echo $body;
    exit;
  }
  
  // functions adopted from http://www.sean-barton.co.uk/2009/03/turning-an-array-or-object-into-xml-using-php/
  public static function xml_encode($obj_or_array, $node_block='nodes', $node_name='node') {
    if (is_object($obj_or_array)) 
      self::generateValidXmlFromObj($obj_or_array, $node_block, $node_name);
    else
      self::generateValidXmlFromArray((array)$obj_or_array, $node_block, $node_name);
  }

  private static function generateValidXmlFromObj(\stdClass $obj, $node_block='nodes', $node_name='node') {
    $arr = get_object_vars($obj);
    return self::generateValidXmlFromArray($arr, $node_block, $node_name);
  }

  private static function generateValidXmlFromArray($array, $node_block='nodes', $node_name='node') {
    $xml = '<?xml version="1.0" encoding="UTF-8" ?>';
    $xml .= '<' . $node_block . '>';
    $xml .= self::generateXmlFromArray($array, $node_name);
    $xml .= '</' . $node_block . '>';
    return $xml;
  }

  private static function generateXmlFromArray($array, $node_name) {
    $xml = '';
    if (is_array($array) || is_object($array)) {
      foreach ($array as $key=>$value) {
        if (is_numeric($key)) {
          $key = $node_name;
        }
        $xml .= '<' . $key . '>' . self::generateXmlFromArray($value, $node_name) . '</' . $key . '>';
      }
    } else {
      $xml = htmlspecialchars($array, ENT_QUOTES);
    }
    return $xml;
  }

}

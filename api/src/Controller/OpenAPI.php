<?php

namespace App\Controller;

use App\Controller;
use App\Router;
use App\Request;
use App\Response;

class OpenAPI extends Controller {

  protected $app;

  public function __construct(Router $app) {
    $this->app = $app;
  }

  public function generateDocument(Request $request, Response $response, array $args = []) {
    $document = [
      'swagger' => '2.0',
      'info' => (object)[
        "description" => "",
        "version" => "1.0.0",
        "title" => "",
        "termsOfService" => "",
        "contact" => (object)[
          "email" => ""
        ],
        "license" => (object)[
          "name" => "Apache 2.0",
          "url" => "http://www.apache.org/licenses/LICENSE-2.0.html"
        ]
      ],
      'host' => parse_url($request->url, PHP_URL_HOST),
      'basePath' => $request->path,
      'schemes' => [ parse_url($request->url, PHP_URL_SCHEME) ],
      'tags' => [],
      'paths' => [],
      'definitions' => []
    ];
    $this->detectEndpoints($document);

    return $response
            ->format('json')
            ->body(json_encode($document));
  }

  private function detectEndpoints(&$document) {
    foreach ($this->app->getRoutes() as $url => $route) {
      foreach ($route as $method => $action) {
        list ($controller, $middlewares) = $action;

        if (is_array($controller) && class_exists($controller[0])) {
          if (!array_search($controller[0], array_column($document['tags'], 'name'))) {
            $document['tags'][] = (object)[
              'name' => $controller[0],
              'description' => ''
            ];
          }
          
          $attachedModel = call_user_func([$controller[0], 'getAttachedModel']);
          if (is_object($attachedModel) && !array_search($attachedModel, array_keys($document['definitions']))) {
            $document['definitions'][$attachedModel] = [
              'type' => 'object',
              'properties' => (object)$attachedModel->attributes,
              'xml' => (object)['name' => $attachedModel]
            ];
          }
        }

        if (!isset($document['paths'][$url])) $document['paths'][$url] = [];
        $document['paths'][$url][$method] = (object)[
          "tags" => (is_array($controller) && class_exists($controller[0])) ? [ $controller[0] ] : [],
          "summary" => "",
          "description" => "",
          "operationId" => (is_array($controller) && class_exists($controller[0])) ? $controller[1] : '',
          "consumes" => [ "application/json", "application/xml" ],
          "produces" => [ "application/json", "application/xml" ],
          "parameters" => [
            /*
            (object)[
              "in" => "body",
              "name" => "body",
              "description" => "Pet object that needs to be added to the store",
              "required" => true,
              "schema" => (object)[
                '$ref' => "#/definitions/Pet"
              ]
            ]
            */
          ],
          "responses" => (object)[
            "405" => (object)[
              "description" => "Invalid input"
            ]
          ],
          "security" => []
        ];
      }
    }
    return $document;
  }

}

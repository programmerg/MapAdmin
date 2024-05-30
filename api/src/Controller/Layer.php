<?php

namespace App\Controller;

use App\Request;
use App\Response;
use App\Controller;
use App\MapFile;

class Layer extends Controller {
  
  private static $attachedModel = \App\Model\Layer::class;

  public function create (Request $request, Response $response, ?array $args) {
    parent::create($request, $response, $args);
    MapFile::update($request);
    return $response;
  }

  public function update (Request $request, Response $response, ?array $args) {
    parent::update($request, $response, $args);
    MapFile::update($request);
    return $response;
  }

  public function delete (Request $request, Response $response, ?array $args) {
    parent::delete($request, $response, $args);
    MapFile::update($request);
    return $response;
  }

  public function listStyles (Request $request, Response $response, ?array $args) {
    // TODO: implement
    return $response;
  }

  public function deleteStyle (Request $request, Response $response, ?array $args) {
    // TODO: implement
    return $response;
  }

  public function listFields (Request $request, Response $response, ?array $args) {
    // TODO: implement
    return $response;
  }

}

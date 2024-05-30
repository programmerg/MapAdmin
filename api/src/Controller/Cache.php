<?php

namespace App\Controller;

use App\Request;
use App\Response;
use App\Controller;
use App\MapFile;

class Cache extends Controller {

  private static $attachedModel = \App\Model\Cache::class;

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

  public function list_task (Request $request, Response $response, ?array $args) {
    // TODO: implement
    return $response;
  }

  public function show_task (Request $request, Response $response, ?array $args) {
    // TODO: implement
    return $response;
  }
  
  public function run_task (Request $request, Response $response, ?array $args) {
    // TODO: implement
    return $response;
  }

}

<?php

namespace App\Controller;

use App\Request;
use App\Response;
use App\Controller;
use App\MapFile;

class Service extends Controller {
  
  private static $attachedModel = \App\Model\Setting::class;

  public function list_OWS (Request $request, Response $response, ?array $args) {
    //parent::list($request, $response, $args);
    $map = MapFile::read('mapserver.map', dirname(MapFile::$defaultPath));
    return $response->body($map->web->metadata);
  }

  public function update_OWS (Request $request, Response $response, ?array $args) {
    //parent::update($request, $response, $args);
    
    $map = MapFile::update('mapserver.map', dirname(MapFile::$defaultPath));
    return $response;
  }

  public function list_contacts (Request $request, Response $response, ?array $args) {
    parent::list($request, $response, $args);
    return $response;
  }

  public function update_contacts (Request $request, Response $response, ?array $args) {
    parent::update($request, $response, $args);
    MapFile::updateAll();
    return $response;
  }

  public function list_WMS (Request $request, Response $response, ?array $args) {
    parent::list($request, $response, $args);
    return $response;
  }

  public function update_WMS (Request $request, Response $response, ?array $args) {
    parent::update($request, $response, $args);
    MapFile::updateAll();
    return $response;
  }

  public function list_WFS (Request $request, Response $response, ?array $args) {
    parent::list($request, $response, $args);
    return $response;
  }

  public function update_WFS (Request $request, Response $response, ?array $args) {
    parent::update($request, $response, $args);
    MapFile::updateAll();
    return $response;
  }

  public function list_WCS (Request $request, Response $response, ?array $args) {
    parent::list($request, $response, $args);
    return $response;
  }

  public function update_WCS (Request $request, Response $response, ?array $args) {
    parent::update($request, $response, $args);
    MapFile::updateAll();
    return $response;
  }

  public function list_WMTS (Request $request, Response $response, ?array $args) {
    parent::list($request, $response, $args);
    return $response;
  }

  public function update_WMTS (Request $request, Response $response, ?array $args) {
    parent::update($request, $response, $args);
    MapFile::updateAll();
    return $response;
  }

}

<?php

namespace App\Controller;

use App\Request;
use App\Response;
use App\Controller;
use App\MapFile;
use Dilab\Network\SimpleRequest;
use Dilab\Network\SimpleResponse;
use Dilab\Resumable;

class Datasource extends Controller {
  
  private static $attachedModel = \App\Model\Datasource::class;

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

  public function upload (Request $request, Response $response, ?array $args) {
    $request = new SimpleRequest();
    $response = new SimpleResponse();

    $resumable = new Resumable($request, $response);
    $resumable->tempFolder = 'tmps';
    $resumable->uploadFolder = 'uploads';
    return $resumable->process();
  }

}

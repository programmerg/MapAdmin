<?php

namespace App;

class Controller {
  private static $attachedModel;

  public function __construct($opts) {
    self::getAttachedModel();
  }

  public static function getAttachedModel() {
    if (is_string(self::$attachedModel) && class_exists(self::$attachedModel)) {
      self::$attachedModel = new self::$attachedModel();
    }
    return self::$attachedModel;
  }

  /**
   * CRUD function
   */
  public function create (Request $request, Response $response, ?array $args) {
    $result = isset(self::$attachedModel) 
      ? self::$attachedModel->create($request->body)
      : null;

    return $response->body($result);
  }

  /**
   * CRUD function
   */
  public function list (Request $request, Response $response, ?array $args) {
    $results = isset(self::$attachedModel) 
      ? self::$attachedModel->all()
      : null;

    return $response->body($results);
  }

  /**
   * CRUD function
   */
  public function show (Request $request, Response $response, ?array $args) {
    $id = (isset(self::$attachedModel) && isset($args[self::$attachedModel->primaryKey]))
      ? $args[self::$attachedModel->primaryKey] 
      : null;

    $result = isset(self::$attachedModel) 
      ? self::$attachedModel->find($id)
      : null;

    return $response->body($result);
  }

  /**
   * CRUD function
   */
  public function update (Request $request, Response $response, ?array $args) {
    $id = (isset(self::$attachedModel) && isset($args[self::$attachedModel->primaryKey]))
      ? $args[self::$attachedModel->primaryKey] 
      : null;

    $result = isset(self::$attachedModel) 
      ? self::$attachedModel->save($id, $request->body)
      : null;
      
    return $response->body($result);
  }

  /**
   * CRUD function
   */
  public function delete (Request $request, Response $response, ?array $args) {
    $id = (isset(self::$attachedModel) && isset($args[self::$attachedModel->primaryKey]))
      ? $args[self::$attachedModel->primaryKey] 
      : null;

    $result = isset(self::$attachedModel) 
      ? self::$attachedModel->destroy($id)
      : null;

    return $response->body($result);
  }

}

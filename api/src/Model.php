<?php

namespace App;

use \NotORM;

/**
 * Representation of the information in the application. 
 * A Model's data is saved in the database and the class is used 
 * to handle all the business logics.
 */
class Model {

  protected $db;

  private $table = '';
  private $primaryKey = 'id';
  private $attributes = [];
  private $fillable;

	/**
   * Initialize a Database connection and add some ORM features
   * 
   * @param Database  $db           Database connection handler
   * @param string    $tableName    name of the table
   * @param string    $primaryKey   primary key
   * @param array     $attributes   columns of the table to select
   * @param array     $fillable     columns of the table to insert/update
   */
  public function __construct(
    Database $db = null, 
    string $tableName = '', 
    string $primaryKey = '', 
    array $attributes = null, 
    array $fillable = null
  ) {
    if (!isset($db)) {
      $db = Database::connect();
    }
    $this->db = $db;

    if (!isset($this->table)) {
      $this->table = ($tableName != '') 
        // use the name from the arguments
        ? strtolower($tableName)
        // or convert CamelCase class name to snake_case + 's'
        : ltrim(strtolower(preg_replace('/[A-Z]([A-Z](?![a-z]))*/', '_$0', __CLASS__)), '_').'s';
    }
    
    if (!isset($this->primaryKey)) {
      $this->primaryKey = ($primaryKey != '') ? $primaryKey : 'id';
    }
    
    $indexed = array_values($attributes) === $attributes;
    $class = new \ReflectionClass($this);
    // consider only public properties of the providen 
    foreach ($class->getProperties(\ReflectionProperty::IS_PUBLIC) as $property) { 
      $propertyName = $property->getName();
      if (empty($this->attributes)) $this->attributes[] = $propertyName;
      if ($indexed && isset($attributes[$propertyName])) $this->{$propertyName} = $attributes[$propertyName];
    }

    if (!isset($this->attributes)) {
      $this->attributes = !empty($attributes) ? $attributes : ['*'];
    }

    if (!isset($this->fillable)) {
      $this->fillable = !empty($fillable) ? $fillable : null;
    }
  }

  public function __call($method, $args) {
    return call_user_func_array([
      $this->db->table($this->table), 
      $method
    ], $args);
  }

  public function find($id = null) {
    $id = isset($id) ? $id : $this->{$this->primaryKey};
    return $this->db
      ->table($this->table)
      ->select(implode(', ', $this->attributes))
      ->where($this->primaryKey . " = ?", [$id]);
  }

  public function find_($id = null) {
    $id = isset($id) ? $id : $this->{$this->primaryKey};
    $results = $this->db
      ->select($this->table, [], $this->attributes, [[$this->primaryKey, '=', $id]]);
		return (count($results) == 1) ? $results[0] : null;
  }

  public function all() {
    return $this->db
      ->table($this->table)
      ->select(implode(', ', $this->attributes));
  }

  public function all_() {
    return $this->db
      ->select($this->table, [], $this->attributes, null, null, ['1']);
  }

  public function save($id = null, $data = null) {
    $id = isset($id) ? $id : $this->{$this->primaryKey};
    $record = $this->parseRecordData($data);
    if (!isset($id)) {
      return $this->db
        ->table($this->table)
        ->insert($record);
    }
    else {
      return $this->db
        ->table($this->table)
        ->select(implode(', ', $this->attributes))
        ->where($this->primaryKey . " = ?", [$id])
        ->update($record);
    }
  }

  public function save_($id = null, $data = null) {
    $id = isset($id) ? $id : $this->{$this->primaryKey};
    $record = $this->parseRecordData($data);
    //$record = Database::useColumns($data, $this->fillable);
    if (!isset($id)) {
      return $this->db
        ->insert($this->table, $record, $this->attributes);
    }
    else {
      return $this->db
        ->update($this->table, $record, $this->attributes, [[$this->primaryKey, '=', $id]]);
    }
  }

  public function destory($id = null) {
    $id = isset($id) ? $id : $this->{$this->primaryKey};
    return $this->db
      ->table($this->table)
      ->select(implode(', ', $this->attributes))
      ->where($this->primaryKey . " = ?", [$id])
      ->delete();
  }

  public function destroy_($id = null) {
    $id = isset($id) ? $id : $this->{$this->primaryKey};
    return $this->db
      ->delete($this->table, [], $this->attributes, [[$this->primaryKey, '=', $id]]);
  }

  private function parseRecordData(array $data) {
    $record = [];
    $attributes = isset($this->fillable) ? $this->fillable : $this->attributes;
    foreach ($attributes as $attribute) {
      if (isset($data)) {
        if (isset($data[$attribute])) {
          $record[$attribute] = $data[$attribute];
        }
      }
      else {
        if (isset($this->$attribute)) {
          $record[$attribute] = $this->$attribute;
        }
      }
    }
    return $record;
  }


}

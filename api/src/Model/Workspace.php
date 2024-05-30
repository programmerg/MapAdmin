<?php 

namespace App\Model;

use App\Model;

/**
 * Workspaces
 * @property  ?integer  id
 * @property  string    name
 */
class Workspace extends Model {
  protected $attributes = [
    'id'    => '?integer',
    'name'  => 'string'
  ];
}

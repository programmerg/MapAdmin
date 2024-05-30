<?php 

namespace App\Model;

use App\Model;

/**
 * LayerGroup
 * @property  ?integer  id
 * @property  string    name
 * @property  ?integer  parent_id
 * @property  ?integer  workspace_id
 * @property  ?integer  sortorder
 */
class LayerGroup extends Model {
  protected $attributes = [
    'id'              => '?integer',
    'name'            => 'string',
    'parent_id'       => '?integer',
    'workspace_id'    => '?integer',
    'sortorder'       => '?integer',
  ];
}

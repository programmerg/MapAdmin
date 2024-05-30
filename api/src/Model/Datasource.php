<?php 

namespace App\Model;

use App\Model;

/**
 * Datasource
 * @property  ?integer  id
 * @property  string    name
 * @property  ?string   connectiontype
 * @property  ?string   connection
 * @property  ?string   data
 * @property  ?string   datatype
 * @property  ?integer  projection
 * @property  ?float    extent
 * @property  ?string   encoding
 * @property  ?string   featureid
 * @property  ?string   geomname
 * @property  ?string   attributes
 * @property  ?string   filter
 * @property  ?string   precision
 * @property  ?string   attributions
 * @property  ?integer  workspace_id
 * @property  ?string   created_at
 * @property  ?string   updated_at
 * @property  ?string   deleted_at
 */
class Datasource extends Model {
  protected $attributes = [
    'id'              => '?integer',
    'name'            => 'string',
    'connectiontype'  => '?string',
    'connection'      => '?string',
    'data'            => '?string',
    'datatype'        => '?string',
    'projection'      => '?integer',
    'extent'          => '?float',
    'encoding'        => '?string',
    'featureid'       => '?string',
    'geomname'        => '?string',
    'attributes'      => '?string',
    'filter'          => '?string',
    'precision'       => '?string',
    'attributions'    => '?string',
    'workspace_id'    => '?integer',
    'created_at'      => '?string',
    'updated_at'      => '?string',
    'deleted_at'      => '?string',
  ];
}

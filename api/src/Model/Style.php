<?php 

namespace App\Model;

use App\Model;

/**
 * Grid
 * @property  ?integer  id
 * @property  string    name
 * @property  ?string   style
 * @property  ?string   sld
 * @property  ?string   qml
 * @property  ?string   mapfile
 * @property  ?string   openlayers
 * @property  ?string   mapbox
 * @property  ?integer  workspace_id
 */
class Style extends Model {
  protected $attributes = [
    'id'             => '?integer',
    'name'           => 'string',
    'style'          => '?string',
    'sld'            => '?string',
    'qml'            => '?string',
    'mapfile'        => '?string',
    'openlayers'     => '?string',
    'mapbox'         => '?string',
    'workspace_id'   => '?integer',
  ];
}

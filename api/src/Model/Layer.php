<?php 

namespace App\Model;

use App\Model;

/**
 * Layer
 * @property  ?integer  id
 * @property  string    name
 * @property  ?string   abstract
 * @property  ?string   keywords
 * @property  ?integer  datasource_id
 * @property  ?integer  default_style_id
 * @property  ?float    minzoom
 * @property  ?float    maxzoom
 * @property  ?bool     wfs
 * @property  ?bool     wms
 * @property  ?bool     wcs
 * @property  ?bool     tiled
 * @property  ?integer  sortorder
 * @property  ?bool     web_visible
 * @property  ?bool     web_thinclient
 * @property  ?string   web_format
 */
class Layer extends Model {
  protected $attributes = [
    'id'                => '?integer',
    'name'              => 'string',
    'abstract'          => '?string',
    'keywords'          => '?string',
    'datasource_id'     => '?integer',
    'default_style_id'  => '?integer',
    'minzoom'           => '?float',
    'maxzoom'           => '?float',
    'wfs'               => '?bool',
    'wms'               => '?bool',
    'wcs'               => '?bool',
    'tiled'             => '?bool',
    'sortorder'         => '?integer',
    'web_visible'       => '?bool',
    'web_thinclient'    => '?bool',
    'web_format'        => '?string',
  ];
}

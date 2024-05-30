<?php 

namespace App\Model;

use App\Model;

/**
 * Grid
 * @property  ?integer   id
 * @property  string     name
 * @property  ?integer   srs
 * @property  ?float     size
 * @property  ?float     resolutions
 * @property  ?float     extent
 * @property  ?float     origin
 */
class Grid extends Model {
  #[\Attribute(\Attribute::TARGET_PARAMETER)]
  protected $attributes = [
    'id'          => '?integer',
    'name'        => 'string',
    'srs'         => '?integer',
    'size'        => '?float',
    'resolutions' => '?float',
    'extent'      => '?float',
    'origin'      => '?float',
  ];
}

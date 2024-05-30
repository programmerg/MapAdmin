<?php 

namespace App\Model;

use App\Model;

/**
 * Global settings
 * @property  ?string  parameter
 * @property  ?string  value
 */
class Setting extends Model {
  protected $attributes = [
    'parameter' => '?string',
    'value'     => '?string'
  ];
}

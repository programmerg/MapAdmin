<?php

namespace App;

class Middleware {

  public function __invoke (Request $input, $next): Response { 
    // before
    $response = $next($input); 
    // after
    return $response; 
  }

}

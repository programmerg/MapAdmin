<?php

namespace App;

class Router {

  protected array   $allowedMethods;
  protected string  $basePath;
  protected array   $middlewares;
  protected array   $container;
  protected array   $routes;
  protected array   $commands;
  protected         $fallback;
  protected         $fallbackCmd;

  /**
   * Create a new Router instance
   *
   * @param   array  $opts  Optional options. If not provided the default values are:
   * 
   * ```php
   * $app = new Router([
   *    'allowedMethods'  => ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   *    'middlewares'     => [[Middleware1::class, 'method1'], ...],
   *    'container'       => [Class1::class => new Class1(), ...],
   *    'basePath'        => 'basepath/',
   * ]);
   * ```
   */
  public function __construct(?array $opts = []) {

    $this->allowedMethods = isset($opts['allowedMethods']) 
      ? array_map('strtoupper', (array)$opts['allowedMethods'])
      : ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    $this->basePath = rtrim((string)($opts['basePath'] ?? '/'), '/');

    $this->routes = [];

    $this->commands = [];

    $this->middlewares = $opts['middlewares'] ?? [];

    $this->container = $opts['container'] ?? [];
    $this->container[Router::class] = $this;

    $this->fallback = function (Request $request, Response $response, array $args = []) {
      if (!in_array($request->method, $this->allowedMethods)) {
        return $response->exception('NotAllowed', "Requested method '$request->method' not allowed", 404);
      }
      return $response->exception('NotFound', "Requested URL '$request->path' not found", 404);
    };

    $this->fallbackCmd = function (array $args) {
      return '';
    };
  }

  public static function loadConfig(string $file) {
    if (file_exists($file)) {
      array_walk(parse_ini_file($file) ?? [], function ($item, $key) {
        if (!getenv($key)) {
          putenv("$key=$item"); 
          $_ENV[$key] = $item;
        } 
      });
    }
  }

  /**
   * Register a new route handler with HTTP verbs as function calls
   * 
   * ```php
   * $app->get('/user/{userId}', [User::class, 'show']);
   * ```
   * 
   * Actions can be arrays like `[Controller::class, 'methodName']`
   * or callables like `function (Request $request, Response $response, array $args) { return $response; }`
   * 
   * Route patterns may use named placeholders to dynamically match HTTP request URI segments.
   * The $args array will be populated with this.
   */
  public function __call(string $method, array $arguments): void {
    $method = strtoupper($method);

    if (in_array($method, $this->allowedMethods) && count($arguments) >= 2) {
      list($url, $action) = $arguments;
      $route = rtrim(str_replace('//', '/', $this->basePath . '/' . $url), '/');
      $middlewares = (count($arguments) >= 3) ? $arguments[2] : [];
      if (count($this->middlewares) > 0) {
        $middlewares = array_merge($this->middlewares, $middlewares);
      }
      $this->routes[$route][$method] = [$action, $middlewares];
    }
  }

  /**
   * Register a new route to specific methods
   * ```php
   * $app->match(['GET', 'POST'], '/user', [User::class, 'list']);
   * ```
   */
  public function match(array $methods, string $url, $action, array $middlewares = []): void {
    foreach ($methods as $method) {
      $method = strtoupper($method);
      if (in_array($method, $this->allowedMethods)) {
        $route = rtrim(str_replace('//', '/', $this->basePath . '/' . $url), '/');
        if (count($this->middlewares) > 0) {
          $middlewares = array_merge($this->middlewares, $middlewares);
        }
        $this->routes[$route][$method] = [$action, $middlewares];
      }
    }
  }

  /**
   * Register a new route responding to all verbs
   */
  public function any(string $url, $action, array $middlewares = []): void {
    $this->match($this->allowedMethods, $url, $action, $middlewares);
  }

  /** 
   * Register a route group
   * ```php
   * $app->group('/api/v1', function ($app) { 
   *    $app->get('/users', [User::class, 'list']); // --> /api/v1/users
   *    $app->get('/roles', [Role::class, 'list']); // --> /api/v1/roles
   * });
   * ``` 
   */
  public function group(string $url, callable $container, array $middlewares = []): void {
    $oldPath = $this->basePath;
    $this->basePath = rtrim(str_replace('//', '/', $this->basePath . '/' . $url), '/');
    $this->middlewares = array_merge($this->middlewares, $middlewares);
    call_user_func($container, $this);
    array_splice($this->middlewares, -count($middlewares));
    $this->basePath = $oldPath;
  }

  /**
   * Register a controller as REST endpoint
   * ```php
   * $app->rest('/users', User::class, ['destroy']);
   * // GET,HEAD   /users      -> $User->index()
   * // GET,HEAD   /users/:id  -> $User->show()
   * // POST       /users/:id  -> $User->store()
   * // PUT,PATCH  /users/:id  -> $User->update()
   * // DELETE     /users/:id  -> $User->destroy()
   * ```
   * @param array $except methods not to publish
   */
  public function bind(string $url, string $controller, ?array $except = [], array $middlewares = []): void {
    $bindings = [
      'create'  => [['POST'],         $url          ], // C
      'list'    => [['GET', 'HEAD'],  $url          ], // R
      'show'    => [['GET', 'HEAD'],  $url . '/{id}'], // R
      'update'  => [['PUT', 'PATCH'], $url . '/{id}'], // U
      'delete'  => [['DELETE'],       $url . '/{id}'], // D
    ];
    $only = array_keys($bindings);

    if (isset($options['except'])) {
      $only = array_diff($only, $except);
    }

    foreach ($only as $action) {
      $this->match($bindings[$action][0], $bindings[$action][1], [$controller, $action], $middlewares);
    }
  }

  /**
   * Create a redirect from one URI to another
   */
  public function redirect(string $from, string $to): void {
    $this->any($from, function (Response $response) use ($to) { 
      return $response->redirect(rtrim($to, '/')); 
    });
  }

  public function fallback(mixed $action) {
    $this->fallback = $action;
  }

  public function command(string $command, mixed $action) {
    $this->commands[$command] = $action;
  }

  public function fallbackCmd(mixed $action) {
    $this->fallbackCmd = $action;
  }
  
  public function getCommands() {
    return $this->commands;
  }

  public function getRoutes() {
    return $this->routes;
  }

  public function getAllowedMethods() {
    return $this->allowedMethods;
  }

  /**
   * Start the routing
   */
  public function run() {
    $action = null;
    $middlewares = [];
    $args = [];
    
    // dev server mode
    if (PHP_SAPI == "cli-server") {
      $path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
      if ($_SERVER['PHP_SELF'] !== $this->basePath . '/index.php' && 
          file_exists('public/' . $path)
      ) {
        return false; // serve file as is
      }
      // else use the user defined routes below
    }

    // command line mode
    if (PHP_SAPI === 'cli') { 
      foreach ($this->commands as $command => $_action) {
        if ($command === $_SERVER['argv'][0]) {
          $action = $_action;
        }
        break;
      }
      
      // no match
      if (!isset($action)) $action = $this->fallbackCmd;
      
      $action = function () use ($action, $args): int { 
        return $this->execute($action, $args); 
      };
      
      // call the action
      $output = $action();
      exit ($output);
    }

    // cgi/fastcgi mode
    else {
      $request = $this->container[Request::class] ?? new Request();
      $pattern = '/([\{]+?([a-zA-Z\-\_]+)[\}]+)/';

      foreach ($this->routes as $url => $actions) {
        // match urls like '/users/{uid}/posts/{pid}'
        $pattern2 = '@^'.preg_replace($pattern, '[a-zA-Z\-\_]+', preg_quote($url, '@')).'$@';

        // check if the current request matches the expression
        if (preg_match($pattern2, $request->path, $args)) {
          array_shift($args); // remove the first match
        
          // build associative array from replaced url parts
          $keys = [];
          if (preg_match_all($pattern, $url, $keys) && count($keys) - 1 === count($args)) {
            array_shift($keys); // remove the first match
            $args = array_combine($keys, $args); 
          }

          if (isset($actions[$request->method])) {
            list($action, $middlewares) = $actions[$request->method];
          }

          break;
        }
      }

      // no match
      if (!isset($action)) $action = $this->fallback;
      
      $action = function (Request $request) use ($action, $args): Response { 
        return $this->execute($action, $args); 
      };
      
      // deal with middlewares
      if (count($middlewares) > 0) {
        foreach (array_reverse($middlewares) as $middleware) {
          $action = function (Request $request) use ($action, $middleware): Response {
            return $this->execute($middleware, [$request, $action], false);
          };
        }
      }

      // call the action
      $response = $action($request);
      $response->render();
    }
  }

  /**
   * Function to execute route actions
   *
   * @param   mixed  $action  can be 'ClassName:method', [ClassName::class, 'method'], callable
   * @param   array  $params  arguments to be added
   *
   * @return  mixed           return value of the action
   */
  protected function execute ($action, array $params, bool $injectDependencies = true) {
    if (is_string($action)) {
      $action = explode(':', $action);
    }
    if (is_array($action) && class_exists($action[0])) {
      $action[0] = $this->instantiate($action[0]);
      if (!isset($action[1])) $action[1] = '__invoke';
    }
    return call_user_func_array($action, array_merge(
      $injectDependencies ? $this->resolveMethodDependencies(...(is_array($action) ? $action : [$action])) : [], 
      $params
    ));
  }

  /**
   * Dendency injection - instantiate a class with dependencies
   */
  protected function instantiate(string $class) {
    if (method_exists($class, '__construct')) {
      $instance = new $class(...$this->resolveMethodDependencies($class, '__construct'));
    } else {
      $instance = new $class;
    }
    return $instance;
  }

  /** 
   * Dependency Injection - resolve dependencies
   */
  protected function resolveMethodDependencies($class, ?string $method = null) {
    $params = [];
    $reflection = is_callable($class) 
      ? new \ReflectionFunction($class) 
      : new \ReflectionMethod($class, $method);
    foreach ($reflection->getParameters() as $param) {
      if ($type = $param->getType()) {
        if (!$type || !($type->getName() != 'Closure' && !is_callable($type) && class_exists($type->getName()))) continue;
        $className = $type->getName();
        $params[] = (isset($this->container[$className])) 
          ? $this->container[$className] 
          : $this->instantiate($className);
      }
    }
    return $params;
  }

  /**
   * Service container
   */
  public function register($instance) {
    $reflection = new \ReflectionClass($instance);
    $this->container[$reflection->getName()] = $instance; 
  }
  
  /**
   * Service container
   */
  public function container($className) {
    return $this->container[$className] ?? null;
  }

}

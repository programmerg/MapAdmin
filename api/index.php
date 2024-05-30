<?php

use App\Router;

use App\Controller\OpenAPI;
use App\Controller\Workspace;
use App\Controller\Datasource;
use App\Controller\Style;
use App\Controller\Font;
use App\Controller\LayerGroup;
use App\Controller\Layer;
use App\Controller\Gridset;
use App\Controller\Cache;
use App\Controller\Service;
use App\Controller\About;
use App\Controller\Monitor;

use App\Middleware\Auth;

define('APP_PATH', dirname(__FILE__, 2));
require './vendor/autoload.php';

Router::loadConfig(APP_PATH . '.env');

// Routes
$app = new Router([
  'basePath' => '/mapserver'
]);

// REST Interface
// https://docs.geoserver.org/latest/en/user/rest/index.html
$app->group('/rest', function (Router $app) {

  $app->get('/', [OpenAPI::class, 'generateDocument']);

  $app->post('/login', [Auth::class, 'loginWithsession']);

  $app->get('/logout', [Auth::class, 'logout'], [
    [Auth::class, 'withSession']
  ]);

  // Workspaces
  $app->bind('/workspaces', Workspace::class);

  // Datasources
  $app->bind('/workspaces/{workspace_id}/datasources', Datasource::class);
  $app->put('/workspaces/{workspace_id}/datasources/{id}/file', [Datasource::class, 'upload']);

  // Data Stores
  // $app->bind('/workspaces/{workspace_id}/datastores', DataStore::class);
  // $app->put('/workspaces/{workspace_id}/datastores/{id}/file', [DataStore::class, 'upload']);

  // Feature Types
  // $app->bind('/workspaces/{workspace_id}/datastores/{id}/featuretypes', FeatureType::class);

  // Coverage Stores
  // $app->bind('/workspaces/{workspace_id}/coveragestores', CoverageStore::class);
  // $app->put('/workspaces/{workspace_id}/coveragestores/{id}/file', [CoverageStore::class, 'upload']);

  // Coverages
  // $app->bind('/workspaces/{workspace_id}/coveragestores/{id}/coverages', Coverage::class);

  // Styles
  $app->bind('/styles', Style::class);

  // Fonts
  $app->get('/fonts', [Font::class, 'list']);
  $app->put('/fonts', [Font::class, 'upload']);

  // Layer Groups
  $app->bind('/workspaces/{workspace_id}/layergroups', LayerGroup::class);

  // Layers
  $app->bind('/workspaces/{workspace_id}/layers', Layer::class);
  $app->get('/workspaces/{workspace_id}/layers/{id}/styles', [Layer::class, 'listStyles']);
  $app->delete('/workspaces/{workspace_id}/layers/{id}/styles/{style_id}', [Layer::class, 'deleteStyle']);
  $app->get('/workspaces/{workspace_id}/layers/{id}/fields', [Layer::class, 'listFields']);
  
  // Layer cache
  // $app->get('/cache/layers', [Layer::class, 'listCache']);
  // $app->get('/cache/layers/{id}', [Layer::class, 'showCache']);
  // $app->put('/cache/layers/{id}', [Layer::class, 'upsertCache']);
  // $app->delete('/cache/layers/{id}', [Layer::class, 'deleteCache']);
  
  // Gridsets
  $app->bind('/cache/gridsets', Gridset::class);

  // Caches
  $app->bind('/cache/blobstores', Cache::class);
  $app->get('/cache/seed', [Cache::class, 'list_tasks']);
  $app->get('/cache/seed/{layer_id}', [Cache::class, 'show_task']);
  $app->post('/cache/seed/{layer_id}', [Cache::class, 'run_task']);

  // Services
  $app->get('/settings', [Service::class, 'list_OWS']);
  $app->put('/settings', [Service::class, 'update_OWS']);
  $app->get('/settings/contact', [Service::class, 'list_contacts']);
  $app->put('/settings/contact', [Service::class, 'update_contacts']);
  $app->get('/services/wms/settings', [Service::class, 'list_WMS']);
  $app->put('/services/wms/settings', [Service::class, 'update_WMS']);
  $app->get('/services/wfs/settings', [Service::class, 'list_WFS']);
  $app->put('/services/wfs/settings', [Service::class, 'update_WFS']);
  $app->get('/services/wcs/settings', [Service::class, 'list_WCS']);
  $app->put('/services/wcs/settings', [Service::class, 'update_WCS']);
  $app->get('/services/wmts/settings', [Service::class, 'list_WMTS']);
  $app->put('/services/wmts/settings', [Service::class, 'update_WMTS']);

  // Security
  $app->put('/security/self/password', [Auth::class, 'change_password']);
  $app->get('/security/acl/catalog|layers|services|rest', [Security::class, 'acl']);
  // ...
  // security/acl/catalog
  // security/acl/layers
  // security/acl/rest
  // security/acl/services
  // security/masterpw
  // security/roles
  // security/usergroup/groups
  // security/usergroup/users

  // Users
  $app->bind('/usergroup/user', User::class);
  $app->get('/usergroup/user/{id}/groups', [User::class, 'list_groups']);
  $app->post('/usergroup/user/{id}/group/{group_id}', [User::class, 'add_to_group']);
  $app->delete('/usergroup/user/{id}/group/{group_id}', [User::class, 'remove_from_group']);

  // User groups
  $app->bind('/usergroup/group', UserGroup::class);
  $app->get('/usergroup/group/{id}/users', [UserGroup::class, 'list_groups']);

  // Roles
  $app->bind('/roles/role', Role::class);
  $app->get('/roles/user', [Role::class, 'list_users']);
  $app->get('/roles/group', [Role::class, 'list_groups']);
  $app->post('/roles/role/{id}/user/{user_id}', [Role::class, 'add_to_user']);
  $app->delete('/roles/role/{id}/user/{user_id}', [Role::class, 'remove_from_user']);
  $app->post('/roles/role/{id}/group/{group_id}', [Role::class, 'add_to_group']);
  $app->delete('/roles/role/{id}/group/{group_id}', [Role::class, 'remove_from_group']);

  // About
  $app->get('/about/manifest', [About::class, '???']);
  $app->get('/about/system-status', [About::class, 'systemStatus']);
  $app->get('/about/version', [About::class, 'version']);
  $app->get('/about/status', [About::class, 'status']);

  // Logs
  $app->get('/monitor/requests', [Monitor::class, 'list']);
  $app->delete('/monitor/requests', [Monitor::class, 'delete']);

  
  // layergroups
  // layers
  // logging
  // namespaces
  // resource
  // templates

}, [
  [Auth::class, 'withSession'],
  [Auth::class, 'enableCSRF']
]);

// Geoserver compatibility
$app->redirect('/cache/rest', '/mapserver/rest/cache');

// Start the application
return $app->run();

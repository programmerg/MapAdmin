import * as pages from './pages';

export const routes = [
  { path: "/mapserver/web", component: 'status-page' },
  { path: "/mapserver/web/cache", component: 'cache-page' },
  { path: "/mapserver/web/styles", component: 'style-page' },
  { path: "/mapserver/web/documentation", component: 'documentation-page' },
  { path: "/mapserver/web/gridsets", component: 'gridset-page' },
  { path: "/mapserver/web/layers", component: 'layer-page' },
  { path: "/mapserver/web/layergroups", component: 'layergroup-page' },
  { path: "/mapserver/web/logs", component: 'logs-page' },
  { path: "/mapserver/web/security", component: 'security-page' },
  { path: "/mapserver/web/status", component: 'status-page' },
  { path: "/mapserver/web/services", component: 'service-page' },
  { path: "/mapserver/web/sources", component: 'source-page' },
  { path: "/mapserver/web/workspaces", component: 'workspace-page' },
  { path: undefined, component: 'notfound-page' },
]
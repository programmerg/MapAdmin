import { LitElement, html } from 'lit';

export class Sidebar extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <nav id="sidebar" style="height: calc(100vh - 85px)" class="position-fixed overflow-auto">
        
        <ul class="nav flex-column" id="navigation">
          <li class="nav-item nav-groups mb-3">
            <h6>
              <a href="#nav_data" class="text-dark text-decoration-none" data-bs-toggle="collapse">Data</a>
            </h6>
            <div class="collapse show" id="nav_data">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="workspaces" data-bs-toggle="router">
                    <i class="ms ms-directory-open"></i> <span>Workspaces</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="sources" data-bs-toggle="router">
                    <i class="ms ms-database"></i> <span>Sources</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="styles" data-bs-toggle="router">
                    <i class="ms ms-style"></i> <span>Styles</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="layergroups" data-bs-toggle="router">
                    <i class="ms ms-layers-base"></i> <span>Groups</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="layers" data-bs-toggle="router">
                    <i class="ms ms-layers"></i> <span>Layers</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item nav-groups mb-3">
            <h6>
              <a href="#nav_caching" class="text-dark text-decoration-none" data-bs-toggle="collapse">Caching</a>
            </h6>
            <div class="collapse show" id="nav_caching">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="gridsets" data-bs-toggle="router">
                    <i class="ms ms-sphere"></i> <span>Gridsets</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="cache" data-bs-toggle="router">
                    <i class="ms ms-data-cube"></i> <span>Caches</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item nav-groups mb-3">
            <h6>
              <a href="#nav_system" class="text-dark text-decoration-none" data-bs-toggle="collapse">System</a>
            </h6>
            <div class="collapse show" id="nav_system">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="services" data-bs-toggle="router">
                    <i class="ms ms-processes"></i> <span>Services</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="security" data-bs-toggle="router">
                    <i class="ms ms-information"></i> <span>Security</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="status" data-bs-toggle="router">
                    <i class="ms ms-information"></i> <span>Status</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="documentation" data-bs-toggle="router">
                    <i class="ms ms-txt-o"></i> <span>Docs</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="logs" data-bs-toggle="router">
                    <i class="ms ms-txt-o"></i> <span>Logs</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

    </nav>
    `;
  }
}

customElements.define('sidebar-component', Sidebar);
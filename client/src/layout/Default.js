import { LitElement, html } from 'lit';

export class Default extends LitElement {

  static properties = {
    routes: {type: Array},
    handleLogout: {},
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-dark sticky-top bg-success flex-md-nowrap px-0 shadow">
        <div class="container">
          <button class="navbar-toggler d-md-none p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarcontainer">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand px-3" href="#top">MapAdmin</a>
            <ul class="navbar-nav px-3">
              <li class="nav-item text-nowrap">
                <a class="nav-link" href="" @click=${this.handleLogout}>Logout</a>
              </li>
            </ul>
        </div>
      </nav>
      <main id="top" class="container">
        <div class="row pt-4" style="min-height: calc(100vh - 56px);">
          <sidebar-component id="sidebarcontainer" class="col-md-3 col-lg-2 d-md-block sidebar collapse"></sidebar-component>
          <router-component .routes=${this.routes} class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-white"></router-component>
        </div> 
      </main>
    `;
  }
}

customElements.define('default-layout', Default);
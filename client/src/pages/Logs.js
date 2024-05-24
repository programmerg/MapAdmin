import { LitElement, html } from 'lit';

export class Logs extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Logs" }
      ]}
    ></breadcrumbs-component>
    <page-header text=""></page-header>

    <div class="card bg-light">
      <div class="card-body">
        <pre>logs...</pre>
      </div>
    </div>
    `;
  }
}

customElements.define('logs-page', Logs);
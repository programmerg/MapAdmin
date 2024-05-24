import { LitElement, html } from 'lit';

export class Cache extends LitElement {
  
  createRenderRoot() {
    return this;
  }
  
  render() {
    return html`
      <breadcrumbs-component 
        .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
        .items=${[
          { url: '#', name: "Caches" }
        ]}
      ></breadcrumbs-component>

      <table-component 
        .tableClass=${"table table-bordered table-striped table-hover table-sm"} 
        .selectable=${true}
        .columns=${[
          {key: 'name', label: 'Cache name'},
          {key: 'type', label: 'Type'},
          {key: 'enabled', label: 'Enabled'},
          {key: 'default', label: 'Default'},
        ]}
      ></table-component>
    `;
  }
}

customElements.define('cache-page', Cache);
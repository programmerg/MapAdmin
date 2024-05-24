import { LitElement, html } from 'lit';

export class Layer extends LitElement {
  
  static properties = {
    //_location: {type: String, state: true},
    params: {state: true},
  }

  createRenderRoot() {
    return this;
  }

  render() {

    console.log(this.params)
    return html`
      <breadcrumbs-component 
        .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
        .items=${[
          { url: '#', name: "Layers" }
        ]}
      ></breadcrumbs-component>

      <modal-component 
        label="New layer" 
        btnClass="btn btn-sm btn-success mb-4"
        .content=${html`<layer-modal></layer-modal>`}
      ></modal-component>
      
      <table-component 
        .tableClass=${"table table-bordered table-striped table-hover table-sm"} 
        .selectable=${true}
        .columns=${[
          {key: 'workspace', label: 'Workspace'},
          {key: 'name', label: 'Layer Name'},
          {key: 'type', label: 'Type'},
          {key: 'source', label: 'Source'},
          {key: 'enabled', label: 'Enabled'},
          {key: 'srs', label: 'SRS'},
        ]}
      ></table-component>
    `;
  }
}

customElements.define('layer-page', Layer);
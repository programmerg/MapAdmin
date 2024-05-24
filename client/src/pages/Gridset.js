import { LitElement, html } from 'lit';

export class Gridset extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <breadcrumbs-component 
        .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
        .items=${[
          { url: '#', name: "Gridsets" }
        ]}
      ></breadcrumbs-component>

      <modal-component 
        label="New gridset" 
        btnClass="btn btn-sm btn-success mb-4"
        .content=${html`<grid-modal></grid-modal>`}
      ></modal-component>

      <table-component 
        .tableClass=${"table table-bordered table-striped table-hover table-sm"} 
        .selectable=${true}
        .columns=${[
          {key: 'name', label: 'Gridset Name'},
          {key: 'crs', label: 'CRS'},
          {key: 'tiledimensions', label: 'Tile Dimensions'},
          {key: 'zoomlevels', label: 'Zoom levels'},
          {key: 'diskusage', label: 'Disk Usage'},
        ]}
      ></table-component>
    `;
  }
}

customElements.define('gridset-page', Gridset);
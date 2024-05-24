import { LitElement, html } from 'lit';

export class Datasource extends LitElement {
  
  createRenderRoot() {
    return this;
  }
  
  // https://mapserver.org/mapfile/layer.html
  render() {
    return html` 
      <form-component .controls=${html`
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create new layer</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="max-height:70vh">
          ${[
            {label: 'Name', name: 'name', type: 'text'},
            {label: 'Workspace', name: 'workspace', type: 'text'},
            {label: 'Type', name: 'type', type: 'select', options: [
              {text: 'LINE', value: 'LINE'}, 
              {text: 'POINT', value: 'POINT'}, 
              {text: 'POLYGON', value: 'POLYGON'}, 
              {text: 'RASTER', value: 'RASTER'}
            ]},
            {label: 'Connection type', name: 'connectiontype', type: 'select', options: [
              {text: 'OGR', value: 'OGR'},
              {text: 'POSTGIS', value: 'POSTGIS'},
              {text: 'WFS', value: 'WFS'},
              {text: 'WMS', value: 'WMS'},
            ]},
            {label: 'Connection', name: 'connection', type: 'text'},
            {label: 'Data', name: 'data', type: 'text'},
            {label: 'Projection', name: 'projection', type: 'text'},
            {label: 'Status', name: 'status', type: 'select', options: [
              {text: 'ON', value: ''},
              {text: 'OFF', value: ''},
              {text: 'DEFAULT', value: ''},
            ]},
            {label: 'Minscaledenom', name: 'minscaledenom', type: 'text'},
            {label: 'Filteritem', name: 'filteritem', type: 'text'},
            {label: 'Filter', name: 'filter', type: 'text'},
            {label: 'Classitem', name: 'classitem', type: 'text'},
            {label: 'Labelitem', name: 'labelitem', type: 'text'},
          ].map(e => html`
            <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .options=${e.options} .variant=${'horizontal'} .sizing=${'sm'} class="mb-3"></input-component>
          `)}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>`}>
      </form-component>
    `;
  }
}

customElements.define('datasource-modal', Datasource);
import { LitElement, html } from 'lit';

export class Grid extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    if (!this.resolutions || this.resolutions?.length < 1) {
      this.resolutions = [''];
    }
  }

  duplicateRow() {
    this.resolutions.push('');
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
            {label: 'Name', name: 'name', type: 'text', value: this.name},
            {label: 'SRS', type: 'group', content: html`
              <span class="input-group-text">EPSG:</span>
              <input type="number" name="srs" class="form-control" value=${this.srs}>
            `},
            {label: 'Size', type: 'group', content: html`
              <input type="number" name="size[]" class="form-control">
              <span class="input-group-text">x</span>
              <input type="number" name="size[]" class="form-control">
              <span class="input-group-text">px</span>
            `},
            {label: 'Origin', type: 'group', content: html`
              <input type="number" name="origin[]" class="form-control">
              <span class="input-group-text">,</span>
              <input type="number" name="origin[]" class="form-control">
            `},
            {label: 'Bottom left', type: 'group', content: html`
              <input type="number" name="extent[]" class="form-control">
              <span class="input-group-text">,</span>
              <input type="number" name="extent[]" class="form-control">
            `},
            {label: 'Top right', type: 'group', content: html`
              <input type="number" name="extent[]" class="form-control">
              <span class="input-group-text">,</span>
              <input type="number" name="extent[]" class="form-control">
            `},
            {label: 'Resolution', type: 'custom', content: html`
              <table class="w-100">
                ${this.resolutions?.map(resolution => html`
                <tr>
                  <td class="mb-3">
                    <div class="input-group input-group-sm">  
                      <input type="number" name="resolution[]" class="form-control">
                      <span class="input-group-text">units/px</span>
                    </div>
                  </td>
                </tr>
                `)}
              </table>
              <button class="btn btn-secondary" type="button" @click=${this.duplicateRow}><i class="ms ms-plus"></i></button>
              `},
          ].map(e => html`
            <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .options=${e.options} .variant=${'horizontal'} .sizing=${'sm'} .content=${e.content} class="mb-3"></input-component>
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

customElements.define('grid-modal', Grid);
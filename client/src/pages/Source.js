import { LitElement, html } from 'lit';

export class Source extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Sources" }
      ]}
    ></breadcrumbs-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace</span></th>
            <th><span>Source Name</span></th>
            <th><span>Data Type</span></th>
            <th><span>Format</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `;
  }
}

customElements.define('source-page', Source);
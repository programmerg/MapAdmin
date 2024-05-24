import { LitElement, html } from 'lit';

export class Workspace extends LitElement {
  
  createRenderRoot() {
    return this;
  }
  
  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Workspaces" }
      ]}
    ></breadcrumbs-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace Name</span></th>
            <th><span>Services</span></th>
            <th><span>Default</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `;
  }
}

customElements.define('workspace-page', Workspace);
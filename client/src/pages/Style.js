import { LitElement, html } from 'lit';

export class Style extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Style" }
      ]}
    ></breadcrumbs-component>

    <modal-component 
      label="New style"
      btnClass="btn btn-sm btn-success mb-4"
      .content=${html`<style-modal></style-modal>`}
    ></modal-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace</span></th>
            <th><span>Style Name</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `;
  }
}

customElements.define('style-page', Style);
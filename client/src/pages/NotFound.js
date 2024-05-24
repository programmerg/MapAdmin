import { LitElement, html } from 'lit';

export class NotFound extends LitElement {
  
  createRenderRoot() {
    return this;
  }
  
  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Not found" }
      ]}
    ></breadcrumbs-component>

    <p>The requested page is not found.</p>
    `;
  }
}

customElements.define('notfound-page', NotFound);
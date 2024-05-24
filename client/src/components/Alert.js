import { LitElement, html } from 'lit';
import { Alert as BsAlert } from 'bootstrap';

export class Alert extends LitElement {
  
  static properties = {
    type: {type: String},
    message: {type: String},
  }

  createRenderRoot() {
    return this;
  }
  
  firstUpdated() {
    new BsAlert(this.querySelector('.alert'));
  }

  render() {
    return html`
      <div class="alert alert-${this.type} alert-dismissible" role="alert">
        <div>${this.message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }
}

customElements.define('alert-component', Alert);
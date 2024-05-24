import { LitElement, html, render } from 'lit';
import { Toast as BsToast } from 'bootstrap';

export class Toast extends LitElement {
  
  static properties = {
    title: {type: String},
    time: {type: String},
    message: {type: String},
    type: {type: String},
  }

  createRenderRoot() {
    return this;
  }
  
  firstUpdated() {
    const element = this.querySelector('.toast');
    const toast = new BsToast(element);
    toast.show();
    element.addEventListener('hidden.bs.toast', e => this.remove())
  }

  render() {
    return html`
      <div class=${'toast mb-2' + (this.type ? ' bg-' + this.type : '')} role="alert" aria-live="assertive" aria-atomic="true">
        <div class=${'toast-header' + (this.title ? '' : ' d-none')}>
          <strong class="me-auto">${this.title}</strong>
          <small>${this.time}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${this.message}
        </div>
      </div>
    `;
  }
}

customElements.define('toast-component', Toast);
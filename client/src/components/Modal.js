import { LitElement, html, nothing, render } from 'lit';
import { Modal as BsModal } from 'bootstrap';

export class Modal extends LitElement {
  
  static properties = {
    label: {},
    header: {},
    body: {},
    footer: {},
    content: {},
    static: {type: Boolean},
    btnClass: {type: String},
    dialogClass: {type: String},
  }

  constructor() {
    super();
    this._id = 'modal_' + Math.random().toString(36).slice(2, 7);
    this.static = false;
    this.btnClass = "btn btn-primary";
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    new BsModal(this.querySelector('[data-bs-toggle]'));
  }

  disconnectedCallback() {
    const dialog = document.getElementById(this._id);
    if (dialog) dialog.remove();
    super.disconnectedCallback();
  }

  dialog() {
    return html`
      <div id=${this._id} 
        class="modal fade" 
        tabindex="-1" 
        data-bs-backdrop=${this.static ? "static" : 'true'} 
        data-bs-keyboard=${this.static ? "false" : 'true'} 
        aria-hidden="true"
      >
        <div class=${'modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ' + (this.dialogClass ?? '')}>
          <div class="modal-content">
            ${!this.content
              ? html`
                <div class="modal-header">
                  <h1 class="modal-title fs-5">${this.title ?? nothing}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ${this.body ?? nothing}
                </div>
                <div class=${'modal-footer' + (!this.footer ? ' d-none' : '')}>
                  ${this.footer ?? nothing}
                </div>
                `
              : html`${this.content}`
            }
          </div>
        </div>
      </div>
    `;
  }

  render() {
    //render(this.dialog(), document.body);
    return html`
      <button type="button" 
        class=${this.btnClass} 
        data-bs-toggle="modal" 
        data-bs-target=${'#' + this._id}
        aria-controls=${'#' + this._id}
      >
        ${this.label}
      </button>
      ${this.dialog()}
    `;
  }
}

customElements.define('modal-component', Modal);
import { LitElement, html, nothing } from 'lit';
import { Offcanvas as BsOffcanvas } from 'bootstrap';

export class Offcanvas extends LitElement {
  
  static properties = {
    label: {},
    header: {},
    body: {},
    btnClass: {type: String},
    dialogClass: {type: String},
  }
  
  constructor() {
    super();
    this._id = 'modal_' + Math.random().toString(36).slice(2, 7);
    this.btnClass = "btn btn-primary";
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    new BsOffcanvas(this.querySelector('[data-bs-toggle]'));
  }

  disconnectedCallback() {
    const offcanvas = document.getElementById(this._id);
    if (offcanvas) offcanvas.remove();
    super.disconnectedCallback();
  }

  offcanvas() {
    return html`
      <div id=${this._id} 
        class=${'offcanvas offcanvas-start ' + (this.dialogClass ?? '')} 
        tabindex="-1"
        aria-hidden="true"
      >
        <div class=${'offcanvas-header' + (!this.header ? ' d-none' : '')}>
          ${html`${this.header ?? nothing}`}
        </div>
        <div class="offcanvas-body">
          ${html`${this.body ?? nothing}`}
        </div>
      </div>
    `;
  }

  render() {
    render(this.offcanvas(), document.body);

    return html`
      <button type="button" 
        class=${this.btnClass} 
        data-bs-toggle="offcanvas" 
        data-bs-target=${'#' + this._id} 
        aria-controls=${'#' + this._id}
      >
        ${html`${this.label ?? nothing}`}
      </button>
    `;
  }
}

customElements.define('offcanvas-component', Offcanvas);
import { LitElement, html } from 'lit';
import { Collapse as BsCollapse } from 'bootstrap';

export class Collapse extends LitElement {
  
  static properties = {
    type: {type: String},
    btnClass: {type: String},
    target: {type: String},
    label: {type: String},
  }

  createRenderRoot() {
    return this;
  }
  
  firstUpdated() {
    new BsCollapse(this.querySelector('[data-bs-toggle]'));
  }

  render() {
    return (this.type == 'button')
      ? html`
        <button type="button" 
          class=${this.btnClass}
          data-bs-target=${'#' + this.target} 
          data-bs-toggle="collapse"
          aria-expanded="false" 
          aria-controls=${this.target}
        >${this.label}</button>`
      : html`
        <a 
          class=${this.btnClass} 
          href=${'#' + this.target} 
          data-bs-toggle="collapse"
          role="button" 
          aria-expanded="false" 
          aria-controls=${this.target}
        >${this.label}</a>`
    ;
  }
}

customElements.define('collapse-component', Collapse);
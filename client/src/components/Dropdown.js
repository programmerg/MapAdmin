import { LitElement, html, nothing } from 'lit';
import { Dropdown as BsDropdown } from 'bootstrap';

export class Dropdown extends LitElement {
  
  static properties = {
    items: {type: Array},
    btnClass: {type: String},
    label: {type: String},
  }

  createRenderRoot() {
    return this;
  }
  
  firstUpdated() {
    new BsDropdown(this.querySelector('[data-bs-toggle]'));
  }

  render() {
    return html`
      <div class="dropdown">
        <button type="button" 
          class=${"dropdown-toggle btn " + (this.btnClass ?? 'btn-secondary')}
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          ${this.label}
        </button>
        <ul class="dropdown-menu">
        ${this.items.map(item => {
          return html`
            <li>
              <a class="dropdown-item" href=${item.url} @click=${item.click ?? nothing}>${item.name}</a>
            </li>
          `
        })}
        </ul>
      </div>
    `;
  }
}

customElements.define('dropdown-component', Dropdown);
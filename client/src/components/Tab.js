import { LitElement, html } from 'lit';
import { Tab as BsTab } from 'bootstrap';

export class Tab extends LitElement {
  
  static properties = {
    items: {},
    navClass: {type: String},
    contentClass: {type: String},
  }

  createRenderRoot() {
    return this;
  }
  
  firstUpdated() {
    let first = true;
    const triggerTabList = this.querySelectorAll('[data-bs-toggle]')
    triggerTabList.forEach(triggerEl => {
      const tabTrigger = new BsTab(triggerEl);
      triggerEl.addEventListener('click', event => {
        event.preventDefault();
        tabTrigger.show();
      })
    })
  }

  render() {
    return html`
      <ul class=${"nav nav-tabs " + this.navClass} role="tablist">
        ${this.items.map(item => html`
          <li class="nav-item" role="presentation">
            <button type="button" class=${"nav-link" + (item.active ? ' active' : '')}
              data-bs-toggle="tab" 
              data-bs-target=${"#"+item.id} 
              aria-controls=${item.id}
              aria-selected=${(item.active ? 'true' : 'false')}
              role="tab" 
            >
              ${item.label}
            </button>
          </li>
        `)}
      </ul>
      <div class=${"tab-content " + this.contentClass}>
        ${this.items.map(item => html`
          <div class=${"tab-pane fade" + (item.active ? ' show active' : '')} id=${item.id} role="tabpanel" tabindex="0">
            ${item.content}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('tab-component', Tab);
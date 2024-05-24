import { LitElement, html, nothing } from 'lit';

export class Breadcrumbs extends LitElement {
  
  static properties = {
    items: {type: Array},
    navClass: {type: String},
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const lastItem = this.items[this.items.length - 1];

    return html`
      <nav aria-label="breadcrumb">
        <ol class=${"breadcrumb " + this.navClass}>
        ${this.items.map(item => {
          let active = lastItem.url == item.url;
          return html`
            <li class=${"breadcrumb-item" + (active ? ' active' : '')} aria-current=${active ? "page" : nothing}>
              ${!active 
                ? html`<a href=${item.url}>${item.name}</a>`
                : html`${item.name}`
              }
            </li>
          `
        })}
        </ol>
      </nav>
    `;
  }
}

customElements.define('breadcrumbs-component', Breadcrumbs);
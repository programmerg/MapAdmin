import { LitElement, html, nothing } from "lit";

export class Table extends LitElement {

  static properties = {
    tableClass: {type: String},
    editable: {type: Boolean},
    filterable: {type: Boolean},
    src: {type: String},
    data: {type: Array},

    columns: { type: Array },
    index: { type: Number, state: true },
    unique: { type: Array, state: true },
    filter: { type: Array, state: true },
    hidden: { type: Array, state: true }
  }

  constructor() {
    super();
    this.tableClass = '';
    this.editable = false;
    this.filterable = false;
    this.src = '';
    this.data = [];

    this.columns = [];
    this.index = null;
    this.unique = [];
    this.filter = [];
    this.hidden = [];
  }

  createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    if (!this.data) await this.fetchData();
  }

  // Download the latest json and update it locally
  async fetchData() {
    let _data;
    if (this.src.length > 0) {
      // If a src attribute is set prefer it over any slots
      _data = await fetch(this.src).then((res) => res.json());
    } else {
      // If no src attribute is set then grab the inline json in the slot
      const elem = this.parentElement?.querySelector(
        'script[type="application/json"]'
      );
      if (elem) _data = JSON.parse(elem.innerHTML);
    }
    this.data = this.transform(_data ?? []);
    this.requestUpdate();
  }

  transform(data) {
    if (!this.columns) {
      this.columns = Object.keys(this.data[0]).map(key => {
        return {key: key, label: key}
      });
    }
    return data;
  }
  
  renderFilter() {
    return html`
      <input type="search">
      <ul>
        <li class=${(this.filter[this.index] === undefined) ? 'disable' : ''} @click=${this.onApply}></li>
        ${this.unique.map(cell => {
          const hidden = this.filter[this.index] !== undefined && this.filter[this.index] !== cell;
          return html`
            <li class=${hidden ? 'disable' : ''} @click=${this.onApply}>${cell}</li>
          `;
        })}
      </ul>
    `;
  }

  onInput (e) {
    const value = e.target.value;
    const key = row[0];
    const current = this.data[index];
    current[key] = value;
    this.data[index] = current;
    const args = {
      detail: {
        index: index,
        data: current,
      },
    };
    this.requestUpdate();

    if (this.handleInputCell) 
      this.handleInputCell(args);
    else 
      this.dispatchEvent(
        new CustomEvent("input-cell", args)
      );
  }

  renderColumns () {
    return html`
      <tr>
      ${this.columns.map((cell, index) => {
        return html`
          <th data-key=${cell.key} class=${(this.filter[index] !== undefined) ? 'active' : ''}>
            ${cell.label}
            <i class=${this.index === index ? 'arrow_drop_up' : 'arrow_drop_down'} @click=${this.onSelect}></i>
            <div>
              ${this.filterable && this.index === index ? this.renderFilter() : ''}
            </div>
          </th>
        `
      })}
      </tr>
    `;
  }

  renderRow(entry, index) {
    const matches = entry.every((cell, index) => {
      return this.filter[index] === undefined || this.filter[index] == cell;
    });
    if(matches) {
      this.hidden[index] = true;
      return html`
        <tr>
          ${entry.map(cell => {
            return html`
              <td>
              ${this.editable
                ? html`<input value="${cell}" type="text" @input=${this.onInput} />`
                : html`${cell}`
              }
              </td>
            `;
          })}
        </tr>
      `;
    }
    delete this.hidden[index];
    return '';
  }

  onSelect(event) {
    if(this.head.includes(event.target)) {
      const index = this.head.indexOf(event.target);
      if(this.index === null || this.index !== index) {
        this.index = this.head.indexOf(event.target);
        let column = this.data.map(row => row[index]);
        // column = column.filter((row, index) => this.hidden[index]);
        this.unique = [...new Set(column)];
      }
      else {
        this.index = null;
      }
    }
  }

  onApply(event) {
    if(!event.target.classList.contains('disable')) {
      const column = event.target.parentNode.parentNode;
      const index = this.head.indexOf(column);
      const value = event.target.textContent;
      value === '' ? delete this.filter[index] : this.filter[index] = value;
      this.index = null;
    }
  }
  
  get table() {
    return this.renderRoot.querySelector('table');
  }
  
  get head() {
    return Array.from(this.table.querySelectorAll('thead th'));
  }

  get body() {
    return Array.from(this.table.querySelectorAll('tbody tr'));
  }

  render() {
    return html`
      <div class="table-responsive">
        <slot name="a"></slot>
        <table class=${"table " + this.tableClass}>
          <thead>
            ${this.renderColumns()}
          </thead>
          <tbody>
            ${!this.data 
              ? html`<tr><td colspan=${this.columns.length}>Loading...</td></tr>`
              : nothing
            }
            ${this.data.length === 0
              ? html`<tr><td colspan=${this.columns.length}>No Items Found!</td></tr>`
              : nothing
            }
            ${this.data.map(
              this.renderRow
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('table-component', Table);
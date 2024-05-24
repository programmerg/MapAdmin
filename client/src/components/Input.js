import { LitElement, html, nothing } from 'lit';

export class Input extends LitElement {

  static properties = {
    name: {type: String},
    value: {},
    label: {type: String},
    type: {type: String},
    title: {type: String},
    options: {type: Array},
    placeholder: {type: String},
    checked: {type: Boolean},
    readonly: {type: Boolean},
    required: {type: Boolean},
    disabled: {type: Boolean},
    autofocus: {type: Boolean},
    multiple: {type: Boolean},
    variant: {type: String},
    sizing: {type: String},
    size: {type: Number},
    maxlength: {type: Number},
    minlength: {type: Number},
    min: {type: Number},
    max: {type: Number},
    step: {type: Number},
    pattern: {type: String},
    accept: {type: String},
    autocomplete: {type: Boolean},
    content: {},
  }
  
  createRenderRoot() {
    if (this.variant == 'floating') {
      this.classList.add('form-floating');
      this.classList.add('d-block');
    }
    if (this.variant == 'horizontal') {
      this.classList.add('row');
    }
    return this;
  }

  render() {
    const id = "input_" + Math.random().toString(36).substr(2);

    this.name = this.name ?? "";
    this.value = this.value ?? "";
    this.label = this.label ?? this.name;
    this.options = this.options ?? [];
  
    if (!this.type) this.type = typeof this.value;
    if (this.type == 'boolean') this.type = 'checkbox';
    if (this.type == 'number') this.type = 'number';
    if (this.type == 'string') this.type = 'text';
    if (this.type == 'object' && this.value instanceof Date) this.type = 'datetime-local';

    const label = html`
      <label for=${id} class=${
        (this.variant == '' ? "form-label" : "") +
        (this.variant == 'horizontal' ? "col-sm-3 col-form-label" : "") +
        (this.sizing ? ' col-form-label-' + this.sizing : '')
      }>
        ${(this.type == 'checkbox') ? nothing : this.label}
      </label>
    `;

    let control;
    switch (this.type) {
      case 'custom':
        control = html`${this.content}`
        break;

      case 'group':
        control = html`<div class=${"input-group" + (this.sizing ? " input-group-"+this.sizing : "")}>${this.content}</div>`
        break;

      case 'radio':
        control = this.options.map(option => html`
        <div class="form-check">
          <input id="${id}_${option.value}" 
            class="form-check-input" 
            type="radio"
            name=${this.name}
            value=${option.value}
            ?checked=${(option.checked || this.value === option.value) ?? false}
          >
          <label for=${id + "_" + option.value} class="form-check-label">${option.text ?? option.value}</label>
        </div>`);
        break;

      case 'checkbox':
        control = html`
        <div class="form-check">
          <input id=${id} 
            class="form-check-input" 
            type="checkbox"
            name=${this.name}
            value=${this.value}
            ?checked=${this.checked ?? false}
          >
          <label for=${id} class="form-check-label">${this.label}</label>
        </div>`;
        break;

      case 'textarea': 
        control = html`
        <textarea id=${id} 
          class=${"form-control" + (this.sizing ? ' form-control-' + this.sizing : '')}
          name=${this.name} 
          .value=${this.value}
          placeholder=${this.placeholder ?? nothing}
          ?readonly=${this.readonly ?? false}
          ?required=${this.required ?? false}
          ?disabled=${this.disabled ?? false}
          ?autofocus=${this.autofocus ?? false}
          cols=${this.size ?? nothing}
          maxlength=${this.maxlength ?? nothing}
        ></textarea>`;
        break;

      case 'select':
        control = html`
        <select id=${id} 
          class=${'form-select' + (this.sizing ? ' form-select-' + this.sizing : '')} 
          name=${this.name} 
          placeholder=${this.placeholder ?? nothing}
          ?required=${this.required ?? false}
          ?disabled=${this.disabled ?? false}
          ?autofocus=${this.autofocus ?? false}
          ?multiple=${this.multiple ?? false}
          size=${this.size ?? nothing}
        >
        ${this.options.map(option => html`
          <option value=${option.value ?? ""} ?checked=${option.checked || this.value === option.value}>
            ${option.text ?? option.value}
          </option>`
        )}
        </select>`;
        break;

      case 'text':
      case 'url':
      case 'email':
      case 'password':
      case 'file':
      case 'hidden':
      case 'number':
      case 'range':
      case 'color':
      case 'tel':
      case 'date':
      case' datetime-local':
      case 'week':
      case 'month':
      case 'time':
      default:
        control = html`
        <input id=${id} 
          class=${(this.type == 'range' ? 'form-range' : "form-control") +
           (this.type == 'color' ? ' form-control-color' : "") + 
           (this.sizing ? ' form-control-' + this.sizing : '')
          }
          type=${this.type} 
          name=${this.name} 
          .value=${this.value} 
          list=${this.options.length > 0 ? id + "_list" : nothing} 
          placeholder=${this.placeholder ?? nothing}
          pattern=${this.pattern ?? nothing}
          accept=${this.accept ?? nothing}
          ?readonly=${this.readonly ?? false}
          ?required=${this.required ?? false}
          ?disabled=${this.disabled ?? false}
          ?autofocus=${this.autofocus ?? false}
          ?multiple=${this.multiple ?? false}
          autocomplete=${!!this.autocomplete ? 'off' : nothing}
          size=${this.size ?? nothing}
          min=${this.min ?? nothing}
          max=${this.max ?? nothing}
          step=${this.step ?? nothing}
          maxlength=${this.maxlength ?? nothing}
          minlength=${this.minlength ?? nothing}
          title=${this.title ?? nothing}
        >
        ${this.options.length > 0 ? html`
        <datalist id=${id + "_list"}>
          ${this.options.map(option => html`
          <option value=${option.value ?? ""}></option>
          `)}
        </datalist>` : ''}`;
        break;
    }

    return (this.variant == 'floating') 
      ? html`
          ${control}
          ${label}
          ${this.title ? html`<div class="invalid-feedback">${this.title}</div>` : nothing}
        `
      : html`
          ${label}
          <div class=${this.variant == 'horizontal' ? "col-sm-9" : ""}>
            ${control}
            ${this.title ? html`<div class="invalid-feedback">${this.title}</div>` : nothing}
          </div>
        `
    ;
  }
}

customElements.define('input-component', Input);
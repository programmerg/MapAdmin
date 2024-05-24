import { LitElement, html } from 'lit';

let csrfToken = '';
export const setCsrfToken = (token) => {
  csrfToken = token;
}

export async function httpRequest (opts) {
  let url = opts.url, 
      method = opts.method ?? 'get', 
      contentType = '', 
      data = opts.data;

  switch (opts.contentType) {
    case 'text': contentType = 'text/plain'; break;
    case 'multipart': contentType = 'multipart/form-data'; break;
    case 'urlencoded': contentType = 'application/x-www-form-urlencoded'; break; 
    case 'json': default: contentType = 'application/json'; break;
  }

  // Populate opts from FORM attributes
  if (opts.form && opts.form instanceof HTMLFormElement) {
    url = opts.form.action;
    method = opts.form.method ?? 'get';
    if (opts.form.attributes.enctype) contentType = opts.form.attributes.enctype;
    data = new FormData(opts.form);
  }
  
  // Append CSRF Token
  if (!csrfToken) {
    const resp = await fetch(url, {method: 'head'});
    const newToken = resp.headers.get('x-csrf-token'); 
    if (newToken) setCsrfToken(newToken);
  }
  if (data instanceof FormData) {
    data.append('_token', csrfToken);
  } else {
    data._token = csrfToken;
  }

  // Convert data
  if (contentType == 'application/json' || contentType == 'text/plain') {
    if (data instanceof FormData) {
      const output = {};
      data.forEach((value, key) => output[key] = value);
      data = output;
    }
    data = JSON.stringify(data);

  } else { // multipart, urlencoded
    if (!(data instanceof FormData)) {
      const output = new FormData();
      for (let key in item) {
        output.append(key, item[key]);
      }
      data = output;
    }
  }

  // Assemble the request
  const request = new Request(url, {
    method: method,
    headers: { 
      "Accept": "application/json",
      "Content-Type": contentType
    },
    body: data
  });

  // Append JWT Token
  const jwtToken = localStorage.getItem('token');
  if (jwtToken) request.headers.append("Authorization", "Bearer " + jwtToken);

  // Get the response
  const response = await fetch(request);
  
  // Save new CSRF Token for later
  const newToken = response.headers.get('x-csrf-token');
  if (newToken) setCsrfToken(newToken);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  // const contentType = response.headers.get('content-type');
  // if (contentType && contentType.includes('application/json')) {
  //   return response.json();
  // } else {
  //   return response.text();
  // }
  return response.json();
}

export class Form extends LitElement {

  static properties = {
    method: {type: String},
    action: {type: String},
    submit: {},
    controls: {},
    _wasChanged: {type: Boolean, state: false}
  }
  
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this.changeListener);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.changeListener);
    super.disconnectedCallback();
  }

  changeListener(e) {
    this._wasChanged = true;
  }

  handleSubmit(e) {
    const form = e.target;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      e.preventDefault();
      return false;
    }

    if (this.submit) {
      return this.submit(e);

    } else {
      httpRequest({form: form});
      e.preventDefault();
      return false;
    }
  }

  render() {
    return html`
      <form 
        method=${this.method} 
        action=${this.action} 
        @submit=${this.handleSubmit} 
        class="needs-validation"
      >
        ${this.controls}
      </form>
    `;
  }
}

customElements.define('form-component', Form);
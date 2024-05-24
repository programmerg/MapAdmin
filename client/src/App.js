import { LitElement, css, html, render } from 'lit';
import { httpRequest } from './components/Form';
import { routes } from './routes';

export class App extends LitElement {

  static properties = {
    _isLoggedIn: {type: Boolean, state: true},
  }

  constructor() {
    super();
    this._isLoggedIn = false;
  }

  createRenderRoot() {
    const token = localStorage.getItem('token');
    const identity = localStorage.getItem("identity");
    if (identity && token) {
      this._isLoggedIn = true;
    }
    return this;
  }

  willUpdate(changedProperties) {
    this.classList.remove('show');
  }

  firstUpdated(changedProperties) {
    this.classList.add('fade');
  }

  updated(changedProperties) {
    this.classList.add('show');
  }

  handleLogout = (e) => {
    e.preventDefault();
    this._isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem("identity");
    this.toast({message: "Sikeres kijelentkezés", type: 'success'});
  }

  handleLogin = (e) => {
    e.preventDefault();

    httpRequest({form: e.target})
    .then(response => {
      let result = response;
      if (result && result.token && result.identity) {
        this._isLoggedIn = true;
        localStorage.setItem('token', result.token);
        localStorage.setItem("identity", JSON.stringify(result.identity));
        this.toast({message: "Sikeres bejelentkezés", type: 'success'});
      }
    })
    .catch(error => {
      this.toast({message: "Helytelen felhasználónév vagy jelszó!", type: 'danger'});
    })
  }

  toast(opts) {
    const root = document.getElementById('toast_messages');
    const toast = document.createElement('toast-component');
    toast.title = opts.title;
    toast.message = opts.message;
    toast.type = opts.type;
    root.appendChild(toast);
  }

  render() {
    return html`
      ${this._isLoggedIn
        ? html`
            <default-layout 
              .handleLogout=${this.handleLogout} 
              .routes=${routes}
            >
            </default-layout>
          `
        : html`
            <guest-layout 
              .handleLogin=${this.handleLogin}
            >
            </guest-layout>
          `
      }
      <div
        id="toast_messages"
        class="position-fixed bottom-0 left-0 p-3"
        style="z-index: 1100; left: 0; bottom: 0;"
      ></div>
    `;
  }
}

customElements.define('mapadmin-app', App)
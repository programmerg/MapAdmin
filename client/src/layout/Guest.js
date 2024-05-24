import { LitElement, html } from 'lit';
import img from "../../assets/logo-32x32.png"

export class Guest extends LitElement {

  static properties = {
    handleLogin: {},
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="modal show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header p-3 pb-4 border-bottom-0">
              <h1 class="modal-title fs-4"><img src="${img}" height="32"> MapAdmin</h1>
            </div>
            <div class="modal-body p-3 pt-0">
              <form-component .action=${"/mapserver/api/login"} .method=${"post"} .submit=${this.handleLogin} .controls=${html`
                <input-component 
                  .type=${"email"} 
                  .name=${"email"} 
                  .placeholder=${'name@example.com'} 
                  .required=${true} 
                  .label=${'Email address'} 
                  class="mb-3"
                  .variant=${'floating'}
                ></input-component>
                <input-component 
                  .type=${"password"} 
                  .name=${"password"} 
                  .placeholder=${'password'} 
                  .required=${true} 
                  .label=${'Password'} 
                  .minlength=${8} 
                  class="mb-3"
                  .variant=${'floating'}
                ></input-component>
                <small class="form-text text-muted mb-3 d-none">
                  <a href="#" class="text-decoration-none">Did you forget it?</a>
                </small>
                <button type="submit" class="btn btn-primary w-100 mb-2">Sign in</button>
              `}>
              </form-component>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('guest-layout', Guest);
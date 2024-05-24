import { LitElement } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

export class Router extends LitElement {

  static properties = {
    //_location: {type: String, state: true},
    routes: {type: Array},
  }
  
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.navigateTo = this.navigateTo;
    window.addEventListener("popstate", this.popListener);
    document.addEventListener("click", this.clickListener);
  }

  disconnectedCallback() {
    delete window.navigateTo;
    window.removeEventListener("popstate", this.popListener);
    document.removeEventListener("click", this.clickListener);
    super.disconnectedCallback();
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

  clickListener = (e) => {
    const isNonNavigationClick = e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey;
    if (e.defaultPrevented || isNonNavigationClick) {
      return;
    }

    const anchor = e.composedPath().find(n => n.tagName === 'A');
    if (
      anchor === undefined ||
      anchor.target !== '' ||
      anchor.hasAttribute('download') ||
      anchor.getAttribute('rel') === 'external' ||
      anchor.href === '' || 
      anchor.href.startsWith('mailto:') ||
      anchor.origin !== location.origin
    ) {
      return;
    }

    if (anchor.getAttribute('data-bs-toggle') == 'router') {
      e.preventDefault();
      if (anchor.href !== location.href) {
        this.navigateTo(anchor.href);
      }
    }
  }

  popListener = (e) => {
    // this._location = location.pathname;
    this.requestUpdate();
  }

  navigateTo = (url) => {
    history.pushState(null, null, url);
    // this._location = (new URL(url)).pathname;
    this.requestUpdate();
  }

  pathToRegex(path) {
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
  } 
      
  getParams(path, result) {
    const keys = Array.from(path.matchAll(/:(\w+)/g)).map(result => result[1]);
    const values = result.slice(1);
    return Object.fromEntries(keys.map((key, i) => {
      return [key, values[i]];
    }));
  }

  render() {

    // Test each route for potential match
    const potentialMatches = this.routes.map(route => {
      return {
        route: route,
        result: location.pathname.match(this.pathToRegex(route.path ?? ''))
      };
    });

    let match = potentialMatches.find(potentialMatch => 
      potentialMatch.result !== null
    );

    // Fallback for the last page when no match
    if (!match) {
      match = {
        route: this.routes[this.routes.length - 1],
        result: [location.pathname]
      };
    }
    
    // Load the page
    const tag = unsafeStatic(match.route.component ?? '');
    const params = this.getParams(match.route.path ?? '', match.result);
    params.ts = new Date()
    return html`<${tag} .params=${params}></${tag}>`;
  }
}

customElements.define('router-component', Router);

if (!window.customElements) {
  var div = document.createElement('div');
  div.className = "alert bg-warning rounded-0 w-100 text-center position-fixed top-0";
  div.style = "cursor: pointer; z-index: 9999;"
  div.onclick = function(e) { this.remove(); };
  div.innerHTML = [
    'Figyelem, a rendszer használatához modern ',
    '<a href="http://www.google.com/chrome" target="_blank">Chrome</a>, ',
    '<a href="http://www.mozilla.org/products/firefox/" target="_blank">Firefox</a>, ',
    '<a href="http://www.opera.com/" target="_blank">Opera</a>, ',
    '<a href="http://www.apple.com/safari/" target="_blank">Safari</a> vagy ',
    '<a href="https://www.microsoft.com/en-us/edge" target="_blank">Edge</a> ',
    'böngésző használata javasolt.'
  ].join('');
  document.body.appendChild(div);
}

import './main.css'
import * as components from './components';
import * as layout from './layout';
import * as modals from './modals';
import { App } from './App';

var ko=Object.defineProperty;var Mo=(s,t,e)=>t in s?ko(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var C=(s,t,e)=>(Mo(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $e=window,ws=$e.ShadowRoot&&($e.ShadyCSS===void 0||$e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ti=Symbol(),nn=new WeakMap;let Po=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==ti)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ws&&t===void 0){const n=e!==void 0&&e.length===1;n&&(t=nn.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&nn.set(e,t))}return t}toString(){return this.cssText}};const Vo=s=>new Po(typeof s=="string"?s:s+"",void 0,ti),Wo=(s,t)=>{ws?s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const n=document.createElement("style"),i=$e.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=e.cssText,s.appendChild(n)})},on=ws?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return Vo(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ze;const Oe=window,an=Oe.trustedTypes,Ho=an?an.emptyScript:"",rn=Oe.reactiveElementPolyfillSupport,hs={toAttribute(s,t){switch(t){case Boolean:s=s?Ho:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ei=(s,t)=>t!==s&&(t==t||s==s),Ye={attribute:!0,type:String,converter:hs,reflect:!1,hasChanged:ei},ms="finalized";let Nt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,n)=>{const i=this._$Ep(n,e);i!==void 0&&(this._$Ev.set(i,n),t.push(i))}),t}static createProperty(t,e=Ye){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const n=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,n,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Ye}static finalize(){if(this.hasOwnProperty(ms))return!1;this[ms]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,n=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of n)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const i of n)e.unshift(on(i))}else t!==void 0&&e.push(on(t));return e}static _$Ep(t,e){const n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,n;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)===null||n===void 0||n.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Wo(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var n;return(n=e.hostConnected)===null||n===void 0?void 0:n.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var n;return(n=e.hostDisconnected)===null||n===void 0?void 0:n.call(e)})}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$EO(t,e,n=Ye){var i;const o=this.constructor._$Ep(t,n);if(o!==void 0&&n.reflect===!0){const a=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:hs).toAttribute(e,n.type);this._$El=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(t,e){var n;const i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){const a=i.getPropertyOptions(o),r=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?a.converter:hs;this._$El=o,this[o]=r.fromAttribute(e,a.type),this._$El=null}}requestUpdate(t,e,n){let i=!0;t!==void 0&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||ei)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),n.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,n))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(n)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(n)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,n)=>this._$EO(n,this[n],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};Nt[ms]=!0,Nt.elementProperties=new Map,Nt.elementStyles=[],Nt.shadowRootOptions={mode:"open"},rn==null||rn({ReactiveElement:Nt}),((ze=Oe.reactiveElementVersions)!==null&&ze!==void 0?ze:Oe.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ke;const xe=window,kt=xe.trustedTypes,ln=kt?kt.createPolicy("lit-html",{createHTML:s=>s}):void 0,fs="$lit$",nt=`lit$${(Math.random()+"").slice(9)}$`,si="?"+nt,Uo=`<${si}>`,_t=document,te=()=>_t.createComment(""),ee=s=>s===null||typeof s!="object"&&typeof s!="function",ni=Array.isArray,Fo=s=>ni(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",qe=`[ 	
\f\r]`,Kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cn=/-->/g,dn=/>/g,mt=RegExp(`>|${qe}(?:([^\\s"'>=/]+)(${qe}*=${qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),un=/'/g,pn=/"/g,ii=/^(?:script|style|textarea|title)$/i,jo=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),u=jo(1),Et=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),hn=new WeakMap,ft=_t.createTreeWalker(_t,129,null,!1);function oi(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ln!==void 0?ln.createHTML(t):t}const Bo=(s,t)=>{const e=s.length-1,n=[];let i,o=t===2?"<svg>":"",a=Kt;for(let r=0;r<e;r++){const l=s[r];let d,c,h=-1,m=0;for(;m<l.length&&(a.lastIndex=m,c=a.exec(l),c!==null);)m=a.lastIndex,a===Kt?c[1]==="!--"?a=cn:c[1]!==void 0?a=dn:c[2]!==void 0?(ii.test(c[2])&&(i=RegExp("</"+c[2],"g")),a=mt):c[3]!==void 0&&(a=mt):a===mt?c[0]===">"?(a=i??Kt,h=-1):c[1]===void 0?h=-2:(h=a.lastIndex-c[2].length,d=c[1],a=c[3]===void 0?mt:c[3]==='"'?pn:un):a===pn||a===un?a=mt:a===cn||a===dn?a=Kt:(a=mt,i=void 0);const f=a===mt&&s[r+1].startsWith("/>")?" ":"";o+=a===Kt?l+Uo:h>=0?(n.push(d),l.slice(0,h)+fs+l.slice(h)+nt+f):l+nt+(h===-2?(n.push(void 0),r):f)}return[oi(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),n]};class se{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let o=0,a=0;const r=t.length-1,l=this.parts,[d,c]=Bo(t,e);if(this.el=se.createElement(d,n),ft.currentNode=this.el.content,e===2){const h=this.el.content,m=h.firstChild;m.remove(),h.append(...m.childNodes)}for(;(i=ft.nextNode())!==null&&l.length<r;){if(i.nodeType===1){if(i.hasAttributes()){const h=[];for(const m of i.getAttributeNames())if(m.endsWith(fs)||m.startsWith(nt)){const f=c[a++];if(h.push(m),f!==void 0){const $=i.getAttribute(f.toLowerCase()+fs).split(nt),b=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:b[2],strings:$,ctor:b[1]==="."?zo:b[1]==="?"?Ko:b[1]==="@"?qo:De})}else l.push({type:6,index:o})}for(const m of h)i.removeAttribute(m)}if(ii.test(i.tagName)){const h=i.textContent.split(nt),m=h.length-1;if(m>0){i.textContent=kt?kt.emptyScript:"";for(let f=0;f<m;f++)i.append(h[f],te()),ft.nextNode(),l.push({type:2,index:++o});i.append(h[m],te())}}}else if(i.nodeType===8)if(i.data===si)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(nt,h+1))!==-1;)l.push({type:7,index:o}),h+=nt.length-1}o++}}static createElement(t,e){const n=_t.createElement("template");return n.innerHTML=t,n}}function Mt(s,t,e=s,n){var i,o,a,r;if(t===Et)return t;let l=n!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[n]:e._$Cl;const d=ee(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==d&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),d===void 0?l=void 0:(l=new d(s),l._$AT(s,e,n)),n!==void 0?((a=(r=e)._$Co)!==null&&a!==void 0?a:r._$Co=[])[n]=l:e._$Cl=l),l!==void 0&&(t=Mt(s,l._$AS(s,t.values),l,n)),t}class Go{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:n},parts:i}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:_t).importNode(n,!0);ft.currentNode=o;let a=ft.nextNode(),r=0,l=0,d=i[0];for(;d!==void 0;){if(r===d.index){let c;d.type===2?c=new ie(a,a.nextSibling,this,t):d.type===1?c=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(c=new Qo(a,this,t)),this._$AV.push(c),d=i[++l]}r!==(d==null?void 0:d.index)&&(a=ft.nextNode(),r++)}return ft.currentNode=_t,o}v(t){let e=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class ie{constructor(t,e,n,i){var o;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cp=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Mt(this,t,e),ee(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==Et&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Fo(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&ee(this._$AH)?this._$AA.nextSibling.data=t:this.$(_t.createTextNode(t)),this._$AH=t}g(t){var e;const{values:n,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=se.createElement(oi(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(n);else{const a=new Go(o,this),r=a.u(this.options);a.v(n),this.$(r),this._$AH=a}}_$AC(t){let e=hn.get(t.strings);return e===void 0&&hn.set(t.strings,e=new se(t)),e}T(t){ni(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const o of t)i===e.length?e.push(n=new ie(this.k(te()),this.k(te()),this,this.options)):n=e[i],n._$AI(o),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class De{constructor(t,e,n,i,o){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,n,i){const o=this.strings;let a=!1;if(o===void 0)t=Mt(this,t,e,0),a=!ee(t)||t!==this._$AH&&t!==Et,a&&(this._$AH=t);else{const r=t;let l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Mt(this,r[n+l],e,l),d===Et&&(d=this._$AH[l]),a||(a=!ee(d)||d!==this._$AH[l]),d===v?t=v:t!==v&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class zo extends De{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const Yo=kt?kt.emptyScript:"";class Ko extends De{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,Yo):this.element.removeAttribute(this.name)}}class qo extends De{constructor(t,e,n,i,o){super(t,e,n,i,o),this.type=5}_$AI(t,e=this){var n;if((t=(n=Mt(this,t,e,0))!==null&&n!==void 0?n:v)===Et)return;const i=this._$AH,o=t===v&&i!==v||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==v&&(i===v||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,n;typeof this._$AH=="function"?this._$AH.call((n=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&n!==void 0?n:this.element,t):this._$AH.handleEvent(t)}}class Qo{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Mt(this,t)}}const mn=xe.litHtmlPolyfillSupport;mn==null||mn(se,ie),((Ke=xe.litHtmlVersions)!==null&&Ke!==void 0?Ke:xe.litHtmlVersions=[]).push("2.8.0");const Xo=(s,t,e)=>{var n,i;const o=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:t;let a=o._$litPart$;if(a===void 0){const r=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=a=new ie(t.insertBefore(te(),r),r,void 0,e??{})}return a._$AI(s),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qe,Xe;let _=class extends Nt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const n=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=n.firstChild),n}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Xo(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return Et}};_.finalized=!0,_._$litElement$=!0,(Qe=globalThis.litElementHydrateSupport)===null||Qe===void 0||Qe.call(globalThis,{LitElement:_});const fn=globalThis.litElementPolyfillSupport;fn==null||fn({LitElement:_});((Xe=globalThis.litElementVersions)!==null&&Xe!==void 0?Xe:globalThis.litElementVersions=[]).push("3.3.3");var k="top",W="bottom",H="right",M="left",ke="auto",Ft=[k,W,H,M],yt="start",Pt="end",ai="clippingParents",Cs="viewport",Lt="popper",ri="reference",gs=Ft.reduce(function(s,t){return s.concat([t+"-"+yt,t+"-"+Pt])},[]),Os=[].concat(Ft,[ke]).reduce(function(s,t){return s.concat([t,t+"-"+yt,t+"-"+Pt])},[]),li="beforeRead",ci="read",di="afterRead",ui="beforeMain",pi="main",hi="afterMain",mi="beforeWrite",fi="write",gi="afterWrite",vi=[li,ci,di,ui,pi,hi,mi,fi,gi];function Q(s){return s?(s.nodeName||"").toLowerCase():null}function U(s){if(s==null)return window;if(s.toString()!=="[object Window]"){var t=s.ownerDocument;return t&&t.defaultView||window}return s}function $t(s){var t=U(s).Element;return s instanceof t||s instanceof Element}function F(s){var t=U(s).HTMLElement;return s instanceof t||s instanceof HTMLElement}function xs(s){if(typeof ShadowRoot>"u")return!1;var t=U(s).ShadowRoot;return s instanceof t||s instanceof ShadowRoot}function Zo(s){var t=s.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},o=t.elements[e];!F(o)||!Q(o)||(Object.assign(o.style,n),Object.keys(i).forEach(function(a){var r=i[a];r===!1?o.removeAttribute(a):o.setAttribute(a,r===!0?"":r)}))})}function Jo(s){var t=s.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],o=t.attributes[n]||{},a=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),r=a.reduce(function(l,d){return l[d]="",l},{});!F(i)||!Q(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(l){i.removeAttribute(l)}))})}}const Ns={name:"applyStyles",enabled:!0,phase:"write",fn:Zo,effect:Jo,requires:["computeStyles"]};function q(s){return s.split("-")[0]}var bt=Math.max,Ne=Math.min,Vt=Math.round;function vs(){var s=navigator.userAgentData;return s!=null&&s.brands&&Array.isArray(s.brands)?s.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function bi(){return!/^((?!chrome|android).)*safari/i.test(vs())}function Wt(s,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=s.getBoundingClientRect(),i=1,o=1;t&&F(s)&&(i=s.offsetWidth>0&&Vt(n.width)/s.offsetWidth||1,o=s.offsetHeight>0&&Vt(n.height)/s.offsetHeight||1);var a=$t(s)?U(s):window,r=a.visualViewport,l=!bi()&&e,d=(n.left+(l&&r?r.offsetLeft:0))/i,c=(n.top+(l&&r?r.offsetTop:0))/o,h=n.width/i,m=n.height/o;return{width:h,height:m,top:c,right:d+h,bottom:c+m,left:d,x:d,y:c}}function Ls(s){var t=Wt(s),e=s.offsetWidth,n=s.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:s.offsetLeft,y:s.offsetTop,width:e,height:n}}function _i(s,t){var e=t.getRootNode&&t.getRootNode();if(s.contains(t))return!0;if(e&&xs(e)){var n=t;do{if(n&&s.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function J(s){return U(s).getComputedStyle(s)}function ta(s){return["table","td","th"].indexOf(Q(s))>=0}function at(s){return(($t(s)?s.ownerDocument:s.document)||window.document).documentElement}function Me(s){return Q(s)==="html"?s:s.assignedSlot||s.parentNode||(xs(s)?s.host:null)||at(s)}function gn(s){return!F(s)||J(s).position==="fixed"?null:s.offsetParent}function ea(s){var t=/firefox/i.test(vs()),e=/Trident/i.test(vs());if(e&&F(s)){var n=J(s);if(n.position==="fixed")return null}var i=Me(s);for(xs(i)&&(i=i.host);F(i)&&["html","body"].indexOf(Q(i))<0;){var o=J(i);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||t&&o.willChange==="filter"||t&&o.filter&&o.filter!=="none")return i;i=i.parentNode}return null}function oe(s){for(var t=U(s),e=gn(s);e&&ta(e)&&J(e).position==="static";)e=gn(e);return e&&(Q(e)==="html"||Q(e)==="body"&&J(e).position==="static")?t:e||ea(s)||t}function Rs(s){return["top","bottom"].indexOf(s)>=0?"x":"y"}function Zt(s,t,e){return bt(s,Ne(t,e))}function sa(s,t,e){var n=Zt(s,t,e);return n>e?e:n}function Ei(){return{top:0,right:0,bottom:0,left:0}}function yi(s){return Object.assign({},Ei(),s)}function $i(s,t){return t.reduce(function(e,n){return e[n]=s,e},{})}var na=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,yi(typeof t!="number"?t:$i(t,Ft))};function ia(s){var t,e=s.state,n=s.name,i=s.options,o=e.elements.arrow,a=e.modifiersData.popperOffsets,r=q(e.placement),l=Rs(r),d=[M,H].indexOf(r)>=0,c=d?"height":"width";if(!(!o||!a)){var h=na(i.padding,e),m=Ls(o),f=l==="y"?k:M,$=l==="y"?W:H,b=e.rects.reference[c]+e.rects.reference[l]-a[l]-e.rects.popper[c],y=a[l]-e.rects.reference[l],T=oe(o),O=T?l==="y"?T.clientHeight||0:T.clientWidth||0:0,x=b/2-y/2,E=h[f],A=O-m[c]-h[$],S=O/2-m[c]/2+x,w=Zt(E,S,A),R=l;e.modifiersData[n]=(t={},t[R]=w,t.centerOffset=w-S,t)}}function oa(s){var t=s.state,e=s.options,n=e.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||_i(t.elements.popper,i)&&(t.elements.arrow=i))}const Ai={name:"arrow",enabled:!0,phase:"main",fn:ia,effect:oa,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ht(s){return s.split("-")[1]}var aa={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ra(s,t){var e=s.x,n=s.y,i=t.devicePixelRatio||1;return{x:Vt(e*i)/i||0,y:Vt(n*i)/i||0}}function vn(s){var t,e=s.popper,n=s.popperRect,i=s.placement,o=s.variation,a=s.offsets,r=s.position,l=s.gpuAcceleration,d=s.adaptive,c=s.roundOffsets,h=s.isFixed,m=a.x,f=m===void 0?0:m,$=a.y,b=$===void 0?0:$,y=typeof c=="function"?c({x:f,y:b}):{x:f,y:b};f=y.x,b=y.y;var T=a.hasOwnProperty("x"),O=a.hasOwnProperty("y"),x=M,E=k,A=window;if(d){var S=oe(e),w="clientHeight",R="clientWidth";if(S===U(e)&&(S=at(e),J(S).position!=="static"&&r==="absolute"&&(w="scrollHeight",R="scrollWidth")),S=S,i===k||(i===M||i===H)&&o===Pt){E=W;var L=h&&S===A&&A.visualViewport?A.visualViewport.height:S[w];b-=L-n.height,b*=l?1:-1}if(i===M||(i===k||i===W)&&o===Pt){x=H;var N=h&&S===A&&A.visualViewport?A.visualViewport.width:S[R];f-=N-n.width,f*=l?1:-1}}var I=Object.assign({position:r},d&&aa),z=c===!0?ra({x:f,y:b},U(e)):{x:f,y:b};if(f=z.x,b=z.y,l){var D;return Object.assign({},I,(D={},D[E]=O?"0":"",D[x]=T?"0":"",D.transform=(A.devicePixelRatio||1)<=1?"translate("+f+"px, "+b+"px)":"translate3d("+f+"px, "+b+"px, 0)",D))}return Object.assign({},I,(t={},t[E]=O?b+"px":"",t[x]=T?f+"px":"",t.transform="",t))}function la(s){var t=s.state,e=s.options,n=e.gpuAcceleration,i=n===void 0?!0:n,o=e.adaptive,a=o===void 0?!0:o,r=e.roundOffsets,l=r===void 0?!0:r,d={placement:q(t.placement),variation:Ht(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,vn(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,vn(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Is={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:la,data:{}};var fe={passive:!0};function ca(s){var t=s.state,e=s.instance,n=s.options,i=n.scroll,o=i===void 0?!0:i,a=n.resize,r=a===void 0?!0:a,l=U(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&d.forEach(function(c){c.addEventListener("scroll",e.update,fe)}),r&&l.addEventListener("resize",e.update,fe),function(){o&&d.forEach(function(c){c.removeEventListener("scroll",e.update,fe)}),r&&l.removeEventListener("resize",e.update,fe)}}const Ds={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:ca,data:{}};var da={left:"right",right:"left",bottom:"top",top:"bottom"};function Ae(s){return s.replace(/left|right|bottom|top/g,function(t){return da[t]})}var ua={start:"end",end:"start"};function bn(s){return s.replace(/start|end/g,function(t){return ua[t]})}function ks(s){var t=U(s),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function Ms(s){return Wt(at(s)).left+ks(s).scrollLeft}function pa(s,t){var e=U(s),n=at(s),i=e.visualViewport,o=n.clientWidth,a=n.clientHeight,r=0,l=0;if(i){o=i.width,a=i.height;var d=bi();(d||!d&&t==="fixed")&&(r=i.offsetLeft,l=i.offsetTop)}return{width:o,height:a,x:r+Ms(s),y:l}}function ha(s){var t,e=at(s),n=ks(s),i=(t=s.ownerDocument)==null?void 0:t.body,o=bt(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),a=bt(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),r=-n.scrollLeft+Ms(s),l=-n.scrollTop;return J(i||e).direction==="rtl"&&(r+=bt(e.clientWidth,i?i.clientWidth:0)-o),{width:o,height:a,x:r,y:l}}function Ps(s){var t=J(s),e=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+n)}function Si(s){return["html","body","#document"].indexOf(Q(s))>=0?s.ownerDocument.body:F(s)&&Ps(s)?s:Si(Me(s))}function Jt(s,t){var e;t===void 0&&(t=[]);var n=Si(s),i=n===((e=s.ownerDocument)==null?void 0:e.body),o=U(n),a=i?[o].concat(o.visualViewport||[],Ps(n)?n:[]):n,r=t.concat(a);return i?r:r.concat(Jt(Me(a)))}function bs(s){return Object.assign({},s,{left:s.x,top:s.y,right:s.x+s.width,bottom:s.y+s.height})}function ma(s,t){var e=Wt(s,!1,t==="fixed");return e.top=e.top+s.clientTop,e.left=e.left+s.clientLeft,e.bottom=e.top+s.clientHeight,e.right=e.left+s.clientWidth,e.width=s.clientWidth,e.height=s.clientHeight,e.x=e.left,e.y=e.top,e}function _n(s,t,e){return t===Cs?bs(pa(s,e)):$t(t)?ma(t,e):bs(ha(at(s)))}function fa(s){var t=Jt(Me(s)),e=["absolute","fixed"].indexOf(J(s).position)>=0,n=e&&F(s)?oe(s):s;return $t(n)?t.filter(function(i){return $t(i)&&_i(i,n)&&Q(i)!=="body"}):[]}function ga(s,t,e,n){var i=t==="clippingParents"?fa(s):[].concat(t),o=[].concat(i,[e]),a=o[0],r=o.reduce(function(l,d){var c=_n(s,d,n);return l.top=bt(c.top,l.top),l.right=Ne(c.right,l.right),l.bottom=Ne(c.bottom,l.bottom),l.left=bt(c.left,l.left),l},_n(s,a,n));return r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}function Ti(s){var t=s.reference,e=s.element,n=s.placement,i=n?q(n):null,o=n?Ht(n):null,a=t.x+t.width/2-e.width/2,r=t.y+t.height/2-e.height/2,l;switch(i){case k:l={x:a,y:t.y-e.height};break;case W:l={x:a,y:t.y+t.height};break;case H:l={x:t.x+t.width,y:r};break;case M:l={x:t.x-e.width,y:r};break;default:l={x:t.x,y:t.y}}var d=i?Rs(i):null;if(d!=null){var c=d==="y"?"height":"width";switch(o){case yt:l[d]=l[d]-(t[c]/2-e[c]/2);break;case Pt:l[d]=l[d]+(t[c]/2-e[c]/2);break}}return l}function Ut(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=n===void 0?s.placement:n,o=e.strategy,a=o===void 0?s.strategy:o,r=e.boundary,l=r===void 0?ai:r,d=e.rootBoundary,c=d===void 0?Cs:d,h=e.elementContext,m=h===void 0?Lt:h,f=e.altBoundary,$=f===void 0?!1:f,b=e.padding,y=b===void 0?0:b,T=yi(typeof y!="number"?y:$i(y,Ft)),O=m===Lt?ri:Lt,x=s.rects.popper,E=s.elements[$?O:m],A=ga($t(E)?E:E.contextElement||at(s.elements.popper),l,c,a),S=Wt(s.elements.reference),w=Ti({reference:S,element:x,strategy:"absolute",placement:i}),R=bs(Object.assign({},x,w)),L=m===Lt?R:S,N={top:A.top-L.top+T.top,bottom:L.bottom-A.bottom+T.bottom,left:A.left-L.left+T.left,right:L.right-A.right+T.right},I=s.modifiersData.offset;if(m===Lt&&I){var z=I[i];Object.keys(N).forEach(function(D){var ct=[H,W].indexOf(D)>=0?1:-1,dt=[k,W].indexOf(D)>=0?"y":"x";N[D]+=z[dt]*ct})}return N}function va(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=e.boundary,o=e.rootBoundary,a=e.padding,r=e.flipVariations,l=e.allowedAutoPlacements,d=l===void 0?Os:l,c=Ht(n),h=c?r?gs:gs.filter(function($){return Ht($)===c}):Ft,m=h.filter(function($){return d.indexOf($)>=0});m.length===0&&(m=h);var f=m.reduce(function($,b){return $[b]=Ut(s,{placement:b,boundary:i,rootBoundary:o,padding:a})[q(b)],$},{});return Object.keys(f).sort(function($,b){return f[$]-f[b]})}function ba(s){if(q(s)===ke)return[];var t=Ae(s);return[bn(s),t,bn(t)]}function _a(s){var t=s.state,e=s.options,n=s.name;if(!t.modifiersData[n]._skip){for(var i=e.mainAxis,o=i===void 0?!0:i,a=e.altAxis,r=a===void 0?!0:a,l=e.fallbackPlacements,d=e.padding,c=e.boundary,h=e.rootBoundary,m=e.altBoundary,f=e.flipVariations,$=f===void 0?!0:f,b=e.allowedAutoPlacements,y=t.options.placement,T=q(y),O=T===y,x=l||(O||!$?[Ae(y)]:ba(y)),E=[y].concat(x).reduce(function(Ct,et){return Ct.concat(q(et)===ke?va(t,{placement:et,boundary:c,rootBoundary:h,padding:d,flipVariations:$,allowedAutoPlacements:b}):et)},[]),A=t.rects.reference,S=t.rects.popper,w=new Map,R=!0,L=E[0],N=0;N<E.length;N++){var I=E[N],z=q(I),D=Ht(I)===yt,ct=[k,W].indexOf(z)>=0,dt=ct?"width":"height",V=Ut(t,{placement:I,boundary:c,rootBoundary:h,altBoundary:m,padding:d}),Y=ct?D?H:M:D?W:k;A[dt]>S[dt]&&(Y=Ae(Y));var de=Ae(Y),ut=[];if(o&&ut.push(V[z]<=0),r&&ut.push(V[Y]<=0,V[de]<=0),ut.every(function(Ct){return Ct})){L=I,R=!1;break}w.set(I,ut)}if(R)for(var ue=$?3:1,Fe=function(et){var Yt=E.find(function(he){var pt=w.get(he);if(pt)return pt.slice(0,et).every(function(je){return je})});if(Yt)return L=Yt,"break"},zt=ue;zt>0;zt--){var pe=Fe(zt);if(pe==="break")break}t.placement!==L&&(t.modifiersData[n]._skip=!0,t.placement=L,t.reset=!0)}}const wi={name:"flip",enabled:!0,phase:"main",fn:_a,requiresIfExists:["offset"],data:{_skip:!1}};function En(s,t,e){return e===void 0&&(e={x:0,y:0}),{top:s.top-t.height-e.y,right:s.right-t.width+e.x,bottom:s.bottom-t.height+e.y,left:s.left-t.width-e.x}}function yn(s){return[k,H,W,M].some(function(t){return s[t]>=0})}function Ea(s){var t=s.state,e=s.name,n=t.rects.reference,i=t.rects.popper,o=t.modifiersData.preventOverflow,a=Ut(t,{elementContext:"reference"}),r=Ut(t,{altBoundary:!0}),l=En(a,n),d=En(r,i,o),c=yn(l),h=yn(d);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":h})}const Ci={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Ea};function ya(s,t,e){var n=q(s),i=[M,k].indexOf(n)>=0?-1:1,o=typeof e=="function"?e(Object.assign({},t,{placement:s})):e,a=o[0],r=o[1];return a=a||0,r=(r||0)*i,[M,H].indexOf(n)>=0?{x:r,y:a}:{x:a,y:r}}function $a(s){var t=s.state,e=s.options,n=s.name,i=e.offset,o=i===void 0?[0,0]:i,a=Os.reduce(function(c,h){return c[h]=ya(h,t.rects,o),c},{}),r=a[t.placement],l=r.x,d=r.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[n]=a}const Oi={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:$a};function Aa(s){var t=s.state,e=s.name;t.modifiersData[e]=Ti({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Vs={name:"popperOffsets",enabled:!0,phase:"read",fn:Aa,data:{}};function Sa(s){return s==="x"?"y":"x"}function Ta(s){var t=s.state,e=s.options,n=s.name,i=e.mainAxis,o=i===void 0?!0:i,a=e.altAxis,r=a===void 0?!1:a,l=e.boundary,d=e.rootBoundary,c=e.altBoundary,h=e.padding,m=e.tether,f=m===void 0?!0:m,$=e.tetherOffset,b=$===void 0?0:$,y=Ut(t,{boundary:l,rootBoundary:d,padding:h,altBoundary:c}),T=q(t.placement),O=Ht(t.placement),x=!O,E=Rs(T),A=Sa(E),S=t.modifiersData.popperOffsets,w=t.rects.reference,R=t.rects.popper,L=typeof b=="function"?b(Object.assign({},t.rects,{placement:t.placement})):b,N=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),I=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(S){if(o){var D,ct=E==="y"?k:M,dt=E==="y"?W:H,V=E==="y"?"height":"width",Y=S[E],de=Y+y[ct],ut=Y-y[dt],ue=f?-R[V]/2:0,Fe=O===yt?w[V]:R[V],zt=O===yt?-R[V]:-w[V],pe=t.elements.arrow,Ct=f&&pe?Ls(pe):{width:0,height:0},et=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ei(),Yt=et[ct],he=et[dt],pt=Zt(0,w[V],Ct[V]),je=x?w[V]/2-ue-pt-Yt-N.mainAxis:Fe-pt-Yt-N.mainAxis,xo=x?-w[V]/2+ue+pt+he+N.mainAxis:zt+pt+he+N.mainAxis,Be=t.elements.arrow&&oe(t.elements.arrow),No=Be?E==="y"?Be.clientTop||0:Be.clientLeft||0:0,Ks=(D=I==null?void 0:I[E])!=null?D:0,Lo=Y+je-Ks-No,Ro=Y+xo-Ks,qs=Zt(f?Ne(de,Lo):de,Y,f?bt(ut,Ro):ut);S[E]=qs,z[E]=qs-Y}if(r){var Qs,Io=E==="x"?k:M,Do=E==="x"?W:H,ht=S[A],me=A==="y"?"height":"width",Xs=ht+y[Io],Zs=ht-y[Do],Ge=[k,M].indexOf(T)!==-1,Js=(Qs=I==null?void 0:I[A])!=null?Qs:0,tn=Ge?Xs:ht-w[me]-R[me]-Js+N.altAxis,en=Ge?ht+w[me]+R[me]-Js-N.altAxis:Zs,sn=f&&Ge?sa(tn,ht,en):Zt(f?tn:Xs,ht,f?en:Zs);S[A]=sn,z[A]=sn-ht}t.modifiersData[n]=z}}const xi={name:"preventOverflow",enabled:!0,phase:"main",fn:Ta,requiresIfExists:["offset"]};function wa(s){return{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}}function Ca(s){return s===U(s)||!F(s)?ks(s):wa(s)}function Oa(s){var t=s.getBoundingClientRect(),e=Vt(t.width)/s.offsetWidth||1,n=Vt(t.height)/s.offsetHeight||1;return e!==1||n!==1}function xa(s,t,e){e===void 0&&(e=!1);var n=F(t),i=F(t)&&Oa(t),o=at(t),a=Wt(s,i,e),r={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!e)&&((Q(t)!=="body"||Ps(o))&&(r=Ca(t)),F(t)?(l=Wt(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):o&&(l.x=Ms(o))),{x:a.left+r.scrollLeft-l.x,y:a.top+r.scrollTop-l.y,width:a.width,height:a.height}}function Na(s){var t=new Map,e=new Set,n=[];s.forEach(function(o){t.set(o.name,o)});function i(o){e.add(o.name);var a=[].concat(o.requires||[],o.requiresIfExists||[]);a.forEach(function(r){if(!e.has(r)){var l=t.get(r);l&&i(l)}}),n.push(o)}return s.forEach(function(o){e.has(o.name)||i(o)}),n}function La(s){var t=Na(s);return vi.reduce(function(e,n){return e.concat(t.filter(function(i){return i.phase===n}))},[])}function Ra(s){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(s())})})),t}}function Ia(s){var t=s.reduce(function(e,n){var i=e[n.name];return e[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var $n={placement:"bottom",modifiers:[],strategy:"absolute"};function An(){for(var s=arguments.length,t=new Array(s),e=0;e<s;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Pe(s){s===void 0&&(s={});var t=s,e=t.defaultModifiers,n=e===void 0?[]:e,i=t.defaultOptions,o=i===void 0?$n:i;return function(r,l,d){d===void 0&&(d=o);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},$n,o),modifiersData:{},elements:{reference:r,popper:l},attributes:{},styles:{}},h=[],m=!1,f={state:c,setOptions:function(T){var O=typeof T=="function"?T(c.options):T;b(),c.options=Object.assign({},o,c.options,O),c.scrollParents={reference:$t(r)?Jt(r):r.contextElement?Jt(r.contextElement):[],popper:Jt(l)};var x=La(Ia([].concat(n,c.options.modifiers)));return c.orderedModifiers=x.filter(function(E){return E.enabled}),$(),f.update()},forceUpdate:function(){if(!m){var T=c.elements,O=T.reference,x=T.popper;if(An(O,x)){c.rects={reference:xa(O,oe(x),c.options.strategy==="fixed"),popper:Ls(x)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(N){return c.modifiersData[N.name]=Object.assign({},N.data)});for(var E=0;E<c.orderedModifiers.length;E++){if(c.reset===!0){c.reset=!1,E=-1;continue}var A=c.orderedModifiers[E],S=A.fn,w=A.options,R=w===void 0?{}:w,L=A.name;typeof S=="function"&&(c=S({state:c,options:R,name:L,instance:f})||c)}}}},update:Ra(function(){return new Promise(function(y){f.forceUpdate(),y(c)})}),destroy:function(){b(),m=!0}};if(!An(r,l))return f;f.setOptions(d).then(function(y){!m&&d.onFirstUpdate&&d.onFirstUpdate(y)});function $(){c.orderedModifiers.forEach(function(y){var T=y.name,O=y.options,x=O===void 0?{}:O,E=y.effect;if(typeof E=="function"){var A=E({state:c,name:T,instance:f,options:x}),S=function(){};h.push(A||S)}})}function b(){h.forEach(function(y){return y()}),h=[]}return f}}var Da=Pe(),ka=[Ds,Vs,Is,Ns],Ma=Pe({defaultModifiers:ka}),Pa=[Ds,Vs,Is,Ns,Oi,wi,xi,Ai,Ci],Ws=Pe({defaultModifiers:Pa});const Ni=Object.freeze(Object.defineProperty({__proto__:null,afterMain:hi,afterRead:di,afterWrite:gi,applyStyles:Ns,arrow:Ai,auto:ke,basePlacements:Ft,beforeMain:ui,beforeRead:li,beforeWrite:mi,bottom:W,clippingParents:ai,computeStyles:Is,createPopper:Ws,createPopperBase:Da,createPopperLite:Ma,detectOverflow:Ut,end:Pt,eventListeners:Ds,flip:wi,hide:Ci,left:M,main:pi,modifierPhases:vi,offset:Oi,placements:Os,popper:Lt,popperGenerator:Pe,popperOffsets:Vs,preventOverflow:xi,read:ci,reference:ri,right:H,start:yt,top:k,variationPlacements:gs,viewport:Cs,write:fi},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const st=new Map,Ze={set(s,t,e){st.has(s)||st.set(s,new Map);const n=st.get(s);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(s,t){return st.has(s)&&st.get(s).get(t)||null},remove(s,t){if(!st.has(s))return;const e=st.get(s);e.delete(t),e.size===0&&st.delete(s)}},Va=1e6,Wa=1e3,_s="transitionend",Li=s=>(s&&window.CSS&&window.CSS.escape&&(s=s.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),s),Ha=s=>s==null?`${s}`:Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(),Ua=s=>{do s+=Math.floor(Math.random()*Va);while(document.getElementById(s));return s},Fa=s=>{if(!s)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(s);const n=Number.parseFloat(t),i=Number.parseFloat(e);return!n&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*Wa)},Ri=s=>{s.dispatchEvent(new Event(_s))},X=s=>!s||typeof s!="object"?!1:(typeof s.jquery<"u"&&(s=s[0]),typeof s.nodeType<"u"),it=s=>X(s)?s.jquery?s[0]:s:typeof s=="string"&&s.length>0?document.querySelector(Li(s)):null,jt=s=>{if(!X(s)||s.getClientRects().length===0)return!1;const t=getComputedStyle(s).getPropertyValue("visibility")==="visible",e=s.closest("details:not([open])");if(!e)return t;if(e!==s){const n=s.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},ot=s=>!s||s.nodeType!==Node.ELEMENT_NODE||s.classList.contains("disabled")?!0:typeof s.disabled<"u"?s.disabled:s.hasAttribute("disabled")&&s.getAttribute("disabled")!=="false",Ii=s=>{if(!document.documentElement.attachShadow)return null;if(typeof s.getRootNode=="function"){const t=s.getRootNode();return t instanceof ShadowRoot?t:null}return s instanceof ShadowRoot?s:s.parentNode?Ii(s.parentNode):null},Le=()=>{},ae=s=>{s.offsetHeight},Di=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,Je=[],ja=s=>{document.readyState==="loading"?(Je.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of Je)t()}),Je.push(s)):s()},j=()=>document.documentElement.dir==="rtl",G=s=>{ja(()=>{const t=Di();if(t){const e=s.NAME,n=t.fn[e];t.fn[e]=s.jQueryInterface,t.fn[e].Constructor=s,t.fn[e].noConflict=()=>(t.fn[e]=n,s.jQueryInterface)}})},P=(s,t=[],e=s)=>typeof s=="function"?s(...t):e,ki=(s,t,e=!0)=>{if(!e){P(s);return}const n=5,i=Fa(t)+n;let o=!1;const a=({target:r})=>{r===t&&(o=!0,t.removeEventListener(_s,a),P(s))};t.addEventListener(_s,a),setTimeout(()=>{o||Ri(t)},i)},Hs=(s,t,e,n)=>{const i=s.length;let o=s.indexOf(t);return o===-1?!e&&n?s[i-1]:s[0]:(o+=e?1:-1,n&&(o=(o+i)%i),s[Math.max(0,Math.min(o,i-1))])},Ba=/[^.]*(?=\..*)\.|.*/,Ga=/\..*/,za=/::\d+$/,ts={};let Sn=1;const Mi={mouseenter:"mouseover",mouseleave:"mouseout"},Ya=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Pi(s,t){return t&&`${t}::${Sn++}`||s.uidEvent||Sn++}function Vi(s){const t=Pi(s);return s.uidEvent=t,ts[t]=ts[t]||{},ts[t]}function Ka(s,t){return function e(n){return Us(n,{delegateTarget:s}),e.oneOff&&p.off(s,n.type,t),t.apply(s,[n])}}function qa(s,t,e){return function n(i){const o=s.querySelectorAll(t);for(let{target:a}=i;a&&a!==this;a=a.parentNode)for(const r of o)if(r===a)return Us(i,{delegateTarget:a}),n.oneOff&&p.off(s,i.type,t,e),e.apply(a,[i])}}function Wi(s,t,e=null){return Object.values(s).find(n=>n.callable===t&&n.delegationSelector===e)}function Hi(s,t,e){const n=typeof t=="string",i=n?e:t||e;let o=Ui(s);return Ya.has(o)||(o=s),[n,i,o]}function Tn(s,t,e,n,i){if(typeof t!="string"||!s)return;let[o,a,r]=Hi(t,e,n);t in Mi&&(a=($=>function(b){if(!b.relatedTarget||b.relatedTarget!==b.delegateTarget&&!b.delegateTarget.contains(b.relatedTarget))return $.call(this,b)})(a));const l=Vi(s),d=l[r]||(l[r]={}),c=Wi(d,a,o?e:null);if(c){c.oneOff=c.oneOff&&i;return}const h=Pi(a,t.replace(Ba,"")),m=o?qa(s,e,a):Ka(s,a);m.delegationSelector=o?e:null,m.callable=a,m.oneOff=i,m.uidEvent=h,d[h]=m,s.addEventListener(r,m,o)}function Es(s,t,e,n,i){const o=Wi(t[e],n,i);o&&(s.removeEventListener(e,o,!!i),delete t[e][o.uidEvent])}function Qa(s,t,e,n){const i=t[e]||{};for(const[o,a]of Object.entries(i))o.includes(n)&&Es(s,t,e,a.callable,a.delegationSelector)}function Ui(s){return s=s.replace(Ga,""),Mi[s]||s}const p={on(s,t,e,n){Tn(s,t,e,n,!1)},one(s,t,e,n){Tn(s,t,e,n,!0)},off(s,t,e,n){if(typeof t!="string"||!s)return;const[i,o,a]=Hi(t,e,n),r=a!==t,l=Vi(s),d=l[a]||{},c=t.startsWith(".");if(typeof o<"u"){if(!Object.keys(d).length)return;Es(s,l,a,o,i?e:null);return}if(c)for(const h of Object.keys(l))Qa(s,l,h,t.slice(1));for(const[h,m]of Object.entries(d)){const f=h.replace(za,"");(!r||t.includes(f))&&Es(s,l,a,m.callable,m.delegationSelector)}},trigger(s,t,e){if(typeof t!="string"||!s)return null;const n=Di(),i=Ui(t),o=t!==i;let a=null,r=!0,l=!0,d=!1;o&&n&&(a=n.Event(t,e),n(s).trigger(a),r=!a.isPropagationStopped(),l=!a.isImmediatePropagationStopped(),d=a.isDefaultPrevented());const c=Us(new Event(t,{bubbles:r,cancelable:!0}),e);return d&&c.preventDefault(),l&&s.dispatchEvent(c),c.defaultPrevented&&a&&a.preventDefault(),c}};function Us(s,t={}){for(const[e,n]of Object.entries(t))try{s[e]=n}catch{Object.defineProperty(s,e,{configurable:!0,get(){return n}})}return s}function wn(s){if(s==="true")return!0;if(s==="false")return!1;if(s===Number(s).toString())return Number(s);if(s===""||s==="null")return null;if(typeof s!="string")return s;try{return JSON.parse(decodeURIComponent(s))}catch{return s}}function es(s){return s.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const Z={setDataAttribute(s,t,e){s.setAttribute(`data-bs-${es(t)}`,e)},removeDataAttribute(s,t){s.removeAttribute(`data-bs-${es(t)}`)},getDataAttributes(s){if(!s)return{};const t={},e=Object.keys(s.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),t[i]=wn(s.dataset[n])}return t},getDataAttribute(s,t){return wn(s.getAttribute(`data-bs-${es(t)}`))}};class re{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=X(e)?Z.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...X(e)?Z.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,i]of Object.entries(e)){const o=t[n],a=X(o)?"element":Ha(o);if(!new RegExp(i).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${i}".`)}}}const Xa="5.3.3";class K extends re{constructor(t,e){super(),t=it(t),t&&(this._element=t,this._config=this._getConfig(e),Ze.set(this._element,this.constructor.DATA_KEY,this))}dispose(){Ze.remove(this._element,this.constructor.DATA_KEY),p.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){ki(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return Ze.get(it(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return Xa}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const ss=s=>{let t=s.getAttribute("data-bs-target");if(!t||t==="#"){let e=s.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?e.trim():null}return t?t.split(",").map(e=>Li(e)).join(","):null},g={find(s,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,s))},findOne(s,t=document.documentElement){return Element.prototype.querySelector.call(t,s)},children(s,t){return[].concat(...s.children).filter(e=>e.matches(t))},parents(s,t){const e=[];let n=s.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(s,t){let e=s.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(s,t){let e=s.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(s){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,s).filter(e=>!ot(e)&&jt(e))},getSelectorFromElement(s){const t=ss(s);return t&&g.findOne(t)?t:null},getElementFromSelector(s){const t=ss(s);return t?g.findOne(t):null},getMultipleElementsFromSelector(s){const t=ss(s);return t?g.find(t):[]}},Ve=(s,t="hide")=>{const e=`click.dismiss${s.EVENT_KEY}`,n=s.NAME;p.on(document,e,`[data-bs-dismiss="${n}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),ot(this))return;const o=g.getElementFromSelector(this)||this.closest(`.${n}`);s.getOrCreateInstance(o)[t]()})},Za="alert",Ja="bs.alert",Fi=`.${Ja}`,tr=`close${Fi}`,er=`closed${Fi}`,sr="fade",nr="show";let Fs=class ji extends K{static get NAME(){return Za}close(){if(p.trigger(this._element,tr).defaultPrevented)return;this._element.classList.remove(nr);const e=this._element.classList.contains(sr);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),p.trigger(this._element,er),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=ji.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}};Ve(Fs,"close");G(Fs);const ir="button",or="bs.button",ar=`.${or}`,rr=".data-api",lr="active",Cn='[data-bs-toggle="button"]',cr=`click${ar}${rr}`;class We extends K{static get NAME(){return ir}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(lr))}static jQueryInterface(t){return this.each(function(){const e=We.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}p.on(document,cr,Cn,s=>{s.preventDefault();const t=s.target.closest(Cn);We.getOrCreateInstance(t).toggle()});G(We);const dr="swipe",Bt=".bs.swipe",ur=`touchstart${Bt}`,pr=`touchmove${Bt}`,hr=`touchend${Bt}`,mr=`pointerdown${Bt}`,fr=`pointerup${Bt}`,gr="touch",vr="pen",br="pointer-event",_r=40,Er={endCallback:null,leftCallback:null,rightCallback:null},yr={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class Re extends re{constructor(t,e){super(),this._element=t,!(!t||!Re.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return Er}static get DefaultType(){return yr}static get NAME(){return dr}dispose(){p.off(this._element,Bt)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),P(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=_r)return;const e=t/this._deltaX;this._deltaX=0,e&&P(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(p.on(this._element,mr,t=>this._start(t)),p.on(this._element,fr,t=>this._end(t)),this._element.classList.add(br)):(p.on(this._element,ur,t=>this._start(t)),p.on(this._element,pr,t=>this._move(t)),p.on(this._element,hr,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===vr||t.pointerType===gr)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const $r="carousel",Ar="bs.carousel",rt=`.${Ar}`,Bi=".data-api",Sr="ArrowLeft",Tr="ArrowRight",wr=500,qt="next",Ot="prev",Rt="left",Se="right",Cr=`slide${rt}`,ns=`slid${rt}`,Or=`keydown${rt}`,xr=`mouseenter${rt}`,Nr=`mouseleave${rt}`,Lr=`dragstart${rt}`,Rr=`load${rt}${Bi}`,Ir=`click${rt}${Bi}`,Gi="carousel",ge="active",Dr="slide",kr="carousel-item-end",Mr="carousel-item-start",Pr="carousel-item-next",Vr="carousel-item-prev",zi=".active",Yi=".carousel-item",Wr=zi+Yi,Hr=".carousel-item img",Ur=".carousel-indicators",Fr="[data-bs-slide], [data-bs-slide-to]",jr='[data-bs-ride="carousel"]',Br={[Sr]:Se,[Tr]:Rt},Gr={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},zr={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class le extends K{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=g.findOne(Ur,this._element),this._addEventListeners(),this._config.ride===Gi&&this.cycle()}static get Default(){return Gr}static get DefaultType(){return zr}static get NAME(){return $r}next(){this._slide(qt)}nextWhenVisible(){!document.hidden&&jt(this._element)&&this.next()}prev(){this._slide(Ot)}pause(){this._isSliding&&Ri(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){p.one(this._element,ns,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){p.one(this._element,ns,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const i=t>n?qt:Ot;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&p.on(this._element,Or,t=>this._keydown(t)),this._config.pause==="hover"&&(p.on(this._element,xr,()=>this.pause()),p.on(this._element,Nr,()=>this._maybeEnableCycle())),this._config.touch&&Re.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of g.find(Hr,this._element))p.on(n,Lr,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Rt)),rightCallback:()=>this._slide(this._directionToOrder(Se)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),wr+this._config.interval))}};this._swipeHelper=new Re(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Br[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=g.findOne(zi,this._indicatorsElement);e.classList.remove(ge),e.removeAttribute("aria-current");const n=g.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(ge),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),i=t===qt,o=e||Hs(this._getItems(),n,i,this._config.wrap);if(o===n)return;const a=this._getItemIndex(o),r=f=>p.trigger(this._element,f,{relatedTarget:o,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:a});if(r(Cr).defaultPrevented||!n||!o)return;const d=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(a),this._activeElement=o;const c=i?Mr:kr,h=i?Pr:Vr;o.classList.add(h),ae(o),n.classList.add(c),o.classList.add(c);const m=()=>{o.classList.remove(c,h),o.classList.add(ge),n.classList.remove(ge,h,c),this._isSliding=!1,r(ns)};this._queueCallback(m,n,this._isAnimated()),d&&this.cycle()}_isAnimated(){return this._element.classList.contains(Dr)}_getActive(){return g.findOne(Wr,this._element)}_getItems(){return g.find(Yi,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return j()?t===Rt?Ot:qt:t===Rt?qt:Ot}_orderToDirection(t){return j()?t===Ot?Rt:Se:t===Ot?Se:Rt}static jQueryInterface(t){return this.each(function(){const e=le.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}p.on(document,Ir,Fr,function(s){const t=g.getElementFromSelector(this);if(!t||!t.classList.contains(Gi))return;s.preventDefault();const e=le.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(Z.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});p.on(window,Rr,()=>{const s=g.find(jr);for(const t of s)le.getOrCreateInstance(t)});G(le);const Yr="collapse",Kr="bs.collapse",ce=`.${Kr}`,qr=".data-api",Qr=`show${ce}`,Xr=`shown${ce}`,Zr=`hide${ce}`,Jr=`hidden${ce}`,tl=`click${ce}${qr}`,is="show",Dt="collapse",ve="collapsing",el="collapsed",sl=`:scope .${Dt} .${Dt}`,nl="collapse-horizontal",il="width",ol="height",al=".collapse.show, .collapse.collapsing",ys='[data-bs-toggle="collapse"]',rl={parent:null,toggle:!0},ll={parent:"(null|element)",toggle:"boolean"};let js=class $s extends K{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=g.find(ys);for(const i of n){const o=g.getSelectorFromElement(i),a=g.find(o).filter(r=>r===this._element);o!==null&&a.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return rl}static get DefaultType(){return ll}static get NAME(){return Yr}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(al).filter(r=>r!==this._element).map(r=>$s.getOrCreateInstance(r,{toggle:!1}))),t.length&&t[0]._isTransitioning||p.trigger(this._element,Qr).defaultPrevented)return;for(const r of t)r.hide();const n=this._getDimension();this._element.classList.remove(Dt),this._element.classList.add(ve),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(ve),this._element.classList.add(Dt,is),this._element.style[n]="",p.trigger(this._element,Xr)},a=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[n]=`${this._element[a]}px`}hide(){if(this._isTransitioning||!this._isShown()||p.trigger(this._element,Zr).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,ae(this._element),this._element.classList.add(ve),this._element.classList.remove(Dt,is);for(const i of this._triggerArray){const o=g.getElementFromSelector(i);o&&!this._isShown(o)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(ve),this._element.classList.add(Dt),p.trigger(this._element,Jr)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(is)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=it(t.parent),t}_getDimension(){return this._element.classList.contains(nl)?il:ol}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(ys);for(const e of t){const n=g.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=g.find(sl,this._config.parent);return g.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(el,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=$s.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}};p.on(document,tl,ys,function(s){(s.target.tagName==="A"||s.delegateTarget&&s.delegateTarget.tagName==="A")&&s.preventDefault();for(const t of g.getMultipleElementsFromSelector(this))js.getOrCreateInstance(t,{toggle:!1}).toggle()});G(js);const On="dropdown",cl="bs.dropdown",St=`.${cl}`,Bs=".data-api",dl="Escape",xn="Tab",ul="ArrowUp",Nn="ArrowDown",pl=2,hl=`hide${St}`,ml=`hidden${St}`,fl=`show${St}`,gl=`shown${St}`,Ki=`click${St}${Bs}`,qi=`keydown${St}${Bs}`,vl=`keyup${St}${Bs}`,It="show",bl="dropup",_l="dropend",El="dropstart",yl="dropup-center",$l="dropdown-center",gt='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',Al=`${gt}.${It}`,Te=".dropdown-menu",Sl=".navbar",Tl=".navbar-nav",wl=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Cl=j()?"top-end":"top-start",Ol=j()?"top-start":"top-end",xl=j()?"bottom-end":"bottom-start",Nl=j()?"bottom-start":"bottom-end",Ll=j()?"left-start":"right-start",Rl=j()?"right-start":"left-start",Il="top",Dl="bottom",kl={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Ml={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};let Tt=class we extends K{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=g.next(this._element,Te)[0]||g.prev(this._element,Te)[0]||g.findOne(Te,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return kl}static get DefaultType(){return Ml}static get NAME(){return On}toggle(){return this._isShown()?this.hide():this.show()}show(){if(ot(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!p.trigger(this._element,fl,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(Tl))for(const n of[].concat(...document.body.children))p.on(n,"mouseover",Le);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(It),this._element.classList.add(It),p.trigger(this._element,gl,t)}}hide(){if(ot(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!p.trigger(this._element,hl,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))p.off(n,"mouseover",Le);this._popper&&this._popper.destroy(),this._menu.classList.remove(It),this._element.classList.remove(It),this._element.setAttribute("aria-expanded","false"),Z.removeDataAttribute(this._menu,"popper"),p.trigger(this._element,ml,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!X(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${On.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof Ni>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;this._config.reference==="parent"?t=this._parent:X(this._config.reference)?t=it(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Ws(t,this._menu,e)}_isShown(){return this._menu.classList.contains(It)}_getPlacement(){const t=this._parent;if(t.classList.contains(_l))return Ll;if(t.classList.contains(El))return Rl;if(t.classList.contains(yl))return Il;if(t.classList.contains($l))return Dl;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(bl)?e?Ol:Cl:e?Nl:xl}_detectNavbar(){return this._element.closest(Sl)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(Z.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...P(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const n=g.find(wl,this._menu).filter(i=>jt(i));n.length&&Hs(n,e,t===Nn,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=we.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===pl||t.type==="keyup"&&t.key!==xn)return;const e=g.find(Al);for(const n of e){const i=we.getInstance(n);if(!i||i._config.autoClose===!1)continue;const o=t.composedPath(),a=o.includes(i._menu);if(o.includes(i._element)||i._config.autoClose==="inside"&&!a||i._config.autoClose==="outside"&&a||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===xn||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const r={relatedTarget:i._element};t.type==="click"&&(r.clickEvent=t),i._completeHide(r)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===dl,i=[ul,Nn].includes(t.key);if(!i&&!n||e&&!n)return;t.preventDefault();const o=this.matches(gt)?this:g.prev(this,gt)[0]||g.next(this,gt)[0]||g.findOne(gt,t.delegateTarget.parentNode),a=we.getOrCreateInstance(o);if(i){t.stopPropagation(),a.show(),a._selectMenuItem(t);return}a._isShown()&&(t.stopPropagation(),a.hide(),o.focus())}};p.on(document,qi,gt,Tt.dataApiKeydownHandler);p.on(document,qi,Te,Tt.dataApiKeydownHandler);p.on(document,Ki,Tt.clearMenus);p.on(document,vl,Tt.clearMenus);p.on(document,Ki,gt,function(s){s.preventDefault(),Tt.getOrCreateInstance(this).toggle()});G(Tt);const Qi="backdrop",Pl="fade",Ln="show",Rn=`mousedown.bs.${Qi}`,Vl={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Wl={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Xi extends re{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return Vl}static get DefaultType(){return Wl}static get NAME(){return Qi}show(t){if(!this._config.isVisible){P(t);return}this._append();const e=this._getElement();this._config.isAnimated&&ae(e),e.classList.add(Ln),this._emulateAnimation(()=>{P(t)})}hide(t){if(!this._config.isVisible){P(t);return}this._getElement().classList.remove(Ln),this._emulateAnimation(()=>{this.dispose(),P(t)})}dispose(){this._isAppended&&(p.off(this._element,Rn),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(Pl),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=it(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),p.on(t,Rn,()=>{P(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){ki(t,this._getElement(),this._config.isAnimated)}}const Hl="focustrap",Ul="bs.focustrap",Ie=`.${Ul}`,Fl=`focusin${Ie}`,jl=`keydown.tab${Ie}`,Bl="Tab",Gl="forward",In="backward",zl={autofocus:!0,trapElement:null},Yl={autofocus:"boolean",trapElement:"element"};class Zi extends re{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return zl}static get DefaultType(){return Yl}static get NAME(){return Hl}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),p.off(document,Ie),p.on(document,Fl,t=>this._handleFocusin(t)),p.on(document,jl,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,p.off(document,Ie))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=g.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===In?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===Bl&&(this._lastTabNavDirection=t.shiftKey?In:Gl)}}const Dn=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",kn=".sticky-top",be="padding-right",Mn="margin-right";class As{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,be,e=>e+t),this._setElementAttributes(Dn,be,e=>e+t),this._setElementAttributes(kn,Mn,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,be),this._resetElementAttributes(Dn,be),this._resetElementAttributes(kn,Mn)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const i=this.getWidth(),o=a=>{if(a!==this._element&&window.innerWidth>a.clientWidth+i)return;this._saveInitialAttribute(a,e);const r=window.getComputedStyle(a).getPropertyValue(e);a.style.setProperty(e,`${n(Number.parseFloat(r))}px`)};this._applyManipulationCallback(t,o)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&Z.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=i=>{const o=Z.getDataAttribute(i,e);if(o===null){i.style.removeProperty(e);return}Z.removeDataAttribute(i,e),i.style.setProperty(e,o)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(X(t)){e(t);return}for(const n of g.find(t,this._element))e(n)}}const Kl="modal",ql="bs.modal",B=`.${ql}`,Ql=".data-api",Xl="Escape",Zl=`hide${B}`,Jl=`hidePrevented${B}`,Ji=`hidden${B}`,to=`show${B}`,tc=`shown${B}`,ec=`resize${B}`,sc=`click.dismiss${B}`,nc=`mousedown.dismiss${B}`,ic=`keydown.dismiss${B}`,oc=`click${B}${Ql}`,Pn="modal-open",ac="fade",Vn="show",os="modal-static",rc=".modal.show",lc=".modal-dialog",cc=".modal-body",dc='[data-bs-toggle="modal"]',uc={backdrop:!0,focus:!0,keyboard:!0},pc={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};let ne=class eo extends K{constructor(t,e){super(t,e),this._dialog=g.findOne(lc,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new As,this._addEventListeners()}static get Default(){return uc}static get DefaultType(){return pc}static get NAME(){return Kl}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||p.trigger(this._element,to,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Pn),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||p.trigger(this._element,Zl).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Vn),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){p.off(window,B),p.off(this._dialog,B),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Xi({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Zi({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=g.findOne(cc,this._dialog);e&&(e.scrollTop=0),ae(this._element),this._element.classList.add(Vn);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,p.trigger(this._element,tc,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){p.on(this._element,ic,t=>{if(t.key===Xl){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),p.on(window,ec,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),p.on(this._element,nc,t=>{p.one(this._element,sc,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Pn),this._resetAdjustments(),this._scrollBar.reset(),p.trigger(this._element,Ji)})}_isAnimated(){return this._element.classList.contains(ac)}_triggerBackdropTransition(){if(p.trigger(this._element,Jl).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(os)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(os),this._queueCallback(()=>{this._element.classList.remove(os),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const i=j()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!n&&t){const i=j()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=eo.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}};p.on(document,oc,dc,function(s){const t=g.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&s.preventDefault(),p.one(t,to,i=>{i.defaultPrevented||p.one(t,Ji,()=>{jt(this)&&this.focus()})});const e=g.findOne(rc);e&&ne.getInstance(e).hide(),ne.getOrCreateInstance(t).toggle(this)});Ve(ne);G(ne);const hc="offcanvas",mc="bs.offcanvas",tt=`.${mc}`,so=".data-api",fc=`load${tt}${so}`,gc="Escape",Wn="show",Hn="showing",Un="hiding",vc="offcanvas-backdrop",no=".offcanvas.show",bc=`show${tt}`,_c=`shown${tt}`,Ec=`hide${tt}`,Fn=`hidePrevented${tt}`,io=`hidden${tt}`,yc=`resize${tt}`,$c=`click${tt}${so}`,Ac=`keydown.dismiss${tt}`,Sc='[data-bs-toggle="offcanvas"]',Tc={backdrop:!0,keyboard:!0,scroll:!1},wc={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};let At=class oo extends K{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return Tc}static get DefaultType(){return wc}static get NAME(){return hc}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||p.trigger(this._element,bc,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new As().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Hn);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Wn),this._element.classList.remove(Hn),p.trigger(this._element,_c,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||p.trigger(this._element,Ec).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(Un),this._backdrop.hide();const e=()=>{this._element.classList.remove(Wn,Un),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new As().reset(),p.trigger(this._element,io)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){p.trigger(this._element,Fn);return}this.hide()},e=!!this._config.backdrop;return new Xi({className:vc,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new Zi({trapElement:this._element})}_addEventListeners(){p.on(this._element,Ac,t=>{if(t.key===gc){if(this._config.keyboard){this.hide();return}p.trigger(this._element,Fn)}})}static jQueryInterface(t){return this.each(function(){const e=oo.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}};p.on(document,$c,Sc,function(s){const t=g.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&s.preventDefault(),ot(this))return;p.one(t,io,()=>{jt(this)&&this.focus()});const e=g.findOne(no);e&&e!==t&&At.getInstance(e).hide(),At.getOrCreateInstance(t).toggle(this)});p.on(window,fc,()=>{for(const s of g.find(no))At.getOrCreateInstance(s).show()});p.on(window,yc,()=>{for(const s of g.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(s).position!=="fixed"&&At.getOrCreateInstance(s).hide()});Ve(At);G(At);const Cc=/^aria-[\w-]*$/i,ao={"*":["class","dir","id","lang","role",Cc],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Oc=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),xc=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,Nc=(s,t)=>{const e=s.nodeName.toLowerCase();return t.includes(e)?Oc.has(e)?!!xc.test(s.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function Lc(s,t,e){if(!s.length)return s;if(e&&typeof e=="function")return e(s);const i=new window.DOMParser().parseFromString(s,"text/html"),o=[].concat(...i.body.querySelectorAll("*"));for(const a of o){const r=a.nodeName.toLowerCase();if(!Object.keys(t).includes(r)){a.remove();continue}const l=[].concat(...a.attributes),d=[].concat(t["*"]||[],t[r]||[]);for(const c of l)Nc(c,d)||a.removeAttribute(c.nodeName)}return i.body.innerHTML}const Rc="TemplateFactory",Ic={allowList:ao,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Dc={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},kc={entry:"(string|element|function|null)",selector:"(string|element)"};class Mc extends re{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Ic}static get DefaultType(){return Dc}static get NAME(){return Rc}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,o]of Object.entries(this._config.content))this._setContent(t,o,i);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},kc)}_setContent(t,e,n){const i=g.findOne(n,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(X(e)){this._putElementInTemplate(it(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?Lc(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return P(t,[this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const Pc="tooltip",Vc=new Set(["sanitize","allowList","sanitizeFn"]),as="fade",Wc="modal",_e="show",Hc=".tooltip-inner",jn=`.${Wc}`,Bn="hide.bs.modal",Qt="hover",rs="focus",Uc="click",Fc="manual",jc="hide",Bc="hidden",Gc="show",zc="shown",Yc="inserted",Kc="click",qc="focusin",Qc="focusout",Xc="mouseenter",Zc="mouseleave",Jc={AUTO:"auto",TOP:"top",RIGHT:j()?"left":"right",BOTTOM:"bottom",LEFT:j()?"right":"left"},td={allowList:ao,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},ed={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Gt extends K{constructor(t,e){if(typeof Ni>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return td}static get DefaultType(){return ed}static get NAME(){return Pc}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),p.off(this._element.closest(jn),Bn,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=p.trigger(this._element,this.constructor.eventName(Gc)),n=(Ii(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:o}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(o.append(i),p.trigger(this._element,this.constructor.eventName(Yc))),this._popper=this._createPopper(i),i.classList.add(_e),"ontouchstart"in document.documentElement)for(const r of[].concat(...document.body.children))p.on(r,"mouseover",Le);const a=()=>{p.trigger(this._element,this.constructor.eventName(zc)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(a,this.tip,this._isAnimated())}hide(){if(!this._isShown()||p.trigger(this._element,this.constructor.eventName(jc)).defaultPrevented)return;if(this._getTipElement().classList.remove(_e),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))p.off(i,"mouseover",Le);this._activeTrigger[Uc]=!1,this._activeTrigger[rs]=!1,this._activeTrigger[Qt]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),p.trigger(this._element,this.constructor.eventName(Bc)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(as,_e),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=Ua(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(as),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Mc({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Hc]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(as)}_isShown(){return this.tip&&this.tip.classList.contains(_e)}_createPopper(t){const e=P(this._config.placement,[this,t,this._element]),n=Jc[e.toUpperCase()];return Ws(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return P(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...P(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")p.on(this._element,this.constructor.eventName(Kc),this._config.selector,n=>{this._initializeOnDelegatedTarget(n).toggle()});else if(e!==Fc){const n=e===Qt?this.constructor.eventName(Xc):this.constructor.eventName(qc),i=e===Qt?this.constructor.eventName(Zc):this.constructor.eventName(Qc);p.on(this._element,n,this._config.selector,o=>{const a=this._initializeOnDelegatedTarget(o);a._activeTrigger[o.type==="focusin"?rs:Qt]=!0,a._enter()}),p.on(this._element,i,this._config.selector,o=>{const a=this._initializeOnDelegatedTarget(o);a._activeTrigger[o.type==="focusout"?rs:Qt]=a._element.contains(o.relatedTarget),a._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},p.on(this._element.closest(jn),Bn,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=Z.getDataAttributes(this._element);for(const n of Object.keys(e))Vc.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:it(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=Gt.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}G(Gt);const sd="popover",nd=".popover-header",id=".popover-body",od={...Gt.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},ad={...Gt.DefaultType,content:"(null|string|element|function)"};class Gs extends Gt{static get Default(){return od}static get DefaultType(){return ad}static get NAME(){return sd}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[nd]:this._getTitle(),[id]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=Gs.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}G(Gs);const rd="scrollspy",ld="bs.scrollspy",zs=`.${ld}`,cd=".data-api",dd=`activate${zs}`,Gn=`click${zs}`,ud=`load${zs}${cd}`,pd="dropdown-item",xt="active",hd='[data-bs-spy="scroll"]',ls="[href]",md=".nav, .list-group",zn=".nav-link",fd=".nav-item",gd=".list-group-item",vd=`${zn}, ${fd} > ${zn}, ${gd}`,bd=".dropdown",_d=".dropdown-toggle",Ed={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},yd={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class He extends K{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return Ed}static get DefaultType(){return yd}static get NAME(){return rd}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=it(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(p.off(this._config.target,Gn),p.on(this._config.target,Gn,ls,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:i,behavior:"smooth"});return}n.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=a=>this._targetLinks.get(`#${a.target.id}`),n=a=>{this._previousScrollData.visibleEntryTop=a.target.offsetTop,this._process(e(a))},i=(this._rootElement||document.documentElement).scrollTop,o=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const a of t){if(!a.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(a));continue}const r=a.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(o&&r){if(n(a),!i)return;continue}!o&&!r&&n(a)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=g.find(ls,this._config.target);for(const e of t){if(!e.hash||ot(e))continue;const n=g.findOne(decodeURI(e.hash),this._element);jt(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(xt),this._activateParents(t),p.trigger(this._element,dd,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(pd)){g.findOne(_d,t.closest(bd)).classList.add(xt);return}for(const e of g.parents(t,md))for(const n of g.prev(e,vd))n.classList.add(xt)}_clearActiveClass(t){t.classList.remove(xt);const e=g.find(`${ls}.${xt}`,t);for(const n of e)n.classList.remove(xt)}static jQueryInterface(t){return this.each(function(){const e=He.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}p.on(window,ud,()=>{for(const s of g.find(hd))He.getOrCreateInstance(s)});G(He);const $d="tab",Ad="bs.tab",wt=`.${Ad}`,Sd=`hide${wt}`,Td=`hidden${wt}`,wd=`show${wt}`,Cd=`shown${wt}`,Od=`click${wt}`,xd=`keydown${wt}`,Nd=`load${wt}`,Ld="ArrowLeft",Yn="ArrowRight",Rd="ArrowUp",Kn="ArrowDown",cs="Home",qn="End",vt="active",Qn="fade",ds="show",Id="dropdown",ro=".dropdown-toggle",Dd=".dropdown-menu",us=`:not(${ro})`,kd='.list-group, .nav, [role="tablist"]',Md=".nav-item, .list-group-item",Pd=`.nav-link${us}, .list-group-item${us}, [role="tab"]${us}`,lo='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',ps=`${Pd}, ${lo}`,Vd=`.${vt}[data-bs-toggle="tab"], .${vt}[data-bs-toggle="pill"], .${vt}[data-bs-toggle="list"]`;let Ue=class Ss extends K{constructor(t){super(t),this._parent=this._element.closest(kd),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),p.on(this._element,xd,e=>this._keydown(e)))}static get NAME(){return $d}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?p.trigger(e,Sd,{relatedTarget:t}):null;p.trigger(t,wd,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(vt),this._activate(g.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(ds);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),p.trigger(t,Cd,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Qn))}_deactivate(t,e){if(!t)return;t.classList.remove(vt),t.blur(),this._deactivate(g.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(ds);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),p.trigger(t,Td,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Qn))}_keydown(t){if(![Ld,Yn,Rd,Kn,cs,qn].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!ot(i));let n;if([cs,qn].includes(t.key))n=e[t.key===cs?0:e.length-1];else{const i=[Yn,Kn].includes(t.key);n=Hs(e,t.target,i,!0)}n&&(n.focus({preventScroll:!0}),Ss.getOrCreateInstance(n).show())}_getChildren(){return g.find(ps,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=g.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(Id))return;const i=(o,a)=>{const r=g.findOne(o,n);r&&r.classList.toggle(a,e)};i(ro,vt),i(Dd,ds),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(vt)}_getInnerElement(t){return t.matches(ps)?t:g.findOne(ps,t)}_getOuterElement(t){return t.closest(Md)||t}static jQueryInterface(t){return this.each(function(){const e=Ss.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}};p.on(document,Od,lo,function(s){["A","AREA"].includes(this.tagName)&&s.preventDefault(),!ot(this)&&Ue.getOrCreateInstance(this).show()});p.on(window,Nd,()=>{for(const s of g.find(Vd))Ue.getOrCreateInstance(s)});G(Ue);const Wd="toast",Hd="bs.toast",lt=`.${Hd}`,Ud=`mouseover${lt}`,Fd=`mouseout${lt}`,jd=`focusin${lt}`,Bd=`focusout${lt}`,Gd=`hide${lt}`,zd=`hidden${lt}`,Yd=`show${lt}`,Kd=`shown${lt}`,qd="fade",Xn="hide",Ee="show",ye="showing",Qd={animation:"boolean",autohide:"boolean",delay:"number"},Xd={animation:!0,autohide:!0,delay:5e3};let Ys=class co extends K{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Xd}static get DefaultType(){return Qd}static get NAME(){return Wd}show(){if(p.trigger(this._element,Yd).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(qd);const e=()=>{this._element.classList.remove(ye),p.trigger(this._element,Kd),this._maybeScheduleHide()};this._element.classList.remove(Xn),ae(this._element),this._element.classList.add(Ee,ye),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||p.trigger(this._element,Gd).defaultPrevented)return;const e=()=>{this._element.classList.add(Xn),this._element.classList.remove(ye,Ee),p.trigger(this._element,zd)};this._element.classList.add(ye),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Ee),super.dispose()}isShown(){return this._element.classList.contains(Ee)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){p.on(this._element,Ud,t=>this._onInteraction(t,!0)),p.on(this._element,Fd,t=>this._onInteraction(t,!1)),p.on(this._element,jd,t=>this._onInteraction(t,!0)),p.on(this._element,Bd,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=co.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}};Ve(Ys);G(Ys);class uo extends _{createRenderRoot(){return this}firstUpdated(){new Fs(this.querySelector(".alert"))}render(){return u`
      <div class="alert alert-${this.type} alert-dismissible" role="alert">
        <div>${this.message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `}}C(uo,"properties",{type:{type:String},message:{type:String}});customElements.define("alert-component",uo);class po extends _{createRenderRoot(){return this}render(){const t=this.items[this.items.length-1];return u`
      <nav aria-label="breadcrumb">
        <ol class=${"breadcrumb "+this.navClass}>
        ${this.items.map(e=>{let n=t.url==e.url;return u`
            <li class=${"breadcrumb-item"+(n?" active":"")} aria-current=${n?"page":v}>
              ${n?u`${e.name}`:u`<a href=${e.url}>${e.name}</a>`}
            </li>
          `})}
        </ol>
      </nav>
    `}}C(po,"properties",{items:{type:Array},navClass:{type:String}});customElements.define("breadcrumbs-component",po);class ho extends _{createRenderRoot(){return this}firstUpdated(){new js(this.querySelector("[data-bs-toggle]"))}render(){return this.type=="button"?u`
        <button type="button" 
          class=${this.btnClass}
          data-bs-target=${"#"+this.target} 
          data-bs-toggle="collapse"
          aria-expanded="false" 
          aria-controls=${this.target}
        >${this.label}</button>`:u`
        <a 
          class=${this.btnClass} 
          href=${"#"+this.target} 
          data-bs-toggle="collapse"
          role="button" 
          aria-expanded="false" 
          aria-controls=${this.target}
        >${this.label}</a>`}}C(ho,"properties",{type:{type:String},btnClass:{type:String},target:{type:String},label:{type:String}});customElements.define("collapse-component",ho);class mo extends _{createRenderRoot(){return this}firstUpdated(){new Tt(this.querySelector("[data-bs-toggle]"))}render(){return u`
      <div class="dropdown">
        <button type="button" 
          class=${"dropdown-toggle btn "+(this.btnClass??"btn-secondary")}
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          ${this.label}
        </button>
        <ul class="dropdown-menu">
        ${this.items.map(t=>u`
            <li>
              <a class="dropdown-item" href=${t.url} @click=${t.click??v}>${t.name}</a>
            </li>
          `)}
        </ul>
      </div>
    `}}C(mo,"properties",{items:{type:Array},btnClass:{type:String},label:{type:String}});customElements.define("dropdown-component",mo);let Ce="";const Zn=s=>{Ce=s};async function fo(s){let t=s.url,e=s.method??"get",n="",i=s.data;switch(s.contentType){case"text":n="text/plain";break;case"multipart":n="multipart/form-data";break;case"urlencoded":n="application/x-www-form-urlencoded";break;case"json":default:n="application/json";break}if(s.form&&s.form instanceof HTMLFormElement&&(t=s.form.action,e=s.form.method??"get",s.form.attributes.enctype&&(n=s.form.attributes.enctype),i=new FormData(s.form)),!Ce){const c=(await fetch(t,{method:"head"})).headers.get("x-csrf-token");c&&Zn(c)}if(i instanceof FormData?i.append("_token",Ce):i._token=Ce,n=="application/json"||n=="text/plain"){if(i instanceof FormData){const d={};i.forEach((c,h)=>d[h]=c),i=d}i=JSON.stringify(i)}else if(!(i instanceof FormData)){const d=new FormData;for(let c in item)d.append(c,item[c]);i=d}const o=new Request(t,{method:e,headers:{Accept:"application/json","Content-Type":n},body:i}),a=localStorage.getItem("token");a&&o.headers.append("Authorization","Bearer "+a);const r=await fetch(o),l=r.headers.get("x-csrf-token");if(l&&Zn(l),!r.ok)throw new Error(r.statusText);return r.json()}class go extends _{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.changeListener)}disconnectedCallback(){this.removeEventListener("change",this.changeListener),super.disconnectedCallback()}changeListener(t){this._wasChanged=!0}handleSubmit(t){const e=t.target;return e.classList.add("was-validated"),e.checkValidity()===!1?(t.preventDefault(),!1):this.submit?this.submit(t):(fo({form:e}),t.preventDefault(),!1)}render(){return u`
      <form 
        method=${this.method} 
        action=${this.action} 
        @submit=${this.handleSubmit} 
        class="needs-validation"
      >
        ${this.controls}
      </form>
    `}}C(go,"properties",{method:{type:String},action:{type:String},submit:{},controls:{},_wasChanged:{type:Boolean,state:!1}});customElements.define("form-component",go);class vo extends _{createRenderRoot(){return this.variant=="floating"&&(this.classList.add("form-floating"),this.classList.add("d-block")),this.variant=="horizontal"&&this.classList.add("row"),this}render(){const t="input_"+Math.random().toString(36).substr(2);this.name=this.name??"",this.value=this.value??"",this.label=this.label??this.name,this.options=this.options??[],this.type||(this.type=typeof this.value),this.type=="boolean"&&(this.type="checkbox"),this.type=="number"&&(this.type="number"),this.type=="string"&&(this.type="text"),this.type=="object"&&this.value instanceof Date&&(this.type="datetime-local");const e=u`
      <label for=${t} class=${(this.variant==""?"form-label":"")+(this.variant=="horizontal"?"col-sm-3 col-form-label":"")+(this.sizing?" col-form-label-"+this.sizing:"")}>
        ${this.type=="checkbox"?v:this.label}
      </label>
    `;let n;switch(this.type){case"custom":n=u`${this.content}`;break;case"group":n=u`<div class=${"input-group"+(this.sizing?" input-group-"+this.sizing:"")}>${this.content}</div>`;break;case"radio":n=this.options.map(i=>u`
        <div class="form-check">
          <input id="${t}_${i.value}" 
            class="form-check-input" 
            type="radio"
            name=${this.name}
            value=${i.value}
            ?checked=${(i.checked||this.value===i.value)??!1}
          >
          <label for=${t+"_"+i.value} class="form-check-label">${i.text??i.value}</label>
        </div>`);break;case"checkbox":n=u`
        <div class="form-check">
          <input id=${t} 
            class="form-check-input" 
            type="checkbox"
            name=${this.name}
            value=${this.value}
            ?checked=${this.checked??!1}
          >
          <label for=${t} class="form-check-label">${this.label}</label>
        </div>`;break;case"textarea":n=u`
        <textarea id=${t} 
          class=${"form-control"+(this.sizing?" form-control-"+this.sizing:"")}
          name=${this.name} 
          .value=${this.value}
          placeholder=${this.placeholder??v}
          ?readonly=${this.readonly??!1}
          ?required=${this.required??!1}
          ?disabled=${this.disabled??!1}
          ?autofocus=${this.autofocus??!1}
          cols=${this.size??v}
          maxlength=${this.maxlength??v}
        ></textarea>`;break;case"select":n=u`
        <select id=${t} 
          class=${"form-select"+(this.sizing?" form-select-"+this.sizing:"")} 
          name=${this.name} 
          placeholder=${this.placeholder??v}
          ?required=${this.required??!1}
          ?disabled=${this.disabled??!1}
          ?autofocus=${this.autofocus??!1}
          ?multiple=${this.multiple??!1}
          size=${this.size??v}
        >
        ${this.options.map(i=>u`
          <option value=${i.value??""} ?checked=${i.checked||this.value===i.value}>
            ${i.text??i.value}
          </option>`)}
        </select>`;break;case"text":case"url":case"email":case"password":case"file":case"hidden":case"number":case"range":case"color":case"tel":case"date":case" datetime-local":case"week":case"month":case"time":default:n=u`
        <input id=${t} 
          class=${(this.type=="range"?"form-range":"form-control")+(this.type=="color"?" form-control-color":"")+(this.sizing?" form-control-"+this.sizing:"")}
          type=${this.type} 
          name=${this.name} 
          .value=${this.value} 
          list=${this.options.length>0?t+"_list":v} 
          placeholder=${this.placeholder??v}
          pattern=${this.pattern??v}
          accept=${this.accept??v}
          ?readonly=${this.readonly??!1}
          ?required=${this.required??!1}
          ?disabled=${this.disabled??!1}
          ?autofocus=${this.autofocus??!1}
          ?multiple=${this.multiple??!1}
          autocomplete=${this.autocomplete?"off":v}
          size=${this.size??v}
          min=${this.min??v}
          max=${this.max??v}
          step=${this.step??v}
          maxlength=${this.maxlength??v}
          minlength=${this.minlength??v}
          title=${this.title??v}
        >
        ${this.options.length>0?u`
        <datalist id=${t+"_list"}>
          ${this.options.map(i=>u`
          <option value=${i.value??""}></option>
          `)}
        </datalist>`:""}`;break}return this.variant=="floating"?u`
          ${n}
          ${e}
          ${this.title?u`<div class="invalid-feedback">${this.title}</div>`:v}
        `:u`
          ${e}
          <div class=${this.variant=="horizontal"?"col-sm-9":""}>
            ${n}
            ${this.title?u`<div class="invalid-feedback">${this.title}</div>`:v}
          </div>
        `}}C(vo,"properties",{name:{type:String},value:{},label:{type:String},type:{type:String},title:{type:String},options:{type:Array},placeholder:{type:String},checked:{type:Boolean},readonly:{type:Boolean},required:{type:Boolean},disabled:{type:Boolean},autofocus:{type:Boolean},multiple:{type:Boolean},variant:{type:String},sizing:{type:String},size:{type:Number},maxlength:{type:Number},minlength:{type:Number},min:{type:Number},max:{type:Number},step:{type:Number},pattern:{type:String},accept:{type:String},autocomplete:{type:Boolean},content:{}});customElements.define("input-component",vo);class bo extends _{constructor(){super(),this._id="modal_"+Math.random().toString(36).slice(2,7),this.static=!1,this.btnClass="btn btn-primary"}createRenderRoot(){return this}firstUpdated(){new ne(this.querySelector("[data-bs-toggle]"))}disconnectedCallback(){const t=document.getElementById(this._id);t&&t.remove(),super.disconnectedCallback()}dialog(){return u`
      <div id=${this._id} 
        class="modal fade" 
        tabindex="-1" 
        data-bs-backdrop=${this.static?"static":"true"} 
        data-bs-keyboard=${this.static?"false":"true"} 
        aria-hidden="true"
      >
        <div class=${"modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down "+(this.dialogClass??"")}>
          <div class="modal-content">
            ${this.content?u`${this.content}`:u`
                <div class="modal-header">
                  <h1 class="modal-title fs-5">${this.title??v}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ${this.body??v}
                </div>
                <div class=${"modal-footer"+(this.footer?"":" d-none")}>
                  ${this.footer??v}
                </div>
                `}
          </div>
        </div>
      </div>
    `}render(){return u`
      <button type="button" 
        class=${this.btnClass} 
        data-bs-toggle="modal" 
        data-bs-target=${"#"+this._id}
        aria-controls=${"#"+this._id}
      >
        ${this.label}
      </button>
      ${this.dialog()}
    `}}C(bo,"properties",{label:{},header:{},body:{},footer:{},content:{},static:{type:Boolean},btnClass:{type:String},dialogClass:{type:String}});customElements.define("modal-component",bo);class _o extends _{constructor(){super(),this._id="modal_"+Math.random().toString(36).slice(2,7),this.btnClass="btn btn-primary"}createRenderRoot(){return this}firstUpdated(){new At(this.querySelector("[data-bs-toggle]"))}disconnectedCallback(){const t=document.getElementById(this._id);t&&t.remove(),super.disconnectedCallback()}offcanvas(){return u`
      <div id=${this._id} 
        class=${"offcanvas offcanvas-start "+(this.dialogClass??"")} 
        tabindex="-1"
        aria-hidden="true"
      >
        <div class=${"offcanvas-header"+(this.header?"":" d-none")}>
          ${u`${this.header??v}`}
        </div>
        <div class="offcanvas-body">
          ${u`${this.body??v}`}
        </div>
      </div>
    `}render(){return render(this.offcanvas(),document.body),u`
      <button type="button" 
        class=${this.btnClass} 
        data-bs-toggle="offcanvas" 
        data-bs-target=${"#"+this._id} 
        aria-controls=${"#"+this._id}
      >
        ${u`${this.label??v}`}
      </button>
    `}}C(_o,"properties",{label:{},header:{},body:{},btnClass:{type:String},dialogClass:{type:String}});customElements.define("offcanvas-component",_o);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Eo=Symbol.for(""),Zd=s=>{if((s==null?void 0:s.r)===Eo)return s==null?void 0:s._$litStatic$},Jd=s=>({_$litStatic$:s,r:Eo}),Jn=new Map,tu=s=>(t,...e)=>{const n=e.length;let i,o;const a=[],r=[];let l,d=0,c=!1;for(;d<n;){for(l=t[d];d<n&&(o=e[d],(i=Zd(o))!==void 0);)l+=i+t[++d],c=!0;d!==n&&r.push(o),a.push(l),d++}if(d===n&&a.push(t[n]),c){const h=a.join("$$lit$$");(t=Jn.get(h))===void 0&&(a.raw=a,Jn.set(h,t=a)),e=r}return s(t,...e)},eu=tu(u);class yo extends _{constructor(){super(...arguments);C(this,"clickListener",e=>{const n=e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey;if(e.defaultPrevented||n)return;const i=e.composedPath().find(o=>o.tagName==="A");i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external"||i.href===""||i.href.startsWith("mailto:")||i.origin!==location.origin||i.getAttribute("data-bs-toggle")=="router"&&(e.preventDefault(),i.href!==location.href&&this.navigateTo(i.href))});C(this,"popListener",e=>{this.requestUpdate()});C(this,"navigateTo",e=>{history.pushState(null,null,e),this.requestUpdate()})}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),window.navigateTo=this.navigateTo,window.addEventListener("popstate",this.popListener),document.addEventListener("click",this.clickListener)}disconnectedCallback(){delete window.navigateTo,window.removeEventListener("popstate",this.popListener),document.removeEventListener("click",this.clickListener),super.disconnectedCallback()}willUpdate(e){this.classList.remove("show")}firstUpdated(e){this.classList.add("fade")}updated(e){this.classList.add("show")}pathToRegex(e){return new RegExp("^"+e.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$")}getParams(e,n){const i=Array.from(e.matchAll(/:(\w+)/g)).map(a=>a[1]),o=n.slice(1);return Object.fromEntries(i.map((a,r)=>[a,o[r]]))}render(){let n=this.routes.map(a=>({route:a,result:location.pathname.match(this.pathToRegex(a.path??""))})).find(a=>a.result!==null);n||(n={route:this.routes[this.routes.length-1],result:[location.pathname]});const i=Jd(n.route.component??""),o=this.getParams(n.route.path??"",n.result);return o.ts=new Date,eu`<${i} .params=${o}></${i}>`}}C(yo,"properties",{routes:{type:Array}});customElements.define("router-component",yo);class su extends _{createRenderRoot(){return this}render(){return u`
    <nav id="sidebar" style="height: calc(100vh - 85px)" class="position-fixed overflow-auto">
        
        <ul class="nav flex-column" id="navigation">
          <li class="nav-item nav-groups mb-3">
            <h6>
              <a href="#nav_data" class="text-dark text-decoration-none" data-bs-toggle="collapse">Data</a>
            </h6>
            <div class="collapse show" id="nav_data">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="workspaces" data-bs-toggle="router">
                    <i class="ms ms-directory-open"></i> <span>Workspaces</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="sources" data-bs-toggle="router">
                    <i class="ms ms-database"></i> <span>Sources</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="styles" data-bs-toggle="router">
                    <i class="ms ms-style"></i> <span>Styles</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="layergroups" data-bs-toggle="router">
                    <i class="ms ms-layers-base"></i> <span>Groups</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="layers" data-bs-toggle="router">
                    <i class="ms ms-layers"></i> <span>Layers</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item nav-groups mb-3">
            <h6>
              <a href="#nav_caching" class="text-dark text-decoration-none" data-bs-toggle="collapse">Caching</a>
            </h6>
            <div class="collapse show" id="nav_caching">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="gridsets" data-bs-toggle="router">
                    <i class="ms ms-sphere"></i> <span>Gridsets</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="cache" data-bs-toggle="router">
                    <i class="ms ms-data-cube"></i> <span>Caches</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item nav-groups mb-3">
            <h6>
              <a href="#nav_system" class="text-dark text-decoration-none" data-bs-toggle="collapse">System</a>
            </h6>
            <div class="collapse show" id="nav_system">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="services" data-bs-toggle="router">
                    <i class="ms ms-processes"></i> <span>Services</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="security" data-bs-toggle="router">
                    <i class="ms ms-information"></i> <span>Security</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="status" data-bs-toggle="router">
                    <i class="ms ms-information"></i> <span>Status</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="documentation" data-bs-toggle="router">
                    <i class="ms ms-txt-o"></i> <span>Docs</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-secondary" href="logs" data-bs-toggle="router">
                    <i class="ms ms-txt-o"></i> <span>Logs</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

    </nav>
    `}}customElements.define("sidebar-component",su);class $o extends _{createRenderRoot(){return this}firstUpdated(){this.querySelectorAll("[data-bs-toggle]").forEach(e=>{const n=new Ue(e);e.addEventListener("click",i=>{i.preventDefault(),n.show()})})}render(){return u`
      <ul class=${"nav nav-tabs "+this.navClass} role="tablist">
        ${this.items.map(t=>u`
          <li class="nav-item" role="presentation">
            <button type="button" class=${"nav-link"+(t.active?" active":"")}
              data-bs-toggle="tab" 
              data-bs-target=${"#"+t.id} 
              aria-controls=${t.id}
              aria-selected=${t.active?"true":"false"}
              role="tab" 
            >
              ${t.label}
            </button>
          </li>
        `)}
      </ul>
      <div class=${"tab-content "+this.contentClass}>
        ${this.items.map(t=>u`
          <div class=${"tab-pane fade"+(t.active?" show active":"")} id=${t.id} role="tabpanel" tabindex="0">
            ${t.content}
          </div>
        `)}
      </div>
    `}}C($o,"properties",{items:{},navClass:{type:String},contentClass:{type:String}});customElements.define("tab-component",$o);class Ao extends _{constructor(){super(),this.tableClass="",this.editable=!1,this.filterable=!1,this.src="",this.data=[],this.columns=[],this.index=null,this.unique=[],this.filter=[],this.hidden=[]}createRenderRoot(){return this}async firstUpdated(){this.data||await this.fetchData()}async fetchData(){var e;let t;if(this.src.length>0)t=await fetch(this.src).then(n=>n.json());else{const n=(e=this.parentElement)==null?void 0:e.querySelector('script[type="application/json"]');n&&(t=JSON.parse(n.innerHTML))}this.data=this.transform(t??[]),this.requestUpdate()}transform(t){return this.columns||(this.columns=Object.keys(this.data[0]).map(e=>({key:e,label:e}))),t}renderFilter(){return u`
      <input type="search">
      <ul>
        <li class=${this.filter[this.index]===void 0?"disable":""} @click=${this.onApply}></li>
        ${this.unique.map(t=>{const e=this.filter[this.index]!==void 0&&this.filter[this.index]!==t;return u`
            <li class=${e?"disable":""} @click=${this.onApply}>${t}</li>
          `})}
      </ul>
    `}onInput(t){const e=t.target.value,n=row[0],i=this.data[index];i[n]=e,this.data[index]=i;const o={detail:{index,data:i}};this.requestUpdate(),this.handleInputCell?this.handleInputCell(o):this.dispatchEvent(new CustomEvent("input-cell",o))}renderColumns(){return u`
      <tr>
      ${this.columns.map((t,e)=>u`
          <th data-key=${t.key} class=${this.filter[e]!==void 0?"active":""}>
            ${t.label}
            <i class=${this.index===e?"arrow_drop_up":"arrow_drop_down"} @click=${this.onSelect}></i>
            <div>
              ${this.filterable&&this.index===e?this.renderFilter():""}
            </div>
          </th>
        `)}
      </tr>
    `}renderRow(t,e){return t.every((i,o)=>this.filter[o]===void 0||this.filter[o]==i)?(this.hidden[e]=!0,u`
        <tr>
          ${t.map(i=>u`
              <td>
              ${this.editable?u`<input value="${i}" type="text" @input=${this.onInput} />`:u`${i}`}
              </td>
            `)}
        </tr>
      `):(delete this.hidden[e],"")}onSelect(t){if(this.head.includes(t.target)){const e=this.head.indexOf(t.target);if(this.index===null||this.index!==e){this.index=this.head.indexOf(t.target);let n=this.data.map(i=>i[e]);this.unique=[...new Set(n)]}else this.index=null}}onApply(t){if(!t.target.classList.contains("disable")){const e=t.target.parentNode.parentNode,n=this.head.indexOf(e),i=t.target.textContent;i===""?delete this.filter[n]:this.filter[n]=i,this.index=null}}get table(){return this.renderRoot.querySelector("table")}get head(){return Array.from(this.table.querySelectorAll("thead th"))}get body(){return Array.from(this.table.querySelectorAll("tbody tr"))}render(){return u`
      <div class="table-responsive">
        <slot name="a"></slot>
        <table class=${"table "+this.tableClass}>
          <thead>
            ${this.renderColumns()}
          </thead>
          <tbody>
            ${this.data?v:u`<tr><td colspan=${this.columns.length}>Loading...</td></tr>`}
            ${this.data.length===0?u`<tr><td colspan=${this.columns.length}>No Items Found!</td></tr>`:v}
            ${this.data.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    `}}C(Ao,"properties",{tableClass:{type:String},editable:{type:Boolean},filterable:{type:Boolean},src:{type:String},data:{type:Array},columns:{type:Array},index:{type:Number,state:!0},unique:{type:Array,state:!0},filter:{type:Array,state:!0},hidden:{type:Array,state:!0}});customElements.define("table-component",Ao);class So extends _{createRenderRoot(){return this}firstUpdated(){const t=this.querySelector(".toast");new Ys(t).show(),t.addEventListener("hidden.bs.toast",n=>this.remove())}render(){return u`
      <div class=${"toast mb-2"+(this.type?" bg-"+this.type:"")} role="alert" aria-live="assertive" aria-atomic="true">
        <div class=${"toast-header"+(this.title?"":" d-none")}>
          <strong class="me-auto">${this.title}</strong>
          <small>${this.time}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${this.message}
        </div>
      </div>
    `}}C(So,"properties",{title:{type:String},time:{type:String},message:{type:String},type:{type:String}});customElements.define("toast-component",So);const nu="/MapAdmin/assets/logo-32x32-ef6b332f.png";class To extends _{createRenderRoot(){return this}render(){return u`
      <div class="modal show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header p-3 pb-4 border-bottom-0">
              <h1 class="modal-title fs-4"><img src="${nu}" height="32"> MapAdmin</h1>
            </div>
            <div class="modal-body p-3 pt-0">
              <form-component .action=${"/mapserver/api/login"} .method=${"post"} .submit=${this.handleLogin} .controls=${u`
                <input-component 
                  .type=${"email"} 
                  .name=${"email"} 
                  .placeholder=${"name@example.com"} 
                  .required=${!0} 
                  .label=${"Email address"} 
                  class="mb-3"
                  .variant=${"floating"}
                ></input-component>
                <input-component 
                  .type=${"password"} 
                  .name=${"password"} 
                  .placeholder=${"password"} 
                  .required=${!0} 
                  .label=${"Password"} 
                  .minlength=${8} 
                  class="mb-3"
                  .variant=${"floating"}
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
    `}}C(To,"properties",{handleLogin:{}});customElements.define("guest-layout",To);class wo extends _{createRenderRoot(){return this}render(){return u`
      <nav class="navbar navbar-dark sticky-top bg-success flex-md-nowrap px-0 shadow">
        <div class="container">
          <button class="navbar-toggler d-md-none p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarcontainer">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand px-3" href="#top">MapAdmin</a>
            <ul class="navbar-nav px-3">
              <li class="nav-item text-nowrap">
                <a class="nav-link" href="" @click=${this.handleLogout}>Logout</a>
              </li>
            </ul>
        </div>
      </nav>
      <main id="top" class="container">
        <div class="row pt-4" style="min-height: calc(100vh - 56px);">
          <sidebar-component id="sidebarcontainer" class="col-md-3 col-lg-2 d-md-block sidebar collapse"></sidebar-component>
          <router-component .routes=${this.routes} class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-white"></router-component>
        </div> 
      </main>
    `}}C(wo,"properties",{routes:{type:Array},handleLogout:{}});customElements.define("default-layout",wo);let iu=class extends _{createRenderRoot(){return this}render(){return u` 
      <form-component .controls=${u`
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create new layer</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="max-height:70vh">
          ${[{label:"Name",name:"name",type:"text"},{label:"Group",name:"group",type:"text"},{label:"Type",name:"type",type:"select",options:[{text:"LINE",value:"LINE"},{text:"POINT",value:"POINT"},{text:"POLYGON",value:"POLYGON"},{text:"RASTER",value:"RASTER"}]},{label:"Connection type",name:"connectiontype",type:"select",options:[{text:"LOCAL",value:"LOCAL"},{text:"OGR",value:"OGR"},{text:"POSTGIS",value:"POSTGIS"},{text:"WFS",value:"WFS"},{text:"WMS",value:"WMS"}]},{label:"Connection",name:"connection",type:"text"},{label:"Data",name:"data",type:"text"},{label:"Projection",name:"projection",type:"text"},{label:"Status",name:"status",type:"select",options:[{text:"ON",value:""},{text:"OFF",value:""},{text:"DEFAULT",value:""}]},{label:"Minscaledenom",name:"minscaledenom",type:"text"},{label:"Filteritem",name:"filteritem",type:"text"},{label:"Filter",name:"filter",type:"text"},{label:"Classitem",name:"classitem",type:"text"},{label:"Labelitem",name:"labelitem",type:"text"}].map(t=>u`
            <input-component .label=${t.label} .name=${t.name} .value=${t.value} .type=${t.type} .options=${t.options} .variant=${"horizontal"} .sizing=${"sm"} class="mb-3"></input-component>
          `)}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>`}>
      </form-component>
    `}};customElements.define("layer-modal",iu);let ou=class extends _{createRenderRoot(){return this}render(){return u`
      <form>      
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create new style</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          https://mapserver.org/mapfile/class.html
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="class-name">NAME</label>
            <input type="text" class="form-control" name="name" id="class-name" value="">
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="class-expression">EXPRESSION</label>
            <input type="text" class="form-control" name="expression" id="class-expression" value="">
          </div>

          https://mapserver.org/mapfile/label.html
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="label-align">ALIGN</label>
            <select class="form-control" name="align" id="label-align">
              <option value=""></option>
              <option value="LEFT">LEFT</option>
              <option value="CENTER">CENTER</option>
              <option value="RIGHT">RIGHT</option>
            </select>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm" for="label-position">POSITION</label>
            <select class="form-control" name="position" id="label-position">
              <option value=""></option>
              <option value="AUTO">AUTO</option>
              <option value="UL">Upper Left</option>
              <option value="UC">Upper Center</option>
              <option value="UR">Upper Right</option>
              <option value="CL">Center Left</option>
              <option value="CC">Center Center</option>
              <option value="CR">Center Right</option>
              <option value="LL">Lower Left</option>
              <option value="LC">Lower Center</option>
              <option value="LR">Lower Right</option>
            </select>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">COLOR</label>
            <div class="input-group">
              <input type="number" min="0" max="255" class="form-control text-right" name="color-r" placeholder="red" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="color-g" placeholder="green" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="color-b" placeholder="blue" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">OUTLINECOLOR</label>
            <div class="input-group">
              <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-r" placeholder="red" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-g" placeholder="green" value="">
              <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-b" placeholder="blue" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">MINSCALEDENOM</label>
            <input type="text" class="form-control text-right" name="minscaledenom" value="">
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">MAXSCALEDENOM</label>
            <input type="text" class="form-control text-right" name="maxscaledenom" value="">
          </div>


          https://mapserver.org/mapfile/style.html
          <div class="row">
            <div class="col-6">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label col-form-label-sm">COLOR</label>
                <div class="input-group">
                  <input type="number" min="0" max="255" class="form-control text-right" name="style-color-r" placeholder="red" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="style-color-g" placeholder="green" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="style-color-b" placeholder="blue" value="">
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm">OUTLINECOLOR</label>
                <div class="input-group">
                  <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-r" placeholder="red" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-g" placeholder="green" value="">
                  <input type="number" min="0" max="255" class="form-control text-right" name="outlinecolor-b" placeholder="blue" value="">
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-width">WIDTH</label>
                <input type="text" class="form-control" name="width" id="style-width" value="">
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-symbol">SYMBOL</label>
                <input type="text" class="form-control" name="symbol" id="style-symbol" value="">
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-size">SIZE</label>
                <input type="text" class="form-control" name="size" id="style-size" value="">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-minscaledenom">MINSCALEDENOM</label>
                <input type="text" class="form-control text-right" name="minscaledenom" id="style-minscaledenom" value="">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="col-sm-3 col-form-label col-form-label-sm" for="style-maxscaledenom">MAXSCALEDENOM</label>
                <input type="text" class="form-control text-right" name="maxscaledenom" id="style-maxscaledenom" value="">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    `}};customElements.define("style-modal",ou);class au extends _{createRenderRoot(){return this}constructor(){var t;super(),(!this.resolutions||((t=this.resolutions)==null?void 0:t.length)<1)&&(this.resolutions=[""])}duplicateRow(){this.resolutions.push("")}render(){var t;return u` 
      <form-component .controls=${u`
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create new layer</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="max-height:70vh">
          ${[{label:"Name",name:"name",type:"text",value:this.name},{label:"SRS",type:"group",content:u`
              <span class="input-group-text">EPSG:</span>
              <input type="number" name="srs" class="form-control" value=${this.srs}>
            `},{label:"Size",type:"group",content:u`
              <input type="number" name="size[]" class="form-control">
              <span class="input-group-text">x</span>
              <input type="number" name="size[]" class="form-control">
              <span class="input-group-text">px</span>
            `},{label:"Origin",type:"group",content:u`
              <input type="number" name="origin[]" class="form-control">
              <span class="input-group-text">,</span>
              <input type="number" name="origin[]" class="form-control">
            `},{label:"Bottom left",type:"group",content:u`
              <input type="number" name="extent[]" class="form-control">
              <span class="input-group-text">,</span>
              <input type="number" name="extent[]" class="form-control">
            `},{label:"Top right",type:"group",content:u`
              <input type="number" name="extent[]" class="form-control">
              <span class="input-group-text">,</span>
              <input type="number" name="extent[]" class="form-control">
            `},{label:"Resolution",type:"custom",content:u`
              <table class="w-100">
                ${(t=this.resolutions)==null?void 0:t.map(e=>u`
                <tr>
                  <td class="mb-3">
                    <div class="input-group input-group-sm">  
                      <input type="number" name="resolution[]" class="form-control">
                      <span class="input-group-text">units/px</span>
                    </div>
                  </td>
                </tr>
                `)}
              </table>
              <button class="btn btn-secondary" type="button" @click=${this.duplicateRow}><i class="ms ms-plus"></i></button>
              `}].map(e=>u`
            <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .options=${e.options} .variant=${"horizontal"} .sizing=${"sm"} .content=${e.content} class="mb-3"></input-component>
          `)}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>`}>
      </form-component>
    `}}customElements.define("grid-modal",au);class ru extends _{createRenderRoot(){return this}render(){return u` 
      <form-component .controls=${u`
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create new layer</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="max-height:70vh">
          ${[{label:"Name",name:"name",type:"text"},{label:"Workspace",name:"workspace",type:"text"},{label:"Type",name:"type",type:"select",options:[{text:"LINE",value:"LINE"},{text:"POINT",value:"POINT"},{text:"POLYGON",value:"POLYGON"},{text:"RASTER",value:"RASTER"}]},{label:"Connection type",name:"connectiontype",type:"select",options:[{text:"OGR",value:"OGR"},{text:"POSTGIS",value:"POSTGIS"},{text:"WFS",value:"WFS"},{text:"WMS",value:"WMS"}]},{label:"Connection",name:"connection",type:"text"},{label:"Data",name:"data",type:"text"},{label:"Projection",name:"projection",type:"text"},{label:"Status",name:"status",type:"select",options:[{text:"ON",value:""},{text:"OFF",value:""},{text:"DEFAULT",value:""}]},{label:"Minscaledenom",name:"minscaledenom",type:"text"},{label:"Filteritem",name:"filteritem",type:"text"},{label:"Filter",name:"filter",type:"text"},{label:"Classitem",name:"classitem",type:"text"},{label:"Labelitem",name:"labelitem",type:"text"}].map(t=>u`
            <input-component .label=${t.label} .name=${t.name} .value=${t.value} .type=${t.type} .options=${t.options} .variant=${"horizontal"} .sizing=${"sm"} class="mb-3"></input-component>
          `)}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>`}>
      </form-component>
    `}}customElements.define("datasource-modal",ru);class lu extends _{createRenderRoot(){return this}render(){return u`
      <breadcrumbs-component 
        .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
        .items=${[{url:"#",name:"Caches"}]}
      ></breadcrumbs-component>

      <table-component 
        .tableClass=${"table table-bordered table-striped table-hover table-sm"} 
        .selectable=${!0}
        .columns=${[{key:"name",label:"Cache name"},{key:"type",label:"Type"},{key:"enabled",label:"Enabled"},{key:"default",label:"Default"}]}
      ></table-component>
    `}}customElements.define("cache-page",lu);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cu={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},du=s=>(...t)=>({_$litDirective$:s,values:t});class uu{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ts extends uu{constructor(t){if(super(t),this.et=v,t.type!==cu.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===v||t==null)return this.ft=void 0,this.et=t;if(t===Et)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Ts.directiveName="unsafeHTML",Ts.resultType=1;const pu=du(Ts);class hu extends _{constructor(){super(),this.requestURI=void 0}createRenderRoot(){return this}handleRequest(t){const e=location.pathname.split("/")[1];let n=`${location.origin}/${e}/${t.target.value}`;switch(e){case"geoserver":n=n.replace("/mapcache","/gwc");break;case"qgisserver":n=n.replace("/mapcache/service/wmts","/ows");break}this.requestURI=n,this.requestUpdate()}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Documentation"}]}
    ></breadcrumbs-component>

    <h6>Endpoints</h6>
    <ul>
      <li>OGC Web Service: <a href="/mapserver/[workspace/]ows" class="text-decoration-none">/mapserver/[workspace/]ows</a></li>
      <li>Cache Service: <a href="/mapserver/mapcache/service/" class="text-decoration-none">/mapserver/mapcache/service/ows|wmts|tms</a></li>
      <li>REST interface: <a href="/mapserver/rest/" class="text-decoration-none">/mapserver/rest/</a></li>
      <li>Web interface: <a href="/mapserver/web/" class="text-decoration-none">/mapserver/web/</a></li>
    </ul>

    <h6>DEMO requests</h6>
    <div class="form-floating mb-3">
      <select id="demoRequestSelect" class="form-control form-select form-control-sm" @change="${this.handleRequest}">
        <option value=""></option>
        <optgroup label="WMS">
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities">GetCapabilities</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=DescribeLayer&LAYERS=test&SLD_VERSION=1.1.0">DescribeLayer</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=test&STYLE=default&CRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=250&HEIGHT=250&FORMAT=image/png">GetMap</option>
          <option value="mapcache/service/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=test&STYLES=&FORMAT=image/jpeg&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=256&HEIGHT=256">GetMap trough cache</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=test&STYLE=default&FORMAT=image/png&SLD_VERSION=1.1.0&WIDTH=20&HEIGHT=20">GetLegendGraphic</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetStyles&LAYERS=test">GetStyles</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=test&CRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=250&HEIGHT=250&QUERY_LAYERS=test&I=10&J=200&INFO_FORMAT=json">GetFeatureInfo</option>
        </optgroup>
        <optgroup label="WFS">
          <option value="ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetCapabilities">GetCapabilities</option>
          <option value="ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=DescribeFeatureType&TYPENAME=test">DescribeFeatureType</option>
          <option value="ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=test&MAXFEATURES=10&OUTPUTFORMAT=application/json;subtype=geojson&PROPERTYNAME=id,name&FEATUREID=1">GetFeature</option>
        </optgroup>
        <optgroup label="WCS">
          <option value="ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCapabilities">GetCapabilities</option>
          <option value="ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=DescribeCoverage&COVERAGEID=test">DescribeCoverage</option>
          <option value="ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&CoverageID=test&COMPRESSION=LZW&TILING=true&TILEHEIGHT=256&TILEWIDTH=256">GetCoverage</option>
        </optgroup>
        <optgroup label="WMTS">
          <option value="mapcache/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=test&STYLE=default&TILEMATRIXSET=WGS84&TILEMATRIX=6&TILEROW=31&TILECOL=65&FORMAT=image/png">GetTile</option>
        </optgroup>
        <optgroup label="TMS">
          <option value="mapcache/service/tms/1.0.0/test@WGS84/6/65/32.png">GetTile</option>
        </optgroup>
        <optgroup label="WMC">
          <option value="ows?REQUEST=GetMetadata&LAYER=test">GetMetadata</option>
        </optgroup>
        <optgroup label="REST">
          <option value="rest/">REST Interface</option>
        </optgroup>
        <optgroup label="WEB">
          <option value="web/">Web GUI</option>
        </optgroup>
      </select>
      <label for="demoRequestSelect">Select request type</label>
    </div>
        
    <div class="card bg-light mb-3">
      <div class="card-header text-secondary" style="font-size: small;">
        <a href=${this.requestURI??"about:blank"} target="_blank" class="text-decoration-none text-secondary">
          ${pu((this.requestURI??location.origin).replace(/(&|\?)([^=]+)=([^&]+)/g,' $1 <span><span class="text-dark">$2</span>=$3</span>'))}
        </a>
      </div>
      <div class="card-body">
        <iframe src=${this.requestURI??"about:blank"} frameborder="0" allowTransparency="true" class="w-100 border-0 m-0" style="height: 300px;"></iframe>
      </div>
    </div>
    `}}customElements.define("documentation-page",hu);class mu extends _{createRenderRoot(){return this}render(){return u`
      <breadcrumbs-component 
        .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
        .items=${[{url:"#",name:"Gridsets"}]}
      ></breadcrumbs-component>

      <modal-component 
        label="New gridset" 
        btnClass="btn btn-sm btn-success mb-4"
        .content=${u`<grid-modal></grid-modal>`}
      ></modal-component>

      <table-component 
        .tableClass=${"table table-bordered table-striped table-hover table-sm"} 
        .selectable=${!0}
        .columns=${[{key:"name",label:"Gridset Name"},{key:"crs",label:"CRS"},{key:"tiledimensions",label:"Tile Dimensions"},{key:"zoomlevels",label:"Zoom levels"},{key:"diskusage",label:"Disk Usage"}]}
      ></table-component>
    `}}customElements.define("gridset-page",mu);class Co extends _{createRenderRoot(){return this}render(){return console.log(this.params),u`
      <breadcrumbs-component 
        .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
        .items=${[{url:"#",name:"Layers"}]}
      ></breadcrumbs-component>

      <modal-component 
        label="New layer" 
        btnClass="btn btn-sm btn-success mb-4"
        .content=${u`<layer-modal></layer-modal>`}
      ></modal-component>
      
      <table-component 
        .tableClass=${"table table-bordered table-striped table-hover table-sm"} 
        .selectable=${!0}
        .columns=${[{key:"workspace",label:"Workspace"},{key:"name",label:"Layer Name"},{key:"type",label:"Type"},{key:"source",label:"Source"},{key:"enabled",label:"Enabled"},{key:"srs",label:"SRS"}]}
      ></table-component>
    `}}C(Co,"properties",{params:{state:!0}});customElements.define("layer-page",Co);class fu extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Layer Groups"}]}
    ></breadcrumbs-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace</span></th>
            <th><span>Group Name</span></th>
            <th><span>Enabled</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `}}customElements.define("layergroup-page",fu);class gu extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Logs"}]}
    ></breadcrumbs-component>
    <page-header text=""></page-header>

    <div class="card bg-light">
      <div class="card-body">
        <pre>logs...</pre>
      </div>
    </div>
    `}}customElements.define("logs-page",gu);class vu extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Not found"}]}
    ></breadcrumbs-component>

    <p>The requested page is not found.</p>
    `}}customElements.define("notfound-page",vu);class bu extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Security"}]}
    ></breadcrumbs-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>User Name</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `}}customElements.define("security-page",bu);class _u extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Services"}]}
    ></breadcrumbs-component>

      <tab-component 
        .navClass=${"nav-fill"}
        .contentClass=${"pt-4"}
        .items=${[{id:"general",label:"General",active:!0,content:u`
            <form-component .action=${"services/general"} .method=${"post"}>
              <fieldset class="mb-4">
                <legend class="h6">Metadata</legend>
                ${[{label:"Title",type:"text",name:"title",value:"GeoServer Web Map Service"},{label:"Abstract",type:"textarea",name:"abstract",value:"A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS"},{label:"Fees",type:"text",name:"fees",value:"NONE"},{label:"Access constraints",type:"text",name:"accessConstraints",value:"NONE"},{label:"Keywords",type:"text",name:"keywords",value:"WFS,WMS,GEOSERVER"},{label:"Online resource",type:"url",name:"onlineResource",value:"http://geoserver.org"}].map(t=>u`
                    <input-component .label=${t.label} .name=${t.name} .value=${t.value} .type=${t.type} .variant=${"horizontal"} .sizing=${"sm"} class="mb-3"></input-component>
                `)}
              </fieldset>
              <fieldset class="mb-4">
                <legend class="h6">Contact information</legend>
                ${[{label:"Contact name",type:"text",name:"contactPerson",value:""},{label:"Organization",type:"text",name:"contactOrganization",value:""},{label:"Position",type:"text",name:"contactPosition",value:""},{label:"Email",type:"email",name:"contactEmail",value:""},{label:"Voice",type:"tel",name:"contactVoice",value:""},{label:"Fax",type:"tel",name:"contactFacsimile",value:""},{label:"Address type",type:"text",name:"addressType",value:""},{label:"Address",type:"text",name:"address",value:"."},{label:"Address delivery point",type:"text",name:"addressDeliveryPoint",value:""},{label:"City",type:"text",name:"addressCity",value:""},{label:"State",type:"text",name:"addressState",value:""},{label:"ZIP code",type:"text",name:"addressPostalCode",value:""},{label:"Country",type:"text",name:"addressCountry",value:""}].map(t=>u`
                    <input-component .label=${t.label} .name=${t.name} .value=${t.value} .type=${t.type} .variant=${"horizontal"} .sizing=${"sm"} class="mb-3"></input-component>
                `)}
              </fieldset>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-9">
                  <button type="submit" class="btn btn-sm btn-primary">Save</button>
                </div>
              </div>
            </form-component>
          `},{id:"wms",label:"WMS",content:u`
            <form-component .action=${"services/wms"} .method=${"post"}>
              <fieldset class="mb-4">
                <legend class="h6">Metadata</legend>
                ${[{label:"Title",type:"text",name:"title",value:"GeoServer Web Map Service"},{label:"Abstract",type:"textarea",name:"abstract",value:"A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS"},{label:"Fees",type:"text",name:"fees",value:"NONE"},{label:"Access constraints",type:"text",name:"accessConstraints",value:"NONE"},{label:"Keywords",type:"text",name:"keywords",value:"WFS,WMS,GEOSERVER"},{label:"Online resource",type:"url",name:"onlineResource",value:"http://geoserver.org"}].map(t=>u`
                    <input-component .label=${t.label} .name=${t.name} .value=${t.value} .type=${t.type} .variant=${"horizontal"} .sizing=${"sm"} class="mb-3"></input-component>
              `)}
              </fieldset>
              <fieldset class="mb-4">
                <legend class="h6">Service specific settings</legend>
                ${[{label:"Limited SRS list",txpe:"textarea",name:"srs",value:""},{label:"Output bounding box for every supported CRS",type:"checkbox",name:"bBOXForEachCRS",value:""},{label:"MIME types for a GetMap request",type:"select",name:"srs",multiple:!0,rows:3,options:[{value:"application/atom+xml"},{value:"application/json;type=utfgrid"},{value:"application/pdf"},{value:"application/rss+xml"},{value:"application/vnd.google-earth.kml+xml"},{value:"application/vnd.google-earth.kml+xml;mode=networklink"},{value:"application/vnd.google-earth.kmz"},{value:"image/geotiff"},{value:"image/geotiff8"},{value:"image/gif"},{value:"image/jpeg"},{value:"image/png"},{value:"image/png; mode=8bit"},{value:"image/svg+xml"},{value:"image/tiff"},{value:"image/tiff8"},{value:"image/vnd.jpeg-png"},{value:"image/vnd.jpeg-png8"},{value:"text/html; subtype=openlayers"},{value:"text/html; subtype=openlayers2"},{value:"text/html; subtype=openlayers3"}]},{label:"MIME types for a GetFeatureInfo request",type:"select",name:"srs",multiple:!0,rows:3,options:[{value:"application/json"},{value:"application/vnd.ogc.gml"},{value:"application/vnd.ogc.gml/3.1.1"},{value:"text/html"},{value:"text/plain"},{value:"text/xml"},{value:"text/xml; subtype=gml/3.1.1"}]},{label:"Disable usage of SLD and SLD_BODY parameters in GET requests and user styles in POST requests",type:"checkbox",name:"dynamicStyling.disabled"}].map(t=>u`
                  <input-component .label=${t.label} .name=${t.name} .value=${t.value} .type=${t.type} .variant=${"horizontal"} .sizing=${"sm"} .multiple=${t.multiple} .rows=${t.rows} .options=${t.options} class="mb-3"></input-component>
              `)}
              </fieldset>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-9">
                  <button type="submit" class="btn btn-sm btn-primary">Save</button>
                </div>
              </div>
            </form-component>
          `},{id:"wfs",label:"WFS",content:u`
            
          `},{id:"wcs",label:"WCS",content:u`
            
          `},{id:"wmts",label:"WMTS",content:u`
            
          `},{id:"tms",label:"TMS",content:u`
            
          `}]}
      ></tab-component>
    `}}customElements.define("service-page",_u);class Eu extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Sources"}]}
    ></breadcrumbs-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace</span></th>
            <th><span>Source Name</span></th>
            <th><span>Data Type</span></th>
            <th><span>Format</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `}}customElements.define("source-page",Eu);class yu extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Status"}]}
    ></breadcrumbs-component>

    <h6>About</h6>
    <ul class="list-group mb-4">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">MapAdmin</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="documentation" data-bs-toggle="router" class="nav-link">1.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1" style="white-space: nowrap;">Server type</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="https://mapserver.org/" target="_blank" class="nav-link"><i class="ms ms-mapserver"></i> MapServer Suite</a>
            <!-- a href="http://geoserver.org/" target="_blank" class="nav-link"><i class="ms ms-geoserver"></i> GeoServer</a -->
            <!-- a href="https://qgis.org/" target="_blank" class="nav-link"><i class="ms ms-qgis"></i> QGIS Server</a -->
          </li>
        </ul>
      </li>
    </ul>

    <h6>Service Capabilities &amp; Status</h6>
    <ul class="list-group mb-4">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WMS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../ows?SERVICE=WMS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WMS&amp;VERSION=1.1.1&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.1.1</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WMS&amp;VERSION=1.3.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.3.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WFS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../ows?SERVICE=WFS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.1.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WFS&amp;VERSION=2.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">2.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WCS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../ows?SERVICE=WCS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WCS&amp;VERSION=1.1.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.1.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WCS&amp;VERSION=2.0.1&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">2.0.1</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WMTS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../mapcache/service/wmts?SERVICE=WMTS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">TMS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../mapcache/service/tms/1.0.0" target="_blank" class="nav-link">1.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
    </ul>
    `}}customElements.define("status-page",yu);class $u extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Style"}]}
    ></breadcrumbs-component>

    <modal-component 
      label="New style"
      btnClass="btn btn-sm btn-success mb-4"
      .content=${u`<style-modal></style-modal>`}
    ></modal-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace</span></th>
            <th><span>Style Name</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `}}customElements.define("style-page",$u);class Au extends _{createRenderRoot(){return this}render(){return u`
    <breadcrumbs-component 
      .navClass=${"pt-3 pb-2 mb-4 border-bottom fs-5"}
      .items=${[{url:"#",name:"Workspaces"}]}
    ></breadcrumbs-component>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll"></th>
            <th><span>Workspace Name</span></th>
            <th><span>Services</span></th>
            <th><span>Default</span></th>
          </tr>
        </thead>
      </table>
    </div>
    `}}customElements.define("workspace-page",Au);const Su=[{path:"/MapAdmin",component:"status-page"},{path:"/MapAdmin/cache",component:"cache-page"},{path:"/MapAdmin/styles",component:"style-page"},{path:"/MapAdmin/documentation",component:"documentation-page"},{path:"/MapAdmin/gridsets",component:"gridset-page"},{path:"/MapAdmin/layers",component:"layer-page"},{path:"/MapAdmin/layergroups",component:"layergroup-page"},{path:"/MapAdmin/logs",component:"logs-page"},{path:"/MapAdmin/security",component:"security-page"},{path:"/MapAdmin/status",component:"status-page"},{path:"/MapAdmin/services",component:"service-page"},{path:"/MapAdmin/sources",component:"source-page"},{path:"/MapAdmin/workspaces",component:"workspace-page"},{path:void 0,component:"notfound-page"}];class Oo extends _{constructor(){super();C(this,"handleLogout",e=>{e.preventDefault(),this._isLoggedIn=!1,localStorage.removeItem("token"),localStorage.removeItem("identity"),this.toast({message:"Sikeres kijelentkezés",type:"success"})});C(this,"handleLogin",e=>{e.preventDefault(); localStorage.setItem("token",'abc'); localStorage.setItem("identity",JSON.stringify('123')); window.location.reload(); });this._isLoggedIn=!1}createRenderRoot(){const e=localStorage.getItem("token");return localStorage.getItem("identity")&&e&&(this._isLoggedIn=!0),this}willUpdate(e){this.classList.remove("show")}firstUpdated(e){this.classList.add("fade")}updated(e){this.classList.add("show")}toast(e){const n=document.getElementById("toast_messages"),i=document.createElement("toast-component");i.title=e.title,i.message=e.message,i.type=e.type,n.appendChild(i)}render(){return u`
      ${this._isLoggedIn?u`
            <default-layout 
              .handleLogout=${this.handleLogout} 
              .routes=${Su}
            >
            </default-layout>
          `:u`
            <guest-layout 
              .handleLogin=${this.handleLogin}
            >
            </guest-layout>
          `}
      <div
        id="toast_messages"
        class="position-fixed bottom-0 left-0 p-3"
        style="z-index: 1100; left: 0; bottom: 0;"
      ></div>
    `}}C(Oo,"properties",{_isLoggedIn:{type:Boolean,state:!0}});customElements.define("mapadmin-app",Oo);if(!window.customElements){var Xt=document.createElement("div");Xt.className="alert bg-warning rounded-0 w-100 text-center position-fixed top-0",Xt.style="cursor: pointer; z-index: 9999;",Xt.onclick=function(s){this.remove()},Xt.innerHTML=["Figyelem, a rendszer használatához modern ",'<a href="http://www.google.com/chrome" target="_blank">Chrome</a>, ','<a href="http://www.mozilla.org/products/firefox/" target="_blank">Firefox</a>, ','<a href="http://www.opera.com/" target="_blank">Opera</a>, ','<a href="http://www.apple.com/safari/" target="_blank">Safari</a> vagy ','<a href="https://www.microsoft.com/en-us/edge" target="_blank">Edge</a> ',"böngésző használata javasolt."].join(""),document.body.appendChild(Xt)}

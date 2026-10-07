/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * NETWORK-FLOW-CARD v4.0.0
 * A power-flow-card-plus style custom visual card for Home Assistant
 * featuring internet, router, LAN, Wi-Fi access points, and multi-row client monitoring.
 *
 * Visual style inspired by power-flow-card-plus by flixlix:
 * https://github.com/flixlix/power-flow-card-plus
 * (independent implementation, no shared code)
 *
 * v4.0.0 adds `view_mode: hyperbolic` - an explorable Poincare-disk tree of
 * the same network - alongside the original `view_mode: flat` diagram.
 *
 * https://github.com/YOUR_GITHUB_USERNAME/network-flow-card
 */


console.info(
  "%c NETWORK-FLOW-CARD %c v4.0.0 ",
  "color: white; background: #3b82f6; font-weight: 700;",
  "color: #3b82f6; background: white; font-weight: 700;"
);

// --- Default Configurations ---
const DEFAULT_ACCESS_POINT = {
  entity: "",
  name: "",
  icon: "mdi:wifi",
  devices_icon: "mdi:devices",
  is_primary: false,
  primary_badge_location: "top-left",
  show_backhaul_icon: true,
  show_primary_badge: true,
  connects_to_switch: false,
  ip_badge_color: "var(--blue-color)",
  ip_badge_icon_color: "var(--card-background-color)",
  entities: {
    connected_devices: "",
    download: "",
    upload: "",
    backhaul_type: "",
    backhaul_speed: "",
    // IP Address badges (Layout > General > Show IP Addressing).
    // ip_address is this AP's own LAN-side address - shown below the
    // circle for the Primary AP in tiered layout, or above it
    // otherwise (Primary in flat layout, or any non-Primary AP).
    // wan_ip only applies when this AP is Primary and doubles as the
    // router/gateway (no separate Router node) - shown below the
    // Internet circle exactly like the Router's own WAN badge would be.
    ip_address: "",
    wan_ip: ""
  },
  colors: {
    icon: "var(--cyan-color)",
    circle: "var(--cyan-color)",
    download: "var(--blue-color)",
    upload: "var(--orange-color)",
    line: "var(--primary-text-color)",
    devices_circle: "var(--purple-color)",
    devices_icon: "var(--primary-color)",
    devices_line: "var(--purple-color)",
    backhaul_icon: "var(--secondary-text-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)",
    devices_offline_circle: "var(--error-color)",
    devices_offline_icon: "var(--error-color)",
    primary_badge: "var(--orange-color)",
    primary_badge_icon: "var(--card-background-color)",
    primary_badge_border: "transparent"
  }
};

// Power-over-Ethernet badge config, shared by the top-level Switch and
// every node-level Switch. "auto" sums every entity on the switch's
// device that reports watts and looks PoE-related (covers per-port
// sensors from integrations like UniFi Insights without the user
// listing each port); "manual" sums exactly the entities configured
// below. Threshold coloring evaluates `thresholds` in order and uses
// the first one whose `up_to` the total is at or under - the final
// entry has no `up_to` and acts as the catch-all above every other tier.
const DEFAULT_POE = {
  mode: "off", // "auto" | "manual" | "off"
  manual_entities: [],
  unit: "W",
  icon: "mdi:lightning-bolt",
  location: "bottom-right",
  color_mode: "single", // "single" | "threshold"
  color: "var(--orange-color)",
  text_color: "var(--card-background-color)",
  thresholds: [
    { up_to: 15, color: "var(--green-color)" },
    { up_to: 30, color: "var(--orange-color)" },
    { color: "var(--red-color)" }
  ],
  animate_over_threshold: false
};

// Access Points get the same PoE capability as Switches, added after
// DEFAULT_POE's own declaration (DEFAULT_ACCESS_POINT is declared
// earlier in the file, so it can't reference DEFAULT_POE inline).
DEFAULT_ACCESS_POINT.poe = { ...DEFAULT_POE };

// A node-level Switch (distinct from the top-level Switch that sits
// above the bus between Router and the Access Point row). This one
// lives inside a single Node, optionally feeding that node's own
// Access Point(s).
const DEFAULT_NODE_SWITCH = {
  entity: "",
  name: "",
  icon: "mdi:switch",
  devices_icon: "mdi:devices",
  entities: {
    connected_devices: ""
  },
  colors: {
    icon: "var(--amber-color)",
    circle: "var(--amber-color)",
    bus_line: "var(--divider-color, #ccc)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)",
    devices_circle: "var(--purple-color)",
    devices_icon: "var(--primary-color)",
    devices_line: "var(--divider-color, #ccc)",
    devices_offline_circle: "var(--error-color)",
    devices_offline_icon: "var(--error-color)"
  },
  poe: { ...DEFAULT_POE }
};

// A Homelab node - a dedicated node type for an appliance running
// multiple network functions at once (DNS filtering, a VPN server,
// a reverse proxy), which is common on a single mini-PC/NAS/Proxmox
// box. Structurally it behaves like a standalone Switch (its own
// circle sits directly on the bus, solid unanimated lines throughout,
// no bandwidth metrics) since it's infrastructure rather than a
// Wi-Fi access point - it just carries a different default icon and
// three additional optional service badges alongside PoE.
// A single container/VM status badge on a Homelab node - shaped like
// the VPN/Firewall badges (active vs offline color sets, an icon)
// since "is it running" is the only meaningful reading. Homelab holds
// an array of these (one per container/VM the user wants to track),
// each independently positioned and stacking with everything else on
// that circle.
const DEFAULT_CONTAINER_BADGE = {
  entity: "",
  name: "",
  icon: "mdi:docker",
  location: "top-right",
  color: "var(--green-color)",
  icon_color: "var(--card-background-color)",
  border_color: "transparent",
  offline_color: "var(--disabled-text-color, #bdbdbd)",
  offline_icon_color: "var(--card-background-color)",
  offline_border_color: "transparent",
  animate_offline: false
};

const DEFAULT_HOMELAB = {
  entity: "",
  name: "",
  icon: "mdi:server",
  devices_icon: "mdi:devices",
  entities: {
    connected_devices: ""
  },
  colors: {
    icon: "var(--deep-purple-color)",
    circle: "var(--deep-purple-color)",
    bus_line: "var(--divider-color, #ccc)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)",
    devices_circle: "var(--purple-color)",
    devices_icon: "var(--primary-color)",
    devices_line: "var(--divider-color, #ccc)",
    devices_offline_circle: "var(--error-color)",
    devices_offline_icon: "var(--error-color)"
  },
  poe: { ...DEFAULT_POE },
  // Off by default expectation is that most Homelab nodes have
  // nothing hanging directly off them the way a Switch feeds APs or
  // clients - this lets the connecting line down toward Connected
  // Devices / the shared Clients box be turned off
  // entirely rather than always drawing toward a box this node has
  // nothing to do with.
  show_devices_line: true,
  // DNS Filtering, VPN, Firewall, and Reverse Proxy are now global
  // Security elements that can each target this node (see
  // dns_target/vpn_target/firewall_target/reverse_proxy_target) -
  // Homelab no longer carries its own separate copies of those.
  containers: []
};

// A Node is one branch hanging off the main bus line. It can be a bare
// Access Point (the only shape that existed before this schema), or it
// can contain a node-level Switch feeding one or more Access Points.
// `access_points` always has at least one entry.
const DEFAULT_NODE = {
  name: "",
  switch: null,
  homelab: null,
  access_points: [],
  // Additional Switches fed by this node's own `switch`, alongside
  // (not instead of) its access_points - rendered in the same row as
  // the fed APs, each a leaf (no further feeding of its own), with
  // solid connecting lines the whole way down through its own
  // Connected Clients circle to Clients, matching how any
  // Switch's own output always renders solid.
  fed_switches: []
};

const DEFAULT_INDIVIDUAL_DEVICE = {
  entity: "",
  // Manual name override. Blank means the entity's own friendly_name
  // is used at display/tooltip time (see _renderIndividualDeviceCircle)
  // - this is prefilled from the entity's friendly_name automatically
  // whenever it's picked/changed in the editor while still blank, but
  // stays fully editable afterward.
  name: "",
  icon: "mdi:devices",
  // Manual override for which sub-group this device sits in when
  // Group By is active. Blank means auto-detect from the entity's own
  // attributes (see getDeviceGroupName); when set, this exact label
  // is used regardless of the entity's actual attributes.
  group_override: "",
  colors: {
    circle: "var(--pink-color)",
    icon: "var(--pink-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)"
  }
};

// One Internet/WAN service. Used for the primary `internet` block and,
// identically, for the optional `internet_secondary` (backup) block.
const DEFAULT_INTERNET = {
  name: "",
  entity: "",
  icon: "mdi:web",
  circle_size: 72,
  icon_size: 24,
  download_icon: "mdi:progress-download",
  upload_icon: "mdi:progress-upload",
  ping_icon: "mdi:speedometer",
  entities: {
    ping: "",
    jitter: "",
    download: "",
    upload: "",
    total_download: "",
    total_upload: "",
    quota_total: "",
    quota_remaining: ""
  },
  colors: {
    icon: "var(--green-color)",
    quota_remaining: "var(--divider-color)",
    quota_progress: "var(--green-color)",
    circle: "var(--green-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)"
  }
};

// --- Monitoring (v3.3.0) ---------------------------------------------
// One monitored service: an Uptime Kuma monitor, a Ping host, a Gatus
// endpoint, an UptimeRobot monitor - or any entity that reports up/down.
//
// `type` decides WHERE it is drawn:
//   "external" - in the External box above the Internet node
//   "internal" - in the Clients box ("Monitored" group), or as a badge on
//                the device named by `assign_to`
//   "auto"     - resolved live to one of the two from the integration's own
//                data (tags, then the monitored address); see
//                resolveMonitorScope()
//
// `assign_to` is "clients" or the entity id of a device already on the card
// (Router, Switch, Access Point, Server, Internet ...).
//
// `response_entity`, `target`, `target_entities` and `tags_entity` are
// filled in by auto-discovery: the response-time sensor for the badge, and
// the address/tags that `type: auto` classifies on.
const DEFAULT_MONITORED_SERVICE = {
  entity: "",
  source: "",
  name: "",
  icon: "mdi:heart-pulse",
  type: "auto",
  assign_to: "clients",
  response_entity: "",
  show_response_time: true,
  target: "",
  target_entities: [],
  tags_entity: "",
  // The same four colours a client has: border and icon, plus their Down
  // (a client's "offline") variants.
  colors: {
    circle: "var(--pink-color)",
    icon: "var(--pink-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)"
  }
};

const DEFAULT_MONITORING = {
  services: [],
  // One set of colours for every monitored-service badge, by state.
  colors: {
    up: "var(--green-color)",
    down: "var(--red-color)",
    pending: "var(--orange-color)",
    maintenance: "var(--blue-color)",
    icon: "var(--card-background-color)",
    border: "transparent"
  },
  // The glyph inside a service's own state badge (External box / Clients).
  icons: {
    up: "mdi:check",
    down: "mdi:close",
    pending: "mdi:clock-outline",
    maintenance: "mdi:wrench"
  },
  // A down badge flashes, driven by the card's own Advanced > Enable
  // Animations switch like every other animation - there is no separate option.
  // How to show a service whose entity is unavailable/unknown - most often
  // the monitoring integration itself being unreachable, not the service.
  unavailable_state: "pending", // "pending" | "down"
  // External box look - the same three controls the Clients box has.
  box_color: "var(--divider-color)",
  box_radius: "var(--ha-card-border-radius, 12px)",
  show_names: false,
  badge_location: "top-right",
  // Badge icon on a device when several services are assigned to it (one
  // service uses its own icon).
  device_badge_icon: "mdi:heart-pulse",
  // Response-time badge look, bottom-centre of a service's circle. WHETHER a
  // service shows one is its own Show Response Time Badge switch.
  // Thresholds work exactly like the PoE badge's (ascending up_to values,
  // final row is the open-ended catch-all) - lower is better here.
  response: {
    unit: "ms",
    color_mode: "threshold", // "single" | "threshold"
    color: "var(--green-color)",
    text_color: "var(--card-background-color)",
    thresholds: [
      { up_to: 100, color: "var(--green-color)" },
      { up_to: 300, color: "var(--orange-color)" },
      { color: "var(--red-color)" }
    ],
    animate_over_threshold: false
  }
};

const DEFAULT_CONFIG = {
  type: "custom:network-flow-card",
  title: "",
  // "flat" is the original diagram; "hyperbolic" is the explorable
  // Poincare-disk tree of the same network (v4.0.0).
  view_mode: "flat",
  hyperbolic_show_labels: true,
  hyperbolic_show_details: true,
  hyperbolic_node_scale: 100,
  // Size of each kind of node, as a percentage (multiplied by the overall node size above)
  hyperbolic_size_internet: 100,
  hyperbolic_size_router: 100,
  hyperbolic_size_lan: 100,
  hyperbolic_size_switch: 100,
  hyperbolic_size_ap: 100,
  hyperbolic_size_homelab: 100,
  hyperbolic_size_count: 100,
  hyperbolic_size_client: 100,
  // Circle outline / background: blank colour = theme default; transparency 0 (solid) - 100 (invisible)
  hyperbolic_outline_color: "",
  hyperbolic_outline_transparency: 0,
  hyperbolic_background_color: "",
  hyperbolic_background_transparency: 45,
  // Glass style: an iOS-like frosted disc. Blur 0-100 scale below maps to 0-40px.
  hyperbolic_glass: false,
  hyperbolic_glass_blur: 45,
  hyperbolic_glass_clear_card: true,
  // "auto" | "mobile" | "tablet" - where the summary and details panel go
  hyperbolic_layout: "auto",
  // Tablet layout: the share of the width the tree takes (50-85)
  hyperbolic_tablet_split: 70,
  // Tablet layout: keep the tree no taller than the screen (off = use the full column width)
  hyperbolic_fit_height: true,
  // Graphs in the details panel: on/off and the timescale they start with (5m, 30m, 1h, 12h, 24h, 72h)
  hyperbolic_show_graphs: true,
  hyperbolic_show_clients: true,
  hyperbolic_details_popup: false,
  hyperbolic_details_button: "device",
  hyperbolic_graph_clients_color: "",
  hyperbolic_graph_download_color: "",
  hyperbolic_graph_upload_color: "",
  hyperbolic_graph_ping_color: "",
  hyperbolic_graph_jitter_color: "",
  hyperbolic_graph_cpu_color: "",
  hyperbolic_graph_memory_color: "",
  hyperbolic_graph_disk_color: "",
  hyperbolic_graph_response_color: "",
  // Flat view: show the summary card and details panel beside / below the diagram (off = the classic card)
  flat_show_details: false,
  // Summary card (hyperbolic): optional "Summary" title and colours (blank = theme defaults)
  hyperbolic_summary_show_title: false,
  hyperbolic_summary_background_color: "",
  hyperbolic_summary_outline_color: "",
  hyperbolic_graph_range: "24h",
  // Unknown node (Clients page) and details panel colours: blank = defaults
  hyperbolic_unknown_circle_color: "",
  hyperbolic_unknown_icon_color: "",
  hyperbolic_details_background_color: "",
  hyperbolic_details_outline_color: "",
  // "attached" (clients hang off their AP / switch) | "grouped" (under a Clients node)
  hyperbolic_client_layout: "attached",
  summary_position: "top",
  summary_items: ["realtime_download", "realtime_upload", "ping"],
  // Colors the PoE summary badge, mirroring the per-switch PoE badge's
  // own color options (single fixed color, or ascending thresholds).
  // Separate from any individual switch's `poe` config since this one
  // colors an aggregate total across every switch shown on the card.
  summary_speedtest_download_color: "var(--green-color)",
  summary_speedtest_download_icon_color: "var(--text-primary-color)",
  summary_speedtest_upload_color: "var(--pink-color)",
  summary_speedtest_upload_icon_color: "var(--text-primary-color)",
  summary_realtime_download_color: "var(--green-color)",
  summary_realtime_download_icon_color: "var(--text-primary-color)",
  summary_realtime_upload_color: "var(--pink-color)",
  summary_realtime_upload_icon_color: "var(--text-primary-color)",
  summary_latency_color: "var(--cyan-color)",
  summary_latency_icon_color: "var(--text-primary-color)",
  summary_poe_color_mode: "single", // "single" | "threshold"
  summary_poe_color: "var(--orange-color)",
  summary_poe_thresholds: [
    { up_to: 15, color: "var(--green-color)" },
    { up_to: 30, color: "var(--orange-color)" },
    { color: "var(--red-color)" }
  ],
  primary_ap_layout: "flat",
  // IP Address badges (Router WAN/LAN, Primary/other AP addresses) -
  // off by default since not everyone has, or wants to expose, IP
  // sensors on their diagram.
  show_ip_addressing: true,
  primary_badge_icon: "mdi:star",
  badge_size: 18,
  badge_icon_size: 12,
  poe_badge_size: 16,
  poe_badge_font_size: 9,
  ip_badge_opacity: 100,
  vpn_entity: "",
  vpn_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  vpn_animate_offline: false,
  vpn_badge_icon: "mdi:vpn",
  vpn_badge_location: "bottom-right",
  vpn_badge_color: "var(--blue-color)",
  vpn_badge_icon_color: "var(--card-background-color)",
  vpn_badge_border_color: "transparent",
  vpn_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  vpn_badge_offline_icon_color: "var(--card-background-color)",
  vpn_badge_offline_border_color: "transparent",
  // Optional - when set, the VPN badge shows this entity's value next
  // to its icon (a widened pill instead of a plain circle). Left
  // blank, the badge stays icon-only exactly as before.
  vpn_peers_entity: "",
  firewall_entity: "",
  firewall_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  firewall_animate_offline: false,
  firewall_badge_icon: "mdi:wall-fire",
  firewall_badge_location: "bottom-left",
  firewall_badge_color: "var(--orange-color)",
  firewall_badge_icon_color: "var(--card-background-color)",
  firewall_badge_border_color: "transparent",
  firewall_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  firewall_badge_offline_icon_color: "var(--card-background-color)",
  firewall_badge_offline_border_color: "transparent",
  // DNS Filtering (e.g. Pi-hole/AdGuard Home) - a numeric pill like
  // PoE's, shown on whichever device it's targeted at.
  dns_entity: "",
  dns_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  dns_unit: "",
  dns_badge_icon: "mdi:shield-check",
  dns_badge_location: "top-left",
  dns_color_mode: "single", // "single" | "threshold"
  dns_badge_color: "var(--blue-color)",
  dns_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  dns_text_color: "var(--card-background-color)",
  dns_thresholds: [
    { up_to: 50, color: "var(--green-color)" },
    { up_to: 100, color: "var(--orange-color)" },
    { color: "var(--red-color)" }
  ],
  dns_animate_over_threshold: false,
  // Reverse Proxy - shaped exactly like VPN/Firewall (active/offline
  // icon badge), since "is it up" is the only meaningful reading for
  // most reverse proxy setups.
  reverse_proxy_entity: "",
  reverse_proxy_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  reverse_proxy_animate_offline: false,
  reverse_proxy_badge_icon: "mdi:server-network",
  reverse_proxy_badge_location: "top-right",
  reverse_proxy_badge_color: "var(--green-color)",
  reverse_proxy_badge_icon_color: "var(--card-background-color)",
  reverse_proxy_badge_border_color: "transparent",
  reverse_proxy_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  reverse_proxy_badge_offline_icon_color: "var(--card-background-color)",
  reverse_proxy_badge_offline_border_color: "transparent",
  ap_circle_size: 72,
  ap_icon_size: 24,
  ap_devices_circle_size: 56,
  ap_devices_icon_size: 20,
  ap_column_gap: 32,
  homelab_circle_size: 60,
  homelab_icon_size: 22,
  flow_line_color: "var(--divider-color, #ccc)",
  backhaul_icon_size: 13,
  individual_device_circle_size: 42,
  individual_device_icon_size: 20,
  individual_device_guest_icon: "mdi:account",
  individual_device_guest_icon_color: "var(--secondary-text-color)",
  individual_device_guest_icon_bg: "transparent",
  individual_device_guest_icon_size: 16,
  individual_device_guest_badge_size: 24,
  internet: DEFAULT_INTERNET,
  router: {
    entity: "",
    name: "",
    icon: "mdi:router-network",
    circle_size: 72,
    icon_size: 24,
    entities: {
      status: "",
      // IP Address badges (Layout > General > Show IP Addressing) -
      // WAN centers below the Internet circle (this router doubles as
      // the gateway), LAN centers below this Router circle itself.
      wan_ip: "",
      wan_ip_secondary: "",
      lan_ip: "",
      // Current throughput sensors, for the Real-time Download / Upload
      // summary items (Layout > Summary).
      download: "",
      upload: ""
    },
    ip_badge_color: "var(--blue-color)",
    ip_badge_icon_color: "var(--card-background-color)",
    colors: {
      icon: "var(--indigo-color)",
      circle: "var(--indigo-color)",
      bus_line: "var(--divider-color, #ccc)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    },
    poe: { ...DEFAULT_POE }
  },
  lan: {
    entity: "",
    icon: "mdi:lan",
    circle_size: 56,
    icon_size: 20,
    colors: {
      icon: "var(--teal-color)",
      circle: "var(--teal-color)",
      line: "var(--primary-text-color)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    }
  },
  switch: {
    entity: "",
    name: "",
    icon: "mdi:switch",
    circle_size: 60,
    icon_size: 22,
    devices_icon: "mdi:devices",
    entities: {
      connected_devices: ""
    },
    colors: {
      icon: "var(--amber-color)",
      circle: "var(--amber-color)",
      bus_line: "var(--divider-color, #ccc)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)",
      devices_circle: "var(--purple-color)",
      devices_icon: "var(--primary-color)",
      devices_offline_circle: "var(--error-color)",
      devices_offline_icon: "var(--error-color)"
    },
    poe: { ...DEFAULT_POE }
  },
  nodes: [],
  individual_devices: [],
  individual_devices_box_color: "var(--divider-color)",
  individual_devices_box_radius: "var(--ha-card-border-radius, 12px)",
  // Shows each client's name in small text directly below its circle.
  // Off by default since it noticeably increases visual density on a
  // Clients box with many entries.
  individual_devices_show_names: false,
  // "none" | "ssid" | "vlan" | "ap" | "area" - splits the Clients box
  // into labeled sub-groups instead of one flat row.
  individual_devices_group_by: "none",
  individual_devices_group_padding: 10,
  // Separate from individual_devices_box_radius so sub-group corners
  // can differ from the main box's - defaults to the same value.
  individual_devices_group_box_radius: "var(--ha-card-border-radius, 12px)",
  individual_devices_group_show_border: true,
  // Blank means "fall back to individual_devices_box_color" at render
  // time, so this stays in sync with the main box's color by default
  // until explicitly overridden.
  individual_devices_group_border_color: "",
  // Per-group color overrides, matched by exact group name (e.g.
  // "Wired", "Guest", "VLAN 20") - falls back to
  // individual_devices_group_border_color, then to
  // individual_devices_box_color, when no override matches.
  individual_devices_group_colors: [],
  // "gaps": boxes size to content, extra space goes into the gaps
  // between them (justify-content: space-between).
  // "last_fill": boxes size to content except the very last one,
  // which stretches to consume whatever space is left. Only reliable
  // when groups fit on one row - CSS can't target "last box per
  // wrapped row" dynamically, so an earlier row's trailing box won't
  // stretch if groups wrap onto multiple lines.
  // "widest_fits": whichever group has the most devices sizes to its
  // own content, and every other group equally shares whatever space
  // is left on that row. Computed per-render from actual device
  // counts, not something pure CSS can express, since "which group is
  // widest" is data-dependent.
  individual_devices_group_layout: "widest_fits",
  // Uptime Kuma / Ping / Gatus / UptimeRobot services - see DEFAULT_MONITORING.
  monitoring: DEFAULT_MONITORING,
  show_summary: true,
  // Master animation switch. Disabled by default so the card does no
  // continuous animation work unless the user explicitly opts in.
  enable_animations: false,
  min_flow_duration: 0.6,
  max_flow_duration: 6
};

// --- Helper Functions ---
// Configs saved before v3.3.0 used "billing_*" names for the Quota ring.
// Old keys are read once on load and rewritten to their "quota_*" names,
// so nothing in an existing dashboard needs editing by hand.
// Reads whichever of the three old, separate controls (compact_mode,
// diagram_scale as a number or "auto") a saved config still has and folds
// them into the one card_size choice, the first time such a config loads.
// Leaves a config that already has card_size completely alone.
function migrateCardSize(config) {
  if (!config || config.card_size !== undefined) return config;
  const next = { ...config };
  if (config.compact_mode === true) {
    next.card_size = "compact";
  } else if (config.diagram_scale === "auto") {
    next.card_size = "fit_to_width";
  } else if (typeof config.diagram_scale === "number" && config.diagram_scale !== 100) {
    next.card_size = "scaled";
  } else {
    next.card_size = "normal";
  }
  if (next.diagram_scale_value === undefined && typeof config.diagram_scale === "number") {
    next.diagram_scale_value = config.diagram_scale;
  }
  return next;
}

function migrateBillingToQuota(config) {
  if (!config) return config;
  const fix = (inet) => {
    if (!inet || typeof inet !== "object") return inet;
    const out = { ...inet };
    if (inet.entities) {
      const e = { ...inet.entities };
      if (e.billing_total !== undefined) { if (!e.quota_total) e.quota_total = e.billing_total; delete e.billing_total; }
      if (e.billing_remaining !== undefined) { if (!e.quota_remaining) e.quota_remaining = e.billing_remaining; delete e.billing_remaining; }
      out.entities = e;
    }
    if (inet.colors) {
      const c = { ...inet.colors };
      if (c.billing_progress !== undefined) { if (!c.quota_progress) c.quota_progress = c.billing_progress; delete c.billing_progress; }
      if (c.billing_remaining !== undefined) { if (!c.quota_remaining) c.quota_remaining = c.billing_remaining; delete c.billing_remaining; }
      out.colors = c;
    }
    return out;
  };
  const next = { ...config };
  if (config.internet) next.internet = fix(config.internet);
  if (config.internet_secondary) next.internet_secondary = fix(config.internet_secondary);
  return next;
}

// A secondary (backup) Internet/WAN service only exists once something is
// actually configured for it - its own entity, or any of its metric
// entities (a discovered Speedtest/ISP service may fill those without an
// Internet entity). With nothing set, the layout is exactly as it was.
function internetSecondaryEnabled(config) {
  const s = config && config.internet_secondary;
  if (!s || typeof s !== "object") return false;
  if (s.entity) return true;
  return Object.values(s.entities || {}).some(Boolean);
}

// Migrates a config from the old flat `access_points: [AP, AP, ...]`
// schema to the new `nodes: [{switch, access_points: [AP]}, ...]`
// schema. Each old AP becomes its own single-AP node, with no switch -
// this preserves the exact same rendered result as before migration.
// Safe to call on an already-migrated config (it's a no-op if `nodes`
// is already present, or if there's nothing to migrate).
function migrateAccessPointsToNodes(config) {
  if (!config) return config;
  if (config.nodes) return config;
  if (!config.access_points || !config.access_points.length) return config;
  const nodes = config.access_points.map((ap) => ({
    name: "",
    switch: null,
    access_points: [ap]
  }));
  const { access_points, ...rest } = config;
  return { ...rest, nodes };
}

// A fed switch (a Switch fed by a Node's own Switch, or by another fed
// switch) can carry its own Access Points and further fed switches, to
// any depth. Every level is normalised the same way a top-level Node's
// children are, so a config only ever needs to spell out what differs
// from the defaults.
function normalizeFedSwitch(sw) {
  const merged = deepMerge(DEFAULT_NODE_SWITCH, sw || {});
  merged.access_points = ((sw && sw.access_points) || []).map(normalizeAccessPoint);
  merged.fed_switches = ((sw && sw.fed_switches) || []).map(normalizeFedSwitch);
  if (sw && sw.homelabs) merged.homelabs = sw.homelabs.map(normalizeHomelab);
  return merged;
}

// An Access Point can feed things of its own - fed switches and Homelabs
// (and further Access Points, e.g. a wireless mesh) - through the same
// three lists a Switch has, so it is normalised the same way, recursively.
function normalizeAccessPoint(ap) {
  const merged = deepMerge(DEFAULT_ACCESS_POINT, ap || {});
  if (ap && ap.access_points) merged.access_points = ap.access_points.map(normalizeAccessPoint);
  if (ap && ap.fed_switches) merged.fed_switches = ap.fed_switches.map(normalizeFedSwitch);
  if (ap && ap.homelabs) merged.homelabs = ap.homelabs.map(normalizeHomelab);
  return merged;
}

// A Homelab server: the same shape whether it is a Node in its own right
// or a child of any Switch, with its Containers/VMs normalised too.
function normalizeHomelab(hl) {
  const merged = deepMerge(DEFAULT_HOMELAB, hl || {});
  merged.containers = ((hl && hl.containers) || []).map((c) =>
    deepMerge(DEFAULT_CONTAINER_BADGE, c)
  );
  return merged;
}

// Which Security items (VPN, Firewall, DNS Filtering, Reverse Proxy) a
// Homelab shows, out of those targeted at "homelab". A Homelab with no
// `security` list shows all of them, exactly as before per-server
// choices existed; once it has one, it shows only the items set to true
// - so different servers can run different items.
function homelabShowsSecurity(hl, item) {
  const sec = hl && hl.security;
  return sec ? sec[item] === true : true;
}

// Defense-in-depth guard for deepMerge/setPathValue below: neither
// function is reachable with an attacker-controlled path today (every
// call site passes a hardcoded string or a numeric array index, never
// user-typed text or entity-derived data), but both walk arbitrary
// object keys in the shape of a classic prototype-pollution bug, so
// skipping these three keys costs nothing and closes the door on any
// future call site that isn't so careful.
const UNSAFE_OBJECT_KEYS = new Set(["__proto__", "constructor", "prototype"]);

// Walks the whole config tree and collects every string value that
// looks like an entity id (domain.object_id), regardless of which
// field it came from. Used to build the set of entities the card
// actually needs to watch for shouldUpdate - a generic tree-walk
// rather than an explicit field-by-field list, so it never falls out
// of sync as new entity fields (badges, discovery targets, etc.) get
// added to the schema over time. False positives (a non-entity string
// that happens to match the pattern) are harmless - they just mean one
// extra, always-equal comparison; false negatives would be a real bug
// (the card silently failing to update), which this approach avoids
// by construction.
const ENTITY_ID_PATTERN = /^[a-z_]+\.[a-z0-9_]+$/;

function collectEntityIdsFromConfig(config) {
  const ids = new Set();
  function walk(value) {
    if (typeof value === "string") {
      if (ENTITY_ID_PATTERN.test(value)) ids.add(value);
    } else if (Array.isArray(value)) {
      for (const item of value) walk(item);
    } else if (value && typeof value === "object") {
      for (const v of Object.values(value)) walk(v);
    }
  }
  walk(config);
  return ids;
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source || {})) {
    if (UNSAFE_OBJECT_KEYS.has(key)) continue;
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object"
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
}

// Parsed entity states are cached by Home Assistant's individual state
// object identity. HA keeps unchanged entity state objects stable across
// top-level hass snapshots, so unchanged entities stay cached even when a
// different tracked sensor updates. WeakMap allows replaced state objects
// to be garbage-collected automatically.
const ENTITY_STATE_CACHE = new WeakMap();

function getEntityState(hass, entityId) {
  if (!hass || !entityId) return null;
  const stateObj = hass.states?.[entityId];
  if (!stateObj) return null;

  const cached = ENTITY_STATE_CACHE.get(stateObj);
  if (cached) return cached;

  const numValue = parseFloat(stateObj.state);
  const parsed = {
    stateObj,
    value: isNaN(numValue) ? null : numValue,
    display: isNaN(numValue) ? stateObj.state : formatNumber(numValue),
    unit: stateObj.attributes.unit_of_measurement || "",
    name: stateObj.attributes.friendly_name || entityId
  };
  ENTITY_STATE_CACHE.set(stateObj, parsed);
  return parsed;
}

function getCircleLabel(customName, entityState, fallback) {
  if (customName != null && customName !== "") return customName;
  if (entityState) return entityState.display || entityState.state;
  return fallback;
}

function isDeviceOnline(hass, entityId) {
  if (!hass || !entityId || !hass.states[entityId]) return false;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "on" || state === "home";
}

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Determines which Group By sub-group a Client belongs
// in. A manual group_override always wins. Otherwise: a device_tracker
// attribute of `connection: wired` always means "Wired" regardless of
// grouping mode (this matches common integrations like TP-Link Deco).
// For "vlan" mode, the group is the entity's `interface` attribute
// (the SSID/VLAN name); for "ap" mode, it's the `deco_device`
// attribute (the connected Access Point's name). Anything missing the
// relevant attribute (e.g. a binary_sensor with neither) falls into
// "Unknown" rather than being silently dropped.
// Determines which Group By sub-group a Client belongs
// in. A manual group_override always wins. Otherwise: a device_tracker
// attribute of `connection: wired` always means "Wired" regardless of
// grouping mode (this matches common integrations like TP-Link Deco).
// For "vlan" mode, the group is the entity's `interface` attribute
// (TP-Link Deco) or `essid` attribute (UniFi's SSID name) - whichever
// is present; for "ap" mode, it's the `deco_device` attribute (Deco's
// friendly AP name) or, failing that, UniFi's `ap_mac` (a MAC address
// rather than a friendly name - UniFi doesn't expose one directly, so
// this will show as a MAC unless the device's Group Override is set
// manually to a friendlier label). Anything missing the relevant
// attribute (e.g. a binary_sensor with neither) falls into "Unknown"
// rather than being silently dropped.
// Determines which Group By sub-group a Client belongs
// in. A manual group_override always wins. Otherwise: a device_tracker
// attribute of `connection: wired` always means "Wired" regardless of
// grouping mode (matches TP-Link Deco and similar integrations).
//
// - "ssid": groups by network name - TP-Link Deco's `interface`
//   attribute, or UniFi's `essid`. UniFi's `is_guest` boolean forces
//   "Guest" regardless of the actual SSID name, since a guest SSID
//   isn't necessarily named "guest".
// - "vlan": groups by VLAN - UniFi's numeric `vlan` attribute takes
//   priority whenever present, even if `is_guest` is also true (a
//   guest client on a specific VLAN groups by that VLAN, not as
//   "Guest"). Only falls back to "Guest" when there's no VLAN ID at
//   all; falls back further to TP-Link's `interface` (which has no
//   separate VLAN concept of its own).
// - "ap" ("Connected Device" in the editor): groups by whatever the
//   client is physically attached to - Deco's `deco_device` (a
//   friendly name), UniFi's/Omada's `ap_mac` for a wireless client, or
//   - for a wired one - TP-Link Omada's `switch_name`/`switch_mac`
//   (the only integration supported here that exposes which switch a
//   wired client is on at all). The config value stays "ap" for
//   backward compatibility even though the editor label no longer
//   says AP.
//
// Anything missing the relevant attribute (e.g. a binary_sensor with
// none of these) falls into "Unknown" rather than being silently
// dropped.
// Resolves the effective Home Assistant Area for an entity: the
// entity's own area_id if it's been assigned one directly (an explicit
// per-entity override, which always wins), otherwise the area_id of
// the device it belongs to - the same precedence HA's own UI uses
// everywhere else an entity's "effective area" is shown. Returns null
// (not "Unknown") when neither is set, so the caller decides the
// fallback label rather than this helper baking one in.
function getEntityAreaName(hass, entityId) {
  if (!hass || !entityId) return null;
  const entry = hass.entities?.[entityId];
  if (!entry) return null;
  const areaId = entry.area_id || (entry.device_id ? hass.devices?.[entry.device_id]?.area_id : null);
  if (!areaId) return null;
  return hass.areas?.[areaId]?.name || null;
}

function getDeviceGroupName(hass, dev, groupBy) {
  if (dev.group_override) return dev.group_override;
  if (groupBy === "none") return null;

  // Area grouping is orthogonal to connection type - a wired device
  // assigned to "Living Room" belongs in "Living Room", not lumped into
  // a single "Wired" bucket with every other wired device in the house
  // regardless of room - so this branches before the wired-override
  // check below, which every other grouping mode intentionally runs
  // through first.
  if (groupBy === "area") {
    return getEntityAreaName(hass, dev.entity) || "Unknown";
  }

  const attrs = hass?.states?.[dev.entity]?.attributes || {};

  // TP-Link Deco reports this as `connection_type` on real devices
  // (confirmed against actual entity attributes); UniFi and some other
  // integrations use the shorter `connection` - both are checked since
  // they don't collide. AsusRouter reports the literal string "Wired"
  // (capitalized, confirmed from its own const.py) rather than
  // lowercase "wired", so the comparison is case-insensitive. TP-Link
  // Omada (zachcheatham/ha-omada) exposes neither attribute at all -
  // its wired clients instead carry a `switch_mac` attribute that
  // simply doesn't exist on wireless ones (confirmed from its own
  // device_tracker.py: CONNECTED_WIRED_CLIENT_ATTRIBUTES includes
  // switch_mac/switch_port/switch_name, CONNECTED_CLIENT_ATTRIBUTES for
  // wireless clients has none of them) - presence alone is the signal.
  // "ap" mode bypasses this the same way "area" does above: a switch is
  // exactly what a wired client is attached to, so wired clients are
  // precisely the ones "ap" mode needs to keep rather than swallow into
  // one "Wired" bucket before ever reaching the branch below.
  const connectionValue = String(attrs.connection ?? attrs.connection_type ?? "").toLowerCase();
  // FRITZ!Box reports its mesh interface type as "LAN" / "WLAN" (confirmed
    // from its coordinator), so "lan" counts as wired too.
  if (groupBy !== "ap" && (connectionValue === "wired" || connectionValue === "lan" || attrs.switch_mac)) return "Wired";

  if (groupBy === "ssid") {
    if (attrs.is_guest === true) return "Guest";
    // Omada's own attribute name for this is `ssid` (confirmed from its
    // device_tracker.py CONNECTED_CLIENT_ATTRIBUTES), distinct from
    // `interface`/`essid` used elsewhere.
    const ssid = attrs.interface || attrs.essid || attrs.ssid;
    return ssid ? capitalizeFirst(ssid) : "Unknown";
  }

  if (groupBy === "vlan") {
    // Omada names this `vlan_id` on wired clients (confirmed from its
    // device_tracker.py CONNECTED_WIRED_CLIENT_ATTRIBUTES), rather than
    // the bare `vlan` other integrations use.
    const vlan = attrs.vlan ?? attrs.vlan_id;
    if (vlan != null && vlan !== "") return `VLAN ${vlan}`;
    if (attrs.is_guest === true) return "Guest";
    return attrs.interface ? capitalizeFirst(attrs.interface) : "Unknown";
  }

  if (groupBy === "ap") {
    // A wired client's switch is exactly the thing it's "connected to",
    // same idea as an AP for a wireless one - so this checks whichever
    // applies. Only TP-Link Omada exposes a switch name/MAC for wired
    // clients at all (`switch_name`, falling back to `switch_mac`,
    // confirmed from its own device_tracker.py); no other integration
    // supported here reports which switch a client is on for any
    // client, wired or not - core UniFi's own client attributes cover
    // AP/SSID/VLAN but never a switch. Everything else here (Deco's
    // `deco_device`, UniFi's/Omada's `ap_mac`) is unchanged from before.
    // FRITZ!Box trackers name the FRITZ unit a client sits behind in `connected_to`.
    return attrs.switch_name || attrs.switch_mac || attrs.deco_device || attrs.ap_mac || attrs.connected_to || "Unknown";
  }

  return "Unknown";
}

// Buckets devices into ordered {name, devices} groups: "Wired" always
// first if present, "Unknown" always last if present, everything else
// in the order its group name was first encountered.
function groupIndividualDevices(hass, devices, groupBy) {
  const order = [];
  // Null-prototype dictionary prevents special keys such as __proto__ or
  // constructor from colliding with Object.prototype if an integration
  // exposes an unusual SSID/AP/group label.
  const map = Object.create(null);
  devices.forEach((dev) => {
    const name = getDeviceGroupName(hass, dev, groupBy) || "Unknown";
    if (!map[name]) {
      map[name] = [];
      order.push(name);
    }
    map[name].push(dev);
  });
  const sortedNames = [
    ...(order.includes("Wired") ? ["Wired"] : []),
    ...order.filter((n) => n !== "Wired" && n !== "Unknown"),
    ...(order.includes("Unknown") ? ["Unknown"] : [])
  ];
  return sortedNames.map((name) => ({ name, devices: map[name] }));
}

// The integration behind an Internet speed-test entity, for the Download /
// Upload summary badges' secondary line - reusing the same label maps the
// Speedtest and ISP Auto-Discovery lists already show these integrations
// under, so the name matches what a person picked it by.
function speedSourceLabel(hass, entityId) {
  const platform = entityId ? hass?.entities?.[entityId]?.platform : null;
  if (!platform) return "";
  return SPEEDTEST_PLATFORM_LABELS[platform] || ISP_PLATFORM_LABELS[platform] || "";
}

function isEntityUnavailable(hass, entityId) {
  if (!entityId) return false;
  if (!hass || !hass.states[entityId]) return true;
  const state = String(hass.states[entityId].state).toLowerCase();
  // "offline" is what gateway/status sensors (e.g. pfSense's) report when a
  // link is down; "down" is what Uptime Kuma and UptimeRobot report - so a
  // device whose own entity happens to be one of those monitors' status
  // sensors (rather than a Monitoring service pointed AT the device) is
  // still correctly shown offline.
  if (state === "unavailable" || state === "unknown" || state === "off" || state === "not_home" || state === "offline" || state === "down") return true;
  // UniFi Device Info (unifi_mqtt) reports uptime as the state and
  // online/offline in a `status` attribute instead - recognised only by
  // that integration's own attribute set, so nothing else is affected.
  const attrs = hass.states[entityId].attributes;
  return !!(attrs && attrs.mac_address && attrs.type && attrs.status === "Off");
}

function isVpnActive(hass, entityId) {
  if (!entityId || !hass || !hass.states[entityId]) return false;
  const state = String(hass.states[entityId].state).toLowerCase();
  // "online"/"connected" cover status sensors (e.g. pfSense VPN gateways)
  // that report those words instead of a plain on/off; "up" covers
  // OPNsense's own VPN status sensors (confirmed from its own source).
  return state === "on" || state === "online" || state === "connected" || state === "up";
}

function isBackhaulWired(hass, ap) {
  // The Primary AP is the mesh's own connection point to the router/
  // switch, not a hop backhauling through another AP - always wired
  // regardless of any backhaul_type entity. This matters for
  // auto-discovered mesh masters, whose own tracker often reports a
  // wireless-looking state (e.g. Deco's master has no real backhaul,
  // so its `connection_type` attribute is empty and would otherwise
  // fall through to its home/not_home tracker state).
  if (ap.is_primary) return true;
  const entityId = ap.entities?.backhaul_type;
  if (!entityId || !hass || !hass.states[entityId]) return true;
  const stateObj = hass.states[entityId];
  // Some TP-Link Deco setups expose connection type as a
  // `connection_type` attribute directly on the unit's own tracker
  // entity (confirmed against real Deco attributes) rather than as a
  // separate sensor - check that first, then fall back to the entity's
  // own state for integrations/forks that DO use a dedicated sensor.
  const raw = stateObj.attributes?.connection_type ?? stateObj.state;
  const state = String(raw).toLowerCase();
  return state === "wired";
}

// True when an entity's own attributes mark it as connected to a guest
// network. Checks two known shapes: TP-Link Deco's "interface"
// attribute (value "guest"), and the official UniFi integration's
// "is_guest" boolean attribute (confirmed against HA core's
// CLIENT_CONNECTED_ATTRIBUTES for the unifi device_tracker - it's
// "is_guest", snake_case, not "isGuest"). Both are checked
// unconditionally since they're distinct attribute names that won't
// collide with other integrations' data.
function isGuestDevice(hass, entityId) {
  if (!entityId || !hass?.states[entityId]) return false;
  const attrs = hass.states[entityId].attributes || {};
  if (attrs.interface === "guest") return true;
  if (attrs.is_guest === true || attrs.is_guest === "true") return true;
  // AsusRouter (Vaskivskyi/ha-asusrouter) uses the shorter `guest`
  // attribute name rather than `is_guest` - confirmed against its own
  // client.py.
  if (attrs.guest === true || attrs.guest === "true") return true;
  return false;
}

function formatNumber(val) {
  if (val == null) return "-";
  if (Math.abs(val) >= 100) return val.toFixed(0);
  if (Math.abs(val) >= 10) return val.toFixed(1);
  return val.toFixed(2);
}

function roundVal(val) {
  return val == null || isNaN(val) ? "-" : String(Math.round(val));
}

// Sums PoE draw for a switch. "auto" walks hass.entities for every
// entity sharing the switch's device_id, matching on unit_of_measurement
// "W" plus "poe" appearing in the entity_id or friendly_name - this
// covers per-port PoE sensors (e.g. UniFi Insights) without the user
// listing every port. "manual" sums exactly the configured entities.
// Returns null (not 0) when there's nothing to show, so the caller can
// hide the badge entirely rather than rendering "0 W".
// Caches the (expensive) "which entities on this device qualify as PoE
// wattage sensors" registry scan, keyed by the switch/router/AP entity
// id itself. Without this, computePoeTotal re-scanned the ENTIRE
// hass.entities registry from scratch on every single render, for
// every PoE-enabled device on the card, on every hass update anywhere
// in the whole house - a real, measurable cause of dashboard slowdown
// on any non-trivial HA instance. The cache only needs to be correct
// per entity id: if the config is changed to point at a different
// entity, that's simply a different (uncached) key, so no explicit
// invalidation is needed for that case. The one edge case this
// intentionally accepts: if a NEW PoE sensor appears on the same
// device at runtime (e.g. an integration reload) without the switch
// entity id itself changing, the cached list won't pick it up until
// the dashboard is reloaded - a reasonable trade for not re-scanning
// the registry on every render.
const POE_AUTO_ENTITY_CACHE = new Map();

function computePoeTotal(hass, switchEntityId, poeConfig) {
  if (!poeConfig || poeConfig.mode === "off") return null;

  let entityIds = [];

  if (poeConfig.mode === "manual") {
    entityIds = (poeConfig.manual_entities || []).filter(Boolean);
  } else {
    if (!hass?.entities || !switchEntityId) return null;
    if (POE_AUTO_ENTITY_CACHE.has(switchEntityId)) {
      entityIds = POE_AUTO_ENTITY_CACHE.get(switchEntityId);
    } else {
      const deviceId = hass.entities[switchEntityId]?.device_id;
      if (!deviceId) return null;
      // Derive each candidate's entity_id from the hass.entities
      // dictionary KEY, not from an `entity_id` field on the value -
      // that field isn't guaranteed to exist on every registry entry
      // shape, and relying on it silently produced an empty match list
      // (and therefore a permanently missing badge) in testing. The key
      // is correct by definition regardless of the value's own shape.
      entityIds = Object.entries(hass.entities)
        .filter(([, e]) => e.device_id === deviceId)
        .map(([id]) => id)
        .filter((id) => {
          const state = hass.states[id];
          if (!state || state.attributes?.unit_of_measurement !== "W") return false;
          const haystack = `${id} ${state.attributes?.friendly_name || ""}`.toLowerCase();
          return haystack.includes("poe");
        });
      POE_AUTO_ENTITY_CACHE.set(switchEntityId, entityIds);
    }
  }

  if (!entityIds.length) return null;

  let total = 0;
  let hasValue = false;
  for (const id of entityIds) {
    const val = parseFloat(hass.states[id]?.state);
    if (isNaN(val)) continue;
    total += val;
    hasValue = true;
  }
  return hasValue ? total : null;
}

// Picks the PoE badge background: a fixed color, or the first
// ascending threshold whose up_to the total sits at or under. The
// last entry (no up_to) is the catch-all above every configured
// threshold.
// Sums PoE across every switch actually shown on the card - the
// top-level Switch (if configured) plus every Node-level Switch -
// using each switch's own `poe` config exactly as its individual
// badge would. Only switches that would actually show a badge
// (computePoeTotal returns non-null) contribute, matching "sum of the
// PoE badges shown in the diagram" rather than every switch that
// merely exists.
function computeDiagramPoeTotal(hass, config) {
  const switches = [];
  // Gate on the switch existing and having PoE enabled - NOT on its
  // own status `entity` being set. Manual-mode PoE sums a fixed list
  // of sensors and never touches the switch's own entity at all, so a
  // switch used purely to attach PoE entities (with no status entity
  // configured) is entirely valid and must still be included here,
  // exactly as its individual badge already treats it.
  if (config.switch?.poe && config.switch.poe.mode !== "off") switches.push(config.switch);
  if (config.router?.poe && config.router.poe.mode !== "off") switches.push(config.router);
  (config.nodes || []).forEach((node) => {
    if (node.switch?.poe && node.switch.poe.mode !== "off") switches.push(node.switch);
    if (node.homelab?.poe && node.homelab.poe.mode !== "off") switches.push(node.homelab);
    // Everything below a Node, at every depth: Access Points, fed switches
    // and Homelabs.
    const walk = (holder) => {
      (holder.access_points || []).forEach((ap) => {
        if (ap.poe && ap.poe.mode !== "off") switches.push(ap);
        walk(ap);
      });
      (holder.homelabs || []).forEach((hl) => {
        if (hl.poe && hl.poe.mode !== "off") switches.push(hl);
      });
      (holder.fed_switches || []).forEach((sw) => {
        if (sw.poe && sw.poe.mode !== "off") switches.push(sw);
        walk(sw);
      });
    };
    walk(node);
  });

  let total = 0;
  let hasValue = false;
  for (const sw of switches) {
    const t = computePoeTotal(hass, sw.entity, sw.poe);
    if (t != null) {
      total += t;
      hasValue = true;
    }
  }
  return hasValue ? total : null;
}

function resolvePoeColor(total, poeConfig) {
  if (poeConfig.color_mode !== "threshold") {
    return poeConfig.color || "var(--orange-color)";
  }
  const thresholds = poeConfig.thresholds || [];
  for (const t of thresholds) {
    if (t.up_to == null || total <= t.up_to) return t.color;
  }
  return thresholds[thresholds.length - 1]?.color || "var(--orange-color)";
}

// True when the total has exceeded every explicit up_to in the
// threshold list - i.e. it landed in the open-ended catch-all tier
// rather than being capped by a defined threshold. Only meaningful in
// "threshold" color mode; a cleared (null) up_to on a middle tier is
// simply excluded from the comparison rather than short-circuiting it.
function isAbovePoeTopThreshold(total, poeConfig) {
  if (!poeConfig || poeConfig.color_mode !== "threshold" || total == null) return false;
  const upTos = (poeConfig.thresholds || [])
    .map((t) => t.up_to)
    .filter((v) => v != null);
  if (!upTos.length) return false;
  return total > Math.max(...upTos);
}

// Builds the inline position style for a corner badge (Primary AP,
// VPN, Firewall, PoE), given its configured corner and how many other
// badges are already stacked in that same corner on this circle.
// stackIndex 0 sits at the normal corner position; each subsequent
// index shifts further along the circle's edge (horizontally) by
// roughly half the badge's own size, so multiple badges in the same
// corner overlap partially rather than sitting exactly on top of each
// other or fully separating into a different corner.
function badgeCornerStyle(location, stackIndex, sizePx) {
  const loc = location || "top-right";
  const vertical = loc.startsWith("bottom") ? "bottom" : "top";
  const horizontal = loc.endsWith("left") ? "left" : "right";
  const vSign = vertical === "top" ? -1 : 1;
  const hSign = horizontal === "left" ? -1 : 1;
  const shiftPx = stackIndex * Math.round((sizePx || 18) * 0.55) * hSign;
  return `position:absolute; ${vertical}:15%; ${horizontal}:8%; transform:translate(${hSign * 50}%, ${vSign * 50}%) translateX(${shiftPx}px); z-index:${3 + stackIndex};`;
}

// Positions an IP-address badge centered directly above or below its
// circle - unlike every other badge in this card (PoE, DNS, VPN,
// Firewall, Container, Primary AP star), which anchor to a CORNER via
// badgeCornerStyle and can overlap each other. IP badges never share
// space with those corner badges since they float outside the circle
// entirely, so no stacking logic is needed here.
function centeredBadgeStyle(position) {
  const gap = 4;
  const edge = position === "above" ? "bottom" : "top";
  return `position:absolute; ${edge}:calc(100% + ${gap}px); left:50%; transform:translateX(-50%); z-index:3; white-space:nowrap;`;
}

// Given a list of { key, location, visible } entries for the badges
// that could appear on one circle, returns { key: stackIndex } for
// every visible one - counting only the OTHER visible badges sharing
// the same corner that come before it in the array, so the first
// badge in a corner stays at stackIndex 0 (normal position) and later
// ones fan outward from there.
function computeBadgeStacks(items) {
  const counts = Object.create(null);
  const result = Object.create(null);
  items.forEach((item) => {
    if (!item.visible) return;
    const idx = counts[item.location] || 0;
    result[item.key] = idx;
    counts[item.location] = idx + 1;
  });
  return result;
}

function calcFlowDuration(rate, minDuration, maxDuration) {
  const clampAndQuantize = (value) => {
    const clamped = Math.max(minDuration, Math.min(maxDuration, value));
    // 100ms buckets prevent tiny sensor fluctuations from continuously
    // producing unique animation-duration values across every flow dot.
    return Math.round(clamped * 10) / 10;
  };
  if (!rate || rate <= 0) return clampAndQuantize(maxDuration);
  const duration = maxDuration - (maxDuration - minDuration) / (1 + 50 / rate);
  return clampAndQuantize(duration);
}


// --- Monitoring helpers ----------------------------------------------
const MONITOR_PLATFORMS = ["uptime_kuma", "ping", "gatus", "uptimerobot"];
const MONITOR_PLATFORM_LABELS = {
  uptime_kuma: "Uptime Kuma",
  ping: "Ping",
  gatus: "Gatus",
  uptimerobot: "UptimeRobot"
};
const MONITORED_GROUP_LABEL = "Monitored";
const MONITOR_STATES = ["up", "down", "pending", "maintenance"];
const MONITOR_STATE_LABELS = { up: "Up", down: "Down", pending: "Pending", maintenance: "Maintenance" };
// When several services share one device badge, the most serious state wins.
const MONITOR_SEVERITY = { up: 0, maintenance: 1, pending: 2, down: 3 };

// Every state word the four integrations (and the HACS variants of them)
// report, normalised onto the four states the card knows.
//   Uptime Kuma : up / down / pending / maintenance
//   UptimeRobot : up / down / seems_down / not_checked_yet / started / pause
//                 (seems_down = a check failed but isn't confirmed yet, so it
//                 reads as Pending, like Uptime Kuma's retry state)
//   Gatus       : binary sensor on/off
//   Ping        : binary sensor on/off
const MONITOR_STATE_WORDS = {
  up: new Set(["up", "on", "ok", "online", "connected", "healthy", "running", "true", "home", "operational"]),
  down: new Set(["down", "off", "offline", "disconnected", "unhealthy", "false", "not_home", "failed", "error", "problem"]),
  pending: new Set(["pending", "not_checked_yet", "seems_down", "started", "starting", "start", "checking"]),
  maintenance: new Set(["maintenance", "pause", "paused"])
};

// Compact Mode overrides render-time sizing only; see the render() swap
// below for how a card actually gets these values without its saved
// config ever being touched.
// scrollWidth already reflects whatever zoom is currently showing; dividing
// it by that zoom's fraction recovers the width the content would have at
// zoom:100%, without a separate, flicker-prone measurement pass at 100%
// before every adjustment.
function naturalWidthFromScroll(scrollWidth, currentZoomPercent) {
  const frac = (currentZoomPercent || 100) / 100;
  return frac > 0 ? scrollWidth / frac : scrollWidth;
}

// The largest zoom percentage, in `step` increments, that keeps a diagram
// of `naturalWidth` (its width at zoom:100%) inside `containerWidth` -
// clamped to [minScale, 100] and rounded DOWN so the result never ends up a
// hair too wide from the rounding itself. Never scales up past 100: this
// fits a diagram that overflows, it doesn't enlarge one that already fits.
function computeAutoScale(containerWidth, naturalWidth, minScale = 40, step = 5) {
  if (!containerWidth || !naturalWidth || naturalWidth <= 0) return 100;
  if (naturalWidth <= containerWidth) return 100;
  const raw = (containerWidth / naturalWidth) * 100;
  const stepped = Math.floor(raw / step) * step;
  return Math.max(minScale, Math.min(100, stepped));
}

function applyCompactMode(config) {
  if (!config || config.card_size !== "compact") return config;
  const c = { ...config };
  // Every size slider in Layout > Sizing and Animations, forced to that slider's own
  // minimum - "the minimum size" the person asked for, not an arbitrary
  // compact number invented separately from what the editor already allows.
  c.internet = { ...c.internet, circle_size: 40, icon_size: 12 };
  c.internet_secondary = c.internet_secondary ? { ...c.internet_secondary, circle_size: 40, icon_size: 12 } : c.internet_secondary;
  c.router = { ...c.router, circle_size: 40, icon_size: 12 };
  c.switch = { ...c.switch, circle_size: 30, icon_size: 10 };
  c.lan = { ...c.lan, circle_size: 30, icon_size: 10 };
  c.homelab_circle_size = 30;
  c.homelab_icon_size = 10;
  c.ap_circle_size = 40;
  c.ap_icon_size = 12;
  c.ap_devices_circle_size = 30;
  c.ap_devices_icon_size = 10;
  c.backhaul_icon_size = 8;
  c.individual_device_circle_size = 20;
  c.individual_device_icon_size = 10;
  c.individual_device_guest_badge_size = 12;
  c.individual_device_guest_icon_size = 8;
  c.individual_devices_group_padding = 0;
  c.badge_size = 12;
  c.badge_icon_size = 8;
  c.poe_badge_size = 10;
  c.poe_badge_font_size = 7;
  c.ap_column_gap = 8;
  // Names and IP addressing take real space (labels, badges, extra padding
  // for the row/box below them), so a compact layout hides them regardless
  // of what is otherwise configured.
  c.individual_devices_show_names = false;
  c.show_ip_addressing = false;
  c.monitoring = { ...c.monitoring, show_names: false };
  return c;
}

function normalizeMonitoring(m) {
  const merged = deepMerge(DEFAULT_MONITORING, m || {});
  merged.services = ((m && m.services) || []).map((s) => deepMerge(DEFAULT_MONITORED_SERVICE, s || {}));
  return merged;
}

// The integration a configured service belongs to: what discovery recorded,
// else the platform of its entity in the registry (a service added by hand
// from one of the four), else "" (something else entirely).
function monitorServiceSource(hass, svc) {
  if (svc && MONITOR_PLATFORMS.includes(svc.source)) return svc.source;
  const p = svc && svc.entity ? hass?.entities?.[svc.entity]?.platform : "";
  return MONITOR_PLATFORMS.includes(p) ? p : "";
}

function monitorDisplayName(hass, svc) {
  if (svc.name) return svc.name;
  return hass?.states?.[svc.entity]?.attributes?.friendly_name || svc.entity || "Service";
}

// up / down / pending / maintenance for one service.
//
// A binary_sensor with device_class "problem" is inverted (on = a
// problem): some Gatus integrations model endpoints that way, while the
// core one (and Ping, UptimeRobot) use "connectivity" where on = up.
// `unavailableAs` decides what an unavailable/unknown/missing entity - or a
// word we don't recognise - counts as, since that is usually the monitoring
// integration being unreachable rather than the service being down.
function resolveMonitorState(hass, svc, unavailableAs) {
  const fallback = unavailableAs === "down" ? "down" : "pending";
  const st = svc && svc.entity ? hass?.states?.[svc.entity] : null;
  if (!st) return fallback;
  const raw = String(st.state).trim().toLowerCase();
  if (raw === "unavailable" || raw === "unknown" || raw === "none" || raw === "") return fallback;
  if (svc.entity.startsWith("binary_sensor.")) {
    const inverted = st.attributes?.device_class === "problem";
    if (raw === "on") return inverted ? "down" : "up";
    if (raw === "off") return inverted ? "up" : "down";
  }
  for (const s of MONITOR_STATES) {
    if (MONITOR_STATE_WORDS[s].has(raw)) return s;
  }
  return fallback;
}

function worstMonitorState(states) {
  let worst = "up";
  for (const s of states) {
    if ((MONITOR_SEVERITY[s] ?? 0) > MONITOR_SEVERITY[worst]) worst = s;
  }
  return worst;
}

// Milliseconds, from the response-time sensor if one is set, else from an
// attribute on the status entity itself (the Ping integration's binary
// sensor carries its round trip time that way).
function getMonitorResponseMs(hass, svc) {
  let value = null;
  let unit = "";
  if (svc.response_entity) {
    const st = getEntityState(hass, svc.response_entity);
    if (st && st.value != null) {
      value = st.value;
      unit = String(st.unit || "").toLowerCase();
    }
  }
  if (value == null) {
    const attrs = hass?.states?.[svc.entity]?.attributes;
    if (attrs) {
      for (const key of ["round_trip_time_avg", "response_time", "response_time_ms", "latency"]) {
        const v = parseFloat(attrs[key]);
        if (!isNaN(v)) {
          value = v;
          break;
        }
      }
    }
  }
  if (value == null) return null;
  if (unit === "s") value *= 1000;
  return value;
}

// Tag names from a tags entity. The Uptime Kuma integration documents that
// "the full list of tags is available as state attributes" without spelling
// out the shape, so this accepts the plausible ones: a `tags` list of
// strings or {name,value} objects, a `tags` mapping, or (on a dedicated
// tags entity only) any other list-valued attribute.
const MONITOR_STD_ATTRS = new Set([
  "friendly_name", "icon", "device_class", "unit_of_measurement", "state_class",
  "options", "restored", "supported_features", "attribution", "entity_picture"
]);

function extractMonitorTags(stateObj, dedicated = false) {
  const attrs = stateObj?.attributes;
  if (!attrs) return [];
  const out = [];
  const push = (v) => {
    if (v == null) return;
    if (typeof v === "string") {
      out.push(v);
    } else if (typeof v === "object") {
      const name = v.name ?? v.tag ?? v.label;
      if (name != null) out.push(String(name));
      if (v.value != null && v.value !== "") {
        out.push(String(v.value));
        if (name != null) out.push(`${name}:${v.value}`);
      }
    }
  };
  const pushMap = (obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      out.push(k);
      if (typeof v === "string" && v) {
        out.push(v);
        out.push(`${k}:${v}`);
      }
    });
  };
  if (Array.isArray(attrs.tags)) {
    attrs.tags.forEach(push);
  } else if (attrs.tags && typeof attrs.tags === "object") {
    pushMap(attrs.tags);
  } else if (dedicated) {
    for (const [k, v] of Object.entries(attrs)) {
      if (MONITOR_STD_ATTRS.has(k)) continue;
      if (Array.isArray(v)) v.forEach(push);
      else if (v && typeof v === "object") pushMap(v);
    }
  }
  return out;
}

const MONITOR_TAG_EXTERNAL = /(^|[^a-z])(external|public|wan|internet|cloud|offsite|remote)([^a-z]|$)/i;
const MONITOR_TAG_INTERNAL = /(^|[^a-z])(internal|private|lan|local|intranet|onprem|on-prem)([^a-z]|$)/i;

// Gatus exposes no address and no tags, but puts its group in the entity name
// ("Core" + "Backend Service" -> "Core Backend Service"), and a group is how
// people organise things. A deliberately strict word list, since a name is
// far less reliable than a tag: "Cloud Backup" or "Remote Access" say
// nothing about where the check runs.
const MONITOR_NAME_EXTERNAL = /(^|[^a-z])(external|public|internet|wan|offsite)([^a-z]|$)/i;
const MONITOR_NAME_INTERNAL = /(^|[^a-z])(internal|private|lan|local|intranet)([^a-z]|$)/i;

function classifyMonitorName(label) {
  if (!label) return null;
  let m = String(label).match(MONITOR_NAME_EXTERNAL);
  if (m) return { scope: "external", word: m[2] };
  m = String(label).match(MONITOR_NAME_INTERNAL);
  if (m) return { scope: "internal", word: m[2] };
  return null;
}

// "internal" / "external" for a host, URL or IP; null when it can't tell.
// Private, loopback, link-local and CGNAT ranges, single-label names and
// the usual local suffixes count as internal; anything else is external.
function classifyMonitorAddress(raw) {
  if (raw == null) return null;
  let s = String(raw).trim().toLowerCase();
  if (!s || s === "none" || s === "unknown" || s === "unavailable" || s === "null") return null;
  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, "");
  s = s.replace(/^[^@/]*@/, "");
  s = s.split(/[/?#]/)[0];
  let host = s;
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    host = host.slice(1, end >= 0 ? end : undefined);
  } else if ((host.match(/:/g) || []).length === 1) {
    host = host.split(":")[0];
  }
  if (!host || /\s/.test(host)) return null;

  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const a = Number(v4[1]);
    const b2 = Number(v4[2]);
    const isPrivate =
      a === 0 || a === 10 || a === 127 ||
      (a === 172 && b2 >= 16 && b2 <= 31) ||
      (a === 192 && b2 === 168) ||
      (a === 169 && b2 === 254) ||
      (a === 100 && b2 >= 64 && b2 <= 127);
    return isPrivate ? "internal" : "external";
  }
  if (host.includes(":")) {
    return /^(::1?$|f[cd][0-9a-f]{2}:|fe[89ab][0-9a-f]:)/.test(host) ? "internal" : "external";
  }
  if (!host.includes(".")) return "internal";
  if (/\.(local|lan|home|internal|intranet|private|corp|localdomain|arpa)$/.test(host)) return "internal";
  return "external";
}

// The address a service monitors: a URL/hostname sensor's live state
// (Uptime Kuma), else an attribute on the status entity (UptimeRobot's
// `target`), else the address stored at discovery time (Ping's host).
function resolveMonitorAddress(hass, svc) {
  const blank = new Set(["", "unknown", "unavailable", "none", "null"]);
  for (const id of svc.target_entities || []) {
    const st = hass?.states?.[id];
    if (st && !blank.has(String(st.state).trim().toLowerCase())) return String(st.state);
  }
  const attrs = hass?.states?.[svc.entity]?.attributes;
  if (attrs) {
    for (const key of ["target", "url", "hostname", "host", "address"]) {
      if (attrs[key]) return String(attrs[key]);
    }
  }
  return svc.target || "";
}

// What `type: auto` resolves to right now, and why. Tags win (a person
// tagged it deliberately), then the monitored address, then Internal - the
// safe default, since it stays visible in the Clients box.
function resolveMonitorScope(hass, svc) {
  const tagEntity = svc.tags_entity ? hass?.states?.[svc.tags_entity] : null;
  const tags = tagEntity
    ? extractMonitorTags(tagEntity, true)
    : extractMonitorTags(hass?.states?.[svc.entity], false);
  for (const t of tags) {
    if (MONITOR_TAG_EXTERNAL.test(t)) return { scope: "external", reason: `tag "${t}"` };
    if (MONITOR_TAG_INTERNAL.test(t)) return { scope: "internal", reason: `tag "${t}"` };
  }
  const address = resolveMonitorAddress(hass, svc);
  const byAddress = classifyMonitorAddress(address);
  if (byAddress) return { scope: byAddress, reason: `address ${address}` };
  if (svc.source === "gatus") {
    const byName = classifyMonitorName(hass?.states?.[svc.entity]?.attributes?.friendly_name);
    if (byName) return { scope: byName.scope, reason: `name contains "${byName.word}"` };
  }
  // A cloud checker can only be watching something reachable from the internet.
  if (svc.source === "uptimerobot") return { scope: "external", reason: "UptimeRobot checks from the internet" };
  return { scope: "internal", reason: "no tag or address to go on" };
}

// The id a device is filed under when a service is assigned to it: its own
// entity, or - for a device set up without one - the first entity it does
// have, so that every configured device can still be picked and carry a badge.
function monitorDeviceKey(cfg) {
  if (!cfg) return "";
  if (cfg.entity) return cfg.entity;
  const e = cfg.entities || {};
  for (const k of ["connected_devices", "download", "upload", "ip_address", "wan_ip", "lan_ip"]) {
    if (e[k]) return e[k];
  }
  return "";
}

// Every device and client already on the card that an internal service can
// be attached to, with a kind and label for the editor's "Assign to" list.
function listMonitorAssignTargets(hass, config) {
  const out = [];
  const seen = new Set();
  const add = (cfg, kind, fallback) => {
    const id = monitorDeviceKey(cfg);
    if (!id || seen.has(id)) return;
    seen.add(id);
    out.push({
      entity: id,
      kind,
      label: cfg.name || hass?.states?.[id]?.attributes?.friendly_name || fallback || id
    });
  };
  add(config.internet, "Internet", "Internet");
  if (internetSecondaryEnabled(config)) add(config.internet_secondary, "Backup Internet", "Backup");
  add(config.router, "Router", "Router");
  add(config.lan, "LAN", "LAN");
  add(config.switch, "Core Switch", "Core Switch");
  const walk = (holder) => {
    (holder.access_points || []).forEach((ap) => {
      add(ap, "Access Point", "AP");
      walk(ap);
    });
    (holder.fed_switches || []).forEach((sw) => {
      add(sw, "Switch", "Switch");
      walk(sw);
    });
    if (holder.homelab) add(holder.homelab, "Server", "Server");
    (holder.homelabs || []).forEach((hl) => add(hl, "Server", "Server"));
  };
  (config.nodes || []).forEach((node) => {
    add(node.switch, "Switch", "Switch");
    walk(node);
  });
  (config.individual_devices || []).forEach((dev) => add(dev, "Client", "Client"));
  return out;
}

// Where every service goes, decided from live state on each render:
//   external - the External box above Internet
//   clients  - the Clients box, "Monitored" group
//   byDevice - a badge on a configured device (Map: device entity -> services)
// An "assign_to" naming a device that is no longer on the card falls back
// to Clients rather than silently dropping the service.
function buildMonitorPlan(hass, config, targetEntityIds) {
  const plan = { external: [], clients: [], byDevice: new Map() };
  const services = (config.monitoring && config.monitoring.services) || [];
  services.forEach((svc) => {
    if (!svc || !svc.entity) return;
    const scope =
      svc.type === "external" || svc.type === "internal"
        ? svc.type
        : resolveMonitorScope(hass, svc).scope;
    if (scope === "external") {
      plan.external.push(svc);
    } else if (svc.assign_to && svc.assign_to !== "clients" && targetEntityIds && targetEntityIds.has(svc.assign_to)) {
      const list = plan.byDevice.get(svc.assign_to) || [];
      list.push(svc);
      plan.byDevice.set(svc.assign_to, list);
    } else {
      plan.clients.push(svc);
    }
  });
  return plan;
}

// Internal services assigned to Clients are drawn by the ordinary Clients
// box: each becomes a client entry (tagged with the service) placed in its
// own "Monitored" sub-group whenever Group By is anything but "none".
function monitorClientDevices(plan) {
  return plan.clients.map((svc) => ({
    ...DEFAULT_INDIVIDUAL_DEVICE,
    entity: svc.entity,
    name: svc.name,
    icon: svc.icon,
    group_override: MONITORED_GROUP_LABEL,
    _monitor: svc
  }));
}


// --- Real-time speed summary items --------------------------------------
// The Primary Access Point: the first AP marked is_primary, at any depth (an
// AP can hang off a Node, a Switch, or another AP).
function findPrimaryAp(config) {
  let found = null;
  const walk = (holder) => {
    for (const ap of holder.access_points || []) {
      if (found) return;
      if (ap.is_primary) {
        found = ap;
        return;
      }
      walk(ap);
    }
    for (const sw of holder.fed_switches || []) {
      if (found) return;
      walk(sw);
    }
  };
  for (const node of config.nodes || []) {
    if (found) break;
    walk(node);
  }
  return found;
}

// Which entity feeds a Real-time Download / Upload summary item. A
// configured Router (one with a Router Entity) is authoritative: its own
// speed entity for this direction, or nothing at all if it has none - it
// never borrows the Primary Access Point's. Only when there is NO Router is
// the Primary AP's Download / Upload entity used. The item's label always
// names the device the number really came from.
// Returns { entity, kind, label } or null when nothing is available.
function resolveRealtimeSpeedSource(config, direction, hass) {
  const key = direction === "upload" ? "upload" : "download";
  const router = config.router || {};
  if (router.entity) {
    const id = router.entities && router.entities[key];
    return id
      ? {
          entity: id,
          kind: "router",
          label: router.name || hass?.states?.[router.entity]?.attributes?.friendly_name || "Router"
        }
      : null;
  }
  const ap = findPrimaryAp(config);
  if (ap && ap.entities && ap.entities[key]) {
    return {
      entity: ap.entities[key],
      kind: "ap",
      label: ap.name || hass?.states?.[ap.entity]?.attributes?.friendly_name || "Access Point"
    };
  }
  return null;
}

// Builds the parts of the diagram that depend only on configuration.
// This used to run inside render(), which meant a 1-second bandwidth
// sensor update rebuilt the entire node/AP/switch topology even though
// that topology had not changed. setConfig() now computes it once.
function buildNetworkTopology(config) {
  const columns = [];

  // Every Switch - a Node's own or a fed one - and every Access Point
  // feeds its Access Points first, then its fed switches, then its
  // Homelab servers, in that order, to any depth. Only a Homelab is
  // always the end of a branch.
  const childrenOf = (cfg) => [
    ...(cfg.access_points || []).map((ap) => ({ kind: "ap", cfg: ap })),
    ...(cfg.fed_switches || []).map((sw) => ({ kind: "fedswitch", cfg: sw })),
    ...(cfg.homelabs || []).map((hl) => ({ kind: "homelab", cfg: hl }))
  ];

  // The diagram is a set of LEAF columns; every element above a leaf is
  // a "cell" that spans the columns beneath it. Walking the tree
  // depth-first emits one column per leaf and one cell per node,
  // recording for each cell its tier (0 = a Node's own Switch/Homelab,
  // 1 = the first row of Access Points / fed switches, 2 = the row
  // below that, and so on), its parent, its position among its
  // siblings, and how many columns it spans.
  const hasClients = !!(config.individual_devices && config.individual_devices.length);
  // An Access Point only needs a line of its own when there is something for
  // it to reach: the Clients box, or a Connected Clients circle of its own.
  const needsOwnLine = (ap) => hasClients || !!(ap.entities && ap.entities.connected_devices);

  const collect = (children, tier, parentCell, nodeSwitch, chainSoFar) => {
    children.forEach((child, sibIndex) => {
      const cell = {
        tier,
        kind: child.kind,
        cfg: child.cfg,
        parent: parentCell,
        sibIndex,
        sibCount: children.length,
        firstCol: null,
        span: 1,
        childCount: 0,
        isTerminal: true
      };
      const chain = chainSoFar.slice();
      chain[tier] = cell;
      let grandChildren = child.kind !== "homelab" && child.kind !== "clientsline" ? childrenOf(child.cfg) : [];
      if (child.kind === "ap" && grandChildren.length && needsOwnLine(child.cfg)) {
        grandChildren = [...grandChildren, { kind: "clientsline", cfg: child.cfg }];
      }
      if (grandChildren.length) {
        cell.isTerminal = false;
        cell.childCount = grandChildren.length;
        const before = columns.length;
        collect(grandChildren, tier + 1, cell, nodeSwitch, chain);
        cell.firstCol = columns[before];
        cell.span = columns.length - before;
        return;
      }
      const col = {
        ap: child.kind === "ap" ? child.cfg : null,
        subSwitch: child.kind === "fedswitch" ? child.cfg : null,
        homelab: child.kind === "homelab" ? child.cfg : null,
        // Set on the invisible leaf that carries an Access Point's own line.
        ownLineOf: child.kind === "clientsline" ? child.cfg : null,
        switch: nodeSwitch,
        switchGroupStart: false,
        switchGroupSize: 0,
        termTier: tier,
        chain
      };
      cell.firstCol = col;
      columns.push(col);
    });
  };

  // Every top-level element on the bus - a plain Access Point, or a
  // Node's Switch/Homelab - is one "connector" whatever number of columns
  // sit beneath it. `topStart` marks the first column under each and
  // `topSpan` says how many it covers.
  const markTop = (from) => {
    const span = columns.length - from;
    for (let i = from; i < columns.length; i++) {
      columns[i].topStart = i === from;
      columns[i].topSpan = span;
    }
  };

  (config.nodes || []).forEach((node) => {
    const kids = childrenOf(node);
    if (node.switch && kids.length) {
      // Stands in as the parent of tier-1 cells so a Node's own Switch
      // is described the same way as any fed switch above its children.
      const nodeCell = {
        tier: 0,
        kind: "nodeswitch",
        cfg: node.switch,
        parent: null,
        sibIndex: 0,
        sibCount: 1,
        firstCol: null,
        span: 0,
        childCount: kids.length,
        isTerminal: false
      };
      const before = columns.length;
      collect(kids, 1, nodeCell, node.switch, []);
      nodeCell.firstCol = columns[before];
      nodeCell.span = columns.length - before;
      for (let i = before; i < columns.length; i++) {
        columns[i].switchGroupStart = i === before;
        // Columns spanned by this Node's Switch, i.e. every leaf below it.
        columns[i].switchGroupSize = nodeCell.span;
      }
      markTop(before);
    } else if (node.switch) {
      columns.push({ ap: null, subSwitch: null, switch: node.switch, switchGroupStart: true, switchGroupSize: 1, termTier: 0, chain: [] });
      markTop(columns.length - 1);
    } else if (node.homelab) {
      columns.push({ ap: null, subSwitch: null, switch: node.homelab, switchGroupStart: true, switchGroupSize: 1, isHomelab: true, termTier: 0, chain: [] });
      markTop(columns.length - 1);
    } else {
      // Plain Access Points straight off the bus. Each is its own
      // connector and, like a Switch, can feed devices of its own.
      (node.access_points || []).forEach((ap) => {
        const before = columns.length;
        collect([{ kind: "ap", cfg: ap }], 1, null, null, []);
        markTop(before);
      });
    }
  });

  // Tier 0 (a Node's own Switch) and tier 1 (its Access Points / fed
  // switches) always exist as grid layers; anything deeper adds one more
  // layer per level.
  const tierCount = Math.max(2, ...columns.map((c) => c.termTier + 1));

  const primaryApLayout = config.primary_ap_layout || "flat";
  let primaryAp = primaryApLayout === "tiered"
    ? (columns.find((col) => col.ap?.is_primary)?.ap || null)
    : null;

  // Only an Access Point straight off the bus can be promoted to Tiered:
  // one inside a Switch group, or hanging off another Access Point, would
  // break that group's shared grid structure.
  if (primaryAp && !columns.some((col) => col.ap === primaryAp && !col.switch && col.termTier === 1 && !col.chain[1].parent)) {
    primaryAp = null;
  }

  const primaryOriginalIndex = primaryAp
    ? columns.findIndex((col) => col.ap === primaryAp)
    : -1;
  const branchColumns = primaryAp
    ? columns.filter((col) => col.ap !== primaryAp)
    : columns;

  return {
    columns,
    branchColumns,
    tierCount,
    primaryApLayout,
    primaryAp,
    primaryOriginalIndex
  };
}


// A small set of MDI icons that are either fixed/non-configurable glyphs
// used by the card itself (the offline "X", the exclamation-mark offline
// indicator, the wired/wireless backhaul dot) or the *default* icon for a
// badge/circle that the user hasn't overridden. Rendering these as inline
// <ha-svg-icon .path=...> instead of <ha-icon icon="mdi:...."> skips the
// async icon-metadata lookup ha-icon performs per instance on first paint -
// worth doing here because a populated topology (many devices, several
// badges per node) can put 40-80 icons on screen at once. Any icon the
// user overrides with something outside this set still renders via
// <ha-icon>, so full customizability is unaffected - see renderIcon().
const ICON_PATHS = {
  "mdi:star": "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
  "mdi:vpn": "M9,5H15L12,8L9,5M10.5,14.66C10.2,15 10,15.5 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.45 13.78,14.95 13.41,14.59L14.83,13.17C15.55,13.9 16,14.9 16,16A4,4 0 0,1 12,20A4,4 0 0,1 8,16C8,14.93 8.42,13.96 9.1,13.25L9.09,13.24L16.17,6.17V6.17C16.89,5.45 17.89,5 19,5A4,4 0 0,1 23,9A4,4 0 0,1 19,13C17.9,13 16.9,12.55 16.17,11.83L17.59,10.41C17.95,10.78 18.45,11 19,11A2,2 0 0,0 21,9A2,2 0 0,0 19,7C18.45,7 17.95,7.22 17.59,7.59L10.5,14.66M6.41,7.59C6.05,7.22 5.55,7 5,7A2,2 0 0,0 3,9A2,2 0 0,0 5,11C5.55,11 6.05,10.78 6.41,10.41L7.83,11.83C7.1,12.55 6.1,13 5,13A4,4 0 0,1 1,9A4,4 0 0,1 5,5C6.11,5 7.11,5.45 7.83,6.17V6.17L10.59,8.93L9.17,10.35L6.41,7.59Z",
  "mdi:wall-fire": "M22.14 15.34L22.12 15.35C22.35 15.63 22.55 15.94 22.7 16.27L22.79 16.46C23.5 18.15 23 20.1 21.69 21.32C20.5 22.41 18.84 22.7 17.3 22.5C15.84 22.32 14.5 21.4 13.73 20.13C13.5 19.74 13.3 19.3 13.2 18.85C13.07 18.5 13.03 18.12 13 17.75C12.91 16.15 13.55 14.45 14.76 13.45C14.21 14.66 14.34 16.17 15.15 17.22L15.26 17.35C15.4 17.47 15.57 17.5 15.73 17.44C15.88 17.38 16 17.23 16 17.07L15.93 16.83C15.05 14.5 15.79 11.8 17.66 10.27C18.17 9.85 18.8 9.47 19.46 9.3C18.78 10.66 19 12.44 20.09 13.5C20.55 14 21.11 14.29 21.58 14.73L22.14 15.34M19.86 20L19.85 19.97C20.3 19.58 20.55 18.91 20.53 18.31L20.5 18C20.3 17 19.43 16.66 18.87 15.93L18.44 15.15C18.22 15.65 18.2 16.12 18.29 16.66C18.39 17.23 18.61 17.72 18.5 18.31C18.34 18.96 17.83 19.61 16.94 19.82C17.44 20.31 18.25 20.7 19.06 20.42C19.32 20.35 19.65 20.16 19.86 20M3 16H11.06L11 17C11 18.41 11.36 19.73 12 20.88V21H3V16M2 10H8V15H2V10M9 10H15V10.07C13.17 11.13 11.79 12.9 11.25 15H9V10M3 4H11V9H3V4M12 4H21V9H12V4Z",
  "mdi:lightning-bolt": "M11 15H6L13 1V9H18L11 23V15Z",
  "mdi:shield-check": "M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z",
  "mdi:server-network": "M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z",
  "mdi:docker": "M21.81 10.25C21.75 10.21 21.25 9.82 20.17 9.82C19.89 9.82 19.61 9.85 19.33 9.9C19.12 8.5 17.95 7.79 17.9 7.76L17.61 7.59L17.43 7.86C17.19 8.22 17 8.63 16.92 9.05C16.72 9.85 16.84 10.61 17.25 11.26C16.76 11.54 15.96 11.61 15.79 11.61H2.62C2.28 11.61 2 11.89 2 12.24C2 13.39 2.18 14.54 2.58 15.62C3.03 16.81 3.71 17.69 4.58 18.23C5.56 18.83 7.17 19.17 9 19.17C9.79 19.17 10.61 19.1 11.42 18.95C12.54 18.75 13.62 18.36 14.61 17.79C15.43 17.32 16.16 16.72 16.78 16C17.83 14.83 18.45 13.5 18.9 12.35H19.09C20.23 12.35 20.94 11.89 21.33 11.5C21.59 11.26 21.78 10.97 21.92 10.63L22 10.39L21.81 10.25M3.85 11.24H5.61C5.69 11.24 5.77 11.17 5.77 11.08V9.5C5.77 9.42 5.7 9.34 5.61 9.34H3.85C3.76 9.34 3.69 9.41 3.69 9.5V11.08C3.7 11.17 3.76 11.24 3.85 11.24M6.28 11.24H8.04C8.12 11.24 8.2 11.17 8.2 11.08V9.5C8.2 9.42 8.13 9.34 8.04 9.34H6.28C6.19 9.34 6.12 9.41 6.12 9.5V11.08C6.13 11.17 6.19 11.24 6.28 11.24M8.75 11.24H10.5C10.6 11.24 10.67 11.17 10.67 11.08V9.5C10.67 9.42 10.61 9.34 10.5 9.34H8.75C8.67 9.34 8.6 9.41 8.6 9.5V11.08C8.6 11.17 8.66 11.24 8.75 11.24M11.19 11.24H12.96C13.04 11.24 13.11 11.17 13.11 11.08V9.5C13.11 9.42 13.05 9.34 12.96 9.34H11.19C11.11 9.34 11.04 9.41 11.04 9.5V11.08C11.04 11.17 11.11 11.24 11.19 11.24M6.28 9H8.04C8.12 9 8.2 8.91 8.2 8.82V7.25C8.2 7.16 8.13 7.09 8.04 7.09H6.28C6.19 7.09 6.12 7.15 6.12 7.25V8.82C6.13 8.91 6.19 9 6.28 9M8.75 9H10.5C10.6 9 10.67 8.91 10.67 8.82V7.25C10.67 7.16 10.61 7.09 10.5 7.09H8.75C8.67 7.09 8.6 7.15 8.6 7.25V8.82C8.6 8.91 8.66 9 8.75 9M11.19 9H12.96C13.04 9 13.11 8.91 13.11 8.82V7.25C13.11 7.16 13.04 7.09 12.96 7.09H11.19C11.11 7.09 11.04 7.15 11.04 7.25V8.82C11.04 8.91 11.11 9 11.19 9M11.19 6.72H12.96C13.04 6.72 13.11 6.65 13.11 6.56V5C13.11 4.9 13.04 4.83 12.96 4.83H11.19C11.11 4.83 11.04 4.89 11.04 5V6.56C11.04 6.64 11.11 6.72 11.19 6.72M13.65 11.24H15.41C15.5 11.24 15.57 11.17 15.57 11.08V9.5C15.57 9.42 15.5 9.34 15.41 9.34H13.65C13.57 9.34 13.5 9.41 13.5 9.5V11.08C13.5 11.17 13.57 11.24 13.65 11.24",
  "mdi:devices": "M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z",
  "mdi:close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  "mdi:exclamation-thick": "M10 3H14V14H10V3M10 21V17H14V21H10Z",
  "mdi:web": "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  "mdi:router-network": "M5 9C3.9 9 3 9.9 3 11V15C3 16.11 3.9 17 5 17H11V19H10C9.45 19 9 19.45 9 20H2V22H9C9 22.55 9.45 23 10 23H14C14.55 23 15 22.55 15 22H22V20H15C15 19.45 14.55 19 14 19H13V17H19C20.11 17 21 16.11 21 15V11C21 9.9 20.11 9 19 9H5M6 12H8V14H6V12M9.5 12H11.5V14H9.5V12M13 12H15V14H13V12Z",
  "mdi:lan": "M10,2C8.89,2 8,2.89 8,4V7C8,8.11 8.89,9 10,9H11V11H2V13H6V15H5C3.89,15 3,15.89 3,17V20C3,21.11 3.89,22 5,22H9C10.11,22 11,21.11 11,20V17C11,15.89 10.11,15 9,15H8V13H16V15H15C13.89,15 13,15.89 13,17V20C13,21.11 13.89,22 15,22H19C20.11,22 21,21.11 21,20V17C21,15.89 20.11,15 19,15H18V13H22V11H13V9H14C15.11,9 16,8.11 16,7V4C16,2.89 15.11,2 14,2H10M10,4H14V7H10V4M5,17H9V20H5V17M15,17H19V20H15V17Z",
  "mdi:switch": "M13,18H14A1,1 0 0,1 15,19H22V21H15A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21H2V19H9A1,1 0 0,1 10,18H11V16H8A1,1 0 0,1 7,15V3A1,1 0 0,1 8,2H16A1,1 0 0,1 17,3V15A1,1 0 0,1 16,16H13V18M13,6H14V4H13V6M9,4V6H11V4H9M9,8V10H11V8H9M9,12V14H11V12H9Z",
  "mdi:wifi": "M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z",
  "mdi:ethernet": "M7,15H9V18H11V15H13V18H15V15H17V18H19V9H15V6H9V9H5V18H7V15M4.38,3H19.63C20.94,3 22,4.06 22,5.38V19.63A2.37,2.37 0 0,1 19.63,22H4.38C3.06,22 2,20.94 2,19.63V5.38C2,4.06 3.06,3 4.38,3Z",
  "mdi:speedometer": "M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z",
  "mdi:download": "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z",
  "mdi:upload": "M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z",
  "mdi:account-question": "M13,8A4,4 0 0,1 9,12A4,4 0 0,1 5,8A4,4 0 0,1 9,4A4,4 0 0,1 13,8M17,18V20H1V18C1,15.79 4.58,14 9,14C13.42,14 17,15.79 17,18M20.5,14.5V16H19V14.5H20.5M18.5,9.5H17V9A3,3 0 0,1 20,6A3,3 0 0,1 23,9C23,9.97 22.5,10.88 21.71,11.41L21.41,11.6C20.84,12 20.5,12.61 20.5,13.3V13.5H19V13.3C19,12.11 19.6,11 20.59,10.35L20.88,10.16C21.27,9.9 21.5,9.47 21.5,9A1.5,1.5 0 0,0 20,7.5A1.5,1.5 0 0,0 18.5,9V9.5Z",
  "mdi:server": "M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z"
};

// Renders `name` as a lightweight <ha-svg-icon> (a raw <svg><path>, no
// lookup) when it's one of the fixed/default icons above; otherwise falls
// back to <ha-icon icon="..."> since an arbitrary user-configured icon
// string can't be resolved to a path at build time. `styleAttr` and
// `klass` are passed straight through as the `style`/`class` attributes,
// so call sites keep whatever sizing/coloring/pulse-class logic they had.
function renderIcon(name, styleAttr = "", klass = "") {
  const path = ICON_PATHS[name];
  return path
    ? b`<ha-svg-icon class="${klass}" .path=${path} style="${styleAttr}"></ha-svg-icon>`
    : b`<ha-icon class="${klass}" .icon=${name} style="${styleAttr}"></ha-icon>`;
}

// --- Main Card Component ---

// --- Editor-only helpers (merged in from network-flow-card-editor.js) ---
// The editor used to be a separate lazily-loaded file. HACS's plugin
// downloader for a non-zip release only fetches the single .js file
// named in hacs.json's `filename`, not every .js file in the release,
// so a second file never actually reached most installs - this was a
// real, confirmed-in-production bug, not a theoretical one. Everything
// below is unique to the editor (auto-discovery scanners, the page
// menu, a couple of small form helpers); shared logic (DEFAULT_CONFIG,
// deepMerge, getDeviceGroupName, etc.) stays defined exactly once above,
// using this file's copy - the editor's own copy of a few of these had
// quietly drifted out of date (missing the Device Area grouping and
// Omada attribute support added elsewhere in this file) before this merge.

function setPathValue(obj, path, value) {
  const keys = path.split(".");
  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (UNSAFE_OBJECT_KEYS.has(key)) return newObj;
    const nextKey = keys[i + 1];
    const isNextKeyNum = !isNaN(parseInt(nextKey, 10));

    if (Array.isArray(current[key])) {
      current[key] = [...current[key]];
    } else if (typeof current[key] === "object" && current[key] !== null) {
      current[key] = { ...current[key] };
    } else {
      current[key] = isNextKeyNum ? [] : {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (UNSAFE_OBJECT_KEYS.has(lastKey)) return newObj;
  current[lastKey] = value;
  return newObj;
}

// Parsed entity states are cached by Home Assistant's individual state
// object identity. HA keeps unchanged entity state objects stable across
// top-level hass snapshots, so unchanged entities stay cached even when a
// different tracked sensor updates. WeakMap allows replaced state objects
// to be garbage-collected automatically.

const TPLINK_PLATFORMS = ["tplink_deco", "tplink_router"];

function tplinkBuildDeviceEntityMap(hass) {
  const map = Object.create(null);
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (!entry?.device_id) continue;
    (map[entry.device_id] ||= []).push(entityId);
  }
  return map;
}

function tplinkIsDecoUnit(hass, entityId) {
  const attrs = hass.states?.[entityId]?.attributes || {};
  return attrs.device_type === "deco";
}

function tplinkIsDecoMaster(hass, entityId) {
  const attrs = hass.states?.[entityId]?.attributes || {};
  return attrs.master === true || attrs.master === "true";
}

function tplinkCollectEntities(hass, platforms) {
  const out = [];
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (!platforms.includes(entry.platform)) continue;
    out.push({ entityId, deviceId: entry.device_id, domain: entityId.split(".")[0], platform: entry.platform });
  }
  return out;
}

// Finds a sibling entity on the same device matching one of the given
// suffixes - checked first against the registry's translation_key
// (stable, integration-defined) and falling back to the formatted
// entity_id's own suffix (which can drift if the user renamed things,
// but still works out of the box for most installs). Skips anything
// without a live state, since several TP-Link Deco forks ship their
// backhaul-type/speed sensors DISABLED by default - matching a
// disabled entity would wire up a field that silently shows nothing
// until the user finds and enables it by hand.
function tplinkFindSibling(hass, entityIds, suffixes) {
  const isLive = (id) => !!hass.states?.[id];
  for (const eid of entityIds) {
    const key = hass.entities?.[eid]?.translation_key;
    if (key && suffixes.includes(key) && isLive(eid)) return eid;
  }
  for (const eid of entityIds) {
    if (suffixes.some((s) => eid.endsWith(s)) && isLive(eid)) return eid;
  }
  return "";
}

function scanTplinkDevices(hass) {
  if (!hass?.entities || !hass?.devices) return { routerCandidates: [], nodes: [], individualDevices: [] };

  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const all = tplinkCollectEntities(hass, TPLINK_PLATFORMS);
  const trackers = all.filter((e) => e.domain === "device_tracker");

  // Every Deco mesh unit's own tracker (per-entity attribute check -
  // deliberately NOT grouped by device_id, since whether a client's
  // tracker shares a device_id with its connecting Deco unit varies by
  // integration version/fork; checking the entity's own attributes
  // works regardless of how devices are grouped).
  const decoUnitTrackers = trackers.filter((e) => e.platform === "tplink_deco" && tplinkIsDecoUnit(hass, e.entityId));

  // TP-Link Router only ever represents ONE physical router, and a
  // router doesn't track its own presence as a device_tracker - every
  // device_tracker entity on this platform is a client, so the router
  // itself is whichever OTHER entity (sensor/binary_sensor/button/etc)
  // shares that platform.
  const routerNonTrackerEntities = all.filter((e) => e.platform === "tplink_router" && e.domain !== "device_tracker");
  const routerDeviceId = routerNonTrackerEntities[0]?.deviceId || null;

  // --- Router / Gateway candidates: every plausible candidate is
  // returned rather than silently picking one - a Deco master and a
  // TP-Link Router can both legitimately exist at once (e.g. a TP-Link
  // Router acting as modem/gateway with a Deco mesh riding behind it),
  // and there's no reliable way to know which one the user actually
  // wants without asking. The caller presents these and lets the user
  // choose.
  const routerCandidates = [];
  const decoMasterTracker = decoUnitTrackers.find((e) => tplinkIsDecoMaster(hass, e.entityId));
  if (decoMasterTracker) {
    routerCandidates.push({
      entity: decoMasterTracker.entityId,
      deviceId: decoMasterTracker.deviceId,
      name: hass.states[decoMasterTracker.entityId]?.attributes?.friendly_name || "",
      source: "tplink_deco",
      // Deco doesn't distinguish WAN vs LAN the way a traditional
      // router does, but the master's own tracker carries its LAN-side
      // management address as an `ip` attribute (confirmed against
      // real Deco entities) - that's the closest equivalent to a LAN
      // IP this integration exposes, so wanIpEntity is left blank
      // rather than guessed.
      lanIpEntity: decoMasterTracker.entityId
    });
  }
  if (routerDeviceId) {
    // Confirmed against sensor.py: "Connection Type" (key `conn_type`,
    // object_id `connection_type`) is the preferred Router entity, and
    // "Total wired clients" (key `wired_clients_total`, object_id
    // `total_wired_clients`) is the preferred LAN Connected Clients
    // entity - both in the integration's base sensor set unconditionally
    // (unlike the LTE/VPN/serving-cell sensors, which only appear on
    // matching hardware), so both are present on every install. Buttons
    // are excluded from the router-entity fallback entirely - a
    // button's state reflects when it was last pressed, not the
    // router's reachability, so using one here would make the Router
    // node look permanently offline.
    const onDevice = all.filter((e) => e.deviceId === routerDeviceId && e.domain !== "button");
    const preferred = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("connection_type"));
    const statusLike = onDevice.find((e) => /status|online|connection/.test(e.entityId));
    const anySensor = onDevice.find((e) => e.domain === "sensor");
    const chosen = preferred || statusLike || anySensor || onDevice[0];
    const lanCandidate = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("total_wired_clients"));
    // "WAN IPv4 Address" / "LAN IPv4 Address" (keys `wan_ipv4_addr` /
    // `lan_ipv4_addr`) - confirmed from sensor.py, enabled by default,
    // object IDs slugified from their names same as everything else on
    // this integration.
    const wanIpCandidate = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("wan_ipv4_address"));
    const lanIpCandidate = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("lan_ipv4_address"));
    if (chosen) {
      routerCandidates.push({
        entity: chosen.entityId,
        deviceId: routerDeviceId,
        name: hass.devices[routerDeviceId]?.name_by_user || hass.devices[routerDeviceId]?.name || "",
        source: "tplink_router",
        lanEntity: lanCandidate?.entityId || "",
        wanIpEntity: wanIpCandidate?.entityId || "",
        lanIpEntity: lanIpCandidate?.entityId || ""
      });
    }
  }

  // --- Node candidates: every Deco unit, master included - if the
  // master ends up used as the Router, the usual "already added" dedupe
  // (which also checks config.router.entity) grays it out here rather
  // than hiding it outright, so the user can still choose to add it as
  // a Node too if they'd rather represent it that way instead. ---
  const nodes = decoUnitTrackers
    .map((e) => {
      const siblings = e.deviceId ? deviceEntityMap[e.deviceId] || [] : [];
      // Suffixes confirmed straight from amosyuen/ha-tplink-deco's own
      // sensor.py: its "Backhaul type"/"Backhaul speed" diagnostic
      // sensors are DISABLED by default (isLive skips these until the
      // user enables them), while its per-deco "<name> Down"/"<name>
      // Up" throughput sensors and "Connected clients" count ARE
      // enabled by default. Object IDs are slugified from the entity's
      // NAME, not its `key`, hence "backhaul_type" (not
      // "connection_type") and "_down"/"_up" (not "download_speed"/
      // "upload_speed") - a mismatch that silently produced empty
      // discovery results before. Older attribute-only suffixes are
      // kept as a fallback for other forks/versions.
      const backhaulFromSibling = tplinkFindSibling(hass, siblings, ["backhaul_type", "connection_type", "connection"]);
      return {
        deviceId: e.deviceId,
        entity: e.entityId,
        name: hass.states[e.entityId]?.attributes?.friendly_name || "",
        isMaster: tplinkIsDecoMaster(hass, e.entityId),
        // Falls back to the unit's own tracker entity when there's no
        // separate sibling sensor (or it's disabled) - its
        // `connection_type` attribute (confirmed present on real Deco
        // trackers) works directly since isBackhaulWired checks
        // attributes before raw state.
        backhaulType: backhaulFromSibling || e.entityId,
        backhaulSpeed: tplinkFindSibling(hass, siblings, ["backhaul_speed"]),
        download: tplinkFindSibling(hass, siblings, ["_down", "download_speed"]),
        upload: tplinkFindSibling(hass, siblings, ["_up", "upload_speed"]),
        connectedDevices: tplinkFindSibling(hass, siblings, [
          "connected_clients",
          "client_count",
          "connected_devices",
          "clients"
        ]),
        // Same self-referencing pattern as backhaulType - the unit's
        // own tracker carries its address as an `ip` attribute
        // (confirmed against real Deco entities), which _renderIpBadge
        // already knows to check before falling back to raw state.
        ipAddress: e.entityId
      };
    });

  // --- Individual device candidates: every device_tracker on these
  // platforms that ISN'T itself a Deco mesh unit (and actually has a
  // live state - a disabled entity would otherwise show as a phantom
  // "always offline" device once added) ---
  const individualDevices = trackers
    .filter((e) => hass.states?.[e.entityId] && !(e.platform === "tplink_deco" && tplinkIsDecoUnit(hass, e.entityId)))
    .map((e) => ({
      entity: e.entityId,
      name: hass.states[e.entityId]?.attributes?.friendly_name || e.entityId,
      source: e.platform
    }));

  return { routerCandidates, nodes, individualDevices };
}

// --- Speedtest Auto-Discovery ---------------------------------------
// Looks across five speed-test integrations: the official core
// "Speedtest.net" (platform `speedtestdotnet` - ping/download/upload
// only, no jitter or ISP), the community "Ookla Speedtest" (platform
// `ookla_speedtest` - adds jitter and ISP), "Cloudflare Speed Test"
// (platform `cloudflare_speed_test` - reports latency as
// translation_key "latency" rather than "ping", and its closest
// single-number download/upload equivalent is the "90th percentile"
// sensor rather than a plain "download"/"upload" one), "LibreSpeed"
// (platform `librespeed` - download/upload/ping/jitter match the same
// translation_keys as Speedtest.net, no ISP sensor at all), and
// "Fast.com" (platform `fastdotcom` - ONE sensor, translation_key
// "download", and nothing else at all: no ping, jitter, upload, or ISP,
// since fast.com only ever measures download; its manifest also limits
// Home Assistant to a single Fast.com service, unlike the other four).
// Field names confirmed straight from each integration's own
// sensor.py/const.py. Returns every service found across all five as a
// separate candidate - a user might have more than one configured - so
// the editor presents all of them and lets the person choose rather
// than one being silently preferred.
// Reuses the same device-sibling lookup helpers as the TP-Link scan
// above (tplinkBuildDeviceEntityMap/tplinkFindSibling) - they're
// generic despite the name, just introduced alongside that feature
// first.
const SPEEDTEST_PLATFORMS = ["speedtestdotnet", "ookla_speedtest", "cloudflare_speed_test", "librespeed", "fastdotcom", "opnsense"];
const SPEEDTEST_FIELD_SUFFIXES = {
  ping: ["ping", "latency"],
  jitter: ["jitter"],
  download: ["download", "90th_percentile_down"],
  upload: ["upload", "90th_percentile_up"],
  isp: ["isp"]
};
const SPEEDTEST_PLATFORM_LABELS = {
  speedtestdotnet: "Speedtest.net",
  ookla_speedtest: "Ookla Speedtest",
  cloudflare_speed_test: "Cloudflare Speed Test",
  librespeed: "LibreSpeed",
  fastdotcom: "Fast.com",
  opnsense: "OPNsense (built-in)"
};

// Buckets a list of entity IDs by whichever HA device they belong to,
// so an integration with several independent services/instances (e.g.
// several Aussie Broadband services, or two separate Speedtest set
// ups) surfaces as separate candidates instead of one merged blob.
// Deviceless entities (no device_id) each become their own singleton
// group rather than being merged together, since they aren't
// necessarily related to each other.
// Compares a candidate's proposed field values against whatever is
// already configured, returning the list of field names that would
// actually CHANGE (both sides non-blank and different) - used to ask
// "overwrite?" only when there's a genuine conflict, never when a
// field is simply being filled in for the first time.
function findFieldConflicts(existingFields, incomingFields) {
  const conflicts = [];
  for (const [key, incoming] of Object.entries(incomingFields)) {
    const existing = existingFields[key];
    if (incoming && existing && existing !== incoming) conflicts.push(key);
  }
  return conflicts;
}

function groupEntitiesByDevice(hass, entityIds) {
  const groups = Object.create(null);
  const order = [];
  for (const eid of entityIds) {
    const deviceId = hass.entities?.[eid]?.device_id || null;
    const key = deviceId || `__deviceless__:${eid}`;
    if (!groups[key]) {
      groups[key] = { deviceId, entityIds: [] };
      order.push(key);
    }
    groups[key].entityIds.push(eid);
  }
  return order.map((key) => ({
    deviceId: groups[key].deviceId,
    entityIds: groups[key].entityIds,
    name: groups[key].deviceId
      ? hass.devices?.[groups[key].deviceId]?.name_by_user || hass.devices?.[groups[key].deviceId]?.name || ""
      : ""
  }));
}

function scanSpeedtestIntegration(hass) {
  if (!hass?.entities) return [];

  const byPlatform = Object.fromEntries(SPEEDTEST_PLATFORMS.map((p) => [p, []]));
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (SPEEDTEST_PLATFORMS.includes(entry.platform) && entityId.startsWith("sensor.")) byPlatform[entry.platform].push(entityId);
  }

  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const services = [];

  for (const platform of SPEEDTEST_PLATFORMS) {
    for (const group of groupEntitiesByDevice(hass, byPlatform[platform])) {
      const siblings = group.deviceId ? deviceEntityMap[group.deviceId] || [] : group.entityIds;
      const pool = [...new Set([...group.entityIds, ...siblings])];
      const find = (suffixes) => tplinkFindSibling(hass, pool, suffixes);
      const ispEntity = find(SPEEDTEST_FIELD_SUFFIXES.isp);

      services.push({
        deviceId: group.deviceId,
        platform,
        name: group.name || SPEEDTEST_PLATFORM_LABELS[platform],
        ping: find(SPEEDTEST_FIELD_SUFFIXES.ping),
        jitter: find(SPEEDTEST_FIELD_SUFFIXES.jitter),
        download: find(SPEEDTEST_FIELD_SUFFIXES.download),
        upload: find(SPEEDTEST_FIELD_SUFFIXES.upload),
        isp: ispEntity ? hass.states[ispEntity]?.state || "" : ""
      });
    }
  }

  return services;
}

// --- ISP Auto-Discovery (quota / usage / connectivity) ------------
// Looks for three ISP account integrations: Aussie Broadband
// (platform `aussie_broadband`), Starlink (platform `starlink`), and
// Start.ca (platform `startca`). Returns every SERVICE found across
// all three as a separate candidate rather than picking one - Aussie
// Broadband in particular commonly has several services under one
// account (each its own HA device, e.g. "NBN: 39 Ultimo St..."), and
// there's no way to know which address/line the person actually wants
// without asking. Field names below are confirmed straight from each
// integration's own source in home-assistant/core (Aussie Broadband's
// sensor.py, Starlink's sensor.py/binary_sensor.py) plus Start.ca's
// documented sensor list, as of the versions checked - a future
// upstream rename would need a matching update here.
//
// Aussie Broadband: translation_key "billing_cycle_length" (days in
// the cycle), "billing_cycle_remaining" (days left), "downloaded" /
// "uploaded" (cycle data usage, resets each period).
// Starlink: translation_key "download" / "upload" (cumulative session
// usage since HA last restarted - NOT quota-cycle data, since
// Starlink doesn't expose one; treat as an approximation). Its
// "Connected" sensor is a binary_sensor with device_class
// "connectivity" and no translation_key of its own, so it's matched
// by device_class rather than name/key - the only reliable signal
// since its exact entity_id depends on how HA names an entity with no
// explicit translation_key.
// Start.ca: legacy YAML platform with no translation_key at all - its
// sensors are named from a plain `name=` string ("Total Download",
// "Remaining", etc), matched below by a plain substring against the
// slugified object_id.
const ISP_PLATFORMS = ["aussie_broadband", "starlink", "startca"];
const ISP_PLATFORM_LABELS = { aussie_broadband: "Aussie Broadband", starlink: "Starlink", startca: "Start.ca", fritz: "FRITZ!Box (WAN)", pfsense: "pfSense (gateway)" };
const ISP_FIELD_HINTS = {
  quota_total: ["billing_cycle_length", "cycle_length", "billing_length", "plan_length", "total_bandwidth", "limit"],
  quota_remaining: ["billing_cycle_remaining", "days_remaining", "cycle_remaining", "billing_remaining", "used_remaining", "remaining"],
  total_download: ["total_download", "downloaded", "download", "used_download"],
  total_upload: ["total_upload", "uploaded", "upload", "used_upload"]
};

// Looser than tplinkFindSibling: matches by translation_key exact
// match OR a plain substring anywhere in the entity_id's object_id.
// `preferDomain`, when given, searches only that domain first
// (falling back to the full pool if nothing matches).
function ispFindField(hass, entityIds, hints, { preferDomain } = {}) {
  const scoped = preferDomain ? entityIds.filter((id) => id.startsWith(`${preferDomain}.`)) : [];
  const pools = scoped.length ? [scoped, entityIds] : [entityIds];

  for (const pool of pools) {
    for (const eid of pool) {
      const key = hass.entities?.[eid]?.translation_key;
      if (key && hints.includes(key) && hass.states?.[eid]) return eid;
    }
    for (const eid of pool) {
      const objectId = eid.split(".")[1] || "";
      if (hints.some((h) => objectId.includes(h)) && hass.states?.[eid]) return eid;
    }
  }
  return "";
}

// Starlink's "Connected" sensor carries no translation_key, so name/
// suffix matching can't reliably find it - its device_class
// ("connectivity", confirmed in Starlink's own binary_sensor.py) is
// the one guaranteed signal regardless of how HA ends up naming the
// entity.
function ispFindConnected(hass, entityIds) {
  for (const eid of entityIds) {
    if (!eid.startsWith("binary_sensor.")) continue;
    if (hass.states?.[eid]?.attributes?.device_class === "connectivity") return eid;
  }
  return ispFindField(hass, entityIds, ["connected", "connection", "online"], { preferDomain: "binary_sensor" });
}

function scanIspIntegration(hass) {
  if (!hass?.entities) return [];

  const byPlatform = Object.create(null);
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (ISP_PLATFORMS.includes(entry.platform)) (byPlatform[entry.platform] ||= []).push(entityId);
  }

  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const services = [];

  for (const platform of ISP_PLATFORMS) {
    for (const group of groupEntitiesByDevice(hass, byPlatform[platform] || [])) {
      const siblings = group.deviceId ? deviceEntityMap[group.deviceId] || [] : group.entityIds;
      const pool = [...new Set([...group.entityIds, ...siblings])];
      const connectedEntity = ispFindConnected(hass, pool);

      services.push({
        deviceId: group.deviceId,
        platform,
        name: group.name || ISP_PLATFORM_LABELS[platform],
        connected: connectedEntity,
        quotaTotal: ispFindField(hass, pool, ISP_FIELD_HINTS.quota_total),
        quotaRemaining: ispFindField(hass, pool, ISP_FIELD_HINTS.quota_remaining),
        totalDownload: ispFindField(hass, pool, ISP_FIELD_HINTS.total_download),
        totalUpload: ispFindField(hass, pool, ISP_FIELD_HINTS.total_upload)
      });
    }
  }

  // FRITZ!Box gateways: offered as Internet candidates too (WAN
  // connectivity only - it has no quota/usage sensors to apply).
  services.push(...scanFritzIntegration(hass).wanServices);
  // pfSense gateways: status + delay (Ping) + stddev (Jitter).
  services.push(...scanPfsenseIntegration(hass).wanServices);

  return services;
}

// --- AdGuard Home Auto-Discovery (DNS Filtering) --------------------
// Confirmed straight from home-assistant/core's adguard/sensor.py: the
// "queries blocked" sensor has translation_key "dns_queries_blocked"
// (key `blocked_filtering`) - exactly the numeric pill the card's DNS
// Filtering badge is built around. "dns_queries" (total, not blocked)
// is kept as a secondary reference only, never applied automatically -
// the badge is specifically about blocking, so the blocked-count
// sensor is what dns_entity should point at. Grouped by device since a
// setup can run more than one AdGuard Home instance (e.g. a primary
// and a secondary/failover DNS server).
const ADGUARD_PLATFORM = "adguard";

function scanAdGuardIntegration(hass) {
  if (!hass?.entities) return [];

  const entityIds = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform === ADGUARD_PLATFORM) entityIds.push(entityId);
  }

  const candidates = groupEntitiesByDevice(hass, entityIds).map((group) => {
    const blocked = group.entityIds.find(
      (id) => hass.entities?.[id]?.translation_key === "dns_queries_blocked" && hass.states?.[id]
    );
    const total = group.entityIds.find(
      (id) => hass.entities?.[id]?.translation_key === "dns_queries" && hass.states?.[id]
    );
    return {
      deviceId: group.deviceId,
      name: group.name || "AdGuard Home",
      entity: blocked || "",
      totalQueries: total || ""
    };
  });

  // OPNsense's Unbound Blocklist switches - both the single legacy toggle
  // and any number of individually-named DNSBL rules - join the list as
  // their own candidates.
  const opnsenseBlocklistIds = Object.keys(hass.entities).filter(
    (id) =>
      hass.entities[id].platform === OPNSENSE_PLATFORM &&
      id.startsWith("switch.") &&
      /unbound.?blocklist/i.test(id) &&
      hass.states?.[id]
  );
  for (const id of opnsenseBlocklistIds) {
    candidates.push({
      deviceId: hass.entities[id].device_id || null,
      name: hass.states[id]?.attributes?.friendly_name || "OPNsense Unbound Blocklist",
      entity: id,
      totalQueries: ""
    });
  }

  return candidates;
}

// --- Proxmox VE Auto-Discovery (Homelab node) ------------------------
// Confirmed straight from home-assistant/core's proxmoxve/entity.py,
// AND separately against dougiteixeira/proxmoxve (the HACS "Proxmox VE
// Custom" integration many people actually run instead - same domain,
// same "status" binary_sensor, but a different set of `model` strings):
// every Node, VM/Container, and Storage device exposes an identically-
// named "status" binary_sensor (translation_key "status"), so
// translation_key alone can't tell them apart. What does: a guest
// device's `model` is exactly "VM"/"Container" (core) or "QEMU"/"LXC"
// (HACS); a physical/cluster Node's own device sets no model at all
// (core) or the CPU's model string (HACS, always non-empty and never
// one of the guest/storage/cluster values below) - so a "status" entity
// whose device model isn't a recognised guest or storage/cluster value
// is a Node candidate. A guest device additionally carries
// `via_device_id` pointing at its parent Node's device (both
// integrations), so a discovered Node's own VMs/Containers can be
// attached as its containers[] automatically, rather than requiring a
// second separate scan. The HACS integration's own "Storage"/"Shared
// storage" and "Cluster" devices never actually get a "status" sensor
// at all (confirmed from its binary_sensor.py - Storage gets
// storage_active/enabled/shared instead, Cluster gets its HA-status
// sensors), so excluding those model values here is only a defensive
// backstop, not something that's actually been observed to fire.
const PROXMOX_PLATFORM = "proxmoxve";
const PROXMOX_GUEST_MODELS = new Set(["VM", "Container", "QEMU", "LXC"]);
const PROXMOX_NON_NODE_MODELS = new Set(["Storage", "Shared storage", "Cluster"]);
// Which of PROXMOX_GUEST_MODELS gets the VM-style icon vs the container one.
const PROXMOX_VM_KINDS = new Set(["VM", "QEMU"]);

function scanProxmoxIntegration(hass) {
  if (!hass?.entities || !hass?.devices) return [];

  const nodeCandidates = [];
  const containersByParent = Object.create(null);

  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== PROXMOX_PLATFORM) continue;
    if (!entityId.startsWith("binary_sensor.") || entry.translation_key !== "status") continue;
    if (!hass.states?.[entityId]) continue;

    const deviceId = entry.device_id;
    if (!deviceId) continue;
    const device = hass.devices[deviceId];
    const model = device?.model;
    const name = device?.name_by_user || device?.name || "";

    if (PROXMOX_GUEST_MODELS.has(model)) {
      const parentId = device?.via_device_id;
      (containersByParent[parentId] ||= []).push({ entity: entityId, name, kind: model });
    } else if (!PROXMOX_NON_NODE_MODELS.has(model)) {
      nodeCandidates.push({ deviceId, entity: entityId, name });
    }
  }

  return nodeCandidates.map((n) => ({ ...n, containers: containersByParent[n.deviceId] || [] }));
}

// Flat list of every Proxmox VM/Container status entity, independent
// of which Node they belong to - used by the "Scan for Container/VM"
// button on an existing Homelab node, as opposed to scanProxmoxIntegration
// above (which only surfaces a VM/Container as a side effect of
// discovering its parent Node for the Nodes page).
function scanProxmoxContainers(hass) {
  if (!hass?.entities || !hass?.devices) return [];

  const out = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== PROXMOX_PLATFORM) continue;
    if (!entityId.startsWith("binary_sensor.") || entry.translation_key !== "status") continue;
    if (!hass.states?.[entityId]) continue;

    const deviceId = entry.device_id;
    if (!deviceId) continue;
    const device = hass.devices[deviceId];
    const model = device?.model;
    if (!PROXMOX_GUEST_MODELS.has(model)) continue;

    out.push({
      deviceId,
      entity: entityId,
      name: device?.name_by_user || device?.name || "",
      kind: model,
      source: "proxmoxve"
    });
  }
  return out;
}

// --- Portainer Auto-Discovery (Containers/VMs badges) ----------------
// Confirmed straight from home-assistant/core's portainer/entity.py:
// Portainer devices set `model` to "Endpoint" (a Docker host), "Stack"
// (a docker-compose stack), "Container", or "Volume". Only "Container"
// devices are surfaced here - Portainer's containers are attached to
// an EXISTING Homelab node the person picks (a node discovered via
// Proxmox, or a plain Docker host added by hand), rather than this
// scan creating a node of its own the way Proxmox's does, since an
// "Endpoint" on its own doesn't carry the same host-identity signal a
// Proxmox physical/cluster Node does.
const PORTAINER_PLATFORM = "portainer";

function scanPortainerContainers(hass) {
  if (!hass?.entities || !hass?.devices) return [];

  const containers = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== PORTAINER_PLATFORM) continue;
    if (!entityId.startsWith("binary_sensor.") || entry.translation_key !== "status") continue;
    if (!hass.states?.[entityId]) continue;

    const deviceId = entry.device_id;
    if (!deviceId) continue;
    const device = hass.devices[deviceId];
    if (device?.model !== "Container") continue;

    containers.push({
      deviceId,
      entity: entityId,
      name: device?.name_by_user || device?.name || "",
      kind: "Container",
      source: "portainer"
    });
  }
  return containers;
}

// --- OpenWrt (LuCI) Auto-Discovery (Router + Clients) ----------------
// Confirmed straight from home-assistant/core's luci/device_tracker.py:
// this integration ONLY ever creates per-client device_tracker
// entities (no device_info at all, so they're deviceless) - there's no
// separate "router status"/"gateway" entity of its own. Any one of its
// client trackers still works as a genuine router-reachability proxy
// though: they're all CoordinatorEntity-based, so HA marks every one
// of them "unavailable" together the instant the router itself can't
// be reached, regardless of whether that specific client happens to be
// connected - exactly the signal isEntityUnavailable already reads
// everywhere else in this card. A currently-connected ("home") tracker
// is preferred only for a nicer-looking default state, not because it
// works any better as a proxy.
const LUCI_PLATFORM = "luci";
const HA_OPENWRT_PLATFORM = "openwrt";
const MIKROTIK_PLATFORM = "mikrotik";
const MIKROTIK_ROUTER_PLATFORM = "mikrotik_router";
const MIKROTIK_EXTENDED_PLATFORM = "mikrotik_extended";
const OPNSENSE_PLATFORM = "opnsense";

function scanOpnsenseIntegration(hass) {
  if (!hass?.entities) return { routerCandidates: [], clients: [] };
  const sensorIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === OPNSENSE_PLATFORM && id.startsWith("sensor.") && hass.states?.[id]
  );
  const statusIds = sensorIds.filter((id) => /interface/i.test(id) && /wan/i.test(id) && /status/i.test(id));
  const groups = groupEntitiesByDevice(hass, statusIds);

  const wanDownload = sensorIds.find(
    (id) => /interface/i.test(id) && /wan/i.test(id) && /inbytes.*kilobytes.*per.*second/i.test(id)
  );
  const wanUpload = sensorIds.find(
    (id) => /interface/i.test(id) && /wan/i.test(id) && /outbytes.*kilobytes.*per.*second/i.test(id)
  );

  const routerCandidates = groups.map((group) => ({
    entity: group.entityIds[0],
    name: group.name || "OPNsense",
    downloadEntity: wanDownload || undefined,
    uploadEntity: wanUpload || undefined,
    source: "opnsense"
  }));

  const clientIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === OPNSENSE_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  const clients = clientIds.map((id) => ({
    entity: id,
    name: hass.states[id]?.attributes?.friendly_name || id,
    source: "opnsense"
  }));

  return { routerCandidates, clients };
}

function scanMikrotikExtendedIntegration(hass) {
  if (!hass?.entities) return { routerCandidates: [], nodes: [], clients: [] };
  const tkOf = (id) => hass.entities[id]?.translation_key || "";
  const allIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === MIKROTIK_EXTENDED_PLATFORM && id.startsWith("sensor.") && hass.states?.[id]
  );
  // cloud_public_address is included in this same filter (not matched
  // separately) specifically so it ends up in the SAME group's entityIds
  // as the router's own uptime/cpu-load sensors - grouping only ever sees
  // whatever list it's given, not a device's full entity set.
  const sysIds = allIds.filter((id) => ["system_uptime", "system_cpu_load", "system_memory_usage", "cloud_public_address"].includes(tkOf(id)));
  const groups = groupEntitiesByDevice(hass, sysIds);

  // traffic_rx/traffic_tx exist per interface (confirmed: ha_group
  // "data__default-name") - only "wan" in the id picks out which one.
  const wanDownload = allIds.find((id) => tkOf(id) === "traffic_rx" && /wan/i.test(id));
  const wanUpload = allIds.find((id) => tkOf(id) === "traffic_tx" && /wan/i.test(id));
  // ip_address is ALSO per interface (ha_group "data__interface") and
  // needs the same "wan" filter - the fallback for a router with no
  // cloud_public_address enabled.
  const wanIpPerInterface = allIds.find((id) => tkOf(id) === "ip_address" && /wan/i.test(id));

  const routerCandidates = [];
  const nodes = [];
  for (const group of groups) {
    const gIds = group.entityIds;
    const status = gIds.find((id) => tkOf(id) === "system_uptime") || gIds[0];
    if (!status) continue;
    // cloud_public_address lives on the SAME device as the system_*
    // sensors (confirmed: ha_group "System"), so it's looked for within
    // this specific router's own group, not matched globally like the
    // per-interface sensors above - correctly keeping it paired with the
    // right router when more than one is configured.
    const cloudIp = gIds.find((id) => tkOf(id) === "cloud_public_address");
    const candidate = {
      entity: status,
      name: group.name || "MikroTik Extended",
      downloadEntity: wanDownload || undefined,
      uploadEntity: wanUpload || undefined,
      wanIpEntity: cloudIp || wanIpPerInterface || undefined,
      source: "mikrotik_extended"
    };
    routerCandidates.push(candidate);
    // Same situation as every other MikroTik integration here: nothing
    // distinguishes a device acting as the router from one acting purely
    // as a wireless bridge/AP, so it's offered both ways.
    nodes.push({ entity: status, name: group.name || "MikroTik Extended (as Access Point)", source: "mikrotik_extended" });
  }

  const clientIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === MIKROTIK_EXTENDED_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  const clients = clientIds.map((id) => ({
    entity: id,
    name: hass.states[id]?.attributes?.friendly_name || id,
    source: "mikrotik_extended"
  }));

  return { routerCandidates, nodes, clients };
}

function scanMikrotikRouterIntegration(hass) {
  if (!hass?.entities) return { routerCandidates: [], nodes: [], clients: [] };
  const allIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === MIKROTIK_ROUTER_PLATFORM && id.startsWith("sensor.") && hass.states?.[id]
  );
  // system_* sensors (uptime, cpu-load, memory-usage, ...) are the one
  // thing confirmed to live on the main router's own device, grouped the
  // normal way; each interface's traffic_tx/traffic_rx pair lives on that
  // interface's own separate device instead; confirmed from source, with no
  // via_device link between the two visible in what was shared, there is no
  // way this card can verify a given WAN-named traffic sensor belongs to a
  // SPECIFIC router rather than another one from the same integration - a
  // real limitation only were someone to have more than one MikroTik Router
  // config entry at once.
  const sysIds = allIds.filter((id) => /system[_-](uptime|cpu.load|memory.usage|clients.wired|clients.wireless)/i.test(id));
  const groups = groupEntitiesByDevice(hass, sysIds);

  const wanDownload = allIds.find((id) => /wan/i.test(id) && /(^|[_-])rx([_-]|$)/i.test(id));
  const wanUpload = allIds.find((id) => /wan/i.test(id) && /(^|[_-])tx([_-]|$)/i.test(id));

  const routerCandidates = [];
  const nodes = [];
  for (const group of groups) {
    const gIds = group.entityIds;
    const status = gIds.find((id) => /uptime/i.test(id)) || gIds[0];
    if (!status) continue;
    const candidate = {
      entity: status,
      name: group.name || "MikroTik Router",
      downloadEntity: wanDownload || undefined,
      uploadEntity: wanUpload || undefined,
      source: "mikrotik_router"
    };
    routerCandidates.push(candidate);
    // Same situation as core mikrotik, Deco, Synology SRM, and Netgear:
    // nothing here distinguishes a device acting as the router from one
    // acting purely as a wireless bridge/AP, so it's offered both ways.
    nodes.push({ entity: status, name: group.name || "MikroTik Router (as Access Point)", source: "mikrotik_router" });
  }

  const clientIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === MIKROTIK_ROUTER_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  const clients = clientIds.map((id) => ({
    entity: id,
    name: hass.states[id]?.attributes?.friendly_name || id,
    source: "mikrotik_router"
  }));

  return { routerCandidates, nodes, clients };
}

function scanMikrotikIntegration(hass) {
  if (!hass?.entities) return { routerCandidates: [], nodes: [], clients: [] };
  const tkOf = (id) => hass.entities[id]?.translation_key || "";
  const ids = Object.keys(hass.entities).filter(
    (id) =>
      hass.entities[id].platform === MIKROTIK_PLATFORM &&
      (id.startsWith("sensor.") || id.startsWith("binary_sensor.")) &&
      hass.states?.[id]
  );
  const groups = groupEntitiesByDevice(hass, ids);

  const routerCandidates = [];
  const nodes = [];
  for (const group of groups) {
    const gIds = group.entityIds;
    // cpu_load / memory_usage / disk_usage (from /system/resource) exist on
    // every RouterOS device - router, switch, or wireless AP alike.
    const hasResource = gIds.some((id) => ["cpu_load", "memory_usage", "disk_usage"].includes(tkOf(id)));
    // "running" carries no translation_key of its own (confirmed from
    // source) - device_class connectivity is the reliable way to find it,
    // and it's the only binary sensor this integration creates.
    const runningSensors = gIds.filter(
      (id) => id.startsWith("binary_sensor.") && hass.states[id]?.attributes?.device_class === "connectivity"
    );
    if (!hasResource && !runningSensors.length) continue;

    // If a port happens to be named with "wan" in it, prefer that one -
    // otherwise just the first available, since there's no reliable way to
    // single one out.
    const wanLike = runningSensors.find((id) => /wan/i.test(id));
    const status =
      wanLike || runningSensors[0] || gIds.find((id) => hass.states[id]?.attributes?.device_class === "timestamp");
    if (!status) continue;

    routerCandidates.push({ entity: status, name: group.name || "MikroTik Router", source: "mikrotik" });
    nodes.push({ entity: status, name: group.name || "MikroTik (as Access Point)", source: "mikrotik" });
  }

  const clientIds = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === MIKROTIK_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  const clients = clientIds.map((id) => ({
    entity: id,
    name: hass.states[id]?.attributes?.friendly_name || id,
    source: "mikrotik"
  }));

  return { routerCandidates, nodes, clients };
}

function scanHaOpenwrtIntegration(hass) {
  if (!hass?.entities) return { routerCandidates: [], clients: [] };
  const tkOf = (id) => hass.entities[id]?.translation_key || "";
  const ids = Object.keys(hass.entities).filter(
    (id) =>
      hass.entities[id].platform === HA_OPENWRT_PLATFORM &&
      (id.startsWith("sensor.") || id.startsWith("binary_sensor.")) &&
      hass.states?.[id]
  );
  const groups = groupEntitiesByDevice(hass, ids);

  const routerCandidates = [];
  const nodes = [];
  for (const group of groups) {
    const gIds = group.entityIds;
    const connectedClients = gIds.find((id) => tkOf(id) === "connected_clients");
    const deviceConnected = gIds.find((id) => tkOf(id) === "device_connected");
    if (!connectedClients && !deviceConnected) continue;

    // interface_up is created per physical/bridge/WAN interface - only the
    // one whose id contains "wan" is the router's actual internet link;
    // device_connected (always on once the router answers) is the fallback.
    const wanUp = gIds.find((id) => tkOf(id) === "interface_up" && /wan/i.test(id));
    const status = wanUp || deviceConnected || connectedClients;
    // net_rx_rate/net_tx_rate exist for every interface - same "wan" filter.
    const download = gIds.find((id) => tkOf(id) === "net_rx_rate" && /wan/i.test(id));
    const upload = gIds.find((id) => tkOf(id) === "net_tx_rate" && /wan/i.test(id));
    // public_ip (the router's own externally-checked address) is preferred
    // over the WAN interface's configured IPv4, which is the same address
    // for most home setups but isn't guaranteed to be.
    const publicIp = gIds.find((id) => tkOf(id) === "public_ip");
    const wanIpv4 = gIds.find((id) => tkOf(id) === "net_ipv4" && /wan/i.test(id));

    // No "wan"-named interface at all -> nothing here is actually a gateway
    // link, so this device is offered as an Access Point Node instead.
    if (!wanUp && !download && !upload && !wanIpv4) {
      nodes.push({ entity: status, name: group.name || "OpenWrt Access Point", source: "openwrt" });
      continue;
    }

    routerCandidates.push({
      entity: status,
      name: group.name || "OpenWrt Router",
      downloadEntity: download || undefined,
      uploadEntity: upload || undefined,
      wanIpEntity: publicIp || wanIpv4 || undefined,
      source: "openwrt"
    });
  }

  // Clients: the same device_tracker.* pattern every other integration here
  // uses - confirmed from device_tracker.py (SourceType.ROUTER, via_device
  // linking a wireless client to the AP it's actually on).
  const clientIds = Object.keys(hass.entities).filter(
    (id) =>
      hass.entities[id].platform === HA_OPENWRT_PLATFORM &&
      id.startsWith("device_tracker.") &&
      hass.states?.[id]
  );
  const clients = clientIds.map((id) => ({
    entity: id,
    name: hass.states[id]?.attributes?.friendly_name || id,
    source: "openwrt"
  }));

  return { routerCandidates, nodes, clients };
}

function scanOpenWrtIntegration(hass) {
  if (!hass?.entities) return { routerCandidate: null, clients: [] };

  const trackers = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === LUCI_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  if (!trackers.length) return { routerCandidate: null, clients: [] };

  const proxyEntity = trackers.find((id) => hass.states[id].state === "home") || trackers[0];

  return {
    routerCandidate: { entity: proxyEntity, name: "OpenWrt Router (via LuCI)", source: "luci" },
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "luci"
    }))
  };
}

// --- Synology SRM Auto-Discovery (Router + Clients) ------------------
// Confirmed straight from home-assistant/core's synology_srm/
// device_tracker.py: like LuCI, this integration ONLY ever creates
// per-client device_tracker entities - there's no separate router
// status entity. Its clients carry `is_guest` and `connection`
// attributes that already match this card's existing guest-network and
// wired-detection logic exactly (isGuestDevice/getDeviceGroupName), so
// nothing extra was needed there.
//
// IMPORTANT DIFFERENCE FROM LUCI: this is a legacy YAML-only
// `DeviceScanner` platform, not a modern CoordinatorEntity one. When
// its poll fails, `_update_info()` returns False but leaves the
// previous scan results in place rather than clearing them - so unlike
// LuCI, there's no guarantee these entities actually go "unavailable"
// when the router itself drops offline; they may just keep reporting
// their last-known state indefinitely. The router candidate below is
// offered as best-effort only, with that caveat - it's a real signal
// when it works, just a weaker guarantee than LuCI's.
const SYNOLOGY_SRM_PLATFORM = "synology_srm";

function scanSynologySrmIntegration(hass) {
  if (!hass?.entities) return { routerCandidate: null, nodes: [], clients: [] };

  const trackers = Object.keys(hass.entities).filter(
    (id) =>
      hass.entities[id].platform === SYNOLOGY_SRM_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  if (!trackers.length) return { routerCandidate: null, nodes: [], clients: [] };

  const proxyEntity = trackers.find((id) => hass.states[id].state === "home") || trackers[0];

  return {
    routerCandidate: { entity: proxyEntity, name: "Synology SRM Router (best-effort)", source: "synology_srm" },
    // Synology routers support a genuine Access Point mode - the
    // integration has nothing to detect which one is active, so (like
    // Deco's own master unit) the same entity is offered as a Node
    // candidate too, letting the person choose how to represent it.
    nodes: [{ entity: proxyEntity, name: "Synology SRM (as Access Point)", source: "synology_srm" }],
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "synology_srm"
    }))
  };
}




// --- UniFi community integrations (Router + Switches + APs + Clients) --
// Two HACS integrations that expose UniFi network hardware differently
// from the core `unifi` integration above. Both were checked against
// their own source.
//
// UniFi Network Map (merlijntishauser/unifi-network-maps-ha, platform
// `unifi_network_map`): one connectivity binary_sensor per gateway,
// switch, and AP, with an explicit `device_type` attribute
// ("gateway"/"switch"/"ap") - so no model guessing is needed at all -
// plus `mac`, `ip`, `model_name`, and `uplink_device` (the MAC of the
// device it's plugged into). It's on/off, so offline shows correctly.
// Client binary_sensors exist only for MACs listed in that
// integration's own "tracked clients" option. Every entity shares one
// HA device, so everything here comes from entity attributes, not the
// device registry.
//
// UniFi Device Info (w1tw0lf/Unifi-Device-info, domain `unifi_mqtt`):
// publishes one MQTT-discovered sensor per device - so its platform is
// `mqtt`, not `unifi_mqtt` - whose STATE is the uptime text and whose
// attributes carry the controller's raw `type` ("usw", "uap", "udm",
// "ugw", ...), `mac_address`, `model`, `ip_address`, and `status`
// ("On"/"Off"). Because the state is uptime rather than on/off, this
// card reads that `status` attribute for offline detection on these
// entities (see isEntityUnavailable). It has no uplink information and
// no client entities.
const UNIFI_NETWORK_MAP_PLATFORM = "unifi_network_map";
const UNIFI_MQTT_TYPES = { usw: "switch", uap: "ap", udm: "gateway", ugw: "gateway", uxg: "gateway", ucg: "gateway" };

function scanUnifiCommunityIntegrations(hass) {
  const out = { routerCandidates: [], switches: [], accessPoints: [], clients: [] };
  if (!hass?.entities) return out;
  const wanSensors = [];

  const add = (kind, source, entityId, name, extra) => {
    if (kind === "gateway") {
      out.routerCandidates.push({ entity: entityId, name, source, lanIpEntity: entityId, ...extra });
    } else if (kind === "switch") {
      out.switches.push({ entity: entityId, name, source, connectedDevices: "", ipAddress: entityId, ...extra });
    } else if (kind === "ap") {
      out.accessPoints.push({
        entity: entityId, name, source, isMaster: false, connectedDevices: "",
        download: "", upload: "", backhaulType: "", backhaulSpeed: "", ipAddress: entityId, ...extra
      });
    }
  };

  for (const [entityId, entry] of Object.entries(hass.entities)) {
    const stateObj = hass.states?.[entityId];
    if (!stateObj) continue;
    const attrs = stateObj.attributes || {};
    const name = attrs.friendly_name || entityId;

    if (entry.platform === UNIFI_NETWORK_MAP_PLATFORM && entityId.startsWith("binary_sensor.")) {
      if (attrs.device_type) {
        add(attrs.device_type, "unifi_network_map", entityId, name, {
          mac: normalizeMac(attrs.mac),
          uplinkMac: normalizeMac(attrs.uplink_device)
        });
      } else if (attrs.mac) {
        out.clients.push({ entity: entityId, name, source: "unifi_network_map" });
      }
    } else if (
      entry.platform === "mqtt" &&
      entityId.startsWith("sensor.") &&
      attrs.mac_address &&
      UNIFI_MQTT_TYPES[String(attrs.type || "").toLowerCase()]
    ) {
      add(UNIFI_MQTT_TYPES[String(attrs.type).toLowerCase()], "unifi_mqtt", entityId, name, {
        mac: normalizeMac(attrs.mac_address),
        uplinkMac: ""
      });
    } else if (entry.platform === "mqtt" && entityId.startsWith("sensor.") && String(attrs.type || "").toLowerCase() === "wan" && attrs.wan_ip) {
      // The synthetic "<gateway> WAN" sensor: status as the state, wan_ip / ISP / speed
      // test figures as attributes.
      wanSensors.push({ entity: entityId, mac: normalizeMac(attrs.gateway_mac), gateway: attrs.gateway_name || "" });
    }
  }
  // Hand each gateway the WAN sensor that belongs to it (by MAC, or the only one there is).
  out.routerCandidates.forEach((rc) => {
    if (rc.source !== "unifi_mqtt") return;
    const hit = wanSensors.find((w) => w.mac && rc.mac && w.mac === rc.mac) || (wanSensors.length === 1 ? wanSensors[0] : null);
    if (hit) rc.wanIpEntity = hit.entity;
  });
  return out;
}

// --- Home Assistant Mobile App Auto-Discovery (Clients only) --------
// Confirmed straight from home-assistant/core's own mobile_app
// component source (device_tracker.py, helpers.py, manifest.json, dev
// branch). Each device that has installed and registered the official
// Home Assistant Companion app gets exactly one device_tracker entity
// (MobileAppEntity, a standard TrackerEntity reporting "home"/
// "not_home"/a zone name - the same states every other client tracker
// on this card already understands), keyed by the app's own device_id.
// There is no router/gateway concept anywhere in this integration - a
// phone or tablet is a personal device, never network hardware - so
// unlike every router-brand integration above, this is Clients-only:
// no Router candidate, no Switch/AP candidate.
const MOBILE_APP_PLATFORM = "mobile_app";

function scanMobileAppIntegration(hass) {
  if (!hass?.entities) return { clients: [] };

  const trackers = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === MOBILE_APP_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );

  return {
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "mobile_app"
    }))
  };
}

// --- Netgear (official core integration) Auto-Discovery (Router + Clients) --
// Confirmed straight from home-assistant/core's own netgear component
// source (entity.py, device_tracker.py, sensor.py, switch.py, update.py,
// router.py, dev branch). This integration (Orbi, Nighthawk, and other
// pynetgear-supported routers) is a single-router integration: every
// attached device - a phone, a laptop, or an Orbi satellite/AP/switch
// alike - is reported the same way. The router's own `device["device_type"]`
// integer for each one only ever picks that device's entity icon
// (DEVICE_ICONS in const.py); it is never exposed to Home Assistant as a
// state or attribute, so there is no reliable way from here to tell a
// satellite or switch apart from an ordinary phone or laptop. Every
// attached device is therefore offered only as a Client below, the same
// as TP-Link Deco/UniFi/Omada already do for whichever of THEIR devices
// they can't classify either - never as a Switch or AP node.
//
// There IS a genuine router-only device in the registry - entity.py's
// NetgearRouterEntity fixes every router-level sensor/switch/update
// entity to the same `router.device_info`, distinct from each client's
// own MAC-keyed device - but none of its entities make a safe presence
// proxy. Every router-level sensor (CPU/memory utilization, Ethernet
// link status, speed test, traffic counters) and switch (access control,
// guest Wi-Fi, QoS, Smart Connect, ...) is disabled by default
// (`entity_registry_enabled_default = False` on both
// NetgearRouterSensorEntity in sensor.py and NetgearRouterSwitchEntity in
// switch.py), and the one router-level entity that IS enabled by default
// - the firmware Update entity - reports state "off" whenever the router
// is simply up to date, which this card's generic offline check
// (isEntityUnavailable) would misread as the router being offline. So,
// exactly as with OpenWrt (LuCI) and Synology SRM above, a live client
// device_tracker doubles as the router-reachability proxy instead: every
// one is a CoordinatorEntity on the same tracker coordinator
// (NetgearDeviceEntity in entity.py), so they all go unavailable together
// the moment the router itself can't be reached. Unlike Synology SRM,
// this integration IS a modern coordinator-based one (like LuCI), so
// that guarantee actually holds.
//
// This integration also has no LAN-connected-devices count, WAN IP, or
// LAN IP entity anywhere, so - again like LuCI/Synology SRM - the Router
// candidate below carries only an entity, name, and source.
const NETGEAR_PLATFORM = "netgear";

function scanNetgearIntegration(hass) {
  if (!hass?.entities) return { routerCandidate: null, nodes: [], clients: [] };

  const trackers = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === NETGEAR_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  if (!trackers.length) return { routerCandidate: null, nodes: [], clients: [] };

  const proxyEntity = trackers.find((id) => hass.states[id].state === "home") || trackers[0];

  return {
    routerCandidate: { entity: proxyEntity, name: "Netgear Router (via a connected device)", source: "netgear" },
    // Netgear's own Orbi systems (and similar) support a genuine Access
    // Point mode - same situation as Synology SRM above, same fix: offer
    // the same entity as a Node candidate too.
    nodes: [{ entity: proxyEntity, name: "Netgear (as Access Point)", source: "netgear" }],
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "netgear"
    }))
  };
}


// --- ASUSWRT (official core integration) Auto-Discovery (Router + Clients)
// Confirmed straight from home-assistant/core's own asuswrt component
// source (sensor.py, device_tracker.py, router.py, const.py, dev
// branch). NOT the same integration as the community "AsusRouter" one
// above (platform `asusrouter`) - this is the built-in `asuswrt`
// platform, and the two can be installed side by side.
//
// Router: every router-level sensor is a CoordinatorEntity fixed to
// the router's own device (router.device_info), so it goes unavailable
// the moment the router can't be polled. Almost all of them are
// disabled by default, but "Devices connected" (translation_key
// "devices_connected") is enabled by default - so it doubles as a
// genuine router-status entity AND the Router's LAN connected-devices
// count, with no client-tracker proxy needed. Its state is a device
// count, never "off", so this card's offline check can't misread it.
// Only if someone has disabled that sensor does this fall back to a
// client tracker as a best-effort proxy - and ASUSWRT's trackers are
// plain ScannerEntities fed by a dispatcher, NOT coordinator entities,
// so unlike LuCI's they aren't guaranteed to go unavailable with the
// router; hence "best-effort" on that fallback's label.
//
// Clients: one device_tracker per tracked device (home/not_home). By
// default the integration only tracks devices that report a name
// (CONF_TRACK_UNKNOWN defaults to off), so unnamed devices simply
// won't appear here unless that option is turned on in the
// integration itself. The integration never distinguishes an AiMesh
// node, switch, or AP from an ordinary client, so nothing is offered
// as a Switch/AP node - for AiMesh satellites use the AsusRouter
// integration instead.
//
// More than one ASUSWRT router can be configured (one config entry
// each), so this returns every router it finds as its own candidate.
const ASUSWRT_PLATFORM = "asuswrt";

function scanAsuswrtIntegration(hass) {
  if (!hass?.entities) return { routerCandidates: [], clients: [] };

  const countSensors = [];
  const trackers = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== ASUSWRT_PLATFORM || !hass.states?.[entityId]) continue;
    if (entityId.startsWith("device_tracker.")) {
      trackers.push(entityId);
    } else if (
      entityId.startsWith("sensor.") &&
      (entry.translation_key === "devices_connected" || entityId.endsWith("_devices_connected"))
    ) {
      countSensors.push({ entityId, deviceId: entry.device_id });
    }
  }

  // The integration's live-rate sensors are keyed sensor_rx_rates (download)
  // and sensor_tx_rates (upload), shown as "Download speed" / "Upload speed";
  // the GB totals are sensor_rx_bytes / sensor_tx_bytes ("Download" /
  // "Upload"), so none of these endings can pick up a total. Looked up on the
  // router's own device: by registry translation key first (immune to entity
  // renames), then by the entity id's ending - which is the friendly-name
  // form (_download_speed) on a normal install, or the raw key
  // (_sensor_rx_rates) where an id was created from it.
  const RATE_KEYS = { download: ["download_speed", "sensor_rx_rates"], upload: ["upload_speed", "sensor_tx_rates"] };
  const speedSensor = (deviceId, dir) => {
    if (!deviceId) return undefined;
    const keys = RATE_KEYS[dir];
    const own = Object.entries(hass.entities).filter(
      ([id, e]) => e.platform === ASUSWRT_PLATFORM && e.device_id === deviceId && id.startsWith("sensor.") && hass.states?.[id]
    );
    return (
      own.find(([, e]) => keys.includes(e.translation_key))?.[0] ||
      own.find(([id]) => keys.some((k) => id.endsWith(`_${k}`)))?.[0] ||
      undefined
    );
  };
  const routerCandidates = countSensors.map(({ entityId, deviceId }) => {
    const device = deviceId ? hass.devices?.[deviceId] : null;
    const name = device?.name_by_user || device?.model || device?.name || "ASUSWRT Router";
    const downloadEntity = speedSensor(deviceId, "download");
    const uploadEntity = speedSensor(deviceId, "upload");
    return {
      entity: entityId,
      name,
      lanEntity: entityId,
      downloadEntity,
      uploadEntity,
      // Only "devices connected" is on by default; the rate / byte / load
      // sensors have to be enabled, so a router with none of them is the
      // normal case, and worth explaining.
      note:
        downloadEntity || uploadEntity
          ? "ASUSWRT's speed sensors are reported to read 0 or identical values on some routers - check them after selecting."
          : "No Download / Upload speed sensors found. ASUSWRT's speed sensors may be switched off by default - enable them in Home Assistant (Settings > Devices & services > ASUSWRT > entities) to fill Real-time Speed.",
      source: "asuswrt"
    };
  });

  if (!routerCandidates.length && trackers.length) {
    const proxyEntity = trackers.find((id) => hass.states[id].state === "home") || trackers[0];
    routerCandidates.push({ entity: proxyEntity, name: "ASUSWRT Router (via a connected device, best-effort)", source: "asuswrt" });
  }

  return {
    routerCandidates,
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "asuswrt"
    }))
  };
}

// --- FRITZ!Box (official core integration) Auto-Discovery -----------
// The built-in `fritz` platform (AVM FRITZ!Box Tools). Per its docs it
// provides device_tracker (one per connected host), a connectivity
// binary_sensor, and sensors for external IP and uptime. Entity keys
// used here: the sensors `external_ip`, `device_uptime` and
// `connection_uptime` are confirmed from the integration's own unique
// IDs (`<mac>-external_ip` and so on); the WAN binary sensor is matched
// by its translation key (`is_connected`, or `connection`), then by
// device_class "connectivity" (skipping the separate "link" sensor).
// The integration's own PR that added the link sensor documents the
// difference: "Connection" = established internet connection, "Link" =
// the physical xDSL link - and it renamed the older "connectivity"
// sensor to "connection", so both names can exist across HA versions. Matching goes
// by translation_key first so it still works on non-English installs,
// where the generated entity_ids are localised.
//
// What each piece feeds:
//  - WAN connectivity binary_sensor -> an Internet candidate (listed
//    with the ISP discovery, so it can be applied as Primary OR
//    Secondary - a second FRITZ!Box on another line is a natural
//    backup WAN). The same candidate also carries the box's live
//    kb_s_received / kb_s_sent (Download / Upload speed) and gb_received
//    / gb_sent (Total Downloaded / Uploaded) sensors.
//  - External IP sensor -> the Router's WAN IP.
//  - Router entity -> the box's own uptime sensor (a coordinator
//    entity that goes unavailable when the box can't be polled). The
//    WAN sensor is deliberately NOT used for this: it reads "off" when
//    the internet line is down even though the router is fine.
//  - device_tracker per host -> Clients.
// Repeaters / mesh units added as their own FRITZ entry are offered as
// Access Point nodes (device-uptime sensor as status). Clients name the
// unit they sit behind in `connected_to`, which the "group by AP" mode
// uses. Wired FRITZ clients report connection_type "LAN" (wireless is
// "WLAN"); the integration exposes no guest flag on its trackers, so
// guest clients can't be told apart.
const FRITZ_PLATFORM = "fritz";

function fritzFindByKey(hass, pool, key, domain) {
  const inDomain = pool.filter((id) => id.startsWith(`${domain}.`) && hass.states?.[id]);
  for (const eid of inDomain) {
    if (hass.entities?.[eid]?.translation_key === key) return eid;
  }
  for (const eid of inDomain) {
    const objectId = eid.split(".")[1] || "";
    if (objectId === key || objectId.endsWith(`_${key}`)) return eid;
  }
  return "";
}

// The box's own uptime sensor. Confirmed from the integration's
// sensor.py: `device_uptime` is the ONE sensor there with no
// translation_key (its name comes from its "uptime" device class), so
// it can't be found by key - it is the keyless/uptime-class sensor that
// isn't `connection_uptime`. Its entity_id is therefore localised
// ("last restart" in German), which is why matching by name failed.
function fritzFindDeviceUptime(hass, pool) {
  for (const eid of pool) {
    if (!eid.startsWith("sensor.") || !hass.states?.[eid]) continue;
    const key = hass.entities?.[eid]?.translation_key;
    if (key === "connection_uptime") continue;
    // An uptime-class sensor, or a keyless one whose state is a timestamp
    // (uptime is a datetime). Requiring the timestamp stops a keyless
    // external-IP or rate sensor being mistaken for it if a frontend ever
    // omits translation keys.
    const isUptimeClass = hass.states[eid].attributes?.device_class === "uptime";
    const isKeylessTimestamp = !key && /^\d{4}-\d{2}-\d{2}T/.test(String(hass.states[eid].state));
    if (isUptimeClass || isKeylessTimestamp) {
      if ((eid.split(".")[1] || "").includes("connection")) continue;
      return eid;
    }
  }
  return fritzFindByKey(hass, pool, "device_uptime", "sensor");
}

function fritzFindWanConnected(hass, pool) {
  // "Connection" is the established internet connection - what the
  // Internet node should track. The separate "Link" sensor is only the
  // physical xDSL link, so it is never picked (see the device_class
  // fallback below, which skips it explicitly).
  for (const key of ["is_connected", "connection", "connectivity"]) {
    const found = fritzFindByKey(hass, pool, key, "binary_sensor");
    if (found) return found;
  }
  for (const eid of pool) {
    if (!eid.startsWith("binary_sensor.") || !hass.states?.[eid]) continue;
    if (hass.states[eid].attributes?.device_class !== "connectivity") continue;
    if (hass.entities?.[eid]?.translation_key === "is_linked") continue;
    if ((eid.split(".")[1] || "").includes("link")) continue;
    return eid;
  }
  return "";
}

function scanFritzIntegration(hass) {
  const empty = { routerCandidates: [], wanServices: [], clients: [], nodes: [] };
  if (!hass?.entities) return empty;

  const ids = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === FRITZ_PLATFORM && hass.states?.[id]
  );
  if (!ids.length) return empty;

  const trackers = ids.filter((id) => id.startsWith("device_tracker."));
  const others = ids.filter((id) => !id.startsWith("device_tracker."));
  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const routerCandidates = [];
  const wanServices = [];
  const nodes = [];

  for (const group of groupEntitiesByDevice(hass, others)) {
    const siblings = group.deviceId ? deviceEntityMap[group.deviceId] || [] : group.entityIds;
    const pool = [...new Set([...group.entityIds, ...siblings])];
    const externalIp = fritzFindByKey(hass, pool, "external_ip", "sensor");
    const uptime = fritzFindDeviceUptime(hass, pool);
    const wan = fritzFindWanConnected(hass, pool);
    // Confirmed sensors (translation keys from sensor.py): live WAN rates
    // in KB/s and cumulative totals in GB.
    const rateDown = fritzFindByKey(hass, pool, "kb_s_received", "sensor");
    const rateUp = fritzFindByKey(hass, pool, "kb_s_sent", "sensor");
    const totalDown = fritzFindByKey(hass, pool, "gb_received", "sensor");
    const totalUp = fritzFindByKey(hass, pool, "gb_sent", "sensor");
    // A unit with neither a WAN sensor nor an external IP isn't a gateway
    // (the integration only creates those for a device that is the router).
    // A repeater or mesh unit added as its own FRITZ entry still gets the
    // device-uptime sensor and no client trackers, so it is offered as an
    // Access Point node, with that uptime sensor as its status entity.
    if (!wan && !externalIp) {
      if (uptime) nodes.push({ entity: uptime, name: group.name || "FRITZ! unit" });
      continue;
    }

    const name = group.name || "FRITZ!Box";
    const routerEntity = uptime || externalIp;
    if (routerEntity) {
      routerCandidates.push({
        entity: routerEntity,
        name,
        wanIpEntity: externalIp || undefined,
        // The same live WAN throughput sensors the Internet slot uses.
        downloadEntity: rateDown || undefined,
        uploadEntity: rateUp || undefined,
        source: "fritz"
      });
    }
    if (wan) {
      wanServices.push({
        deviceId: group.deviceId,
        platform: "fritz",
        name,
        connected: wan,
        download: rateDown,
        upload: rateUp,
        quotaTotal: "",
        quotaRemaining: "",
        totalDownload: totalDown,
        totalUpload: totalUp
      });
    }
  }

  // No usable sensors (or all disabled): fall back to a client tracker
  // as a reachability proxy, clearly labelled best-effort.
  if (!routerCandidates.length && trackers.length) {
    const proxy = trackers.find((id) => hass.states[id].state === "home") || trackers[0];
    routerCandidates.push({ entity: proxy, name: "FRITZ!Box (via a connected device, best-effort)", source: "fritz" });
  }

  return {
    routerCandidates,
    wanServices,
    nodes,
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "fritz"
    }))
  };
}

// --- pfSense (hass-pfsense custom integration) Auto-Discovery --------
// travisghansen/hass-pfsense, platform `pfsense`. Everything below is
// confirmed from that integration's own sensor.py, binary_sensor.py,
// switch.py and device_tracker.py. Entity ids are slugify(<device name>
// + " " + <entity name>), so each entity's name is what matters:
//  - Gateways: "Gateway <name> status|delay|stddev|loss" - all enabled by
//    default. Status is the word "online" (or another state), delay/stddev
//    are milliseconds. Attributes carry `interface` (the physical port),
//    `isdefaultgw`, `srcip`, `monitorip`.
//  - Interfaces: "Interface <descr> <property>", with `if`/`hwif` (the
//    physical port) as attributes. inbytes/outbytes_kilobytes_per_second
//    are enabled by default - the live WAN download/upload rate, matched
//    to a gateway through that physical port.
//  - DHCP: "dhcp_stats.leases.online" is enabled by default.
//  - OpenVPN: "OpenVPN Server <id> (<name>) connected_client_count" (and
//    byte counters) - DISABLED by default, as are all switches.
//  - Switches: "Filter Rule <tracker> (<descr>)" and "Service <name>
//    status" (openvpn, ipsec, wireguard, ...), disabled by default.
//  - device_tracker: one per MAC chosen in the integration's options
//    (ARP-table based); with none chosen they're created disabled.
// Only entities Home Assistant has a state for can be offered.
//
// What each piece feeds:
//  - Router: a system sensor as the liveness entity. Chosen carefully: a
//    sensor that reports "unknown" (CPU frequency and temperature do,
//    when they read 0) would make this card show the router offline, and
//    the notices/CARP binary sensors read "off" when all is well - so
//    neither kind is ever used. DHCP online leases become the Router's
//    LAN Connected Clients.
//  - Internet (ISP list): each non-VPN gateway - status as the Internet
//    entity, delay as Ping, stddev as Jitter, and the matching WAN
//    interface's KB/s as Download/Upload. The default gateway is listed
//    first; a dual-WAN pfSense offers both, each usable as Primary or
//    Secondary.
//  - Security: VPN gateways and OpenVPN/IPsec/WireGuard service switches
//    (VPN status), OpenVPN connected-client counts (the badge's peers
//    number), and filter-rule switches (Firewall - the integration's
//    only on/off firewall entities).
//  - Clients: the ARP-table device_trackers.
// The integration only ever exposes a client COUNT for OpenVPN, never a
// list of connected clients, so a count is all the VPN badge can show.
const PFSENSE_PLATFORM = "pfsense";
// Entity names confirmed from const.py: "System Boottime", "CPU Usage",
// "Memory Used Percentage", "pf State Table Used Percentage", "System
// Load Average ...", "Memory Buffers Used Percentage". The first five
// are enabled by default; ids are the slugified names.
const PFSENSE_LIVENESS_HINTS = ["boottime", "cpu_usage", "memory_used_percentage", "pf_state_table_used_percentage", "load_average", "memory_buffers_used_percentage", "filesystem"];
const PFSENSE_VPN_GATEWAY = /vpn|ovpn|wireguard|(^|_)wg\d*(_|$)/i;

function scanPfsenseIntegration(hass) {
  const empty = { routerCandidates: [], wanServices: [], clients: [], security: [] };
  if (!hass?.entities) return empty;

  const ids = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === PFSENSE_PLATFORM && hass.states?.[id]
  );
  if (!ids.length) return empty;

  const oid = (id) => id.split(".")[1] || "";
  const attrsOf = (id) => hass.states[id]?.attributes || {};
  const friendly = (id) => attrsOf(id).friendly_name || id;
  const groups = Object.create(null);
  const trackers = [];
  for (const id of ids) {
    if (id.startsWith("device_tracker.")) {
      trackers.push(id);
      continue;
    }
    const key = hass.entities[id].device_id || "__none__";
    (groups[key] ||= []).push(id);
  }

  const routerCandidates = [];
  const wanServices = [];
  const security = [];

  for (const [deviceId, pool] of Object.entries(groups)) {
    const device = deviceId !== "__none__" ? hass.devices?.[deviceId] : null;
    const name = device?.name_by_user || device?.name || "pfSense";
    const sensors = pool.filter((id) => id.startsWith("sensor."));

    const liveCandidates = sensors.filter(
      (id) => !/gateway|openvpn|interface|dhcp|carp|temp|frequency/.test(oid(id))
    );
    let live = "";
    for (const hint of PFSENSE_LIVENESS_HINTS) {
      live = liveCandidates.find((id) => oid(id).includes(hint)) || "";
      if (live) break;
    }
    live = live || liveCandidates[0] || "";

    const dhcp = sensors.filter((id) => /dhcp/.test(oid(id)));
    const lan =
      dhcp.find((id) => /online/.test(oid(id))) ||
      dhcp.find((id) => /total/.test(oid(id))) ||
      dhcp.find((id) => /lease|client/.test(oid(id))) ||
      "";

    let routerCand = null;
    let ratesTaken = false;
    if (live) {
      routerCand = { entity: live, name, lanEntity: lan || undefined, source: "pfsense" };
      routerCandidates.push(routerCand);
    }

    // Interface throughput sensors, indexed by their physical port.
    const rateByPort = new Map();
    for (const id of sensors) {
      const o = oid(id);
      const dir = o.endsWith("_inbytes_kilobytes_per_second")
        ? "download"
        : o.endsWith("_outbytes_kilobytes_per_second")
        ? "upload"
        : "";
      if (!dir) continue;
      const a = attrsOf(id);
      for (const port of [a.if, a.hwif]) {
        if (!port) continue;
        const rec = rateByPort.get(port) || {};
        rec[dir] = rec[dir] || id;
        rateByPort.set(port, rec);
      }
    }

    const gateways = new Map();
    for (const id of sensors) {
      const m = oid(id).match(/(?:^|_)gateway_(.+)_(status|delay|stddev|loss)$/);
      if (!m) continue;
      const rec = gateways.get(m[1]) || {};
      rec[m[2]] = id;
      gateways.set(m[1], rec);
    }
    const gwList = [...gateways.entries()].filter(([, rec]) => rec.status);
    // Default gateway first.
    gwList.sort(([, a], [, b]) => Number(attrsOf(b.status).isdefaultgw === true) - Number(attrsOf(a.status).isdefaultgw === true));
    for (const [gwName, rec] of gwList) {
      const label = `${name} \u00b7 ${gwName.replace(/_/g, " ").toUpperCase()}`;
      if (PFSENSE_VPN_GATEWAY.test(gwName)) {
        security.push({ kind: "vpn_status", entity: rec.status, name: label, detail: "VPN gateway status", source: "pfsense" });
      } else {
        const rates = rateByPort.get(attrsOf(rec.status).interface) || {};
        // The default gateway is listed first, so the Router's real-time
        // speed is its WAN interface. Both directions come from the SAME
        // gateway - never download from one WAN and upload from another.
        if (routerCand && !ratesTaken && (rates.download || rates.upload)) {
          routerCand.downloadEntity = rates.download || undefined;
          routerCand.uploadEntity = rates.upload || undefined;
          ratesTaken = true;
        }
        wanServices.push({
          deviceId: deviceId !== "__none__" ? deviceId : null,
          platform: "pfsense",
          name: label,
          connected: rec.status,
          ping: rec.delay || "",
          jitter: rec.stddev || "",
          download: rates.download || "",
          upload: rates.upload || "",
          quotaTotal: "",
          quotaRemaining: "",
          totalDownload: "",
          totalUpload: ""
        });
      }
    }

    for (const id of pool) {
      const o = oid(id);
      if (id.startsWith("switch.") && /(^|_)service_(openvpn|ipsec|wireguard)/.test(o)) {
        const kind = /openvpn/.test(o) ? "OpenVPN" : /ipsec/.test(o) ? "IPsec" : "WireGuard";
        security.push({ kind: "vpn_status", entity: id, name: friendly(id), detail: `${kind} service switch`, source: "pfsense" });
      } else if (id.startsWith("sensor.") && /openvpn_server/.test(o) && o.endsWith("_connected_client_count")) {
        security.push({ kind: "vpn_peers", entity: id, name: friendly(id), detail: "Connected clients", source: "pfsense" });
      } else if (id.startsWith("switch.") && /(^|_)filter_rule/.test(o)) {
        security.push({ kind: "firewall", entity: id, name: friendly(id), detail: "Filter rule switch (on = rule enabled)", source: "pfsense" });
      }
    }
  }

  return {
    routerCandidates,
    wanServices,
    security,
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "pfsense"
    }))
  };
}

// --- AsusRouter (AiMesh) Auto-Discovery (Router + Nodes + Clients) --
// Confirmed straight from Vaskivskyi/ha-asusrouter's own source
// (binary_sensor.py, client.py, const.py). Unlike TP-Link Deco, this
// integration models its mesh cleanly: every AiMesh unit - including
// the main router itself - gets a binary_sensor with device_class
// "connectivity" (entity_id always contains "aimesh"), and its owning
// HA device carries `via_device_id` pointing at the main router's
// device for every SATELLITE unit, but not for the router itself. That
// makes classification exactly the same via_device_id pattern already
// used for Proxmox: no via_device_id = the router; has one = an AiMesh
// AP node. A device_class of "connectivity" reporting "off" is already
// read as offline by isEntityUnavailable, so these binary sensors work
// directly as Router/AP entities with no attribute-fallback needed.
// Client trackers carry `guest` (wired into isGuestDevice) and
// `connection_type` (wired into getDeviceGroupName/isBackhaulWired,
// case-insensitively since AsusRouter's own value is "Wired", not
// "wired") - both handled automatically by existing detection code.
// Clients also carry a `node` attribute (the MAC of the AiMesh unit
// they're connected through) and an `ip` attribute, but this card has
// nowhere in its schema to use "which AP is this client on" or a
// per-client IP today, so neither is surfaced here. No VLAN-specific
// attribute was found anywhere in this integration's client data,
// despite the AiMesh/guest-network richness elsewhere - if your setup
// exposes VLAN membership some other way, it isn't through this path.
const ASUSROUTER_PLATFORM = "asusrouter";

function scanAsusRouterIntegration(hass) {
  if (!hass?.entities || !hass?.devices) {
    return { routerCandidate: null, nodes: [], clients: [] };
  }

  const aimeshTrackers = [];
  const clientTrackers = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== ASUSROUTER_PLATFORM) continue;
    if (!hass.states?.[entityId]) continue;
    if (entityId.startsWith("binary_sensor.") && entityId.includes("aimesh")) {
      aimeshTrackers.push({ entityId, deviceId: entry.device_id });
    } else if (entityId.startsWith("device_tracker.")) {
      clientTrackers.push(entityId);
    }
  }

  let routerCandidate = null;
  const nodes = [];
  for (const t of aimeshTrackers) {
    const device = t.deviceId ? hass.devices[t.deviceId] : null;
    const name = device?.name_by_user || device?.name || hass.states[t.entityId]?.attributes?.friendly_name || "";
    if (device?.via_device_id) {
      nodes.push({ entity: t.entityId, name, isMaster: false });
    } else if (!routerCandidate) {
      // WAN throughput lives on the main router's device. Only the WAN
      // sensors count - `_wan_speed` is the link speed, and the LAN / Wi-Fi
      // interfaces have their own download/upload sensors.
      const wanSensor = (suffix) => {
        if (!t.deviceId) return undefined;
        for (const [id, e] of Object.entries(hass.entities)) {
          if (e.platform === ASUSROUTER_PLATFORM && e.device_id === t.deviceId && id.startsWith("sensor.") && hass.states?.[id] && id.endsWith(suffix)) {
            return id;
          }
        }
        return undefined;
      };
      routerCandidate = {
        entity: t.entityId,
        name: name || "AsusRouter (AiMesh)",
        downloadEntity: wanSensor("_wan_download_speed"),
        uploadEntity: wanSensor("_wan_upload_speed"),
        wanIpEntity: wanSensor("_wan_ip"),
        wanIpSecondaryEntity: wanSensor("_wan_ip_secondary"),
        source: "asusrouter"
      };
      // AsusRouter only creates traffic / speed sensors for the network
      // interfaces selected in its options, so a router with none for WAN
      // is common - say why instead of silently offering nothing.
      if (!routerCandidate.downloadEntity && !routerCandidate.uploadEntity) {
        routerCandidate.note = "No WAN speed sensors found. AsusRouter only creates traffic and speed sensors for the network interfaces you select in its options - add WAN there to fill Real-time Speed.";
      }
    }
  }

  return {
    routerCandidate,
    nodes,
    clients: clientTrackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "asusrouter"
    }))
  };
}

// --- UniFi Network Auto-Discovery (Gateway + Switches + APs + Clients) --
// Confirmed against home-assistant/core's own unifi integration source
// (device_tracker.py, entity.py, sensor.py, const.py, as of commit
// 843d9a7e). Two real gaps in what this integration exposes to Home
// Assistant, both worth knowing before trusting the classification below:
//  - There is NO "is this a gateway/switch/AP" attribute anywhere in this
//    integration's entities - device_tracker.py's extra_state_attributes
//    explicitly returns None for network-hardware trackers (only client
//    trackers get attributes at all), and no other platform adds one
//    either. Classification below is done instead by matching the HA
//    device registry's `model` field (aiounifi's device.model - the
//    Controller's own model code, e.g. "U6-Pro", "USW-24-PoE", "UDM-Pro")
//    against known Ubiquiti product-family prefixes. Every UniFi model
//    released as of this writing fits one of these prefixes, but a
//    brand-new product line could slip through unclassified until this
//    table is updated - if that happens the device simply won't appear
//    as a candidate here (nothing breaks; it's just not offered).
//  - There is likewise no uplink/topology attribute exposed (aiounifi's
//    own Device.uplink property exists but this integration doesn't
//    surface it to HA), so a switch feeding three APs has no way to
//    tell this card that relationship automatically. Every candidate
//    below is discovered flat, exactly like every other integration in
//    this file - grouping switches under the node they actually feed is
//    left to the user, same as TP-Link/AsusRouter/Proxmox already are.
// Manufacturer is fixed to "Ubiquiti Networks" (ATTR_MANUFACTURER in
// const.py) but isn't used as a filter here - platform "unifi" already
// scopes everything correctly on its own.
const UNIFI_PLATFORM = "unifi";
// Model classification. IMPORTANT: the core integration's device
// registry `model` is aiounifi's `device.model`, which returns the
// controller's RAW model code (raw["model"]) - e.g. "US24P250" for a
// USW-24-PoE, "USL8LP" for a USW-Lite-8-PoE, "USMINI" for a Flex Mini,
// "UAL6" for a U6-Lite, "UGW3" for a USG - NOT the marketing name. An
// earlier version of this table only matched marketing-style prefixes
// ("USW", "USG", ...), which is why most switches were never found.
// These prefixes were checked against unifi-topology's curated table of
// 334 UniFi model codes (the same data the UniFi Network Map
// integration uses), and also still match marketing-style names, since
// the community integrations below report those in some places.
const UNIFI_AP_EXACT = ["UDMB"]; // BeaconHD - an AP despite its UDM prefix
const UNIFI_IGNORE_EXACT = ["U7UKU"]; // a UniFi test tool, not an AP
const UNIFI_SWITCH_EXACT = ["UDB-SWITCH"];
const UNIFI_GATEWAY_PREFIXES = ["UDM", "UDR", "UDW", "UXG", "UXB", "UX7", "UGW", "UCG", "EFG", "USG"];
const UNIFI_GATEWAY_EXACT = ["UX"];
const UNIFI_AP_PREFIXES = ["UAP", "U6", "U7", "U2", "U5O", "UAL", "UAE", "UAIW", "UAM", "UFL", "UHD", "BZ", "E7", "G7"];
// "US..." is the switch family - except SmartPower ("USP-..." PDUs and
// "USPRPS" redundant power), which "USPM" (Pro Max switches) must not
// be confused with.
const UNIFI_SWITCH_PATTERN = /^(US(?!P(?!M))|S2\d|ECS|EAV-(XG|FIBER))/;

function unifiClassifyModel(model) {
  const m = String(model || "").toUpperCase();
  if (!m || UNIFI_IGNORE_EXACT.includes(m)) return null;
  if (UNIFI_AP_EXACT.includes(m)) return "ap";
  if (UNIFI_SWITCH_EXACT.includes(m)) return "switch";
  if (UNIFI_GATEWAY_EXACT.includes(m) || UNIFI_GATEWAY_PREFIXES.some((p) => m.startsWith(p))) return "gateway";
  if (UNIFI_AP_PREFIXES.some((p) => m.startsWith(p))) return "ap";
  if (UNIFI_SWITCH_PATTERN.test(m)) return "switch";
  return null;
}

// Plain lowercase colon-separated MAC, for matching one integration's
// uplink MAC against another device's own MAC.
function normalizeMac(mac) {
  const cleaned = String(mac || "").toLowerCase().replace(/[^0-9a-f]/g, "");
  return cleaned.length === 12 ? cleaned.match(/../g).join(":") : "";
}

function unifiBuildDeviceEntityMap(hass) {
  const map = Object.create(null);
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (entry.platform !== UNIFI_PLATFORM || !entry.device_id) continue;
    (map[entry.device_id] ||= []).push({ entityId, entry });
  }
  return map;
}

// Maps a device's own MAC to its Home Assistant device id, straight from
// the device registry's own `connections` (the same [type, value] pairs
// Home Assistant itself matches devices by) - CONNECTION_NETWORK_MAC is
// serialised as the literal string "mac".
function unifiBuildMacDeviceMap(hass) {
  const map = Object.create(null);
  for (const [deviceId, device] of Object.entries(hass.devices || {})) {
    for (const conn of device?.connections || []) {
      if (conn?.[0] === "mac" || conn?.[0] === "network_mac") {
        const mac = normalizeMac(conn[1]);
        if (mac) map[mac] = deviceId;
      }
    }
  }
  return map;
}

// Finds a sibling entity on the same UniFi device by translation_key
// (stable regardless of any renaming) with a live state - several of
// these sensors only exist when their own config-entry option is
// enabled (e.g. "Allow bandwidth sensors"), so a translation_key match
// against something not installed simply finds nothing, same reasoning
// as tplinkFindSibling above.
function unifiFindSibling(entries, translationKey) {
  const hit = entries.find((e) => e.entry.translation_key === translationKey);
  return hit ? hit.entityId : "";
}

function scanUnifiIntegration(hass) {
  if (!hass?.entities || !hass?.devices) {
    return { routerCandidates: [], switches: [], accessPoints: [], clients: [] };
  }

  const deviceEntityMap = unifiBuildDeviceEntityMap(hass);
  const routerCandidates = [];
  const switches = [];
  const accessPoints = [];

  // Every device_tracker of platform "unifi" IS the network hardware
  // itself (never a device_id here - see below), keyed by the device's
  // own MAC (ScannerEntity's `mac_address`, always present as the "mac"
  // state attribute regardless of Home Assistant version).
  //
  // IMPORTANT: core UniFi's own device_tracker.py sets device_info_fn to
  // a hard-coded `None` for this entity (confirmed straight from
  // source), so it is NEVER linked to a device through the
  // integration's own doing. Depending on the Home Assistant version,
  // ScannerEntity's own base class may or may not auto-link it to a
  // device via its MAC afterwards - so entry.device_id for the tracker
  // itself cannot be trusted either way. What's reliable instead: the
  // sensor/switch/button entities for the SAME hardware (device_clients,
  // device_uplink_mac, PoE controls, ...) always get real device_info
  // from async_device_device_info_fn, keyed by that same MAC via
  // CONNECTION_NETWORK_MAC - so matching the tracker's own MAC attribute
  // against the device registry's connections (unifiBuildMacDeviceMap)
  // finds the right device group regardless of how the tracker itself
  // happened to link (or not).
  const macToDeviceId = unifiBuildMacDeviceMap(hass);
  const trackerByDeviceId = Object.create(null);
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (entry.platform !== UNIFI_PLATFORM || !entityId.startsWith("device_tracker.")) continue;
    const mac = normalizeMac(hass.states?.[entityId]?.attributes?.mac);
    const deviceId = (mac && macToDeviceId[mac]) || entry.device_id;
    if (deviceId && !trackerByDeviceId[deviceId]) trackerByDeviceId[deviceId] = entityId;
  }

  // Every device with a real device_info-linked entity (any sensor,
  // switch, or button) is a candidate, whether or not its tracker
  // happened to land in the same group - so a device group with no
  // tracker of its own can still adopt one found via the MAC match
  // above, and a device with only client-invisible diagnostics (a PDU,
  // say) that has no tracker at all is simply skipped, same as before.
  const allDeviceIds = new Set([...Object.keys(deviceEntityMap), ...Object.keys(trackerByDeviceId)]);
  for (const deviceId of allDeviceIds) {
    const entries = deviceEntityMap[deviceId] || [];
    const trackerEntity = entries.find((e) => e.entityId.startsWith("device_tracker."))?.entityId || trackerByDeviceId[deviceId];
    if (!trackerEntity || !hass.states?.[trackerEntity]) continue;
    const tracker = { entityId: trackerEntity };
    const device = hass.devices[deviceId];
    // A device with a WAN latency sensor is a gateway whatever its model
    // code says (that sensor only exists for devices with WAN monitors).
    const kind = unifiClassifyModel(device?.model) || (unifiFindSibling(entries, "wan_latency") ? "gateway" : null);
    if (!kind) continue;

    // The device's own "Device scanner" tracker doubles as this card's
    // status/online entity (isEntityUnavailable already treats
    // home/not_home the same as on/off) and, via ScannerEntity's own
    // built-in ip_address property, as the self-referencing IP-badge
    // source too - the same pattern TP-Link Deco units use above.
    const name = device?.name_by_user || device?.name || hass.states[tracker.entityId]?.attributes?.friendly_name || "";
    const connectedDevices = unifiFindSibling(entries, "device_clients");
    // For auto-placing a discovered device under the switch/AP it's
    // plugged into: its own MAC (ScannerEntity's standard "mac"
    // attribute) and its "Device Uplink MAC" diagnostic sensor.
    const mac = normalizeMac(hass.states[tracker.entityId]?.attributes?.mac);
    const uplinkSensor = unifiFindSibling(entries, "device_uplink_mac");
    const uplinkMac = normalizeMac(uplinkSensor ? hass.states[uplinkSensor]?.state : "");

    if (kind === "gateway") {
      const wanLatency = unifiFindSibling(entries, "wan_latency");
      routerCandidates.push({
        entity: tracker.entityId,
        deviceId,
        name,
        source: "unifi",
        lanEntity: connectedDevices,
        wanIpEntity: "",
        lanIpEntity: tracker.entityId,
        pingEntity: wanLatency
      });
    } else if (kind === "switch") {
      switches.push({ entity: tracker.entityId, name, connectedDevices, ipAddress: tracker.entityId, mac, uplinkMac });
    } else if (kind === "ap") {
      accessPoints.push({
        entity: tracker.entityId,
        name,
        isMaster: false,
        connectedDevices,
        download: "",
        upload: "",
        backhaulType: "",
        backhaulSpeed: "", ipAddress: tracker.entityId, mac, uplinkMac
      });
    }
  }

  // --- Clients: every UniFi client tracker. Client entities never get
  // a device_id on this integration (device_info_fn is explicitly None
  // for "Client device scanner" in device_tracker.py), so the
  // classified-above trackers (which DO require a device_id) can never
  // collide with these - filtering by entity id alone is enough.
  const claimedTrackers = new Set([
    ...routerCandidates.map((c) => c.entity),
    ...switches.map((c) => c.entity),
    ...accessPoints.map((c) => c.entity)
  ]);
  const clients = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== UNIFI_PLATFORM) continue;
    if (!entityId.startsWith("device_tracker.") || claimedTrackers.has(entityId)) continue;
    if (!hass.states?.[entityId]) continue;
    // A tracker linked to a UniFi hardware device (a PDU, Cloud Key, UNAS,
    // ... - anything with a model but not a gateway/switch/AP) is network
    // gear, not a client; client trackers never carry a UniFi model. As
    // with the switch/AP/gateway trackers above, the link is by MAC
    // (via the device registry's own connections), not device_id, since
    // this integration's device trackers are never device_info-linked
    // by the integration itself.
    const mac = normalizeMac(hass.states[entityId]?.attributes?.mac);
    const hwDeviceId = mac && macToDeviceId[mac];
    if (hwDeviceId && hass.devices[hwDeviceId]?.model && deviceEntityMap[hwDeviceId]) continue;
    clients.push({
      entity: entityId,
      name: hass.states[entityId]?.attributes?.friendly_name || entityId,
      source: "unifi"
    });
  }

  return { routerCandidates, switches, accessPoints, clients };
}

// --- TP-Link Omada Auto-Discovery (Gateway + Switches + APs + Clients) --
// Confirmed against zachcheatham/ha-omada's own source (device_tracker.py,
// omada_entity.py, sensor.py, const.py, api/devices.py, dev branch).
// Considerably more reliable to classify than UniFi above: this
// integration's own device_tracker.py DEVICE_ATTRIBUTES list puts the
// Omada Controller's raw device `type` field directly on each hardware
// device's own tracker entity - no model-string guessing needed. Values
// are matched case-insensitively below since this integration doesn't
// document a guaranteed case for them.
//
// This integration's sensor entities set no translation_key at all, so
// sibling matching goes by the entity registry's own `unique_id`
// instead, built as `f"{key}-{mac}"` (confirmed in omada_entity.py's
// unique_id_fn) - the part before that dash is exactly the sensor's own
// well-known key ("clients", "downloaded", "uploaded"), stable
// regardless of any renaming.
//
// The Omada Controller only ever reports a switch's REMAINING PoE
// budget, never its consumed wattage (Device.poe_remaining in
// api/devices.py, wired straight through as the sensor named "PoE power
// remaing" - their own typo, kept faithfully in their source). That's
// the opposite of what this card's PoE badge means to show (current
// draw), so it's deliberately not wired up as a switch's poe entity
// here - doing so would make a switch's badge climb as it draws LESS
// power, which is backwards. If Omada ever exposes actual per-port or
// total consumed PoE wattage, this is worth revisiting.
//
// As with UniFi, no uplink/topology attribute is exposed to Home
// Assistant here either (Device.uplink exists in api/devices.py but
// device_tracker.py's own DEVICE_ATTRIBUTES list never includes it), so
// switches/APs are discovered flat with no automatic grouping, same as
// every other integration in this file.
const OMADA_PLATFORM = "omada";

function omadaBuildDeviceEntityMap(hass) {
  const map = Object.create(null);
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (entry.platform !== OMADA_PLATFORM || !entry.device_id) continue;
    (map[entry.device_id] ||= []).push({ entityId, entry });
  }
  return map;
}

function omadaFindSibling(hass, entries, keyPrefix) {
  const hit = entries.find((e) => {
    const uid = e.entry.unique_id || "";
    return uid.startsWith(`${keyPrefix}-`) && !!hass.states?.[e.entityId];
  });
  return hit ? hit.entityId : "";
}

function scanOmadaIntegration(hass) {
  if (!hass?.entities || !hass?.devices) {
    return { routerCandidates: [], switches: [], accessPoints: [], clients: [] };
  }

  const deviceEntityMap = omadaBuildDeviceEntityMap(hass);
  const routerCandidates = [];
  const switches = [];
  const accessPoints = [];
  const claimedDeviceIds = new Set();

  for (const [deviceId, entries] of Object.entries(deviceEntityMap)) {
    const tracker = entries.find((e) => e.entityId.startsWith("device_tracker."));
    if (!tracker) continue;
    const attrs = hass.states?.[tracker.entityId]?.attributes || {};
    const kind = String(attrs.type || "").toLowerCase();
    if (kind !== "gateway" && kind !== "switch" && kind !== "ap") continue;
    claimedDeviceIds.add(deviceId);

    const device = hass.devices[deviceId];
    const name = device?.name_by_user || device?.name || attrs.friendly_name || "";
    const connectedDevices = omadaFindSibling(hass, entries, "clients");

    if (kind === "gateway") {
      routerCandidates.push({
        entity: tracker.entityId,
        deviceId,
        name,
        source: "omada",
        lanEntity: connectedDevices,
        wanIpEntity: "",
        lanIpEntity: tracker.entityId
      });
    } else if (kind === "switch") {
      switches.push({
        entity: tracker.entityId,
        name,
        connectedDevices,
        ipAddress: tracker.entityId
      });
    } else {
      accessPoints.push({
        entity: tracker.entityId,
        name,
        isMaster: false,
        connectedDevices,
        download: omadaFindSibling(hass, entries, "downloaded"),
        upload: omadaFindSibling(hass, entries, "uploaded"),
        backhaulType: "",
        backhaulSpeed: "",
        ipAddress: tracker.entityId
      });
    }
  }

  // --- Clients: on this integration client trackers DO get their own
  // device (client_device_info_fn in omada_entity.py), unlike UniFi -
  // so excluding device_ids already claimed above as gateway/switch/AP
  // is what actually separates the two groups here.
  const clients = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== OMADA_PLATFORM) continue;
    if (!entityId.startsWith("device_tracker.")) continue;
    if (entry.device_id && claimedDeviceIds.has(entry.device_id)) continue;
    if (!hass.states?.[entityId]) continue;
    clients.push({
      entity: entityId,
      name: hass.states[entityId]?.attributes?.friendly_name || entityId,
      source: "omada"
    });
  }

  return { routerCandidates, switches, accessPoints, clients };
}


// --- Monitoring Auto-Discovery (Uptime Kuma / Ping / Gatus / UptimeRobot) ---
// Each monitored thing is a Home Assistant *device* with several entities
// (status, response time, address, tags ...), so entities are grouped by
// device and the useful ones picked out. Where an integration's entities
// can't be identified from documentation alone, they're recognised by what
// they report as well as by translation_key, so a rename or a slightly
// different variant (e.g. the HACS builds of Uptime Kuma / Gatus, which
// share the core domains) still resolves.
//
//   Uptime Kuma : "status" sensor (up/down/pending/maintenance), a
//                 "response time" sensor (ms), URL / hostname sensors and
//                 a "tags" sensor whose attributes list the tags.
//   Ping        : a connectivity binary_sensor carrying round_trip_time_*
//                 attributes; the round-trip sensors are disabled by
//                 default. The device is named after the host.
//   Gatus       : a connectivity binary_sensor (its only attributes are
//                 device_class and friendly_name - no address) plus a
//                 `response_time` sensor (ms) per endpoint. status_code,
//                 last_event, certificate_expiration (a timestamp) and
//                 dns_response_code are diagnostic and DISABLED by default.
//                 An endpoint with no results yet reports unavailable.
//                 Entity ids are <group>_<name>, and the group is part of
//                 the friendly name.
//   UptimeRobot : a sensor (enum: up / down / seems_down / not_checked_yet /
//                 started / pause) AND a connectivity binary_sensor per
//                 monitor, both carrying the monitored address as a `target`
//                 attribute. The sensor is preferred - it has richer states.
//                 There is no response-time entity.
const MONITOR_STATUS_WORDS = new Set(["up", "down", "pending", "maintenance", "seems_down", "not_checked_yet", "pause"]);
const MONITOR_WINDOWED = /(^|_)(avg|average|o|\d+d|\d+_days?|24h)(_|$)/;

// Entities that belong to no device come back from groupEntitiesByDevice one
// group per entity, so a monitor's sensor and binary_sensor (which share a
// friendly name) would be listed twice. Fold those groups together.
function mergeDevicelessMonitorGroups(hass, groups) {
  const out = [];
  const byName = new Map();
  for (const g of groups) {
    if (g.deviceId) {
      out.push(g);
      continue;
    }
    const key = String(hass.states?.[g.entityIds[0]]?.attributes?.friendly_name || g.entityIds[0]).trim().toLowerCase();
    const hit = byName.get(key);
    if (hit) {
      hit.entityIds.push(...g.entityIds);
    } else {
      const copy = { ...g, entityIds: [...g.entityIds] };
      byName.set(key, copy);
      out.push(copy);
    }
  }
  return out;
}

function scanMonitoringIntegrations(hass) {
  if (!hass?.entities) return [];

  const idsByPlatform = Object.fromEntries(MONITOR_PLATFORMS.map((p) => [p, []]));
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (MONITOR_PLATFORMS.includes(entry.platform) && hass.states?.[entityId]) {
      idsByPlatform[entry.platform].push(entityId);
    }
  }

  const domainOf = (id) => id.split(".")[0];
  const tkOf = (id) => hass.entities?.[id]?.translation_key || "";
  const stateOf = (id) => hass.states?.[id];
  const isMonitorStatusSensor = (id) => {
    if (domainOf(id) !== "sensor") return false;
    const st = stateOf(id);
    if (!st) return false;
    const opts = st.attributes?.options;
    return (
      tkOf(id) === "status" ||
      tkOf(id) === "monitor_status" ||
      MONITOR_STATUS_WORDS.has(String(st.state).toLowerCase()) ||
      (Array.isArray(opts) && opts.includes("up") && opts.includes("down"))
    );
  };
  const findResponse = (ids) => {
    const sensors = ids.filter((id) => domainOf(id) === "sensor" && stateOf(id));
    return (
      sensors.find((id) => tkOf(id) === "response_time") ||
      sensors.find(
        (id) =>
          stateOf(id).attributes?.unit_of_measurement === "ms" &&
          /response/i.test(`${id} ${stateOf(id).attributes?.friendly_name || ""}`) &&
          !MONITOR_WINDOWED.test(id) &&
          !/[øØ]|average/i.test(stateOf(id).attributes?.friendly_name || "")
      ) ||
      ""
    );
  };

  const candidates = [];
  for (const platform of MONITOR_PLATFORMS) {
    const groups = mergeDevicelessMonitorGroups(hass, groupEntitiesByDevice(hass, idsByPlatform[platform]));
    for (const group of groups) {
      const ids = group.entityIds;
      const binary = ids.find((id) => domainOf(id) === "binary_sensor");
      let status = "";
      let response = "";
      let target = "";
      let targetEntities = [];
      let tagsEntity = "";

      if (platform === "uptime_kuma") {
        status = ids.find(isMonitorStatusSensor) || binary || "";
        response = findResponse(ids);
        const url = ids.find((id) => domainOf(id) === "sensor" && (/^(monitor_)?url$/.test(tkOf(id)) || /_url$/.test(id)));
        const host = ids.find((id) => domainOf(id) === "sensor" && (/^(monitor_)?hostname$/.test(tkOf(id)) || /_hostname$/.test(id)));
        targetEntities = [url, host].filter(Boolean);
        tagsEntity = ids.find((id) => domainOf(id) === "sensor" && (tkOf(id) === "tags" || /_tags$/.test(id))) || "";
      } else if (platform === "ping") {
        status = binary || "";
        response =
          ids.find((id) => domainOf(id) === "sensor" && tkOf(id) === "round_trip_time_avg") ||
          ids.find((id) => domainOf(id) === "sensor" && /round_trip_time_avg/.test(id)) ||
          "";
        target = group.name || "";
      } else if (platform === "gatus") {
        status = binary || "";
        response = findResponse(ids);
      } else if (platform === "uptimerobot") {
        status = ids.find(isMonitorStatusSensor) || binary || "";
        const withTarget = ids.find((id) => stateOf(id)?.attributes?.target);
        target = withTarget ? String(stateOf(withTarget).attributes.target) : "";
      }

      if (!status) continue;
      // Things worth telling the person before they add it.
      const hints = [];
      const probe = resolveMonitorScope(hass, { entity: status, source: platform, target, target_entities: targetEntities, tags_entity: tagsEntity });
      if (probe.reason.startsWith("no tag or address")) {
        hints.push(
          platform === "gatus"
            ? "Gatus exposes no address, so Type: Auto only looks for a word like External, Public, Internal or LAN in the name (Gatus puts the group in it), and otherwise treats this as Internal - set Type manually if that is wrong."
            : platform === "uptime_kuma"
            ? "No usable URL, hostname or tag to classify it on (some monitor types have no address, and those sensors can be switched off in Home Assistant), so Type: Auto treats this as Internal."
            : "No address available, so Type: Auto treats this as Internal."
        );
      }
      if (platform === "uptime_kuma" && String(stateOf(status)?.state).toLowerCase() === "unavailable") {
        hints.push("Currently unavailable - possibly a stale entity left behind by a renamed or deleted monitor.");
      }
      const friendly = stateOf(status)?.attributes?.friendly_name || status;
      candidates.push({
        source: platform,
        deviceId: group.deviceId,
        name: group.name || friendly.replace(/\s+status$/i, ""),
        entity: status,
        response_entity: response,
        target,
        target_entities: targetEntities,
        tags_entity: tagsEntity,
        auto_hint: hints.join(" "),
        entities: ids
      });
    }
  }

  const seen = new Set();
  return candidates
    .filter((c) => (seen.has(c.entity) ? false : (seen.add(c.entity), true)))
    .sort((a, b) => a.source.localeCompare(b.source) || a.name.localeCompare(b.name));
}

const MENU_ITEMS = [
  { key: "internet", title: "Internet", icon: "mdi:web", summary: "Primary and secondary service: entity, name, icon, quota, bandwidth, ping, colors, mode" },
  { key: "router", title: "Router/Gateway", icon: "mdi:router-network", summary: "Entity, name, icon, LAN, colors" },
  { key: "switch", title: "Core Switch", icon: "mdi:switch", summary: "Optional element between Router/Gateway and Nodes, PoE" },
  { key: "security", title: "Security", icon: "mdi:shield-lock", summary: "VPN, Firewall, DNS Filtering, and Reverse Proxy badges, target, colors" },
  { key: "nodes", title: "Nodes", icon: "mdi:wifi", summary: "AP, Switch (with fed APs/Switches), or Server nodes, PoE" },
  { key: "individual_devices", title: "Clients", icon: "mdi:devices", summary: "Client icons & colors, grouping by SSID/VLAN/AP" },
  { key: "monitoring", title: "Monitoring", icon: "mdi:heart-pulse", summary: "Uptime Kuma, Ping, Gatus & UptimeRobot services, badges, response time" },
  { key: "layout", title: "Layout", icon: "mdi:page-layout-body", summary: "View, summary, details panel, sizes & animation" }
];


// --- Hyperbolic view (v4.0.0) -----------------------------------------
// Everything in this block is pure (no Lit, no DOM) so it can be tested on
// its own. The view is the Poincare disk model of the hyperbolic plane:
// the whole network is laid out once, in hyperbolic space, and the card
// only ever changes which point sits at the centre (the "focus"). Moving
// the focus is an isometry of the disk, so nothing is re-laid-out and
// nothing overlaps differently - nodes near the centre are large and
// readable, nodes far away shrink toward the rim.
//
// Points are complex numbers stored as [re, im]. An isometry of the disk
// is an SU(1,1) matrix [[a, b], [conj(b), conj(a)]] stored as {a, b}, so
// composing two moves is a matrix product and undoing one is a cheap
// inverse - no angle bookkeeping.

const HYP_C = {
  mul: (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]],
  add: (p, q) => [p[0] + q[0], p[1] + q[1]],
  conj: (p) => [p[0], -p[1]],
  abs: (p) => Math.hypot(p[0], p[1]),
  div: (p, q) => {
    const d = q[0] * q[0] + q[1] * q[1] || 1e-12;
    return [(p[0] * q[0] + p[1] * q[1]) / d, (p[1] * q[0] - p[0] * q[1]) / d];
  }
};

const HYP_IDENTITY = { a: [1, 0], b: [0, 0] };

// Zoom: 1 = the whole disk fits the card. Each press changes it by this step.
const HYP_ZOOM_MIN = 0.5;
const HYP_ZOOM_MAX = 4;
const HYP_ZOOM_STEP = 1.35;

// u -> (a*u + b) / (conj(b)*u + conj(a))
function hypApply(M, u) {
  const num = HYP_C.add(HYP_C.mul(M.a, u), M.b);
  const den = HYP_C.add(HYP_C.mul(HYP_C.conj(M.b), u), HYP_C.conj(M.a));
  return HYP_C.div(num, den);
}

// M1 after M2. Re-normalised so repeated drags can't accumulate drift.
function hypCompose(M1, M2) {
  const a = HYP_C.add(HYP_C.mul(M1.a, M2.a), HYP_C.mul(M1.b, HYP_C.conj(M2.b)));
  const b = HYP_C.add(HYP_C.mul(M1.a, M2.b), HYP_C.mul(M1.b, HYP_C.conj(M2.a)));
  const det = a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]);
  const k = det > 1e-12 ? 1 / Math.sqrt(det) : 1;
  return { a: [a[0] * k, a[1] * k], b: [b[0] * k, b[1] * k] };
}

function hypInverse(M) {
  return { a: HYP_C.conj(M.a), b: [-M.b[0], -M.b[1]] };
}

// Moves the origin to t (and t to a point the same distance the other way).
function hypTranslation(t) {
  const m2 = t[0] * t[0] + t[1] * t[1];
  const k = 1 / Math.sqrt(Math.max(1e-9, 1 - m2));
  return { a: [k, 0], b: [t[0] * k, t[1] * k] };
}

function hypRotation(theta) {
  return { a: [Math.cos(theta / 2), Math.sin(theta / 2)], b: [0, 0] };
}

function hypClampToDisk(u, max = 0.97) {
  const m = HYP_C.abs(u);
  return m > max ? [(u[0] / m) * max, (u[1] / m) * max] : u;
}

// SVG path for the hyperbolic line segment between two displayed points.
// A geodesic of the Poincare disk is a circle orthogonal to the unit
// circle (or a straight line when it passes through the centre).
function hypGeodesicPath(a, b) {
  const det = a[0] * b[1] - a[1] * b[0];
  const f = (n) => n.toFixed(4);
  if (Math.abs(det) < 1e-5) {
    return `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`;
  }
  const ka = (1 + a[0] * a[0] + a[1] * a[1]) / 2;
  const kb = (1 + b[0] * b[0] + b[1] * b[1]) / 2;
  const cx = (ka * b[1] - a[1] * kb) / det;
  const cy = (a[0] * kb - b[0] * ka) / det;
  const r2 = cx * cx + cy * cy - 1;
  if (r2 <= 1e-9) return `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`;
  const r = Math.sqrt(r2);
  // Which way round: the centre must sit on the right-hand side of the
  // direction of travel (in y-down screen space) for sweep-flag 1.
  const cross = (b[0] - a[0]) * (cy - a[1]) - (b[1] - a[1]) * (cx - a[0]);
  return `M${f(a[0])} ${f(a[1])}A${f(r)} ${f(r)} 0 0 ${cross > 0 ? 1 : 0} ${f(b[0])} ${f(b[1])}`;
}

// Euclidean radius (in disk units) of a hyperbolic circle of radius `rho`
// whose centre is displayed at u. Exact enough at these sizes, and it is
// what makes far-away nodes shrink toward the rim.
function hypDiskRadius(rho, u) {
  const m2 = u[0] * u[0] + u[1] * u[1];
  return (rho * (1 - m2)) / 2;
}

// The circle a node is drawn as: a hyperbolic circle of radius `rho` whose
// centre sits at u appears on screen as a Euclidean circle - slightly
// smaller, and slightly nearer the middle, than the centre suggests. This is
// the exact figure (it matters once nodes are made large); `c` is where to
// draw it and `r` its radius, both in disk units.
function hypCircle(rho, u) {
  const m2 = u[0] * u[0] + u[1] * u[1];
  const T = Math.tanh(rho / 2);
  const T2 = T * T;
  const den = Math.max(1e-9, 1 - m2 * T2);
  const k = (1 - T2) / den;
  return { c: [u[0] * k, u[1] * k], r: ((1 - m2) * T) / den };
}

// Lower-cases and strips everything but letters and digits, so "Living Room
// AP", "living_room_ap" and a MAC written aa:bb:cc... or AA-BB-CC... each
// compare equal to the same thing written another way.
function hypNormKey(v) {
  return v == null ? "" : String(v).toLowerCase().replace(/[^a-z0-9]/g, "");
}

// --- History graphs ---------------------------------------------------
// Pure helpers for the details panel's graphs: turning Home Assistant's
// history for an entity into a fixed number of evenly spaced values, and
// those values into SVG paths.

const HYP_GRAPH_BUCKETS = 120;

// The timescales a graph can show, shortest first. `ago` labels the left end
// of the time axis.
const HYP_RANGES = [
  { key: "5m", ms: 5 * 60000, ago: "5 min ago" },
  { key: "30m", ms: 30 * 60000, ago: "30 min ago" },
  { key: "1h", ms: 3600000, ago: "1 h ago" },
  { key: "12h", ms: 12 * 3600000, ago: "12 h ago" },
  { key: "24h", ms: 24 * 3600000, ago: "24 h ago" },
  { key: "72h", ms: 72 * 3600000, ago: "3 days ago" }
];
const hypRange = (key) => HYP_RANGES.find((r) => r.key === key) || HYP_RANGES[4];

// Data-rate units as bits per second, so a download in KiB/s and an upload in
// Mbit/s can share one axis.
const HYP_RATE_BITS = {
  "bit/s": 1, bps: 1, "kbit/s": 1e3, kbps: 1e3, "mbit/s": 1e6, mbps: 1e6, "gbit/s": 1e9, gbps: 1e9,
  "b/s": 8, "kb/s": 8e3, "mb/s": 8e6, "gb/s": 8e9,
  "kib/s": 8 * 1024, "mib/s": 8 * 1048576, "gib/s": 8 * 1073741824
};

// Converts v between two rate units; null if either is not a known rate unit.
function hypConvertRate(v, from, to) {
  const a = HYP_RATE_BITS[String(from || "").toLowerCase().trim()];
  const b = HYP_RATE_BITS[String(to || "").toLowerCase().trim()];
  return a && b && v != null ? (v * a) / b : null;
}

// Home Assistant history rows -> [{ t (ms), v (number | null) }], oldest
// first. Accepts the compact form ({ s, lu } - seconds) and the full form
// ({ state, last_updated }). Non-numeric states (unavailable, unknown)
// become gaps.
function hypParseHistory(rows) {
  const out = [];
  (rows || []).forEach((r) => {
    if (!r) return;
    let t = r.lu != null ? r.lu * 1000 : r.lc != null ? r.lc * 1000 : Date.parse(r.last_updated || r.last_changed || "");
    if (!Number.isFinite(t)) return;
    const raw = r.s !== undefined ? r.s : r.state;
    const n = parseFloat(raw);
    out.push({ t, v: Number.isFinite(n) ? n : null });
  });
  return out.sort((x, y) => x.t - y.t);
}

// A sensor holds its value until it next changes, so history is a step
// function. Each bucket is that function's time-weighted mean over the
// bucket, which smooths a busy sensor and bridges quiet stretches; a bucket
// with no known value is null (a gap in the line).
function hypBuckets(points, t0, t1, n) {
  const out = new Array(n).fill(null);
  if (!points.length || !(t1 > t0)) return out;
  const bw = (t1 - t0) / n;
  let i = 0;
  let cur = null;
  while (i < points.length && points[i].t <= t0) {
    cur = points[i].v;
    i++;
  }
  for (let b = 0; b < n; b++) {
    const a = t0 + b * bw;
    const e = a + bw;
    let sum = 0;
    let w = 0;
    let t = a;
    while (i < points.length && points[i].t < e) {
      if (cur != null) {
        sum += cur * (points[i].t - t);
        w += points[i].t - t;
      }
      cur = points[i].v;
      t = points[i].t;
      i++;
    }
    if (cur != null) {
      sum += cur * (e - t);
      w += e - t;
    }
    out[b] = w > 0 ? sum / w : null;
  }
  return out;
}

// Adds several series of buckets together, bucket by bucket; a bucket that is
// empty in every series stays empty (a gap), otherwise missing ones count as 0.
function hypSumBuckets(list) {
  const n = Math.max(0, ...list.map((l) => (l ? l.length : 0)));
  const out = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    let any = false;
    list.forEach((l) => {
      if (l && l[i] != null) {
        sum += l[i];
        any = true;
      }
    });
    out[i] = any ? sum : null;
  }
  return out;
}

// A round number at or above v for the top of an axis: 1, 2, 2.5, 5, 10 x 10^k.
function hypNiceMax(v) {
  if (!(v > 0)) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}

// SVG path data for a series in a W x H box with the axis running 0..max.
// Gaps break the line; `area` is the same shape closed down to the floor.
function hypLinePath(vals, W, H, max) {
  const n = vals.length;
  const x = (i) => (n <= 1 ? 0 : (i / (n - 1)) * W);
  const y = (v) => H - (Math.max(0, Math.min(v, max)) / max) * H;
  const f = (v) => v.toFixed(2);
  let line = "";
  let area = "";
  let start = -1;
  const close = (end) => {
    if (start < 0) return;
    area += `L${f(x(end))} ${f(H)}L${f(x(start))} ${f(H)}Z`;
    start = -1;
  };
  let last = -1;
  for (let i = 0; i < n; i++) {
    const v = vals[i];
    if (v == null) {
      close(last);
      continue;
    }
    if (start < 0) {
      start = i;
      line += `M${f(x(i))} ${f(y(v))}`;
      area += `M${f(x(i))} ${f(y(v))}`;
    } else {
      line += `L${f(x(i))} ${f(y(v))}`;
      area += `L${f(x(i))} ${f(y(v))}`;
    }
    last = i;
  }
  close(last);
  return { line, area };
}

// --- IP addresses and device statistics ----------------------------------
// Read from whatever the integration provides: an entity whose state IS the
// address, or one that carries it as an attribute (UniFi Device Info's
// `ip_address` / `lan_ip` / `wan_ip`, a Deco tracker's `ip`, ...). `slot` says
// which address is wanted, so a gateway's LAN and WAN addresses - both attributes
// of one sensor - can be told apart.
function hypCleanIp(v) {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s || /^(unknown|unavailable|none|n\/a|null|undefined)$/i.test(s)) return null;
  return s;
}

function hypReadIp(hass, entityId, slot, opts) {
  const so = hass && hass.states && entityId ? hass.states[entityId] : null;
  if (!so) return null;
  const a = so.attributes || {};
  const order =
    slot === "lan" ? ["lan_ip", "ip", "ip_address", "ipv4", "ip_addr"] : slot === "wan" ? ["wan_ip", "ip", "ip_address", "public_ip", "ipv4"] : ["ip", "ip_address", "lan_ip", "ipv4", "ip_addr", "host_ip"];
  for (const k of order) {
    const v = hypCleanIp(a[k]);
    if (v) return v;
  }
  if (opts && opts.attributesOnly) return null;
  // UniFi Device Info reports uptime as the state ("3d 4h 12m"), never an address.
  if (a.mac_address && a.type) return null;
  return hypCleanIp(so.state);
}

const HYP_IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

// Finds a device's address without being told where it is: a sensor on the same
// device named like an IP address, or the host in the device's web address
// (Proxmox, Portainer and others publish theirs as the device's configuration URL).
function hypDetectDeviceIp(hass, entityId) {
  const reg = hass && hass.entities && entityId ? hass.entities[entityId] : null;
  const devId = reg && reg.device_id;
  if (!devId) return null;
  for (const [eid, e] of Object.entries(hass.entities)) {
    if (e.device_id !== devId || eid === entityId) continue;
    if (!/^(sensor|text)\./.test(eid) || !/(^|_)(ip|ipv4|ip_address|lan_ip|host_ip)(_|$)/.test(eid.split(".")[1])) continue;
    const v = hypCleanIp(hass.states && hass.states[eid] ? hass.states[eid].state : null);
    if (v && HYP_IPV4.test(v)) return v;
  }
  const dev = hass.devices && hass.devices[devId];
  const url = dev && (dev.configuration_url || dev.configurationUrl);
  if (url) {
    const m = /^[a-z]+:\/\/([^/:?#]+)/i.exec(String(url));
    if (m && HYP_IPV4.test(m[1])) return m[1];
  }
  return null;
}

// CPU, RAM, traffic, temperature, power, ports ... as chips for the details panel,
// from the attributes a device's own entity carries (UniFi Device Info's `cpu`, `ram`,
// `bytes_rx`, `current_temperature`, `total_used_power`, `active_ports`, ...).
function hypDeviceStats(attrs, state) {
  attrs = attrs || {};
  const out = [];
  const isNum = (v) => v != null && v !== "" && typeof v !== "object" && /^-?\d+(\.\d+)?$/.test(String(v).trim());
  const first = (keys) => keys.find((k) => isNum(attrs[k]));
  const r1 = (v) => (Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10);
  const add = (key, icon, label, text, title) => out.push({ key, icon, label, text, title: title || "" });

  const cpu = first(["cpu", "cpu_usage", "cpu_percent", "cpu_utilization", "cpu_used", "cpu_load_percent"]);
  if (cpu) add("cpu", "mdi:chip", "CPU", `CPU: ${r1(parseFloat(attrs[cpu]))}%`);
  const ram = first(["ram", "ram_usage", "ram_percent", "mem", "mem_usage", "mem_percent", "memory", "memory_usage", "memory_percent", "memory_used_percent"]);
  if (ram) add("ram", "mdi:memory", "RAM", `RAM: ${r1(parseFloat(attrs[ram]))}%`);

  const temp = first(["current_temperature", "temperature", "device_temperature", "cpu_temperature", "temp"]);
  if (temp) add("temp", "mdi:thermometer", "Temperature", `${r1(parseFloat(attrs[temp]))} °C`);
  for (let i = 0; i < 4; i++) {
    // a gateway's own temperature probes: temperature_0_name / temperature_0_value ...
    const nm = attrs[`temperature_${i}_name`];
    const val = attrs[`temperature_${i}_value`];
    if (nm != null && isNum(val) && parseFloat(val) > 0) add(`temp${i}`, "mdi:thermometer", `${nm} Temp`, `${nm} Temp: ${r1(parseFloat(val))} °C`);
  }

  // Traffic: totals since the device started counting, and live rates where reported.
  const rxRate = first(["rx_bytes_rate", "internet_rx_bytes_rate"]);
  const txRate = first(["tx_bytes_rate", "internet_tx_bytes_rate"]);
  if (rxRate) add("down", "mdi:download", "Download", `Download: ${hypFmtBytes(attrs[rxRate])}/s`);
  if (txRate) add("up", "mdi:upload", "Upload", `Upload: ${hypFmtBytes(attrs[txRate])}/s`);
  if (isNum(attrs.activity)) add("activity", "mdi:swap-vertical", "Activity", `Activity: ${r1(parseFloat(attrs.activity))} Mbps`, "Uplink traffic, both directions");
  if (isNum(attrs.bytes_rx)) add("rx", "mdi:download", "Received", `Received: ${hypFmtBytes(attrs.bytes_rx)}`, "Total received by the device");
  if (isNum(attrs.bytes_tx)) add("tx", "mdi:upload", "Sent", `Sent: ${hypFmtBytes(attrs.bytes_tx)}`, "Total sent by the device");

  if (isNum(attrs.total_used_power)) {
    const max = isNum(attrs.total_max_power) && parseFloat(attrs.total_max_power) > 0 ? ` of ${r1(parseFloat(attrs.total_max_power))}` : "";
    add("power", "mdi:flash", "PoE Power", `PoE Power: ${r1(parseFloat(attrs.total_used_power))}${max} W`);
  }
  if (attrs.active_ports && typeof attrs.active_ports === "object") {
    const vals = Object.values(attrs.active_ports);
    if (vals.length) add("ports", "mdi:ethernet", "Ports", `Ports: ${vals.filter((v) => String(v).toLowerCase() === "up").length} of ${vals.length} up`);
  }

  // Speed test results some gateways keep (Mbps, ms).
  const stDown = first(["speedtest_download", "speedtest_download_mbps"]);
  const stUp = first(["speedtest_upload", "speedtest_upload_mbps"]);
  const stPing = first(["speedtest_latency", "speedtest_ping"]);
  if (stDown) add("stdown", "mdi:speedometer", "Speed Test Download", `Speed Test Down: ${r1(parseFloat(attrs[stDown]))} Mbps`);
  if (stUp) add("stup", "mdi:speedometer", "Speed Test Upload", `Speed Test Up: ${r1(parseFloat(attrs[stUp]))} Mbps`);
  if (stPing) add("stping", "mdi:speedometer", "Speed Test Latency", `Speed Test Latency: ${r1(parseFloat(attrs[stPing]))} ms`);

  // UniFi Device Info: the state is the uptime text.
  if (attrs.mac_address && attrs.type && state && !/^(unknown|unavailable)$/i.test(String(state))) add("uptime", "mdi:clock-outline", "Uptime", `Uptime: ${state}`);
  if (hypCleanIp(attrs.firmware_version)) add("firmware", "mdi:update", "Firmware", `Firmware: ${attrs.firmware_version}${attrs.update === "available" ? " (update available)" : ""}`);
  if (attrs.mac_address && hypCleanIp(attrs.model)) add("model", "mdi:information-outline", "Model", `Model: ${attrs.model}`);
  return out;
}

// --- PoE per port -------------------------------------------------------------
// The ports of a switch that supply PoE, with what each is drawing. UniFi Device
// Info publishes three dictionaries on the switch's own sensor: `poe_ports`
// ("power" / "none" per port), `poe_power` (watts per port) and `active_ports`
// (link up / down). Gateways with PoE ports (UDM Pro / SE) use the same names, with
// plain numbers as the keys of `active_ports`.
function hypPoePortsFromAttrs(attrs) {
  attrs = attrs || {};
  const poe = attrs.poe_ports && typeof attrs.poe_ports === "object" ? attrs.poe_ports : null;
  const pw = attrs.poe_power && typeof attrs.poe_power === "object" ? attrs.poe_power : null;
  const link = attrs.active_ports && typeof attrs.active_ports === "object" ? attrs.active_ports : null;
  if (!poe && !pw) return [];
  const keys = new Set([...Object.keys(poe || {}), ...Object.keys(pw || {})]);
  const out = [];
  keys.forEach((k) => {
    const port = parseInt(String(k).replace(/\D/g, ""), 10);
    if (!Number.isFinite(port)) return;
    const w = pw ? parseFloat(pw[k]) : NaN;
    const watts = Number.isFinite(w) ? w : 0;
    const enabled = !!poe && String(poe[k]).toLowerCase() === "power";
    if (!enabled && !(watts > 0)) return; // not a PoE port, or PoE is off and nothing is drawn
    let up = null;
    if (link) {
      const lk = k in link ? k : String(port) in link ? String(port) : null;
      if (lk != null) up = String(link[lk]).toLowerCase() === "up";
    }
    out.push({ port, watts, enabled, up });
  });
  return out.sort((a, b) => a.port - b.port);
}

function hypFmtWatts(w) {
  w = Number(w);
  if (!Number.isFinite(w)) return "";
  return `${Math.abs(w) >= 100 ? Math.round(w) : Math.abs(w) >= 10 ? w.toFixed(1) : w.toFixed(2)} W`;
}

// --- How many VMs / containers a server has --------------------------------
// Some integrations publish the counts as sensors on the host's device ("Containers: 12",
// "Running containers: 11", "Stopped containers: 1", "VMs running" ...). `list` is
// [{ id, name, key, unit, state }]; the result holds whichever of total / running / stopped
// could be read, with the missing one worked out from the other two.
function hypServiceCounts(list) {
  const out = {};
  const noun = /\b(containers?|vms?|virtual machines?|guests?|lxcs?|instances?)\b/;
  list.forEach((it) => {
    if (it.state == null || !/^-?\d+(\.\d+)?$/.test(String(it.state).trim())) return;
    if (it.unit && !/^(containers?|vms?|guests?|lxcs?|instances?|count)$/i.test(it.unit)) return; // a percentage, bytes ...
    const key = `${it.key || ""} ${it.id} ${it.name || ""}`.toLowerCase().replace(/[_.]/g, " ");
    if (!noun.test(key) || /\b(cpu|memory|mem|ram|disk|storage|image|volume|network|uptime|temperature|swap|load)\b/.test(key)) return;
    const n = Math.round(parseFloat(it.state));
    if (/\b(stopped|offline|exited|inactive|down|dead)\b/.test(key)) out.stopped = out.stopped ?? n;
    else if (/\b(running|online|active|started|up)\b/.test(key)) out.running = out.running ?? n;
    else if (/\b(total|count|number|all)\b/.test(key) || /^\s*(sensor|number)\s+\S+\s+(containers?|vms?|guests?)\s*$/.test(key) || !/\b(paused|unhealthy|healthy|created|restarting)\b/.test(key)) out.total = out.total ?? n;
  });
  if (out.total == null && out.running != null && out.stopped != null) out.total = out.running + out.stopped;
  if (out.running == null && out.total != null && out.stopped != null) out.running = Math.max(0, out.total - out.stopped);
  return out;
}

// --- Client and host details -------------------------------------------
// Pure helpers behind the details panel's "Client info" and the Homelab
// resource figures. They only read plain values, so they can be tested
// without a browser.

// "5 min ago", "3 h ago", "2 d ago" for a time `ms` milliseconds in the past.
function hypRelTime(ms) {
  if (!Number.isFinite(ms)) return "";
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 45) return "just now";
  if (s < 90) return "1 min ago";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 36) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 60) return `${d} d ago`;
  return `${Math.round(d / 30)} mo ago`;
}

// 93784 seconds -> "1d 2h"; 5400 -> "1h 30m"; 40 -> "40s".
function hypFmtDuration(sec) {
  let s = Math.round(Number(sec));
  if (!Number.isFinite(s) || s < 0) return "";
  const d = Math.floor(s / 86400);
  s -= d * 86400;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  s -= m * 60;
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
}

function hypFmtBytes(n) {
  n = Number(n);
  if (!Number.isFinite(n)) return "";
  const u = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (Math.abs(n) >= 1024 && i < u.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n >= 100 || i === 0 ? Math.round(n) : n.toFixed(1)} ${u[i]}`;
}

// A date in an attribute: an ISO string, or epoch seconds / milliseconds.
function hypParseWhen(v) {
  if (v == null || v === "" || typeof v === "boolean") return NaN;
  if (typeof v === "number" || /^\d{9,13}(\.\d+)?$/.test(String(v))) {
    const n = Number(v);
    if (n > 1e12) return n; // milliseconds
    if (n > 1e9) return n * 1000; // seconds
    return NaN;
  }
  if (typeof v === "string" && /\d{4}-\d{2}-\d{2}/.test(v)) {
    const t = Date.parse(v);
    return Number.isFinite(t) ? t : NaN;
  }
  return NaN;
}

const hypPrettyKey = (k) => String(k).replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (ch) => ch.toUpperCase());

// What a client tracker can tell us, in the order it is shown. Each field lists
// the attribute names the supported integrations use for it (UniFi, TP-Link
// Deco and Omada, AsusRouter, FRITZ!Box, OpenWrt and generic trackers).
const HYP_CLIENT_FIELDS = [
  { id: "ip", label: "IP Address", keys: ["ip", "ip_address", "ip_addr", "ipv4", "ipv4_address", "last_ip"] },
  { id: "mac", label: "MAC Address", keys: ["mac", "mac_address", "macaddress"] },
  { id: "host", label: "Hostname", keys: ["host_name", "hostname", "device_name", "dns_name"] },
  { id: "ssid", label: "SSID", keys: ["essid", "ssid", "wifi_ssid", "network_name"] },
  { id: "network", label: "Network", keys: ["interface", "network", "lan", "zone"] },
  { id: "vlan", label: "VLAN", keys: ["vlan", "vlan_id", "vlan_name"], fmt: (v) => (/^\d+$/.test(String(v)) ? `VLAN ${v}` : String(v)) },
  { id: "port", label: "Switch Port", keys: ["switch_port", "port", "lan_port"] },
  { id: "band", label: "Band", keys: ["band", "wifi_band", "radio", "radio_name", "frequency_band"], fmt: (v) => {
      const s = String(v).toLowerCase().replace(/\s+/g, "");
      if (/^(ng|11ng|2g|2\.4|2\.4g|2\.4ghz|2ghz|band2g)$/.test(s)) return "2.4 GHz";
      if (/^(na|11na|11ac|5g|5|5ghz|band5g)$/.test(s)) return "5 GHz";
      if (/^(6e|6g|6|6ghz|band6g)$/.test(s)) return "6 GHz";
      return String(v);
    } },
  { id: "channel", label: "Channel", keys: ["channel", "wifi_channel"] },
  { id: "mode", label: "Wi-Fi Standard", keys: ["wifi_mode", "wifi_standard", "radio_proto", "protocol", "wifi_generation"] },
  { id: "signal", label: "Signal", keys: ["signal", "signal_strength", "signal_level", "rssi", "signal_dbm"], fmt: (v) => (/^-?\d+(\.\d+)?$/.test(String(v)) ? `${v} dBm` : String(v)) },
  { id: "snr", label: "Signal-to-noise", keys: ["snr", "noise"], fmt: (v) => (/^-?\d+(\.\d+)?$/.test(String(v)) ? `${v} dB` : String(v)) },
  { id: "txrate", label: "Link Speed (tx)", keys: ["tx_rate", "link_speed", "tx_link_speed", "tx_speed"], fmt: (v) => (/^\d+(\.\d+)?$/.test(String(v)) ? `${v} Mbps` : String(v)) },
  { id: "rxrate", label: "Link Speed (rx)", keys: ["rx_rate", "rx_link_speed", "rx_speed"], fmt: (v) => (/^\d+(\.\d+)?$/.test(String(v)) ? `${v} Mbps` : String(v)) },
  { id: "rx", label: "Downloaded", keys: ["rx_bytes", "wired_rx_bytes", "traffic_down", "download", "bytes_received"], fmt: (v) => hypFmtBytes(v) },
  { id: "tx", label: "Uploaded", keys: ["tx_bytes", "wired_tx_bytes", "traffic_up", "upload", "bytes_sent"], fmt: (v) => hypFmtBytes(v) },
  { id: "uptime", label: "Connected For", keys: ["uptime", "connected_time", "duration"], fmt: (v) => (/^\d+(\.\d+)?$/.test(String(v)) ? hypFmtDuration(v) : String(v)) },
  { id: "vendor", label: "Manufacturer", keys: ["oui", "vendor", "manufacturer", "device_vendor", "brand"] },
  { id: "model", label: "Model", keys: ["model", "device_model", "dev_vendor"] },
  { id: "os", label: "Operating System", keys: ["os_name", "os", "dev_family"] },
  { id: "guest", label: "Guest Network", keys: ["is_guest", "guest"], fmt: (v) => (v === true || v === "true" || v === "True" ? "Yes" : v === false || v === "false" || v === "False" ? "No" : String(v)) },
  { id: "blocked", label: "Blocked", keys: ["blocked", "is_blocked"], fmt: (v) => (v === true || v === "true" ? "Yes" : v === false || v === "false" ? "No" : String(v)) },
  { id: "first", label: "First Seen", keys: ["first_seen", "first_connected"], when: true },
  { id: "source", label: "Source", keys: ["source_type"], fmt: (v) => hypPrettyKey(v) }
];
// Attributes that say what the client is attached to (resolved to a name by the card when it can).
const HYP_CLIENT_ATTACH_KEYS = ["ap_name", "deco_device", "switch_name", "access_point", "ap", "node_name", "parent", "connected_to", "ap_mac", "switch_mac", "deco_mac", "bssid"];
const HYP_CLIENT_LASTSEEN_KEYS = ["last_seen", "last_activity", "last_time_reachable", "last_online", "last_connected", "last_active"];
const HYP_CLIENT_CONNECTION_KEYS = ["connection", "connection_type", "is_wired", "wired", "link_type"];
// Attributes that are plumbing, not information.
const HYP_CLIENT_NOISE = new Set([
  "friendly_name", "icon", "entity_picture", "latitude", "longitude", "gps_accuracy", "battery", "battery_level", "attribution", "editable",
  "id", "restored", "supported_features", "device_class", "state_class", "unit_of_measurement", "assumed_state", "options", "scanner", "name", "_id",
  "site_id", "user_id", "network_id", "ap_mac", "switch_mac", "deco_mac", "bssid"
]);

// Rows for the details panel of one client. `attrs` are the entity's attributes;
// `ctx` carries what the card knows from elsewhere: the resolved name of what it is
// attached to, its area, its on/offline state and when that last changed.
function hypClientInfo(attrs, ctx) {
  attrs = attrs || {};
  ctx = ctx || {};
  const now = ctx.now || Date.now();
  const used = new Set();
  const rows = [];
  const pick = (keys) => {
    for (const k of keys) {
      if (!(k in attrs)) continue;
      const v = attrs[k];
      if (v == null || v === "" || v === "unknown" || v === "unavailable" || (typeof v === "object")) continue;
      // every other name for the same thing is accounted for too, so it is not listed again below
      keys.forEach((o) => {
        if (o in attrs) used.add(o);
      });
      return { key: k, value: v };
    }
    return null;
  };
  const add = (label, value, title) => {
    if (value == null || value === "") return;
    rows.push({ label, value: String(value), title: title || String(value) });
  };

  // Status first: online / offline, and since when.
  const since = Number.isFinite(ctx.changed) ? hypRelTime(now - ctx.changed) : "";
  const state = ctx.online ? "Online" : "Offline";
  add("Status", since ? `${state} since ${since}` : state, since ? `${state} since ${new Date(ctx.changed).toLocaleString()}` : "");

  // Last online: the integration's own "last seen", else the moment it dropped off.
  const ls = pick(HYP_CLIENT_LASTSEEN_KEYS);
  if (ctx.online) {
    add("Last Online", "Now");
  } else {
    const t = ls ? hypParseWhen(ls.value) : NaN;
    if (Number.isFinite(t)) add("Last Online", hypRelTime(now - t), new Date(t).toLocaleString());
    else if (ls) add("Last Online", ls.value);
    else if (Number.isFinite(ctx.changed)) add("Last Online", hypRelTime(now - ctx.changed), new Date(ctx.changed).toLocaleString());
  }

  // What it is connected to.
  const attach = pick(HYP_CLIENT_ATTACH_KEYS);
  const raw = attach ? attach.value : "";
  add("Connected To", ctx.attachedTo || raw, raw && ctx.attachedTo && String(raw) !== ctx.attachedTo ? `${ctx.attachedTo} (${raw})` : "");

  // Wired or wireless.
  const conn = pick(HYP_CLIENT_CONNECTION_KEYS);
  if (conn) {
    const lv = String(conn.value).toLowerCase();
    const wired = conn.key === "is_wired" || conn.key === "wired" ? conn.value === true || lv === "true" : lv === "wired" || lv === "lan" || lv === "ethernet";
    const wireless = conn.key === "is_wired" || conn.key === "wired" ? false : lv === "wireless" || lv === "wlan" || lv === "wifi" || lv === "wi-fi";
    add("Connection", wired ? "Wired" : wireless ? "Wireless" : hypPrettyKey(conn.value));
  }
  if (attrs.switch_mac && !conn) {
    used.add("switch_mac");
    add("Connection", "Wired");
  }

  HYP_CLIENT_FIELDS.forEach((f) => {
    const hit = pick(f.keys);
    if (!hit) return;
    if (f.when) {
      const t = hypParseWhen(hit.value);
      add(f.label, Number.isFinite(t) ? hypRelTime(now - t) : hit.value, Number.isFinite(t) ? new Date(t).toLocaleString() : "");
    } else {
      add(f.label, f.fmt ? f.fmt(hit.value) : hit.value);
    }
  });
  if (ctx.area) add("Area", ctx.area);

  // Everything else a tracker reports that is a plain value, so nothing useful is hidden.
  let extras = 0;
  Object.keys(attrs).forEach((k) => {
    if (used.has(k) || HYP_CLIENT_NOISE.has(k) || extras >= 10) return;
    const v = attrs[k];
    if (v == null || v === "" || typeof v === "object" || v === "unknown" || v === "unavailable") return;
    const t = hypParseWhen(v);
    add(hypPrettyKey(k), Number.isFinite(t) ? hypRelTime(now - t) : typeof v === "boolean" ? (v ? "Yes" : "No") : v, Number.isFinite(t) ? new Date(t).toLocaleString() : "");
    extras++;
  });
  return rows;
}

// Sorts a Homelab host's sensors into the roles the details panel shows: CPU, memory,
// disk, uptime, temperature, load and network. `list` is [{ id, name, key, unit, dc, state }]
// where `key` is the entity's translation key (or "") and `dc` its device class.
// Chooses the best sensor for each role - a percentage beats a raw number.
function hypClassifyHostSensors(list) {
  const best = {};
  const take = (role, item, score) => {
    if (!best[role] || score > best[role].score) best[role] = { item, score };
  };
  list.forEach((it) => {
    if (it.state == null || it.state === "unknown" || it.state === "unavailable") return;
    const key = `${it.key || ""} ${it.id} ${it.name || ""}`.toLowerCase().replace(/[_.]/g, " ");
    const pct = it.unit === "%";
    const num = Number.isFinite(parseFloat(it.state));
    if (!num && it.dc !== "timestamp") return;
    if (it.dc === "temperature") return take("temp", it, 5);
    if (/uptime|up time|boot/.test(key) && (it.dc === "duration" || /^(s|min|h|d)$/i.test(it.unit || "") || it.dc === "timestamp")) return take("uptime", it, it.dc === "duration" ? 5 : 3);
    if (/\bswap\b/.test(key)) return;
    if (/\bcpu\b|processor/.test(key) && !/temp|freq|model|core|thread|count|max|size|socket|speed/.test(key)) return take("cpu", it, (pct ? 5 : 1) + (/usage|used|percent|load/.test(key) ? 1 : 0));
    if (/\b(memory|mem|ram)\b/.test(key)) {
      if (/total|max|size|capacity/.test(key)) return take("memTotal", it, 3);
      if (/free|avail/.test(key)) return;
      if (pct) return take("mem", it, 5 + (/percent|usage/.test(key) ? 1 : 0));
      if (/used|usage/.test(key)) return take("memUsed", it, 3);
      return;
    }
    if (/\b(disk|storage|rootfs|filesystem|hdd)\b/.test(key) && !/io|read|write|speed|rate/.test(key)) {
      if (/total|max|size|capacity/.test(key)) return take("diskTotal", it, 3);
      if (/free|avail/.test(key)) return;
      if (pct) return take("disk", it, 5 + (/percent|usage/.test(key) ? 1 : 0));
      if (/used|usage/.test(key)) return take("diskUsed", it, 3);
      return;
    }
    if (/\bload\b/.test(key) && !/cpu/.test(key)) return take("load", it, 3);
    if (/(net|network).*(in|rx|recei|down)|\bnetin\b|\brx\b|incoming/.test(key)) return take("netIn", it, 3);
    if (/(net|network).*(out|tx|sent|up)|\bnetout\b|\btx\b|outgoing/.test(key)) return take("netOut", it, 3);
  });
  const out = {};
  Object.keys(best).forEach((r) => (out[r] = best[r].item));
  return out;
}

// --- Tree --------------------------------------------------------------
// Turns the card's configuration into one tree. The router is the root
// because it is the hub the whole network hangs off; the Internet is just
// its first neighbour. (Hyperbolic views are about re-centring, so which
// node is "the top" is only where you start, not a limit on the view.)
//
// Each node carries only static information - entity ids, colors, icons.
// Live state (online/offline, rates, labels) is read from `hass` at render
// time, so the layout never changes when a sensor does.

const HYP_RHO = { service: 0.27, group: 0.3, hub: 0.4, switch: 0.36, ap: 0.36, homelab: 0.34, lan: 0.3, client: 0.27, count: 0.22, container: 0.22 };

// `grouping` is null for one flat Clients hub, or - when Group By is on - a
// list of { name, indexes } (indexes into extra.clientDevices) as worked
// out from live state by the card; the tree itself stays pure.
// `extra` carries what also depends on live state: clientDevices (the
// configured clients plus any internal monitored services placed with
// them) and external (monitored services that sit beyond the router).
function buildHyperbolicTree(config, grouping, extra) {
  extra = extra || {};
  const seen = new Set();
  const uid = (base) => {
    let id = base;
    let n = 2;
    while (seen.has(id)) id = `${base}_${n++}`;
    seen.add(id);
    return id;
  };

  const mk = (kind, base, props) => ({
    id: uid(base),
    kind,
    children: [],
    rho: HYP_RHO[kind] ?? 0.3,
    ...props
  });

  // A Connected Clients circle becomes a small leaf under its parent.
  const countLeaf = (parent, cfg, base) => {
    const ent = cfg.entities && cfg.entities.connected_devices;
    if (!ent) return;
    parent.children.push(
      mk("count", `${base}.devices`, {
        name: "",
        icon: cfg.devices_icon || "mdi:devices",
        entity: ent,
        colors: {
          circle: cfg.colors?.devices_circle || "var(--purple-color)",
          icon: cfg.colors?.devices_icon || "var(--primary-color)",
          offline: cfg.colors?.devices_offline_circle || "var(--error-color)"
        },
        edge: { dashed: false }
      })
    );
  };

  const colorsOf = (cfg, fallback) => ({
    circle: cfg.colors?.circle || fallback,
    icon: cfg.colors?.icon || fallback,
    offline: cfg.colors?.offline_circle || "var(--error-color)",
    offlineIcon: cfg.colors?.offline_icon || "var(--error-color)"
  });

  const addChildrenOf = (node, cfg, base) => {
    (cfg.access_points || []).forEach((ap, i) => node.children.push(makeAp(ap, `${base}.ap${i}`)));
    (cfg.fed_switches || []).forEach((sw, i) => node.children.push(makeSwitch(sw, `${base}.sw${i}`, "mdi:switch")));
    (cfg.homelabs || []).forEach((hl, i) => node.children.push(makeHomelab(hl, `${base}.hl${i}`)));
  };

  function makeAp(ap, base) {
    const node = mk("ap", base, {
      name: ap.name || "",
      icon: ap.icon || "mdi:wifi",
      entity: ap.entity || "",
      cfg: ap,
      isPrimary: !!ap.is_primary,
      colors: colorsOf(ap, "var(--primary-color)"),
      ipChips: ap.entities?.ip_address ? [{ label: "IP", entity: ap.entities.ip_address }] : [],
      edge: {
        dashedUnlessWired: true,
        down: ap.entities?.download || "",
        up: ap.entities?.upload || "",
        downColor: ap.colors?.download,
        upColor: ap.colors?.upload
      },
      metrics: [
        { key: "download", label: "Download", icon: "mdi:arrow-down", entity: ap.entities?.download || "" },
        { key: "upload", label: "Upload", icon: "mdi:arrow-up", entity: ap.entities?.upload || "" },
        { key: "devices", label: "Clients", icon: "mdi:devices", entity: ap.entities?.connected_devices || "", integer: true }
      ]
    });
    countLeaf(node, ap, base);
    addChildrenOf(node, ap, base);
    return node;
  }

  function makeSwitch(sw, base, defaultIcon) {
    const node = mk("switch", base, {
      name: sw.name || "",
      icon: sw.icon || defaultIcon,
      entity: sw.entity || "",
      cfg: sw,
      colors: colorsOf(sw, "var(--amber-color)"),
      edge: { dashed: false },
      ipChips: sw.entities?.ip_address ? [{ label: "IP Address", entity: sw.entities.ip_address, slot: "device" }] : [],
      metrics: [{ key: "devices", label: "Clients", icon: "mdi:devices", entity: sw.entities?.connected_devices || "", integer: true }]
    });
    countLeaf(node, sw, base);
    addChildrenOf(node, sw, base);
    return node;
  }

  function makeHomelab(hl, base) {
    const node = mk("homelab", base, {
      name: hl.name || "",
      icon: hl.icon || "mdi:server",
      entity: hl.entity || "",
      cfg: hl,
      colors: colorsOf(hl, "var(--deep-purple-color)"),
      edge: { dashed: false },
      ipChips: hl.entities?.ip_address ? [{ label: "IP Address", entity: hl.entities.ip_address, slot: "device" }] : [],
      metrics: [{ key: "devices", label: "Clients", icon: "mdi:devices", entity: hl.entities?.connected_devices || "", integer: true }]
    });
    countLeaf(node, hl, base);
    (hl.containers || []).forEach((c, i) => {
      if (!c.entity) return;
      node.children.push(
        mk("container", `${base}.c${i}`, {
          name: c.name || "",
          icon: c.icon || "mdi:docker",
          entity: c.entity,
          colors: { circle: c.color || "var(--green-color)", icon: c.color || "var(--green-color)", offline: "var(--error-color)" },
          edge: { dashed: false }
        })
      );
    });
    return node;
  }

  // Everything that hangs off the main bus, in the order the Nodes menu
  // lists it - same three shapes the Flat view's topology walks.
  const busNodes = [];
  (config.nodes || []).forEach((n, i) => {
    const base = `n${i}`;
    const kids = [...(n.access_points || []), ...(n.fed_switches || []), ...(n.homelabs || [])];
    if (n.switch && kids.length) {
      const sw = makeSwitch(n.switch, base, "mdi:switch");
      // makeSwitch already walked n.switch's own lists; a Node's APs /
      // fed switches / homelabs live on the Node, so walk those too.
      addChildrenOf(sw, n, base);
      busNodes.push(sw);
    } else if (n.switch) {
      busNodes.push(makeSwitch(n.switch, base, "mdi:switch"));
    } else if (n.homelab) {
      busNodes.push(makeHomelab(n.homelab, base));
    } else {
      (n.access_points || []).forEach((ap, j) => busNodes.push(makeAp(ap, `${base}.ap${j}`)));
    }
  });

  // A monitored service drawn as its own node - in the External branch or
  // among the clients. Looks like a client, plus a state badge.
  const makeService = (svc) => {
    const sc = svc.colors || {};
    const slug = String(svc.entity || "service").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return mk("service", `svc_${slug}`, {
      name: svc.name || "",
      icon: svc.icon || "mdi:heart-pulse",
      entity: svc.entity || "",
      svc,
      colors: {
        circle: sc.circle || "var(--pink-color)",
        icon: sc.icon || "var(--pink-color)",
        offline: sc.offline_circle || "var(--error-color)",
        offlineIcon: sc.offline_icon || "var(--error-color)"
      },
      edge: { dashed: true }
    });
  };

  // Clients box -> one hub; with Group By on, one sub-hub per group
  // (Wired, an SSID, a VLAN ...) and the devices as leaves beneath it.
  const devs = extra.clientDevices || config.individual_devices || [];
  // With `extra.attach` set, clients hang directly off the access point or
  // switch they are connected to (no Clients hub); without it they sit
  // under one Clients hub, optionally split into groups.
  const attachedMode = Array.isArray(extra.attach);
  const mkClient = (d, i) =>
    d._monitor ? makeService(d._monitor) : mk("client", `client${i}`, {
      name: d.name || "",
      icon: d.icon || "mdi:devices",
      entity: d.entity || "",
      cfg: d,
      colors: {
        circle: d.colors?.circle || "var(--pink-color)",
        icon: d.colors?.icon || "var(--pink-color)",
        offline: d.colors?.offline_circle || "var(--error-color)",
        offlineIcon: d.colors?.offline_icon || "var(--error-color)"
      },
      edge: { dashed: true },
      presence: true
    });
  let clients = null;
  if (devs.length && !attachedMode) {
    clients = mk("hub", "clients", {
      name: "Clients",
      icon: "mdi:devices",
      entity: "",
      colors: { circle: "var(--pink-color)", icon: "var(--pink-color)", offline: "var(--error-color)" },
      edge: { dashed: true },
      isClientsHub: true,
      rho: 0.32
    });
    if (grouping && grouping.length) {
      const groupBy = config.individual_devices_group_by;
      const iconFor = (name) => {
        if (name === "Wired") return "mdi:ethernet";
        if (name === "Guest") return "mdi:account-multiple";
        if (name === "Unknown") return "mdi:help-network";
        return { ssid: "mdi:wifi", vlan: "mdi:lan", ap: "mdi:access-point", area: "mdi:floor-plan" }[groupBy] || "mdi:devices";
      };
      const overrides = config.individual_devices_group_colors || [];
      grouping.forEach((g) => {
        const idxs = (g.indexes || []).filter((i) => i >= 0 && devs[i]);
        if (!idxs.length) return;
        const o = overrides.find((x) => x.name === g.name);
        const col = (o && o.color) || config.individual_devices_group_border_color || "var(--pink-color)";
        const slug = String(g.name).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "group";
        const gn = mk("group", `group_${slug}`, {
          name: g.name,
          icon: iconFor(g.name),
          entity: "",
          colors: { circle: col, icon: col, offline: "var(--error-color)" },
          edge: { dashed: true }
        });
        idxs.forEach((i) => gn.children.push(mkClient(devs[i], i)));
        clients.children.push(gn);
      });
    } else {
      devs.forEach((d, i) => clients.children.push(mkClient(d, i)));
    }
  }

  // --- Assemble around the router -------------------------------------
  const internetCfg = config.internet || {};
  const hasInternet = !!(internetCfg.entity || internetCfg.entities?.download || internetCfg.entities?.ping);
  const makeInternet = (cfg, base, label, wanIpEntity, isSecondary) =>
    mk("hub", base, {
      name: cfg.name || label,
      icon: cfg.icon || "mdi:web",
      entity: cfg.entity || "",
      cfg,
      isInternet: true,
      // The data-quota ring drawn around the circle: how much of the plan
      // is left, from the same two entities and colours Flat uses.
      quota: {
        total: cfg.entities?.quota_total || "",
        remaining: cfg.entities?.quota_remaining || "",
        colorRem: cfg.colors?.quota_remaining || "var(--divider-color)",
        colorProg: cfg.colors?.quota_progress || "var(--green-color)"
      },
      isSecondary: !!isSecondary,
      standbyBackup: !!isSecondary && cfg.mode === "active_standby",
      ipChips: wanIpEntity ? [{ label: "WAN IP", entity: wanIpEntity, slot: "wan" }] : [],
      colors: colorsOf(cfg, "var(--green-color)"),
      edge: {
        // The tree runs router -> internet, so what the card calls
        // "download" flows child -> parent here.
        flip: true,
        down: cfg.entities?.download || "",
        up: cfg.entities?.upload || "",
        downColor: config.summary_realtime_download_color,
        upColor: config.summary_realtime_upload_color,
        standby: cfg.mode === "active_standby"
      },
      metrics: [
        { key: "ping", label: "Ping", icon: "mdi:speedometer", entity: cfg.entities?.ping || "" },
        { key: "jitter", label: "Jitter", icon: "mdi:chart-bell-curve", entity: cfg.entities?.jitter || "" },
        { key: "download", label: "Download", icon: "mdi:arrow-down", entity: cfg.entities?.download || "" },
        { key: "upload", label: "Upload", icon: "mdi:arrow-up", entity: cfg.entities?.upload || "" },
        { key: "total_download", label: "Downloaded", icon: "mdi:download", entity: cfg.entities?.total_download || "" },
        { key: "total_upload", label: "Uploaded", icon: "mdi:upload", entity: cfg.entities?.total_upload || "" }
      ]
    });

  const lanCfg = config.lan || {};
  const lanNode = lanCfg.entity
    ? mk("lan", "lan", {
        name: "LAN",
        icon: lanCfg.icon || "mdi:lan",
        entity: lanCfg.entity,
        cfg: lanCfg,
        colors: colorsOf(lanCfg, "var(--teal-color)"),
        edge: { dashed: false }
      })
    : null;

  const swCfg = config.switch || {};
  let topSwitch = null;
  if (swCfg.entity) {
    topSwitch = makeSwitch(swCfg, "switch", "mdi:switch");
    topSwitch.isTopSwitch = true;
    topSwitch.children.push(...busNodes);
  }

  const routerCfg = config.router || {};
  const secondary = config.internet_secondary;
  const downstream = [...(lanNode ? [lanNode] : []), ...(topSwitch ? [topSwitch] : busNodes), ...(clients ? [clients] : [])];
  const internets = [];
  if (hasInternet) internets.push(makeInternet(internetCfg, "internet", "Internet", routerCfg.entities?.wan_ip));
  if (secondary && (secondary.entity || secondary.entities?.download)) {
    internets.push(makeInternet(secondary, "internet2", "Backup Internet", routerCfg.entities?.wan_ip_secondary, true));
  }

  // External monitored services connect straight to the Internet node - no
  // box or hub in between. (Flat draws them in an External box above it;
  // here each service is simply a branch of the Internet circle.)
  const externalNodes = (extra.external || []).map((svc) => makeService(svc));

  let root;
  if (routerCfg.entity) {
    root = mk("hub", "router", {
      name: routerCfg.name || "",
      icon: routerCfg.icon || "mdi:router-network",
      entity: routerCfg.entity,
      cfg: routerCfg,
      isRouter: true,
      // WAN addresses first (primary, then secondary if there is one), then LAN.
      ipChips: [
        routerCfg.entities?.wan_ip && { label: "WAN IP", entity: routerCfg.entities.wan_ip, slot: "wan" },
        routerCfg.entities?.wan_ip_secondary && { label: "Secondary WAN IP", entity: routerCfg.entities.wan_ip_secondary, slot: "wan" },
        routerCfg.entities?.lan_ip && { label: "LAN IP", entity: routerCfg.entities.lan_ip, slot: "lan" }
      ].filter(Boolean),
      colors: colorsOf(routerCfg, "var(--indigo-color)"),
      edge: {},
      metrics: [
        { key: "download", label: "Download", icon: "mdi:arrow-down", entity: routerCfg.entities?.download || "" },
        { key: "upload", label: "Upload", icon: "mdi:arrow-up", entity: routerCfg.entities?.upload || "" },
        { key: "devices", label: "Total clients", icon: "mdi:devices", entity: routerCfg.entities?.connected_devices || "", integer: true }
      ]
    });
    // Internet leads, so the first thing at the top of the disk is the
    // WAN - the same place it sits in the Flat view.
    root.children.push(...internets, ...downstream);
  } else if (internets.length) {
    root = internets[0];
    root.edge = {};
    root.children.push(...internets.slice(1), ...downstream);
  } else {
    root = mk("hub", "network", {
      name: config.title || "Network",
      icon: "mdi:lan",
      entity: "",
      colors: { circle: "var(--primary-color)", icon: "var(--primary-color)", offline: "var(--error-color)" },
      edge: {}
    });
    root.children.push(...downstream);
  }
  if (externalNodes.length) (internets[0] || root).children.push(...externalNodes);

  if (attachedMode && devs.length) {
    // Index every device a client could be connected to by each name, MAC
    // and id it is known by. A key that belongs to two devices is dropped
    // rather than guessed at.
    const index = new Map();
    const walk = (n) => {
      if (n.kind === "ap" || n.kind === "switch" || n.isRouter) {
        const own = new Set(extra.matchKeys ? extra.matchKeys(n) : []);
        own.forEach((k) => {
          if (k) index.set(k, index.has(k) ? null : n);
        });
      }
      n.children.forEach(walk);
    };
    walk(root);

    let unknown = null;
    let monitored = null;
    const hub = (name, icon, id, circle, iconColor) =>
      mk("group", id, {
        name,
        icon,
        entity: "",
        colors: {
          circle: circle || "var(--pink-color)",
          icon: iconColor || circle || "var(--pink-color)",
          offline: "var(--error-color)"
        },
        edge: { dashed: true }
      });
    devs.forEach((d, i) => {
      if (d._monitor) {
        // A monitored service placed "with the clients" has no access
        // point of its own, so it gets a Monitored group off the router.
        monitored = monitored || hub("Monitored", "mdi:heart-pulse", "monitored");
        monitored.children.push(makeService(d._monitor));
        return;
      }
      const key = extra.attach[i];
      const parent = key ? index.get(key) : null;
      const node = mkClient(d, i);
      if (parent) {
        parent.children.push(node);
      } else {
        // Colours come from the Clients page (blank = the default pink; an
        // icon colour left blank follows the circle colour).
        unknown =
          unknown ||
          hub("Unknown", "mdi:help-network", "unknown", config.hyperbolic_unknown_circle_color, config.hyperbolic_unknown_icon_color);
        unknown.children.push(node);
      }
    });
    if (unknown) root.children.push(unknown);
    if (monitored) root.children.push(monitored);
  }

  // Node sizes: the overall Node Size multiplies a size for each kind of
  // node, both set as percentages in the editor. It is applied here, in the
  // tree, so the layout can leave room for bigger nodes. `baseRho` keeps the
  // unscaled size so the layout knows how much a node was enlarged.
  const pctOf = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n / 100 : 1;
  };
  const clampF = (f, lo, hi) => Math.max(lo, Math.min(hi, f));
  const globalF = clampF(pctOf(config.hyperbolic_node_scale ?? 100), 0.4, 2);
  const typeKey = (n) => {
    if (n.isInternet) return "internet";
    if (n.isRouter) return "router";
    switch (n.kind) {
      case "lan": return "lan";
      case "switch": return "switch";
      case "ap": return "ap";
      case "homelab": return "homelab";
      case "count": return "count";
      default: return "client"; // clients, services, containers, groups, the Clients hub
    }
  };
  const sizeWalk = (n) => {
    n.baseRho = n.rho;
    n.rho = n.rho * globalF * clampF(pctOf(config[`hyperbolic_size_${typeKey(n)}`] ?? 100), 0.4, 2);
    n.children.forEach(sizeWalk);
  };
  sizeWalk(root);
  return root;
}

// --- Layout ------------------------------------------------------------
// Each node is placed in its parent's own frame: out along a ray, at a
// fixed hyperbolic distance, inside a wedge of the circle shared out by
// how many leaves it has beneath it. Composing the parent's frame with a
// translation gives the child's frame, so the placement is exact for the
// whole tree, not a flat approximation.
function layoutHyperbolicTree(root, opts = {}) {
  const baseStep = opts.step ?? 1.15;
  const nodes = [];
  const byId = Object.create(null);

  const countLeaves = (n) => {
    n.leaves = n.children.length ? n.children.reduce((s, c) => s + countLeaves(c), 0) : 1;
    return n.leaves;
  };
  countLeaves(root);

  const place = (node, frame, away, depth, wedge) => {
    node.z = hypApply(frame, [0, 0]);
    node.depth = depth;
    nodes.push(node);
    byId[node.id] = node;
    const kids = node.children;
    const n = kids.length;
    if (!n) return;

    const weights = kids.map((k) => Math.pow(k.leaves, 0.6));
    const total = weights.reduce((s, w) => s + w, 0);
    let span;
    let start;
    if (away === null) {
      span = 2 * Math.PI;
      // First child's wedge is centred straight up.
      start = -Math.PI / 2 - (weights[0] / total) * span * 0.5;
    } else {
      // A branch may fan out no wider than a bit more than the wedge its
      // parent gave it, so neighbouring branches stay out of each other's
      // way instead of every one spreading as wide as it likes.
      span = Math.min(1.6 * Math.PI, 0.45 * Math.PI + 0.35 * Math.PI * (n - 1), Math.max(0.55 * Math.PI, wedge * 1.5));
      start = away - span / 2;
    }
    // Pushes a crowded node's children further out so they never sit on
    // top of one another: asinh(n * gap / span) is the distance at which
    // the arc available holds n nodes of the gap size.
    // Room for the nodes. Three things set how far out the children go:
    // the default spacing (unchanged when nothing is enlarged), enough
    // distance from the parent for the two circles not to touch, and - exact,
    // not approximate - that no two neighbouring children overlap. For two
    // children at distance `step` and angle `da` apart, the gap between them
    // satisfies sinh(gap / 2) = sinh(step) * sin(da / 2), so the step needed
    // for a gap g is asinh(sinh(g / 2) / sin(da / 2)).
    const grow = Math.max(1, ...kids.map((k) => k.rho / (k.baseRho || k.rho)));
    const needed = Math.asinh((n * 0.62 * grow) / span);
    const touch = (node.rho + Math.max(...kids.map((k) => k.rho))) * 1.15 + 0.1;
    let clear = 0;
    if (n > 1) {
      const pairs = away === null ? n : n - 1;
      for (let i = 0; i < pairs; i++) {
        const j = (i + 1) % n;
        const da = (((weights[i] + weights[j]) / 2) / total) * span;
        const s = Math.sin(Math.min(da, Math.PI) / 2);
        if (s > 1e-6) {
          const g = (kids[i].rho + kids[j].rho) * 1.04;
          clear = Math.max(clear, Math.asinh(Math.sinh(g / 2) / s));
        }
      }
    }
    const step = Math.max(baseStep, needed, touch, clear);
    const r = Math.tanh(step / 2);

    let cum = 0;
    kids.forEach((kid, i) => {
      const w = weights[i];
      const alpha = n === 1 && away !== null ? away : start + ((cum + w / 2) / total) * span;
      cum += w;
      const p = [r * Math.cos(alpha), r * Math.sin(alpha)];
      kid.parentNode = node;
      place(kid, hypCompose(frame, hypTranslation(p)), alpha, depth + 1, (w / total) * span);
    });
  };

  place(root, HYP_IDENTITY, null, 0, 2 * Math.PI);
  return { root, nodes, byId };
}


class NetworkFlowCard extends i {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true }
    };
  }

  constructor() {
    super();
    this._trackedEntityIds = new Set();
    this._hasAlignedOnce = false;
    this._isVisible = true;
    this._visibilityObserver = null;
    this._resizeObserver = null;
    this._alignRaf = null;
    this._monitorPlan = null;
    this._monitorTargetIds = new Set();
    this._topologyHasClients = false;
    this._needsRealign = false;
    this._autoScaleValue = 100;
    this._autoScaleSettled = false;
    this._autoScaleAttempts = 0;
    this._autoScaleRaf = null;
  }

  static getConfigElement() {
    // The editor used to be lazy-loaded from a separate file. It's now
    // defined directly in this same file (see the note near the top of
    // the file explaining why), so there's nothing left to fetch here -
    // the element is always already registered by the time this runs.
    return document.createElement("network-flow-card-editor");
  }

  static getStubConfig() {
    const stub = { ...DEFAULT_CONFIG };
    delete stub.view_mode;
    delete stub.flat_show_details;
    Object.keys(stub).forEach((k) => {
      if (k.startsWith("hyperbolic_")) delete stub[k];
    });
    return stub;
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    const migrated = migrateCardSize(migrateBillingToQuota(migrateAccessPointsToNodes(config)));
    const merged = deepMerge(DEFAULT_CONFIG, migrated);
    // `animation` was the legacy flow-dot setting and used to default on.
    // The new master switch is deliberately a fresh opt-in key so upgrading
    // an existing card cannot silently carry the old default forward.
    delete merged.animation;
    // Optional backup WAN - merged onto the same defaults as the primary,
    // or null when it was never configured.
    merged.internet_secondary = migrated.internet_secondary
      ? deepMerge(DEFAULT_INTERNET, migrated.internet_secondary)
      : null;
    // Active/Active (both carry traffic, solid lines) unless set otherwise.
    if (merged.internet_secondary && !merged.internet_secondary.mode) {
      // Two Internet services are far more often a primary + failover
      // backup than a true load-balanced pair, so Active/Standby - the
      // dashed, "this is the backup" look - is the safer assumption for
      // anyone who adds a second Internet without touching Mode at all.
      merged.internet_secondary.mode = "active_standby";
    }
    merged.nodes = (migrated.nodes || []).map((node) => {
      const mergedNode = deepMerge(DEFAULT_NODE, node);
      mergedNode.switch = node.switch ? deepMerge(DEFAULT_NODE_SWITCH, node.switch) : null;
      mergedNode.homelab = node.homelab ? normalizeHomelab(node.homelab) : null;
      if (node.homelabs) mergedNode.homelabs = node.homelabs.map(normalizeHomelab);
      mergedNode.access_points = (node.access_points || []).map(normalizeAccessPoint);
      mergedNode.fed_switches = (node.fed_switches || []).map(normalizeFedSwitch);
      return mergedNode;
    });
    merged.individual_devices = (config.individual_devices || []).map((dev) =>
      deepMerge(DEFAULT_INDIVIDUAL_DEVICE, dev)
    );
    merged.monitoring = normalizeMonitoring(migrated.monitoring);
    this._config = merged;
    // Devices a monitored service can be attached to, computed once per
    // config (the plan itself is rebuilt each render, since Type: Auto
    // depends on live entity data).
    this._monitorTargetIds = new Set(listMonitorAssignTargets(null, merged).map((t) => t.entity));
    this._monitorPlan = null;
    // Drives shouldUpdate below - recomputed here (config changes are
    // rare) rather than on every hass tick.
    this._trackedEntityIds = collectEntityIdsFromConfig(merged);
    this._topologyHasClients = merged.individual_devices.length > 0;
    this._topology = buildNetworkTopology(merged);
    if (merged.view_mode !== "hyperbolic") merged.view_mode = "flat";
    this.toggleAttribute("hyperbolic", merged.view_mode === "hyperbolic" || merged.flat_show_details === true);
    this._hypInit(merged);
    // Auto Scale re-measures from a clean slate after any config edit -
    // a brief single-frame flash back to 100% is harmless and self-corrects
    // before the next paint, and is far simpler than trying to decide
    // whether THIS particular edit could have changed the diagram's width.
    this._autoScaleValue = 100;
    this._autoScaleSettled = false;
    this._autoScaleAttempts = 0;

    // animation is a true master switch. Existing configs that explicitly
    // opted in remain enabled; new/default configs are disabled.
    this.toggleAttribute("animations-disabled", merged.enable_animations !== true);
    this.toggleAttribute("compact-mode", merged.card_size === "compact");
    this.toggleAttribute("hide-names", merged.diagram_hide_names === true);
  }

  // Without this, LitElement's default (return true) means this card
  // fully re-renders on EVERY hass update anywhere in the house - any
  // sensor, in any room, unrelated to this card entirely - since HA's
  // frontend gives every card a new top-level hass object reference on
  // every state-changed event. On a non-trivial instance this alone
  // was a real, measurable source of dashboard slowdown. HA keeps
  // per-entity state objects referentially stable when that specific
  // entity didn't change, so comparing old/new hass.states[id] by
  // reference for just the entities this card actually displays is
  // both correct and cheap - no need to inspect the objects' contents.
  shouldUpdate(changedProps) {
    if (changedProps.has("_config")) return true;
    if (!changedProps.has("hass")) return true;

    // Hidden cards (another dashboard/view, collapsed section, scrolled far
    // away) do not need to spend CPU rebuilding templates for live sensor
    // updates. `hass` still receives the newest value; IntersectionObserver
    // requests one catch-up render as soon as the card becomes visible again.
    if (!this._isVisible) return false;

    const oldHass = changedProps.get("hass");
    if (!oldHass || !this.hass) return true;
    if (oldHass.states === this.hass.states) return false;
    for (const id of this._trackedEntityIds) {
      if (oldHass.states[id] !== this.hass.states[id]) return true;
    }
    return false;
  }

  getCardSize() {
    return this._config && (this._config.view_mode === "hyperbolic" || this._config.flat_show_details === true) ? 7 : 4;
  }

  connectedCallback() {
    super.connectedCallback();

    if (typeof ResizeObserver !== "undefined" && !this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._hypActive()) { this._hypMeasure(); if (this._config.view_mode === "hyperbolic") this._hypMeasureFit(); }
        this._scheduleAutoScale();
        this._scheduleAlignBusLine();
      });
      this._resizeObserver.observe(this);
    }

    if (typeof IntersectionObserver !== "undefined" && !this._visibilityObserver) {
      this._visibilityObserver = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        const visible = !!entry?.isIntersecting;
        if (visible === this._isVisible) return;

        this._isVisible = visible;
        this.toggleAttribute("data-offscreen", !visible);

        if (visible) {
          // `hass` kept advancing while renders were suppressed. Render once
          // with the latest snapshot and re-measure layout after becoming visible.
          this.requestUpdate();
          this._scheduleAlignBusLine();
        }
      }, { threshold: 0 });
      this._visibilityObserver.observe(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._visibilityObserver) {
      this._visibilityObserver.disconnect();
      this._visibilityObserver = null;
    }
    if (this._alignRaf != null) {
      cancelAnimationFrame(this._alignRaf);
      this._alignRaf = null;
    }
    if (this._autoScaleRaf != null) {
      cancelAnimationFrame(this._autoScaleRaf);
      this._autoScaleRaf = null;
    }
    this._hypCancelAll();
    this._hypUnbindWindow();
  }

  _scheduleAutoScale() {
    if (this._config?.card_size !== "fit_to_width" && !this._flatFitForced) return;
    if (!this._isVisible || this._autoScaleRaf != null) return;
    this._autoScaleRaf = requestAnimationFrame(() => {
      this._autoScaleRaf = null;
      this._computeAutoScale();
    });
  }

  // Measures the diagram's current width against the space available for
  // it and adjusts the zoom to fit, repeating (via requestUpdate, which
  // triggers another render + updated() pass) until a measurement confirms
  // the current zoom is already the right one. A hard cap on attempts is a
  // safety net against looping forever if some edge case this hasn't
  // accounted for stops it from ever settling.
  _computeAutoScale() {
    const root = this.shadowRoot;
    const layout = root?.querySelector(".flow-main-layout");
    const wrap = root?.querySelector(".diagram-scale-wrap");
    if (!layout || !wrap || (this._autoScaleAttempts ?? 0) >= 6) {
      this._autoScaleSettled = true;
      this._scheduleAlignBusLine();
      return;
    }
    const containerWidth = layout.getBoundingClientRect().width;
    let naturalWidth = naturalWidthFromScroll(wrap.scrollWidth, this._autoScaleValue ?? 100);
    if (this._flatDetailsOn()) {
      const prevZoom = wrap.style.zoom;
      wrap.style.zoom = "";
      let minLeft = Infinity;
      let maxRight = -Infinity;
      wrap.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width || r.height) {
          if (r.left < minLeft) minLeft = r.left;
          if (r.right > maxRight) maxRight = r.right;
        }
      });
      wrap.style.zoom = prevZoom;
      if (maxRight > minLeft) naturalWidth = Math.ceil(maxRight - minLeft);
      // a few pixels of border or badge poking out is not a reason to shrink a whole step
      if (naturalWidth - containerWidth <= 8) naturalWidth = Math.min(naturalWidth, containerWidth);
    }
    const ideal = computeAutoScale(containerWidth, naturalWidth, 40, 5);
    if (ideal !== this._autoScaleValue) {
      this._autoScaleValue = ideal;
      this._autoScaleSettled = false;
      this._autoScaleAttempts = (this._autoScaleAttempts ?? 0) + 1;
      this.requestUpdate();
    } else {
      this._autoScaleSettled = true;
      this._autoScaleAttempts = 0;
      this._scheduleAlignBusLine();
    }
  }

  // The zoom currently being applied to the diagram (Scaled or the live
  // Fit to Width value) - 1 for Normal/Compact, which don't use CSS zoom.
  _currentZoomFraction() {
    const cfg = this._config;
    if (!cfg) return 1;
    if (cfg.card_size === "scaled") {
      const v = Number(cfg.diagram_scale_value ?? 100);
      return v > 0 ? v / 100 : 1;
    }
    if (cfg.card_size === "fit_to_width" || this._flatFitForced) {
      const v = this._autoScaleValue ?? 100;
      return v > 0 ? v / 100 : 1;
    }
    return 1;
  }

  _scheduleAlignBusLine() {
    if (!this._isVisible || this._alignRaf != null) return;
    this._alignRaf = requestAnimationFrame(() => {
      this._alignRaf = null;
      this._alignBusLine();
    });
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (this._hypActive()) { this._hypMeasure(); this._hypCenterIcons(); this._hypSyncPopup(); }
    if (this._flatDetailsOn()) this._flatMarkSelection();
    const autoScaling = this._config?.card_size === "fit_to_width" || this._flatFitForced === true;
    if (autoScaling) this._scheduleAutoScale();
    // The bus-line's geometry only depends on config (sizes, labels,
    // how many nodes/columns exist) - never on an entity's live value -
    // so re-measuring it on every entity-triggered update (as opposed
    // to a config change or the very first render) was pure wasted
    // layout work.
    if (changedProps.has("_config") || !this._hasAlignedOnce || this._needsRealign) {
      this._hasAlignedOnce = true;
      this._needsRealign = false;
      // While Auto Scale is still converging, _computeAutoScale schedules
      // alignment itself once a render settles at a stable zoom - aligning
      // now would measure against a zoom that's about to change again.
      if (!autoScaling || this._autoScaleSettled) {
        this._scheduleAlignBusLine();
      }
    }
  }

  // The bus-line's endpoints need to reach the exact center of the
  // outermost AP columns, which depends on their actual rendered width
  // (circle size, devices-circle size, label text, single vs dual line -
  // whatever ends up being the widest thing in that column). Rather than
  // guessing this from config values before layout happens (which was
  // fragile and broke for the common case), measure the real rendered
  // positions after the browser has laid everything out, and set the
  // bus-line's margins to match exactly.
  _alignBusLine() {
    const root = this.shadowRoot;
    if (!root) return;
    const branches = root.querySelector(".branches");
    if (!branches) return;
    const busLine = branches.querySelector(".bus-line");
    if (!busLine) return;

    // Reset any previous shift before measuring - this write is
    // unavoidable before the first read below (we need the untransformed
    // geometry), but everything after this is READ-then-WRITE, batched
    // into two passes so the browser only has to flush layout once for
    // this whole pass instead of once per read/write alternation.
    branches.style.transform = "";
    const branchesRect = branches.getBoundingClientRect();

    // .vline/.vline-offline/.offline-x-mid are thin (~2px) - their own
    // left edge is effectively their center, so it's used directly.
    // .ap-col-fillline-wrap (the Primary AP's own extra devices column)
    // and, in fallback mode, .bus-top-connector itself are full-width
    // containers whose actual dotted/solid line sits centered inside -
    // for these, the midpoint is used instead of the raw edge.
    const isWideWrapper = (el) =>
      el.classList.contains("ap-col-fillline-wrap") || el.classList.contains("bus-top-connector");

    let candidates = Array.from(
      branches.querySelectorAll(".bus-top-connector .vline, .bus-top-connector .vline-offline, .bus-top-connector .offline-x-mid, .ap-col-fillline-wrap")
    );
    if (candidates.length < 2) {
      candidates = Array.from(
        branches.querySelectorAll(".bus-top-connector, .ap-col-fillline-wrap")
      );
    }
    if (candidates.length < 2) return;

    // --- READ PHASE: every getBoundingClientRect() call for this pass
    // happens here, before any style is written back, so the browser
    // does one layout flush for the whole batch instead of two.
    const refs = candidates.map((el) => {
      const rect = el.getBoundingClientRect();
      const wide = isWideWrapper(el);
      const center = rect.left + rect.width / 2;
      return {
        refLeft: wide ? center : rect.left,
        refRight: wide ? center : rect.left + rect.width,
        center
      };
    });
    const leftMost = refs.reduce((a, b) => (a.refLeft < b.refLeft ? a : b));
    const rightMost = refs.reduce((a, b) => (a.refRight > b.refRight ? a : b));

    const trunkEl = root.querySelector(".trunk");
    const trunkCircles = trunkEl
      ? Array.from(
          trunkEl.querySelectorAll(
            ":scope > .circle-wrap, :scope > .internet-row > .circle-wrap"
          )
        )
      : [];
    const feederCircle = trunkCircles[trunkCircles.length - 1];
    let feederRect = feederCircle ? feederCircle.getBoundingClientRect() : null;
    // Secondary Internet feeding the bus directly: there is no single
    // feeder circle, so the pair of circles' shared midpoint stands in,
    // and the two drop lines' x-positions must fall inside the bus-line.
    let dropLeftX = null;
    let dropRightX = null;
    if (!feederRect && trunkEl) {
      const dual = trunkEl.querySelector(":scope > .internet-row-dual");
      if (dual) {
        feederRect = dual.getBoundingClientRect();
        const colW = parseFloat(dual.dataset.colW) || 72;
        dropLeftX = feederRect.left + colW / 2;
        dropRightX = feederRect.right - colW / 2;
      }
    }
    const trunkDrop = branches.querySelector(".trunk-drop");

    // --- WRITE PHASE: every style mutation for this pass happens here,
    // after all reads above have completed.
    let shiftX = 0;
    let branchesMidpoint = 0;
    if (feederRect) {
      branchesMidpoint = (leftMost.center + rightMost.center) / 2;
      shiftX = feederRect.left + feederRect.width / 2 - branchesMidpoint;
    }
    let busLeft = leftMost.refLeft;
    let busRight = rightMost.refRight;
    if (dropLeftX != null) {
      // Widen the bus just enough to catch both Internet drop lines
      // (positions converted into the branches' pre-shift coordinates).
      busLeft = Math.min(busLeft, dropLeftX - shiftX);
      busRight = Math.max(busRight, dropRightX - shiftX);
    }
    // Every value below is a delta between two already-on-screen (already
    // zoomed) measurements; writing it back inside that same zoomed
    // ancestor would halve it again at, say, 50% zoom, so it's scaled back
    // up here first.
    const zoomComp = 1 / this._currentZoomFraction();
    const leftMargin = Math.max(0, busLeft - branchesRect.left) * zoomComp;
    const rightMargin = Math.max(0, branchesRect.right - busRight) * zoomComp;
    busLine.style.marginLeft = `${leftMargin}px`;
    busLine.style.marginRight = `${rightMargin}px`;
    this._busMarginLeft = leftMargin;
    this._busMarginRight = rightMargin;

    if (feederRect) {
      branches.style.transform = `translateX(${shiftX * zoomComp}px)`;
      this._branchesShiftX = shiftX * zoomComp;

      // The trunk-drop defaults to justify-self:center, which centers it
      // against the whole grid group's geometric width - the same wrong
      // reference point that caused the whole-block shift bug. Position
      // it explicitly at the same midpoint used above, so it can never
      // disagree with where the block was just shifted to.
      if (trunkDrop) {
        const trunkMarginLeft = (branchesMidpoint - branchesRect.left - 1) * zoomComp;
        trunkDrop.style.justifySelf = "start";
        trunkDrop.style.marginLeft = `${Math.max(0, trunkMarginLeft)}px`;
        this._trunkMarginLeft = trunkMarginLeft;
      }
    }
  }

  // --- Hyperbolic view (v4.0.0) -----------------------------------------
  // The layout (this._hypLayout) is built once per config in setConfig();
  // the only thing that changes while using the card is this._hyp.V, the
  // isometry that decides which node sits at the centre. Live sensor
  // updates re-render through the normal hass path and leave V alone, so a
  // state change never throws the person's view away.

  _hypCancelAnim() {
    if (this._hypAnimRaf != null) {
      cancelAnimationFrame(this._hypAnimRaf);
      this._hypAnimRaf = null;
    }
  }

  // Stops the pan and the zoom animations (a tap or drag only stops the pan:
  // a zoom already under way should finish).
  _hypCancelAll() {
    this._hypCancelAnim();
    if (this._hypZoomRaf != null) {
      cancelAnimationFrame(this._hypZoomRaf);
      this._hypZoomRaf = null;
    }
    this._hypZoomGoal = null;
  }

  _hypInit(config) {
    this._hypCancelAll();
    this._hypDrag = null;
    this._hypPointers = null;
    this._hypPinch = null;
    // The Flat view uses the same model for its details panel when that is on.
    if (config.view_mode !== "hyperbolic" && config.flat_show_details !== true) {
      this._hypLayout = null;
      this._hyp = null;
      return;
    }
    this._hypLayout = layoutHyperbolicTree(buildHyperbolicTree(config));
    this._hyp = { V: HYP_IDENTITY, focusId: this._hypLayout.root.id, zoom: 1 };
    // "none" = the ungrouped tree just built. Grouping depends on live
    // attributes (SSID, VLAN, which AP a client is on), so it can only be
    // worked out once hass exists - see _hypSync.
    this._hypGroupSig = "none";
    this._hypAttached = config.view_mode === "flat" || config.hyperbolic_client_layout !== "grouped";
  }

  // Keeps the Clients branch in step with Group By. Re-lays-out only when
  // some client actually changes group (a device roaming to another SSID
  // or AP); every other update leaves the layout - and the person's view -
  // untouched. A device changing group moves only within the Clients
  // branch: the rest of the tree is positioned independently of it.
  // Every name, MAC and id a device can be known by - what a client's
  // "connected to" value (switch name, AP MAC, Deco unit ...) is matched
  // against to find the access point or switch it hangs off.
  _hypNodeKeys(n, hass) {
    const keys = new Set();
    const add = (v) => {
      const k = hypNormKey(v);
      if (k.length >= 2) keys.add(k);
    };
    add(n.name);
    if (n.entity) {
      add(n.entity);
      add(n.entity.split(".").slice(1).join("."));
      const st = hass && hass.states && hass.states[n.entity];
      const a = (st && st.attributes) || {};
      add(a.friendly_name);
      ["mac", "mac_address", "ap_mac", "bssid", "hostname", "host_name"].forEach((k) => add(a[k]));
      const did = hass && hass.entities && hass.entities[n.entity] && hass.entities[n.entity].device_id;
      const dev = did && hass.devices && hass.devices[did];
      if (dev) {
        add(dev.name);
        add(dev.name_by_user);
        (dev.connections || []).forEach((cn) => add(cn && cn[1]));
        (dev.identifiers || []).forEach((id) => add(id && id[1]));
      }
    }
    return [...keys];
  }

  // Keeps the tree in step with live state. Re-lays-out only when the shape
  // of the tree would actually change - a client moving to another AP, a
  // monitored service changing scope - and otherwise leaves the layout and
  // the person's view alone. Only the part involved moves: the rest of the
  // tree is positioned independently of it.
  _hypSync(hass) {
    const cfg = this._config;
    // Where every monitored service goes is decided from live state (Auto
    // services are classified by tag / address), exactly as in Flat.
    const plan = buildMonitorPlan(hass, cfg, this._monitorTargetIds);
    this._monitorPlan = plan;
    const devs = [...(cfg.individual_devices || []), ...monitorClientDevices(plan)];
    const attached = cfg.view_mode === "flat" || cfg.hyperbolic_client_layout !== "grouped";
    this._hypAttached = attached;
    const groupBy = cfg.individual_devices_group_by || "none";

    let grouping = null;
    let attach = null;
    let matchKeys = null;
    let keySig = "";
    if (attached) {
      // The same "Connected Device" lookup Flat's Group By uses: the
      // switch a wired client is on, or the AP / Deco unit a wireless one
      // is on. Anything it can't name goes to the Unknown node.
      attach = devs.map((d) => {
        if (d._monitor) return null;
        const k = hypNormKey(getDeviceGroupName(hass, d, "ap"));
        return k && k !== "unknown" ? k : null;
      });
      matchKeys = (n) => this._hypNodeKeys(n, hass);
      const prev = this._hypLayout;
      if (prev) {
        keySig = prev.nodes
          .filter((n) => n.kind === "ap" || n.kind === "switch" || n.isRouter)
          .map((n) => matchKeys(n).join(","))
          .join("|");
      }
    } else if (devs.length && groupBy !== "none") {
      grouping = groupIndividualDevices(hass, devs, groupBy).map((g) => ({
        name: g.name,
        indexes: g.devices.map((d) => devs.indexOf(d))
      }));
    }

    const trivial = attached
      ? !devs.length && !plan.external.length
      : !grouping && !plan.external.length && !plan.clients.length;
    const sig = trivial
      ? "none"
      : JSON.stringify({ m: attached ? 1 : 0, a: attach, k: keySig, g: grouping, e: plan.external.map((s) => s.entity), c: plan.clients.map((s) => s.entity) });
    if (sig === this._hypGroupSig && this._hypLayout) return;
    this._hypGroupSig = sig;
    this._hypLayout = layoutHyperbolicTree(
      buildHyperbolicTree(cfg, grouping, { clientDevices: devs, external: plan.external, attach, matchKeys })
    );
    if (!this._hypLayout.byId[this._hyp.focusId]) {
      // The focused node no longer exists - fall back to the start view.
      this._hypCancelAnim();
      this._hyp.focusId = this._hypLayout.root.id;
      this._hyp.V = HYP_IDENTITY;
    }
  }

  // Slides the view so `id` ends up at the centre, travelling along the
  // straight (geodesic) path between where it is now and the centre.
  _hypAnimateTo(id) {
    const layout = this._hypLayout;
    const hs = this._hyp;
    const node = layout && layout.byId[id];
    if (!node || !hs) return;
    this._hypCancelAnim();
    const V0 = hs.V;
    const q = hypApply(V0, node.z);
    const m = HYP_C.abs(q);
    if (m < 1e-3) {
      this.requestUpdate();
      return;
    }
    const rho = 2 * Math.atanh(Math.min(m, 0.9999));
    const dir = [q[0] / m, q[1] / m];
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = Math.min(700, 280 + rho * 110);
    const t0 = performance.now();
    const frame = (now) => {
      const p = reduce ? 1 : Math.min(1, (now - t0) / dur);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const k = Math.tanh((e * rho) / 2);
      hs.V = hypCompose(hypTranslation([-dir[0] * k, -dir[1] * k]), V0);
      this.requestUpdate();
      this._hypAnimRaf = p < 1 ? requestAnimationFrame(frame) : null;
    };
    this._hypAnimRaf = requestAnimationFrame(frame);
  }

  _hypResetView() {
    if (!this._hypLayout || !this._hyp) return;
    this._hyp.focusId = this._hypLayout.root.id;
    this._hypAnimateTo(this._hyp.focusId);
    this._hypZoomTo(1);
  }

  // Zoom magnifies the picture about the centre of the view: nodes, their
  // badges and labels all grow, and whatever falls off the edge is clipped.
  // It sits on top of the hyperbolic navigation (drag / tap to re-centre),
  // which is what actually moves around the network, so the two combine:
  // centre something, then zoom in on it.
  _hypZoomBy(factor) {
    const hs = this._hyp;
    if (!hs) return;
    this._hypZoomTo((this._hypZoomGoal ?? hs.zoom ?? 1) * factor);
  }

  _hypZoomTo(target) {
    const hs = this._hyp;
    if (!hs) return;
    const goal = Math.max(HYP_ZOOM_MIN, Math.min(HYP_ZOOM_MAX, target));
    this._hypZoomGoal = goal;
    if (this._hypZoomRaf != null) cancelAnimationFrame(this._hypZoomRaf);
    const from = hs.zoom ?? 1;
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || Math.abs(goal - from) < 1e-3) {
      hs.zoom = goal;
      this._hypZoomRaf = null;
      this.requestUpdate();
      return;
    }
    const t0 = performance.now();
    const frame = (now) => {
      const p = Math.min(1, (now - t0) / 220);
      const e = 1 - Math.pow(1 - p, 3);
      // Interpolate in log space so every step feels the same size.
      hs.zoom = Math.exp(Math.log(from) + (Math.log(goal) - Math.log(from)) * e);
      this.requestUpdate();
      this._hypZoomRaf = p < 1 ? requestAnimationFrame(frame) : null;
      if (p >= 1) hs.zoom = goal;
    };
    this._hypZoomRaf = requestAnimationFrame(frame);
  }

  // Position on the screen as a point of the unit disk (the disk fills 92% of
  // the square stage, centred, and zoom magnifies it about that centre).
  _hypStageXY(rect, x, y) {
    const z = (this._hyp && this._hyp.zoom) || 1;
    return [
      (((x - rect.left) / rect.width - 0.5) * 2) / (0.92 * z),
      (((y - rect.top) / rect.height - 0.5) * 2) / (0.92 * z)
    ];
  }

  _hypStagePoint(e) {
    return this._hypStageXY(e.currentTarget.getBoundingClientRect(), e.clientX, e.clientY);
  }

  // One finger drags the view; a second finger turns the gesture into a
  // pinch, which changes the zoom (about the centre, like the buttons) by
  // how much the two fingers have moved apart or together. Lifting one
  // finger of a pinch carries on as a drag with the other, never as a tap.
  _hypPointerDown(e) {
    if (!this._hyp) return;
    if (e.button !== undefined && e.button > 0) return;
    const target = e.target;
    if (target && target.closest && target.closest(".hyp-controls")) return;
    const ptrs = this._hypPointers || (this._hypPointers = new Map());
    if (ptrs.size >= 2) return;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
    if (ptrs.size === 2) {
      this._hypCancelAll();
      this._hypDrag = null;
      const [p, q] = [...ptrs.values()];
      this._hypPinch = { d0: Math.max(10, Math.hypot(p.x - q.x, p.y - q.y)), z0: this._hyp.zoom || 1 };
      return;
    }
    this._hypCancelAnim();
    const nodeEl = target && target.closest ? target.closest("[data-hyp-id]") : null;
    this._hypDrag = {
      pointerId: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      moved: false,
      V0: this._hyp.V,
      u0: hypClampToDisk(this._hypStagePoint(e)),
      nodeId: nodeEl ? nodeEl.dataset.hypId : null
    };
  }

  // Dragging keeps the point under the finger under the finger: undo the
  // move that put it where it started, then redo it to where it is now.
  _hypPointerMove(e) {
    const ptrs = this._hypPointers;
    if (ptrs && ptrs.has(e.pointerId)) ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pin = this._hypPinch;
    if (pin) {
      if (ptrs && ptrs.size === 2) {
        const [p, q] = [...ptrs.values()];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        this._hyp.zoom = Math.max(HYP_ZOOM_MIN, Math.min(HYP_ZOOM_MAX, (pin.z0 * d) / pin.d0));
        this.requestUpdate();
      }
      return;
    }
    const d = this._hypDrag;
    if (!d || d.pointerId !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) return;
    d.moved = true;
    const u1 = hypClampToDisk(this._hypStagePoint(e));
    const next = hypCompose(hypTranslation(u1), hypCompose(hypInverse(hypTranslation(d.u0)), d.V0));
    // |a| = cosh(distance / 2). Past ~200 the view is further from the
    // network than anything in it, and floating point starts to wobble,
    // so a drag that would go there simply stops at the edge.
    if (HYP_C.abs(next.a) > 200) return;
    this._hyp.V = next;
    this.requestUpdate();
  }

  _hypPointerUp(e) {
    this._hypPointerEnd(e, false);
  }

  _hypPointerEnd(e, cancelled) {
    const ptrs = this._hypPointers;
    if (ptrs) ptrs.delete(e.pointerId);
    if (e.currentTarget && e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {
        /* already released */
      }
    }
    if (this._hypPinch) {
      if (!ptrs || ptrs.size < 2) {
        this._hypPinch = null;
        this._hypDrag = null;
        const rest = ptrs && [...ptrs.entries()][0];
        if (rest && e.currentTarget) {
          const [id, pt] = rest;
          this._hypDrag = {
            pointerId: id,
            x: pt.x,
            y: pt.y,
            moved: true,
            V0: this._hyp.V,
            u0: hypClampToDisk(this._hypStageXY(e.currentTarget.getBoundingClientRect(), pt.x, pt.y)),
            nodeId: null
          };
        }
      }
      return;
    }
    const d = this._hypDrag;
    if (!d || d.pointerId !== e.pointerId) return;
    this._hypDrag = null;
    if (!cancelled && !d.moved && d.nodeId) this._hypTap(d.nodeId);
  }

  // A trackpad pinch reaches the page as a wheel event with ctrl held.
  // Plain scrolling is left alone so the dashboard still scrolls.
  _hypWheel(e) {
    if (!e.ctrlKey || !this._hyp) return;
    e.preventDefault();
    this._hypCancelAll();
    // Trackpads send many small deltas; a mouse wheel sends one big one.
    // Capping each event keeps a single wheel notch to about one button press.
    const dy = Math.max(-30, Math.min(30, e.deltaY * (e.deltaMode === 1 ? 16 : 1)));
    this._hyp.zoom = Math.max(HYP_ZOOM_MIN, Math.min(HYP_ZOOM_MAX, (this._hyp.zoom || 1) * Math.exp(-dy * 0.01)));
    this.requestUpdate();
  }

  // The stage's pixel width, needed to turn a node's percentage size into
  // pixels so its badges can be scaled to match. Re-measured on resize.
  _hypMeasure() {
    const st = this.shadowRoot && this.shadowRoot.querySelector(".hyp-stage");
    // (the Flat view's details layout has no tree to measure, only a card width)
    if (!st && !this._flatDetailsOn()) return;
    const wpx = st ? st.clientWidth : 0;
    const cardW = this.clientWidth || 0;
    let changed = false;
    if (wpx && Math.abs(wpx - (this._hypStageW || 0)) > 1) {
      this._hypStageW = wpx;
      changed = true;
    }
    // Auto layout switches between the phone and tablet arrangements on
    // the card's own width (not the screen's), so it also does the right
    // thing in a narrow dashboard column on a big screen.
    if (Math.abs(cardW - (this._hypCardW || 0)) > 1) {
      this._hypCardW = cardW;
      if ((this._config.hyperbolic_layout || "auto") === "auto") changed = true;
    }
    if (changed) this.requestUpdate();
    this._hypBindWindow();
    if (this._hypFitSide == null) this._hypMeasureFit();
    this._hypRemeasureSoon();
    // Tablet + fit-to-height: the tree should end at the bottom of the screen. If it
    // visibly does not (the page settled after it was measured: a header appeared or
    // went), measure again - at most once a second, and only when something changed.
    const now = Date.now();
    if (st && this._hypFitSide && now - (this._hypSettleAt || 0) > 800 && this._config.hyperbolic_fit_height !== false && this._hypLayoutMode() === "tablet") {
      this._hypSettleAt = now;
      const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight || 0;
      const r = st.getBoundingClientRect();
      if (vh && r.width > 0 && r.top >= 0 && r.top < vh && Math.abs(r.bottom - (vh - 20)) > 24) this._hypMeasureFit();
    }
  }

  // The dashboard's own header: the height Home Assistant publishes as
  // --header-height, plus the device's top safe area (the iPad status bar).
  // 0 where the dashboard sets none.
  _hypHeaderFloor() {
    let h = 0;
    try {
      const v = parseFloat(getComputedStyle(this).getPropertyValue("--header-height"));
      if (Number.isFinite(v)) h += v;
      if (!this._hypSafeProbe) {
        const p = document.createElement("div");
        p.style.cssText = "position:fixed;top:0;left:0;width:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top, 0px)";
        this.shadowRoot.appendChild(p);
        this._hypSafeProbe = p;
      }
      h += this._hypSafeProbe.getBoundingClientRect().height || 0;
    } catch (_) {
      /* no header information: carry on without */
    }
    return h;
  }

  // How much screen is left for the card's content: from where it starts (below
  // the dashboard header) to the bottom of the visible screen. The header's
  // height is taken out of the sum, so a card in a full-screen panel ends at
  // the bottom of the screen instead of spilling past it.
  _hypAvailHeight() {
    const root = this.shadowRoot;
    const el = root && (root.querySelector(".hyp-stage") || root.querySelector(".hyp-cols"));
    const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight || 0;
    if (!vh) return null;
    const rect = el ? el.getBoundingClientRect() : null;
    const laidOut = !!rect && rect.width > 0 && rect.height > 0;
    const floor = this._hypHeaderFloor();
    let top = laidOut ? rect.top : NaN;
    let trusted = false; // the measured position is usable as it stands
    // A card that really is on screen is measured where it is - including on a dashboard
    // with no header at all (a kiosk, a hidden toolbar), where it starts near the top.
    // The header's height is only a stand-in when there is nothing to measure.
    if (!(top >= 0)) top = floor + 16; // not laid out yet (hidden, or measured too early)
    else if (top > floor + 220) top = floor + 16; // far down a scrolled page: assume the header
    else trusted = true;
    let avail = Math.floor(vh - top - 20);
    // Self-check: if the content starts on screen and really does run past the
    // bottom, take the overshoot off.
    if (trusted && el.matches(".hyp-stage")) {
      const over = rect.bottom - (vh - 20);
      if (over > 4) avail = Math.min(avail, Math.floor(rect.height - over));
    }
    return Math.max(300, avail);
  }

  // "Fit to screen height": how tall (and so how wide, the tree being square)
  // the tree can be to end exactly at the bottom of the visible screen - and,
  // in the Flat view's details layout, how tall its row should be so the
  // details panel reaches the bottom too. Re-measured when the screen is
  // resized or rotated and a few times just after the card first appears (the
  // dashboard's header settles after the card does); not on scroll or on every
  // update, so nothing jumps while the page moves.
  _hypMeasureFit() {
    if (!this._hypActive()) return;
    const side = this._hypAvailHeight();
    if (side == null) return;
    if (Math.abs(side - (this._hypFitSide || 0)) >= 2) {
      this._hypFitSide = side;
      this.requestUpdate();
    }
  }

  // Many Material Design icons are not drawn in the middle of their 24-unit box:
  // mdi:router-network's artwork sits 4 units low, the "...-network" family 1 unit
  // low. In a circle that reads as an icon "slightly below centre". So each icon
  // in a tree node or in the details panel's header is measured once (its real
  // drawn shape, wherever Home Assistant puts it) and nudged to the middle.
  _hypInnerPath(el) {
    const inner = el.shadowRoot && el.shadowRoot.querySelector("ha-svg-icon");
    const holder = inner || el;
    return holder.shadowRoot ? holder.shadowRoot.querySelector("path") : null;
  }

  _hypCenterIcons(attempt = 0) {
    const root = this.shadowRoot;
    if (!root) return;
    const cache = this._hypInkCache || (this._hypInkCache = new Map());
    let pending = false;
    root.querySelectorAll(".hyp-node ha-icon, .hyp-node ha-svg-icon, .hyp-d-icon ha-icon, .hyp-d-icon ha-svg-icon").forEach((el) => {
      // An icon element the page has not defined (nothing to measure) is left alone.
      if (!(window.customElements && window.customElements.get(el.localName))) return;
      const path = this._hypInnerPath(el);
      const d = path && path.getAttribute("d");
      if (!d) {
        pending = true; // the icon has not loaded yet
        return;
      }
      let off = cache.get(d);
      if (!off) {
        let bb = null;
        try {
          bb = path.getBBox();
        } catch (_) {
          return;
        }
        if (!bb || (!bb.width && !bb.height)) return;
        off = { dx: bb.x + bb.width / 2 - 12, dy: bb.y + bb.height / 2 - 12 };
        cache.set(d, off);
      }
      // only a clear offset is corrected (a small one is the icon's own design), and never by a lot
      const fix = (v) => (Math.abs(v) >= 0.6 ? -Math.max(-4.5, Math.min(4.5, v)) : 0);
      el.style.setProperty("--ico-dx", String(fix(off.dx)));
      el.style.setProperty("--ico-dy", String(fix(off.dy)));
    });
    // Icons load a moment after the first render: look again, a few times at most.
    if (pending && attempt < 8 && !this._hypCenterTimer) {
      this._hypCenterTimer = setTimeout(() => {
        this._hypCenterTimer = null;
        if (this.isConnected) this._hypCenterIcons(attempt + 1);
      }, 150 + attempt * 100);
    }
  }

  _hypRemeasureSoon() {
    if (this._hypRemeasured) return;
    this._hypRemeasured = true;
    [250, 800, 2000, 4500].forEach((ms) =>
      setTimeout(() => {
        if (this.isConnected && this._hypActive()) {
          this._hypMeasure();
          this._hypMeasureFit();
        }
      }, ms)
    );
  }

  _hypBindWindow() {
    if (this._hypWinBound || typeof window === "undefined") return;
    this._hypWinBound = true;
    this._hypOnResize = () => {
      this._hypMeasure();
      this._hypMeasureFit();
    };
    window.addEventListener("resize", this._hypOnResize);
    window.addEventListener("orientationchange", this._hypOnResize);
    document.addEventListener("visibilitychange", this._hypOnResize);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", this._hypOnResize);
  }

  _hypUnbindWindow() {
    if (!this._hypWinBound) return;
    this._hypWinBound = false;
    window.removeEventListener("resize", this._hypOnResize);
    window.removeEventListener("orientationchange", this._hypOnResize);
    document.removeEventListener("visibilitychange", this._hypOnResize);
    if (window.visualViewport) window.visualViewport.removeEventListener("resize", this._hypOnResize);
    this._hypRemeasured = false;
    this._hypFitSide = null;
    this._popupOpen = false;
    if (this._hypCenterTimer) {
      clearTimeout(this._hypCenterTimer);
      this._hypCenterTimer = null;
    }
  }

  // The circle size the flat view draws this kind of node at. Badges are
  // laid out against that size, then scaled by (node size / this).
  _hypBaseSize(n) {
    const c = this._config;
    if (n.kind === "ap") return c.ap_circle_size ?? 72;
    if (n.kind === "client" || n.kind === "service") return c.individual_device_circle_size ?? 42;
    if (n.kind === "homelab") return n.cfg?.circle_size ?? 72;
    if (n.kind === "switch") return n.cfg?.circle_size ?? 60;
    return n.cfg?.circle_size ?? 72;
  }

  _hypIpValue(hass, entityId, slot) {
    if (!this._config.show_ip_addressing || !entityId) return null;
    return hypReadIp(hass, entityId, slot || "device");
  }

  // A device's address for the IP pill / chip: the entity chosen for it, else the
  // device's own entity if it carries the address as an attribute, else whatever
  // the device registry can show (a sensor named like an address, or the host in
  // the device's web address). Nothing is shown unless Show IP Addressing is on.
  _nodeIpValue(hass, cfg) {
    if (!this._config.show_ip_addressing || !cfg) return null;
    const explicit = cfg.entities && cfg.entities.ip_address;
    if (explicit) return hypReadIp(hass, explicit, "device");
    if (!cfg.entity) return null;
    return hypReadIp(hass, cfg.entity, "device", { attributesOnly: true }) || hypDetectDeviceIp(hass, cfg.entity);
  }

  // Every badge a node can carry, in the same order and with the same
  // visibility rules the flat view uses for that kind of device - so a
  // setting like "VPN target: switch" means the same thing in both views.
  // Each item can draw itself as a badge (render) and describe itself as a
  // chip for the details panel (chip), which is what keeps the information
  // readable even when a node is too small on screen to show its badges.
  _hypBadgeItems(n, hass) {
    const c = this._config;
    const items = [];
    const push = (key, location, visible, render, chip) =>
      items.push({ key, location, visible: !!visible, render, chip });

    const secVisible = (target, entity, item) => {
      if (!entity) return false;
      if (target === "router") return !!n.isRouter;
      if (target === "switch") return !!n.isTopSwitch;
      if (target === "primary_ap") return n.kind === "ap" && !!n.isPrimary;
      if (target === "homelab") return n.kind === "homelab" && homelabShowsSecurity(n.cfg, item);
      return false;
    };

    const monKey = n.cfg ? monitorDeviceKey(n.cfg) : "";
    const monitor = () => {
      const base = this._monitorBadgeStackItem(monKey);
      push("monitor", base.location, base.visible, (i) => this._renderMonitorDeviceBadge(hass, monKey, i), () => {
        const list = this._monitorPlan && this._monitorPlan.byDevice.get(monKey);
        if (!list || !list.length) return null;
        const mon = c.monitoring;
        const worst = worstMonitorState(list.map((s) => resolveMonitorState(hass, s, mon.unavailable_state)));
        return { icon: (list.length === 1 && list[0].icon) || mon.device_badge_icon || "mdi:heart-pulse", text: `Monitor: ${MONITOR_STATE_LABELS[worst]}`, color: mon.colors?.[worst] };
      });
    };

    const poe = (poeCfg, entity) => {
      const total = poeCfg ? computePoeTotal(hass, entity, poeCfg) : null;
      push("poe", poeCfg && poeCfg.location, total != null, (i) => this._renderPoeBadge(hass, entity, poeCfg, i), () =>
        total == null ? null : { icon: poeCfg.icon || "mdi:lightning-bolt", text: `PoE: ${roundVal(total)}${poeCfg.unit || "W"}`, color: resolvePoeColor(total, poeCfg) }
      );
    };

    const security = () => {
      push("vpn", c.vpn_badge_location, secVisible(c.vpn_target, c.vpn_entity, "vpn"), (i) => this._renderVpnBadge(hass, c.vpn_entity, i), () => {
        const on = isVpnActive(hass, c.vpn_entity);
        const peers = c.vpn_peers_entity ? getEntityState(hass, c.vpn_peers_entity) : null;
        const extra = peers && peers.value != null ? ` (${roundVal(peers.value)} peers)` : "";
        return { icon: c.vpn_badge_icon || "mdi:vpn", text: `VPN: ${on ? "Active" : "Off"}${extra}`, color: on ? c.vpn_badge_color : c.vpn_badge_offline_color };
      });
      push("firewall", c.firewall_badge_location, secVisible(c.firewall_target, c.firewall_entity, "firewall"), (i) => this._renderFirewallBadge(hass, c.firewall_entity, i), () => {
        const on = isVpnActive(hass, c.firewall_entity);
        return { icon: c.firewall_badge_icon || "mdi:wall-fire", text: `Firewall: ${on ? "Active" : "Off"}`, color: on ? c.firewall_badge_color : c.firewall_badge_offline_color };
      });
      push("dns", c.dns_badge_location, secVisible(c.dns_target, c.dns_entity, "dns"), (i) => this._renderDnsBadge(hass, i), () => {
        const so = hass.states && hass.states[c.dns_entity];
        if (!so) return null;
        const num = getEntityState(hass, c.dns_entity);
        if (num && num.value != null) {
          const thr = { color_mode: c.dns_color_mode, thresholds: c.dns_thresholds, color: c.dns_badge_color };
          const color = c.dns_color_mode === "threshold" ? resolvePoeColor(num.value, thr) : c.dns_badge_color;
          return { icon: c.dns_badge_icon || "mdi:shield-check", text: `DNS: ${roundVal(num.value)}${c.dns_unit || ""}`, color };
        }
        const on = !isEntityUnavailable(hass, c.dns_entity) && String(so.state).toLowerCase() !== "off";
        return { icon: c.dns_badge_icon || "mdi:shield-check", text: `DNS: ${on ? "On" : "Off"}`, color: on ? c.dns_badge_color : c.dns_badge_offline_color };
      });
      push("rp", c.reverse_proxy_badge_location, secVisible(c.reverse_proxy_target, c.reverse_proxy_entity, "reverse_proxy"), (i) => this._renderReverseProxyBadge(hass, i), () => {
        const so = hass.states && hass.states[c.reverse_proxy_entity];
        if (!so) return null;
        const up = !isEntityUnavailable(hass, c.reverse_proxy_entity) && String(so.state).toLowerCase() !== "off";
        return { icon: c.reverse_proxy_badge_icon || "mdi:server-network", text: `Proxy: ${up ? "Up" : "Down"}`, color: up ? c.reverse_proxy_badge_color : c.reverse_proxy_badge_offline_color };
      });
    };

    if (n.isRouter) {
      security();
      poe(n.cfg.poe, n.entity);
      monitor();
    } else if (n.kind === "switch") {
      if (n.isTopSwitch) security();
      poe(n.cfg.poe, n.entity);
      monitor();
    } else if (n.kind === "ap") {
      const ap = n.cfg;
      push("primary", ap.primary_badge_location, n.isPrimary && ap.show_primary_badge !== false, (i) => this._renderPrimaryApBadge(ap, i), () => ({
        icon: c.primary_badge_icon || "mdi:star", text: "Primary AP", color: ap.colors?.primary_badge
      }));
      poe(ap.poe, n.entity);
      monitor();
      security();
    } else if (n.kind === "homelab") {
      poe(n.cfg.poe, n.entity);
      monitor();
      security();
    } else if (n.kind === "client") {
      const guest = !!n.entity && isDeviceOnline(hass, n.entity) && isGuestDevice(hass, n.entity);
      push("guest", "top-right", guest, () => this._renderGuestBadge(hass, n.entity, true), () => ({
        icon: c.individual_device_guest_icon || "mdi:account", text: "Guest network", color: c.individual_device_guest_icon_color
      }));
      monitor();
    } else if (n.isInternet || n.kind === "lan") {
      monitor();
    } else if (n.kind === "service") {
      const mon = c.monitoring;
      const state = resolveMonitorState(hass, n.svc, mon.unavailable_state);
      push("svcstate", mon.badge_location, true, (i) => this._renderMonitorStateBadge(state, i, mon.icons?.[state], `${monitorDisplayName(hass, n.svc)}: ${MONITOR_STATE_LABELS[state]}`), () => ({
        icon: mon.icons?.[state] || "mdi:help", text: `Status: ${MONITOR_STATE_LABELS[state]}`, color: mon.colors?.[state]
      }));
      const r = mon.response;
      const ms = r && n.svc.show_response_time !== false && state !== "down" ? getMonitorResponseMs(hass, n.svc) : null;
      push("svcresp", "bottom-center", ms != null, () => this._renderMonitorResponseBadge(hass, n.svc, state), () =>
        ms == null ? null : { icon: "mdi:timer-outline", text: `Response: ${roundVal(ms)}${r.unit || "ms"}`, color: resolvePoeColor(ms, r) }
      );
    }
    return items;
  }

  // How much of the Internet plan's data quota is left, or null when it is
  // not configured / not readable. Same rule as Flat: both entities set,
  // a positive total, and a numeric remaining.
  _hypQuota(n, hass) {
    const q = n.quota;
    if (!q || !q.total || !q.remaining) return null;
    const t = getEntityState(hass, q.total);
    const r = getEntityState(hass, q.remaining);
    if (!t || !r || t.value == null || r.value == null || !(t.value > 0)) return null;
    const ratio = Math.max(0, Math.min(1, r.value / t.value));
    return { ratio, used: (1 - ratio) * 100, left: ratio * 100, t, r };
  }

  // A backup Internet link is drawn dashed while on standby, and solid once
  // the primary is down and it is carrying traffic - same as Flat.
  _hypBackupDashed(n, view, layout) {
    if (!n.standbyBackup) return false;
    const prim = layout.nodes.find((x) => x.isInternet && !x.isSecondary);
    const pv = prim && view.get(prim.id);
    return !(pv && pv.live.offline);
  }

  // --- History graphs in the details panel ------------------------------
  // Fetches the last stretch of history (`ms` long) for the entities a graph needs - only
  // for the node being looked at, and only when a graph is about to be drawn -
  // and keeps the result, already reduced to a few dozen values, for a few
  // minutes. A render never waits on a fetch: it draws "loading", and the
  // arrival of the data triggers one more render.
  _hypEnsureHistory(entities, ms) {
    const hass = this.hass;
    const cache = this._hypHist || (this._hypHist = new Map());
    const now = Date.now();
    const key = (e) => `${e}|${ms}`;
    const need = [];
    [...new Set(entities)].forEach((e) => {
      const ent = cache.get(key(e));
      if (ent && ent.loading) return;
      const age = ent ? now - ent.at : Infinity;
      // A short window moves quickly, so it is refreshed more often: a tenth
      // of its length, between 15 seconds and 5 minutes.
      const ttl = ent && ent.status === "error" ? 60000 : Math.max(15000, Math.min(300000, ms / 10));
      if (!ent || age > ttl) need.push(e);
    });
    if (!need.length) return;
    need.forEach((e) => {
      const prev = cache.get(key(e));
      cache.set(key(e), { ...(prev || { status: "loading", buckets: null }), loading: true, at: prev ? prev.at : now });
    });
    if (!hass || typeof hass.callWS !== "function") {
      need.forEach((e) => cache.set(key(e), { status: "error", buckets: null, at: now }));
      return;
    }
    const end = Date.now();
    const start = end - ms;
    hass
      .callWS({
        type: "history/history_during_period",
        start_time: new Date(start).toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: need,
        include_start_time_state: true,
        significant_changes_only: false,
        minimal_response: true,
        no_attributes: true
      })
      .then((res) => {
        need.forEach((e) => {
          const points = hypParseHistory(res && res[e]);
          const buckets = hypBuckets(points, start, end, HYP_GRAPH_BUCKETS);
          cache.set(key(e), { status: buckets.some((v) => v != null) ? "ok" : "empty", buckets, points, t0: start, t1: end, at: Date.now() });
        });
      })
      .catch(() => {
        need.forEach((e) => {
          const prev = cache.get(key(e));
          cache.set(key(e), { ...(prev && prev.buckets ? prev : { status: "error", buckets: null }), loading: false, at: Date.now() });
        });
      })
      .then(() => this.requestUpdate());
  }

  // The graphs worth showing for a node, built from what it already knows:
  // throughput for the router, Internet and access points; latency for the
  // Internet; connected clients for anything that counts them; response time
  // for a monitored service.
  _hypGraphsFor(n) {
    const c = this._config;
    if (c.hyperbolic_show_graphs === false) return [];
    const m = (key) => (n.metrics || []).find((x) => x.key === key && x.entity);
    // Graph colours: one setting per kind of series (Layout > Details Panel > Graph Colors).
    // Left blank, a series keeps its usual colour; set, it applies to that series on every graph.
    const gc = (name, fallback) => c[`hyperbolic_graph_${name}_color`] || fallback;
    const down = gc("download", (n.edge && n.edge.downColor) || c.summary_realtime_download_color || "var(--green-color)");
    const up = gc("upload", (n.edge && n.edge.upColor) || c.summary_realtime_upload_color || "var(--pink-color)");
    const graphs = [];
    const clientsColor = gc("clients", "var(--purple-color)");
    const dl = m("download");
    const ul = m("upload");
    if ((dl || ul) && (n.isRouter || n.isInternet || n.kind === "ap")) {
      graphs.push({
        id: "rate",
        title: "Throughput",
        rate: true,
        series: [
          dl && { label: "Download", entity: dl.entity, color: down },
          ul && { label: "Upload", entity: ul.entity, color: up }
        ].filter(Boolean)
      });
    }
    if (n.isInternet) {
      const pg = m("ping");
      const jt = m("jitter");
      if (pg || jt) {
        graphs.push({
          id: "latency",
          title: "Latency",
          series: [
            pg && { label: "Ping", entity: pg.entity, color: gc("ping", "var(--cyan-color)") },
            jt && { label: "Jitter", entity: jt.entity, color: gc("jitter", "var(--amber-color)") }
          ].filter(Boolean)
        });
      }
    }
    // The router's "total clients": its own Total Clients entity if one is set
    // (Router page); otherwise the clients it can see added up - the LAN
    // count plus each access point's count, which are separate groups of
    // devices in this card.
    if (n.isRouter) {
      const explicit = m("devices");
      let ents = explicit ? [explicit.entity] : [];
      if (!ents.length) {
        const aps = (this._hypLayout ? this._hypLayout.nodes : [])
          .filter((k) => k.kind === "ap")
          .map((k) => (k.metrics || []).find((x) => x.key === "devices" && x.entity))
          .filter(Boolean)
          .map((x) => x.entity);
        ents = [...new Set([c.lan && c.lan.entity, ...aps].filter(Boolean))];
      }
      if (ents.length) {
        graphs.push({
          id: "devices",
          title: "Connected clients",
          integer: true,
          series: [{ label: explicit || ents.length === 1 ? "Clients" : "Total clients", entity: ents[0], entities: ents, color: clientsColor }]
        });
      }
    }
    if (n.kind === "lan" && n.entity) {
      graphs.push({ id: "devices", title: "Connected clients", integer: true, series: [{ label: "Clients", entity: n.entity, color: clientsColor }] });
    }
    const dv = m("devices");
    if (n.kind === "homelab") {
      // CPU, memory and disk as percentages, from the host's own sensors.
      const host = this._hypHostIndex(n, this.hass);
      if (host) {
        const roles = this._hypHostRoles(host.sensors, this.hass);
        const series = [
          roles.cpu && roles.cpu.unit === "%" && { label: "CPU", entity: roles.cpu.id, color: gc("cpu", "var(--cyan-color)") },
          roles.mem && { label: "Memory", entity: roles.mem.id, color: gc("memory", "var(--amber-color)") },
          roles.disk && { label: "Disk", entity: roles.disk.id, color: gc("disk", "var(--purple-color)") }
        ].filter(Boolean);
        if (series.length) graphs.push({ id: "resources", title: "Resources", series });
      }
    }
    if (dv && (n.kind === "ap" || n.kind === "switch" || n.kind === "homelab")) {
      graphs.push({ id: "devices", title: "Connected clients", integer: true, series: [{ label: "Clients", entity: dv.entity, color: clientsColor }] });
    }
    if (n.kind === "count" && n.entity) {
      graphs.push({ id: "devices", title: "Connected clients", integer: true, series: [{ label: "Clients", entity: n.entity, color: clientsColor }] });
    }
    if (n.kind === "service" && n.svc && n.svc.response_entity) {
      graphs.push({ id: "response", title: "Response time", series: [{ label: "Response", entity: n.svc.response_entity, color: gc("response", "var(--cyan-color)") }] });
    }
    return graphs.slice(0, 2);
  }

  // Each graph remembers its own timescale (this device only). Until one is
  // chosen, a graph uses the default from the editor.
  _hypRangeKey(gid) {
    if (!this._hypRanges) {
      try {
        this._hypRanges = JSON.parse(window.localStorage.getItem("network-flow-card.graph-ranges") || "{}") || {};
      } catch (_) {
        this._hypRanges = {};
      }
    }
    const k = this._hypRanges[gid];
    return HYP_RANGES.some((r) => r.key === k) ? k : hypRange(this._config.hyperbolic_graph_range).key;
  }

  _hypSetRange(gid, key) {
    if (!HYP_RANGES.some((r) => r.key === key)) return;
    this._hypRangeKey(gid); // make sure the saved choices are loaded first
    this._hypRanges[gid] = key;
    try {
      window.localStorage.setItem("network-flow-card.graph-ranges", JSON.stringify(this._hypRanges));
    } catch (_) {
      /* storage unavailable: the choice lasts until the page is reloaded */
    }
    this.requestUpdate();
  }

  // Readings seen while a graph was on screen, newest last. A fetch of history is only as
  // fresh as the moment it was made (and the recorder a few seconds behind that), so what
  // happened since is taken from the live states: every update extends the line.
  _hypLivePoints(entityId, hass) {
    const so = hass && hass.states && hass.states[entityId];
    if (!so) return [];
    const store = this._hypLiveBuf || (this._hypLiveBuf = new Map());
    let arr = store.get(entityId);
    if (!arr) {
      arr = [];
      store.set(entityId, arr);
    }
    const v = parseFloat(so.state);
    if (Number.isFinite(v)) {
      const t = Date.parse(so.last_updated || so.last_changed || "") || Date.now();
      if (!arr.length || arr[arr.length - 1].t < t) arr.push({ t, v });
    }
    const cutoff = Date.now() - 72 * 3600 * 1000;
    while (arr.length && arr[0].t < cutoff) arr.shift();
    if (arr.length > 5000) arr.splice(0, arr.length - 5000);
    return arr;
  }

  // The graph's values for one entity over the window that ends right now: what was fetched,
  // plus every live reading since the fetch.
  _hypWindowBuckets(ent, entityId, ms, hass, now) {
    if (!ent) return null;
    const live = this._hypLivePoints(entityId, hass);
    const base = ent.points;
    if (!base) return ent.buckets || (live.length ? hypBuckets(live, now - ms, now, HYP_GRAPH_BUCKETS) : null);
    // Readings from just before the fetch too: the recorder is a few seconds behind the live
    // states, so the last moments before the fetch are usually missing from what it returned.
    const cut = (ent.t1 || 0) - 15000;
    const known = new Set();
    for (let i = base.length - 1; i >= 0 && base[i].t >= cut; i--) known.add(base[i].t);
    const extra = live.filter((p) => p.t > cut && !known.has(p.t));
    if (!base.length && !extra.length) return ent.buckets || null;
    const out = hypBuckets(extra.length ? base.concat(extra).sort((x, y) => x.t - y.t) : base, now - ms, now, HYP_GRAPH_BUCKETS);
    // The last step of the line is the current reading itself (a bucket is an average, and a
    // reading that has only just changed would otherwise be blended with the one before it),
    // so the line always ends on the figure shown beside the graph.
    const cur = parseFloat(hass.states[entityId] && hass.states[entityId].state);
    if (Number.isFinite(cur)) out[out.length - 1] = cur;
    return out;
  }

  _hypGraphMarkup(g, hass) {
    const rk = this._hypRangeKey(g.id);
    const range = hypRange(rk);
    const ms = range.ms;
    const cache = this._hypHist || new Map();
    const models = this._hypGraphModels || (this._hypGraphModels = {});
    const W = 300;
    const H = 100;
    // Values for each series, on one axis. A download in one unit and an
    // upload in another are brought to the first one's unit when both are
    // data rates.
    const nowT = Date.now();
    const series = g.series.map((s) => {
      const ents = s.entities || [s.entity];
      let ent;
      let live;
      let bk = null;
      if (ents.length === 1) {
        ent = cache.get(`${ents[0]}|${ms}`);
        live = getEntityState(hass, ents[0]);
        bk = this._hypWindowBuckets(ent, ents[0], ms, hass, nowT);
      } else {
        // several entities added together: the history of each, summed, and
        // the sum of their live values
        const parts = ents.map((e) => cache.get(`${e}|${ms}`));
        const have = parts.filter((p) => p && p.buckets);
        if (have.length) ent = { status: "ok", buckets: hypSumBuckets(have.map((p) => p.buckets)), t0: have[0].t0, t1: have[0].t1 };
        else if (parts.some((p) => !p || p.loading)) ent = parts.every((p) => p && !p.loading) ? undefined : { loading: true };
        else ent = { status: parts.some((p) => p.status === "error") ? "error" : "empty", buckets: null };
        const lv = ents.map((e) => getEntityState(hass, e)).filter((x) => x && x.value != null);
        const total = lv.reduce((a, x) => a + x.value, 0);
        live = lv.length ? { value: total, display: String(Math.round(total)), unit: "" } : null;
        const bks = ents.map((e) => this._hypWindowBuckets(cache.get(`${e}|${ms}`), e, ms, hass, nowT)).filter(Boolean);
        bk = bks.length ? hypSumBuckets(bks) : null;
      }
      return { ...s, ent, bk, unit: (live && live.unit) || "", live };
    });
    if (g.rate && series.length > 1 && series[0].unit !== series[1].unit) {
      const probe = hypConvertRate(1, series[1].unit, series[0].unit);
      if (probe != null) {
        series[1].conv = (v) => hypConvertRate(v, series[1].unit, series[0].unit);
        series[1].showUnit = series[0].unit;
      }
    }
    series.forEach((s) => {
      const raw = s.bk;
      s.vals = raw ? raw.map((v) => (v == null ? null : s.conv ? s.conv(v) : v)) : null;
      s.unitShown = s.showUnit || s.unit;
    });
    const withData = series.filter((s) => s.vals && s.vals.some((v) => v != null));
    const loading = !withData.length && series.some((s) => !s.ent || s.ent.loading);
    const head = b`
      <div class="hyp-g-head">
        <div class="hyp-g-top">
          <span class="hyp-g-title">${g.title}</span>
          <div class="hyp-range" role="group" aria-label=${`${g.title} timescale`}>
            ${HYP_RANGES.map((r) => b`<button type="button" aria-pressed=${r.key === rk ? "true" : "false"} @click=${() => this._hypSetRange(g.id, r.key)}>${r.key}</button>`)}
          </div>
        </div>
        <span class="hyp-g-legend">${series.map((s) => b`<span class="hyp-g-key"><i style=${`background:${s.color}`}></i>${s.label}${s.live && s.live.value != null ? b` <b>${g.integer ? Math.round(s.live.value) : s.live.display}${s.unit ? " " + s.unit : ""}</b>` : null}</span>`)}</span>
      </div>`;
    if (!withData.length) {
      return b`<div class="hyp-graph">${head}<div class="hyp-chart empty">${loading ? "Loading history..." : series.some((s) => s.ent && s.ent.status === "error") ? "History unavailable" : "No history recorded for this sensor"}</div></div>`;
    }
    const max = hypNiceMax(Math.max(...withData.map((s) => Math.max(...s.vals.filter((v) => v != null)))));
    // the window always ends now, so the right edge of the line is the live value
    const t0 = nowT - ms;
    const t1 = nowT;
    const dec = g.integer ? 0 : max < 10 ? 1 : 0;
    const unit = withData[0].unitShown;
    models[g.id] = { t0, t1, integer: !!g.integer, series: withData.map((s) => ({ label: s.label, color: s.color, unit: s.unitShown, vals: s.vals })) };
    const ago = range.ago;
    return b`
      <div class="hyp-graph">
        ${head}
        <div
          class="hyp-chart"
          data-gid=${g.id}
          @pointermove=${(e) => this._hypScrubMove(e, g.id)}
          @pointerdown=${(e) => this._hypScrubMove(e, g.id)}
          @pointerleave=${(e) => this._hypScrubLeave(e)}
          @pointercancel=${(e) => this._hypScrubLeave(e)}
        >
          <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
            <line class="hyp-grid" x1="0" y1=${H / 2} x2=${W} y2=${H / 2}></line>
            ${withData.map((s) => {
              const p = hypLinePath(s.vals, W, H, max);
              return w`<path class="hyp-area" d=${p.area} style=${`fill:${s.color}`}></path><path class="hyp-line" d=${p.line} style=${`stroke:${s.color}`}></path>`;
            })}
          </svg>
          <span class="hyp-y top">${max.toFixed(dec)}${unit ? " " + unit : ""}</span>
          <span class="hyp-y bottom">0</span>
          <div class="hyp-scrub" hidden><div class="hyp-scrub-line"></div><div class="hyp-scrub-tip"></div></div>
        </div>
        <div class="hyp-g-axis"><span>${ago}</span><span>now</span></div>
      </div>`;
  }

  // Reading the graph under a finger or the pointer: moved by hand on the
  // DOM (not through a render) so dragging along it stays smooth.
  _hypScrubMove(e, gid) {
    const model = this._hypGraphModels && this._hypGraphModels[gid];
    const chart = e.currentTarget;
    if (!model || !chart) return;
    const r = chart.getBoundingClientRect();
    if (!r.width) return;
    const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const n = model.series[0].vals.length;
    const i = Math.round(f * (n - 1));
    const t = model.t0 + ((i + 0.5) / n) * (model.t1 - model.t0);
    const d = new Date(t);
    const span = model.t1 - model.t0;
    const when =
      (span > 86400000 ? d.toLocaleDateString([], { weekday: "short" }) + " " : "") +
      d.toLocaleTimeString([], span <= 1800000 ? { hour: "2-digit", minute: "2-digit", second: "2-digit" } : { hour: "2-digit", minute: "2-digit" });
    const fmt = (s) => {
      const v = s.vals[i];
      return v == null ? "-" : (model.integer ? String(Math.round(v)) : formatNumber(v)) + (s.unit ? " " + s.unit : "");
    };
    const box = chart.querySelector(".hyp-scrub");
    const tip = chart.querySelector(".hyp-scrub-tip");
    box.hidden = false;
    chart.querySelector(".hyp-scrub-line").style.left = `${(i / (n - 1)) * 100}%`;
    tip.textContent = "";
    const head = document.createElement("div");
    head.className = "hyp-tip-time";
    head.textContent = when;
    tip.appendChild(head);
    model.series.forEach((s) => {
      const row = document.createElement("div");
      const dot = document.createElement("i");
      dot.style.background = s.color;
      row.appendChild(dot);
      row.appendChild(document.createTextNode(`${s.label}: ${fmt(s)}`));
      tip.appendChild(row);
    });
    // keep the tip on the side of the line with room for it
    tip.style.left = f > 0.55 ? "auto" : `${(i / (n - 1)) * 100}%`;
    tip.style.right = f > 0.55 ? `${(1 - i / (n - 1)) * 100}%` : "auto";
  }

  _hypScrubLeave(e) {
    const box = e.currentTarget && e.currentTarget.querySelector(".hyp-scrub");
    if (box) box.hidden = true;
  }

  _hypMoreInfoEntity(node) {
    if (node.entity) return node.entity;
    const m = (node.metrics || []).find((x) => x.entity);
    return m ? m.entity : "";
  }

  // First tap brings a node to the centre and shows its details; tapping
  // the node that is already centred opens Home Assistant's more-info.
  // --- The details panel as a pop-up (phone layout) ---------------------------
  // Off, the panel sits below the diagram as before. On, a tap on a node opens it as a
  // sheet that slides up from the bottom of the screen. It is a native <dialog> shown with
  // showModal(), so the browser puts it in the top layer: above the whole dashboard,
  // whatever the card is nested in (a transform, an overflow or a backdrop blur on a
  // parent cannot clip or shift it). On a tablet it replaces the side panel.
  _hypPopupOn() {
    const c = this._config;
    if (!c || c.hyperbolic_details_popup !== true) return false;
    return c.view_mode === "hyperbolic" ? c.hyperbolic_show_details !== false : c.flat_show_details === true;
  }

  // How the card is arranged: "tablet" is the diagram with a column of summary and
  // details beside it; "mobile" is everything stacked. As a pop-up there is no details
  // column, so a wide screen is stacked too - the summary at the top (or wherever
  // Summary Position puts it) and the diagram across the whole card.
  _hypArrangement() {
    return this._hypLayoutMode() === "tablet" && !this._hypPopupOn() ? "tablet" : "mobile";
  }

  _openPopup() {
    if (this._popupOpen) return;
    this._popupOpen = true;
    this._popupOpenedAt = Date.now();
    this.requestUpdate();
  }

  _closePopup() {
    if (!this._popupOpen) return;
    this._popupOpen = false;
    this.requestUpdate();
  }

  // Swipe the sheet down by its handle to close it.
  _sheetTouch(kind, e) {
    const d = this.shadowRoot && this.shadowRoot.querySelector("dialog.hyp-sheet");
    if (!d || !e.touches) return;
    if (kind === "start") {
      this._sheetY0 = e.touches[0].clientY;
      this._sheetDy = 0;
    } else if (kind === "move") {
      this._sheetDy = Math.max(0, e.touches[0].clientY - (this._sheetY0 || 0));
      d.style.transition = "none";
      d.style.transform = `translateY(${this._sheetDy}px)`;
    } else {
      d.style.transition = "";
      d.style.transform = "";
      if ((this._sheetDy || 0) > 90) this._closePopup();
      this._sheetDy = 0;
    }
  }

  _hypPopupMarkup({ view, mode, hass }) {
    const open = this._popupOpen;
    // The dialog is always in the card while pop-up mode is on (so it can be shown and
    // hidden); what is inside is only built while it is open, so no history is fetched
    // for a sheet nobody is looking at.
    return b`
      <dialog
        class="hyp-sheet"
        autofocus
        aria-label="Details"
        @click=${(e) => {
          // The dimmed area around the sheet closes it - but not the click a touch screen
          // sends a moment after the tap that opened it, which lands on that very area.
          if (e.target === e.currentTarget && Date.now() - (this._popupOpenedAt || 0) > 450) this._closePopup();
        }}
        @cancel=${(e) => {
          e.preventDefault();
          this._closePopup();
        }}
        @close=${() => this._closePopup()}
        @touchmove=${{
          handleEvent: (e) => {
            if (e.target === e.currentTarget) e.preventDefault(); // do not scroll the page behind
          },
          passive: false
        }}
      >
        ${open
          ? b`
              <div
                class="hyp-sheet-grab"
                @touchstart=${(e) => this._sheetTouch("start", e)}
                @touchmove=${{ handleEvent: (e) => this._sheetTouch("move", e), passive: true }}
                @touchend=${(e) => this._sheetTouch("end", e)}
              >
                <i></i>
                <button type="button" class="hyp-sheet-close" aria-label="Close" @click=${() => this._closePopup()}>${renderIcon("mdi:close")}</button>
              </div>
              ${this._hypDetailsMarkup({ view, mode, hint: null, hass })}
            `
          : null}
      </dialog>
    `;
  }

  // Keeps the real dialog in step with _popupOpen (called after every render).
  _hypSyncPopup() {
    const d = this.shadowRoot && this.shadowRoot.querySelector("dialog.hyp-sheet");
    if (!d) {
      this._popupOpen = false;
      return;
    }
    if (this._popupOpen && !d.open) {
      try {
        if (typeof d.showModal === "function") d.showModal();
        else d.setAttribute("open", "");
        // keep the browser from focusing the cross (it would draw a focus ring round it)
        d.setAttribute("tabindex", "-1");
        if (typeof d.focus === "function") d.focus({ preventScroll: true });
      } catch (_) {
        d.setAttribute("open", "");
      }
    } else if (!this._popupOpen && d.open) {
      try {
        if (typeof d.close === "function") d.close();
        else d.removeAttribute("open");
      } catch (_) {
        d.removeAttribute("open");
      }
    }
  }

  _hypTap(id) {
    const node = this._hypLayout && this._hypLayout.byId[id];
    const hs = this._hyp;
    if (!node || !hs) return;
    // Flat view: there is no tree to move, so a tap just selects the node (and
    // a second tap on the selected one opens it, as in the tree).
    // As a pop-up, a tap always shows the node's details (the sheet has its own More Info button).
    const popup = this._hypPopupOn();
    if (this._flatDetailsOn()) {
      if (popup) {
        hs.focusId = id;
        this._openPopup();
        this.requestUpdate();
      } else if (hs.focusId === id) this._handleMoreInfo(this._hypMoreInfoEntity(node));
      else {
        hs.focusId = id;
        this.requestUpdate();
      }
      return;
    }
    const centred = HYP_C.abs(hypApply(hs.V, node.z)) < 0.05;
    if (centred && hs.focusId === id && !popup) {
      this._handleMoreInfo(this._hypMoreInfoEntity(node));
      return;
    }
    hs.focusId = id;
    if (popup) this._openPopup();
    this._hypAnimateTo(id);
  }

  _hypKeyDown(e, id) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._hypTap(id);
    }
  }

  // Live reading of one node: online/offline, the label to show, and the
  // metric chips for the details panel. Nothing here touches the layout.
  _hypLive(n, hass) {
    const st = n.entity ? getEntityState(hass, n.entity) : null;
    let offline = false;
    if (n.entity) offline = n.presence ? !isDeviceOnline(hass, n.entity) : isEntityUnavailable(hass, n.entity);

    const fallback = n.isRouter ? "Router" : n.isInternet ? "Internet" : { switch: "Switch", ap: "Access Point", homelab: "Server", lan: "LAN", client: "Client", container: "Container", count: "Clients", hub: "Network" }[n.kind] || "";
    if (n.kind === "count") {
      // The device's own count includes every client drawn hanging off it,
      // so the circle shows only the remainder: 80 connected, 4 of them
      // tracked clients drawn directly -> "+76". Only online clients are
      // subtracted - an offline one was never in the device's count.
      const cst = n.entity ? getEntityState(hass, n.entity) : null;
      const total = cst && cst.value != null ? Math.round(cst.value) : null;
      const direct = n.parentNode
        ? n.parentNode.children.filter((k) => k.kind === "client" && k.entity && isDeviceOnline(hass, k.entity)).length
        : 0;
      const rest = total == null ? null : Math.max(0, total - direct);
      const metrics = [];
      if (total != null) {
        metrics.push({ icon: "mdi:devices", label: "Total", text: `Total: ${total}` });
        if (direct) metrics.push({ icon: "mdi:link-variant", label: "Shown as clients", text: `${direct} shown as clients` });
      }
      return {
        offline: n.entity ? isEntityUnavailable(hass, n.entity) : false,
        label: rest == null ? "-" : this._hypAttached ? `+${rest}` : String(rest),
        stateText: total == null ? "Unavailable" : direct ? `${total} connected, ${direct} shown as clients` : `${total} connected`,
        metrics
      };
    }
    if (n.kind === "service") {
      const state = resolveMonitorState(hass, n.svc, this._config.monitoring.unavailable_state);
      return {
        offline: state === "down",
        label: monitorDisplayName(hass, n.svc),
        stateText: MONITOR_STATE_LABELS[state],
        state,
        metrics: []
      };
    }
    if (n.kind === "group") {
      const total = n.children.length;
      const allServices = total > 0 && n.children.every((k) => k.kind === "service");
      const on = n.children.filter((k) =>
        k.kind === "service"
          ? resolveMonitorState(hass, k.svc, this._config.monitoring.unavailable_state) === "up"
          : k.entity && isDeviceOnline(hass, k.entity)
      ).length;
      return {
        offline: false,
        label: n.name,
        stateText: `${on} of ${total} ${allServices ? "up" : "online"}`,
        metrics: [{ icon: "mdi:devices", label: "Clients", text: `${total} client${total === 1 ? "" : "s"}` }]
      };
    }
    let label = n.name || (st && st.name) || fallback;
    if (n.kind === "count") label = st && st.value != null ? String(Math.round(st.value)) : "-";

    let stateText = "";
    if (n.presence) stateText = n.entity ? (offline ? "Offline" : "Online") : "";
    else if (n.kind === "count") stateText = st ? `${label} connected` : "Unavailable";
    else if (n.entity) {
      if (!st) stateText = "Unavailable";
      else if (offline) stateText = "Offline";
      else {
        // A text state that merely starts with a number ("3d 4h 12m" - UniFi Device Info's uptime)
        // must not be read as that number. That integration keeps on/off in a `status` attribute.
        const so = hass.states[n.entity];
        const raw = so ? String(so.state).trim() : "";
        const textual = st.value != null && !/^-?\d+(\.\d+)?$/.test(raw);
        if (textual && so.attributes && so.attributes.mac_address && so.attributes.type) stateText = so.attributes.status || raw;
        else if (textual) stateText = raw;
        else stateText = `${capitalizeFirst(st.display)}${st.unit ? " " + st.unit : ""}`;
      }
    }

    const metrics = [];
    (n.metrics || []).forEach((m) => {
      if (!m.entity) return;
      const es = getEntityState(hass, m.entity);
      if (!es) return;
      const raw = String(es.stateObj.state).toLowerCase();
      let text;
      if (raw === "unavailable" || raw === "unknown") text = "-";
      else if (m.integer && es.value != null) text = String(Math.round(es.value));
      else text = `${es.display}${es.unit ? " " + es.unit : ""}`;
      metrics.push({ icon: m.icon, label: m.label, text });
    });

    return { offline, label, stateText, metrics };
  }

  // Phone (stacked) or tablet (side column) arrangement. Auto picks by the
  // card's own width, so it also does the right thing in a narrow dashboard
  // column on a big screen.
  _hypLayoutMode() {
    const opt = this._config.hyperbolic_layout || "auto";
    return opt === "tablet" || opt === "mobile" ? opt : (this._hypCardW || 0) >= 640 ? "tablet" : "mobile";
  }

  _hypPanelVars(showDetails) {
    const cfg = this._config;
    return showDetails
      ? (cfg.hyperbolic_details_background_color ? `--hyp-details-bg:${cfg.hyperbolic_details_background_color};` : "") +
          (cfg.hyperbolic_details_outline_color ? `--hyp-details-outline:${cfg.hyperbolic_details_outline_color};` : "")
      : "";
  }

  // --- Flat view: details panel layout ---------------------------------------
  // The Flat view can show the same summary card and details panel as the
  // Hyperbolic one, with the classic diagram where the tree would be. The model
  // behind the panel is the same node tree; the diagram's circles are matched
  // to its nodes by entity (see _handleMoreInfo / _flatMarkSelection).
  _flatDetailsOn() {
    const c = this._config;
    return !!c && c.view_mode !== "hyperbolic" && c.flat_show_details === true;
  }

  _hypActive() {
    const c = this._config;
    return !!c && (c.view_mode === "hyperbolic" || c.flat_show_details === true);
  }

  // Which node a tapped circle stands for: its own entity, first match wins.
  _flatNodeForEntity(entityId) {
    const layout = this._hypLayout;
    if (!layout || !entityId) return null;
    if (this._flatEntityMapFor !== layout) {
      this._flatEntityMapFor = layout;
      this._flatEntityMap = new Map();
      layout.nodes.forEach((n) => {
        if (n.entity && !this._flatEntityMap.has(n.entity)) this._flatEntityMap.set(n.entity, n.id);
      });
    }
    return this._flatEntityMap.get(entityId) || null;
  }

  // A tap that should always open the entity (a summary row, say) sets this for
  // the moment it takes to reach _handleMoreInfo.
  _markDirectMoreInfo() {
    this._directMoreInfo = true;
    setTimeout(() => {
      this._directMoreInfo = false;
    }, 0);
  }

  // Rings the circle of the selected node in the diagram - that one circle, in
  // the colour of its own border. Nothing else in the diagram is touched.
  _flatMarkSelection() {
    const root = this.shadowRoot;
    if (!root) return;
    root.querySelectorAll(".nfc-ring").forEach((c) => {
      c.classList.remove("nfc-ring");
      c.style.removeProperty("--nfc-ring");
    });
    if (!(this._flatDetailsOn() && this._hyp)) return;
    const layout = this._hypLayout;
    const node = layout && layout.byId[this._hyp.focusId];
    if (!node) return;
    // The first tagged circle that stands for the selected node.
    for (const el of root.querySelectorAll("[data-nfc-e], [data-nfc-n]")) {
      const nid = el.getAttribute("data-nfc-n") || this._flatNodeForEntity(el.getAttribute("data-nfc-e"));
      if (nid !== node.id) continue;
      const circle = el.matches(".circle") ? el : el.querySelector(":scope > .circle") || el.querySelector(".circle");
      if (!circle) continue;
      let color = "";
      try {
        const bc = getComputedStyle(circle).borderTopColor;
        if (bc && !/^rgba?\(\s*\d+,\s*\d+,\s*\d+,\s*0\s*\)$/.test(bc) && bc !== "transparent") color = bc;
      } catch (_) {
        /* fall back to the node's own colour */
      }
      if (!color) color = node.colors.circle;
      circle.style.setProperty("--nfc-ring", color);
      circle.classList.add("nfc-ring");
      return;
    }
  }

  _renderFlatDetails(diagramTemplate) {
    const cfg = this._config;
    const hass = this.hass;
    this._hypSync(hass);
    const layout = this._hypLayout;
    if (!layout || !this._hyp) return null;
    const mode = this._hypArrangement();
    const view = new Map(layout.nodes.map((n) => [n.id, { live: this._hypLive(n, hass) }]));
    const hint = b`<div class="hyp-hint">Tap a circle to see its details - tap it again to open it</div>`;
    const popupOn = this._hypPopupOn();
    const details = popupOn ? null : this._hypDetailsMarkup({ view, mode, hint, hass });
    const popup = popupOn ? this._hypPopupMarkup({ view, mode, hass }) : null;
    const { summary, summaryBottom } = this._hypSummaryMarkup(hass, mode);
    const split = Math.max(50, Math.min(85, Number(cfg.hyperbolic_tablet_split) || 70));
    const diagram = b`<div class="flow-main-layout pos-top hyp-flat-diagram">${diagramTemplate}</div>`;
    // The row is at least as tall as the screen has room for, so the summary and
    // details panel (and the graphs in it) reach the bottom of the screen.
    const rowStyle = this._hypFitSide ? `min-height:${this._hypFitSide}px` : "";
    return b`
      <ha-card>
        ${cfg.title ? b`<h1 class="card-header">${cfg.title}</h1>` : null}
        <div class="card-content hyp-content hyp-flat hyp-${mode}" style=${this._hypPanelVars(true)}>
          ${mode === "tablet"
            ? b`<div class="hyp-cols" style=${rowStyle}>
                <div class="hyp-col-tree hyp-col-flat" style=${`flex:0 0 ${split}%;max-width:${split}%`}>${diagram}</div>
                <div class="hyp-col-side">${summary}${details}</div>
              </div>`
            : summaryBottom
              ? b`${diagram}${summary}${details}`
              : b`${summary}${diagram}${details}`}
          ${popup}
        </div>
      </ha-card>
    `;
  }

  // --- What the registries know about a node ------------------------------
  // Home Assistant's entity and device registries tie a Proxmox node, a Portainer
  // endpoint or a client together with the sensors, VMs and containers that
  // belong to it. They are indexed once per registry change, not per render.
  _hypRegistryIndex(hass) {
    const c = this._hypRegIdx;
    if (c && c.ents === hass.entities && c.devs === hass.devices) return c;
    const byDevice = Object.create(null);
    const children = Object.create(null);
    Object.entries(hass.entities || {}).forEach(([eid, e]) => {
      if (e && e.device_id) (byDevice[e.device_id] || (byDevice[e.device_id] = [])).push(eid);
    });
    Object.entries(hass.devices || {}).forEach(([did, d]) => {
      if (d && d.via_device_id) (children[d.via_device_id] || (children[d.via_device_id] = [])).push(did);
    });
    return (this._hypRegIdx = { ents: hass.entities, devs: hass.devices, byDevice, children, hosts: new Map() });
  }

  // The entity that says whether a VM / container / stack is running.
  _hypPickStatusEntity(eids, hass) {
    const reg = (e) => hass.entities[e] || {};
    const dc = (e) => (hass.states[e] && hass.states[e].attributes && hass.states[e].attributes.device_class) || "";
    return (
      eids.find((e) => e.startsWith("binary_sensor.") && reg(e).translation_key === "status") ||
      eids.find((e) => e.startsWith("binary_sensor.") && (dc(e) === "running" || dc(e) === "connectivity")) ||
      eids.find((e) => e.startsWith("switch.")) ||
      eids.find((e) => e.startsWith("sensor.") && /^(status|state)$/.test(reg(e).translation_key || "")) ||
      eids.find((e) => e.startsWith("binary_sensor.") && /status|running|state/.test(e)) ||
      ""
    );
  }

  // For a Homelab (or one of its containers): the sensors on its device, and the
  // VMs / containers / stacks hanging off it, each with the entity that says
  // whether it is running. Null when the entity is not tied to a device.
  _hypHostIndex(n, hass) {
    if (!hass || !hass.entities || !hass.devices || !n.entity) return null;
    const reg = hass.entities[n.entity];
    const devId = reg && reg.device_id;
    if (!devId) return null;
    const idx = this._hypRegistryIndex(hass);
    let host = idx.hosts.get(n.entity);
    if (host) return host;
    const sensorsOf = (did) => (idx.byDevice[did] || []).filter((e) => e.startsWith("sensor."));
    host = { deviceId: devId, platform: reg.platform || "", sensors: sensorsOf(devId), services: [] };
    const skip = new Set(["Storage", "Shared storage", "Cluster", "Volume", "Image", "Network"]);
    const seen = new Set([devId]);
    let frontier = [devId];
    for (let depth = 0; depth < 3 && frontier.length; depth++) {
      const next = [];
      frontier.forEach((d) =>
        (idx.children[d] || []).forEach((k) => {
          if (seen.has(k)) return;
          seen.add(k);
          next.push(k);
          const dev = hass.devices[k] || {};
          if (skip.has(dev.model)) return;
          const entity = this._hypPickStatusEntity(idx.byDevice[k] || [], hass);
          if (!entity) return;
          host.services.push({ deviceId: k, name: dev.name_by_user || dev.name || entity, kind: dev.model || "", entity, sensors: sensorsOf(k), platform: (hass.entities[entity] || {}).platform || "" });
        })
      );
      frontier = next;
    }
    // Nothing hangs off the host directly (some integrations list every VM and container
    // as a device of the same integration entry instead): take the entry's other
    // devices that have a running/stopped status - but never other hosts.
    if (!host.services.length) {
      const entryOf = (d) => (d && (d.primary_config_entry || (d.config_entries && d.config_entries[0]))) || "";
      const entry = entryOf(hass.devices[devId]);
      const hostLike = /^(node|endpoint|cluster|host|server|hub|gateway)$/i;
      if (entry) {
        Object.entries(hass.devices).forEach(([did, dev]) => {
          if (did === devId || entryOf(dev) !== entry || skip.has(dev.model) || hostLike.test(dev.model || "") || (idx.children[did] || []).length) return;
          const entity = this._hypPickStatusEntity(idx.byDevice[did] || [], hass);
          if (!entity) return;
          host.services.push({ deviceId: did, name: dev.name_by_user || dev.name || entity, kind: dev.model || "", entity, sensors: sensorsOf(did), platform: (hass.entities[entity] || {}).platform || "" });
        });
      }
    }
    idx.hosts.set(n.entity, host);
    return host;
  }

  // The live reading of a list of sensors, sorted into CPU / memory / disk / uptime / ...
  _hypHostRoles(sensorIds, hass) {
    const list = sensorIds
      .map((id) => {
        const st = hass.states[id];
        if (!st) return null;
        const a = st.attributes || {};
        return { id, name: a.friendly_name || "", key: (hass.entities[id] || {}).translation_key || "", unit: a.unit_of_measurement || "", dc: a.device_class || "", state: st.state };
      })
      .filter(Boolean);
    return hypClassifyHostSensors(list);
  }

  // Chips for a host's roles: "CPU: 12%", "Memory: 61% (19.5 of 32 GiB)", "Uptime: 3d 4h" ...
  _hypHostChips(roles) {
    const chips = [];
    const val = (it) => parseFloat(it.state);
    const r1 = (v) => (Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10);
    const usage = (label, icon, pctIt, usedIt, totalIt) => {
      if (pctIt) return chips.push({ icon, label, text: `${label}: ${r1(val(pctIt))}%` });
      if (usedIt && totalIt && usedIt.unit === totalIt.unit && val(totalIt) > 0) {
        const u = val(usedIt);
        const t = val(totalIt);
        return chips.push({ icon, label, text: `${label}: ${Math.round((u / t) * 100)}% (${r1(u)} of ${r1(t)} ${usedIt.unit})` });
      }
      if (usedIt) chips.push({ icon, label, text: `${label}: ${r1(val(usedIt))} ${usedIt.unit}`.trim() });
    };
    if (roles.cpu) chips.push({ icon: "mdi:chip", label: "CPU", text: `CPU: ${r1(val(roles.cpu))}${roles.cpu.unit === "%" ? "%" : " " + roles.cpu.unit}`.trim() });
    usage("Memory", "mdi:memory", roles.mem, roles.memUsed, roles.memTotal);
    usage("Disk", "mdi:harddisk", roles.disk, roles.diskUsed, roles.diskTotal);
    if (roles.uptime) {
      const u = roles.uptime;
      let sec = NaN;
      if (u.dc === "timestamp") sec = (Date.now() - Date.parse(u.state)) / 1000;
      else sec = val(u) * ({ s: 1, min: 60, h: 3600, d: 86400 }[String(u.unit).toLowerCase()] || 1);
      const d = hypFmtDuration(sec);
      if (d) chips.push({ icon: "mdi:clock-outline", label: "Uptime", text: `Uptime: ${d}` });
    }
    if (roles.temp) chips.push({ icon: "mdi:thermometer", label: "Temperature", text: `${r1(val(roles.temp))} ${roles.temp.unit || "°C"}` });
    if (roles.load) chips.push({ icon: "mdi:gauge", label: "Load", text: `Load: ${r1(val(roles.load))}` });
    if (roles.netIn) chips.push({ icon: "mdi:download-network-outline", label: "Network in", text: `In: ${r1(val(roles.netIn))} ${roles.netIn.unit}`.trim() });
    if (roles.netOut) chips.push({ icon: "mdi:upload-network-outline", label: "Network out", text: `Out: ${r1(val(roles.netOut))} ${roles.netOut.unit}`.trim() });
    return chips;
  }

  // Whatever else the host's device reports that is not one of the main figures
  // (container counts, image, CPU model, ...): short readings as extra chips.
  _hypHostExtraChips(host, roles, hass) {
    const taken = new Set(Object.keys(roles).map((r) => roles[r].id));
    const dev = hass.devices[host.deviceId] || {};
    const hostName = String(dev.name_by_user || dev.name || "");
    const out = [];
    host.sensors.forEach((id) => {
      if (out.length >= 6 || taken.has(id)) return;
      const reg = hass.entities[id] || {};
      if (reg.entity_category === "config" || reg.hidden) return;
      const st = hass.states[id];
      if (!st || ["unknown", "unavailable", ""].includes(st.state)) return;
      const a = st.attributes || {};
      const num = Number.isFinite(parseFloat(st.state)) && /^-?[\d.]+$/.test(String(st.state).trim());
      if (!num && String(st.state).length > 30) return;
      let name = String(a.friendly_name || id.split(".")[1].replace(/_/g, " "));
      if (hostName && name.toLowerCase().startsWith(hostName.toLowerCase())) name = name.slice(hostName.length).trim();
      if (!name) return;
      const value = num ? `${Math.round(parseFloat(st.state) * 10) / 10}${a.unit_of_measurement ? " " + a.unit_of_measurement : ""}` : st.state;
      out.push({ icon: "mdi:information-outline", label: name, text: `${name}: ${value}` });
    });
    return out;
  }

  // running / stopped / paused / unknown, whatever word the integration uses.
  _hypServiceState(raw) {
    const s = String(raw == null ? "" : raw).toLowerCase();
    if (["on", "running", "true", "online", "active", "started", "up", "home", "healthy"].includes(s)) return "up";
    if (["off", "stopped", "exited", "dead", "false", "offline", "down", "not_home", "inactive", "shutdown"].includes(s)) return "down";
    if (["paused", "restarting", "created", "starting", "unhealthy", "suspended", "stopping", "removing"].includes(s)) return "warn";
    return "unknown";
  }

  // The Services list of a Homelab: its configured containers first, then any VM,
  // container or stack the registries show on the same host. Same look as the
  // Clients list.
  _hypServicesMarkup(fn, view, hass) {
    const cfg = this._config;
    if (cfg.hyperbolic_show_clients === false || fn.kind !== "homelab") return null;
    const colour = { up: "var(--green-color, #4caf50)", down: "var(--error-color, #db4437)", warn: "var(--warning-color, #ffa600)", unknown: "var(--disabled-text-color, #9e9e9e)" };
    const words = { up: "Running", down: "Stopped", warn: "Paused or starting", unknown: "Unavailable" };
    const rows = [];
    const have = new Set();
    fn.children
      .filter((k) => k.kind === "container")
      .forEach((k) => {
        const st = hass.states[k.entity];
        const state = st ? this._hypServiceState(st.state) : "unknown";
        have.add(k.entity);
        rows.push({ name: view.get(k.id).live.label || k.name, state, color: state === "up" ? k.colors.circle : colour[state], title: `${view.get(k.id).live.label} - ${words[state]}`, act: () => this._hypTap(k.id) });
      });
    const host = this._hypHostIndex(fn, hass);
    const guests = [...(host ? host.services : []), ...this._hypExtraGuests(fn, host, hass)];
    if (guests.length) {
      const seen = new Set();
      guests.forEach((s) => {
        if (have.has(s.entity) || seen.has(s.entity)) return;
        seen.add(s.entity);
        const st = hass.states[s.entity];
        if (!st) return;
        const state = this._hypServiceState(st.state);
        const res = this._hypHostChips(this._hypHostRoles(s.sensors, hass));
        const extra = res.length ? ` | ${res.map((c) => c.text).join(", ")}` : "";
        rows.push({ name: s.name, state, color: colour[state], title: `${s.name}${s.kind ? " (" + s.kind + ")" : ""} - ${words[state]}${extra}`, act: () => this._handleMoreInfo(s.entity) });
      });
    }
    // The totals cover every VM and container the server has, not only the ones listed (badges):
    // the two count entities chosen on the Server page, else count sensors on the host's device,
    // else what could be listed.
    const totals = this._hypServiceTotals(fn, rows, host, hass);
    if (!rows.length && !totals) return null;
    const order = { up: 0, warn: 1, down: 2, unknown: 3 };
    rows.sort((x, y) => order[x.state] - order[y.state] || String(x.name).localeCompare(String(y.name), undefined, { numeric: true, sensitivity: "base" }));
    const countText = totals ? (totals.running != null ? `${totals.running} of ${totals.total} online` : `${totals.total} in total`) : "";
    const more = totals && totals.total > rows.length;
    return b`
      <div class="hyp-clients">
        <div class="hyp-cl-head"><span class="hyp-g-title">Services</span><span class="hyp-cl-count" title=${totals ? `All VMs and containers on this server (${totals.source})` : ""}>${countText}</span></div>
        ${rows.length
          ? b`<div class="hyp-cl-grid">
              ${rows.map(
                (r) => b`<button type="button" class="hyp-cl ${r.state === "up" ? "" : "off"}" title=${r.title} @click=${() => r.act()}>
                  <i class="hyp-cl-dot" style=${`background:${r.color}`}></i><span>${r.name}</span>
                </button>`
              )}
            </div>`
          : null}
        ${more ? b`<div class="hyp-cl-note">${rows.length ? `Showing ${rows.length} of ${totals.total}` : `Not listed individually`} - add a VM or container to this server to list it here</div>` : null}
      </div>`;
  }

  // VMs and containers that belong to a server but are not linked to it in Home Assistant's
  // registries (no integration links a Proxmox node to its guests, or a Docker host in one
  // integration to the VMs of another). Two ways to find them:
  //  - a label: give the server a label name (Server page) and put the same label on its VMs
  //    and containers (Settings > Devices, select them, Add label). Works with any integration.
  //  - the integration itself: for Proxmox VE, Portainer and Monitor Docker, with no label set,
  //    the other status sensors of the same integration are taken to be its guests.
  _hypExtraGuests(fn, host, hass) {
    if (!hass || !hass.entities) return [];
    const cfg = fn.cfg || {};
    const reg = hass.entities[fn.entity] || {};
    const hostDev = reg.device_id || "";
    const idx = this._hypRegistryIndex(hass);
    const slug = (v) => String(v || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const label = slug(cfg.guest_label);
    const out = [];
    const sensorsOf = (did) => (idx.byDevice[did] || []).filter((e) => e.startsWith("sensor."));
    const isStatus = (e) => e.startsWith("binary_sensor.") || e.startsWith("switch.");
    const addDevice = (did) => {
      const dev = (hass.devices && hass.devices[did]) || {};
      const entity = this._hypPickStatusEntity(idx.byDevice[did] || [], hass);
      if (entity && entity !== fn.entity) out.push({ name: dev.name_by_user || dev.name || entity, kind: dev.model || "", entity, sensors: sensorsOf(did) });
    };
    if (label) {
      const labelled = new Set();
      Object.entries(hass.devices || {}).forEach(([did, dev]) => {
        if (did === hostDev || !((dev && dev.labels) || []).includes(label)) return;
        labelled.add(did);
        addDevice(did);
      });
      Object.entries(hass.entities).forEach(([eid, e]) => {
        if (eid === fn.entity || !isStatus(eid) || !(e.labels || []).includes(label)) return;
        if (e.device_id && labelled.has(e.device_id)) return; // already counted through its device
        const st = hass.states[eid];
        out.push({ name: (st && st.attributes && st.attributes.friendly_name) || eid, kind: "", entity: eid, sensors: [] });
      });
      return out;
    }
    if (host && host.services.length) return out; // the registries already linked them
    const platform = reg.platform || "";
    if (!["proxmoxve", "portainer", "monitor_docker"].includes(platform)) return out;
    const hostLike = /^(node|endpoint|cluster|host|server|hub|gateway)$/i;
    const seenDev = new Set([hostDev]);
    Object.entries(hass.entities).forEach(([eid, e]) => {
      if (e.platform !== platform || eid === fn.entity || (e.device_id && e.device_id === hostDev)) return;
      if (e.device_id) {
        if (seenDev.has(e.device_id)) return;
        const dev = (hass.devices && hass.devices[e.device_id]) || {};
        if (hostLike.test(dev.model || "") || (idx.children[e.device_id] || []).length || /^(Storage|Shared storage|Cluster|Volume|Image|Network)$/.test(dev.model || "")) return;
        const entity = this._hypPickStatusEntity(idx.byDevice[e.device_id] || [], hass);
        if (!entity || entity === fn.entity) return;
        seenDev.add(e.device_id);
        addDevice(e.device_id);
      } else if (e.platform === platform && eid.startsWith("binary_sensor.") && ((hass.states[eid] || {}).attributes || {}).device_class === "running") {
        out.push({ name: ((hass.states[eid] || {}).attributes || {}).friendly_name || eid, kind: "", entity: eid, sensors: [] });
      }
    });
    return out;
  }

  // How many VMs / containers the server has and how many are online, from the best source
  // there is. Never fewer than are listed.
  _hypServiceTotals(fn, rows, host, hass) {
    const ent = (fn.cfg && fn.cfg.entities) || {};
    const num = (id) => {
      const st = id && hass.states[id];
      const v = st ? parseFloat(st.state) : NaN;
      return Number.isFinite(v) ? Math.round(v) : null;
    };
    let total = num(ent.services_total);
    let running = num(ent.services_running);
    let source = total != null || running != null ? "your count entities" : "";
    if ((total == null || running == null) && host) {
      const list = host.sensors
        .map((id) => {
          const st = hass.states[id];
          const a = (st && st.attributes) || {};
          return st ? { id, name: a.friendly_name || "", key: (hass.entities[id] || {}).translation_key || "", unit: a.unit_of_measurement || "", state: st.state } : null;
        })
        .filter(Boolean);
      const counts = hypServiceCounts(list);
      if (total == null && counts.total != null) {
        total = counts.total;
        source = source || "the host's count sensors";
      }
      if (running == null && counts.running != null) {
        running = counts.running;
        source = source || "the host's count sensors";
      }
    }
    const listedUp = rows.filter((r) => r.state === "up").length;
    if (total == null && running == null) {
      if (!rows.length) return null;
      return { total: rows.length, running: listedUp, source: "the VMs and containers listed" };
    }
    if (total == null) total = Math.max(rows.length, running);
    total = Math.max(total, rows.length);
    if (running != null) running = Math.min(total, Math.max(running, listedUp));
    return { total, running, source };
  }

  // The PoE ports of a switch, each with the watts it is delivering - same layout as
  // the Clients list. Ports come from the switch's own attributes (UniFi Device Info) or,
  // failing that, from per-port PoE wattage sensors on the same device (UniFi Network,
  // Omada ...: unit W, "poe" and a port number in the name).
  _hypPoePorts(fn, hass) {
    const so = fn.entity && hass.states[fn.entity];
    if (!so) return [];
    let ports = hypPoePortsFromAttrs(so.attributes);
    if (ports.length) return ports;
    const reg = hass.entities && hass.entities[fn.entity];
    if (!reg || !reg.device_id) return [];
    const idx = this._hypRegistryIndex(hass);
    const found = new Map();
    (idx.byDevice[reg.device_id] || []).forEach((eid) => {
      const st = hass.states[eid];
      if (!st || !eid.startsWith("sensor.") || (st.attributes || {}).unit_of_measurement !== "W") return;
      const hay = `${eid} ${(st.attributes || {}).friendly_name || ""}`;
      if (!/poe/i.test(hay)) return;
      const mm = /port[\s_]*(\d+)/i.exec(hay);
      if (!mm) return;
      const port = parseInt(mm[1], 10);
      const w = parseFloat(st.state);
      if (!found.has(port)) found.set(port, { port, watts: Number.isFinite(w) ? w : 0, enabled: true, up: null, entity: eid });
    });
    ports = [...found.values()].sort((a, b) => a.port - b.port);
    return ports;
  }

  _hypPoePortsMarkup(fn, hass) {
    if (this._config.hyperbolic_show_clients === false || ["client", "count", "group", "service", "container"].includes(fn.kind)) return null;
    const ports = this._hypPoePorts(fn, hass);
    if (!ports.length) return null;
    const total = ports.reduce((a, p) => a + p.watts, 0);
    const active = ports.filter((p) => p.watts > 0).length;
    // ports that are delivering power first (in port order), then the idle ones - the
    // way online clients come before offline ones
    ports.sort((x, y) => Number(y.watts > 0) - Number(x.watts > 0) || x.port - y.port);
    return b`
      <div class="hyp-clients hyp-ports">
        <div class="hyp-cl-head"><span class="hyp-g-title">PoE Ports</span><span class="hyp-cl-count">${hypFmtWatts(total)} - ${active} of ${ports.length} in use</span></div>
        <div class="hyp-cl-grid">
          ${ports.map((p) => {
            const state = p.watts > 0 ? "Drawing power" : p.up === false ? "No device (link down)" : "PoE on, nothing drawing";
            const tip = `Port ${p.port} - ${state} - ${hypFmtWatts(p.watts)}`;
            const inner = b`<i class="hyp-cl-dot" style=${`background:${p.watts > 0 ? "var(--green-color, #4caf50)" : "var(--disabled-text-color, #9e9e9e)"}`}></i><span>Port ${p.port}</span><span class="hyp-cl-val">${hypFmtWatts(p.watts)}</span>`;
            return p.entity
              ? b`<button type="button" class="hyp-cl ${p.watts > 0 ? "" : "off"}" title=${tip} @click=${() => this._handleMoreInfo(p.entity)}>${inner}</button>`
              : b`<div class="hyp-cl static ${p.watts > 0 ? "" : "off"}" title=${tip}>${inner}</div>`;
          })}
        </div>
      </div>`;
  }

  // The Home Assistant device an entity belongs to, if the button should go there.
  _hypDeviceIdFor(entityId, hass) {
    if (!entityId || this._config.hyperbolic_details_button === "more-info") return "";
    if (hass && hass.user && hass.user.is_admin === false) return ""; // Settings is not open to them
    const reg = hass && hass.entities && hass.entities[entityId];
    return (reg && reg.device_id) || "";
  }

  // Goes to a device's page the way Home Assistant's own links do.
  _hypOpenDevice(deviceId) {
    if (this._popupOpen) this._closePopup();
    const path = `/config/devices/device/${deviceId}`;
    window.history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false }, bubbles: true, composed: true }));
  }

  // Everything the panel can say about one client: where it is connected, its
  // addresses, Wi-Fi details, and when it was last online.
  _hypClientInfoMarkup(fn, view, hass) {
    const st = hass.states[fn.entity];
    if (!st) return null;
    const parent = fn.parentNode;
    const attachedTo = parent && (["ap", "switch", "homelab"].includes(parent.kind) || parent.isRouter) ? view.get(parent.id).live.label : "";
    const rows = hypClientInfo(st.attributes, {
      online: !view.get(fn.id).live.offline,
      changed: Date.parse(st.last_changed),
      attachedTo,
      area: getEntityAreaName(hass, fn.entity),
      now: Date.now()
    });
    if (!rows.length) return null;
    return b`
      <div class="hyp-info">
        <div class="hyp-cl-head"><span class="hyp-g-title">Client Info</span></div>
        <div class="hyp-info-grid">
          ${rows.map((r) => b`<div class="hyp-kv" title=${r.title}><span class="hyp-k">${r.label}</span><span class="hyp-v">${r.value}</span></div>`)}
        </div>
      </div>`;
  }

  // The details panel for the selected node: header, chips, connected clients
  // and history graphs. Shared by the Hyperbolic view and the Flat view's
  // details layout - both pass a `view` map of each node's live state, and the
  // hint line that suits how that view is used.
  _hypDetailsMarkup({ view, mode, hint, hass }) {
    const cfg = this._config;
    const layout = this._hypLayout;
    const hs = this._hyp;
    const fn = layout.byId[hs.focusId] || layout.root;
    const fv = view.get(fn.id);
    const entity = this._hypMoreInfoEntity(fn);
    // The header button goes to the node's device page in Home Assistant (Settings > Devices,
    // under the integration it comes from) when it has one; otherwise - no device, or a
    // user who cannot open Settings, or "More Info" chosen in the editor - it opens the
    // entity's own dialog.
    const deviceId = this._hypDeviceIdFor(entity, hass);
    const deviceTitle = deviceId ? `Open this device's page${hass.devices && hass.devices[deviceId] && (hass.devices[deviceId].name_by_user || hass.devices[deviceId].name) ? " - " + (hass.devices[deviceId].name_by_user || hass.devices[deviceId].name) : ""}` : "";
    const circle = fv.live.offline ? fn.colors.offline : fn.colors.circle;
    const iconColor = fv.live.offline ? fn.colors.offlineIcon || fn.colors.offline : fn.colors.icon;
    const chips = [...fv.live.metrics];
    const quota = fn.isInternet && !fv.live.offline ? this._hypQuota(fn, hass) : null;
    // Internet with a quota reading: its outline is the quota ring (as on the circle in the
    // tree / diagram), not the Border Color - so the little icon here gets the ring too.
    const headRing = quota
      ? w`<svg class="hyp-d-ring" viewBox="0 0 100 100" aria-hidden="true">
          <g transform="rotate(-90 50 50)">
            <circle cx="50" cy="50" r="47" fill="none" stroke=${fn.quota.colorRem} stroke-width="6"></circle>
            <circle cx="50" cy="50" r="47" fill="none" stroke=${fn.quota.colorProg} stroke-width="6" stroke-dasharray=${`${(quota.used / 100) * 2 * Math.PI * 47} ${2 * Math.PI * 47}`}></circle>
          </g>
        </svg>`
      : null;
    if (quota) {
      chips.push({
        icon: "mdi:chart-donut",
        label: "Quota",
        text: `Quota: ${Math.round(quota.left)}% left (${quota.r.display}${quota.r.unit ? " " + quota.r.unit : ""} of ${quota.t.display}${quota.t.unit ? " " + quota.t.unit : ""})`,
        color: fn.quota.colorProg
      });
    }
    (fn.ipChips || []).forEach((ic) => {
      const v = this._hypIpValue(hass, ic.entity, ic.slot);
      if (v) chips.push({ icon: "mdi:ip-network", label: ic.label, text: `${ic.label}: ${v}` });
    });
    // A switch, server or access point with no address entity chosen: look for it.
    if (!(fn.ipChips || []).length && ["switch", "homelab", "ap"].includes(fn.kind) && fn.cfg) {
      const v = this._nodeIpValue(hass, fn.cfg);
      if (v) chips.push({ icon: "mdi:ip-network", label: "IP Address", text: `IP Address: ${v}` });
    }
    // A Homelab (or one of its containers): CPU, memory, disk, uptime ... from the
    // sensors Proxmox / Portainer put on the same device.
    if (fn.kind === "homelab" || fn.kind === "container") {
      const host = this._hypHostIndex(fn, hass);
      if (host) {
        const roles = this._hypHostRoles(host.sensors, hass);
        this._hypHostChips(roles).forEach((ch) => chips.push(ch));
        this._hypHostExtraChips(host, roles, hass).forEach((ch) => chips.push(ch));
      }
    }
    // CPU, RAM, traffic, temperature, PoE power, ports and firmware, for any device
    // whose own entity reports them as attributes (UniFi Device Info and similar).
    // Where the same figure is already shown (a configured download/upload entity, or
    // a Homelab's own CPU/memory sensors), it is not repeated.
    if (!["client", "count", "group", "service"].includes(fn.kind) && fn.entity && hass.states[fn.entity]) {
      const canon = (l) => String(l).toLowerCase().replace(/^ram$/, "memory");
      const have = new Set(chips.map((ch) => canon(ch.label)));
      const so = hass.states[fn.entity];
      hypDeviceStats(so.attributes, so.state).forEach((st) => {
        if (have.has(canon(st.label))) return;
        have.add(canon(st.label));
        chips.push({ icon: st.icon, label: st.label, text: st.text, title: st.title });
      });
    }
    this._hypBadgeItems(fn, hass).forEach((it) => {
      if (!it.visible || !it.chip) return;
      const ch = it.chip();
      if (ch) chips.push({ ...ch, label: it.key });
    });
    // Panel colours: blank = the theme's card colour and divider colour.
    // (the colours themselves are set higher up, on the whole card content,
    // so the summary card can share them)
    const detailsStyle = `--hyp-accent:${iconColor};`;
    // Graphs for this node (throughput, latency, devices, response time).
    const graphs = this._hypGraphsFor(fn);
    graphs.forEach((g) => this._hypEnsureHistory(g.series.flatMap((s) => s.entities || [s.entity]), hypRange(this._hypRangeKey(g.id)).ms));
    // Clients connected to this device (or sitting under this Unknown /
    // group node): a dot in each client's own online / offline colour and
    // its name, online ones first. Tapping one centres it on the tree.
    let clientsBlock = this._hypServicesMarkup(fn, view, hass);
    const infoBlock = fn.kind === "client" && fn.entity ? this._hypClientInfoMarkup(fn, view, hass) : null;
    const poeBlock = this._hypPoePortsMarkup(fn, hass);
    const clientNodes = cfg.hyperbolic_show_clients === false ? [] : fn.children.filter((k) => k.kind === "client");
    if (clientNodes.length) {
      const rows = clientNodes
        .map((k) => ({ k, lv: view.get(k.id).live }))
        .sort((x, y) => Number(x.lv.offline) - Number(y.lv.offline) || String(x.lv.label).localeCompare(String(y.lv.label), undefined, { numeric: true, sensitivity: "base" }));
      const online = rows.filter((r) => !r.lv.offline).length;
      clientsBlock = b`
        <div class="hyp-clients">
          <div class="hyp-cl-head"><span class="hyp-g-title">Clients</span><span class="hyp-cl-count">${online} of ${rows.length} online</span></div>
          <div class="hyp-cl-grid">
            ${rows.map(
              ({ k, lv }) => b`<button type="button" class="hyp-cl ${lv.offline ? "off" : ""}" title=${`${lv.label} - ${lv.offline ? "Offline" : "Online"}`} @click=${() => this._hypTap(k.id)}>
                <i class="hyp-cl-dot" style=${`background:${lv.offline ? k.colors.offline : k.colors.circle}`}></i><span>${lv.label}</span>
              </button>`
            )}
          </div>
        </div>`;
    }
    return b`
      <div class="hyp-details" style=${detailsStyle}>
        <div class="hyp-d-head">
          <div class="hyp-d-icon" style="--c:${quota ? "transparent" : circle};--ic:${iconColor}">${headRing}${renderIcon(fn.icon, "--mdc-icon-size:20px")}</div>
          <div class="hyp-d-main">
            <div class="hyp-d-name">${fn.kind === "count" ? "Connected clients" : fv.live.label}</div>
            <div class="hyp-d-state ${fv.live.offline ? "off" : ""}">${fv.live.stateText}</div>
          </div>
          ${entity
            ? deviceId
              ? b`<button class="hyp-d-btn" style=${`--bc:${iconColor}`} title=${deviceTitle} @click=${() => this._hypOpenDevice(deviceId)}>Device Page</button>`
              : b`<button class="hyp-d-btn" style=${`--bc:${iconColor}`} @click=${() => {
                  this._markDirectMoreInfo();
                  this._handleMoreInfo(entity);
                }}>More Info</button>`
            : null}
        </div>
        ${chips.length
          ? b`<div class="hyp-chips">${chips.map(
              (m) => b`<span class="hyp-chip" title=${m.title || m.label}>${renderIcon(m.icon, `--mdc-icon-size:14px;${m.color ? "color:" + m.color : ""}`)}${m.text}</span>`
            )}</div>`
          : null}
        ${infoBlock}
        ${clientsBlock}
        ${poeBlock}
        ${graphs.length ? b`<div class="hyp-graphs">${graphs.map((g) => this._hypGraphMarkup(g, hass))}</div>` : null}
        ${mode === "tablet" ? hint : null}
      </div>
      ${mode === "tablet" ? null : hint}
    `;
  }

  // The summary card: the same items, in the same order, as Flat's strip, drawn
  // as a card of its own. Returns it with whether it belongs below the
  // diagram (stacked layout with Summary Position other than Top).
  _hypSummaryMarkup(hass, mode) {
    const cfg = this._config;
    let summary = null;
    let summaryBottom = false;
    if (cfg.show_summary !== false) {
      const internet = cfg.internet;
      const ctx = {
        downloadState: getEntityState(hass, internet.entities.download),
        uploadState: getEntityState(hass, internet.entities.upload),
        totalDlState: getEntityState(hass, internet.entities.total_download),
        totalUlState: getEntityState(hass, internet.entities.total_upload),
        pingState: getEntityState(hass, internet.entities.ping),
        jitterState: getEntityState(hass, internet.entities.jitter)
      };
      const rows = (cfg.summary_items || ["realtime_download", "realtime_upload", "ping"])
        .slice(0, 5)
        .map((key) => this._renderSummaryItem(key, cfg, hass, ctx))
        .filter(Boolean);
      // A card of its own: optional "Summary" title, colours from the editor
      // (blank = the theme's card and divider colours), and the items in as
      // many columns as fit - two in a normal panel.
      const summaryStyle =
        (cfg.hyperbolic_summary_background_color ? `--hyp-summary-bg:${cfg.hyperbolic_summary_background_color};` : "") +
        (cfg.hyperbolic_summary_outline_color ? `--hyp-summary-outline:${cfg.hyperbolic_summary_outline_color};` : "");
      if (rows.length) {
        // Stacked layout: Top puts it above the tree; Bottom, Left and Right
        // (there is no side to put it on) put it just below the tree, above
        // the details panel.
        summaryBottom = mode !== "tablet" && ["bottom", "left", "right"].includes(cfg.summary_position);
        summary = b`<div class=${summaryBottom ? "hyp-summary at-bottom" : "hyp-summary"} style=${summaryStyle}>
          ${cfg.hyperbolic_summary_show_title === true ? b`<div class="hyp-sum-title">Summary</div>` : null}
          <div class="hyp-sum-grid" @click=${{ handleEvent: () => this._markDirectMoreInfo(), capture: true }}>${rows}</div>
        </div>`;
      }
    }
    return { summary, summaryBottom };
  }

  _renderHyperbolic() {
    const cfg = this._config;
    const hass = this.hass;
    const hs = this._hyp;
    if (!this._hypLayout || !hs) return b``;
    this._hypSync(hass);
    const layout = this._hypLayout;

    const showLabels = cfg.hyperbolic_show_labels !== false;
    const showDetails = cfg.hyperbolic_show_details !== false;
    const animate = cfg.enable_animations === true;
    const minDur = cfg.min_flow_duration ?? 0.6;
    const maxDur = cfg.max_flow_duration ?? 6;
    const lineColor = cfg.flow_line_color || "var(--divider-color, #ccc)";
    const V = hs.V;
    const stageW = this._hypStageW || 400;

    const view = new Map();
    layout.nodes.forEach((n) => {
      view.set(n.id, { u: hypClampToDisk(hypApply(V, n.z), 0.99995), live: this._hypLive(n, hass) });
    });

    // Edges first (SVG), geodesic arcs between the displayed centres.
    const edges = [];
    const flows = [];
    layout.nodes.forEach((p) => {
      const pu = view.get(p.id).u;
      p.children.forEach((c) => {
        const cv = view.get(c.id);
        const e = c.edge || {};
        const dashed = !!e.dashed || !!e.standby || (e.dashedUnlessWired && c.cfg && !isBackhaulWired(hass, c.cfg));
        const cls = `hyp-edge${cv.live.offline ? " off" : dashed ? " dashed" : ""}`;
        edges.push(w`<path class=${cls} d=${hypGeodesicPath(pu, cv.u)} style="stroke:${cv.live.offline ? "var(--error-color)" : lineColor}"></path>`);
        if (!animate || cv.live.offline) return;
        const down = e.down ? getEntityState(hass, e.down) : null;
        const up = e.up ? getEntityState(hass, e.up) : null;
        // A normal edge's "download" runs parent -> child; the Internet
        // edge is the other way round because the router is the root.
        const downPath = e.flip ? hypGeodesicPath(cv.u, pu) : hypGeodesicPath(pu, cv.u);
        const upPath = e.flip ? hypGeodesicPath(pu, cv.u) : hypGeodesicPath(cv.u, pu);
        if (down && down.value > 0) {
          flows.push(w`<path class="hyp-flow" d=${downPath} style="stroke:${e.downColor || "var(--blue-color)"}; animation-duration:${calcFlowDuration(down.value, minDur, maxDur)}s"></path>`);
        }
        if (up && up.value > 0) {
          flows.push(w`<path class="hyp-flow" d=${upPath} style="stroke:${e.upColor || "var(--orange-color)"}; animation-duration:${calcFlowDuration(up.value, minDur, maxDur)}s"></path>`);
        }
      });
    });

    // Nodes as HTML so they can hold real <ha-icon>s (foreignObject inside
    // transformed SVG is unreliable on iOS). Position and size are
    // percentages of the stage; 1 disk unit = 46% of its width.
    const zoom = hs.zoom || 1;
    const nodeEls = layout.nodes.map((n) => {
      const { u: u0, live } = view.get(n.id);
      // Zoom scales positions and sizes about the centre of the view.
      const circ = hypCircle(n.rho, u0);
      const u = [circ.c[0] * zoom, circ.c[1] * zoom];
      const rDisk = Math.max(circ.r * zoom, 0.011);
      // Wholly outside the visible square: nothing to draw.
      if (Math.hypot(u[0], u[1]) - rDisk > 1.02) return null;
      const wPct = rDisk * 2 * 46;
      const focus = n.id === hs.focusId;
      const tiny = wPct < 5;
      const circle = live.offline ? n.colors.offline : n.colors.circle;
      const iconColor = live.offline ? n.colors.offlineIcon || n.colors.offline : n.colors.icon;
      // Internet: the quota ring replaces the border while it has a reading,
      // as in Flat; a backup link on standby keeps its dashed outline.
      const quota = n.isInternet && !live.offline && !tiny ? this._hypQuota(n, hass) : null;
      const ring = quota
        ? this._ring(quota.used, 100 - quota.used, n.quota.colorRem, n.quota.colorProg, n.quota.remaining, this._hypBackupDashed(n, view, layout))
        : null;
      const z = 1 + Math.round((1 - HYP_C.abs(u0)) * 1000) + (focus ? 2000 : 0);
      const style =
        `left:${(50 + 46 * u[0]).toFixed(3)}%;top:${(50 + 46 * u[1]).toFixed(3)}%;width:${wPct.toFixed(3)}%;` +
        `--c:${quota ? "transparent" : circle};--ic:${iconColor};--is:${(wPct * 0.52).toFixed(2)}cqw;--bw:${Math.max(1, Math.min(3, wPct * 0.22)).toFixed(1)}px;z-index:${z}`;
      const cls = `hyp-node${this._hypBackupDashed(n, view, layout) ? " dashed" : ""}${focus ? " focus" : ""}${live.offline ? " offline" : ""}${live.offline && animate ? " pulse" : ""}${tiny ? " tiny" : ""}`;
      const label = n.kind !== "count" && (focus || (showLabels && wPct >= 9)) && !tiny ? b`<span class="hyp-label">${live.label}</span>` : null;
      // A Connected Clients circle shows its number in place of an icon,
      // sized to fit however many characters it has.
      const len = String(live.label).length;
      const countText =
        n.kind === "count"
          ? b`<span class="hyp-count" style="font-size:${(wPct * (len <= 3 ? 0.36 : len === 4 ? 0.29 : 0.23)).toFixed(2)}cqw">${live.label}</span>`
          : null;
      // Badges are drawn by the same renderers the flat view uses, inside a
      // layer sized like that view's circle and scaled to this node - so
      // they shrink and grow with it, and drop away once too small to read.
      let badge = null;
      const dPx = (wPct / 100) * stageW;
      if (dPx >= 30) {
        const items = this._hypBadgeItems(n, hass);
        const shown = items.filter((it) => it.visible);
        if (shown.length) {
          const stacks = computeBadgeStacks(items);
          const s = Math.max(0.5, Math.min(1.5, dPx / this._hypBaseSize(n)));
          const side = (dPx / s).toFixed(1);
          badge = b`<div class="hyp-badges" style="width:${side}px;height:${side}px;transform:translate(-50%,-50%) scale(${s.toFixed(3)})">${shown.map((it) => it.render(stacks[it.key] || 0))}</div>`;
        }
      }
      return b`<div
        class=${cls}
        style=${style}
        data-hyp-id=${n.id}
        role="button"
        tabindex="0"
        aria-label=${`${live.label}${live.stateText ? ", " + live.stateText : ""}`}
        @keydown=${(ev) => this._hypKeyDown(ev, n.id)}
      >
        ${ring}${tiny ? null : countText || renderIcon(n.icon)}${badge}${label}
      </div>`;
    });

    // Mobile: summary on top, tree, details underneath. Tablet: the tree on
    // the left at the chosen share of the width, summary and details in a
    // column on the right. Auto picks by the card's own width.
    const split = Math.max(50, Math.min(85, Number(cfg.hyperbolic_tablet_split) || 70));
    // Fit on (the default): the tree is a square exactly as tall as the
    // screen allows, and its column is exactly that wide - so the width share
    // works itself out for each display. Fit off: the width share set in the
    // editor is used instead.
    let treeColStyle = `flex:0 0 ${split}%;max-width:${split}%`;
    let stageSide = this._hypStageW || 0;
    if (cfg.hyperbolic_fit_height !== false) {
      const vh = (typeof window !== "undefined" && ((window.visualViewport && window.visualViewport.height) || window.innerHeight)) || 800;
      let side = this._hypFitSide || Math.max(300, Math.floor(vh - 140));
      const room = (this._hypCardW || 0) - 24;               // the card's content width
      if (room > 0) side = Math.min(side, Math.max(300, room - 16 - 260)); // always leave 260px for the side column
      treeColStyle = `flex:0 0 ${side}px;max-width:${side}px`;
      stageSide = side;
    }
    const mode = this._hypArrangement();
    // A wide screen shown stacked (details as a pop-up): the tree fills the card's width,
    // as tall as the screen allows with "fit to screen height".
    const wide = this._hypLayoutMode() === "tablet" && mode === "mobile";
    const wideStyle = wide && cfg.hyperbolic_fit_height !== false && this._hypFitSide ? `--hyp-wide-side:${this._hypFitSide}px;` : "";

    // In the tablet layout the side column is as tall as the tree circle, so the
    // details panel ends exactly where the circle does (the circle fills 92%
    // of the square stage, so its bottom edge is 96% of the way down).
    const sideStyle = mode === "tablet" && stageSide ? `height:${Math.round(stageSide * 0.96)}px` : "";

    // The details panel's own colours, set once for the whole card: the summary
    // card uses them too unless it has colours of its own.
    const panelVars = this._hypPanelVars(showDetails);
    const hint = b`<div class="hyp-hint">Drag to explore - tap a node to centre it, tap again for details</div>`;
    const popupOn = showDetails && this._hypPopupOn();
    const details = showDetails && !popupOn ? this._hypDetailsMarkup({ view, mode, hint, hass }) : null;
    const popup = popupOn ? this._hypPopupMarkup({ view, mode, hass }) : null;

    const { summary, summaryBottom } = this._hypSummaryMarkup(hass, mode);

    // Circle outline and background: a colour each (blank = the theme's own)
    // and a transparency each, 0% solid to 100% invisible.
    const pct = (v, d) => Math.max(0, Math.min(100, Number.isFinite(Number(v)) ? Number(v) : d));
    const tOut = pct(cfg.hyperbolic_outline_transparency, 0);
    const tBg = pct(cfg.hyperbolic_background_transparency, 45);
    // Glass style: an iOS-like frosted disc (see the .hyp-glass CSS). The
    // blur strength and the zoom reach the pseudo-elements as CSS variables.
    const glass = cfg.hyperbolic_glass === true;
    const blurPx = pct(cfg.hyperbolic_glass_blur, 45) * 0.4;
    const treeStyle =
      `--hyp-zoom:${zoom.toFixed(4)};` +
      (cfg.hyperbolic_outline_color ? `--hyp-outline:${cfg.hyperbolic_outline_color};` : "") +
      (cfg.hyperbolic_background_color ? `--hyp-bg:${cfg.hyperbolic_background_color};` : "") +
      `--hyp-outline-op:${(100 - tOut) / 100};--hyp-bg-op:${(100 - tBg) / 100}`;

    // Line widths and dashes, in the SVG's own units. (The usual way - letting
    // the browser keep a stroke a fixed number of screen pixels wide - makes
    // some renderers draw dashed lines twice, so the sizes are worked out here:
    // one pixel is 2.174 / (stage width x zoom) units.)
    const u = 2.174 / (stageW * zoom);
    const lineVars = `--hyp-ew:${(1.6 * u).toFixed(6)};--hyp-fw:${(2.6 * u).toFixed(6)};--hyp-d2:${(2 * u).toFixed(6)};--hyp-d5:${(5 * u).toFixed(6)};--hyp-d14:${(14 * u).toFixed(6)};--hyp-doff:${(-16 * u).toFixed(6)}`;
    const stage = b`
      <div class="hyp-stage-wrap">
        <div
          class="hyp-stage"
          style=${treeStyle}
          @pointerdown=${(e) => this._hypPointerDown(e)}
          @pointermove=${(e) => this._hypPointerMove(e)}
          @pointerup=${(e) => this._hypPointerUp(e)}
          @pointercancel=${(e) => this._hypPointerEnd(e, true)}
          @wheel=${(e) => this._hypWheel(e)}
          @gesturestart=${(e) => e.preventDefault()}
          @gesturechange=${(e) => e.preventDefault()}
        >
          <!-- Three layers: the circle's background, the network (zoomed, and cut
               off at the circle by CSS - clipping inside the SVG made some
               browsers draw dashed lines twice), and the circle's edge on top. -->
          <svg class="hyp-svg" viewBox="-1.087 -1.087 2.174 2.174" preserveAspectRatio="xMidYMid meet">
            <circle class="hyp-rim" r="1"></circle>
          </svg>
          <svg class="hyp-svg hyp-svg-content" style=${lineVars} viewBox="-1.087 -1.087 2.174 2.174" preserveAspectRatio="xMidYMid meet">
            <g transform=${`scale(${zoom.toFixed(4)})`}>${edges}${flows}</g>
          </svg>
          <svg class="hyp-svg" viewBox="-1.087 -1.087 2.174 2.174" preserveAspectRatio="xMidYMid meet">
            <circle class="hyp-rim-ring" r="1"></circle>
          </svg>
          <div class="hyp-nodes">${nodeEls}</div>
          <div class="hyp-controls">
            <button class="hyp-btn hyp-reset" title="Re-centre" aria-label="Re-centre view" @click=${() => this._hypResetView()}>${renderIcon("mdi:crosshairs-gps")}</button>
            <button class="hyp-btn hyp-zoom-in" title="Zoom in" aria-label="Zoom in" ?disabled=${(this._hypZoomGoal ?? zoom) >= HYP_ZOOM_MAX - 1e-6} @click=${() => this._hypZoomBy(HYP_ZOOM_STEP)}>${renderIcon("mdi:plus")}</button>
            <button class="hyp-btn hyp-zoom-out" title="Zoom out" aria-label="Zoom out" ?disabled=${(this._hypZoomGoal ?? zoom) <= HYP_ZOOM_MIN + 1e-6} @click=${() => this._hypZoomBy(1 / HYP_ZOOM_STEP)}>${renderIcon("mdi:minus")}</button>
          </div>
        </div>
      </div>
    `;

    return b`
      <ha-card class=${glass && cfg.hyperbolic_glass_clear_card !== false ? "hyp-glass-card" : ""}>
        ${cfg.title ? b`<h1 class="card-header">${cfg.title}</h1>` : null}
        <div
          class="card-content hyp-content hyp-${mode}${wide ? " hyp-wide" : ""}${cfg.hyperbolic_fit_height !== false ? " hyp-fit" : ""}${glass ? " hyp-glass" : ""}${glass && cfg.hyperbolic_background_color ? " glass-tint" : ""}"
          style=${(glass ? `--hyp-blur:${blurPx.toFixed(1)}px;` : "") + wideStyle + panelVars}
        >
          ${mode === "tablet"
            ? b`<div class="hyp-cols">
                <div class="hyp-col-tree" style=${treeColStyle}>${stage}</div>
                <div class="hyp-col-side" style=${sideStyle}>${summary}${details}</div>
              </div>`
            : summaryBottom
              ? b`${stage}${summary}${details}`
              : b`${summary}${stage}${details}`}
          ${popup}
        </div>
      </ha-card>
    `;
  }

  _handleMoreInfo(entityId, nodeId) {
    // Flat view with the details panel on: a tap on a circle selects that node
    // first (the panel shows it); tapping the selected one opens it. Summary
    // rows are marked to open straight away. The main circles (Internet, Router,
    // LAN, Core Switch) pass the node they are - they can share one entity (a
    // gateway that is both the Internet and the Router), and one can have none.
    if (this._flatDetailsOn() && this._hyp && !this._directMoreInfo) {
      const id = nodeId || (entityId ? this._flatNodeForEntity(entityId) : null);
      if (id && this._hypLayout && this._hypLayout.byId[id]) {
        if (this._hypPopupOn()) {
          // as a pop-up, a tap on a circle always opens its details
          this._hyp.focusId = id;
          this._openPopup();
          this.requestUpdate();
          return;
        }
        if (id !== this._hyp.focusId) {
          this._hyp.focusId = id;
          this.requestUpdate();
          return;
        }
      }
    }
    if (!entityId) return;
    // Home Assistant's own dialog opens below the browser's top layer, so a sheet in the way closes first.
    if (this._popupOpen) this._closePopup();
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId }
    });
    this.dispatchEvent(event);
  }

  // Shared VPN badge renderer - used on both Router and Primary AP,
  // wherever a VPN entity is actually configured. Always shows once
  // configured, switching between active/offline color sets based on
  // state. Colors are global (one consistent badge look regardless of
  // which node it appears on).
  // Primary AP star badge - shared by both the tiered-layout Primary
  // AP circle and the flat-layout AP-row rendering, which previously
  // duplicated this markup inline in two places.
  _renderPrimaryApBadge(ap, stackIndex = 0) {
    if (ap.show_primary_badge === false) return null;
    const cfg = this._config;
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(ap.primary_badge_location, stackIndex, size);
    return b`<div
      class="primary-ap-badge"
      style="${posStyle} background:${ap.colors.primary_badge ?? 'var(--orange-color)'}; color:${ap.colors.primary_badge_icon ?? 'var(--card-background-color)'}; border:2px solid ${ap.colors.primary_badge_border ?? 'transparent'}; width:${size}px; height:${size}px;"
    >
      ${renderIcon(cfg.primary_badge_icon || 'mdi:star', `--mdc-icon-size:${cfg.badge_icon_size ?? 12}px`)}
    </div>`;
  }

  _renderVpnBadge(hass, entityId, stackIndex = 0) {
    if (!entityId) return null;
    const cfg = this._config;
    const vpnOn = isVpnActive(hass, entityId);
    const bg = vpnOn ? (cfg.vpn_badge_color ?? 'var(--blue-color)') : (cfg.vpn_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
    const iconColor = vpnOn ? (cfg.vpn_badge_icon_color ?? 'var(--card-background-color)') : (cfg.vpn_badge_offline_icon_color ?? 'var(--card-background-color)');
    const borderColor = vpnOn ? (cfg.vpn_badge_border_color ?? 'transparent') : (cfg.vpn_badge_offline_border_color ?? 'transparent');
    const flashClass = !vpnOn && cfg.vpn_animate_offline ? "vpn-badge-flash" : "";
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(cfg.vpn_badge_location, stackIndex, size);
    // When a Connected Peers entity is configured and has a numeric
    // reading, the badge widens into a pill showing the icon plus that
    // count, instead of staying a plain icon-only circle.
    const peersState = cfg.vpn_peers_entity ? getEntityState(hass, cfg.vpn_peers_entity) : null;
    const showPeers = peersState && peersState.value != null;
    const shapeStyle = showPeers
      ? `border-radius:${Math.round(size / 2)}px; padding:0 ${Math.round(size * 0.28)}px; gap:${Math.round(size * 0.2)}px;`
      : `border-radius:50%; width:${size}px;`;
    return b`<div
      class="vpn-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; height:${size}px; ${shapeStyle}"
    >
      ${renderIcon(cfg.vpn_badge_icon || 'mdi:vpn', `--mdc-icon-size:${cfg.badge_icon_size ?? 12}px`)}
      ${showPeers ? b`<span style="font-size:${Math.round(size * 0.55)}px; font-weight:600; line-height:1; font-family:inherit;">${roundVal(peersState.value)}</span>` : null}
    </div>`;
  }

  _renderFirewallBadge(hass, entityId, stackIndex = 0) {
    if (!entityId) return null;
    const cfg = this._config;
    const fwOn = isVpnActive(hass, entityId);
    const bg = fwOn ? (cfg.firewall_badge_color ?? 'var(--orange-color)') : (cfg.firewall_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
    const iconColor = fwOn ? (cfg.firewall_badge_icon_color ?? 'var(--card-background-color)') : (cfg.firewall_badge_offline_icon_color ?? 'var(--card-background-color)');
    const borderColor = fwOn ? (cfg.firewall_badge_border_color ?? 'transparent') : (cfg.firewall_badge_offline_border_color ?? 'transparent');
    const flashClass = !fwOn && cfg.firewall_animate_offline ? "firewall-badge-flash" : "";
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(cfg.firewall_badge_location, stackIndex, size);
    return b`<div
      class="firewall-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${size}px; height:${size}px;"
    >
      ${renderIcon(cfg.firewall_badge_icon || 'mdi:wall-fire', `--mdc-icon-size:${cfg.badge_icon_size ?? 12}px`)}
    </div>`;
  }

  // PoE badge - shows a summed wattage value (no icon) top-right on a
  // switch circle. Works for both the top-level Switch and any
  // node-level Switch, since both share the same `poe` config shape.
  // Hides itself entirely when computePoeTotal has nothing to show,
  // so a switch with no PoE-capable ports (or no PoE sensors enabled)
  // renders exactly as it did before this feature existed.
  _renderPoeBadge(hass, switchEntityId, poeConfig, stackIndex = 0) {
    if (!poeConfig) return null;
    const total = computePoeTotal(hass, switchEntityId, poeConfig);
    if (total == null) return null;
    const bg = resolvePoeColor(total, poeConfig);
    const textColor = poeConfig.text_color || "var(--card-background-color)";
    const badgeSize = this._config.poe_badge_size ?? 16;
    const fontSize = this._config.poe_badge_font_size ?? 9;
    const hPad = Math.round(badgeSize * 0.35);
    const flashClass =
      poeConfig.animate_over_threshold && isAbovePoeTopThreshold(total, poeConfig)
        ? "poe-badge-flash"
        : "";
    const posStyle = badgeCornerStyle(poeConfig.location, stackIndex, badgeSize);
    return b`<div
      class="poe-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${textColor}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; gap:${Math.round(badgeSize * 0.2)}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
    >
      ${renderIcon(poeConfig.icon || 'mdi:lightning-bolt', `--mdc-icon-size:${fontSize}px; color:${textColor};`)}
      <span>${roundVal(total)}${poeConfig.unit || "W"}</span>
    </div>`;
  }

  // IP Address badge - a small pill showing a plain IP address string,
  // gated globally by Layout > General > Show IP Addressing. Unlike
  // every other badge it's centered directly above or below its
  // circle rather than anchored to a corner (see centeredBadgeStyle),
  // and per the ask it's sized identically to the PoE badge
  // (poe_badge_size/poe_badge_font_size) rather than the general
  // badge_size/badge_icon_size the other status badges share.
  // `ownerCfg` is whichever config object (router or an access point)
  // owns the ip_badge_color/ip_badge_icon_color fields for this badge.
  _renderIpBadge(hass, entityId, position, ownerCfg, slot) {
    if (!this._config.show_ip_addressing) return null;
    if (!entityId) return null;
    // Some integrations report the address as an attribute on an entity whose
    // state is something else (a Deco tracker's `ip`, UniFi Device Info's `lan_ip`
    // / `wan_ip` / `ip_address`), others as a sensor whose state IS the address.
    return this._renderIpPill(hypReadIp(hass, entityId, slot || "device"), position, ownerCfg);
  }

  // An IP pill for a managed switch or a Homelab: the address entity chosen for it,
  // else its own entity's address attribute, else one found through the device registry.
  _renderNodeIpBadge(hass, cfg, position) {
    return this._renderIpPill(this._nodeIpValue(hass, cfg), position || "above", cfg);
  }

  // The line from the Router down to the Core Switch is 28px; when the Router's LAN
  // IP pill hangs below it and the switch's pill sits above it, they need 48 (as the Primary AP's line does).
  _coreSwitchLineHeight(hass, routerEnabled) {
    if (!routerEnabled || !this._config.show_ip_addressing) return 28;
    const rt = this._config.router;
    const lan = hypReadIp(hass, rt && rt.entities && rt.entities.lan_ip, "lan");
    return lan && this._nodeIpValue(hass, this._config.switch) ? 48 : 28;
  }

  _renderIpPill(value, position, ownerCfg) {
    if (!value) return null;

    const badgeSize = this._config.poe_badge_size ?? 16;
    const fontSize = this._config.poe_badge_font_size ?? 9;
    const hPad = Math.round(badgeSize * 0.35);
    const bg = ownerCfg?.ip_badge_color || "var(--blue-color)";
    const textColor = ownerCfg?.ip_badge_icon_color || "var(--card-background-color)";
    const posStyle = centeredBadgeStyle(position);
    const opacity = Math.max(0, Math.min(100, this._config.ip_badge_opacity ?? 100)) / 100;

    return b`<div
      class="poe-badge"
      style="${posStyle} background:${bg}; color:${textColor}; opacity:${opacity}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
    >
      <span>${value}</span>
    </div>`;
  }

  // DNS Filtering badge (e.g. Pi-hole/AdGuard Home queries blocked) -
  // a global Security element like VPN/Firewall, targetable at Router,
  // Primary AP, Homelab, or the main Switch. Shares PoE's coloring
  // helpers (resolvePoeColor / isAbovePoeTopThreshold work on any
  // {color_mode, thresholds, color} shape) and its .poe-badge pill
  // styling, since both are "a single number in a small pill" badges.
  // DNS Filtering badge. Supports two entity shapes:
  // - A numeric sensor (e.g. queries blocked, block %) - renders as an
  //   icon+value pill with the usual single/threshold coloring.
  // - A binary_sensor or switch (e.g. "protection enabled") - renders
  //   as an icon-only status badge (active/offline colors), matching
  //   the VPN/Firewall/Reverse Proxy pattern, since there's no number
  //   to show for those domains.
  // Which shape applies is detected automatically from whether the
  // entity's state actually parses as a number, not from a config
  // toggle - so switching entities never requires reconfiguring mode.
  _renderDnsBadge(hass, stackIndex = 0) {
    const cfg = this._config;
    if (!cfg.dns_entity) return null;
    const stateObj = hass?.states?.[cfg.dns_entity];
    if (!stateObj) return null;
    const numeric = getEntityState(hass, cfg.dns_entity);
    const isNumeric = numeric && numeric.value != null;
    // Sized off the same Badge Size / Badge Icon Size sliders every
    // other badge (VPN, Firewall, Primary AP, Reverse Proxy,
    // Container) uses, rather than PoE's own separate pair - so
    // adjusting one slider keeps every badge on the diagram in sync,
    // DNS included.
    const badgeSize = cfg.badge_size ?? 18;
    const iconSize = cfg.badge_icon_size ?? 12;
    const fontSize = Math.round(badgeSize * 0.55);
    const textColor = cfg.dns_text_color || "var(--card-background-color)";
    const posStyle = badgeCornerStyle(cfg.dns_badge_location, stackIndex, badgeSize);

    if (isNumeric) {
      const val = numeric.value;
      const thresholdCfg = { color_mode: cfg.dns_color_mode, thresholds: cfg.dns_thresholds, color: cfg.dns_badge_color };
      const bg = cfg.dns_color_mode === "threshold" ? resolvePoeColor(val, thresholdCfg) : (cfg.dns_badge_color || "var(--blue-color)");
      const hPad = Math.round(badgeSize * 0.35);
      const flashClass =
        cfg.dns_animate_over_threshold && isAbovePoeTopThreshold(val, thresholdCfg) ? "poe-badge-flash" : "";
      return b`<div
        class="poe-badge ${flashClass}"
        style="${posStyle} background:${bg}; color:${textColor}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; gap:${Math.round(badgeSize * 0.2)}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
      >
        ${renderIcon(cfg.dns_badge_icon || 'mdi:shield-check', `--mdc-icon-size:${iconSize}px; color:${textColor};`)}
        <span>${roundVal(val)}${cfg.dns_unit || ""}</span>
      </div>`;
    }

    // Binary status fallback - on/off from a binary_sensor or switch.
    const isOn = !isEntityUnavailable(hass, cfg.dns_entity) && String(stateObj.state).toLowerCase() !== "off";
    const bg = isOn ? (cfg.dns_badge_color || "var(--blue-color)") : (cfg.dns_badge_offline_color || "var(--disabled-text-color, #bdbdbd)");
    return b`<div
      class="poe-badge"
      style="${posStyle} background:${bg}; color:${textColor}; width:${badgeSize}px; height:${badgeSize}px; border-radius:50%;"
    >
      ${renderIcon(cfg.dns_badge_icon || 'mdi:shield-check', `--mdc-icon-size:${iconSize}px; color:${textColor};`)}
    </div>`;
  }

  // Reverse Proxy status badge - a global Security element shaped
  // exactly like VPN/Firewall (active/offline icon badge), targetable
  // at Router, Primary AP, Homelab, or the main Switch.
  _renderReverseProxyBadge(hass, stackIndex = 0) {
    const cfg = this._config;
    if (!cfg.reverse_proxy_entity) return null;
    const state = hass?.states?.[cfg.reverse_proxy_entity];
    if (!state) return null;
    const isUp = !isEntityUnavailable(hass, cfg.reverse_proxy_entity) && String(state.state).toLowerCase() !== "off";
    const bg = isUp ? (cfg.reverse_proxy_badge_color ?? "var(--green-color)") : (cfg.reverse_proxy_badge_offline_color ?? "var(--disabled-text-color, #bdbdbd)");
    const iconColor = isUp ? (cfg.reverse_proxy_badge_icon_color ?? "var(--card-background-color)") : (cfg.reverse_proxy_badge_offline_icon_color ?? "var(--card-background-color)");
    const borderColor = isUp ? (cfg.reverse_proxy_badge_border_color ?? "transparent") : (cfg.reverse_proxy_badge_offline_border_color ?? "transparent");
    const flashClass = !isUp && cfg.reverse_proxy_animate_offline ? "vpn-badge-flash" : "";
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(cfg.reverse_proxy_badge_location, stackIndex, size);
    return b`<div
      class="vpn-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${size}px; height:${size}px;"
    >
      ${renderIcon(cfg.reverse_proxy_badge_icon || 'mdi:server-network', `--mdc-icon-size:${cfg.badge_icon_size ?? 12}px`)}
    </div>`;
  }

  // A single container/VM status badge on a Homelab node. Shaped like
  // VPN/Firewall (active/offline icon badge) but per-item, since a
  // Homelab node can carry any number of these (one per tracked
  // container/VM), each independently positioned and stacking with
  // everything else on that circle.
  // The badge stack around a Homelab circle: PoE, the Security elements
  // targeted at "homelab", and one badge per Container/VM. Shared by a
  // Node-level Homelab and one fed by a Switch.
  _renderHomelabBadges(hass, hl) {
    const poeVisible = computePoeTotal(hass, hl.entity, hl.poe) != null;
    const vpnVisible = this._config.vpn_target === "homelab" && !!this._config.vpn_entity && homelabShowsSecurity(hl, "vpn");
    const fwVisible = this._config.firewall_target === "homelab" && !!this._config.firewall_entity && homelabShowsSecurity(hl, "firewall");
    const dnsVisible = this._config.dns_target === "homelab" && !!this._config.dns_entity && homelabShowsSecurity(hl, "dns");
    const rpVisible = this._config.reverse_proxy_target === "homelab" && !!this._config.reverse_proxy_entity && homelabShowsSecurity(hl, "reverse_proxy");
    const containers = hl.containers || [];
    const containerVisibility = containers.map((c) => !!c.entity && !!hass?.states?.[c.entity]);
    const stackItems = [
      { key: "poe", location: hl.poe?.location, visible: poeVisible },
      this._monitorBadgeStackItem(monitorDeviceKey(hl)),
      { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
      { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
      { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
      { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
      ...containers.map((c, ci) => ({ key: `container${ci}`, location: c.location, visible: containerVisibility[ci] }))
    ];
    const stacks = computeBadgeStacks(stackItems);
    return b`
      ${this._renderNodeIpBadge(hass, hl, "above")}
      ${this._renderPoeBadge(hass, hl.entity, hl.poe, stacks.poe || 0)}
      ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(hl), stacks.monitor || 0)}
      ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
      ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
      ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
      ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
      ${containers.map((c, ci) => this._renderContainerBadge(hass, c, stacks[`container${ci}`] || 0))}
    `;
  }

  _renderContainerBadge(hass, containerCfg, stackIndex = 0) {
    if (!containerCfg || !containerCfg.entity) return null;
    const state = hass?.states?.[containerCfg.entity];
    if (!state) return null;
    const isUp = !isEntityUnavailable(hass, containerCfg.entity) && String(state.state).toLowerCase() !== "off";
    const bg = isUp ? (containerCfg.color ?? "var(--green-color)") : (containerCfg.offline_color ?? "var(--disabled-text-color, #bdbdbd)");
    const iconColor = isUp ? (containerCfg.icon_color ?? "var(--card-background-color)") : (containerCfg.offline_icon_color ?? "var(--card-background-color)");
    const borderColor = isUp ? (containerCfg.border_color ?? "transparent") : (containerCfg.offline_border_color ?? "transparent");
    const flashClass = !isUp && containerCfg.animate_offline ? "vpn-badge-flash" : "";
    const size = this._config.badge_size ?? 18;
    const posStyle = badgeCornerStyle(containerCfg.location, stackIndex, size);
    return b`<div
      class="vpn-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${size}px; height:${size}px;"
    >
      ${renderIcon(containerCfg.icon || 'mdi:docker', `--mdc-icon-size:${this._config.badge_icon_size ?? 12}px`)}
    </div>`;
  }

  // Guest-network badge for Clients - a transparent-background
  // icon (not a filled circle like the other badges) shown top-right
  // when the device's own entity attributes mark it as being on a
  // guest network. Icon, color, and size are global settings under
  // Clients / Advanced, applying uniformly to every device
  // rather than being configured per-device. Only shown while the
  // device is online - an offline device's last-known guest status
  // isn't necessarily still accurate, so the badge hides along with it.
  _renderGuestBadge(hass, entityId, online) {
    if (!online) return null;
    if (!isGuestDevice(hass, entityId)) return null;
    const icon = this._config.individual_device_guest_icon || "mdi:account";
    const color = this._config.individual_device_guest_icon_color || "var(--secondary-text-color)";
    const bg = this._config.individual_device_guest_icon_bg || "transparent";
    const size = this._config.individual_device_guest_icon_size ?? 16;
    // Container size is independently configurable (Layout > Sizing and Animations)
    // rather than derived from the icon size, so the badge and its
    // icon can be scaled separately - matching how the PoE badge
    // separates Badge Size from Badge Font Size.
    const containerSize = this._config.individual_device_guest_badge_size ?? 24;
    return b`<div
      class="guest-badge"
      style="background:${bg}; width:${containerSize}px; height:${containerSize}px;"
    >
      ${renderIcon(icon, `color:${color};--mdc-icon-size:${size}px`)}
    </div>`;
  }

  // Renders one summary row by key, or null if that item isn't
  // configured (e.g. "download" selected but no download entity set).
  // ctx carries the pre-computed entity states needed for download/
  // upload/ping, since those are already resolved once in render().
  _renderSummaryItem(key, config, hass, ctx) {
    const internet = config.internet;
    if (key === "download") {
      if (!internet.entities.download) return null;
      return b`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(internet.entities.download)}
        >
          <div
            class="summary-badge"
            style="background:${config.summary_speedtest_download_color ?? "var(--green-color)"}"
          >
            ${renderIcon(internet.download_icon || "mdi:download", `color:${config.summary_speedtest_download_icon_color ?? "var(--text-primary-color)"}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.downloadState ? `${ctx.downloadState.display}${ctx.downloadState.unit}` : "-"}
            </div>
            ${speedSourceLabel(hass, internet.entities.download)
              ? b`<div class="summary-secondary">
                  ${speedSourceLabel(hass, internet.entities.download)}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    if (key === "upload") {
      if (!internet.entities.upload) return null;
      return b`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(internet.entities.upload)}
        >
          <div
            class="summary-badge"
            style="background:${config.summary_speedtest_upload_color ?? "var(--pink-color)"}"
          >
            ${renderIcon(internet.upload_icon || "mdi:upload", `color:${config.summary_speedtest_upload_icon_color ?? "var(--text-primary-color)"}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.uploadState ? `${ctx.uploadState.display}${ctx.uploadState.unit}` : "-"}
            </div>
            ${speedSourceLabel(hass, internet.entities.upload)
              ? b`<div class="summary-secondary">
                  ${speedSourceLabel(hass, internet.entities.upload)}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    if (key === "ping") {
      if (!ctx.pingState) return null;
      return b`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(internet.entities.ping)}
        >
          <div
            class="summary-badge"
            style="background:${config.summary_latency_color ?? "var(--cyan-color)"}"
          >
            ${renderIcon(internet.ping_icon || "mdi:speedometer", `color:${config.summary_latency_icon_color ?? "var(--text-primary-color)"}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.pingState.display}${ctx.pingState.unit || " ms"}
            </div>
            ${ctx.jitterState
              ? b`<div class="summary-secondary">
                  ${ctx.jitterState.display}${ctx.jitterState.unit ? ` ${ctx.jitterState.unit}` : ""}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    if (key === "vpn") {
      if (!config.vpn_entity) return null;
      const vpnOn = isVpnActive(hass, config.vpn_entity);
      const bg = vpnOn ? (config.vpn_badge_color ?? 'var(--blue-color)') : (config.vpn_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
      const iconColor = vpnOn ? (config.vpn_badge_icon_color ?? 'var(--card-background-color)') : (config.vpn_badge_offline_icon_color ?? 'var(--card-background-color)');
      return b`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(config.vpn_entity)}
        >
          <div
            class="summary-badge"
            style="background:${bg}"
          >
            ${renderIcon(config.vpn_badge_icon || "mdi:vpn", `color:${iconColor}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">VPN</div>
            <div class="summary-secondary">${vpnOn ? "Online" : "Offline"}</div>
          </div>
        </div>
      `;
    }
    if (key === "firewall") {
      if (!config.firewall_entity) return null;
      const fwOn = isVpnActive(hass, config.firewall_entity);
      const bg = fwOn ? (config.firewall_badge_color ?? 'var(--orange-color)') : (config.firewall_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
      const iconColor = fwOn ? (config.firewall_badge_icon_color ?? 'var(--card-background-color)') : (config.firewall_badge_offline_icon_color ?? 'var(--card-background-color)');
      return b`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(config.firewall_entity)}
        >
          <div
            class="summary-badge"
            style="background:${bg}"
          >
            ${renderIcon(config.firewall_badge_icon || "mdi:wall-fire", `color:${iconColor}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">Firewall</div>
            <div class="summary-secondary">${fwOn ? "Online" : "Offline"}</div>
          </div>
        </div>
      `;
    }
    if (key === "poe") {
      const total = computeDiagramPoeTotal(hass, config);
      if (total == null) return null;
      const bg =
        config.summary_poe_color_mode === "threshold"
          ? resolvePoeColor(total, {
              color_mode: "threshold",
              thresholds: config.summary_poe_thresholds || DEFAULT_POE.thresholds
            })
          : config.summary_poe_color || "var(--orange-color)";
      // Fixed to match every other summary badge's icon color
      // (download/upload/ping/vpn/firewall all use the card background
      // color for contrast against their own colored badge) - not
      // independently configurable, so the summary row stays visually
      // consistent regardless of which PoE threshold color is active.
      const iconColor = "var(--card-background-color)";
      return b`
        <div class="summary-row">
          <div class="summary-badge" style="background:${bg}">
            ${renderIcon("mdi:lightning-bolt", `color:${iconColor}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">PoE</div>
            <div class="summary-secondary">${roundVal(total)}W</div>
          </div>
        </div>
      `;
    }
    // Real-time Download / Upload: the Router's speed entity when a Router is
    // configured, else the Primary Access Point's (see
    // resolveRealtimeSpeedSource). Same badge look as Download / Upload, with
    // the source device named underneath.
    if (key === "realtime_download" || key === "realtime_upload") {
      const isDl = key === "realtime_download";
      const src = resolveRealtimeSpeedSource(config, isDl ? "download" : "upload", hass);
      if (!src) return null;
      const st = getEntityState(hass, src.entity);
      const value = st && st.value != null ? `${st.display}${st.unit}` : "-";
      const badgeBg = isDl ? (config.summary_realtime_download_color ?? "var(--green-color)") : (config.summary_realtime_upload_color ?? "var(--pink-color)");
      const badgeIcon = isDl ? (config.summary_realtime_download_icon_color ?? "var(--text-primary-color)") : (config.summary_realtime_upload_icon_color ?? "var(--text-primary-color)");
      // Fixed, independent of the Speed Test Download/Upload badges' own
      // icon setting (Internet page): those two badges are a different
      // reading (a speed test result) from a different icon concept
      // (progress-download/upload by default) - real-time throughput
      // keeps the plain download/upload arrows regardless of what's set
      // there.
      const iconName = isDl ? "mdi:download" : "mdi:upload";
      return b`
        <div
          class="summary-row"
          title="Real-time ${isDl ? "download" : "upload"} - ${src.label}"
          @click=${() => this._handleMoreInfo(src.entity)}
        >
          <div class="summary-badge" style="background:${badgeBg}">
            ${renderIcon(iconName, `color:${badgeIcon}`)}
          </div>
          <div class="summary-text">
            <div class="summary-primary">${value}</div>
            ${(isDl ? ctx.totalDlState : ctx.totalUlState)
              ? b`<div class="summary-secondary">
                  ${(isDl ? ctx.totalDlState : ctx.totalUlState).display}${(isDl ? ctx.totalDlState : ctx.totalUlState).unit}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    return null;
  }

  render() {
    if (!this._config || !this.hass) return b``;
    if (this._config.view_mode === "hyperbolic") return this._renderHyperbolic();
    // Compact Mode is a RENDER-TIME override: this._config briefly points at
    // a compacted copy for the length of this synchronous call (every method
    // it calls reads sizes off `this._config`, so this is the one place that
    // has to change), then is restored in the finally block below - the
    // saved config is never touched, which is why turning it off needs no
    // memory of "what it was before": that value was never overwritten.
    const _savedConfig = this._config;
    if (this._config.card_size === "compact") {
      this._config = applyCompactMode(this._config);
    }
    try {
      return this._renderCard();
    } finally {
      this._config = _savedConfig;
    }
  }

  _renderCard() {

    const config = this._config;
    const hass = this.hass;
    const minDur = config.min_flow_duration ?? 0.6;
    const maxDur = config.max_flow_duration ?? 6;
    const animate = config.enable_animations === true;
    const summaryPos = config.summary_position || "top";

    const internet = config.internet;
    const internetState = getEntityState(hass, internet.entity);
    const pingState = getEntityState(hass, internet.entities.ping);
    const jitterState = getEntityState(hass, internet.entities.jitter);
    const downloadState = getEntityState(hass, internet.entities.download);
    const uploadState = getEntityState(hass, internet.entities.upload);
    const totalDlState = getEntityState(hass, internet.entities.total_download);
    const totalUlState = getEntityState(hass, internet.entities.total_upload);
    const quotaTotalState = getEntityState(hass, internet.entities.quota_total);
    const quotaRemState = getEntityState(hass, internet.entities.quota_remaining);

    const dlDur = calcFlowDuration(downloadState?.value, minDur, maxDur);
    const ulDur = calcFlowDuration(uploadState?.value, minDur, maxDur);

    const bTotal = quotaTotalState?.value;
    const bRem = quotaRemState?.value;
    // Distinct from hasQuota below: this only checks whether a quota
    // was ever configured at all, not whether it currently has a valid
    // reading. Used to pick the fallback outline color when there's no
    // ring to draw - keeping this separate means that color doesn't
    // flicker between the "not configured" default and the normal
    // circle color if a configured quota sensor is just briefly
    // unavailable (e.g. at HA startup).
    const hasQuotaEntities = !!(internet.entities.quota_total || internet.entities.quota_remaining);
    const hasQuota =
      internet.entities.quota_total &&
      internet.entities.quota_remaining &&
      bTotal != null &&
      bTotal > 0 &&
      bRem != null;
    const quotaRatio = hasQuota ? Math.max(0, Math.min(1, bRem / bTotal)) : 0;
    const quotaCompletedRatio = hasQuota ? 1 - quotaRatio : 0;

    const lan = config.lan;
    const lanState = getEntityState(hass, lan.entity);
    const lanDur = calcFlowDuration(lanState?.value, minDur, maxDur);

    const router = config.router;
    const routerEnabled = !!router.entity;
    const routerEntityState = getEntityState(hass, router.entity);
    const routerStatusState = getEntityState(hass, router.entities?.status);
    const routerOfflineTop = routerEnabled && isEntityUnavailable(hass, router.entity);
    const routerOfflineColor = routerOfflineTop
      ? router.colors.offline_circle || "var(--error-color)"
      : router.colors.circle;

    const switchConfig = config.switch || {};
    const switchEnabled = !!switchConfig.entity;
    const switchEntityState = getEntityState(hass, switchConfig.entity);
    const switchDevicesState = getEntityState(hass, switchConfig.entities?.connected_devices);
    const switchOfflineTop = switchEnabled && isEntityUnavailable(hass, switchConfig.entity);
    const switchOfflineColor = switchOfflineTop
      ? switchConfig.colors?.offline_circle || "var(--error-color)"
      : switchConfig.colors?.circle;
    const switchDur = (minDur + maxDur) / 2;

    // Where every monitored service goes, decided from live state. Internal
    // services assigned to Clients join the Clients box as ordinary client
    // entries; the rest go to the External box or onto a device as a badge.
    const monitorPlan = buildMonitorPlan(hass, config, this._monitorTargetIds);
    this._monitorPlan = monitorPlan;
    const clientDevices = [...(config.individual_devices || []), ...monitorClientDevices(monitorPlan)];
    // Whether a Clients box exists shapes the topology (an AP only needs a
    // line of its own when there's something to reach). A live re-scoping
    // can flip that, so rebuild the cached topology when it does.
    if ((clientDevices.length > 0) !== this._topologyHasClients) {
      this._topologyHasClients = clientDevices.length > 0;
      this._needsRealign = true;
      this._topology = buildNetworkTopology({ ...config, individual_devices: clientDevices });
    }

    // Static topology is built once in setConfig() (and rebuilt above only
    // if a live re-scoping changes whether a Clients box exists); only the
    // Primary AP's live values are derived below.
    const topology = this._topology || buildNetworkTopology(config);
    const {
      branchColumns,
      tierCount,
      primaryApLayout,
      primaryAp,
      primaryOriginalIndex
    } = topology;

    const primaryApItem = primaryAp
      ? (() => {
          const apEntityState = getEntityState(hass, primaryAp.entity);
          const devicesState = getEntityState(hass, primaryAp.entities.connected_devices);
          const apDlState = getEntityState(hass, primaryAp.entities.download);
          const apUlState = getEntityState(hass, primaryAp.entities.upload);
          return {
            ap: primaryAp,
            apEntityState,
            devicesState,
            dlState: apDlState,
            ulState: apUlState,
            dlDur: calcFlowDuration(apDlState?.value, minDur, maxDur),
            ulDur: calcFlowDuration(apUlState?.value, minDur, maxDur),
            devDur: calcFlowDuration(devicesState?.value, minDur, maxDur),
            hasDevices: !!primaryAp.entities.connected_devices
          };
        })()
      : null;
    const primaryApOffline = primaryApItem
      ? isEntityUnavailable(hass, primaryApItem.ap.entity)
      : false;
    const primaryApOfflineColor = primaryApItem
      ? (primaryApOffline
          ? primaryApItem.ap.colors.offline_circle || "var(--error-color)"
          : primaryApItem.ap.colors.circle)
      : "";

    const summaryCtx = { downloadState, uploadState, totalDlState, totalUlState, pingState, jitterState };
    const summaryTemplate = config.show_summary !== false
      ? b`
          <div class="flow-summary pos-${summaryPos}">
            ${(config.summary_items || ["realtime_download", "realtime_upload", "ping"])
              .slice(0, 5)
              .map((key) => this._renderSummaryItem(key, config, hass, summaryCtx))}
          </div>
        `
      : null;

    // With the details panel on, the diagram is fitted to the space it has
    // (its column, or the card width on a phone) automatically, unless a
    // card size was chosen or Horizontal Scroll is on. Fitting only ever shrinks it.
    const detailsOn = this._flatDetailsOn();
    this._flatFitForced = detailsOn && (config.card_size || "normal") === "normal" && config.diagram_horizontal_scroll !== true;
    const diagramTemplate = this._wrapDiagramScale(b`
            ${this._renderExternalMonitors(hass, config, monitorPlan)}
            <div class="flow-diagram">
              ${this._renderTrunk(
                internet,
                internetState,
                lan,
                lanState,
                lanDur,
                pingState,
                hasQuota,
                hasQuotaEntities,
                quotaCompletedRatio,
                dlDur,
                ulDur,
                animate,
                router,
                routerEntityState,
                routerStatusState,
                summaryPos,
                hass,
                routerEnabled,
                primaryApItem,
                branchColumns.length > 0,
                switchConfig,
                switchEnabled,
                switchEntityState,
                switchDevicesState,
                switchOfflineTop,
                switchDur
              )}
              ${branchColumns.length
                ? this._renderBranches(
                    branchColumns,
                    animate,
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    clientDevices.length > 0,
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    hass,
                    primaryApItem ? primaryApOffline : (switchEnabled ? (routerOfflineTop || switchOfflineTop) : routerOfflineTop),
                    primaryApItem ? primaryApOfflineColor : (switchEnabled ? switchOfflineColor : routerOfflineColor),
                    primaryApItem ? true : (routerEnabled || switchEnabled),
                    primaryApItem,
                    primaryApLayout,
                    minDur,
                    maxDur,
                    primaryOriginalIndex,
                    tierCount
                  )
                : null}
            </div>
            ${this._renderIndividualDevices(clientDevices, hass, config, animate, minDur, maxDur, branchColumns.length)}
`, this._flatFitForced ? { ...config, card_size: "fit_to_width" } : config);
    if (detailsOn) {
      const withDetails = this._renderFlatDetails(diagramTemplate);
      if (withDetails) return withDetails;
    }

    return b`
      <ha-card>
        ${config.title
          ? b`<h1 class="card-header">${config.title}</h1>`
          : null}
        <div class="card-content">
          <div class="flow-main-layout pos-${summaryPos}">
            ${summaryPos === "top" || summaryPos === "left" || summaryPos === "right" ? summaryTemplate : null}
            ${diagramTemplate}
            ${summaryPos === "bottom" ? summaryTemplate : null}
          </div>
        </div>
      </ha-card>
    `;
  }

  // --- Monitoring ---------------------------------------------------------

  // The stack entry a device site adds to its computeBadgeStacks() list, so
  // the monitoring badge fans out with PoE/VPN/etc. instead of hiding them.
  _monitorBadgeStackItem(entityId) {
    const visible = !!entityId && !!this._monitorPlan && this._monitorPlan.byDevice.has(entityId);
    return { key: "monitor", location: this._config.monitoring?.badge_location, visible };
  }

  // The state badge: a coloured disc, the state glyph inside. A down badge
  // flashes (.monitor-badge-flash) - and, being an ordinary animation, it is
  // switched off by Layout > Sizing and Animations > Enable Animations like all the others.
  _renderMonitorStateBadge(state, stackIndex = 0, iconName, title = "") {
    const mon = this._config.monitoring;
    const size = this._config.badge_size ?? 18;
    const bg = mon.colors?.[state] ?? "var(--disabled-text-color, #bdbdbd)";
    const flash = state === "down" ? "monitor-badge-flash" : "";
    const posStyle = badgeCornerStyle(mon.badge_location, stackIndex, size);
    return b`<div
      class="monitor-badge ${flash}"
      title="${title}"
      style="${posStyle} background:${bg}; color:${mon.colors?.icon ?? "var(--card-background-color)"}; border:2px solid ${mon.colors?.border ?? "transparent"}; width:${size}px; height:${size}px;"
    >
      ${renderIcon(iconName || mon.icons?.[state] || "mdi:help", `--mdc-icon-size:${this._config.badge_icon_size ?? 12}px`)}
    </div>`;
  }

  // The response-time pill, bottom-centre of a service's circle (straddling
  // its lower edge). Shown whenever the service's own Show Response Time
  // Badge is on and it has a reading; hidden while it is down (a stale
  // reading would mislead). The global settings only style it.
  _renderMonitorResponseBadge(hass, svc, state) {
    const r = this._config.monitoring?.response;
    if (!r || svc.show_response_time === false || state === "down") return null;
    const ms = getMonitorResponseMs(hass, svc);
    if (ms == null) return null;
    const bg = resolvePoeColor(ms, r);
    const textColor = r.text_color || "var(--card-background-color)";
    const badgeSize = this._config.poe_badge_size ?? 16;
    const fontSize = this._config.poe_badge_font_size ?? 9;
    const hPad = Math.round(badgeSize * 0.35);
    const flash = r.animate_over_threshold && isAbovePoeTopThreshold(ms, r) ? "poe-badge-flash" : "";
    return b`<div
      class="poe-badge ${flash}"
      style="position:absolute; bottom:0; left:50%; transform:translate(-50%, 50%); z-index:4; background:${bg}; color:${textColor}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
    >
      <span>${roundVal(ms)}${r.unit || "ms"}</span>
    </div>`;
  }

  // The badge on a device (Router, Switch, AP, Server, Internet ...) that
  // one or more services are assigned to: the worst state among them. One
  // service shows its own icon, several show the shared group icon; the
  // tooltip lists each.
  _renderMonitorDeviceBadge(hass, entityId, stackIndex = 0) {
    const list = entityId && this._monitorPlan ? this._monitorPlan.byDevice.get(entityId) : null;
    if (!list || !list.length) return null;
    const mon = this._config.monitoring;
    const states = list.map((s) => resolveMonitorState(hass, s, mon.unavailable_state));
    const worst = worstMonitorState(states);
    const iconName = list.length === 1 ? list[0].icon || mon.device_badge_icon : mon.device_badge_icon;
    const title = list
      .map((s, i) => `${monitorDisplayName(hass, s)}: ${MONITOR_STATE_LABELS[states[i]]}`)
      .join("\n");
    return this._renderMonitorStateBadge(worst, stackIndex, iconName || "mdi:heart-pulse", title);
  }

  // A service drawn as its own circle - in the External box, or in the
  // Clients box. It looks like any other client, plus the state badge (and
  // the optional response-time pill). Only the circle dims when down, so
  // the flashing badge stays at full strength.
  _renderMonitoredCircle(svc, hass, config, showNames) {
    const mon = config.monitoring;
    const state = resolveMonitorState(hass, svc, mon.unavailable_state);
    const down = state === "down";
    const sc = svc.colors || {};
    const size = config.individual_device_circle_size ?? 42;
    const circleColor = down ? (sc.offline_circle || "var(--error-color)") : (sc.circle || "var(--pink-color)");
    const iconColor = down ? (sc.offline_icon || "var(--error-color)") : (sc.icon || "var(--pink-color)");
    const displayName = monitorDisplayName(hass, svc);
    const responseBadge = this._renderMonitorResponseBadge(hass, svc, state);
    const labelDrop = responseBadge ? Math.round((config.poe_badge_size ?? 16) / 2) + 3 : 3;

    return b`
      <div
        class="circle-wrap"
        style="width:${size}px; height:${size}px;"
        @click=${() => this._handleMoreInfo(svc.entity)} data-nfc-e=${this._flatDetailsOn() ? svc.entity : Symbol.for('lit-nothing')}
        title="${displayName}: ${MONITOR_STATE_LABELS[state]}"
      >
        <div class="circle" style="border-color:${circleColor}; opacity:${down ? 0.6 : 1};">
          ${renderIcon(svc.icon || "mdi:heart-pulse", `color:${iconColor};--mdc-icon-size:${config.individual_device_icon_size ?? 20}px`)}
        </div>
        ${this._renderMonitorStateBadge(state, 0)}
        ${responseBadge}
        ${showNames
          ? b`<div class="individual-device-name" style="top:calc(100% + ${labelDrop}px);">${displayName}</div>`
          : null}
      </div>
    `;
  }

  // The External box: the Clients box's own look (same border, radius,
  // dashed outline, optional names), sitting above the Internet node and
  // joined to it by dotted lines - one per Internet circle when a backup
  // Internet is configured.
  _renderExternalMonitors(hass, config, plan) {
    const services = plan.external;
    if (!services.length) return null;
    const mon = config.monitoring;
    const boxColor = mon.box_color || "var(--divider-color)";
    const lineColor = config.flow_line_color || "var(--divider-color, #ccc)";
    const radius = mon.box_radius || "var(--ha-card-border-radius, 12px)";
    const showNames = !!mon.show_names;
    const dotted = `background-image:repeating-linear-gradient(to bottom, ${lineColor} 0px, ${lineColor} 2px, transparent 2px, transparent 6px)`;

    // With a backup Internet the two circles sit side by side (see
    // _renderDualInternet); the connector needs a line over each.
    const sec = internetSecondaryEnabled(config) ? config.internet_secondary : null;
    const colW = Math.max(config.internet?.circle_size ?? 72, sec?.circle_size ?? 72);
    const connector = sec
      ? b`
          <div class="ext-monitor-connector" style="width:${colW + 24 + 2}px;">
            <div class="dev-dotted-line" style="${dotted}"></div>
            <div class="dev-dotted-line" style="${dotted}"></div>
          </div>
        `
      : b`
          <div class="ap-col-devconnector single">
            <div class="dev-dotted-line" style="${dotted}"></div>
          </div>
        `;

    return b`
      <div class="dev-row-container ext-monitor-container">
        <div class="individual-devices-box" style="${showNames ? "padding-bottom:34px;" : ""}">
          <svg class="individual-devices-box-border">
            <rect
              x="1"
              y="1"
              style="width:calc(100% - 2px); height:calc(100% - 2px); rx:${radius}; ry:${radius};"
              fill="none"
              stroke="${boxColor}"
              stroke-width="1.5"
              stroke-dasharray="2 4"
            ></rect>
          </svg>
          <div class="individual-devices-row" style="${showNames ? "row-gap:32px;" : ""}">
            ${services.map((svc) => this._renderMonitoredCircle(svc, hass, config, showNames))}
          </div>
        </div>
        ${connector}
      </div>
    `;
  }

  // Wraps the External box + trunk + Clients box together so Diagram Scale
  // (zoom) and Horizontal Scroll apply to the whole diagram as one unit,
  // never to the Summary badges above or below it. Returns `inner`
  // unchanged at the defaults (100%, scroll off), so a default config's
  // markup is untouched.
  _wrapDiagramScale(inner, config) {
    const cardSize = config.card_size || "normal";
    const auto = cardSize === "fit_to_width";
    // While auto, a stable measurement target (the wrapper) always exists,
    // even at 100%, right up until the loop below confirms nothing more
    // is needed - measuring an element that only appears once it's already
    // below 100% would never see what "at 100% this doesn't fit" looks like.
    const scale = auto ? this._autoScaleValue ?? 100 : cardSize === "scaled" ? Number(config.diagram_scale_value ?? 100) : 100;
    // Horizontal Scroll applies to every mode except Fit to Width, which is
    // already sized so there's nothing left to scroll for.
    const hscroll = config.diagram_horizontal_scroll === true && !auto;
    if (!auto && scale === 100 && !hscroll) return inner;
    return b`
      <div class="diagram-scale-wrap${hscroll ? " diagram-scale-hscroll" : ""}" style="${scale !== 100 ? `zoom:${scale}%;` : ""}">
        ${inner}
      </div>
    `;
  }

  // Renders one device's circle (icon, colors, offline state, guest
  // badge) - shared by both the flat (ungrouped) row and each
  // grouped sub-box, so the two layouts stay visually identical.
  _renderIndividualDeviceCircle(dev, hass, config) {
    // A monitored service placed in the Clients box - same size and look as
    // a client, plus its state badge.
    if (dev._monitor) return this._renderMonitoredCircle(dev._monitor, hass, config, !!config.monitoring?.show_names);
    const online = isDeviceOnline(hass, dev.entity);
    const size = config.individual_device_circle_size ?? 42;
    const circleColor = online
      ? (dev.colors?.circle || "var(--pink-color)")
      : (dev.colors?.offline_circle || dev.colors?.circle || "var(--error-color)");
    const iconColor = online
      ? (dev.colors?.icon || "var(--pink-color)")
      : (dev.colors?.offline_icon || "var(--error-color)");

    const displayName = dev.name || hass?.states?.[dev.entity]?.attributes?.friendly_name || dev.entity || "Client";

    return b`
      <div
        class="circle-wrap"
        style="width:${size}px; height:${size}px; opacity: ${online ? 1 : 0.6}"
        @click=${() => this._handleMoreInfo(dev.entity)} data-nfc-e=${this._flatDetailsOn() ? dev.entity : Symbol.for('lit-nothing')}
        title="${displayName}"
      >
        <div class="circle" style="border-color:${circleColor}">
          ${renderIcon(dev.icon || "mdi:devices", `color:${iconColor};--mdc-icon-size:${config.individual_device_icon_size ?? 20}px`)}
        </div>
        ${this._renderGuestBadge(hass, dev.entity, online)}
        ${this._renderMonitorDeviceBadge(hass, dev.entity, online && isGuestDevice(hass, dev.entity) && (config.monitoring?.badge_location || "top-right") === "top-right" ? 1 : 0)}
        ${config.individual_devices_show_names
          ? b`<div class="individual-device-name">${displayName}</div>`
          : null}
      </div>
    `;
  }

  _renderIndividualDevices(devices, hass, config, animate, minDur, maxDur, apCount) {
    if (!devices || !devices.length) return null;
    const boxColor = config.individual_devices_box_color || "var(--divider-color)";
    const lineColor = config.flow_line_color || "var(--divider-color, #ccc)";
    const needsFallbackConnector = !apCount;
    const groupBy = config.individual_devices_group_by || "none";
    const groups = groupBy !== "none" ? groupIndividualDevices(hass, devices, groupBy) : null;
    const groupLayout = config.individual_devices_group_layout || "widest_fits";
    const maxGroupSize = groups ? Math.max(...groups.map((g) => g.devices.length)) : 0;
    // Names are decided per kind, not by the Clients toggle alone: a monitored
    // service follows Monitoring > Show Monitored Names, a client follows the
    // Clients one. The spacing (box padding, row gaps) has to follow whichever
    // labels are actually being drawn.
    const clientNames = !!config.individual_devices_show_names;
    const monitorNames = !!config.monitoring?.show_names;
    const wantsName = (d) => (d._monitor ? monitorNames : clientNames);
    const anyNames = devices.some(wantsName);

    return b`
      <div class="dev-row-container">
        ${needsFallbackConnector
          ? b`
              <div class="ap-col-devconnector single">
                <div
                  class="dev-dotted-line"
                  style="background-image:repeating-linear-gradient(to bottom, ${lineColor} 0px, ${lineColor} 2px, transparent 2px, transparent 6px)"
                ></div>
              </div>
            `
          : null}
        <div class="individual-devices-box" style="${groups ? 'padding:8px;' : (anyNames ? 'padding-bottom:34px;' : '')}">
          <svg class="individual-devices-box-border">
            <rect
              x="1"
              y="1"
              style="width:calc(100% - 2px); height:calc(100% - 2px); rx:${config.individual_devices_box_radius || 'var(--ha-card-border-radius, 12px)'}; ry:${config.individual_devices_box_radius || 'var(--ha-card-border-radius, 12px)'};"
              fill="none"
              stroke="${boxColor}"
              stroke-width="1.5"
              stroke-dasharray="2 4"
            ></rect>
          </svg>
          ${groups
            ? b`
                <div class="individual-devices-groups ${config.individual_devices_group_layout === 'last_fill' ? 'layout-last-fill' : ''}">
                  ${groups.map((group) => {
                    const radius = config.individual_devices_group_box_radius || "var(--ha-card-border-radius, 12px)";
                    // Number(...) matters here, not just ?? 10 - config
                    // values commonly arrive as strings (e.g. "6"), and
                    // leaving `pad` as a string is exactly what caused
                    // 3.1.6's "618px" padding bug the one place this got
                    // used in arithmetic. Coercing at the source makes
                    // every future use of `pad` safe by construction.
                    const pad = Number(config.individual_devices_group_padding ?? 10);
                    const showBorder = config.individual_devices_group_show_border !== false;
                    const colorOverride = (config.individual_devices_group_colors || []).find(
                      (o) => o.name === group.name
                    );
                    const groupBorderColor = colorOverride?.color || config.individual_devices_group_border_color || boxColor;
                    const flexStyle =
                      groupLayout === "widest_fits"
                        ? (group.devices.length === maxGroupSize ? "flex:0 0 auto;" : "flex:1 1 0;")
                        : "";
                    // The name label under each circle is absolutely
                    // positioned (so it doesn't push wrapped rows
                    // apart on its own - see the row-gap bump below
                    // instead), which means it also doesn't contribute
                    // to this box's natural height at all. Without
                    // extra bottom padding here, the label either
                    // overlaps the box's own dashed border or hangs
                    // past it entirely.
                    // `pad` can arrive as a string (config values often
                    // do), so this must coerce to a number before doing
                    // arithmetic on it - `"6" + 18` in JS produces the
                    // string "618" via concatenation, not 24, which is
                    // exactly the bug that shipped in 3.1.6: every
                    // group got an inline padding-bottom of "618px"
                    // instead of "24px", regardless of that group's own
                    // content, making every box look enormous.
                    const bottomPad = group.devices.some(wantsName) ? pad + 18 : pad;
                    return b`
                      <div class="individual-device-group" style="padding:${pad}px ${pad}px ${bottomPad}px ${pad}px; gap:${pad}px; ${flexStyle}">
                        ${showBorder
                          ? b`
                              <svg class="individual-devices-box-border">
                                <rect
                                  x="1"
                                  y="1"
                                  style="width:calc(100% - 2px); height:calc(100% - 2px); rx:${radius}; ry:${radius};"
                                  fill="none"
                                  stroke="${groupBorderColor}"
                                  stroke-width="1.5"
                                  stroke-dasharray="2 4"
                                ></rect>
                              </svg>
                            `
                          : null}
                        <div class="individual-device-group-label">${group.name}</div>
                        <div class="individual-device-group-row" style="${group.devices.some(wantsName) ? 'row-gap:32px;' : ''}">
                          ${group.devices.map((dev) => this._renderIndividualDeviceCircle(dev, hass, config))}
                        </div>
                      </div>
                    `;
                  })}
                </div>
              `
            : b`
                <div class="individual-devices-row" style="${anyNames ? 'row-gap:32px;' : ''}">
                  ${devices.map((dev) => this._renderIndividualDeviceCircle(dev, hass, config))}
                </div>
              `}
        </div>
      </div>
    `;
  }

  _backhaulBadge(ap, hass) {
    // The Primary AP is the root of the wireless topology, so it does not
    // have an upstream AP backhaul to display. Never show a backhaul badge
    // for it, even if a backhaul entity or legacy setting is configured.
    if (ap?.is_primary) return null;
    if (ap.show_backhaul_icon === false) return null;
    const entityId = ap.entities?.backhaul_type;
    if (!entityId || !hass || !hass.states[entityId]) return null;
    const state = String(hass.states[entityId].state).toLowerCase();
    const icon = state === "wired" ? "mdi:ethernet" : "mdi:wifi";
    const color = ap.colors.backhaul_icon || "var(--secondary-text-color)";
    return b`
      <div class="backhaul-icon-mid" style="color:${color}">
        ${renderIcon(icon, `--mdc-icon-size:${this._config.backhaul_icon_size ?? 13}px`)}
      </div>
    `;
  }

  _renderXOnlyVertical(height = 32) {
    return b`
      <div class="vline-pair" style="height:${height}px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          ${renderIcon("mdi:close")}
        </div>
      </div>
    `;
  }

  // Same visual as _renderXOnlyVertical, but stretches to fill 100% of
  // its container instead of a fixed pixel height - pairs with
  // _verticalPassThroughLine so that a column going offline doesn't
  // introduce a smaller fixed-height element into a grid row where
  // every other column's content stretches. A fixed height DOES
  // contribute to CSS Grid's auto-row sizing, while stretching content
  // doesn't - so swapping one for the other in an already-established
  // row can shrink that row's computed height for every column in it.
  _renderXOnlyVerticalStretch() {
    return b`
      <div class="vline-pair" style="height:100%; min-height:24px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          ${renderIcon("mdi:close")}
        </div>
      </div>
    `;
  }

  _renderXOnlyHorizontal(width = 28) {
    return b`
      <div class="hline-single" style="width:${width}px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          ${renderIcon("mdi:close")}
        </div>
      </div>
    `;
  }


  // Draws one strand if only Download or only Upload has an entity, both
  // if each does, or nothing (the caller supplies its own no-bandwidth
  // fallback) if neither does - replaces the old `hasBandwidth` OR check,
  // which drew both strands the moment either one was configured. A
  // Download-only line still flows top-to-bottom, matching data coming
  // in; an Upload-only line flows bottom-to-top, matching data going
  // out - the same two directions each strand already animates in
  // within the dual-line case, just picked here for a single strand.
  _bandwidthLine(dlColor, ulColor, dlDur, ulDur, hasDl, hasUl, animate, height = 32, dashed = false, gap = 16) {
    if (hasDl && hasUl) return this._verticalDualLine(dlColor, ulColor, dlDur, ulDur, animate, height, dashed, gap);
    if (hasDl) return this._verticalSingleLine(dlColor, dlDur, animate, height, dashed, false);
    if (hasUl) return this._verticalSingleLine(ulColor, ulDur, animate, height, dashed, true);
    return null;
  }

  _verticalDualLine(c1, c2, d1, d2, animate, height = 32, dashed = false, gap = 16) {
    const strandStyle = (color, left) =>
      dashed
        ? `left:${left}px;background-image:repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px);`
        : `left:${left}px;background:${color}`;
    const heightStyle = typeof height === "string"
      ? `height:${height}; min-height:32px;`
      : `height:${height}px;`;
    // 24 is .vline-pair's own centre (it's a fixed 48px box); the two
    // strands sit gap/2 either side of it - 16 (8px either side) is what
    // every other dual line on the card already uses.
    const leftPos = 24 - gap / 2;
    const rightPos = 24 + gap / 2;
    return b`
      <div class="vline-pair" style="${heightStyle}">
        <div class="vline" style="${strandStyle(c1, leftPos)}"></div>
        <div class="vline" style="${strandStyle(c2, rightPos)}"></div>
        ${animate
          ? b`
              ${this._cssDotsY(c1, d1, leftPos, false)}
              ${this._cssDotsY(c2, d2, rightPos, true)}
            `
          : null}
      </div>
    `;
  }

  _verticalSingleLine(color, duration, animate, height = 24, dashed = false, reverse = false) {
    const heightStyle = typeof height === "string"
      ? `height:${height}; min-height:24px;`
      : `height:${height}px;`;
    return b`
      <div class="vline-single" style="${heightStyle}">
        <div
          class="vline"
          style="${dashed
            ? `left:50%;background-image:repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px);`
            : `left:50%;background:${color}`}"
        ></div>
        ${animate ? this._cssDotsY(color, duration, "50%", reverse, 2) : null}
      </div>
    `;
  }

  // A vertical pass-through line that stretches to fill 100% of its
  // container's height, rather than a fixed pixel value. Needed for
  // columns where a given layer (Switch or AP) is inactive but the
  // row still has to visually connect through it - since that row's
  // actual rendered height is set by other columns' taller content
  // (e.g. a Switch circle), a fixed-height line would leave a gap.
  _verticalPassThroughLine(color, duration, animate, dashed = false) {
    return b`
      <div class="vline-single" style="height:100%; min-height:28px;">
        <div
          class="vline"
          style="${dashed
            ? `left:50%;background-image:repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px);`
            : `left:50%;background:${color}`}"
        ></div>
        ${animate ? this._cssDotsY(color, duration, "50%", false, 2) : null}
      </div>
    `;
  }

  _horizontalSingleLine(color, duration, animate, width = 36, reverse = false) {
    return b`
      <div class="hline-single" style="width:${width}px">
        <div class="hline" style="background:${color}"></div>
        ${animate ? this._cssDotsX(color, duration, "50%", reverse, 2) : null}
      </div>
    `;
  }

  _cssDotsY(color, duration, posX, reverse, count = 3) {
    const leftPos = typeof posX === "number" ? `${posX}px` : posX;
    return Array.from({ length: count }).map(
      (_, i) => b`
        <div
          class="flow-dot-track flow-dot-track-y"
          style="
            left:${leftPos};
            animation-name:${reverse ? "nf-dot-btt" : "nf-dot-ttb"};
            animation-duration:${duration}s;
            animation-delay:${(i * duration) / count}s;
          "
        >
          <div class="flow-dot" style="background:${color};"></div>
        </div>
      `
    );
  }

  _cssDotsX(color, duration, posY, reverse, count = 3) {
    const topPos = typeof posY === "number" ? `${posY}px` : posY;
    return Array.from({ length: count }).map(
      (_, i) => b`
        <div
          class="flow-dot-track flow-dot-track-x"
          style="
            top:${topPos};
            animation-name:${reverse ? "nf-dot-rtl" : "nf-dot-ltr"};
            animation-duration:${duration}s;
            animation-delay:${(i * duration) / count}s;
          "
        >
          <div class="flow-dot" style="background:${color};"></div>
        </div>
      `
    );
  }

  _ring(completedPct, remainingPct, colorRem, colorProg, entityRem, dashed = false) {
    const radius = 49;
    const circumference = 2 * Math.PI * radius;
    const completedDash = (completedPct / 100) * circumference;
    const remainingDash = circumference - completedDash;

    const rings = w`
        <g transform="rotate(-90 50 50)">
          <circle
            cx="50" cy="50" r="${radius}"
            fill="none"
            stroke="${colorRem}"
            stroke-width="3"
          />
          <circle
            cx="50" cy="50" r="${radius}"
            fill="none"
            stroke="${colorProg}"
            stroke-width="3"
            stroke-dasharray="${completedDash} ${remainingDash}"
            stroke-linecap="butt"
            @click=${() => this._handleMoreInfo(entityRem)}
          />
        </g>
    `;

    if (!dashed) {
      return w`
      <svg class="ring-svg" viewBox="0 0 100 100">
        ${rings}
      </svg>
    `;
    }

    // Secondary/backup service: the same ring, cut into dashes by a mask
    // so both the progress arc and its track read as a dashed outline.
    const dashCount = 36;
    const period = circumference / dashCount;
    const dash = period * 0.6;
    return w`
      <svg class="ring-svg" viewBox="0 0 100 100">
        <defs>
          <mask id="nf-ring-dash-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <circle
              cx="50" cy="50" r="${radius}"
              fill="none"
              stroke="#fff"
              stroke-width="8"
              stroke-dasharray="${dash} ${period - dash}"
            />
          </mask>
        </defs>
        <g mask="url(#nf-ring-dash-mask)">
          ${rings}
        </g>
      </svg>
    `;
  }

  // One Internet circle (primary or secondary): icon, label, quota ring,
  // offline pulse. A secondary/backup service is drawn with a dashed outline.
  _renderInternetNode(hass, inet, { secondary = false, fallbackLabel = "Internet", ipBadge = null } = {}) {
    const size = inet.circle_size ?? 72;
    const state = getEntityState(hass, inet.entity);
    const label = getCircleLabel(inet.name, state, fallbackLabel);
    const offline = isEntityUnavailable(hass, inet.entity);
    const bTotal = getEntityState(hass, inet.entities.quota_total)?.value;
    const bRem = getEntityState(hass, inet.entities.quota_remaining)?.value;
    const hasQuotaEntities = !!(inet.entities.quota_total || inet.entities.quota_remaining);
    const hasQuota =
      inet.entities.quota_total &&
      inet.entities.quota_remaining &&
      bTotal != null &&
      bTotal > 0 &&
      bRem != null;
    const ratio = hasQuota ? Math.max(0, Math.min(1, bRem / bTotal)) : 0;
    const completedPct = (hasQuota ? 1 - ratio : 0) * 100;
    const remainingPct = 100 - completedPct;
    const circleColor = offline
      ? inet.colors.offline_circle || "var(--error-color)"
      : inet.colors.circle;
    const iconColor = offline
      ? inet.colors.offline_icon || "var(--error-color)"
      : inet.colors.icon;
    // The ring is the circle's own Border Color, except while the quota ring is drawn over it.
    const borderColor = offline ? circleColor : hasQuota ? "transparent" : circleColor;

    return b`
      <div
        class="circle-wrap"
        style="width:${size}px; height:${size}px; opacity:${offline ? 0.6 : 1};"
        @click=${() => this._handleMoreInfo(inet.entity, secondary ? "internet2" : "internet")} data-nfc-e=${this._flatDetailsOn() ? inet.entity : Symbol.for('lit-nothing')} data-nfc-n=${this._flatDetailsOn() ? (secondary ? "internet2" : "internet") : Symbol.for('lit-nothing')}
      >
        <div
          class="circle ${offline ? "circle-pulse" : ""}"
          style="border-color:${borderColor}; ${secondary ? "border-style:dashed;" : ""} --pulse-color:${circleColor};"
        >
          ${renderIcon(offline ? "mdi:exclamation-thick" : (inet.icon || "mdi:web"), `color:${iconColor};--mdc-icon-size:${inet.icon_size ?? 24}px`, offline ? "icon-pulse" : "")}
          <span class="circle-value">${label}</span>
        </div>
        ${hasQuota && !offline
          ? this._ring(
              completedPct,
              remainingPct,
              inet.colors.quota_remaining,
              inet.colors.quota_progress,
              inet.entities.quota_remaining,
              secondary
            )
          : null}
        ${this._renderMonitorDeviceBadge(hass, inet.entity, 0)}
        ${ipBadge}
      </div>
    `;
  }

  // One vertical line drawn from a speed spec { hasDl, hasUl, dlDur, ulDur }:
  // a pair when both a download and an upload entity exist, a single line
  // for either alone (flowing that way), and a plain single line when neither
  // does. Always in the one global line colour.
  _stemLine(spec, height, offline, animate, dashed = false, gap = 16) {
    if (offline) return this._renderXOnlyVertical(height);
    const flow = this._config.flow_line_color || "var(--divider-color, #ccc)";
    const { hasDl, hasUl, dlDur, ulDur } = spec;
    return hasDl || hasUl
      ? this._bandwidthLine(flow, flow, dlDur, ulDur, hasDl, hasUl, animate, height, dashed, gap)
      : this._verticalSingleLine(flow, dlDur, animate, height, dashed);
  }

  // The speed spec for a device sitting below the Internet: ITS OWN download /
  // upload entities decide single or double, and its own readings set the
  // flow speed - not the Internet's. `entities` may be empty (a device with
  // none, e.g. a Switch), which gives a single line.
  _speedSpec(hass, entities) {
    const minDur = this._config.min_flow_duration ?? 0.6;
    const maxDur = this._config.max_flow_duration ?? 6;
    return {
      hasDl: !!(entities && entities.download),
      hasUl: !!(entities && entities.upload),
      dlDur: calcFlowDuration(getEntityState(hass, entities && entities.download)?.value, minDur, maxDur),
      ulDur: calcFlowDuration(getEntityState(hass, entities && entities.upload)?.value, minDur, maxDur)
    };
  }

  // The line into the Primary AP when there is no Router or Switch between it
  // and the Internet (the AP is the gateway): the AP's own line.
  _apFeedLine(item, height, offline, animate) {
    return this._stemLine(
      { hasDl: !!item.ap.entities.download, hasUl: !!item.ap.entities.upload, dlDur: item.dlDur, ulDur: item.ulDur },
      height,
      offline,
      animate
    );
  }

  // Primary + secondary Internet side by side, joined by a T-bar into
  // whatever sits below (Router, Switch, Primary AP, a lone Node) - or,
  // when that is the Nodes bus itself, dropping straight onto its bus-line.
  // Active/Standby (the default): the secondary is a backup, so its outline,
  // its own drop lines and its half of the T-bar are dashed - until the
  // primary actually goes down, at which point it's carrying traffic and is
  // drawn solid instead (see failoverActive below). Active/Active: the
  // secondary looks just like the primary the whole time - solid outline,
  // solid lines. Every line in the assembly - both drops, the bar and the
  // stem - is the one global line colour; the stem's single / double comes
  // from whatever sits below it.
  _renderDualInternet(hass, prim, sec, { animate, directBus, routerOffline, wanIpBadge, wanIpBadgeSecondary = null, stem = null }) {
    // internet_secondary always merges against the same DEFAULT_INTERNET as
    // the primary, so its OWN circle_size/icon_size are never actually
    // unset - they'd just silently drift from the primary's once someone
    // moves the Internet Circle/Icon Size sliders, which only ever write to
    // config.internet. Always matching the primary here (there's no
    // separate size control for the secondary in the editor) is what keeps
    // the one pair of sliders governing both, as intended.
    sec = { ...sec, circle_size: prim.circle_size, icon_size: prim.icon_size };
    const minDur = this._config.min_flow_duration ?? 0.6;
    const maxDur = this._config.max_flow_duration ?? 6;
    const flow = this._config.flow_line_color || "var(--divider-color, #ccc)";
    const showIp = !!this._config.show_ip_addressing;
    const colW = Math.max(prim.circle_size ?? 72, sec.circle_size ?? 72);
    const gap = 24;
    const dropH = directBus ? (showIp ? 48 : 32) : (showIp ? 40 : 26);
    const stemH = showIp ? 28 : 26;

    const pOff = isEntityUnavailable(hass, prim.entity);
    const sOff = isEntityUnavailable(hass, sec.entity);

    // The same drop line, whichever circle it belongs to: hasDl / hasUl and
    // the flow speed always come from THAT service's own entities, so the
    // primary and secondary can never diverge in what they animate.
    // A closer strand pairing than the card's usual 16px, to match how
    // tight the download/upload lines look on a typical (smaller) AP
    // circle - the Internet/Router circles default larger, which made the
    // same absolute gap look noticeably more spread out.
    const INTERNET_LINE_GAP = 10;
    const bandwidth = (inet, height, dashed, offline, anim = animate) =>
      this._stemLine({ ...this._speedSpec(hass, inet.entities), }, height, offline, anim, dashed, INTERNET_LINE_GAP);

    const dashedH = `background-image:repeating-linear-gradient(to right, ${flow} 0px, ${flow} 4px, transparent 4px, transparent 8px);`;
    const half = (colW + gap) / 2;
    const standby = sec.mode === "active_standby";
    // Active/Standby draws the secondary dashed to mark it as a backup - but
    // once the primary actually fails and the secondary is the one carrying
    // traffic, that distinction is backwards, so it is drawn like the active
    // link instead: solid outline, solid drop line, solid T-bar half.
    const failoverActive = standby && pOff && !sOff;
    const secondaryDashed = standby && !failoverActive;
    // A column with both a download and an upload line draws them as a pair
    // 16px apart (outer edges 9px either side of the column's centre), so the
    // T-bar has to reach those outer edges, not just the centres. A single
    // line is only 2px wide.
    const isPair = (inet, off) => !off && !!inet.entities.download && !!inet.entities.upload;
    const extP = isPair(prim, pOff) ? 9 : 1;
    const extS = isPair(sec, sOff) ? 9 : 1;
    // Whichever service is carrying traffic feeds the stem: the primary,
    // unless only the backup is still up.
    const active = pOff && !sOff ? sec : prim;
    const stemOffline = (pOff && sOff) || routerOffline;

    return b`
      <div
        class="internet-row internet-row-dual"
        data-col-w="${colW}"
        style="gap:${gap}px;"
      >
        <div class="inet-col" style="width:${colW}px;">
          ${this._renderInternetNode(hass, prim, { fallbackLabel: "Internet", ipBadge: wanIpBadge })}
          ${bandwidth(prim, dropH, false, pOff)}
        </div>
        <div class="inet-col" style="width:${colW}px;">
          ${this._renderInternetNode(hass, sec, { secondary: secondaryDashed, fallbackLabel: "Backup", ipBadge: wanIpBadgeSecondary })}
          ${bandwidth(sec, dropH, secondaryDashed, sOff, animate && !secondaryDashed)}
        </div>
      </div>
      ${directBus
        ? null
        : b`
            <div class="inet-tbar" style="width:${2 * colW + gap}px;">
              <div class="inet-tbar-seg" style="left:${colW / 2 - extP}px; width:${half + extP}px; background:${flow};"></div>
              <div class="inet-tbar-seg" style="left:${colW + gap / 2}px; width:${half + extS}px; ${secondaryDashed ? dashedH : `background:${flow};`}"></div>
            </div>
            ${this._stemLine(stem || this._speedSpec(hass, null), stemH, stemOffline, animate, false, INTERNET_LINE_GAP)}
          `}
    `;
  }

  _renderTrunk(
    internet,
    internetState,
    lan,
    lanState,
    lanDur,
    pingState,
    hasQuota,
    hasQuotaEntities,
    completedRatio,
    dlDur,
    ulDur,
    animate,
    router,
    routerEntityState,
    routerStatus,
    summaryPos,
    hass,
    routerEnabled,
    primaryApItem,
    hasOtherAps,
    switchConfig,
    switchEnabled,
    switchEntityState,
    switchDevicesState,
    switchOfflineTop,
    switchDur
  ) {
    const completedPct = completedRatio * 100;
    const remainingPct = 100 - completedPct;
    const internetLabel = getCircleLabel(internet.name, internetState, "Internet");
    const routerLabel = getCircleLabel(router.name, routerEntityState, "Router");

    const internetSize = internet.circle_size ?? 72;
    const routerSize = router.circle_size ?? 72;
    const lanSize = lan.circle_size ?? 56;

    const internetOffline = isEntityUnavailable(hass, internet.entity);
    const routerOffline = routerEnabled && isEntityUnavailable(hass, router.entity);
    const lanOffline = isEntityUnavailable(hass, lan.entity);
    const internetOrRouterOffline = internetOffline || routerOffline;

    // Optional backup WAN. "wanOffline" is true only when EVERY configured
    // Internet service is down - a single dead link with a working backup
    // isn't an outage for anything downstream.
    const sec = internetSecondaryEnabled(this._config) ? this._config.internet_secondary : null;
    const secOffline = !!sec && isEntityUnavailable(hass, sec.entity);
    const wanOffline = sec ? (internetOffline && secOffline) : internetOffline;
    // With no Router, Switch or inline Primary AP below, the Internet
    // circles drop straight onto the Nodes bus-line (the existing T-bar)
    // rather than getting a T-bar of their own. A single top-level Node
    // has no bus-line to join, so that case keeps its own T-bar.
    const branchCols = (this._topology && this._topology.branchColumns) || [];
    const topLevelNodes = branchCols.filter((c) => c.topStart).length;
    const directBus = !!sec && !routerEnabled && !switchEnabled && !primaryApItem && topLevelNodes > 1;
    const wanIpBadge = routerEnabled && router.entities.wan_ip
      ? this._renderIpBadge(hass, router.entities.wan_ip, "below", router, "wan")
      : primaryApItem && primaryApItem.ap.entities.wan_ip
      ? this._renderIpBadge(hass, primaryApItem.ap.entities.wan_ip, "below", primaryApItem.ap, "wan")
      : null;
    // The secondary is a genuinely separate connection, so - unlike the
    // primary - it never falls back to the Primary AP's own address; it
    // only ever shows what Secondary WAN IP Address is explicitly set to.
    const wanIpBadgeSecondary = routerEnabled && router.entities.wan_ip_secondary
      ? this._renderIpBadge(hass, router.entities.wan_ip_secondary, "below", router, "wan")
      : null;
    const internetHasDl = !!internet.entities.download;
    const internetHasUl = !!internet.entities.upload;
    const internetHasBandwidth = internetHasDl || internetHasUl;

    // Primary AP, when designated, sits inline in the trunk directly below
    // Switch (if configured), Router (or Internet, if Router is hidden) -
    // the remaining APs then fan out from the primary AP instead of from
    // whatever's directly above it.
    const primaryApOffline = primaryApItem
      ? isEntityUnavailable(hass, primaryApItem.ap.entity)
      : false;
    const beforePrimaryOffline =
      (routerEnabled ? routerOffline : wanOffline) || (switchEnabled && switchOfflineTop);
    const primaryLineOffline = beforePrimaryOffline || primaryApOffline;
    const primaryApCircleColor = primaryApItem
      ? (primaryApOffline
          ? primaryApItem.ap.colors.offline_circle || "var(--error-color)"
          : primaryApItem.ap.colors.circle)
      : "";
    const primaryApIconColor = primaryApItem
      ? (primaryApOffline
          ? primaryApItem.ap.colors.offline_icon || "var(--error-color)"
          : primaryApItem.ap.colors.icon)
      : "";
    const primaryApLabel = primaryApItem
      ? getCircleLabel(primaryApItem.ap.name, primaryApItem.apEntityState, "AP")
      : "";
    const primaryApSize = this._config.ap_circle_size ?? 72;
    const primaryApHasDl = !!(primaryApItem && primaryApItem.ap.entities.download);
    const primaryApHasUl = !!(primaryApItem && primaryApItem.ap.entities.upload);
    const primaryApHasBandwidth = primaryApHasDl || primaryApHasUl;
    // No Router or Switch between the Internet and the Primary AP: the AP is
    // the gateway and the line into it belongs to the AP.
    const apFeedsFromInternet = !!primaryApItem && !routerEnabled && !switchEnabled;
    // The line from the T-bar (dual Internet) into whatever sits below it is
    // THAT device's line: the Router's own download / upload entities decide
    // single or double, or - with no Router - the Primary AP's; a Switch (or
    // anything without them) gets a single line. Never the Internet's.
    const stemSpec = routerEnabled
      ? this._speedSpec(hass, router.entities)
      : apFeedsFromInternet
      ? { hasDl: primaryApHasDl, hasUl: primaryApHasUl, dlDur: primaryApItem.dlDur, ulDur: primaryApItem.ulDur }
      : this._speedSpec(hass, null);


    const internetCircleColor = internetOffline
      ? internet.colors.offline_circle || "var(--error-color)"
      : internet.colors.circle;
    const internetIconColor = internetOffline
      ? internet.colors.offline_icon || "var(--error-color)"
      : internet.colors.icon;
    const routerCircleColor = routerOffline
      ? router.colors.offline_circle || "var(--error-color)"
      : router.colors.circle;
    const routerIconColor = routerOffline
      ? router.colors.offline_icon || "var(--error-color)"
      : router.colors.icon;
    const lanCircleColor = lanOffline
      ? lan.colors.offline_circle || "var(--error-color)"
      : lan.colors.circle;
    const lanIconColor = lanOffline
      ? lan.colors.offline_icon || "var(--error-color)"
      : lan.colors.icon;
    const switchCircleColor = switchOfflineTop
      ? switchConfig.colors?.offline_circle || "var(--error-color)"
      : switchConfig.colors?.circle;
    const switchIconColor = switchOfflineTop
      ? switchConfig.colors?.offline_icon || "var(--error-color)"
      : switchConfig.colors?.icon;
    const switchSize = switchConfig.circle_size ?? 60;
    const switchLabel = getCircleLabel(switchConfig.name, switchEntityState, "Switch");

    return b`
      <div class="trunk">
        ${sec
          ? this._renderDualInternet(hass, internet, sec, {
              animate,
              directBus,
              routerOffline: routerEnabled && routerOffline,
              wanIpBadge,
              wanIpBadgeSecondary,
              stem: stemSpec
            })
          : b`
        <div class="internet-row pos-${summaryPos}">
          ${this._renderInternetNode(hass, internet, { fallbackLabel: "Internet", ipBadge: wanIpBadge })}
        </div>

        ${internetOrRouterOffline
          ? this._renderXOnlyVertical(32)
          : apFeedsFromInternet
          ? this._apFeedLine(primaryApItem, 32, false, animate)
          : internetHasBandwidth
          ? this._bandwidthLine(
              this._config.flow_line_color || "var(--divider-color, #ccc)",
              this._config.flow_line_color || "var(--divider-color, #ccc)",
              dlDur,
              ulDur,
              internetHasDl,
              internetHasUl,
              animate,
              32,
              false,
              10
            )
          : this._verticalSingleLine(
              this._config.flow_line_color || "var(--divider-color, #ccc)",
              dlDur,
              animate,
              32
            )}
        `}

        ${routerEnabled
          ? b`
        <div
          class="circle-wrap router-anchor"
          style="width:${routerSize}px; height:${routerSize}px;"
          @click=${() => this._handleMoreInfo(router.entity, "router")} data-nfc-e=${this._flatDetailsOn() ? router.entity : Symbol.for('lit-nothing')} data-nfc-n=${this._flatDetailsOn() ? "router" : Symbol.for('lit-nothing')}
        >
          <div class="circle ${routerOffline ? "circle-pulse" : ""}" style="border-color:${routerCircleColor}; opacity:${routerOffline ? 0.6 : 1}; --pulse-color:${routerCircleColor};">
            ${renderIcon(routerOffline ? "mdi:exclamation-thick" : (router.icon || "mdi:router-network"), `color:${routerIconColor};--mdc-icon-size:${router.icon_size ?? 24}px`, routerOffline ? "icon-pulse" : "")}
            <span class="circle-value">
              ${routerStatus
                ? `${routerStatus.display}${routerStatus.unit ? ` ${routerStatus.unit}` : ""}`
                : routerLabel}
            </span>
          </div>
          ${(() => {
            const vpnVisible = this._config.vpn_target === "router" && !!this._config.vpn_entity;
            const fwVisible = this._config.firewall_target === "router" && !!this._config.firewall_entity;
            const dnsVisible = this._config.dns_target === "router" && !!this._config.dns_entity;
            const rpVisible = this._config.reverse_proxy_target === "router" && !!this._config.reverse_proxy_entity;
            const poeVisible = computePoeTotal(hass, router.entity, router.poe) != null;
            const stacks = computeBadgeStacks([
              { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
              { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
              { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
              { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
              { key: "poe", location: router.poe?.location, visible: poeVisible },
              this._monitorBadgeStackItem(router.entity)
            ]);
            return b`
              ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
              ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
              ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
              ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
              ${this._renderPoeBadge(hass, router.entity, router.poe, stacks.poe || 0)}
              ${this._renderMonitorDeviceBadge(hass, router.entity, stacks.monitor || 0)}
              ${this._renderIpBadge(hass, router.entities.lan_ip, "below", router, "lan")}
            `;
          })()}
          ${lan.entity
            ? b`
                <div class="lan-branch ${summaryPos === "right" ? "flip-left" : ""}">
                  ${routerOffline
                    ? this._renderXOnlyHorizontal(28)
                    : this._horizontalSingleLine(this._config.flow_line_color || "var(--divider-color, #ccc)", lanDur, animate, 28, summaryPos === "right")}
                  <div
                    class="circle-wrap"
                    style="width:${lanSize}px; height:${lanSize}px; opacity:${lanOffline ? 0.6 : 1};"
                    @click=${(e) => {
                      e.stopPropagation();
                      this._handleMoreInfo(lan.entity, "lan");
                    }} data-nfc-e=${this._flatDetailsOn() ? lan.entity : Symbol.for('lit-nothing')} data-nfc-n=${this._flatDetailsOn() ? "lan" : Symbol.for('lit-nothing')}
                  >
                    <div class="circle ${lanOffline ? "circle-pulse" : ""}" style="border-color:${lanCircleColor}; --pulse-color:${lanCircleColor};">
                      ${renderIcon(lanOffline ? "mdi:exclamation-thick" : (lan.icon || "mdi:lan"), `color:${lanIconColor};--mdc-icon-size:${lan.icon_size ?? 20}px`, lanOffline ? "icon-pulse" : "")}
                      <span class="circle-value">
                        ${lanState ? roundVal(lanState.value) : "-"}
                      </span>
                    </div>
                    ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(lan), 0)}
                  </div>
                </div>
              `
            : null}
        </div>
          `
          : null}

        ${switchEnabled
          ? b`
              ${(routerEnabled ? routerOffline : wanOffline) || switchOfflineTop
                ? this._renderXOnlyVertical(this._coreSwitchLineHeight(hass, routerEnabled))
                : this._verticalSingleLine(
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    switchDur,
                    animate,
                    this._coreSwitchLineHeight(hass, routerEnabled)
                  )}
              <div
                class="circle-wrap"
                style="width:${switchSize}px; height:${switchSize}px; opacity:${switchOfflineTop ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(switchConfig.entity, "switch")} data-nfc-e=${this._flatDetailsOn() ? switchConfig.entity : Symbol.for('lit-nothing')} data-nfc-n=${this._flatDetailsOn() ? "switch" : Symbol.for('lit-nothing')}
              >
                <div class="circle ${switchOfflineTop ? "circle-pulse" : ""}" style="border-color:${switchCircleColor}; --pulse-color:${switchCircleColor};">
                  ${renderIcon(switchOfflineTop ? "mdi:exclamation-thick" : (switchConfig.icon || "mdi:switch"), `color:${switchIconColor};--mdc-icon-size:${switchConfig.icon_size ?? 22}px`, switchOfflineTop ? "icon-pulse" : "")}
                  <span class="circle-value">${switchLabel}</span>
                </div>
                ${this._renderNodeIpBadge(hass, switchConfig, "above")}
                ${(() => {
                  const vpnVisible = this._config.vpn_target === "switch" && !!this._config.vpn_entity;
                  const fwVisible = this._config.firewall_target === "switch" && !!this._config.firewall_entity;
                  const dnsVisible = this._config.dns_target === "switch" && !!this._config.dns_entity;
                  const rpVisible = this._config.reverse_proxy_target === "switch" && !!this._config.reverse_proxy_entity;
                  const poeVisible = computePoeTotal(hass, switchConfig.entity, switchConfig.poe) != null;
                  const stacks = computeBadgeStacks([
                    { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                    { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                    { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                    { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
                    { key: "poe", location: switchConfig.poe?.location, visible: poeVisible },
                    this._monitorBadgeStackItem(monitorDeviceKey(switchConfig))
                  ]);
                  return b`
                    ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                    ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                    ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                    ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                    ${this._renderPoeBadge(hass, switchConfig.entity, switchConfig.poe, stacks.poe || 0)}
                    ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(switchConfig), stacks.monitor || 0)}
                  `;
                })()}
                ${switchConfig.entities?.connected_devices
                  ? (() => {
                      const swDevOffline = switchOfflineTop || isEntityUnavailable(hass, switchConfig.entities.connected_devices);
                      const swDevCircleColor = swDevOffline
                        ? switchConfig.colors?.devices_offline_circle || "var(--error-color)"
                        : switchConfig.colors?.devices_circle;
                      const swDevIconColor = swDevOffline
                        ? switchConfig.colors?.devices_offline_icon || "var(--error-color)"
                        : switchConfig.colors?.devices_icon;
                      return b`
                        <div class="lan-branch ${summaryPos === "right" ? "flip-left" : ""}">
                          ${swDevOffline
                            ? this._renderXOnlyHorizontal(28)
                            : this._horizontalSingleLine(this._config.flow_line_color || "var(--divider-color, #ccc)", switchDur, animate, 28, summaryPos === "right")}
                          <div
                            class="circle-wrap"
                            style="width:${this._config.ap_devices_circle_size ?? 56}px; height:${this._config.ap_devices_circle_size ?? 56}px; opacity:${swDevOffline ? 0.6 : 1};"
                            @click=${(e) => {
                              e.stopPropagation();
                              this._handleMoreInfo(switchConfig.entities.connected_devices);
                            }} data-nfc-e=${this._flatDetailsOn() ? switchConfig.entities.connected_devices : Symbol.for('lit-nothing')}
                          >
                            <div class="circle ${swDevOffline ? "circle-pulse" : ""}" style="border-color:${swDevCircleColor}; --pulse-color:${swDevCircleColor};">
                              ${renderIcon(swDevOffline ? "mdi:exclamation-thick" : (switchConfig.devices_icon || "mdi:devices"), `color:${swDevIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px`, swDevOffline ? "icon-pulse" : "")}
                              <span class="circle-value">${switchDevicesState ? roundVal(switchDevicesState.value) : "-"}</span>
                            </div>
                          </div>
                        </div>
                      `;
                    })()
                  : null}
              </div>
            `
          : null}

        ${primaryApItem
          ? b`
              ${(() => {
                // Router's LAN IP badge sits just below the Router
                // circle (top of this segment); Primary AP's own IP
                // badge sits just above the Primary AP circle (bottom
                // of this segment) - at the default 32px, they'd
                // overlap in the middle, so this segment grows 50%
                // taller whenever IP badges are switched on.
                const lineHeight = this._config.show_ip_addressing ? 48 : 32;
                if (!routerEnabled && !switchEnabled) return null;
                if (primaryLineOffline) return this._renderXOnlyVertical(lineHeight);
                if (primaryApHasBandwidth) {
                  return this._bandwidthLine(
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    primaryApItem.dlDur,
                    primaryApItem.ulDur,
                    primaryApHasDl,
                    primaryApHasUl,
                    animate,
                    lineHeight
                  );
                }
                return this._verticalSingleLine(
                  this._config.flow_line_color || "var(--divider-color, #ccc)",
                  primaryApItem.dlDur,
                  animate,
                  lineHeight
                );
              })()}
              <div
                class="circle-wrap"
                style="width:${primaryApSize}px; height:${primaryApSize}px; opacity:${primaryApOffline ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(primaryApItem.ap.entity)} data-nfc-e=${this._flatDetailsOn() ? primaryApItem.ap.entity : Symbol.for('lit-nothing')}
              >
                <div
                  class="circle ${primaryApOffline ? "circle-pulse" : ""}"
                  style="border-color:${primaryApCircleColor}; --pulse-color:${primaryApCircleColor};"
                >
                  ${renderIcon(primaryApOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.icon || "mdi:wifi"), `color:${primaryApIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px`, primaryApOffline ? "icon-pulse" : "")}
                  <span class="circle-value">${primaryApLabel}</span>
                </div>
                ${(() => {
                  const ap = primaryApItem.ap;
                  const vpnVisible = this._config.vpn_target === "primary_ap" && !!this._config.vpn_entity;
                  const fwVisible = this._config.firewall_target === "primary_ap" && !!this._config.firewall_entity;
                  const dnsVisible = this._config.dns_target === "primary_ap" && !!this._config.dns_entity;
                  const rpVisible = this._config.reverse_proxy_target === "primary_ap" && !!this._config.reverse_proxy_entity;
                  const stacks = computeBadgeStacks([
                    { key: "primary", location: ap.primary_badge_location, visible: ap.show_primary_badge !== false },
                    { key: "poe", location: ap.poe?.location, visible: computePoeTotal(hass, ap.entity, ap.poe) != null },
                    this._monitorBadgeStackItem(monitorDeviceKey(ap)),
                    { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                    { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                    { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                    { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible }
                  ]);
                  return b`
                    ${this._renderPrimaryApBadge(ap, stacks.primary || 0)}
                    ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                    ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                    ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                    ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                    ${this._renderPoeBadge(hass, ap.entity, ap.poe, stacks.poe || 0)}
                    ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(ap), stacks.monitor || 0)}
                    ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                  `;
                })()}
              </div>
              ${!hasOtherAps && primaryApItem.hasDevices
                ? (() => {
                    const devOffline =
                      primaryApOffline ||
                      isEntityUnavailable(hass, primaryApItem.ap.entities.connected_devices);
                    const devCircleSize = this._config.ap_devices_circle_size ?? 56;
                    const devCircleColor = devOffline
                      ? primaryApItem.ap.colors.devices_offline_circle || "var(--error-color)"
                      : primaryApItem.ap.colors.devices_circle;
                    const devIconColor = devOffline
                      ? primaryApItem.ap.colors.devices_offline_icon || "var(--error-color)"
                      : primaryApItem.ap.colors.devices_icon;
                    return b`
                      ${this._verticalSingleLine(
                        this._config.flow_line_color || "var(--divider-color, #ccc)",
                        primaryApItem.devDur,
                        animate,
                        24,
                        true
                      )}
                      <div
                        class="circle-wrap"
                        style="width:${devCircleSize}px; height:${devCircleSize}px; opacity:${devOffline ? 0.6 : 1};"
                        @click=${() =>
                          this._handleMoreInfo(primaryApItem.ap.entities.connected_devices)} data-nfc-e=${this._flatDetailsOn() ? primaryApItem.ap.entities.connected_devices : Symbol.for('lit-nothing')}
                      >
                        <div
                          class="circle ${devOffline ? "circle-pulse" : ""}"
                          style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                        >
                          ${renderIcon(devOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.devices_icon || "mdi:devices"), `color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px`, devOffline ? "icon-pulse" : "")}
                          <span class="circle-value">
                            ${primaryApItem.devicesState ? roundVal(primaryApItem.devicesState.value) : "-"}
                          </span>
                        </div>
                      </div>
                    `;
                  })()
                : null}
            `
          : null}
      </div>
    `;
  }

  _renderBranches(columns, animate, busLineColor, hasIndividualDevices, individualDevicesLineColor, hass, routerOffline, routerOfflineColor, routerEnabled, primaryApItem, primaryApLayout, minDur, maxDur, primaryOriginalIndex = -1, tierCount = 2) {
    const count = columns.length;
    const primaryHasDevices = !!(primaryApItem && primaryApItem.hasDevices);
    const showPrimaryExtraCol = !!primaryApItem && (primaryHasDevices || hasIndividualDevices);
    const totalCols = count + (showPrimaryExtraCol ? 1 : 0);
    const extraCol = showPrimaryExtraCol ? Math.max(0, primaryOriginalIndex) + 1 : null;
    const apCol = (i) => {
      if (!showPrimaryExtraCol) return i + 1;
      return i < primaryOriginalIndex ? (i + 1) : (i + 2);
    };
    // One connector hangs off the bus per plain Access Point and per Node
    // Switch/Homelab (however many columns a Switch spans below it).
    const topLevelCount = columns.filter((c) => c.topStart).length;
    const collapseTbar = topLevelCount === 1 && !showPrimaryExtraCol;
    const hideApOwnLine = !routerEnabled && topLevelCount === 1 && !showPrimaryExtraCol;

    // Three independent layers - Switch, AP, Devices - each spans two
    // grid rows (its own connecting line, then its own circle row).
    // A layer collapses to 0px entirely when nothing in the whole bus
    // uses it, exactly like the Devices layer already did before
    // Nodes existed.
    const hasAnySwitch = columns.some((c) => c.switch);
    // Any Access Point circle at all - a leaf, or one with devices beneath it.
    const hasAnyAp = columns.some((c) => c.chain?.some((cell) => cell && cell.kind === "ap")) || showPrimaryExtraCol;
    const hasAnyFedSwitch = columns.some((c) => c.subSwitch);
    // A Homelab fed by a Switch (rather than a Node of its own) lives in
    // the tier rows just like an AP or fed Switch does.
    const hasAnyNestedHomelab = columns.some((c) => c.homelab);
    const hasApRow = hasAnyAp || hasAnyFedSwitch || hasAnyNestedHomelab;
    const columnHasDevices = (c) => (c.isHomelab && c.switch.show_devices_line === false) || (c.homelab && c.homelab.show_devices_line === false)
      ? false
      : (c.ownLineOf ? !!c.ownLineOf.entities?.connected_devices : c.subSwitch ? !!c.subSwitch.entities.connected_devices : c.homelab ? !!c.homelab.entities?.connected_devices : c.ap ? !!c.ap.entities.connected_devices : !!(c.switch && c.switch.entities.connected_devices));
    const hasAnyDevices = columns.some(columnHasDevices) || hasIndividualDevices || primaryHasDevices;

    // Each column's animation duration, computed once upfront so every
    // segment of the same logical bus->...->AP connection (Switch-layer
    // pass-through, AP-layer pass-through, and the real terminal line)
    // animates at the same speed. A mismatched duration on pass-through
    // segments is what made the flow look broken/static before, since
    // most of a plain AP's visible connection is pass-through rows.
    // Everything needed to render a plain AP's own line consistently
    // across every row it passes through (Switch-layer pass-through
    // rows 3-4, and its own terminal row 5) - computed once so a dual-
    // bandwidth AP shows both strands the whole way from the bus down
    // to its circle, not just on the final segment.
    // ---- Tier layout ---------------------------------------------------
    // The bus is a stack of layers. Rows 1-2 are the trunk drop and the
    // bus line. Tier t then owns two rows: its connecting line
    // (3 + 2t) and its circle row (4 + 2t) - tier 0 is a Node's own
    // Switch/Homelab, tier 1 its Access Points and fed switches, and
    // every further level of nesting adds one more tier. The Connected
    // Devices layer and the Clients connector always sit beneath
    // the last tier.
    const T = Math.max(2, tierCount);
    const lineRow = (t) => 3 + 2 * t;
    const circleRow = (t) => 4 + 2 * t;
    const devLineRow = 3 + 2 * T;
    const devCircleRow = 4 + 2 * T;
    const devConnectorRow = 5 + 2 * T;
    const extraTierRows = T > 2 ? Array.from({ length: T - 2 }, () => "auto auto").join(" ") + " " : "";
    const colIndex = new Map(columns.map((c, i) => [c, i]));
    // Grid column (and span) of a cell: it starts at its first leaf
    // column and covers every leaf beneath it.
    const gridCol = (cell) => {
      const s = apCol(colIndex.get(cell.firstCol));
      return cell.span > 1 ? `${s} / span ${cell.span}` : `${s}`;
    };
    const apSizeCfg = this._config.ap_circle_size ?? 72;
    const swSizeCfg = this._config.switch?.circle_size ?? 60;
    const hlSizeCfg = this._config.homelab_circle_size ?? 60;
    // (An Access Point's own line has no circle, so it adds nothing to a row.)
    const kindSize = (kind) => (kind === "clientsline" ? 0 : kind === "ap" ? apSizeCfg : kind === "homelab" ? hlSizeCfg : swSizeCfg);
    // The tallest circle actually present in each tier's circle row.
    const tierRowMax = [];
    columns.forEach((col) => (col.chain || []).forEach((cell) => {
      if (!cell) return;
      tierRowMax[cell.tier] = Math.max(tierRowMax[cell.tier] || 0, kindSize(cell.kind));
    }));

    // An Access Point's own line: bandwidth strands, how fast they animate,
    // and whether its backhaul is wired. Works for a leaf AP and for one
    // with devices beneath it alike.
    const apLineInfo = (ap) => {
      const dlDur = calcFlowDuration(getEntityState(hass, ap.entities.download)?.value, minDur, maxDur);
      const ulDur = calcFlowDuration(getEntityState(hass, ap.entities.upload)?.value, minDur, maxDur);
      const hasDl = !!ap.entities.download;
      const hasUl = !!ap.entities.upload;
      return {
        hasBandwidth: hasDl || hasUl,
        hasDl,
        hasUl,
        dlDur,
        ulDur,
        dur: Math.min(dlDur, ulDur),
        wired: isBackhaulWired(hass, ap)
      };
    };
    // A top-level element's connector spans every column beneath it.
    const topGridCol = (col, i) => (col.topSpan > 1 ? `${apCol(i)} / span ${col.topSpan}` : `${apCol(i)}`);

    // Tier 0 (a Node's own Switch / Homelab) has its own row too.
    const tier0RowMax = Math.max(
      columns.some((c) => c.switch && !c.isHomelab) ? swSizeCfg : 0,
      columns.some((c) => c.isHomelab) ? hlSizeCfg : 0
    );

    // Offline state per cell, resolved top-down: a cell is offline when
    // anything above it is (the router, the Node's own Switch, or any
    // fed switch on the way down) or when its own entity is.
    const cellInfo = new Map();
    const infoFor = (cell, col) => {
      let info = cellInfo.get(cell);
      if (info) return info;
      const parent = cell.parent;
      const upstream = parent && parent.kind !== "nodeswitch"
        ? infoFor(parent, col).offline
        : (routerOffline || (!!col.switch && isEntityUnavailable(hass, col.switch.entity)));
      const own = isEntityUnavailable(hass, cell.cfg.entity);
      info = { upstream, own, offline: upstream || own, state: getEntityState(hass, cell.cfg.entity) };
      cellInfo.set(cell, info);
      return info;
    };
    columns.forEach((col) => (col.chain || []).forEach((cell) => { if (cell) infoFor(cell, col); }));

    const columnViewModels = columns.map((col) => {
      const switchState = col.switch ? getEntityState(hass, col.switch.entity) : null;
      const switchOffline = !!col.switch && isEntityUnavailable(hass, col.switch.entity);
      const subSwitchState = col.subSwitch ? getEntityState(hass, col.subSwitch.entity) : null;
      const subSwitchOfflineOwn = !!col.subSwitch && isEntityUnavailable(hass, col.subSwitch.entity);
      const apState = col.ap ? getEntityState(hass, col.ap.entity) : null;
      const apOfflineOwn = !!col.ap && isEntityUnavailable(hass, col.ap.entity);
      const termCell = col.chain?.[col.termTier] || null;
      const termInfo = termCell ? cellInfo.get(termCell) : null;
      const feederOffline = termInfo ? termInfo.upstream : (routerOffline || switchOffline);
      const subOffline = termInfo && col.subSwitch ? termInfo.offline : (feederOffline || subSwitchOfflineOwn);
      const apOffline = termInfo && col.ap ? termInfo.offline : (feederOffline || apOfflineOwn);

      const dlState = col.ap ? getEntityState(hass, col.ap.entities.download) : null;
      const ulState = col.ap ? getEntityState(hass, col.ap.entities.upload) : null;
      const dlDur = col.ap ? calcFlowDuration(dlState?.value, minDur, maxDur) : 3;
      const ulDur = col.ap ? calcFlowDuration(ulState?.value, minDur, maxDur) : 3;
      const wired = col.ap ? (col.switch ? true : isBackhaulWired(hass, col.ap)) : true;

      const homelabHidesLine = !!((col.isHomelab && col.switch.show_devices_line === false) || (col.homelab && col.homelab.show_devices_line === false));
      const devEntity = homelabHidesLine
        ? null
        : (col.ownLineOf
            ? col.ownLineOf.entities?.connected_devices
            : col.subSwitch
            ? col.subSwitch.entities.connected_devices
            : col.homelab
            ? col.homelab.entities?.connected_devices
            : col.ap
            ? col.ap.entities.connected_devices
            : col.switch?.entities.connected_devices);
      const devState = devEntity ? getEntityState(hass, devEntity) : null;
      const nodeOffline = termInfo ? termInfo.offline : (routerOffline || switchOffline || apOfflineOwn || subSwitchOfflineOwn);
      const devOfflineOwn = !!devEntity && isEntityUnavailable(hass, devEntity);

      return {
        switchState,
        switchOffline,
        subSwitchState,
        subOffline,
        apState,
        apOffline,
        feederOffline,
        nodeOffline,
        homelabHidesLine,
        devEntity,
        devState,
        devOffline: nodeOffline || devOfflineOwn,
        devLineOffline: !nodeOffline && devOfflineOwn,
        hasBandwidth: !!(col.ap && (col.ap.entities.download || col.ap.entities.upload)),
        wired,
        dlState,
        ulState,
        dlDur,
        ulDur
      };
    });
    const columnLineInfo = columnViewModels;
    const columnDurations = columnViewModels.map((info) => Math.min(info.dlDur, info.ulDur));
    const columnWired = columnViewModels.map((info) => info.wired);

    // Initial fallback margin only - the real alignment is computed after
    // render from actual measured positions, see _alignBusLine().
    const fallbackLeft = this._busMarginLeft ?? 24;
    const fallbackRight = this._busMarginRight ?? 24;
    const busLineStyle = `background:${busLineColor}; margin-left:${fallbackLeft}px; margin-right:${fallbackRight}px;`;
    const fallbackShift = this._branchesShiftX ?? 0;
    const trunkFallbackLeft = this._trunkMarginLeft;
    const trunkDropStyle = trunkFallbackLeft != null
      ? `justify-self:start; margin-left:${trunkFallbackLeft}px;`
      : "";

    // Row 3 (the connecting line/stem from the bus down) always
    // reserves at least a small height, even with no Switch anywhere
    // on the bus - otherwise every column's drop from the bus-line
    // collapses to nothing, which looked inconsistent depending on
    // whether any node happened to have a Switch. Row 4 (the Switch
    // circle itself) still fully collapses when unused, since there's
    // nothing to show there without an actual Switch.
    const switchRowHeight = hasAnySwitch ? "auto auto" : "0px 0px";
    // Rows 4/5 hold a plain AP's circle AND a Fed Switch's circle -
    // both are gated into rendering by hasApRow above, so the row
    // height has to be gated by that same condition, not hasAnyAp
    // alone. A bus made entirely of Switch nodes with Fed Switches and
    // no Access Points anywhere has hasAnyAp === false but still
    // renders real content into these rows; sizing them 0px regardless
    // crushed that content into a collapsed row instead of reserving
    // space for it.
    const apRowHeight = hasApRow ? "auto auto" : "0px 0px";
    const devRowHeight = hasAnyDevices ? "auto auto" : "0px 0px";

    // Every column is at least as wide as the largest circle that
    // actually appears within the Node columns themselves - never the
    // Internet/Router/top-level Switch circles above the bus. Each
    // size only counts if that element type is actually present in
    // this diagram (e.g. Switch's circle_size is shared with the
    // top-level Switch above the bus, so it's excluded entirely unless
    // a Node-level Switch is actually part of this bus).
    const circleSizeCandidates = [];
    if (hasAnyAp) circleSizeCandidates.push(this._config.ap_circle_size ?? 72);
    if (hasAnySwitch) circleSizeCandidates.push(this._config.switch?.circle_size ?? 60);
    if (hasAnyNestedHomelab) circleSizeCandidates.push(this._config.homelab_circle_size ?? 60);
    if (hasAnyDevices) circleSizeCandidates.push(this._config.ap_devices_circle_size ?? 56);
    const maxCircleSize = circleSizeCandidates.length ? Math.max(...circleSizeCandidates) : 0;

    // ---- Tier renderers ------------------------------------------------
    // One connecting-line cell for a cell at tier t.
    const cellLine = (t, i, col, cell) => {
      const row = lineRow(t);
      const info = cellInfo.get(cell);
      const offline = info.offline;
      const parent = cell.parent;
      const cs = gridCol(cell);
      const dur = cell.kind === "ap" ? apLineInfo(cell.cfg).dur : 3;
      // Circles sit flush at the top of their row, so one that is smaller
      // than the tallest in that row (a 60px Switch beside a 72px AP) leaves
      // a gap beneath it. The line that continues below it reaches up by that
      // difference so it meets the circle instead of starting short of it.
      const parentRowMax = parent ? (parent.tier === 0 ? tier0RowMax : (tierRowMax[parent.tier] || 0)) : 0;
      const parentGap = parent ? Math.max(0, parentRowMax - kindSize(parent.kind)) : 0;
      const reachUp = parentGap > 0 ? `margin-top:-${parentGap}px; height:calc(100% + ${parentGap}px);` : "";
      const stemReach = parentGap > 0 ? `margin-top:-${parentGap}px; height:${12 + parentGap}px;` : "";

      if (parent && parent.childCount > 1) {
        // One of several children: a stem drops from the parent's
        // circle onto a shared mini bus, and every child hangs off it.
        // Each child draws its own stretch of that bus (centre to
        // centre, bridging the column gap to its neighbours), so a
        // child that spans several columns still lands on the bus at
        // its own centre.
        const first = cell.sibIndex === 0;
        const last = cell.sibIndex === cell.sibCount - 1;
        const edge = "calc(var(--nf-col-gap, 32px) / -2)";
        return b`
          ${first ? b`<div class="mini-bus-stem" style="grid-column:${gridCol(parent)}; grid-row:${row}; background:${busLineColor}; ${stemReach}"></div>` : null}
          <div class="ap-col-line ap-col-line-grouped" style="grid-column:${cs}; grid-row:${row};">
            <div class="tier-seg" style="left:${first ? "50%" : edge}; right:${last ? "50%" : edge}; background:${busLineColor};"></div>
            ${offline
              ? this._renderXOnlyVerticalStretch()
              : cell.kind === "clientsline"
              ? b`<div class="ap-col-fillline" style="background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px);"></div>`
              : this._verticalPassThroughLine(busLineColor, dur, animate)}
          </div>
        `;
      }

      if (parent) {
        // Only child of its Switch: one straight, solid line.
        if (cell.kind === "ap") {
          // (An Access Point under a Switch always needs its line to that
          // Switch - the "no router, single column" case that hides a plain
          // AP's own line only ever applies to an AP straight off the bus.)
          return b`
            <div class="ap-col-line" style="grid-column:${cs}; grid-row:${row}; ${reachUp}">
              ${offline
                ? this._renderXOnlyVerticalStretch()
                : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
            </div>
          `;
        }
        return b`
          <div class="ap-col-line" style="grid-column:${cs}; grid-row:${row}; ${reachUp}">
            ${offline ? this._renderXOnlyVerticalStretch() : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
          </div>
        `;
      }

      // A plain Access Point straight off the bus: its own line, carrying
      // bandwidth strands and a wired/wireless backhaul marker.
      const line = apLineInfo(cell.cfg);
      return b`
        <div class="ap-col-line ${!hasAnySwitch ? "bus-top-connector" : ""}" style="grid-column:${cs}; grid-row:${row};">
          ${hideApOwnLine
            ? null
            : offline
            ? this._renderXOnlyVerticalStretch()
            : line.hasBandwidth
            ? this._bandwidthLine(busLineColor, busLineColor, line.dlDur, line.ulDur, line.hasDl, line.hasUl, animate, "100%", !line.wired)
            : this._verticalSingleLine(busLineColor, line.dlDur, animate, "100%", !line.wired)}
          ${!hideApOwnLine && !offline
            ? this._backhaulBadge(cell.cfg, hass)
            : null}
        </div>
      `;
    };

    // What a column shows in a tier BELOW its own terminal element - the
    // line carrying on down toward its Connected Clients circle and/or the
    // Clients box, or nothing when there is nothing down there.
    const belowLine = (t, i, col) => {
      const vm = columnViewModels[i];
      const row = lineRow(t);
      const hasDownstream = !!vm.devEntity || (hasIndividualDevices && !vm.homelabHidesLine);
      if (col.termTier === 0) {
        // Switch-only / Homelab column.
        let fillStyle = "";
        if (t === 1) {
          // Row 4 is one shared row across the whole bus - a Homelab node
          // can have its own circle size, so a smaller circle needs its
          // line stretched up to meet it.
          const rowMax = Math.max(swSizeCfg, this._config.homelab_circle_size ?? 60);
          const own = col.isHomelab ? (this._config.homelab_circle_size ?? 60) : swSizeCfg;
          const gap = Math.max(0, rowMax - own);
          fillStyle = gap > 0 ? `margin-top:-${gap}px; height:calc(100% + ${gap}px);` : "";
        }
        if (!hasDownstream) {
          return b`<div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${row};"></div>`;
        }
        return b`
          <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${row}; ${fillStyle}">
            ${vm.feederOffline ? null : this._verticalPassThroughLine(busLineColor, columnDurations[i], false)}
          </div>
        `;
      }
      if (!hasDownstream || vm.nodeOffline) return null;
      // The first row below a circle can sit under a taller circle in the
      // same row; stretch the line up so it still meets its own circle.
      const own = col.ap ? apSizeCfg : col.homelab ? hlSizeCfg : swSizeCfg;
      const gap = !col.ownLineOf && t === col.termTier + 1 ? Math.max(0, (tierRowMax[col.termTier] || own) - own) : 0;
      const fillStyle = gap > 0 ? `margin-top:-${gap}px; height:calc(100% + ${gap}px);` : "";
      return b`
        <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${row};">
          <div class="ap-col-fillline" style="${col.ap || col.ownLineOf
            ? `background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px);`
            : `background:${busLineColor};`} ${fillStyle}"></div>
        </div>
      `;
    };

    const belowCircleRow = (t, i, col) => {
      const vm = columnViewModels[i];
      const row = circleRow(t);
      const hasDownstream = !!vm.devEntity || (hasIndividualDevices && !vm.homelabHidesLine);
      if (col.termTier === 0) {
        if (vm.feederOffline || !hasDownstream) {
          return b`<div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${row};"></div>`;
        }
        return b`
          <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${row};">
            ${this._verticalPassThroughLine(busLineColor, columnDurations[i], false)}
          </div>
        `;
      }
      if (!hasDownstream || vm.nodeOffline) return null;
      return b`
        <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${row};">
          <div class="ap-col-fillline" style="${col.ap || col.ownLineOf
            ? `background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px);`
            : `background:${busLineColor};`}"></div>
        </div>
      `;
    };

    // A fed switch's circle. It spans every column beneath it, so a
    // switch feeding several devices sits centred over all of them.
    const fedCircle = (t, i, col, cell) => {
      const info = cellInfo.get(cell);
      const subOffline = info.offline;
      const sw = cell.cfg;
      const subIconSize = this._config.switch?.icon_size ?? 22;
      const subColor = subOffline
        ? sw.colors?.offline_circle || "var(--error-color)"
        : sw.colors?.circle;
      const subIconColor = subOffline
        ? sw.colors?.offline_icon || "var(--error-color)"
        : sw.colors?.icon;
      const subLabel = getCircleLabel(sw.name, info.state, "Switch");
      return b`
        <div
          class="circle-wrap ap-col-circle"
          style="width:${swSizeCfg}px; height:${swSizeCfg}px; grid-column:${gridCol(cell)}; grid-row:${circleRow(t)}; opacity:${subOffline ? 0.6 : 1};"
          @click=${() => this._handleMoreInfo(sw.entity)} data-nfc-e=${this._flatDetailsOn() ? sw.entity : Symbol.for('lit-nothing')}
        >
          <div class="circle ${subOffline ? "circle-pulse" : ""}" style="border-color:${subColor}; --pulse-color:${subColor};">
            ${renderIcon(subOffline ? "mdi:exclamation-thick" : (sw.icon || "mdi:switch"), `color:${subIconColor};--mdc-icon-size:${subIconSize}px`, subOffline ? "icon-pulse" : "")}
            <span class="circle-value">${subLabel}</span>
          </div>
          ${this._renderNodeIpBadge(hass, sw, "above")}
          ${(() => {
            const swStacks = computeBadgeStacks([
              { key: "poe", location: sw.poe?.location, visible: computePoeTotal(hass, sw.entity, sw.poe) != null },
              this._monitorBadgeStackItem(monitorDeviceKey(sw))
            ]);
            return b`
              ${this._renderPoeBadge(hass, sw.entity, sw.poe, swStacks.poe || 0)}
              ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(sw), swStacks.monitor || 0)}
            `;
          })()}
        </div>
      `;
    };

    // A Homelab fed by a Switch: the same circle a Node-level Homelab
    // has (Containers/VMs, PoE and any Security badges targeted at it),
    // drawn in this tier's row.
    const homelabCircle = (t, i, col, cell) => {
      const info = cellInfo.get(cell);
      const offline = info.offline;
      const hl = cell.cfg;
      const color = offline ? hl.colors?.offline_circle || "var(--error-color)" : hl.colors?.circle;
      const iconColor = offline ? hl.colors?.offline_icon || "var(--error-color)" : hl.colors?.icon;
      const iconSize = this._config.homelab_icon_size ?? 22;
      const label = getCircleLabel(hl.name, info.state, "Server");
      return b`
        <div
          class="circle-wrap ap-col-circle"
          style="width:${hlSizeCfg}px; height:${hlSizeCfg}px; grid-column:${gridCol(cell)}; grid-row:${circleRow(t)}; opacity:${offline ? 0.6 : 1};"
          @click=${() => this._handleMoreInfo(hl.entity)} data-nfc-e=${this._flatDetailsOn() ? hl.entity : Symbol.for('lit-nothing')}
        >
          <div class="circle ${offline ? "circle-pulse" : ""}" style="border-color:${color}; --pulse-color:${color};">
            ${renderIcon(offline ? "mdi:exclamation-thick" : (hl.icon || "mdi:server"), `color:${iconColor};--mdc-icon-size:${iconSize}px`, offline ? "icon-pulse" : "")}
            <span class="circle-value">${label}</span>
          </div>
          ${this._renderHomelabBadges(hass, hl)}
        </div>
      `;
    };

    const apCircle = (t, i, col, cell) => {
          const ap = cell.cfg;
          const apInfo = cellInfo.get(cell);
          const apLabel = getCircleLabel(ap.name, apInfo.state, "AP");
          const apSize = this._config.ap_circle_size ?? 72;
          const apOffline = apInfo.offline;
          const apCircleColor = apOffline
            ? ap.colors.offline_circle || "var(--error-color)"
            : ap.colors.circle;
          const apIconColor = apOffline
            ? ap.colors.offline_icon || "var(--error-color)"
            : ap.colors.icon;
          return b`
            <div
              class="circle-wrap ap-col-circle"
              style="width:${apSize}px; height:${apSize}px; grid-column:${gridCol(cell)}; grid-row:${circleRow(t)}; opacity:${apOffline ? 0.6 : 1};"
              @click=${() => this._handleMoreInfo(ap.entity)} data-nfc-e=${this._flatDetailsOn() ? ap.entity : Symbol.for('lit-nothing')}
            >
              <div class="circle ${apOffline ? "circle-pulse" : ""}" style="border-color:${apCircleColor}; --pulse-color:${apCircleColor};">
                ${renderIcon(apOffline ? "mdi:exclamation-thick" : (ap.icon || "mdi:wifi"), `color:${apIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px`, apOffline ? "icon-pulse" : "")}
                <span class="circle-value">${apLabel}</span>
              </div>
              ${(() => {
                const poeVisible = computePoeTotal(hass, ap.entity, ap.poe) != null;
                if (!ap.is_primary) {
                  const apStacks = computeBadgeStacks([
                    { key: "poe", location: ap.poe?.location, visible: poeVisible },
                    this._monitorBadgeStackItem(monitorDeviceKey(ap))
                  ]);
                  return b`
                    ${this._renderPoeBadge(hass, ap.entity, ap.poe, apStacks.poe || 0)}
                    ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(ap), apStacks.monitor || 0)}
                    ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                  `;
                }
                const vpnVisible = this._config.vpn_target === "primary_ap" && !!this._config.vpn_entity;
                const fwVisible = this._config.firewall_target === "primary_ap" && !!this._config.firewall_entity;
                const dnsVisible = this._config.dns_target === "primary_ap" && !!this._config.dns_entity;
                const rpVisible = this._config.reverse_proxy_target === "primary_ap" && !!this._config.reverse_proxy_entity;
                const stacks = computeBadgeStacks([
                  { key: "primary", location: ap.primary_badge_location, visible: ap.show_primary_badge !== false },
                  { key: "poe", location: ap.poe?.location, visible: poeVisible },
                  this._monitorBadgeStackItem(monitorDeviceKey(ap)),
                  { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                  { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                  { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                  { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible }
                ]);
                return b`
                  ${this._renderPrimaryApBadge(ap, stacks.primary || 0)}
                  ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                  ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                  ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                  ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                  ${this._renderPoeBadge(hass, ap.entity, ap.poe, stacks.poe || 0)}
                  ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(ap), stacks.monitor || 0)}
                  ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                `;
              })()}
            </div>
          `;
    };

    // An Access Point's own line has no circle: in its circle row the dotted
    // line simply carries on down.
    const ownLineRow = (t, i, col) => {
      const vm = columnViewModels[i];
      if (vm.nodeOffline) return null;
      return b`
        <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:${circleRow(t)};">
          <div class="ap-col-fillline" style="background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px);"></div>
        </div>
      `;
    };

    const tierPasses = [];
    for (let t = 1; t < T; t++) {
      if (!hasApRow) break;
      tierPasses.push(columns.map((col, i) => {
        const cell = col.chain?.[t];
        if (cell) return cell.firstCol === col ? cellLine(t, i, col, cell) : null;
        return t > col.termTier ? belowLine(t, i, col) : null;
      }));
      tierPasses.push(columns.map((col, i) => {
        const cell = col.chain?.[t];
        if (cell) {
          if (cell.firstCol !== col) return null;
          return cell.kind === "ap"
            ? apCircle(t, i, col, cell)
            : cell.kind === "homelab"
            ? homelabCircle(t, i, col, cell)
            : cell.kind === "clientsline"
            ? ownLineRow(t, i, col)
            : fedCircle(t, i, col, cell);
        }
        return t > col.termTier ? belowCircleRow(t, i, col) : null;
      }));
    }

    return b`
      <div
        class="branches ${hasIndividualDevices ? "with-dev-connectors" : ""}"
        style="grid-template-columns:repeat(${totalCols}, minmax(${maxCircleSize}px, max-content)); grid-template-rows:${collapseTbar ? '0px' : (routerEnabled ? '26px' : '0px')} ${collapseTbar ? '0px' : '2px'} ${switchRowHeight} ${apRowHeight} ${extraTierRows}${devRowHeight} 24px; column-gap:${this._config.ap_column_gap ?? 32}px; --nf-col-gap:${this._config.ap_column_gap ?? 32}px; transform:translateX(${fallbackShift}px);"
      >
        ${collapseTbar
          ? null
          : !routerEnabled
          ? b`
              <div class="bus-line" style="${busLineStyle}"></div>
            `
          : routerOffline
          ? b`
              <div class="trunk-drop" style="${trunkDropStyle} display:flex; justify-content:center; align-items:center;">
                <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                  ${renderIcon("mdi:close")}
                </div>
              </div>
              <div class="bus-line" style="${busLineStyle}"></div>
            `
          : b`
              <div class="trunk-drop" style="${trunkDropStyle} background:${busLineColor};"></div>
              <div class="bus-line" style="${busLineStyle}"></div>
            `}

        ${!hasAnySwitch ? null : columns.map((col, i) => {
          if (!col.switch) {
            // A plain Access Point off the bus - with devices beneath it,
            // its connector spans them all and is drawn once.
            if (!col.topStart) return null;
            const topAp = apLineInfo(col.chain[1].cfg);
            const topOffline = routerOffline || (columnViewModels[i].apOffline ?? columnViewModels[i].feederOffline);
            return b`
              <div class="ap-col-line bus-top-connector" style="grid-column:${topGridCol(col, i)}; grid-row:3;${topOffline ? " display:flex; justify-content:center; align-items:center;" : ""}">
                ${hideApOwnLine
                  ? null
                  : topOffline
                  ? b`
                      <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                        ${renderIcon("mdi:close")}
                      </div>
                    `
                  : topAp.hasBandwidth
                  ? this._bandwidthLine(busLineColor, busLineColor, topAp.dlDur, topAp.ulDur, topAp.hasDl, topAp.hasUl, animate, "100%", !topAp.wired)
                  : this._verticalPassThroughLine(busLineColor, topAp.dur, animate, !topAp.wired)}
              </div>
            `;
          }
          if (!col.switchGroupStart) return null;
          const colSpan = col.switchGroupSize;
          const swOffline = columnViewModels[i].switchOffline;
          const swColor = swOffline
            ? col.switch.colors?.offline_circle || "var(--error-color)"
            : col.switch.colors?.circle;
          const swIconColor = swOffline
            ? col.switch.colors?.offline_icon || "var(--error-color)"
            : col.switch.colors?.icon;
          const swSize = col.isHomelab ? (this._config.homelab_circle_size ?? 60) : (this._config.switch?.circle_size ?? 60);
          const swIconSize = col.isHomelab ? (this._config.homelab_icon_size ?? 22) : (this._config.switch?.icon_size ?? 22);
          const defaultIcon = col.isHomelab ? "mdi:server" : "mdi:switch";
          const defaultLabel = col.isHomelab ? "Server" : "Switch";
          const swLabel = getCircleLabel(col.switch.name, columnViewModels[i].switchState, defaultLabel);
          return b`
            <div class="ap-col-line bus-top-connector" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:3;${(routerOffline || swOffline) ? " display:flex; justify-content:center; align-items:center;" : ""}">
              ${routerOffline || swOffline
                ? b`
                    <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                      ${renderIcon("mdi:close")}
                    </div>
                  `
                : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
            </div>
            <div
              class="circle-wrap ap-col-circle"
              style="width:${swSize}px; height:${swSize}px; grid-column:${apCol(i)} / span ${colSpan}; grid-row:4; opacity:${(swOffline || routerOffline) ? 0.6 : 1};"
              @click=${() => this._handleMoreInfo(col.switch.entity)} data-nfc-e=${this._flatDetailsOn() ? col.switch.entity : Symbol.for('lit-nothing')}
            >
              <div class="circle ${(swOffline || routerOffline) ? "circle-pulse" : ""}" style="border-color:${swColor}; --pulse-color:${swColor};">
                ${renderIcon((swOffline || routerOffline) ? "mdi:exclamation-thick" : (col.switch.icon || defaultIcon), `color:${swIconColor};--mdc-icon-size:${swIconSize}px`, (swOffline || routerOffline) ? "icon-pulse" : "")}
                <span class="circle-value">${swLabel}</span>
              </div>
              ${(() => {
                if (!col.isHomelab) {
                  const nsStacks = computeBadgeStacks([
                    { key: "poe", location: col.switch.poe?.location, visible: computePoeTotal(hass, col.switch.entity, col.switch.poe) != null },
                    this._monitorBadgeStackItem(monitorDeviceKey(col.switch))
                  ]);
                  return b`
                    ${this._renderNodeIpBadge(hass, col.switch, "above")}
                    ${this._renderPoeBadge(hass, col.switch.entity, col.switch.poe, nsStacks.poe || 0)}
                    ${this._renderMonitorDeviceBadge(hass, monitorDeviceKey(col.switch), nsStacks.monitor || 0)}
                  `;
                }
                return this._renderHomelabBadges(hass, col.switch);
              })()}
            </div>
          `;
        })}
        ${!hasAnySwitch ? null : columns.map((col, i) => {
          if (col.switch || !col.topStart) return null;
          // Columns with no switch still need a pass-through line at
          // the switch-circle row, so the vertical connection from bus
          // to AP stays unbroken.
          const topAp = apLineInfo(col.chain[1].cfg);
          const passOffline = routerOffline || (columnViewModels[i].apOffline ?? columnViewModels[i].feederOffline);
          return b`
            <div class="ap-col-line" style="grid-column:${topGridCol(col, i)}; grid-row:4;${passOffline ? " display:flex; justify-content:center; align-items:center;" : ""}">
              ${passOffline
                ? b`
                    <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                      ${renderIcon("mdi:close")}
                    </div>
                  `
                : topAp.hasBandwidth
                ? this._bandwidthLine(busLineColor, busLineColor, topAp.dlDur, topAp.ulDur, topAp.hasDl, topAp.hasUl, animate, "100%", !topAp.wired)
                : this._verticalPassThroughLine(busLineColor, topAp.dur, animate, !topAp.wired)}
            </div>
          `;
        })}

        ${tierPasses}
        ${!hasAnyDevices ? null : columns.map((col, i) => {
          const vm = columnViewModels[i];
          vm.nodeOffline;
          const homelabHidesLine = vm.homelabHidesLine;
          const devEntity = vm.devEntity;
          const isSwitchDevices = !(col.ap || col.ownLineOf);
          const devLineOffline = vm.devOffline;
          // Row 6 (the AP/fed-Switch circle row) auto-sizes to the
          // TALLEST circle actually present there - if an AP and a fed
          // Switch share that row and their configured sizes differ
          // (e.g. the default 72px AP vs 60px Switch), the smaller
          // circle sits flush at the top of a taller cell, leaving
          // empty space below it before this row's line even starts.
          // Stretching the line upward by that same gap (via a
          // negative margin) closes it, rather than leaving a visible
          // break between the smaller circle and its own devices line.
          const rowMaxSize = tierRowMax[T - 1] || 0;
          const ownRowSize = col.termTier !== T - 1
            ? null
            : col.subSwitch
            ? swSizeCfg
            : col.homelab
            ? hlSizeCfg
            : col.ap
            ? apSizeCfg
            : null;
          const gapFill = ownRowSize != null ? Math.max(0, rowMaxSize - ownRowSize) : 0;
          const fillLineStyle = gapFill > 0 ? `margin-top:-${gapFill}px; height:calc(100% + ${gapFill}px);` : "";
          return b`
            <div class="ap-col-devline" style="grid-column:${apCol(i)}; grid-row:${devLineRow}; ${devLineOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}">
              ${devLineOffline && (devEntity || (hasIndividualDevices && !homelabHidesLine))
                ? b`
                    <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                      ${renderIcon("mdi:close")}
                    </div>
                  `
                : !devLineOffline && (devEntity || (hasIndividualDevices && !homelabHidesLine))
                ? isSwitchDevices
                  ? b`<div class="ap-col-fillline" style="background:${busLineColor}; ${fillLineStyle}"></div>`
                  : b`<div
                      class="ap-col-fillline"
                      style="background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px); ${fillLineStyle}"
                    ></div>`
                : null}
            </div>
          `;
        })}
        ${!hasAnyDevices ? null : columns.map((col, i) => {
          const vm = columnViewModels[i];
          const feederOffline = vm.nodeOffline;
          const homelabHidesLine = vm.homelabHidesLine;
          const devEntity = vm.devEntity;
          const devColorSource = col.ownLineOf ? col.ownLineOf.colors : col.subSwitch ? col.subSwitch.colors : col.homelab ? col.homelab.colors : col.ap ? col.ap.colors : col.switch?.colors;
          const devIcon = col.ownLineOf ? col.ownLineOf.devices_icon : col.subSwitch ? col.subSwitch.devices_icon : col.homelab ? col.homelab.devices_icon : col.ap ? col.ap.devices_icon : col.switch?.devices_icon;
          const devCircleSize = this._config.ap_devices_circle_size ?? 56;
          const devIconSize = this._config.ap_devices_icon_size ?? 20;
          const devOffline = vm.devOffline;
          if (devEntity && !feederOffline) {
            const devState = vm.devState;
            const devCircleColor = devOffline
              ? devColorSource?.devices_offline_circle || "var(--error-color)"
              : devColorSource?.devices_circle;
            const devIconColor = devOffline
              ? devColorSource?.devices_offline_icon || "var(--error-color)"
              : devColorSource?.devices_icon;
            return b`
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${apCol(i)}; grid-row:${devCircleRow}; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() => this._handleMoreInfo(devEntity)} data-nfc-e=${this._flatDetailsOn() ? devEntity : Symbol.for('lit-nothing')}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    ${renderIcon(devOffline ? "mdi:exclamation-thick" : (devIcon || "mdi:devices"), `color:${devIconColor};--mdc-icon-size:${devIconSize}px`, devOffline ? "icon-pulse" : "")}
                    <span class="circle-value">
                      ${devState ? roundVal(devState.value) : "-"}
                    </span>
                  </div>
                </div>
              `;
          }
          return hasIndividualDevices && !feederOffline && !homelabHidesLine
            ? b`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${apCol(i)}; grid-row:${devCircleRow}; ${devOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}"
              >
                ${devOffline
                  ? b`
                      <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                        ${renderIcon("mdi:close")}
                      </div>
                    `
                  : !(col.ap || col.ownLineOf)
                  ? b`<div class="ap-col-fillline" style="background:${busLineColor}"></div>`
                  : b`
                      <div
                        class="ap-col-fillline"
                        style="background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px)"
                      ></div>
                    `}
              </div>`
            : b`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${apCol(i)}; grid-row:${devCircleRow};"
              ></div>`;
        })}
        ${hasIndividualDevices
          ? columns.map((col, i) => {
              const vm = columnViewModels[i];
              const feederOffline = vm.nodeOffline;
              const homelabHidesLine = vm.homelabHidesLine;
              vm.devEntity;
              const devLineOffline = vm.devLineOffline;
              const isSwitchFed = !(col.ap || col.ownLineOf);
              if (homelabHidesLine) {
                return b`<div class="ap-col-devconnector" style="grid-column:${apCol(i)}; grid-row:${devConnectorRow};"></div>`;
              }
              return b`
                <div class="ap-col-devconnector" style="grid-column:${apCol(i)}; grid-row:${devConnectorRow}; ${(devLineOffline || feederOffline) ? 'display:flex; justify-content:center; align-items:center;' : ''}">
                  ${feederOffline
                    ? null
                    : devLineOffline
                    ? b`
                        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                          ${renderIcon("mdi:close")}
                        </div>
                      `
                    : isSwitchFed
                    ? b`<div class="dev-dotted-line" style="background:${individualDevicesLineColor}"></div>`
                    : b`
                        <div
                          class="dev-dotted-line"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      `}
                </div>
              `;
            })
          : null}

        ${showPrimaryExtraCol
          ? (() => {
              if (routerOffline) {
                return null;
              }
              if (!primaryHasDevices) {
                return hasIndividualDevices
                  ? b`
                      <div
                        class="ap-col-fillline-wrap"
                        style="grid-column:${extraCol}; grid-row:3 / ${devConnectorRow}; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                      >
                        <div
                          class="ap-col-fillline"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol}; grid-row:${devConnectorRow};"
                      >
                        <div
                          class="dev-dotted-line"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                    `
                  : null;
              }
              const devOffline = routerOffline || isEntityUnavailable(hass, primaryApItem.ap.entities.connected_devices);
              const devCircleSize = this._config.ap_devices_circle_size ?? 56;
              const devCircleColor = devOffline
                ? primaryApItem.ap.colors.devices_offline_circle || "var(--error-color)"
                : primaryApItem.ap.colors.devices_circle;
              const devIconColor = devOffline
                ? primaryApItem.ap.colors.devices_offline_icon || "var(--error-color)"
                : primaryApItem.ap.colors.devices_icon;
              return b`
                <div
                  class="ap-col-fillline-wrap"
                  style="grid-column:${extraCol}; grid-row:3 / ${devCircleRow}; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                >
                  <div
                    class="ap-col-fillline"
                    style="background-image:repeating-linear-gradient(to bottom, ${this._config.flow_line_color || 'var(--divider-color, #ccc)'} 0px, ${this._config.flow_line_color || 'var(--divider-color, #ccc)'} 2px, transparent 2px, transparent 6px)"
                  ></div>
                </div>
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${extraCol}; grid-row:${devCircleRow}; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() =>
                    this._handleMoreInfo(primaryApItem.ap.entities.connected_devices)} data-nfc-e=${this._flatDetailsOn() ? primaryApItem.ap.entities.connected_devices : Symbol.for('lit-nothing')}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    ${renderIcon(devOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.devices_icon || "mdi:devices"), `color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px`, devOffline ? "icon-pulse" : "")}
                    <span class="circle-value">
                      ${primaryApItem.devicesState ? roundVal(primaryApItem.devicesState.value) : "-"}
                    </span>
                  </div>
                </div>
                ${hasIndividualDevices
                  ? b`
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol}; grid-row:${devConnectorRow};"
                      >
                        <div
                          class="dev-dotted-line"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                    `
                  : null}
              `;
            })()
          : null}
      </div>
    `;
  }

  static get styles() {
    return i$3`
      :host {
        font-family: var(
          --ha-font-family-body,
          var(--paper-font-body1_-_font-family, var(--primary-font-family, sans-serif))
        );
      }
      /* Animation is a master opt-in. This catches every CSS animation
         in the card (including offline/status flashes), while flow dots are
         omitted from the DOM entirely when the switch is disabled. */
      :host([animations-disabled]) *,
      :host([animations-disabled]) *::before,
      :host([animations-disabled]) *::after {
        animation: none !important;
      }
      /* Keep the last visual frame but stop compositor work while the card
         is outside the active viewport/dashboard. */
      :host([data-offscreen]) *,
      :host([data-offscreen]) *::before,
      :host([data-offscreen]) *::after {
        animation-play-state: paused !important;
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation: none !important;
        }
      }
      ha-card {
        overflow: hidden;
        font-family: inherit;
        color: var(--primary-text-color);
        isolation: isolate;
      }
      .card-header {
        padding: 12px 16px 0 16px;
        font-size: 1.1rem;
        font-family: inherit;
      }
      .card-content {
        padding: 16px 12px;
        font-family: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .flow-main-layout {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      .flow-main-layout.pos-top,
      .flow-main-layout.pos-bottom {
        flex-direction: column;
      }
      .flow-main-layout.pos-left,
      .flow-main-layout.pos-right {
        flex-direction: column;
      }
      .flow-main-layout.pos-left .flow-diagram,
      .flow-main-layout.pos-right .flow-diagram {
        padding: 0 130px;
        box-sizing: border-box;
      }

      .flow-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .trunk {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .internet-row {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .circle-wrap {
        position: relative;
        z-index: 2;
        flex-shrink: 0;
      }

      /* Secondary (backup) Internet: two circles side by side, joined by
         a T-bar (or dropping straight onto the Nodes bus-line). */
      .internet-row-dual {
        width: auto;
        align-items: flex-end;
        justify-content: center;
      }
      .inet-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .inet-tbar {
        position: relative;
        height: 2px;
        flex-shrink: 0;
        opacity: 0.9;
      }
      .inet-tbar-seg {
        position: absolute;
        top: 0;
        height: 2px;
      }

      .circle {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid var(--divider-color, #e1e1e1);
        background: var(--primary-background-color, #fafafa);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        cursor: pointer;
        overflow: hidden;
      }
      .circle ha-icon,
      .circle ha-svg-icon {
        --mdc-icon-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host([compact-mode]) .circle-value,
      :host([hide-names]) .circle-value,
      :host([hide-names]) .individual-device-name {
        display: none;
      }
      .circle-value {
        font-size: 10px;
        font-weight: 400;
        color: var(--primary-text-color);
        line-height: 1;
        max-width: calc(100% - 8px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .individual-device-name {
        position: absolute;
        top: calc(100% + 3px);
        left: 50%;
        transform: translateX(-50%);
        font-size: 9px;
        line-height: 1.15;
        color: var(--secondary-text-color);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 64px;
        pointer-events: none;
      }
      .ring-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .ring-svg circle[stroke-dasharray] {
        pointer-events: auto;
        cursor: pointer;
      }

      .lan-branch {
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .lan-branch.flip-left {
        left: auto;
        right: 100%;
        flex-direction: row-reverse;
      }
      .hline-single {
        position: relative;
        height: 8px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hline {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
        opacity: 0.9;
      }
      .lan-branch .circle-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .router-anchor .circle {
        position: relative;
        z-index: 2;
      }
      .router-anchor .lan-branch {
        z-index: 1;
      }

      .vline-pair {
        position: relative;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .offline-x-mid {
        position: relative;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      .offline-x-mid ha-icon,
      .offline-x-mid ha-svg-icon {
        --mdc-icon-size: 16px;
      }
      .vline-single {
        position: relative;
        width: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vline {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
        opacity: 0.9;
      }
      .vline-offline {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
        opacity: 0.9;
      }
      .hline-offline {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
        opacity: 0.9;
      }
      /* Flow dots move a full-size zero-width/zero-height track rather
         than animating top/left on the dot itself. Transform animation is
         compositor-friendly and avoids layout work every animation frame. */
      .flow-dot-track {
        position: absolute;
        pointer-events: none;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .flow-dot-track-y {
        top: 0;
        bottom: 0;
        width: 0;
      }
      .flow-dot-track-x {
        left: 0;
        right: 0;
        height: 0;
      }
      .flow-dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        margin-top: -3px;
        border-radius: 50%;
        opacity: 0.95;
        pointer-events: none;
      }
      @keyframes nf-dot-ttb {
        from { transform: translate3d(0, 0, 0); }
        to { transform: translate3d(0, 100%, 0); }
      }
      @keyframes nf-dot-btt {
        from { transform: translate3d(0, 100%, 0); }
        to { transform: translate3d(0, 0, 0); }
      }
      @keyframes nf-dot-ltr {
        from { transform: translate3d(0, 0, 0); }
        to { transform: translate3d(100%, 0, 0); }
      }
      @keyframes nf-dot-rtl {
        from { transform: translate3d(100%, 0, 0); }
        to { transform: translate3d(0, 0, 0); }
      }
      @keyframes nf-pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.15); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes nf-vpn-flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.15; }
      }
      .vpn-badge-flash {
        animation: nf-vpn-flash 1.8s ease-in-out infinite;
      }
      .firewall-badge-flash {
        animation: nf-vpn-flash 1.8s ease-in-out infinite;
      }
      .poe-badge-flash {
        animation: nf-vpn-flash 1.8s ease-in-out infinite;
      }
      /* Monitored-service state badge. A down badge flashes; being an ordinary
         animation, the blanket :host([animations-disabled]) rule above turns
         it off with Layout > Sizing and Animations > Enable Animations, like every other one. */
      .monitor-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .monitor-badge ha-icon,
      .monitor-badge ha-svg-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @keyframes nf-monitor-flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.15; }
      }
      .monitor-badge-flash {
        animation: nf-monitor-flash 1.2s ease-in-out infinite;
      }
      .guest-badge {
        position: absolute;
        top: 15%;
        right: 8%;
        transform: translate(50%, -50%);
        border-radius: 50%;
        padding: 2px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
      }
      .icon-pulse {
        animation: nf-pulse 2.4s ease-in-out infinite;
      }
      .offline-x-pulse {
        animation: nf-pulse 2.4s ease-in-out infinite;
      }
      @keyframes nf-pulse-ring {
        0% { box-shadow: 0 0 0 0 var(--pulse-color, currentColor); }
        70% { box-shadow: 0 0 0 6px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
      }
      .circle-pulse {
        animation: nf-pulse-ring 2.4s ease-out infinite;
      }

      .branches {
        display: grid;
        grid-template-rows: 26px 2px auto auto auto auto 24px;
        column-gap: 32px;
        row-gap: 0;
        justify-content: center;
      }
      .trunk-drop {
        grid-column: 1 / -1;
        grid-row: 1;
        width: 2px;
        height: 100%;
        margin-top: 0px;
        justify-self: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bus-line {
        grid-column: 1 / -1;
        grid-row: 2;
        height: 2px;
      }
      .ap-col-line {
        display: flex;
        justify-content: center;
        align-items: stretch;
        position: relative;
        width: 100%;
        box-sizing: border-box;
      }
      .ap-col-line-grouped {
        align-items: stretch;
        padding-top: 14px;
        box-sizing: border-box;
      }
      .mini-bus-line {
        align-self: start;
        height: 2px;
        margin-top: 12px;
      }
      .mini-bus-stem {
        align-self: start;
        justify-self: center;
        width: 2px;
        height: 12px;
      }
      /* One child's stretch of a switch's mini bus. Positioned inside the
         child's own drop cell, so it always lines up with that child's
         centre however many columns the child spans. */
      .tier-seg {
        position: absolute;
        top: 12px;
        height: 2px;
        pointer-events: none;
      }
      .backhaul-icon-mid {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }
      .primary-ap-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .vpn-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .firewall-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .poe-badge {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .ap-col-circle {
        justify-self: center;
      }
      /* Icon-bearing badges (guest, primary AP, VPN, firewall, and now
         PoE's own class since the DNS badge - which reuses .poe-badge
         for its pill shape - carries an icon too) need the same
         explicit centering rule applied directly to the ha-icon
         element that .circle ha-icon already gets - the parent's own
         flex centering isn't enough on its own, since ha-icon's
         internal rendering otherwise leaves it sitting slightly low. */
      .guest-badge ha-icon,
      .guest-badge ha-svg-icon,
      .primary-ap-badge ha-icon,
      .primary-ap-badge ha-svg-icon,
      .vpn-badge ha-icon,
      .vpn-badge ha-svg-icon,
      .firewall-badge ha-icon,
      .firewall-badge ha-svg-icon,
      .poe-badge ha-icon,
      .poe-badge ha-svg-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ap-col-devline {
        display: flex;
        justify-content: center;
        height: 24px;
      }
      .ap-col-devcircle {
        justify-self: center;
      }
      .ap-col-devcircle-spacer {
        display: flex;
        justify-content: center;
      }
      .ap-col-fillline {
        width: 2px;
        height: 100%;
        opacity: 0.9;
      }
      .ap-col-devconnector {
        display: flex;
        justify-content: center;
        height: 24px;
      }
      .ap-col-devconnector.single {
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .diagram-scale-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .diagram-scale-hscroll {
        display: block;
        overflow-x: auto;
      }
      .dev-dotted-line {
        width: 2px;
        height: 100%;
        opacity: 0.9;
      }
      /* External box: the Clients box's look, above Internet, joined to it
         by dotted lines (two, spread over both circles, with a backup WAN). */
      .ext-monitor-container {
        margin-bottom: 0;
      }
      .ext-monitor-connector {
        display: flex;
        justify-content: space-between;
        height: 24px;
        max-width: 100%;
      }
      .flow-main-layout.pos-left .ext-monitor-container,
      .flow-main-layout.pos-right .ext-monitor-container {
        padding: 0 130px;
        box-sizing: border-box;
      }

      .dev-row-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0;
        width: 100%;
        box-sizing: border-box;
      }
      .individual-devices-box {
        position: relative;
        border: none;
        border-radius: 16px;
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        align-self: stretch;
      }
      .individual-devices-box-border {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .individual-devices-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
      }
      .individual-devices-groups {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        gap: 6px;
        width: 100%;
      }
      .individual-devices-groups.layout-last-fill {
        justify-content: flex-start;
      }
      .individual-devices-groups.layout-last-fill > .individual-device-group:last-child {
        flex: 1 1 auto;
      }
      .individual-device-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        box-sizing: border-box;
        flex: 0 1 auto;
      }
      .individual-device-group-label {
        font-size: 10px;
        font-weight: 400;
        color: var(--primary-text-color);
        line-height: 1;
        white-space: nowrap;
      }
      .individual-device-group-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
      }

      .flow-summary {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
      }
      .flow-summary.pos-top {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 24px;
        width: 100%;
      }
      .flow-summary.pos-bottom {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 20px;
        width: 100%;
      }

      .flow-summary.pos-left {
        position: absolute;
        left: 8px;
        right: auto;
        top: 16px;
        transform: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        margin: 0;
        white-space: nowrap;
      }
      .flow-summary.pos-left .summary-row {
        flex-direction: row;
      }

      .flow-summary.pos-right {
        position: absolute;
        right: 8px;
        left: auto;
        top: 16px;
        transform: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        margin: 0;
        white-space: nowrap;
      }
      .flow-summary.pos-right .summary-row {
        flex-direction: row;
      }

      .summary-row {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .summary-badge {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: none;
      }
      .summary-badge ha-icon,
      .summary-badge ha-svg-icon {
        --mdc-icon-size: 24px;
      }
      .summary-text {
        display: flex;
        flex-direction: column;
        line-height: 1.25;
      }
      .summary-primary {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .summary-secondary {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }

      /* --- Hyperbolic view (v4.0.0) --- */
      /* The wrapper sets the width; the stage is made square from it with
         the padding-bottom trick. (aspect-ratio proved unreliable on some
         phone WebViews - the stage came out taller than wide, which pushed
         nodes outside the circle drawn behind them.) */
      /* In a parent that centres or shrink-wraps its children (some dashboard
         layouts do) the card would shrink to its content; fill instead. */
      :host([hyperbolic]) {
        display: block;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }
      /* The Flat view's .card-content centres its children and lets them
         shrink to fit, which is right for a fixed-size diagram but collapsed
         this layout to about half the card in a wide panel. Fill the card. */
      .card-content.hyp-content {
        align-items: stretch;
        box-sizing: border-box;
        width: 100%;
      }
      .hyp-cols {
        width: 100%;
        box-sizing: border-box;
      }
      .hyp-stage-wrap {
        width: 100%;
        max-width: 560px;
        margin: 0 auto;
      }
      .hyp-tablet .hyp-stage-wrap {
        max-width: min(100%, 1400px);
      }
      /* "Fit to screen height" (the default) sizes the tree column in pixels
         from the measured screen height (see _hypMeasureFit), so the stage
         simply fills its column. */
      .hyp-tablet.hyp-fit .hyp-stage-wrap {
        max-width: none;
      }
      /* A wide screen with the details as a pop-up: the tree takes the card's width, but
         no taller than the screen allows (the measured side, when "fit to height" is on). */
      .hyp-wide .hyp-stage-wrap {
        max-width: min(100%, var(--hyp-wide-side, 1400px));
      }
      .hyp-stage {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        container-type: inline-size;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        cursor: grab;
        overflow: hidden;
      }
      /* The summary is a card like the details panel: the same default
         colours, each changeable in the editor. */
      .hyp-summary {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
        padding: 10px 12px;
        box-sizing: border-box;
        border: 1px solid var(--hyp-summary-outline, var(--hyp-details-outline, var(--divider-color, #ccc)));
        border-radius: var(--border-radius, var(--ha-card-border-radius, 12px));
        background: var(--hyp-summary-bg, var(--hyp-details-bg, var(--card-background-color, #fff)));
      }
      .hyp-summary.at-bottom {
        margin-bottom: 0;
        margin-top: 12px;
      }
      .hyp-sum-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--primary-text-color);
      }
      /* As many columns as fit at 140px each: two in a normal panel, one in a
         very narrow one, more in a wide one. */
      .hyp-sum-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px 12px;
      }
      .hyp-sum-grid .summary-row {
        min-width: 0;
      }
      .hyp-sum-grid .summary-text {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .hyp-cols {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 16px;
      }
      .hyp-col-tree {
        min-width: 0;
        box-sizing: border-box;
      }
      .hyp-col-side {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .hyp-col-side .hyp-summary {
        margin-bottom: 0;
      }
      .hyp-col-side .hyp-details {
        margin-top: 0;
      }
      .hyp-count {
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        letter-spacing: -0.02em;
      }
      .hyp-stage:active {
        cursor: grabbing;
      }
      .hyp-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      /* The nodes sit in their own layer, cut to the circle so that zooming
         in never lets them spill past the edge (46% = the circle's radius). */
      .hyp-nodes {
        position: absolute;
        inset: 0;
        z-index: 1;
        clip-path: circle(46% at 50% 50%);
        pointer-events: none;
      }
      .hyp-nodes > .hyp-node {
        pointer-events: auto;
      }
      /* the network layer is cut to the circle the same way as the nodes */
      .hyp-svg-content {
        clip-path: circle(46% at 50% 50%);
      }
      /* the edge is drawn again on top, so it stays crisp over whatever is clipped */
      .hyp-rim-ring {
        fill: none;
        stroke: var(--hyp-outline, var(--divider-color, #ccc));
        stroke-opacity: var(--hyp-outline-op, 1);
        stroke-width: 1.5px;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .hyp-rim {
        fill: var(--hyp-bg, var(--secondary-background-color, rgba(127, 127, 127, 0.1)));
        fill-opacity: var(--hyp-bg-op, 0.55);
        stroke: none;
      }
      .hyp-edge {
        fill: none;
        stroke-width: var(--hyp-ew, 0.005);
        stroke-linecap: round;
      }
      .hyp-edge.dashed {
        stroke-dasharray: var(--hyp-d5, 0.016) var(--hyp-d5, 0.016);
      }
      .hyp-edge.off {
        stroke-dasharray: var(--hyp-d2, 0.006) var(--hyp-d5, 0.016);
        opacity: 0.7;
      }
      .hyp-flow {
        fill: none;
        stroke-width: var(--hyp-fw, 0.008);
        stroke-linecap: round;
        stroke-dasharray: var(--hyp-d2, 0.006) var(--hyp-d14, 0.045);
        animation: hyp-flow-move linear infinite;
      }
      @keyframes hyp-flow-move {
        to {
          stroke-dashoffset: var(--hyp-doff, -0.05);
        }
      }
      .hyp-node {
        position: absolute;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: var(--bw, 2px) solid var(--c);
        /* an opaque card-coloured disc with the node's tint laid over it. (Mixing the tint
           into the card colour instead makes the disc see-through whenever --c is
           transparent - the Internet node while its quota ring is drawn - and the line
           running to it then shows through the circle.) */
        background-color: var(--card-background-color, #fff);
        background-image: linear-gradient(color-mix(in srgb, var(--c) 16%, transparent), color-mix(in srgb, var(--c) 16%, transparent));
        color: var(--ic);
        --mdc-icon-size: var(--is);
        cursor: pointer;
        outline: none;
      }
      .hyp-node.dashed {
        border-style: dashed;
      }
      /* The quota ring is drawn by the Flat view's own ring code; here a tap
         must only centre the node, so the ring never takes clicks. */
      .hyp-node .ring-svg,
      .hyp-node .ring-svg circle[stroke-dasharray] {
        pointer-events: none;
      }
      .hyp-node:focus-visible {
        box-shadow: 0 0 0 3px var(--primary-text-color);
      }
      .hyp-node.focus {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 30%, transparent);
      }
      .hyp-node.tiny {
        border-width: 1px;
      }
      .hyp-node.offline::after {
        content: "!";
        position: absolute;
        right: -8%;
        bottom: -8%;
        width: 36%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background: var(--error-color);
        color: #fff;
        font-size: 2.2cqw;
        font-weight: 700;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hyp-node.tiny.offline::after {
        display: none;
      }
      .hyp-node.pulse::after {
        animation: hyp-pulse 1.6s ease-in-out infinite;
      }
      @keyframes hyp-pulse {
        50% {
          transform: scale(1.3);
        }
      }
      .hyp-badges {
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: center center;
        pointer-events: none;
        z-index: 4;
      }
      .hyp-label {
        position: absolute;
        top: calc(100% + 0.6cqw);
        left: 50%;
        transform: translateX(-50%);
        max-width: 26cqw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: clamp(9px, 2.7cqw, 12px);
        line-height: 1.2;
        color: var(--primary-text-color);
        pointer-events: none;
        text-shadow: 0 0 3px var(--card-background-color, #fff), 0 0 3px var(--card-background-color, #fff);
      }
      .hyp-controls {
        position: absolute;
        top: 2%;
        left: 2%;
        z-index: 5000;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .hyp-btn {
        width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 50%;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      .hyp-btn:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .hyp-details {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 12px;
        padding: 10px 12px;
        box-sizing: border-box;
        border: 1px solid var(--hyp-details-outline, var(--divider-color, #ccc));
        border-radius: var(--border-radius, var(--ha-card-border-radius, 12px));
        background: var(--hyp-details-bg, var(--card-background-color, #fff));
      }
      .hyp-d-head {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px 12px;
      }
      .hyp-d-icon {
        position: relative;
        flex: none;
        width: 36px;
        height: 36px;
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--c);
        /* an opaque card-coloured disc with the node's tint laid over it. (Mixing the tint
           into the card colour instead makes the disc see-through whenever --c is
           transparent - the Internet node while its quota ring is drawn - and the line
           running to it then shows through the circle.) */
        background-color: var(--card-background-color, #fff);
        background-image: linear-gradient(color-mix(in srgb, var(--c) 16%, transparent), color-mix(in srgb, var(--c) 16%, transparent));
        color: var(--ic);
        box-shadow: var(--box-shadow, none);
      }
      .hyp-d-main {
        flex: 1 1 120px;
        min-width: 0;
      }
      .hyp-d-name {
        font-weight: 700;
        font-size: 0.95rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--primary-text-color);
      }
      .hyp-d-state {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .hyp-d-state.off {
        color: var(--error-color);
      }
      .hyp-d-btn {
        flex: none;
        padding: 6px 12px;
        border-radius: 999px;
        /* Filled with the icon colour of the node it describes, text in the card colour. */
        border: 1px solid var(--bc, var(--primary-color));
        background: var(--bc, var(--primary-color));
        color: var(--card-background-color, #fff);
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: var(--box-shadow, none);
      }
      .hyp-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        width: 100%;
      }
      .hyp-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
        font-size: 0.78rem;
        color: var(--primary-text-color);
      }
      .hyp-hint {
        margin-top: 6px;
        text-align: center;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }

      /* --- Glass style (iOS-like frosted look) --- */
      .hyp-glass-card {
        --ha-card-background: transparent;
        background: transparent;
      }
      .hyp-glass .hyp-stage::before,
      .hyp-glass .hyp-stage::after {
        content: "";
        position: absolute;
        inset: 4%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
      }
      .hyp-glass .hyp-stage::before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.12));
        -webkit-backdrop-filter: blur(var(--hyp-blur, 7px)) saturate(180%) brightness(1.08);
        backdrop-filter: blur(var(--hyp-blur, 7px)) saturate(180%) brightness(1.08);
        border: 1px solid rgba(255, 255, 255, 0.35);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.65), inset 0 -1px 2px rgba(255, 255, 255, 0.18), 0 4px 14px rgba(0, 0, 0, 0.16);
      }
      /* the specular highlight, top-left */
      .hyp-glass .hyp-stage::after {
        background: radial-gradient(120% 90% at 28% 8%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 42%);
      }
      /* the glass is the background: the flat fill only shows if a colour was chosen to tint it */
      .hyp-glass:not(.glass-tint) .hyp-rim {
        fill: none;
      }
      .hyp-glass .hyp-rim-ring {
        stroke: var(--hyp-outline, rgba(255, 255, 255, 0.45));
      }
      .hyp-glass .hyp-node {
        background: color-mix(in srgb, var(--c) 20%, transparent);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.55);
      }
      .hyp-glass .hyp-node.focus {
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.55), 0 0 0 3px color-mix(in srgb, var(--c) 30%, transparent);
      }
      .hyp-glass .hyp-details,
      .hyp-glass .hyp-btn {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
        -webkit-backdrop-filter: blur(var(--hyp-blur, 7px)) saturate(160%);
        backdrop-filter: blur(var(--hyp-blur, 7px)) saturate(160%);
        border-color: rgba(255, 255, 255, 0.35);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), 0 4px 14px rgba(0, 0, 0, 0.12);
      }
      /* In glass style the panel stays frosted unless a colour was chosen for it. */
      .hyp-glass .hyp-details {
        background: var(--hyp-details-bg, linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05)));
        border-color: var(--hyp-details-outline, rgba(255, 255, 255, 0.35));
      }
      .hyp-glass .hyp-chip {
        background: rgba(255, 255, 255, 0.14);
      }
      @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
        .hyp-glass .hyp-stage::before {
          background: rgba(255, 255, 255, 0.2);
        }
      }

      /* --- Tablet: the side column is as tall as the circle; the details panel fills what is left --- */
      .hyp-col-side > .hyp-details {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
      }
      .hyp-tablet .hyp-hint {
        margin-top: auto;
        padding-top: 4px;
      }

      /* --- Graphs in the details panel --- */
      .hyp-graphs {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .hyp-tablet .hyp-graphs {
        flex: 1 1 auto;
      }
      .hyp-graph {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-height: 0;
        flex: 0 0 auto;
      }
      /* Graphs share out spare height, but never get squeezed below what their
         heading, chart and axis need - if there is not room, the panel scrolls
         (Hyperbolic) or the row grows (Flat) rather than letting them overlap. */
      .hyp-tablet .hyp-graph {
        flex: 1 1 0;
        min-height: 132px;
      }
      .hyp-g-head {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .hyp-g-top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 4px 10px;
      }
      /* The timescale buttons: the chosen one is filled with the colour of the
         node being described, like the Details button. */
      .hyp-range {
        display: flex;
        gap: 1px;
        padding: 2px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
        box-shadow: var(--box-shadow, none);
      }
      .hyp-range button {
        margin: 0;
        padding: 2px 8px;
        border: 0;
        border-radius: 999px;
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        font-size: 0.68rem;
        line-height: 1.4;
        cursor: pointer;
      }
      .hyp-range button:hover {
        color: var(--primary-text-color);
      }
      .hyp-range button[aria-pressed="true"] {
        background: var(--hyp-accent, var(--primary-color));
        color: var(--card-background-color, #fff);
        font-weight: 700;
        box-shadow: var(--box-shadow, none);
      }
      .hyp-g-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--primary-text-color);
      }
      .hyp-g-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 2px 10px;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .hyp-g-key {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .hyp-g-key i,
      .hyp-tip-time + div i {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .hyp-g-key b {
        color: var(--primary-text-color);
        font-weight: 600;
      }
      .hyp-chart {
        position: relative;
        height: 100px;
        flex: 0 0 auto;
        touch-action: pan-y;
        cursor: crosshair;
        border-radius: 6px;
        background: color-mix(in srgb, var(--secondary-text-color) 7%, transparent);
      }
      .hyp-tablet .hyp-chart {
        flex: 1 1 auto;
        height: auto;
        min-height: 60px;
      }
      .hyp-chart.empty {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        cursor: default;
      }
      .hyp-chart svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 6px;
      }
      .hyp-grid {
        stroke: var(--divider-color, #ccc);
        stroke-width: 1px;
        stroke-dasharray: 3 4;
        vector-effect: non-scaling-stroke;
        opacity: 0.7;
      }
      .hyp-line {
        fill: none;
        stroke-width: 1.8px;
        stroke-linejoin: round;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
      }
      .hyp-area {
        opacity: 0.16;
        stroke: none;
      }
      .hyp-y {
        position: absolute;
        left: 5px;
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .hyp-y.top {
        top: 2px;
      }
      .hyp-y.bottom {
        bottom: 2px;
      }
      .hyp-g-axis {
        display: flex;
        justify-content: space-between;
        font-size: 0.65rem;
        color: var(--secondary-text-color);
      }
      .hyp-scrub {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .hyp-scrub[hidden] {
        display: none;
      }
      .hyp-scrub-line {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background: var(--primary-text-color);
        opacity: 0.55;
      }
      .hyp-scrub-tip {
        position: absolute;
        top: 4px;
        z-index: 2;
        padding: 3px 7px;
        border-radius: 8px;
        font-size: 0.7rem;
        line-height: 1.35;
        white-space: nowrap;
        color: var(--primary-text-color);
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #ccc);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      }
      .hyp-scrub-tip i {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 5px;
        border-radius: 50%;
      }
      .hyp-tip-time {
        font-weight: 700;
        margin-bottom: 1px;
      }

      /* --- Clients connected to the selected device --- */
      .hyp-clients {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 0 0 auto;
      }
      .hyp-cl-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 10px;
      }
      .hyp-cl-count {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      /* As many columns as fit at 160px each: two in a normal panel, one in a
         very narrow one, three or more in a wide one. */
      .hyp-cl-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 0 12px;
        max-height: 104px;
        overflow-y: auto;
      }
      .hyp-cl {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        margin: 0;
        padding: 3px 2px;
        border: 0;
        border-radius: 6px;
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 0.78rem;
        text-align: left;
        cursor: pointer;
      }
      .hyp-cl:hover,
      .hyp-cl:focus-visible {
        background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
        outline: none;
      }
      .hyp-cl span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .hyp-cl.off span {
        color: var(--secondary-text-color);
      }
      .hyp-cl-dot {
        flex: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      /* Glass style: the summary is frosted like the details panel, unless a colour was chosen for it. */
      .hyp-glass .hyp-summary {
        background: var(--hyp-summary-bg, var(--hyp-details-bg, linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))));
        border-color: var(--hyp-summary-outline, var(--hyp-details-outline, rgba(255, 255, 255, 0.35)));
        -webkit-backdrop-filter: blur(var(--hyp-blur, 7px)) saturate(160%);
        backdrop-filter: blur(var(--hyp-blur, 7px)) saturate(160%);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), 0 4px 14px rgba(0, 0, 0, 0.12);
      }

      /* --- Flat view with the details panel on --- */
      .hyp-flat .hyp-cols {
        align-items: stretch;
      }
      /* The diagram's own circles (and the ring round the selected one) reach
         past its box, so nothing here may clip them: no overflow:auto (that would
         clip the top too), a little room above, and sideways overflow clipped only
         where the browser can do that without touching the top. */
      .hyp-col-flat {
        overflow: visible;
        padding-top: 10px;
        box-sizing: border-box;
      }
      @supports (overflow-x: clip) {
        .hyp-col-flat {
          overflow-x: clip;
        }
      }
      .hyp-flat .hyp-flat-diagram {
        width: 100%;
      }
      /* The ring round the selected circle: one circle, in the colour of its own
         border (set by _flatMarkSelection). */
      .hyp-flat .circle.nfc-ring {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--nfc-ring, var(--primary-color)) 38%, transparent),
          0 0 12px 2px color-mix(in srgb, var(--nfc-ring, var(--primary-color)) 45%, transparent);
      }

      .hyp-flat .hyp-col-side > .hyp-details {
        min-height: auto;
        overflow-y: visible;
      }

      /* --- Client info (one client's details) --- */
      .hyp-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 0 0 auto;
      }
      .hyp-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 8px 14px;
      }
      .hyp-kv {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .hyp-k {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
      }
      .hyp-v {
        font-size: 0.82rem;
        color: var(--primary-text-color);
        overflow-wrap: anywhere;
      }

      /* Icons sit exactly in the middle of their circle. A bare <ha-icon> is an
         inline element, and inside a circle it is aligned to the text baseline of
         its line, which leaves it a pixel or two low; making it (and the icon inside
         it) a flex box with no line height takes the text baseline out of it. */
      .hyp-node ha-icon,
      .hyp-node ha-svg-icon,
      .hyp-d-icon ha-icon,
      .hyp-d-icon ha-svg-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none;
        line-height: 0;
        vertical-align: top;
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
        margin: 0;
        padding: 0;
        /* optical centring, measured per icon by _hypCenterIcons (units of the 24-unit icon grid) */
        transform: translate(calc(var(--ico-dx, 0) * var(--mdc-icon-size, 24px) / 24), calc(var(--ico-dy, 0) * var(--mdc-icon-size, 24px) / 24));
      }

      /* --- PoE ports: the Clients list, with the watts at the right of each row --- */
      .hyp-cl-val {
        margin-left: auto;
        padding-left: 8px;
        flex: none;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color);
      }
      .hyp-cl.static {
        cursor: default;
      }
      /* port rows are short: two to a row where they fit, and room for a good few rows */
      .hyp-ports .hyp-cl-grid {
        grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
        max-height: 224px;
      }

      /* --- The details panel as a pop-up: a bottom sheet in the browser's top layer --- */
      dialog.hyp-sheet {
        position: fixed;
        inset: auto 0 0 0;
        margin: 0 auto; /* centred when the screen is wider than the sheet (a tablet) */
        padding: 0;
        width: min(100%, 640px);
        max-width: 100%;
        height: auto;
        max-height: min(82vh, calc(100dvh - 16px));
        border: 0;
        background: transparent;
        color: var(--primary-text-color);
        overflow: visible;
        box-sizing: border-box;
        /* a drag on the dimmed area must not pan the page behind; the panel inside
           (the scroller) allows its own vertical scrolling again */
        touch-action: none;
      }
      dialog.hyp-sheet:not([open]) {
        display: none;
      }
      .hyp-sheet::backdrop {
        background: rgba(0, 0, 0, 0.45);
      }
      .hyp-sheet[open] {
        animation: hyp-sheet-in 0.22s ease-out;
      }
      @keyframes hyp-sheet-in {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .hyp-sheet[open] {
          animation: none;
        }
      }
      .hyp-sheet-grab {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid var(--hyp-details-outline, var(--divider-color, #ccc));
        border-bottom: 0;
        border-radius: var(--border-radius, var(--ha-card-border-radius, 12px)) var(--border-radius, var(--ha-card-border-radius, 12px)) 0 0;
        background: var(--hyp-details-bg, var(--card-background-color, #fff));
        touch-action: none;
      }
      .hyp-sheet-grab i {
        width: 40px;
        height: 4px;
        border-radius: 2px;
        background: var(--secondary-text-color);
        opacity: 0.5;
      }
      .hyp-sheet-close {
        position: absolute;
        right: 6px;
        top: 3px;
        width: 24px;
        height: 24px;
        padding: 0;
        margin: 0;
        border: 0;
        border-radius: 50%;
        background: none;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      /* the cross is only a cross: no border, no focus ring */
      .hyp-sheet-close,
      .hyp-sheet-close:focus,
      .hyp-sheet-close:focus-visible,
      dialog.hyp-sheet:focus,
      dialog.hyp-sheet:focus-visible {
        outline: none;
        border: 0;
        box-shadow: none;
      }
      .hyp-sheet-close:focus-visible {
        color: var(--primary-text-color);
      }
      .hyp-sheet .hyp-details {
        margin: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        max-height: calc(min(82vh, 100dvh - 16px) - 30px);
        overflow-y: auto;
        overscroll-behavior: contain;
        touch-action: pan-y;
        box-sizing: border-box;
        padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
      }

      .hyp-cl-note {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }

      /* the quota ring round the Internet icon in the details header, over its (then transparent) border */
      .hyp-d-ring {
        position: absolute;
        inset: -2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        pointer-events: none;
      }
    `;
  }
}


class NetworkFlowCardEditor extends i {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _page: { state: true },
      _editingApIndex: { state: true },
      _editingDevIndex: { state: true },
      _editingChildPath: { state: true },
      _editingContainerIndex: { state: true },
      _editingMonitorIndex: { state: true },
      _internetSlot: { state: true },
      _expanded: { state: true }
    };
  }

  constructor() {
    super();
    this._page = null;
    this._editingApIndex = null;
    this._editingDevIndex = null;
    // Path, relative to the Node being edited, of the Access Point or
    // fed Switch open on screen - e.g. ["fed_switches.1", "access_points.0"]
    // is the first AP under the Node's second fed Switch. Empty means the
    // Node's own page. Any depth works because every fed Switch keeps its
    // children under the same two keys as a Node does.
    this._editingChildPath = [];
    // Config paths of the Switches expanded in the Nodes tree.
    this._expanded = new Set();
    this._editingContainerIndex = null;
    // Transient auto-discovery state - never persisted to config, just
    // scan results held in the editor while the user decides what to
    // do with them.
    this._discoveredDevices = null;
    this._discoveredSelected = new Set();
    this._nodeScanMessage = "";
    this._routerScanMessage = "";
    this._internetScanMessage = "";
    this._ispScanMessage = "";
    this._discoveredNodes = null;
    this._discoveredRouters = null;
    this._discoveredRoutersPage = 0;
    this._discoveredRoutersSearch = "";
    this._discoveredMainSwitches = null;
    this._discoveredMainSwitchesPage = 0;
    this._discoveredMainSwitchesSearch = "";
    this._mainSwitchScanMessage = "";
    this._discoveredSpeedtestServices = null;
    this._discoveredSpeedtestPage = 0;
    this._discoveredSpeedtestSearch = "";
    this._lastScanAt = null;
    this._scanFailures = [];
    this._scanningEverything = false;
    this._discoveredIspServices = null;
    this._discoveredIspPage = 0;
    this._discoveredIspSearch = "";
    this._discoveredNodesSelected = new Set();
    this._discoveredNodesPage = 0;
    this._discoveredNodesFilterSource = "";
    this._discoveredNodesFilterType = "";
    this._discoveredNodesSearch = "";
    // Maps a candidate's entity id to where it should land when added:
    // "new" (default - its own new Node, today's only behavior) or
    // `existing:<nodeIndex>` to attach it as an Access Point or Fed
    // Switch under an already-configured Node instead. Only offered for
    // "ap"/"switch" candidates against Nodes that already have their
    // own Switch, since Access Points/Fed Switches only ever hang off
    // a Node's Switch - see _eligibleAttachTargets.
    this._discoveredNodesTarget = {};
    this._discoveredDevicesPage = 0;
    this._discoveredDevicesFilter = "";
    this._discoveredDevicesSearch = "";
    this._devsPage = 0;
    this._discoveredAdGuard = null;
    this._discoveredAdGuardPage = 0;
    this._discoveredAdGuardSearch = "";
    this._adguardScanMessage = "";
    this._discoveredPfsense = null;
    this._discoveredPfsensePage = 0;
    this._discoveredPfsenseSearch = "";
    this._pfsenseScanMessage = "";
    this._discoveredContainers = null;
    this._discoveredContainersSelected = new Set();
    this._discoveredContainersPage = 0;
    this._discoveredContainersFilter = "";
    this._discoveredContainersSearch = "";
    this._containersScanMessage = "";
    this._editingMonitorIndex = null;
    this._internetSlot = "internet";
    this._discoveredMonitors = null;
    this._discoveredMonitorsSelected = new Set();
    this._discoveredMonitorsPage = 0;
    this._discoveredMonitorsFilter = "";
    this._discoveredMonitorsSearch = "";
    this._monitorScanMessage = "";
    this._monitorsPage = 0;
    this._monitorsFilter = "";
  }

  setConfig(config) {
    const migrated = migrateCardSize(migrateBillingToQuota(migrateAccessPointsToNodes(config || {})));
    const merged = deepMerge(DEFAULT_CONFIG, migrated);
    merged.nodes = (migrated.nodes || []).map((node) => {
      const mergedNode = deepMerge(DEFAULT_NODE, node);
      mergedNode.switch = node.switch ? deepMerge(DEFAULT_NODE_SWITCH, node.switch) : null;
      mergedNode.homelab = node.homelab ? normalizeHomelab(node.homelab) : null;
      if (node.homelabs) mergedNode.homelabs = node.homelabs.map(normalizeHomelab);
      mergedNode.access_points = (node.access_points || []).map(normalizeAccessPoint);
      mergedNode.fed_switches = (node.fed_switches || []).map(normalizeFedSwitch);
      return mergedNode;
    });
    merged.individual_devices = (config && config.individual_devices || []).map((dev) =>
      deepMerge(DEFAULT_INDIVIDUAL_DEVICE, dev)
    );
    merged.monitoring = normalizeMonitoring(migrated.monitoring);
    this._config = merged;
  }

  _fireChanged() {
    if (this._fireTimeout) clearTimeout(this._fireTimeout);
    this._fireTimeout = setTimeout(() => this._flushFireChanged(), 200);
  }

  _flushFireChanged() {
    if (this._fireTimeout) {
      clearTimeout(this._fireTimeout);
      this._fireTimeout = null;
    }
    const event = new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: this._config }
    });
    this.dispatchEvent(event);
  }

  _valueChanged(e, path) {
    if (!this._config) return;
    let val;

    if (e.detail && e.detail.value !== undefined) {
      val = e.detail.value;
    } else if (e.target.checked !== undefined && (e.target.tagName === "HA-SWITCH" || e.target.type === "checkbox")) {
      val = Boolean(e.target.checked);
    } else {
      val = e.target.value;
    }

    if (path.includes("circle_size") || path.includes("icon_size") || path === "min_flow_duration" || path === "max_flow_duration" || path === "diagram_scale" || path === "diagram_scale_value" || path.includes(".up_to")) {
      val = val === "" ? null : parseFloat(val);
    }

    this._config = setPathValue(this._config, path, val);
    this._fireChanged();
  }

  _handleSelectChange(e, path) {
    const val = e.target.value;
    this._valueChanged({ target: { value: val } }, path);
  }

  _renderInput(label, value, path, type = "text") {
    return b`
      <div class="input-field">
        <label class="input-label">${label}</label>
        <input
          type="${type}"
          class="text-input"
          .value=${value ?? ""}
          @input=${(e) => this._valueChanged(e, path)}
        />
      </div>
    `;
  }

  _renderSlider(label, value, path, min = 20, max = 120, step = 2, unit = "px") {
    const numVal = value ?? 72;
    return b`
      <div class="input-field">
        <label class="input-label">${label}: ${numVal}${unit}</label>
        <input
          type="range"
          min="${min}"
          max="${max}"
          step="${step}"
          .value=${numVal}
          @input=${(e) => this._valueChanged(e, path)}
        />
      </div>
    `;
  }

  // Reusable "which corner" select for the four badge types that
  // support configurable positioning (Primary AP, VPN, Firewall, PoE).
  // Overlap between badges sharing a corner is handled automatically
  // at render time (computeBadgeStacks), so this dropdown doesn't need
  // to warn about collisions - multiple badges in the same corner just
  // fan out slightly rather than hiding each other.
  _renderLocationSelect(value, path) {
    return b`
      <div class="select-field">
        <label class="input-label">Badge Location</label>
        <select
          class="native-select"
          .value=${value || "top-right"}
          @change=${(e) => this._handleSelectChange(e, path)}
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>
    `;
  }

  _renderColorInput(label, value, path) {
    return b`
      <div class="color-picker-row">
        <span class="color-picker-label">${label}</span>
        <div class="color-picker-group">
          <input
            type="color"
            class="color-picker-input"
            .value=${value || "#000000"}
            @input=${(e) => this._valueChanged(e, path)}
          />
          <input
            type="text"
            class="text-input dense"
            .value=${value || ""}
            @input=${(e) => this._valueChanged(e, path)}
          />
        </div>
      </div>
    `;
  }

  // Shared PoE editor section - used by both the top-level Switch page
  // and each node-level Switch's fields, since they share the same
  // `poe` config shape (DEFAULT_POE). `path` is the dotted path to the
  // switch's own `poe` object, e.g. "switch.poe" or
  // "nodes.2.switch.poe".
  _renderPoeSection(poe, path) {
    const p = poe || DEFAULT_POE;
    return b`
      <div class="sub-header">Power over Ethernet (PoE)</div>
      <div class="select-field">
        <label class="input-label">Mode</label>
        <select
          class="native-select"
          .value=${p.mode || "off"}
          @change=${(e) => this._handleSelectChange(e, `${path}.mode`)}
        >
          <option value="auto">Auto (sum PoE ports on this device)</option>
          <option value="manual">Manual (choose entities)</option>
          <option value="off">Off</option>
        </select>
      </div>

      ${p.mode !== "off"
        ? b`
            <ha-icon-picker
              .label=${"Badge Icon"}
              .value=${p.icon || "mdi:lightning-bolt"}
              @value-changed=${(e) => this._valueChanged(e, `${path}.icon`)}
            ></ha-icon-picker>
            ${this._renderLocationSelect(p.location, `${path}.location`)}
          `
        : null}

      ${p.mode === "manual"
        ? b`
            ${(p.manual_entities || []).map(
              (ent, i) => b`
                <div class="list-item">
                  <div class="list-item-info" style="flex:1;">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${ent || ""}
                      .label=${`PoE Entity ${i + 1}`}
                      @value-changed=${(e) => this._valueChanged(e, `${path}.manual_entities.${i}`)}
                      allow-custom-entity
                      style="width:100%;"
                    ></ha-entity-picker>
                  </div>
                  <div class="list-item-actions">
                    <ha-icon-button @click=${() => this._removePoeEntity(path, i)} title="Delete">
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
              `
            )}
            <button class="add-btn" @click=${() => this._addPoeEntity(path)}>
              + Add Entity
            </button>
          `
        : null}

      ${p.mode !== "off"
        ? b`
            <div class="select-field">
              <label class="input-label">Badge Color</label>
              <select
                class="native-select"
                .value=${p.color_mode || "single"}
                @change=${(e) => this._handleSelectChange(e, `${path}.color_mode`)}
              >
                <option value="single">Single color</option>
                <option value="threshold">Threshold colors</option>
              </select>
            </div>

            ${p.color_mode === "threshold"
              ? (() => {
                  const thresholds = p.thresholds || [];
                  return thresholds.map(
                    (t, i) => {
                      // The LAST row is always the open-ended catch-all
                      // ("above every other tier"), determined by its
                      // position in the array - never by whether up_to
                      // currently holds a value. Deciding this by value
                      // instead would mean clearing the field (which
                      // parses to an empty/null up_to) permanently
                      // flips a row into "Above previous" with no way
                      // to type a number back in.
                      const isCatchAll = i === thresholds.length - 1;
                      return b`
                        <div class="two-col">
                          ${isCatchAll
                            ? b`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                            : this._renderInput(
                                `Up to (${p.unit || "W"})`,
                                t.up_to,
                                `${path}.thresholds.${i}.up_to`,
                                "number"
                              )}
                          ${this._renderColorInput("Color", t.color, `${path}.thresholds.${i}.color`)}
                        </div>
                      `;
                    }
                  );
                })()
              : this._renderColorInput("Badge Color", p.color, `${path}.color`)}

            ${p.color_mode === "threshold"
              ? b`
                  <div class="toggle-row">
                    <span>Animate when above top threshold</span>
                    <ha-switch
                      .checked=${p.animate_over_threshold ?? false}
                      @change=${(e) => this._valueChanged(e, `${path}.animate_over_threshold`)}
                    ></ha-switch>
                  </div>
                `
              : null}

            ${this._renderColorInput("Text Color", p.text_color, `${path}.text_color`)}
          `
        : null}
    `;
  }

  // Fields for a single Container/VM status badge on a Homelab node -
  // entity, icon, location, and active/offline colors, matching the
  // VPN/Firewall badge editor pattern (no Enabled toggle needed, since
  // presence in the Containers list already means shown).
  _renderContainerFields(nodeIndex, node, containerIndex) {
    return this._renderContainerFieldsAt(`nodes.${nodeIndex}.homelab.containers.${containerIndex}`);
  }

  // Fields for one Container/VM badge, addressed by config path - it can
  // belong to a Node-level Homelab or to one fed by any Switch.
  _renderContainerFieldsAt(prefix) {
    const c = this._getAtPath(prefix) || DEFAULT_CONTAINER_BADGE;

    return b`
      <div class="sub-header">Container / VM</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${c.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name (Optional)", c.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Badge Icon"}
        .value=${c.icon || "mdi:docker"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
      ></ha-icon-picker>

      ${this._renderLocationSelect(c.location, `${prefix}.location`)}

      <div class="toggle-row">
        <span>Animate when Offline</span>
        <ha-switch
          .checked=${c.animate_offline ?? false}
          @change=${(e) => this._valueChanged(e, `${prefix}.animate_offline`)}
        ></ha-switch>
      </div>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Icon Color", c.icon_color, `${prefix}.icon_color`)}
          ${this._renderColorInput("Background Color", c.color, `${prefix}.color`)}
          ${this._renderColorInput("Border Color", c.border_color, `${prefix}.border_color`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Icon Color", c.offline_icon_color, `${prefix}.offline_icon_color`)}
          ${this._renderColorInput("Offline Background Color", c.offline_color, `${prefix}.offline_color`)}
          ${this._renderColorInput("Offline Border Color", c.offline_border_color, `${prefix}.offline_border_color`)}
        </div>
      </div>
    `;
  }

  // Reads the poe object currently at `path` (dotted, may include
  // array indices) off this._config, walking one segment at a time.
  _getAtPath(path) {
    let cur = this._config;
    for (const key of path.split(".")) {
      cur = cur?.[key];
    }
    return cur;
  }

  _addPoeEntity(path) {
    const poe = this._getAtPath(path) || {};
    const updated = [...(poe.manual_entities || []), ""];
    this._config = setPathValue(this._config, `${path}.manual_entities`, updated);
    this._fireChanged();
  }

  _removePoeEntity(path, index) {
    const poe = this._getAtPath(path) || {};
    const updated = (poe.manual_entities || []).filter((_, i) => i !== index);
    this._config = setPathValue(this._config, `${path}.manual_entities`, updated);
    this._fireChanged();
  }

  render() {
    if (!this.hass || !this._config) return b``;

    if (this._page === null) {
      return this._renderMenu();
    }

    return b`
      <div class="editor">
        <div class="back-header" @click=${() => this._goBack()}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span class="back-title">${this._getPageTitle()}</span>
        </div>
        ${this._renderPageContent()}
      </div>
    `;
  }

  _goBack() {
    if (this._editingContainerIndex !== null) {
      this._editingContainerIndex = null;
    } else if (this._editingChildPath.length) {
      // One level up: the parent Switch's own page (or the Node's).
      this._editingChildPath = this._editingChildPath.slice(0, -1);
    } else if (this._editingApIndex !== null) {
      this._editingApIndex = null;
    } else if (this._editingDevIndex !== null) {
      this._editingDevIndex = null;
    } else if (this._editingMonitorIndex !== null) {
      this._editingMonitorIndex = null;
    } else {
      this._page = null;
    }
  }

  _getPageTitle() {
    if (this._page === "discover") return "Discover";
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingContainerIndex !== null) {
      return `Container ${this._editingContainerIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingChildPath.length) {
      const [key, idx] = this._editingChildPath[this._editingChildPath.length - 1].split(".");
      const n = parseInt(idx, 10) + 1;
      return key === "access_points" ? `Access Point ${n}` : key === "homelabs" ? `Server ${n}` : `Switch ${n}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null) {
      const node = this._config.nodes?.[this._editingApIndex];
      return node?.switch ? `Node ${this._editingApIndex + 1}` : `Access Point ${this._editingApIndex + 1}`;
    }
    if (this._page === "individual_devices" && this._editingDevIndex !== null) {
      return `Client ${this._editingDevIndex + 1}`;
    }
    if (this._page === "monitoring" && this._editingMonitorIndex !== null) {
      return `Service ${this._editingMonitorIndex + 1}`;
    }
    const item = MENU_ITEMS.find((m) => m.key === this._page);
    return item ? item.title : "";
  }

  _renderMenu() {
    return b`
      <div class="editor-menu">
        <div class="menu-item discover-menu-item" @click=${() => this._openDiscoverPage()}>
          <div class="menu-item-left">
            <ha-icon icon="mdi:magnify-scan" style="color:var(--card-background-color);"></ha-icon>
            <div class="menu-item-text">
              <div class="menu-item-title" style="color:var(--card-background-color);">Discover</div>
              <div class="menu-item-summary" style="color:var(--card-background-color); opacity:0.85;">
                Scan every supported integration at once
              </div>
            </div>
          </div>
          <ha-icon icon="mdi:chevron-right" class="chevron" style="color:var(--card-background-color);"></ha-icon>
        </div>
        ${MENU_ITEMS.map(
          (item) => b`
            <div class="menu-item" @click=${() => (this._page = item.key)}>
              <div class="menu-item-left">
                <ha-icon .icon=${item.icon} style="color:var(--primary-color);"></ha-icon>
                <div class="menu-item-text">
                  <div class="menu-item-title">${item.title}</div>
                  ${item.summary
                    ? b`<div class="menu-item-summary">${item.summary}</div>`
                    : null}
                </div>
              </div>
              <ha-icon icon="mdi:chevron-right" class="chevron"></ha-icon>
            </div>
          `
        )}
      </div>
    `;
  }

  _openDiscoverPage() {
    this._page = "discover";
    this._scanEverything();
  }

  // Runs every existing category scanner in one pass. Each one already
  // manages its own state/messages/pagination independently, so this
  // is pure orchestration - nothing here duplicates their logic.
  // Container/VM is the one exception: it's inherently scoped to a
  // single Homelab node (there's no "global" place to add a container
  // to), so it only runs when at least one Homelab node already
  // exists, targeting the first one found.
  _scanEverything() {
    // Each scanner runs on its own, so one integration with unexpected
    // data can no longer abort the rest of the scan (previously an
    // exception in any one of them silently stopped every scanner after
    // it, which looked like the button doing nothing).
    const failures = [];
    const run = (label, fn) => {
      try {
        fn();
      } catch (err) {
        console.error(`Network Flow Card: ${label} scan failed`, err);
        failures.push(label);
      }
    };

    run("Router", () => this._scanForRouter());
    run("Nodes", () => this._scanForNodes());
    run("Clients", () => this._scanIndividualDevices());
    run("Monitoring", () => this._scanForMonitoring());
    run("Speedtest", () => this._scanForInternet());
    run("ISP", () => this._scanForIsp());
    run("DNS filtering", () => this._scanForAdGuard());
    run("pfSense", () => this._scanForPfsense());

    const homelabIndex = (this._config.nodes || []).findIndex((n) => n.homelab?.entity);
    if (homelabIndex !== -1) {
      run("Containers", () => this._scanForContainers());
    } else {
      this._discoveredContainers = null;
    }

    this._lastScanAt = new Date();
    this._scanFailures = failures;
    this._scanningEverything = false;
    this.requestUpdate();
  }

  // Button handler: shows "Scanning..." and lets the browser paint it
  // before the (synchronous, potentially slow on large installs) scan
  // starts, so a click always gives immediate visible feedback.
  _rescanEverythingClicked() {
    if (this._scanningEverything) return;
    this._scanningEverything = true;
    this.requestUpdate();
    setTimeout(() => this._scanEverything(), 30);
  }

  _renderLastScanned() {
    if (this._scanningEverything) {
      return b`<p class="scan-status">Scanning...</p>`;
    }
    if (!this._lastScanAt) return null;
    const stamp = this._lastScanAt.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "medium"
    });
    return b`
      <p class="scan-status">Last scanned: ${stamp}</p>
      ${this._scanFailures && this._scanFailures.length
        ? b`<p class="scan-status" style="color:var(--error-color);">Couldn't scan: ${this._scanFailures.join(", ")}. See the browser console for details.</p>`
        : null}
    `;
  }

  _renderDiscoverPage() {
    const nodes = this._config.nodes || [];
    // Computed fresh every render, not cached from the last full scan -
    // a Homelab node can appear via this page's own Nodes section, the
    // Nodes page directly, or be removed entirely, and this section
    // needs to reflect that immediately rather than only after
    // "Re-scan Everything" happens to run again.
    const homelabIndex = nodes.findIndex((n) => n.homelab?.entity);
    const homelabNode = homelabIndex >= 0 ? nodes[homelabIndex] : null;
    const homelabCount = nodes.filter((n) => n.homelab?.entity).length;

    return b`
      <div class="form-section">
        <div class="input-label" style="margin-bottom:6px;">How should the card look?</div>
        ${this._renderViewTiles()}
        <p style="color:var(--secondary-text-color); font-size:0.85em; margin:6px 0 14px 0;">
          Both views use the same discovered devices - you can switch at any time
          here or under Layout.
        </p>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px 0;">
          Scanned every supported integration in one pass. Work through
          each section below - filter, select, and add as many as you
          want; nothing is applied until you act on it in that section.
        </p>
        <button class="add-btn" ?disabled=${this._scanningEverything} @click=${() => this._rescanEverythingClicked()}>
          Re-scan Everything
        </button>
        ${this._renderLastScanned()}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Internet &middot; Speedtest</span>
          <span>
            ${this._config.internet?.entities?.ping || this._config.internet?.entities?.jitter || this._config.internet?.entities?.download || this._config.internet?.entities?.upload
              ? b`<ha-icon-button @click=${() => this._removeAllSpeedtest("internet")} title="Remove All (Primary)"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
              : null}
            ${this._config.internet_secondary?.entities?.ping || this._config.internet_secondary?.entities?.jitter || this._config.internet_secondary?.entities?.download || this._config.internet_secondary?.entities?.upload
              ? b`<ha-icon-button @click=${() => this._removeAllSpeedtest("internet_secondary")} title="Remove All (Secondary)"><ha-icon icon="mdi:delete-sweep" style="color:var(--warning-color, orange);"></ha-icon></ha-icon-button>`
              : null}
          </span>
        </div>
        ${this._discoveredSpeedtestServices !== null
          ? this._renderDiscoveredSpeedtestList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Internet &middot; ISP</span>
          <span>
            ${this._config.internet?.entities?.quota_total || this._config.internet?.entities?.quota_remaining || this._config.internet?.entities?.total_download || this._config.internet?.entities?.total_upload
              ? b`<ha-icon-button @click=${() => this._removeAllIsp("internet")} title="Remove All (Primary)"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
              : null}
            ${this._config.internet_secondary?.entities?.quota_total || this._config.internet_secondary?.entities?.quota_remaining || this._config.internet_secondary?.entities?.total_download || this._config.internet_secondary?.entities?.total_upload
              ? b`<ha-icon-button @click=${() => this._removeAllIsp("internet_secondary")} title="Remove All (Secondary)"><ha-icon icon="mdi:delete-sweep" style="color:var(--warning-color, orange);"></ha-icon></ha-icon-button>`
              : null}
          </span>
        </div>
        ${this._discoveredIspServices !== null
          ? this._renderDiscoveredIspList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Router / Gateway</span>
          ${this._config.router?.entity
            ? b`<ha-icon-button @click=${() => this._removeAllRouter()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredRouters !== null
          ? this._renderDiscoveredRoutersList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Security &middot; Firewall &amp; VPN (pfSense)</span>
          ${(this._discoveredPfsense || []).some((i) => this._config[this._pfsenseField(i)] === i.entity)
            ? b`<ha-icon-button @click=${() => this._removeAllPfsense()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredPfsense !== null
          ? this._renderDiscoveredPfsenseList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Security &middot; DNS Filtering</span>
          ${this._config.dns_entity
            ? b`<ha-icon-button @click=${() => this._removeAllAdGuard()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredAdGuard !== null
          ? this._renderDiscoveredAdGuardList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Nodes (Access Point / Switch / Server)</span>
          ${nodes.length
            ? b`<ha-icon-button @click=${() => this._removeAllNodes()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredNodes !== null
          ? this._renderDiscoveredNodesList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Server &middot; Container / VM</span>
          ${homelabNode && (homelabNode.homelab?.containers || []).length
            ? b`<ha-icon-button @click=${() => this._removeAllContainers(`nodes.${homelabIndex}.homelab`)} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${homelabNode
          ? b`
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Adding to <strong>${homelabNode.name || homelabNode.homelab?.name || `Node ${homelabIndex + 1}`}</strong>${homelabCount > 1
                  ? " - your first Server node. Open a different one directly from the Nodes page to target it instead."
                  : "."}
              </p>
              <button class="add-btn" @click=${() => this._scanForContainers()}>
                Scan for Container/VM
              </button>
              ${this._containersScanMessage
                ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._containersScanMessage}</p>`
                : null}
              ${this._discoveredContainers !== null ? this._renderDiscoveredContainersList(`nodes.${homelabIndex}.homelab`) : null}
            `
          : b`
              <p style="color:var(--secondary-text-color); font-size:0.9em;">
                Add a Server node first (via the Nodes section above, or
                the Nodes page) - Containers/VMs always belong to a
                specific node, so there's nothing to scan into yet.
              </p>
            `}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Clients</span>
          ${(this._config.individual_devices || []).length
            ? b`<ha-icon-button @click=${() => this._deleteAllDevices()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredDevices !== null
          ? this._renderDiscoveredDevicesList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Monitoring &middot; Uptime Kuma / Ping / Gatus / UptimeRobot</span>
          ${(this._config.monitoring?.services || []).length
            ? b`<ha-icon-button @click=${() => this._removeAllMonitors()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredMonitors !== null
          ? this._renderDiscoveredMonitorsList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}
      </div>
    `;
  }

  _renderPageContent() {
    switch (this._page) {
      case "discover":
        return this._renderDiscoverPage();
      case "internet":
        return this._renderInternetPage();
      case "router":
        return this._renderRouterPage();
      case "switch":
        return this._renderSwitchPage();
      case "security":
        return this._renderSecurityPage();
      case "nodes":
        return this._renderAccessPointsPage();
      case "individual_devices":
        return this._renderIndividualDevicesPage();
      case "monitoring":
        return this._renderMonitoringPage();
      case "layout":
      case "advanced":
        return this._renderLayoutPage();
      default:
        return b``;
    }
  }

  _renderInternetPage() {
    // Primary and Secondary are edited from this one page - which is showing
    // is a tab here, not a separate menu entry.
    const slot = this._activeInternetSlot();
    const isSecondary = slot === "internet_secondary";
    const secondaryOn = internetSecondaryEnabled(this._config);
    // Show the defaults a secondary would get at runtime, without writing
    // any of them into the config until a field is actually edited.
    const internet = isSecondary
      ? deepMerge(DEFAULT_INTERNET, this._config.internet_secondary || {})
      : (this._config.internet || {});
    const c = internet.colors || {};

    return b`
      <div class="form-section">
        <div style="display:flex; gap:8px; margin-bottom:12px;">
          ${["internet", "internet_secondary"].map(
            (s) => b`
              <button
                class="add-btn"
                style="margin:0; flex:1; ${slot === s ? "" : "background:transparent; color:var(--primary-text-color); border:1px solid var(--divider-color);"}"
                @click=${() => {
                  this._internetSlot = s;
                  this.requestUpdate();
                }}
              >
                ${s === "internet" ? "Primary" : secondaryOn ? "Secondary" : "+ Secondary"}
              </button>
            `
          )}
        </div>
        ${secondaryOn
          ? b`
              <div class="select-field">
                <label class="input-label">Mode</label>
                <select
                  class="native-select"
                  .value=${this._config.internet_secondary?.mode || "active_standby"}
                  @change=${(e) => this._handleSelectChange(e, "internet_secondary.mode")}
                >
                  <option value="active_active" ?selected=${this._config.internet_secondary?.mode === "active_active"}>Active/Active</option>
                  <option value="active_standby" ?selected=${(this._config.internet_secondary?.mode || "active_standby") === "active_standby"}>Active/Standby</option>
                </select>
              </div>
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">
                Active/Active: both services carry traffic, so the secondary is drawn
                just like the primary (solid outline and lines). Active/Standby:
                the secondary is a backup, so its outline and lines are dashed -
                until the primary actually goes down, at which point the
                secondary is carrying traffic and is drawn solid instead.
              </p>
            `
          : null}
        <div class="sub-header" style="display:flex; align-items:center; justify-content:space-between;">
          <span>${isSecondary ? "Secondary Internet" : secondaryOn ? "Primary Internet" : "Internet"}</span>
          ${isSecondary && this._config.internet_secondary
            ? b`<ha-icon-button @click=${() => this._removeSecondaryInternet()} title="Remove Secondary Internet"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${isSecondary
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">Optional backup Internet/WAN service. It appears next to the primary Internet once it has an entity (or any metric entity) set - until then the card is unchanged. The Mode above sets whether it is drawn solid (Active/Active) or dashed (Active/Standby). Summary badges always show the primary service.</p>`
          : null}

        ${this._infoHeader(
          "Auto-Discovery (Speedtest)",
          "Looks for Speedtest.net, Ookla Speedtest, Cloudflare Speed Test, LibreSpeed, and Fast.com, and lists every service found across all of them (e.g. if you have more than one configured) so you choose which to apply - nothing is set automatically. Fast.com only ever fills in Download, since that's the only figure it measures. Only blank fields are filled in on the one you pick - anything you've already set by hand is left alone."
        )}
        <button class="add-btn" @click=${() => this._scanForInternet()}>
          Scan for Speedtest
        </button>
        ${this._internetScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._internetScanMessage}</p>`
          : null}
        ${this._discoveredSpeedtestServices !== null ? this._renderDiscoveredSpeedtestList() : null}

        ${this._infoHeader(
          "Auto-Discovery (ISP)",
          "Looks for Aussie Broadband, Starlink, Start.ca, FRITZ!Box (its WAN-connectivity sensor for the Internet node's online/offline state, plus its live KB/s and GB totals), and pfSense (each non-VPN gateway: its status, delay as Ping, stddev as Jitter, and its WAN interface's live KB/s as Download/Upload), and lists every service found across all three - Aussie Broadband in particular often has several services on one account (each its own address/line), so you pick the right one rather than one being assumed. Applies Quota Total, Quota Remaining, Total Downloaded, and Total Uploaded from whichever you choose; for Starlink, also sets the Internet Entity itself to its \"Connected\" binary sensor if that field is still blank."
        )}
        <button class="add-btn" @click=${() => this._scanForIsp()}>
          Scan for ISP
        </button>
        ${this._ispScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._ispScanMessage}</p>`
          : null}
        ${this._discoveredIspServices !== null ? this._renderDiscoveredIspList() : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entity || ""}
          .label=${"Internet Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${slot}.entity`)}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", internet.name, `${slot}.name`)}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${internet.icon || "mdi:web"}
          @value-changed=${(e) => this._valueChanged(e, `${slot}.icon`)}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, `${slot}.colors.circle`)}
            ${this._renderColorInput("Icon Color", c.icon, `${slot}.colors.icon`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, `${slot}.colors.offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${slot}.colors.offline_icon`)}
          </div>
        </div>

        <div class="sub-header">Quota</div>
        <p style="color:var(--secondary-text-color); font-size:0.85em; margin:0 0 8px 0;">
          While both quota entities are set and reporting, the circle's ring shows the quota (Progress and Remaining colours below). With no quota entities set, the ring is simply the Border Color above.
        </p>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.quota_total || ""}
          .label=${"Quota Total Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.quota_total`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.quota_remaining || ""}
          .label=${"Quota Remaining Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.quota_remaining`)}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Quota Progress Color", c.quota_progress, `${slot}.colors.quota_progress`)}
          </div>
          <div>
            ${this._renderColorInput("Quota Remaining Color", c.quota_remaining, `${slot}.colors.quota_remaining`)}
          </div>
        </div>

        <div class="sub-header">Metrics</div>
        <div class="two-col">
          <div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.download || ""}
              .label=${"Download Speed Test Entity"}
              @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.download`)}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.total_download || ""}
              .label=${"Total Downloaded Entity"}
              @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.total_download`)}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-icon-picker
              .label=${"Download Icon"}
              .value=${internet.download_icon || "mdi:progress-download"}
              @value-changed=${(e) => this._valueChanged(e, `${slot}.download_icon`)}
            ></ha-icon-picker>
          </div>
          <div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.upload || ""}
              .label=${"Upload Speed Test Entity"}
              @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.upload`)}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.total_upload || ""}
              .label=${"Total Uploaded Entity"}
              @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.total_upload`)}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-icon-picker
              .label=${"Upload Icon"}
              .value=${internet.upload_icon || "mdi:progress-upload"}
              @value-changed=${(e) => this._valueChanged(e, `${slot}.upload_icon`)}
            ></ha-icon-picker>
          </div>
        </div>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.ping || ""}
          .label=${"Ping Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.ping`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.jitter || ""}
          .label=${"Jitter Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${slot}.entities.jitter`)}
          allow-custom-entity
        ></ha-entity-picker>

      </div>
    `;
  }

  _renderRouterPage() {
    const router = this._config.router || {};
    const c = router.colors || {};
    const lan = this._config.lan || {};
    const lc = lan.colors || {};

    return b`
      <div class="form-section">
        ${this._infoHeader("Router", "The Router node only appears once an entity is selected below.")}

        ${this._infoHeader(
          "Auto-Discovery (TP-Link / OpenWrt / Synology SRM / AsusRouter / ASUSWRT / UniFi / Omada / Netgear / FRITZ!Box / pfSense)",
          "Looks for the master unit on a TP-Link Deco mesh, the single device from the TP-Link Router integration, an OpenWrt router via the LuCI integration, a Synology SRM router, an AsusRouter/AiMesh router, a router from the built-in ASUSWRT integration, a Netgear router (Orbi, Nighthawk, and other pynetgear-supported models), an AVM FRITZ!Box (its external-IP sensor is offered as the WAN IP, and its WAN-connectivity sensor is offered under Internet's ISP discovery), and a pfSense firewall via hass-pfsense (a system sensor as the status entity, DHCP online leases as LAN Connected Clients; its gateways are offered under Internet's ISP discovery, and its firewall/VPN entities on the Security page) - if more than one exists (e.g. a TP-Link Router acting as your modem/gateway with a Deco mesh riding behind it), you choose which one is the Router below rather than having one picked for you. LuCI, Synology SRM, and Netgear have no dedicated router-status entity of their own, so all three candidates use one of their client-tracker entities as a reachability proxy instead - don't be surprised by the entity name. LuCI's and Netgear's proxies reliably go unavailable when the router drops offline; Synology SRM's is best-effort only, since that integration's older polling model doesn't guarantee the same. AsusRouter has a real connectivity sensor for its main AiMesh unit, and ASUSWRT uses its own Devices Connected sensor (which also fills in LAN Connected Clients), so both candidates are as reliable as TP-Link's. Where the integration exposes current throughput sensors they are also filled into Real-time Speed below: FRITZ!Box (its WAN throughput sensors), pfSense (the default gateway's WAN interface), ASUSWRT (its Download / Upload speed sensors, which may need enabling and are reported to misbehave on some routers) and AsusRouter (its WAN download / upload speed sensors). The other integrations here expose no comparable live throughput, so pick those by hand."
        )}
        <button class="add-btn" @click=${() => this._scanForRouter()}>
          Scan for Router / Gateway
        </button>
        ${this._routerScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._routerScanMessage}</p>`
          : null}
        ${this._discoveredRouters !== null ? this._renderDiscoveredRoutersList() : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entity || ""}
          .label=${"Router Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", router.name, "router.name")}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${router.icon || "mdi:router-network"}
          @value-changed=${(e) => this._valueChanged(e, "router.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, "router.colors.circle")}
            ${this._renderColorInput("Icon Color", c.icon, "router.colors.icon")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "router.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "router.colors.offline_icon")}
          </div>
        </div>

        ${this._renderPoeSection(router.poe, "router.poe")}

        ${this._infoHeader(
          "Real-time Speed",
          "Feeds the Real-time Download and Real-time Upload summary items (Layout > Summary). Pick the sensors that report this router's current throughput. With no Router configured, those items use the Primary Access Point's Download and Upload entities instead. A configured Router with no speed entity shows nothing."
        )}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.download || ""}
          .label=${"Download Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.download")}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.upload || ""}
          .label=${"Upload Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.upload")}
          allow-custom-entity
        ></ha-entity-picker>
        ${!router.entity
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">No Router Entity is set yet, so the Real-time summary items use the Primary Access Point until one is.</p>`
          : null}

        ${this._infoHeader(
          "IP Addressing",
          "Shown only when Layout > General > Show IP Addressing is on. WAN Address renders centered below the Internet circle; LAN Address renders centered below this Router circle."
        )}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.wan_ip || ""}
          .label=${"WAN Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.wan_ip")}
          allow-custom-entity
        ></ha-entity-picker>
        ${internetSecondaryEnabled(this._config)
          ? b`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${router.entities?.wan_ip_secondary || ""}
                .label=${"Secondary WAN Address Entity"}
                @value-changed=${(e) => this._valueChanged(e, "router.entities.wan_ip_secondary")}
                allow-custom-entity
              ></ha-entity-picker>
            `
          : null}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.lan_ip || ""}
          .label=${"LAN Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.lan_ip")}
          allow-custom-entity
        ></ha-entity-picker>
        <div class="two-col">
          <div>${this._renderColorInput("Badge Background", router.ip_badge_color, "router.ip_badge_color")}</div>
          <div>${this._renderColorInput("Badge Text Color", router.ip_badge_icon_color, "router.ip_badge_icon_color")}</div>
        </div>

        ${this._config.view_mode === "hyperbolic"
          ? b`
              <div class="sub-header">Total Clients (Hyperbolic)</div>
              <p style="color:var(--secondary-text-color); font-size:0.85em; margin:0 0 8px 0;">
                Optional. A sensor holding the total number of clients on the network. It feeds the Connected clients graph in the router's details panel. Leave blank and the card adds up the LAN count and each access point's count instead.
              </p>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${router.entities?.connected_devices || ""}
                .label=${"Total Clients Entity"}
                @value-changed=${(e) => this._valueChanged(e, "router.entities.connected_devices")}
                allow-custom-entity
              ></ha-entity-picker>
            `
          : null}
        <div class="sub-header">LAN Connected Clients</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${lan.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, "lan.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${lan.icon || "mdi:lan"}
          @value-changed=${(e) => this._valueChanged(e, "lan.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", lc.circle, "lan.colors.circle")}
            ${this._renderColorInput("Icon Color", lc.icon, "lan.colors.icon")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", lc.offline_circle, "lan.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", lc.offline_icon, "lan.colors.offline_icon")}
          </div>
        </div>
      </div>
    `;
  }

  // The address of a managed switch or a server, shown as a pill above its circle (and a
  // chip in the details panel). It can be a sensor whose state is the address, or ANY entity
  // that carries it as an attribute (UniFi Device Info's ip_address, a tracker's ip) - the card
  // looks in the attributes first, so no separate entity is needed.
  _renderDeviceIpField(prefix, cfg) {
    return b`
      <div class="sub-header">IP Address</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${cfg?.entities?.ip_address || ""}
        .label=${"IP Address Entity (Optional)"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.ip_address`)}
        allow-custom-entity
      ></ha-entity-picker>
      <p style="color:var(--secondary-text-color); font-size:0.85em; margin:0 0 8px 0;">
        Shown above the circle when Layout > Graph > Show IP Addressing is on. Pick any entity whose state is the address, or that has an ip / ip_address attribute (UniFi Device Info switches do). Leave blank and the card looks for the address itself: first in this device's own entity, then in the device's other sensors and web address.
      </p>
      <div class="two-col">
        <div>${this._renderColorInput("IP Badge Background", cfg?.ip_badge_color, `${prefix}.ip_badge_color`)}</div>
        <div>${this._renderColorInput("IP Badge Text Color", cfg?.ip_badge_icon_color, `${prefix}.ip_badge_icon_color`)}</div>
      </div>
    `;
  }

  // The totals behind "11 of 12 online" in a server's details panel. Optional: the card also
  // looks for them itself (the guests and count sensors on the server's device).
  _renderHomelabCountFields(prefix, cfg) {
    const picker = (key, label) => b`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${cfg?.entities?.[key] || ""}
        .label=${label}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.${key}`)}
        allow-custom-entity
      ></ha-entity-picker>
    `;
    return b`
      <div class="sub-header">VMs and Containers</div>
      ${picker("services_total", "Total VMs / Containers Entity (Optional)")}
      ${picker("services_running", "Running VMs / Containers Entity (Optional)")}
      ${this._renderInput("Label for its VMs and Containers (Optional)", cfg?.guest_label, `${prefix}.guest_label`)}
      <p style="color:var(--secondary-text-color); font-size:0.85em; margin:0 0 8px 0;">
        The details panel lists only the VMs and containers you add to this server, but its heading counts all of them ("11 of 12 online"). Home Assistant's integrations do not link a server to its VMs and containers, so tell the card which they are in one of two ways. Either pick sensors holding the total number and the number running (Portainer's container counts, say). Or create a label in Settings > Areas, labels & zones, add it to the VMs and containers (Settings > Devices, select them, Add label) and type its name here - this works whichever integration they come from. With neither, the card looks for them itself: devices linked to this server, count sensors on it, or - for Proxmox VE, Portainer and Monitor Docker - the other status sensors of the same integration.
      </p>
    `;
  }

  _renderSwitchPage() {
    const sw = this._config.switch || {};
    const c = sw.colors || {};

    return b`
      <div class="form-section">
        ${this._infoHeader("Core Switch", "Optional node between Router and your Access Points. Only appears once an entity is selected below.")}

        ${this._infoHeader(
          "Auto-Discovery (UniFi / Omada)",
          "Only looks for devices UniFi or Omada have already classified as switches - the same classification used for Fed Switch and Nodes-page discovery, not a separate check of its own. No other integration this card supports models a distinct switch role, so nothing else is scanned here."
        )}
        <button class="add-btn" @click=${() => this._scanForMainSwitch()}>
          Scan for Switch
        </button>
        ${this._mainSwitchScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._mainSwitchScanMessage}</p>`
          : null}
        ${this._discoveredMainSwitches !== null ? this._renderDiscoveredMainSwitchesList() : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${sw.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, "switch.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", sw.name, "switch.name")}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${sw.icon || "mdi:switch"}
          @value-changed=${(e) => this._valueChanged(e, "switch.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, "switch.colors.circle")}
            ${this._renderColorInput("Icon Color", c.icon, "switch.colors.icon")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "switch.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "switch.colors.offline_icon")}
          </div>
        </div>

        ${this._renderDeviceIpField("switch", sw)}

        ${this._renderPoeSection(sw.poe, "switch.poe")}

        <div class="sub-header">Connected Clients</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${sw.entities?.connected_devices || ""}
          .label=${"Entity (Optional)"}
          @value-changed=${(e) => this._valueChanged(e, "switch.entities.connected_devices")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${sw.devices_icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, "switch.devices_icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.devices_circle, "switch.colors.devices_circle")}
            ${this._renderColorInput("Icon Color", c.devices_icon, "switch.colors.devices_icon")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, "switch.colors.devices_offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, "switch.colors.devices_offline_icon")}
          </div>
        </div>
      </div>
    `;
  }

  // Shared "Applies To" select for the four Security elements - any
  // of them can target the Router, Primary AP, the Homelab node, or
  // the main (top-level) Switch. Node-level/fed Switches aren't a
  // target option here since there can be several of them and no
  // single one is "the" switch the way there's one Router or one
  // top-level Switch.
  // ---- Homelab Security choices ----------------------------------------
  // VPN, Firewall, DNS Filtering and Reverse Proxy are each configured
  // once on the Security page and pointed at a kind of device. When that
  // is "Homelab Server", these switches say which Homelab servers actually
  // run each item, so different servers can show different ones.

  _securityItems() {
    return [
      { key: "vpn", label: "VPN", active: this._config.vpn_target === "homelab" && !!this._config.vpn_entity },
      { key: "firewall", label: "Firewall", active: this._config.firewall_target === "homelab" && !!this._config.firewall_entity },
      { key: "dns", label: "DNS Filtering", active: this._config.dns_target === "homelab" && !!this._config.dns_entity },
      { key: "reverse_proxy", label: "Reverse Proxy", active: this._config.reverse_proxy_target === "homelab" && !!this._config.reverse_proxy_entity }
    ];
  }

  _renderHomelabSecurity(hlPath, hl) {
    const active = this._securityItems().filter((i) => i.active);
    if (!active.length) {
      return b`
        <div class="sub-header">Security</div>
        <p class="tree-note">
          VPN, Firewall, DNS Filtering and Reverse Proxy can each be pointed
          at Servers from the Security page. Once one is, choose here which
          servers run it.
        </p>
      `;
    }
    const explicit = !!hl.security;
    return b`
      <div class="sub-header">Security</div>
      <p class="tree-note">
        Which of these run on this server?
        ${explicit ? "" : "Until you change one, every Server shows all of them."}
      </p>
      ${active.map((item) => b`
        <div class="toggle-row">
          <span>${item.label}</span>
          <ha-switch
            .checked=${homelabShowsSecurity(hl, item.key)}
            @change=${(e) => this._setHomelabSecurity(hlPath, item.key, e.target.checked)}
          ></ha-switch>
        </div>
      `)}
      ${explicit
        ? b`<button class="tree-tool-btn" @click=${() => this._resetHomelabSecurity(hlPath)}>Show all again</button>`
        : null}
    `;
  }

  // The first change on a Homelab writes all four items out (starting
  // from "all on", which is what an untouched Homelab does), so from then
  // on what the page shows is exactly what is saved.
  _setHomelabSecurity(hlPath, item, value) {
    const hl = this._getAtPath(hlPath);
    if (!hl) return;
    const current = hl.security || { vpn: true, firewall: true, dns: true, reverse_proxy: true };
    this._config = setPathValue(this._config, `${hlPath}.security`, { ...current, [item]: !!value });
    this._fireChanged();
  }

  _resetHomelabSecurity(hlPath) {
    const hl = this._getAtPath(hlPath);
    if (!hl) return;
    const { security, ...rest } = hl;
    this._config = setPathValue(this._config, hlPath, rest);
    this._fireChanged();
  }

  // Every Access Point in the diagram, at every depth.
  _allAccessPoints() {
    const out = [];
    const walk = (holder) => {
      (holder.access_points || []).forEach((ap) => {
        out.push(ap);
        walk(ap);
      });
      (holder.fed_switches || []).forEach(walk);
    };
    (this._config.nodes || []).forEach(walk);
    return out;
  }

  // On the Security page: which Homelab servers currently show an item.
  _renderHomelabTargetHint(item) {
    const homelabs = this._allHomelabs();
    if (!homelabs.length) return null;
    const names = homelabs
      .filter((hl) => homelabShowsSecurity(hl, item))
      .map((hl) => this._treeLabel(hl, "Server"));
    return b`
      <p class="tree-note">
        ${names.length ? `Shown on: ${names.join(", ")}.` : "Not shown on any Server yet."}
        Choose which servers run it from each Server's page.
      </p>
    `;
  }

  _renderSecurityTargetSelect(value, path) {
    return b`
      <div class="select-field">
        <label class="input-label">Applies To</label>
        <select
          class="native-select"
          .value=${value || "router"}
          @change=${(e) => this._handleSelectChange(e, path)}
        >
          <option value="router">Router/Gateway</option>
          <option value="primary_ap">Primary Access Point</option>
          <option value="homelab">Server</option>
          <option value="switch">Main Switch</option>
        </select>
      </div>
      ${value === "homelab"
        ? this._renderHomelabTargetHint({ vpn_target: "vpn", firewall_target: "firewall", dns_target: "dns", reverse_proxy_target: "reverse_proxy" }[path])
        : null}
    `;
  }

  _renderSecurityPage() {
    const vpnTarget = this._config.vpn_target || "router";
    const firewallTarget = this._config.firewall_target || "router";
    const dnsTarget = this._config.dns_target || "router";
    const reverseProxyTarget = this._config.reverse_proxy_target || "router";
    const hasPrimaryAp = this._allAccessPoints().some((ap) => ap.is_primary);
    const hasHomelab = this._allHomelabs().length > 0;
    const hasMainSwitch = !!this._config.switch?.entity;

    const targetWarning = (target) => {
      if (target === "primary_ap" && !hasPrimaryAp) {
        return "No Access Point is currently marked Primary - the badge won't appear until one is (on the Access Points page).";
      }
      if (target === "homelab" && !hasHomelab) {
        return "No Server node exists yet - the badge won't appear until one is added (on the Nodes page).";
      }
      if (target === "switch" && !hasMainSwitch) {
        return "The main Switch has no entity configured - the badge won't appear until one is set (on the Switch page).";
      }
      return null;
    };

    return b`
      <div class="form-section">
        <div class="sub-header">VPN</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vpn_entity || ""}
          .label=${"VPN Entity"}
          @value-changed=${(e) => this._valueChanged(e, "vpn_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderSecurityTargetSelect(vpnTarget, "vpn_target")}

        ${targetWarning(vpnTarget)
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(vpnTarget)}</p>`
          : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vpn_peers_entity || ""}
          .label=${"Connected Peers Entity (Optional)"}
          @value-changed=${(e) => this._valueChanged(e, "vpn_peers_entity")}
          allow-custom-entity
        ></ha-entity-picker>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          When set, the VPN badge widens to show this entity's value
          next to its icon. Leave blank to keep the badge icon-only.
        </p>

        <div class="toggle-row">
          <span>Animate when Offline</span>
          <ha-switch
            .checked=${this._config.vpn_animate_offline ?? false}
            @change=${(e) => this._valueChanged(e, "vpn_animate_offline")}
          ></ha-switch>
        </div>

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.vpn_badge_icon || "mdi:vpn"}
          @value-changed=${(e) => this._valueChanged(e, "vpn_badge_icon")}
        ></ha-icon-picker>

        ${this._renderLocationSelect(this._config.vpn_badge_location, "vpn_badge_location")}

        <div class="two-col">
          <div>
            ${this._renderColorInput("Badge Icon Color", this._config.vpn_badge_icon_color, "vpn_badge_icon_color")}
            ${this._renderColorInput("Badge Background Color", this._config.vpn_badge_color, "vpn_badge_color")}
            ${this._renderColorInput("Badge Border Color", this._config.vpn_badge_border_color, "vpn_badge_border_color")}
          </div>
          <div>
            ${this._renderColorInput("Offline Badge Icon Color", this._config.vpn_badge_offline_icon_color, "vpn_badge_offline_icon_color")}
            ${this._renderColorInput("Offline Badge Background Color", this._config.vpn_badge_offline_color, "vpn_badge_offline_color")}
            ${this._renderColorInput("Offline Badge Border Color", this._config.vpn_badge_offline_border_color, "vpn_badge_offline_border_color")}
          </div>
        </div>

        <div class="sub-header">Firewall</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.firewall_entity || ""}
          .label=${"Firewall Entity"}
          @value-changed=${(e) => this._valueChanged(e, "firewall_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderSecurityTargetSelect(firewallTarget, "firewall_target")}

        ${targetWarning(firewallTarget)
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(firewallTarget)}</p>`
          : null}

        <div class="toggle-row">
          <span>Animate when Offline</span>
          <ha-switch
            .checked=${this._config.firewall_animate_offline ?? false}
            @change=${(e) => this._valueChanged(e, "firewall_animate_offline")}
          ></ha-switch>
        </div>

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.firewall_badge_icon || "mdi:wall-fire"}
          @value-changed=${(e) => this._valueChanged(e, "firewall_badge_icon")}
        ></ha-icon-picker>

        ${this._renderLocationSelect(this._config.firewall_badge_location, "firewall_badge_location")}

        <div class="two-col">
          <div>
            ${this._renderColorInput("Badge Icon Color", this._config.firewall_badge_icon_color, "firewall_badge_icon_color")}
            ${this._renderColorInput("Badge Background Color", this._config.firewall_badge_color, "firewall_badge_color")}
            ${this._renderColorInput("Badge Border Color", this._config.firewall_badge_border_color, "firewall_badge_border_color")}
          </div>
          <div>
            ${this._renderColorInput("Offline Badge Icon Color", this._config.firewall_badge_offline_icon_color, "firewall_badge_offline_icon_color")}
            ${this._renderColorInput("Offline Badge Background Color", this._config.firewall_badge_offline_color, "firewall_badge_offline_color")}
            ${this._renderColorInput("Offline Badge Border Color", this._config.firewall_badge_offline_border_color, "firewall_badge_offline_border_color")}
          </div>
        </div>

        ${this._infoHeader(
          "Auto-Discovery (pfSense: Firewall & VPN)",
          "From the hass-pfsense integration: VPN gateways and OpenVPN / IPsec / WireGuard service switches (VPN status), OpenVPN server connected-client counts (the badge's peers count), and filter-rule switches (Firewall). Each is applied to its own field, so pick a status and a client count separately. pfSense only exposes a client COUNT for OpenVPN, not a list of clients. Its switches and OpenVPN sensors are disabled by default in Home Assistant - enable the ones you want first."
        )}
        <button class="add-btn" @click=${() => this._scanForPfsense()}>
          Scan for pfSense
        </button>
        ${this._pfsenseScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._pfsenseScanMessage}</p>`
          : null}
        ${this._discoveredPfsense !== null ? this._renderDiscoveredPfsenseList() : null}

        ${this._infoHeader(
          "DNS Filtering",
          "e.g. Pi-hole or AdGuard Home - queries blocked, or block percentage. Auto-Discovery (AdGuard Home): finds each AdGuard Home instance's \"queries blocked\" sensor - the same numeric pill this badge is built around."
        )}
        <button class="add-btn" @click=${() => this._scanForAdGuard()}>
          Scan for AdGuard Home
        </button>
        ${this._adguardScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._adguardScanMessage}</p>`
          : null}
        ${this._discoveredAdGuard !== null ? this._renderDiscoveredAdGuardList() : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.dns_entity || ""}
          .label=${"DNS Filtering Entity"}
          @value-changed=${(e) => this._valueChanged(e, "dns_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderSecurityTargetSelect(dnsTarget, "dns_target")}

        ${targetWarning(dnsTarget)
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(dnsTarget)}</p>`
          : null}

        ${this._renderInput("Unit (Optional)", this._config.dns_unit, "dns_unit")}

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.dns_badge_icon || "mdi:shield-check"}
          @value-changed=${(e) => this._valueChanged(e, "dns_badge_icon")}
        ></ha-icon-picker>

        ${this._renderLocationSelect(this._config.dns_badge_location, "dns_badge_location")}

        <div class="select-field">
          <label class="input-label">Badge Color</label>
          <select
            class="native-select"
            .value=${this._config.dns_color_mode || "single"}
            @change=${(e) => this._handleSelectChange(e, "dns_color_mode")}
          >
            <option value="single">Single color</option>
            <option value="threshold">Threshold colors</option>
          </select>
        </div>

        ${this._config.dns_color_mode === "threshold"
          ? (() => {
              const thresholds = this._config.dns_thresholds || [];
              return thresholds.map((t, i) => {
                const isCatchAll = i === thresholds.length - 1;
                return b`
                  <div class="two-col">
                    ${isCatchAll
                      ? b`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                      : this._renderInput(
                          `Up to${this._config.dns_unit ? ` (${this._config.dns_unit})` : ""}`,
                          t.up_to,
                          `dns_thresholds.${i}.up_to`,
                          "number"
                        )}
                    ${this._renderColorInput("Color", t.color, `dns_thresholds.${i}.color`)}
                  </div>
                `;
              });
            })()
          : this._renderColorInput("Badge Color", this._config.dns_badge_color, "dns_badge_color")}

        ${this._config.dns_color_mode === "threshold"
          ? b`
              <div class="toggle-row">
                <span>Animate when above top threshold</span>
                <ha-switch
                  .checked=${this._config.dns_animate_over_threshold ?? false}
                  @change=${(e) => this._valueChanged(e, "dns_animate_over_threshold")}
                ></ha-switch>
              </div>
            `
          : null}

        ${this._renderColorInput("Text Color", this._config.dns_text_color, "dns_text_color")}

        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          If the entity above is a binary_sensor or switch rather than
          a number, the badge shows the icon only, using the color
          below when off (the settings above still apply for numeric
          entities).
        </p>
        ${this._renderColorInput("Offline Badge Color", this._config.dns_badge_offline_color, "dns_badge_offline_color")}

        ${this._infoHeader("Reverse Proxy", "e.g. Nginx Proxy Manager, Caddy, Traefik - up/down status.")}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.reverse_proxy_entity || ""}
          .label=${"Reverse Proxy Entity"}
          @value-changed=${(e) => this._valueChanged(e, "reverse_proxy_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderSecurityTargetSelect(reverseProxyTarget, "reverse_proxy_target")}

        ${targetWarning(reverseProxyTarget)
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(reverseProxyTarget)}</p>`
          : null}

        <div class="toggle-row">
          <span>Animate when Offline</span>
          <ha-switch
            .checked=${this._config.reverse_proxy_animate_offline ?? false}
            @change=${(e) => this._valueChanged(e, "reverse_proxy_animate_offline")}
          ></ha-switch>
        </div>

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.reverse_proxy_badge_icon || "mdi:server-network"}
          @value-changed=${(e) => this._valueChanged(e, "reverse_proxy_badge_icon")}
        ></ha-icon-picker>

        ${this._renderLocationSelect(this._config.reverse_proxy_badge_location, "reverse_proxy_badge_location")}

        <div class="two-col">
          <div>
            ${this._renderColorInput("Badge Icon Color", this._config.reverse_proxy_badge_icon_color, "reverse_proxy_badge_icon_color")}
            ${this._renderColorInput("Badge Background Color", this._config.reverse_proxy_badge_color, "reverse_proxy_badge_color")}
            ${this._renderColorInput("Badge Border Color", this._config.reverse_proxy_badge_border_color, "reverse_proxy_badge_border_color")}
          </div>
          <div>
            ${this._renderColorInput("Offline Badge Icon Color", this._config.reverse_proxy_badge_offline_icon_color, "reverse_proxy_badge_offline_icon_color")}
            ${this._renderColorInput("Offline Badge Background Color", this._config.reverse_proxy_badge_offline_color, "reverse_proxy_badge_offline_color")}
            ${this._renderColorInput("Offline Badge Border Color", this._config.reverse_proxy_badge_offline_border_color, "reverse_proxy_badge_offline_border_color")}
          </div>
        </div>
      </div>
    `;
  }

  _renderAccessPointsPage() {
    if (this._editingApIndex !== null) {
      return this._renderApEditor(this._editingApIndex);
    }

    const nodes = this._config.nodes || [];
    const hasTree = nodes.some((n) => !!n.switch);
    const kindOrdinals = this._buildKindOrdinals();
    return b`
      <div class="form-section">
        ${hasTree
          ? b`
              <div class="tree-toolbar">
                <button class="tree-tool-btn" @click=${() => this._expandAll()}>Expand all</button>
                <button class="tree-tool-btn" @click=${() => this._collapseAll()}>Collapse all</button>
              </div>
            `
          : null}
        ${nodes.map((node, idx) => {
          const isSwitchNode = !!node.switch;
          const isHomelabNode = !!node.homelab;
          const ap = node.access_points?.[0] || {};
          const hasPrimary = (node.access_points || []).some((a) => a.is_primary);
          const displayIcon = isSwitchNode
            ? (node.switch.icon || "mdi:switch")
            : isHomelabNode
            ? (node.homelab.icon || "mdi:server")
            : (ap.icon || "mdi:wifi");
          const baseLabel = node.name || (isSwitchNode
            ? (node.switch.name || node.switch.entity)
            : isHomelabNode
            ? (node.homelab.name || node.homelab.entity || "Server")
            : (ap.name || ap.entity)) || `Node ${idx + 1}`;
          const label = hasPrimary ? `${baseLabel} (Primary)` : baseLabel;
          const isApNode = !isSwitchNode && !isHomelabNode;
          // A plain Access Point Node IS its first Access Point, so what it
          // feeds hangs off that AP.
          const holderPath = isApNode ? `nodes.${idx}.access_points.0` : `nodes.${idx}`;
          const holder = isApNode ? (node.access_points?.[0] || {}) : node;
          const expandable = isSwitchNode || isApNode;
          const expanded = expandable && this._expanded.has(holderPath);
          const below = expandable ? this._countBelow(holder) : 0;
          const statusEntity = isSwitchNode ? node.switch.entity : isHomelabNode ? node.homelab.entity : ap.entity;
          return b`
            <div class="tree-node">
              <div class="tree-card">
                <div class="tree-card-header tree-item">
                  <div class="list-item-info">
                    ${expandable ? this._treeChevron(holderPath, expanded) : b`<span class="tree-chevron-spacer"></span>`}
                    ${this._statusDot(statusEntity)}
                    <ha-icon .icon=${displayIcon} style="color:${hasPrimary ? 'var(--accent-color)' : 'var(--primary-color)'};"></ha-icon>
                    <span class="tree-label">${label}</span>
                    ${below ? b`<span class="tree-count" title="Clients below this Switch">${below}</span>` : null}
                  </div>
                  <div class="list-item-actions">
                    <ha-icon-button
                      @click=${() => this._moveAp(idx, -1)}
                      .disabled=${idx === 0}
                      title="Move up"
                    >
                      <ha-icon icon="mdi:arrow-up"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      @click=${() => this._moveAp(idx, 1)}
                      .disabled=${idx === nodes.length - 1}
                      title="Move down"
                    >
                      <ha-icon icon="mdi:arrow-down"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      @click=${() => { this._editingChildPath = []; this._editingApIndex = idx; }}
                      title="Edit"
                    >
                      <ha-icon icon="mdi:pencil"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      @click=${() => this._removeAp(idx)}
                      title="Delete"
                    >
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
                ${this._renderAddRow(holderPath, isHomelabNode)}
              </div>
              ${expanded ? this._renderTreeChildren(holderPath, holder, kindOrdinals) : null}
            </div>
          `;
        })}
        <div class="add-node-row">
          <button class="add-btn" @click=${() => this._addNodeAs("ap")}>+ Add AP</button>
          <button class="add-btn" @click=${() => this._addNodeAs("switch")}>+ Add Switch</button>
          <button class="add-btn" @click=${() => this._addNodeAs("homelab")}>+ Add Server</button>
        </div>

        ${this._infoHeader(
          "Auto-Discovery",
          "Scans TP-Link Deco (satellite units, added as Access Point nodes), Proxmox VE (physical/cluster nodes, added as Server nodes with their VMs/Containers attached automatically), AsusRouter AiMesh (satellite units, added as Access Point nodes), FRITZ! repeaters and mesh units (added as Access Point nodes), and UniFi/Omada (their switches and access points - including via the UniFi Network Map and UniFi Device Info community integrations) in one pass. Where UniFi reports which switch/AP a device is plugged into and that parent is already in your tree, \"Add as\" defaults to placing it there. Nothing is added automatically; filter and select which ones you want below, and choose whether each candidate becomes its own new Node or attaches under any Switch or Access Point you've already configured, at any depth."
        )}
        <button class="add-btn" @click=${() => this._scanForNodes()}>
          Scan for Nodes
        </button>
        ${this._nodeScanMessage
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._nodeScanMessage}</p>`
          : null}
        ${this._discoveredNodes !== null ? this._renderDiscoveredNodesList() : null}
      </div>
    `;
  }

  _setNodeType(index, type) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[index];
    if (!node) return;
    if (type === "switch") {
      nodes[index] = {
        ...node,
        switch: node.switch || { ...DEFAULT_NODE_SWITCH },
        homelab: null,
        access_points: []
      };
    } else if (type === "homelab") {
      nodes[index] = {
        ...node,
        switch: null,
        homelab: node.homelab || { ...DEFAULT_HOMELAB },
        access_points: []
      };
    } else {
      nodes[index] = {
        ...node,
        switch: null,
        homelab: null,
        access_points: node.access_points && node.access_points.length
          ? node.access_points
          : [{ ...DEFAULT_ACCESS_POINT }]
      };
    }
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _setPrimaryAp(index, apIndex, value) {
    this._setPrimaryApAt(`nodes.${index}.access_points.${apIndex}`, value);
  }

  // Only one Access Point can be Primary, wherever it sits in the tree -
  // clear the flag on every AP under every Node and fed Switch first,
  // then set it on the one at `prefix`.
  _setPrimaryApAt(prefix, value) {
    const clearHolder = (holder) => ({
      ...holder,
      ...(holder.access_points ? { access_points: holder.access_points.map((ap) => ({ ...clearHolder(ap), is_primary: false })) } : {}),
      ...(holder.fed_switches ? { fed_switches: holder.fed_switches.map(clearHolder) } : {})
    });
    const nodes = (this._config.nodes || []).map(clearHolder);
    this._config = setPathValue({ ...this._config, nodes }, `${prefix}.is_primary`, !!value);
    this._fireChanged();
  }

  _renderApEditor(index) {
    const node = this._config.nodes[index] || DEFAULT_NODE;
    const isSwitchNode = !!node.switch;
    const isHomelabNode = !!node.homelab;

    if (this._editingChildPath.length) {
      return b`
        <div class="form-section">
          ${this._renderBreadcrumb(index)}
          ${this._renderChildEditor(index)}
        </div>
      `;
    }

    if (isHomelabNode && this._editingContainerIndex !== null) {
      return b`
        <div class="form-section">
          ${this._renderContainerFields(index, node, this._editingContainerIndex)}
        </div>
      `;
    }

    return b`
      <div class="form-section">
        <div class="select-field">
          <label class="input-label">Node Type</label>
          <select
            class="native-select"
            .value=${isSwitchNode ? "switch" : isHomelabNode ? "homelab" : "ap"}
            @change=${(e) => this._setNodeType(index, e.target.value)}
          >
            <option value="ap">Access Point</option>
            <option value="switch">Switch</option>
            <option value="homelab">Server</option>
          </select>
        </div>

        ${this._renderInput("Node Name Override (Optional)", node.name, `nodes.${index}.name`)}

        ${isSwitchNode
          ? this._renderSwitchNodeFields(index, node)
          : isHomelabNode
          ? this._renderHomelabFields(index, node)
          : this._renderApNodeFields(index, node)}
      </div>
    `;
  }

  _renderSwitchNodeFields(index, node) {
    const sw = node.switch || DEFAULT_NODE_SWITCH;
    const prefix = `nodes.${index}.switch`;
    const c = sw.colors || {};

    return b`
      <div class="sub-header">Switch</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name", sw.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.icon || "mdi:switch"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
      ></ha-icon-picker>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
          ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
          ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
        </div>
      </div>

      ${this._renderDeviceIpField(prefix, sw)}

      ${this._renderPoeSection(sw.poe, `${prefix}.poe`)}

      ${this._renderChildLists(`nodes.${index}`, node)}

      <div class="sub-header">Connected Clients</div>
      ${this._renderFeedsNote(node)}
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entities?.connected_devices || ""}
        .label=${"Entity (Optional)"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
        allow-custom-entity
      ></ha-entity-picker>

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.devices_icon || "mdi:devices"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.devices_icon`)}
      ></ha-icon-picker>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Border Color", c.devices_circle, `${prefix}.colors.devices_circle`)}
          ${this._renderColorInput("Icon Color", c.devices_icon, `${prefix}.colors.devices_icon`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, `${prefix}.colors.devices_offline_circle`)}
          ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, `${prefix}.colors.devices_offline_icon`)}
        </div>
      </div>
    `;
  }

  // ---- Tier tree -------------------------------------------------------
  // Every Switch - a Node's own, or a fed Switch - is a "holder": it keeps
  // its children in `access_points` and `fed_switches`, and every fed
  // Switch is itself a holder, to any depth. A holder is addressed by its
  // config path (`nodes.0`, `nodes.0.fed_switches.1`, ...), which is also
  // the key its expanded/collapsed state is stored under.

  _entityStatus(entityId) {
    if (!entityId) return "none";
    return isEntityUnavailable(this.hass, entityId) ? "offline" : "online";
  }

  _statusDot(entityId) {
    const status = this._entityStatus(entityId);
    const title = status === "none" ? "No entity set" : status === "offline" ? "Offline / unavailable" : "Online";
    return b`<span class="status-dot ${status}" title=${title}></span>`;
  }

  _treeLabel(cfg, fallback) {
    if (!cfg) return fallback;
    return cfg.name || this.hass?.states?.[cfg.entity]?.attributes?.friendly_name || cfg.entity || fallback;
  }

  // Where a Node's own page lives in the config. A Switch or Homelab Node is
  // the Node itself; a plain Access Point Node IS its first Access Point, so
  // whatever it feeds hangs off that AP.
  _baseFor(nodeIndex) {
    const node = (this._config.nodes || [])[nodeIndex];
    return node && !node.switch && !node.homelab ? `nodes.${nodeIndex}.access_points.0` : `nodes.${nodeIndex}`;
  }

  // What sits below a Node, whatever its type.
  _nodeBelow(node) {
    if (node.switch) return this._countBelow(node);
    if (node.homelab) return 0;
    return this._countBelow((node.access_points || [])[0] || {});
  }

  // Everything hanging beneath a holder, at every depth.
  _countBelow(holder) {
    let n = (holder.homelabs || []).length;
    (holder.access_points || []).forEach((ap) => {
      n += 1 + this._countBelow(ap);
    });
    (holder.fed_switches || []).forEach((sw) => {
      n += 1 + this._countBelow(sw);
    });
    return n;
  }

  _allHolderPaths() {
    const out = [];
    const walk = (path, sw) => {
      out.push(path);
      (sw.access_points || []).forEach((a, i) => walk(`${path}.access_points.${i}`, a));
      (sw.fed_switches || []).forEach((f, i) => walk(`${path}.fed_switches.${i}`, f));
    };
    (this._config.nodes || []).forEach((node, i) => {
      if (node.switch) walk(`nodes.${i}`, node);
      else if (!node.homelab && node.access_points?.[0]) walk(`nodes.${i}.access_points.0`, node.access_points[0]);
    });
    return out;
  }

  _expandAll() {
    this._expanded = new Set(this._allHolderPaths());
  }

  _collapseAll() {
    this._expanded = new Set();
  }

  _toggleExpanded(path) {
    const next = new Set(this._expanded);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    this._expanded = next;
  }

  // Re-key expanded state after Nodes are reordered or removed
  // (fn maps an old Node index to its new one, or null to drop it).
  _remapExpandedNodes(fn) {
    const next = new Set();
    this._expanded.forEach((key) => {
      const m = /^nodes\.(\d+)(.*)$/.exec(key);
      if (!m) return;
      const mapped = fn(parseInt(m[1], 10));
      if (mapped !== null) next.add(`nodes.${mapped}${m[2]}`);
    });
    this._expanded = next;
  }

  _treeChevron(path, expanded) {
    return b`
      <ha-icon-button
        class="tree-chevron"
        @click=${() => this._toggleExpanded(path)}
        title=${expanded ? "Collapse" : "Expand"}
      >
        <ha-icon .icon=${expanded ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
      </ha-icon-button>
    `;
  }

  // ["fed_switches.1", "access_points.0"] style path (relative to the
  // Node) for the child `key.idx` of the holder at `holderPath`.
  _childSegments(holderPath, key, idx) {
    const base = this._baseFor(parseInt(holderPath.split(".")[1], 10));
    const rest = (holderPath.startsWith(base) ? holderPath.slice(base.length).split(".").filter(Boolean) : holderPath.split(".").slice(2));
    const segs = [];
    for (let i = 0; i < rest.length; i += 2) segs.push(`${rest[i]}.${rest[i + 1]}`);
    segs.push(`${key}.${idx}`);
    return segs;
  }

  _openChild(holderPath, key, idx) {
    this._editingApIndex = parseInt(holderPath.split(".")[1], 10);
    this._editingContainerIndex = null;
    this._editingChildPath = this._childSegments(holderPath, key, idx);
  }

  _addChildTo(holderPath, key) {
    const nodeMatch = /^nodes\.(\d+)$/.exec(holderPath);
    if (nodeMatch) this._convertToSwitchNode(parseInt(nodeMatch[1], 10));
    const holder = this._getAtPath(holderPath);
    if (!holder) return;
    const base = key === "access_points" ? DEFAULT_ACCESS_POINT : key === "homelabs" ? DEFAULT_HOMELAB : DEFAULT_NODE_SWITCH;
    const next = [...(holder[key] || []), JSON.parse(JSON.stringify(base))];
    this._config = setPathValue(this._config, `${holderPath}.${key}`, next);
    this._expanded = new Set(this._expanded).add(holderPath);
    this._fireChanged();
  }

  _removeChildFrom(holderPath, key, idx) {
    const holder = this._getAtPath(holderPath);
    if (!holder) return;
    const target = (holder[key] || [])[idx];
    const below = target && key !== "homelabs" ? this._countBelow(target) : 0;
    if (below && !window.confirm(`Delete this and the ${below} device${below === 1 ? "" : "s"} below it?`)) return;
    const next = (holder[key] || []).filter((_, i) => i !== idx);
    this._config = setPathValue(this._config, `${holderPath}.${key}`, next);
    // Sibling indices just shifted, so anything expanded beneath this
    // holder is collapsed rather than left pointing at the wrong Switch.
    this._expanded = new Set([...this._expanded].filter((k) => k === holderPath || !k.startsWith(`${holderPath}.`)));
    this._fireChanged();
  }

  // One row per Access Point / fed Switch below `holder`, then the add
  // buttons. Fed Switches expand in place, so the whole tree can be read
  // without opening each element.

  // One pass over the whole Nodes tree, assigning each Access Point,
  // fed Switch, and Server a sequential number in the same order the
  // tree renders them (depth-first: a holder's own Access Points, then
  // its fed Switches, then its Servers, before moving to the next
  // sibling) - independent of which parent it sits under, so a brand
  // new blank Switch continues the count ("Switch 3") instead of
  // restarting at 1 just because it's nested under "Switch 1" rather
  // than sitting beside it. Keyed by config path; recomputed fresh on
  // every render, so it's always in sync with the current config,
  // including a node just added.
  _buildKindOrdinals() {
    const ap = new Map();
    const sw = new Map();
    const hl = new Map();
    let apN = 0;
    let swN = 0;
    let hlN = 0;
    // Pass 1: every top-level Node's own Switch/Access Point reserves the
    // next number in its sequence FIRST, in Node order - so "two Switches
    // in tier 1" really does mean slots 1 and 2 are taken before anything
    // nested gets counted, whichever of them it's nested under.
    const holders = [];
    (this._config.nodes || []).forEach((node, i) => {
      if (node.switch) {
        sw.set(`nodes.${i}`, ++swN);
        holders.push([`nodes.${i}`, node]);
      } else if (!node.homelab && node.access_points?.[0]) {
        ap.set(`nodes.${i}.access_points.0`, ++apN);
        holders.push([`nodes.${i}.access_points.0`, node.access_points[0]]);
      }
    });
    // Pass 2: walk each top-level holder's own descendants depth-first,
    // continuing the same counters - one holder's whole subtree before
    // moving to the next, which is what "continue the numbering" means
    // once the top tier itself is already spoken for.
    const walk = (path, holder) => {
      (holder.access_points || []).forEach((a, i) => {
        const p = `${path}.access_points.${i}`;
        ap.set(p, ++apN);
        walk(p, a);
      });
      (holder.fed_switches || []).forEach((s, i) => {
        const p = `${path}.fed_switches.${i}`;
        sw.set(p, ++swN);
        walk(p, s);
      });
      (holder.homelabs || []).forEach((h, i) => {
        hl.set(`${path}.homelabs.${i}`, ++hlN);
      });
    };
    holders.forEach(([path, holder]) => walk(path, holder));
    return { ap, sw, hl };
  }

  _renderTreeChildren(holderPath, holder, kindOrdinals = this._buildKindOrdinals()) {
    const aps = holder.access_points || [];
    const feds = holder.fed_switches || [];
    const homelabs = holder.homelabs || [];
    if (!aps.length && !feds.length && !homelabs.length) return null;
    return b`
      <div class="tree-children">
        ${aps.map((ap, i) => {
          const path = `${holderPath}.access_points.${i}`;
          const expanded = this._expanded.has(path);
          const below = this._countBelow(ap);
          return b`
            <div class="tree-node">
              <div class="tree-card">
                <div class="tree-card-header tree-item">
                  <div class="list-item-info">
                    ${this._treeChevron(path, expanded)}
                    ${this._statusDot(ap.entity)}
                    <ha-icon .icon=${ap.icon || "mdi:wifi"} style="color:${ap.is_primary ? "var(--accent-color)" : "var(--primary-color)"};"></ha-icon>
                    <span class="tree-label">${this._treeLabel(ap, `AP ${kindOrdinals.ap.get(path) ?? i + 1}`)}${ap.is_primary ? " (Primary)" : ""}</span>
                    ${below ? b`<span class="tree-count" title="Clients below this Access Point">${below}</span>` : null}
                  </div>
                  <div class="list-item-actions">
                    <ha-icon-button @click=${() => this._moveChild(holderPath, "access_points", i, -1)} .disabled=${i === 0} title="Move up">
                      <ha-icon icon="mdi:arrow-up"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button @click=${() => this._moveChild(holderPath, "access_points", i, 1)} .disabled=${i === aps.length - 1} title="Move down">
                      <ha-icon icon="mdi:arrow-down"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button @click=${() => this._openChild(holderPath, "access_points", i)} title="Edit">
                      <ha-icon icon="mdi:pencil"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button @click=${() => this._removeChildFrom(holderPath, "access_points", i)} title="Delete">
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
                ${this._renderAddRow(path)}
              </div>
              ${expanded ? this._renderTreeChildren(path, ap, kindOrdinals) : null}
            </div>
          `;
        })}
        ${feds.map((sw, i) => {
          const path = `${holderPath}.fed_switches.${i}`;
          const expanded = this._expanded.has(path);
          const below = this._countBelow(sw);
          return b`
            <div class="tree-node">
              <div class="tree-card">
                <div class="tree-card-header tree-item">
                  <div class="list-item-info">
                    ${this._treeChevron(path, expanded)}
                    ${this._statusDot(sw.entity)}
                    <ha-icon .icon=${sw.icon || "mdi:switch"} style="color:var(--primary-color);"></ha-icon>
                    <span class="tree-label">${this._treeLabel(sw, `Switch ${kindOrdinals.sw.get(path) ?? i + 1}`)}</span>
                    ${below ? b`<span class="tree-count" title="Clients below this Switch">${below}</span>` : null}
                  </div>
                  <div class="list-item-actions">
                    <ha-icon-button @click=${() => this._moveChild(holderPath, "fed_switches", i, -1)} .disabled=${i === 0} title="Move up">
                      <ha-icon icon="mdi:arrow-up"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button @click=${() => this._moveChild(holderPath, "fed_switches", i, 1)} .disabled=${i === feds.length - 1} title="Move down">
                      <ha-icon icon="mdi:arrow-down"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button @click=${() => this._openChild(holderPath, "fed_switches", i)} title="Edit">
                      <ha-icon icon="mdi:pencil"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button @click=${() => this._removeChildFrom(holderPath, "fed_switches", i)} title="Delete">
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
                ${this._renderAddRow(path)}
              </div>
              ${expanded ? this._renderTreeChildren(path, sw, kindOrdinals) : null}
            </div>
          `;
        })}
        ${homelabs.map((hl, i) => {
          return b`
            <div class="list-item tree-item">
              <div class="list-item-info">
                <span class="tree-chevron-spacer"></span>
                ${this._statusDot(hl.entity)}
                <ha-icon .icon=${hl.icon || "mdi:server"} style="color:var(--primary-color);"></ha-icon>
                <span class="tree-label">${this._treeLabel(hl, `Server ${kindOrdinals.hl.get(`${holderPath}.homelabs.${i}`) ?? i + 1}`)}</span>
              </div>
              <div class="list-item-actions">
                <ha-icon-button @click=${() => this._moveChild(holderPath, "homelabs", i, -1)} .disabled=${i === 0} title="Move up">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._moveChild(holderPath, "homelabs", i, 1)} .disabled=${i === homelabs.length - 1} title="Move down">
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._openChild(holderPath, "homelabs", i)} title="Edit">
                  <ha-icon icon="mdi:pencil"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeChildFrom(holderPath, "homelabs", i)} title="Delete">
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  // "+ Access Point / + Switch / + Homelab", shown directly under the Switch
  // they add to. Under a Node that is not a Switch yet (a plain Access Point
  // or a Homelab) they put a new Switch above it first - see _addChildTo.
  _renderAddRow(holderPath, viaNewSwitch = false, allowAp = true) {
    return b`
      <div class="tree-add-row">
        ${viaNewSwitch ? b`<span class="tree-add-hint">Under a new Switch:</span>` : null}
        ${allowAp ? b`<button class="tree-add-btn" @click=${() => this._addChildTo(holderPath, "access_points")}>+ Access Point</button>` : null}
        <button class="tree-add-btn" @click=${() => this._addChildTo(holderPath, "fed_switches")}>+ Switch</button>
        <button class="tree-add-btn" @click=${() => this._addChildTo(holderPath, "homelabs")}>+ Server</button>
      </div>
    `;
  }

  // Turns a plain Access Point / Homelab Node into a Switch Node without
  // losing anything: what it was becomes the first device under the new
  // Switch. A blank placeholder (nothing configured yet) is just dropped.
  _convertToSwitchNode(idx) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[idx];
    if (!node || node.switch) return;
    const blank = (o) => !o || (!o.entity && !o.name);
    const keptAps = node.homelab ? [] : (node.access_points || []).filter((ap) => !blank(ap));
    const keptHomelabs = node.homelab && !blank(node.homelab) ? [node.homelab] : [];
    nodes[idx] = {
      ...node,
      switch: JSON.parse(JSON.stringify(DEFAULT_NODE_SWITCH)),
      homelab: null,
      access_points: keptAps,
      ...(keptHomelabs.length ? { homelabs: keptHomelabs } : {})
    };
    this._config = { ...this._config, nodes };
  }

  // The Access Points / Fed Switches lists on a Switch's own page - the
  // same for a Node's Switch and for any fed Switch.
  _renderChildLists(holderPath, holder, noun = "Switch") {
    const aps = holder.access_points || [];
    const feds = holder.fed_switches || [];
    const homelabs = holder.homelabs || [];
    // An Access Point can feed further Access Points too (a wireless
    // mesh, say), alongside Switches and Servers - the list always
    // shows, the same as it does on a Switch's own page.
    const showAps = true;
    return b`
      ${showAps ? b`
      ${this._infoHeader("Access Points", `Access Points added here hang off this ${noun}'s own connector line.`)}
      ${aps.map((ap, i) => b`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${ap.icon || "mdi:wifi"} style="color:var(--primary-color);"></ha-icon>
            <span>${ap.name || ap.entity || `AP ${i + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button @click=${() => this._openChild(holderPath, "access_points", i)} title="Edit">
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this._removeChildFrom(holderPath, "access_points", i)} title="Delete">
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addChildTo(holderPath, "access_points")}>
        + Add Access Point
      </button>
      ` : null}

      ${this._infoHeader(
        "Fed Switches",
        noun === "Switch"
          ? "Switches added here hang off this Switch too, in the same row as its Access Points. A fed Switch can feed its own Access Points, Switches and Servers in turn, to any depth."
          : "Switches added here hang off this Access Point, in the row below it. A fed Switch can feed its own Access Points, Switches and Servers in turn, to any depth."
      )}
      ${feds.map((sw, i) => b`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${sw.icon || "mdi:switch"} style="color:var(--primary-color);"></ha-icon>
            <span>${sw.name || sw.entity || `Switch ${i + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button @click=${() => this._openChild(holderPath, "fed_switches", i)} title="Edit">
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this._removeChildFrom(holderPath, "fed_switches", i)} title="Delete">
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addChildTo(holderPath, "fed_switches")}>
        + Add Switch
      </button>

      ${this._infoHeader(
        "Servers",
        `Servers added here hang off this ${noun} too. Each keeps its own Containers/VMs, PoE and Connected Clients, and shows any Security badges targeted at Server.`
      )}
      ${homelabs.map((hl, i) => b`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${hl.icon || "mdi:server"} style="color:var(--primary-color);"></ha-icon>
            <span>${hl.name || hl.entity || `Server ${i + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button @click=${() => this._openChild(holderPath, "homelabs", i)} title="Edit">
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${() => this._removeChildFrom(holderPath, "homelabs", i)} title="Delete">
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addChildTo(holderPath, "homelabs")}>
        + Add Server
      </button>
    `;
  }

  // A Switch that feeds other devices has no free row for its own
  // Connected Clients circle, so say so instead of silently ignoring it.
  _renderFeedsNote(holder, isAp = false) {
    const feeds = (holder.access_points || []).length + (holder.fed_switches || []).length + (holder.homelabs || []).length;
    if (isAp) {
      // An Access Point that feeds other devices gets its own dotted line down
      // to the Clients box, and its Connected Clients circle hangs off that.
      return feeds
        ? b`<p class="tree-note">Because this Access Point feeds other devices, its Connected Clients circle hangs off its own dotted line beside them, running down to the Clients box.</p>`
        : null;
    }
    return feeds
      ? b`<p class="tree-note">Not drawn while this feeds other devices - only a device at the end of a branch shows its Connected Clients circle.</p>`
      : null;
  }

  // "D-Link › Workshop PoE › Workshop WiFi" - where the open page sits.
  _renderBreadcrumb(nodeIndex) {
    const node = this._config.nodes?.[nodeIndex] || {};
    const parts = [node.name || node.switch?.name || node.switch?.entity || this._treeLabel(node.access_points?.[0], `Node ${nodeIndex + 1}`)];
    let prefix = this._baseFor(nodeIndex);
    this._editingChildPath.forEach((seg) => {
      prefix += `.${seg}`;
      parts.push(this._treeLabel(this._getAtPath(prefix), seg.startsWith("access_points") ? "Access Point" : seg.startsWith("homelabs") ? "Server" : "Switch"));
    });
    return b`<div class="tree-breadcrumb">${parts.join(" › ")}</div>`;
  }

  _renderChildEditor(nodeIndex) {
    const prefix = `${this._baseFor(nodeIndex)}.${this._editingChildPath.join(".")}`;
    const last = this._editingChildPath[this._editingChildPath.length - 1] || "";
    if (last.startsWith("homelabs")) {
      return this._editingContainerIndex !== null
        ? this._renderContainerFieldsAt(`${prefix}.containers.${this._editingContainerIndex}`)
        : this._renderHomelabFieldsAt(prefix);
    }
    return last.startsWith("access_points")
      ? this._renderApFieldsAt(prefix)
      : this._renderFedSwitchFieldsAt(prefix);
  }

  // Container helpers take the config path of the Homelab they act on
  // (`nodes.2.homelab`, or `nodes.1.fed_switches.0.homelabs.0` for one
  // fed by a Switch), so they work the same at every depth.
  _addContainer(hlPath) {
    const hl = this._getAtPath(hlPath);
    if (!hl) return;
    const next = [...(hl.containers || []), JSON.parse(JSON.stringify(DEFAULT_CONTAINER_BADGE))];
    this._config = setPathValue(this._config, `${hlPath}.containers`, next);
    this._fireChanged();
  }

  _removeContainer(hlPath, containerIndex) {
    const hl = this._getAtPath(hlPath);
    if (!hl) return;
    const next = (hl.containers || []).filter((_, i) => i !== containerIndex);
    this._config = setPathValue(this._config, `${hlPath}.containers`, next);
    this._fireChanged();
  }

  // Every Homelab in the diagram - Node-level ones and those fed by a
  // Switch at any depth.
  _allHomelabs() {
    const out = [];
    const walk = (holder) => {
      (holder.homelabs || []).forEach((hl) => out.push(hl));
      (holder.access_points || []).forEach(walk);
      (holder.fed_switches || []).forEach(walk);
    };
    (this._config.nodes || []).forEach((node) => {
      if (node.homelab) out.push(node.homelab);
      walk(node);
    });
    return out;
  }

  // Rebuilds the Nodes with `fn` applied to every Homelab in the tree.
  _mapHomelabs(fn) {
    const mapHolder = (h) => ({
      ...h,
      ...(h.homelab ? { homelab: fn(h.homelab) } : {}),
      ...(h.homelabs ? { homelabs: h.homelabs.map(fn) } : {}),
      ...(h.access_points ? { access_points: h.access_points.map(mapHolder) } : {}),
      ...(h.fed_switches ? { fed_switches: h.fed_switches.map(mapHolder) } : {})
    });
    return (this._config.nodes || []).map(mapHolder);
  }

  // Every container entity already used as a badge, on ANY homelab
  // node - not just the one currently being edited - so the same
  // container can't accidentally end up added twice across two nodes.
  _existingContainerEntities() {
    const existing = new Set();
    this._allHomelabs().forEach((hl) => {
      (hl.containers || []).forEach((c) => c.entity && existing.add(c.entity));
    });
    return existing;
  }

  // Combines Portainer containers and Proxmox VMs/Containers into one
  // flat list - a person adding badges to an existing Homelab node
  // (whether it came from the Nodes page's Proxmox discovery, or was
  // added by hand) shouldn't need to know which integration owns which
  // entity to find them.
  _scanForContainers() {
    this._discoveredContainers = [...scanPortainerContainers(this.hass), ...scanProxmoxContainers(this.hass)];
    this._discoveredContainersSelected = new Set();
    this._discoveredContainersPage = 0;
    this._discoveredContainersFilter = "";
    this._containersScanMessage = this._discoveredContainers.length ? "" : "No Portainer or Proxmox VM/Container entities found.";
    this.requestUpdate();
  }

  _toggleContainerSelection(entityId) {
    const set = new Set(this._discoveredContainersSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredContainersSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllContainers() {
    const existing = this._existingContainerEntities();
    const selectable = (this._discoveredContainers || []).filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredContainersSelected.has(c.entity));
    const next = new Set(this._discoveredContainersSelected);
    selectable.forEach((c) => (allSelected ? next.delete(c.entity) : next.add(c.entity)));
    this._discoveredContainersSelected = next;
    this.requestUpdate();
  }

  _addSelectedContainers(hlPath) {
    const existing = this._existingContainerEntities();
    const toAdd = (this._discoveredContainers || []).filter(
      (c) => this._discoveredContainersSelected.has(c.entity) && !existing.has(c.entity)
    );
    if (!toAdd.length) return;

    const hl = this._getAtPath(hlPath);
    if (!hl) return;

    const newContainers = toAdd.map((c) => ({
      ...DEFAULT_CONTAINER_BADGE,
      entity: c.entity,
      name: c.name,
      icon: PROXMOX_VM_KINDS.has(c.kind) ? "mdi:desktop-tower" : "mdi:docker"
    }));

    this._config = setPathValue(this._config, `${hlPath}.containers`, [...(hl.containers || []), ...newContainers]);
    this._discoveredContainersSelected = new Set();
    this._containersScanMessage = `Added ${newContainers.length} container${newContainers.length === 1 ? "" : "s"}: ${newContainers
      .map((c) => c.name || c.entity)
      .join(", ")}`;
    this._fireChanged();
  }

  // Removes this container/VM badge from WHICHEVER Homelab currently
  // has it, then it becomes selectable again in the scan list, after
  // confirming with the person first.
  _removeDiscoveredContainer(entityId) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    this._config = {
      ...this._config,
      nodes: this._mapHomelabs((hl) => ({
        ...hl,
        containers: (hl.containers || []).filter((c) => c.entity !== entityId)
      }))
    };
    this._containersScanMessage = "Container/VM removed.";
    this._fireChanged();
  }

  _renderDiscoveredContainersList(hlPath) {
    const existing = this._existingContainerEntities();
    const all = this._discoveredContainers || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No Portainer or Proxmox VM/Container entities found.</p>`;
    }
    const sourceLabel = { portainer: "Portainer", proxmoxve: "Proxmox VE" };
    const sources = [...new Set(all.map((c) => c.source))];
    const activeFilter = this._discoveredContainersFilter || "";
    const bySource = activeFilter ? all.filter((c) => c.source === activeFilter) : all;
    const list = this._discoveredContainersSearch ? bySource.filter((c) => this._matchesSearch(c, this._discoveredContainersSearch)) : bySource;

    const selectable = list.filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredContainersSelected.has(c.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredContainersPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredContainersSearch, (e) => { this._discoveredContainersSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length && bySource.length ? this._renderNoSearchMatches() : null}
      ${sources.length > 1
        ? b`
            <div class="toggle-row">
              <span>Filter by integration</span>
              <select
                style="padding:6px 8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color);"
                .value=${activeFilter}
                @change=${(e) => {
                  this._discoveredContainersFilter = e.target.value;
                  this._discoveredContainersPage = 0;
                  this.requestUpdate();
                }}
              >
                <option value="">All (${all.length})</option>
                ${sources.map(
                  (s) => b`<option value=${s}>${sourceLabel[s] || s} (${all.filter((c) => c.source === s).length})</option>`
                )}
              </select>
            </div>
          `
        : null}
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllContainers()}
        ></ha-switch>
      </div>
      ${pageItems.map((c) => {
        const already = existing.has(c.entity);
        const checked = this._discoveredContainersSelected.has(c.entity);
        return b`
          <div class="list-item" style="opacity:1">
            <div class="list-item-info">
              <ha-icon icon="${PROXMOX_VM_KINDS.has(c.kind) ? "mdi:desktop-tower" : "mdi:docker"}"></ha-icon>
              <div>
                <div>${c.name || c.entity}</div>
                <div style="font-size:0.8em; color:var(--secondary-text-color);">
                  ${sourceLabel[c.source] || c.source} &middot; ${c.kind}
                </div>
              </div>
            </div>
            ${already
              ? b`
                  <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeDiscoveredContainer(c.entity)}>
                    Remove
                  </button>
                `
              : b`
                  <ha-icon-button
                    @click=${() => this._toggleContainerSelection(c.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredContainersPage = p;
        this.requestUpdate();
      })}
      <button class="add-btn" .disabled=${!this._discoveredContainersSelected.size} @click=${() => this._addSelectedContainers(hlPath)}>
        Add Selected (${this._discoveredContainersSelected.size})
      </button>
    `;
  }

  // Fields for a fed Switch at any depth. It feeds its own Access Points
  // and Switches through the same lists a Node's Switch has.
  _renderFedSwitchFieldsAt(prefix) {
    const sw = this._getAtPath(prefix) || DEFAULT_NODE_SWITCH;
    const c = sw.colors || {};

    return b`
      <div class="sub-header">Switch</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name", sw.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.icon || "mdi:switch"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
      ></ha-icon-picker>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
          ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
          ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
        </div>
      </div>

      ${this._renderDeviceIpField(prefix, sw)}

      ${this._renderPoeSection(sw.poe, `${prefix}.poe`)}

      ${this._renderChildLists(prefix, sw)}

      <div class="sub-header">Connected Clients</div>
      ${this._renderFeedsNote(sw)}
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entities?.connected_devices || ""}
        .label=${"Entity (Optional)"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
        allow-custom-entity
      ></ha-entity-picker>

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.devices_icon || "mdi:devices"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.devices_icon`)}
      ></ha-icon-picker>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Border Color", c.devices_circle, `${prefix}.colors.devices_circle`)}
          ${this._renderColorInput("Icon Color", c.devices_icon, `${prefix}.colors.devices_icon`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, `${prefix}.colors.devices_offline_circle`)}
          ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, `${prefix}.colors.devices_offline_icon`)}
        </div>
      </div>
    `;
  }

  // Homelab node fields: like a Switch's own fields (entity, icon,
  // colors, Connected Clients), plus PoE and a Containers/VMs list -
  // one status badge per tracked container/VM. DNS Filtering, VPN,
  // Firewall, and Reverse Proxy are configured on the Security page
  // and can each be targeted at this node from there.
  _renderHomelabFields(index, node) {
    return this._renderHomelabFieldsAt(`nodes.${index}.homelab`);
  }

  // A Homelab's fields, addressed by config path so the same page serves
  // a Node-level Homelab and one fed by a Switch at any depth.
  _renderHomelabFieldsAt(hlPath) {
    const hl = this._getAtPath(hlPath) || DEFAULT_HOMELAB;
    const prefix = hlPath;
    const c = hl.colors || {};

    return b`
      <div class="sub-header">Server</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${hl.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name", hl.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Icon"}
        .value=${hl.icon || "mdi:server"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
      ></ha-icon-picker>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
          ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
          ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
        </div>
      </div>

      ${this._renderDeviceIpField(prefix, hl)}

      ${this._renderHomelabCountFields(prefix, hl)}

      ${this._renderPoeSection(hl.poe, `${prefix}.poe`)}

      ${this._renderHomelabSecurity(hlPath, hl)}

      ${this._infoHeader(
        "Containers / VMs",
        "One status badge per tracked container or VM (e.g. Plex, Nextcloud, a Proxmox LXC) - each independently positioned around this circle."
      )}
      ${(hl.containers || []).map((container, ci) => b`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${container.icon || "mdi:docker"} style="color:var(--primary-color);"></ha-icon>
            <span>${container.name || container.entity || `Container ${ci + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button
              @click=${() => (this._editingContainerIndex = ci)}
              title="Edit"
            >
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${() => this._removeContainer(hlPath, ci)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addContainer(hlPath)}>
        + Add Container / VM
      </button>

      ${this._infoHeader(
        "Auto-Discovery (Container/VM)",
        "Scans Portainer (Docker containers) and Proxmox VE (VMs and LXC containers) together and lets you add the ones you want as badges on this node. Already-added containers/VMs (on this node or any other) show a Remove button instead."
      )}
      <button class="add-btn" @click=${() => this._scanForContainers()}>
        Scan for Container/VM
      </button>
      ${this._containersScanMessage
        ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._containersScanMessage}</p>`
        : null}
      ${this._discoveredContainers !== null ? this._renderDiscoveredContainersList(hlPath) : null}

      <div class="sub-header">Connected Clients</div>
      <div class="toggle-row">
        <span>Show connection to Connected/Clients</span>
        <ha-switch
          .checked=${hl.show_devices_line !== false}
          @change=${(e) => this._valueChanged(e, `${prefix}.show_devices_line`)}
        ></ha-switch>
      </div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        Most Server nodes have nothing hanging directly off them - turn
        this off to hide the line down to Connected Clients and the
        shared Clients box entirely.
      </p>

      ${hl.show_devices_line !== false
        ? b`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${hl.entities?.connected_devices || ""}
              .label=${"Entity (Optional)"}
              @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
              allow-custom-entity
            ></ha-entity-picker>

            <ha-icon-picker
              .label=${"Icon"}
              .value=${hl.devices_icon || "mdi:devices"}
              @value-changed=${(e) => this._valueChanged(e, `${prefix}.devices_icon`)}
            ></ha-icon-picker>

            <div class="two-col">
              <div>
                ${this._renderColorInput("Border Color", c.devices_circle, `${prefix}.colors.devices_circle`)}
                ${this._renderColorInput("Icon Color", c.devices_icon, `${prefix}.colors.devices_icon`)}
              </div>
              <div>
                ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, `${prefix}.colors.devices_offline_circle`)}
                ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, `${prefix}.colors.devices_offline_icon`)}
              </div>
            </div>
          `
        : null}
    `;
  }

  _renderApNodeFields(index, node, apIndex = 0) {
    return this._renderApFieldsAt(`nodes.${index}.access_points.${apIndex}`);
  }

  // Fields for an Access Point at any depth, addressed by config path.
  _renderApFieldsAt(prefix) {
    const ap = this._getAtPath(prefix) || DEFAULT_ACCESS_POINT;
    const c = ap.colors || {};

    return b`
        <div class="sub-header">Access Point</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name", ap.name, `${prefix}.name`)}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${ap.icon || "mdi:wifi"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        <div class="toggle-row">
          <span>Primary Access Point</span>
          <ha-switch
            .checked=${!!ap.is_primary}
            @change=${(e) => this._setPrimaryApAt(prefix, e.target.checked)}
          ></ha-switch>
        </div>

        ${ap.is_primary
          ? b`
              <div class="toggle-row">
                <span>Show Primary AP Badge</span>
                <ha-switch
                  .checked=${ap.show_primary_badge !== false}
                  @change=${(e) => this._valueChanged(e, `${prefix}.show_primary_badge`)}
                ></ha-switch>
              </div>
              ${ap.show_primary_badge !== false
                ? b`
                    ${this._renderLocationSelect(ap.primary_badge_location, `${prefix}.primary_badge_location`)}
                    <div class="two-col">
                      <div>
                        ${this._renderColorInput("Background Color", c.primary_badge, `${prefix}.colors.primary_badge`)}
                        ${this._renderColorInput("Icon Color", c.primary_badge_icon, `${prefix}.colors.primary_badge_icon`)}
                      </div>
                      <div>
                        ${this._renderColorInput("Border Color", c.primary_badge_border, `${prefix}.colors.primary_badge_border`)}
                      </div>
                    </div>
                  `
                : null}
            `
          : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.download || ""}
          .label=${"Download Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.download`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.upload || ""}
          .label=${"Upload Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.upload`)}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
            ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
          </div>
        </div>

        ${!ap.is_primary
          ? b`
              <div class="sub-header">Backhaul</div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${ap.entities?.backhaul_type || ""}
                .label=${"Type"}
                @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.backhaul_type`)}
                allow-custom-entity
              ></ha-entity-picker>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${ap.entities?.backhaul_speed || ""}
                .label=${"Speed"}
                @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.backhaul_speed`)}
                allow-custom-entity
              ></ha-entity-picker>
              <div class="toggle-row">
                <span>Show Backhaul Icon</span>
                <ha-switch
                  .checked=${ap.show_backhaul_icon !== false}
                  @change=${(e) => this._valueChanged(e, `${prefix}.show_backhaul_icon`)}
                ></ha-switch>
              </div>
              ${this._renderColorInput("Backhaul Icon Color", c.backhaul_icon, `${prefix}.colors.backhaul_icon`)}
            `
          : null}

        ${this._renderPoeSection(ap.poe, `${prefix}.poe`)}

        ${this._renderChildLists(prefix, ap, "Access Point")}

        ${this._infoHeader(
          "IP Addressing",
          "Shown only when Layout > General > Show IP Addressing is on. IP Address renders centered above this circle."
        )}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.ip_address || ""}
          .label=${"IP Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.ip_address`)}
          allow-custom-entity
        ></ha-entity-picker>
        ${ap.is_primary
          ? b`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${ap.entities?.wan_ip || ""}
                .label=${"WAN Address Entity (if this AP is your router)"}
                @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.wan_ip`)}
                allow-custom-entity
              ></ha-entity-picker>
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Only relevant if this AP doubles as your router/gateway
                with no separate Router node - renders centered below
                the Internet circle, same spot the Router's own WAN
                badge would use.
              </p>
            `
          : null}
        <div class="two-col">
          <div>${this._renderColorInput("Badge Background", ap.ip_badge_color, `${prefix}.ip_badge_color`)}</div>
          <div>${this._renderColorInput("Badge Text Color", ap.ip_badge_icon_color, `${prefix}.ip_badge_icon_color`)}</div>
        </div>

        <div class="sub-header">AP Connected Clients</div>
        ${this._renderFeedsNote(ap, true)}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.connected_devices || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${ap.devices_icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.devices_icon`)}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.devices_circle, `${prefix}.colors.devices_circle`)}
            ${this._renderColorInput("Icon Color", c.devices_icon, `${prefix}.colors.devices_icon`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, `${prefix}.colors.devices_offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, `${prefix}.colors.devices_offline_icon`)}
          </div>
        </div>
    `;
  }

  // Creates a new top-level Node already carrying the right device type,
  // instead of always defaulting to an Access Point. Uses the same deep
  // clone as _addChildTo, rather than a shallow spread, so a later edit
  // to one Node's colors/entities can never leak into the next Node
  // this button creates.
  _addNodeAs(kind) {
    const node = { ...DEFAULT_NODE };
    if (kind === "switch") {
      node.switch = JSON.parse(JSON.stringify(DEFAULT_NODE_SWITCH));
    } else if (kind === "homelab") {
      node.switch = null;
      node.homelab = JSON.parse(JSON.stringify(DEFAULT_HOMELAB));
    } else {
      node.access_points = [JSON.parse(JSON.stringify(DEFAULT_ACCESS_POINT))];
    }
    this._config = { ...this._config, nodes: [...(this._config.nodes || []), node] };
    this._fireChanged();
  }

  // Kept as an alias: "+ Add AP" used to be the only option, called
  // _addAp() with no argument.
  _addAp() {
    this._addNodeAs("ap");
  }

  _removeAp(idx) {
    const target = (this._config.nodes || [])[idx];
    const below = target ? this._nodeBelow(target) : 0;
    if (below && !window.confirm(`Delete this Node and the ${below} device${below === 1 ? "" : "s"} below it?`)) return;
    const nodes = (this._config.nodes || []).filter((_, i) => i !== idx);
    this._remapExpandedNodes((n) => (n === idx ? null : n > idx ? n - 1 : n));
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }


  // Swaps two siblings within the SAME list (access_points, fed_switches,
  // or homelabs) under the same holder, at any depth - the nested
  // equivalent of _moveAp, which only ever reordered top-level Nodes.
  // Only entries in that one list move: Access Points, Fed Switches and
  // Homelab Servers are always drawn as three separate blocks (the
  // diagram itself lists Access Points, then Fed Switches, then Servers
  // under every Switch/AP), so reordering only ever happens within one
  // of those three blocks, never between them.
  _moveChild(holderPath, key, idx, direction) {
    const holder = this._getAtPath(holderPath);
    if (!holder) return;
    const list = [...(holder[key] || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= list.length) return;
    [list[idx], list[newIdx]] = [list[newIdx], list[idx]];
    this._remapExpandedSiblings(`${holderPath}.${key}`, idx, newIdx);
    this._config = setPathValue(this._config, `${holderPath}.${key}`, list);
    this._fireChanged();
  }

  // Keeps the Nodes tree's expand/collapse state pointed at the right
  // element after two siblings under `arrayPrefix` (e.g.
  // "nodes.1.fed_switches") swap places - same idea as
  // _remapExpandedNodes, generalised to any array at any depth. Keys
  // outside `arrayPrefix` (a totally different branch of the tree) are
  // left untouched rather than dropped.
  _remapExpandedSiblings(arrayPrefix, idx, newIdx) {
    const escaped = arrayPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`^${escaped}\\.(\\d+)(.*)$`);
    const next = new Set();
    this._expanded.forEach((key) => {
      const m = re.exec(key);
      if (!m) {
        next.add(key);
        return;
      }
      const i = parseInt(m[1], 10);
      const mapped = i === idx ? newIdx : i === newIdx ? idx : i;
      next.add(`${arrayPrefix}.${mapped}${m[2]}`);
    });
    this._expanded = next;
  }

  _moveAp(idx, direction) {
    const nodes = [...(this._config.nodes || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= nodes.length) return;
    [nodes[idx], nodes[newIdx]] = [nodes[newIdx], nodes[idx]];
    this._remapExpandedNodes((n) => (n === idx ? newIdx : n === newIdx ? idx : n));
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  // --- Auto-Discovery actions (TP-Link + Speedtest) -------------------

  _scanForInternet() {
    this._discoveredSpeedtestServices = scanSpeedtestIntegration(this.hass);
    this._discoveredSpeedtestPage = 0;
    this._internetScanMessage = this._discoveredSpeedtestServices.length
      ? ""
      : "No Speedtest.net or Ookla Speedtest entities found.";
    this.requestUpdate();
  }

  // Which Internet service the Internet page is editing - and so which one
  // the Speedtest Add / Remove buttons act on.
  _activeInternetSlot() {
    return this._internetSlot === "internet_secondary" ? "internet_secondary" : "internet";
  }

  _slotLabel(slot) {
    return slot === "internet_secondary" ? "Secondary" : "Primary";
  }

  _selectSpeedtestService(svc, slot = "internet") {
    const internet = this._config[slot] || {};
    const incoming = { name: svc.isp, ping: svc.ping, jitter: svc.jitter, download: svc.download, upload: svc.upload };
    const existing = {
      name: internet.name,
      ping: internet.entities?.ping,
      jitter: internet.entities?.jitter,
      download: internet.entities?.download,
      upload: internet.entities?.upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing ${this._slotLabel(slot)} Internet ${conflicts.join(", ")} with values from ${svc.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      [slot]: {
        ...internet,
        name: svc.isp || internet.name,
        entities: {
          ...internet.entities,
          ping: svc.ping || internet.entities?.ping,
          jitter: svc.jitter || internet.entities?.jitter,
          download: svc.download || internet.entities?.download,
          upload: svc.upload || internet.entities?.upload
        }
      }
    };
    this._internetScanMessage = `Applied ${svc.name} as ${this._slotLabel(slot)}.`;
    this._fireChanged();
  }

  // A candidate counts as "currently applied" only by its actual entity
  // fields (ping/jitter/download/upload) - not by ISP name, since that's
  // plain text that could've been overwritten by hand or by an ISP-scan
  // candidate afterward, making it an unreliable match signal.
  _isSpeedtestCurrent(svc, slot = "internet") {
    const internet = this._config[slot] || {};
    const pairs = [
      [svc.ping, internet.entities?.ping],
      [svc.jitter, internet.entities?.jitter],
      [svc.download, internet.entities?.download],
      [svc.upload, internet.entities?.upload]
    ].filter(([v]) => v);
    return pairs.length > 0 && pairs.every(([v, cur]) => v === cur);
  }

  _removeSpeedtestSelection(svc, slot = "internet") {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const internet = this._config[slot] || {};
    const entities = { ...internet.entities };
    if (svc.ping && entities.ping === svc.ping) entities.ping = "";
    if (svc.jitter && entities.jitter === svc.jitter) entities.jitter = "";
    if (svc.download && entities.download === svc.download) entities.download = "";
    if (svc.upload && entities.upload === svc.upload) entities.upload = "";
    this._config = { ...this._config, [slot]: { ...internet, entities } };
    this._internetScanMessage = `Speedtest selection removed (${this._slotLabel(slot)}).`;
    this._fireChanged();
  }

  _renderDiscoveredSpeedtestList() {
    const all = this._discoveredSpeedtestServices || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const list = this._discoveredSpeedtestSearch ? all.filter((c) => this._matchesSearch(c, this._discoveredSpeedtestSearch)) : all;
    const perPage = 10;
    const page = Math.min(this._discoveredSpeedtestPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredSpeedtestSearch, (e) => { this._discoveredSpeedtestSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length ? this._renderNoSearchMatches() : null}
      ${internetSecondaryEnabled(this._config) || this._internetSlot === "internet_secondary"
        ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px;">Add / Remove apply to the ${this._slotLabel(this._activeInternetSlot())} Internet - switch between them at the top of the Internet page.</p>`
        : null}
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((svc) => {
          const found = [
            svc.ping && "Ping",
            svc.jitter && "Jitter",
            svc.download && "Download",
            svc.upload && "Upload",
            svc.isp && `ISP: ${svc.isp}`
          ].filter(Boolean);
          return b`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon="mdi:speedometer"></ha-icon>
                <div>
                  <div>${svc.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${SPEEDTEST_PLATFORM_LABELS[svc.platform] || svc.platform}${found.length ? " · " + found.join(", ") : " · no matching fields"}
                  </div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; align-items:stretch;">
                ${[this._activeInternetSlot()].map((slot) =>
                  this._isSpeedtestCurrent(svc, slot)
                    ? b`
                        <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeSpeedtestSelection(svc, slot)}>
                          Remove
                        </button>
                      `
                    : b`
                        <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectSpeedtestService(svc, slot)}>
                          Add
                        </button>
                      `
                )}
              </div>
            </div>
          `;
        })}
      </div>
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredSpeedtestPage = p;
        this.requestUpdate();
      })}
    `;
  }

  _scanForIsp() {
    this._discoveredIspServices = scanIspIntegration(this.hass);
    this._discoveredIspPage = 0;
    this._ispScanMessage = this._discoveredIspServices.length
      ? ""
      : "No Aussie Broadband, Starlink, Start.ca, FRITZ!Box, or pfSense gateway entities found.";
    this.requestUpdate();
  }

  _selectIspService(svc, slot = "internet") {
    const internet = this._config[slot] || {};
    const incoming = {
      entity: svc.connected,
      ping: svc.ping,
      jitter: svc.jitter,
      download: svc.download,
      upload: svc.upload,
      quota_total: svc.quotaTotal,
      quota_remaining: svc.quotaRemaining,
      total_download: svc.totalDownload,
      total_upload: svc.totalUpload
    };
    const existing = {
      entity: internet.entity,
      ping: internet.entities?.ping,
      jitter: internet.entities?.jitter,
      download: internet.entities?.download,
      upload: internet.entities?.upload,
      quota_total: internet.entities?.quota_total,
      quota_remaining: internet.entities?.quota_remaining,
      total_download: internet.entities?.total_download,
      total_upload: internet.entities?.total_upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing ${this._slotLabel(slot)} Internet ${conflicts.join(", ")} with values from ${svc.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      [slot]: {
        ...internet,
        entity: svc.connected || internet.entity,
        entities: {
          ...internet.entities,
          ping: svc.ping || internet.entities?.ping,
          jitter: svc.jitter || internet.entities?.jitter,
          download: svc.download || internet.entities?.download,
          upload: svc.upload || internet.entities?.upload,
          quota_total: svc.quotaTotal || internet.entities?.quota_total,
          quota_remaining: svc.quotaRemaining || internet.entities?.quota_remaining,
          total_download: svc.totalDownload || internet.entities?.total_download,
          total_upload: svc.totalUpload || internet.entities?.total_upload
        }
      }
    };
    this._ispScanMessage = `Applied ${svc.name} as ${this._slotLabel(slot)}.`;
    this._fireChanged();
  }

  _isIspCurrent(svc, slot = "internet") {
    const internet = this._config[slot] || {};
    const pairs = [
      [svc.connected, internet.entity],
      [svc.ping, internet.entities?.ping],
      [svc.jitter, internet.entities?.jitter],
      [svc.download, internet.entities?.download],
      [svc.upload, internet.entities?.upload],
      [svc.quotaTotal, internet.entities?.quota_total],
      [svc.quotaRemaining, internet.entities?.quota_remaining],
      [svc.totalDownload, internet.entities?.total_download],
      [svc.totalUpload, internet.entities?.total_upload]
    ].filter(([v]) => v);
    return pairs.length > 0 && pairs.every(([v, cur]) => v === cur);
  }

  _removeIspSelection(svc, slot = "internet") {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const internet = this._config[slot] || {};
    const entities = { ...internet.entities };
    let entity = internet.entity;
    if (svc.connected && entity === svc.connected) entity = "";
    if (svc.ping && entities.ping === svc.ping) entities.ping = "";
    if (svc.jitter && entities.jitter === svc.jitter) entities.jitter = "";
    if (svc.download && entities.download === svc.download) entities.download = "";
    if (svc.upload && entities.upload === svc.upload) entities.upload = "";
    if (svc.quotaTotal && entities.quota_total === svc.quotaTotal) entities.quota_total = "";
    if (svc.quotaRemaining && entities.quota_remaining === svc.quotaRemaining) entities.quota_remaining = "";
    if (svc.totalDownload && entities.total_download === svc.totalDownload) entities.total_download = "";
    if (svc.totalUpload && entities.total_upload === svc.totalUpload) entities.total_upload = "";
    this._config = { ...this._config, [slot]: { ...internet, entity, entities } };
    this._ispScanMessage = `ISP selection removed (${this._slotLabel(slot)}).`;
    this._fireChanged();
  }

  _renderDiscoveredIspList() {
    const all = this._discoveredIspServices || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const list = this._discoveredIspSearch ? all.filter((c) => this._matchesSearch(c, this._discoveredIspSearch)) : all;
    const perPage = 10;
    const page = Math.min(this._discoveredIspPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredIspSearch, (e) => { this._discoveredIspSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length ? this._renderNoSearchMatches() : null}
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((svc) => {
          const found = [
            svc.connected && "Connected",
            svc.ping && "Ping",
            svc.jitter && "Jitter",
            svc.download && "Download speed",
            svc.upload && "Upload speed",
            svc.quotaTotal && "Quota total",
            svc.quotaRemaining && "Quota remaining",
            svc.totalDownload && "Downloaded",
            svc.totalUpload && "Uploaded"
          ].filter(Boolean);
          return b`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon="mdi:account-network"></ha-icon>
                <div>
                  <div>${svc.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${ISP_PLATFORM_LABELS[svc.platform] || svc.platform}${found.length ? " · " + found.join(", ") : " · no matching fields"}
                  </div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; align-items:stretch;">
                ${["internet", "internet_secondary"].map((slot) =>
                  this._isIspCurrent(svc, slot)
                    ? b`
                        <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeIspSelection(svc, slot)}>
                          Remove ${this._slotLabel(slot)}
                        </button>
                      `
                    : b`
                        <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectIspService(svc, slot)}>
                          As ${this._slotLabel(slot)}
                        </button>
                      `
                )}
              </div>
            </div>
          `;
        })}
      </div>
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredIspPage = p;
        this.requestUpdate();
      })}
    `;
  }

  // --- pfSense Firewall / VPN discovery -------------------------------
  _scanForPfsense() {
    this._discoveredPfsense = scanPfsenseIntegration(this.hass).security;
    this._discoveredPfsensePage = 0;
    this._pfsenseScanMessage = this._discoveredPfsense.length
      ? ""
      : "No pfSense VPN or firewall entities found. Its filter-rule and service switches and OpenVPN sensors are disabled by default in Home Assistant - enable the ones you want first.";
    this.requestUpdate();
  }

  // Which config field a discovered item feeds.
  _pfsenseField(item) {
    return item.kind === "firewall" ? "firewall_entity" : item.kind === "vpn_peers" ? "vpn_peers_entity" : "vpn_entity";
  }

  _selectPfsenseItem(item) {
    const field = this._pfsenseField(item);
    const conflicts = findFieldConflicts({ [field]: this._config[field] }, { [field]: item.entity });
    if (conflicts.length && !window.confirm(`Overwrite your existing ${field.replace(/_/g, " ")} with ${item.name}?`)) return;
    this._config = { ...this._config, [field]: item.entity };
    this._pfsenseScanMessage =
      item.kind === "vpn_peers" && !this._config.vpn_entity
        ? "Connected peers set. The VPN badge also needs a status entity - pick a VPN gateway or OpenVPN service switch above."
        : `Applied ${item.name}.`;
    this._fireChanged();
  }

  _removePfsenseSelection(item) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const field = this._pfsenseField(item);
    if (this._config[field] === item.entity) {
      this._config = { ...this._config, [field]: "" };
      this._fireChanged();
    }
    this._pfsenseScanMessage = "pfSense selection removed.";
    this.requestUpdate();
  }

  _removeAllPfsense() {
    const c = this._config;
    const fromPfsense = (this._discoveredPfsense || []).map((i) => i.entity);
    const hits = ["vpn_entity", "vpn_peers_entity", "firewall_entity"].filter((f) => c[f] && fromPfsense.includes(c[f]));
    if (!hits.length) return;
    if (!window.confirm("Remove the pfSense VPN and Firewall entities? This can't be undone.")) return;
    const next = { ...c };
    hits.forEach((f) => { next[f] = ""; });
    this._config = next;
    this._pfsenseScanMessage = "pfSense entities removed.";
    this._fireChanged();
  }

  _renderDiscoveredPfsenseList() {
    const all = this._discoveredPfsense || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const kindLabel = { vpn_status: "VPN status", vpn_peers: "VPN connected clients", firewall: "Firewall" };
    const list = this._discoveredPfsenseSearch ? all.filter((c) => this._matchesSearch(c, this._discoveredPfsenseSearch)) : all;
    const perPage = 10;
    const page = Math.min(this._discoveredPfsensePage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);
    return b`
      ${this._renderDiscoverySearch(this._discoveredPfsenseSearch, (e) => { this._discoveredPfsenseSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length ? this._renderNoSearchMatches() : null}
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((item) => {
          const isCurrent = this._config[this._pfsenseField(item)] === item.entity;
          return b`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon=${item.kind === "firewall" ? "mdi:wall-fire" : "mdi:vpn"}></ha-icon>
                <div>
                  <div>${item.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${kindLabel[item.kind]} \u00b7 ${item.detail} \u00b7 ${item.entity}
                  </div>
                </div>
              </div>
              ${isCurrent
                ? b`<button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removePfsenseSelection(item)}>Remove</button>`
                : b`<button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectPfsenseItem(item)}>Select</button>`}
            </div>
          `;
        })}
      </div>
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredPfsensePage = p;
        this.requestUpdate();
      })}
    `;
  }

  _scanForAdGuard() {
    this._discoveredAdGuard = scanAdGuardIntegration(this.hass);
    this._discoveredAdGuardPage = 0;
    this._adguardScanMessage = this._discoveredAdGuard.length ? "" : "No AdGuard Home entities found.";
    this.requestUpdate();
  }

  _selectAdGuardService(candidate) {
    const incoming = { dns_entity: candidate.entity };
    const existing = { dns_entity: this._config.dns_entity };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing DNS Filtering entity with values from ${candidate.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      dns_entity: candidate.entity || this._config.dns_entity
    };
    this._adguardScanMessage = `DNS Filtering entity set from ${candidate.name}.`;
    this._fireChanged();
  }

  _removeAdGuardSelection(candidate) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    if (this._config.dns_entity === candidate.entity) {
      this._config = { ...this._config, dns_entity: "" };
      this._fireChanged();
    }
    this._adguardScanMessage = "DNS Filtering entity removed.";
    this.requestUpdate();
  }

  _renderDiscoveredAdGuardList() {
    const all = this._discoveredAdGuard || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const current = this._config.dns_entity;
    const list = this._discoveredAdGuardSearch ? all.filter((c) => this._matchesSearch(c, this._discoveredAdGuardSearch)) : all;
    const perPage = 10;
    const page = Math.min(this._discoveredAdGuardPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredAdGuardSearch, (e) => { this._discoveredAdGuardSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length ? this._renderNoSearchMatches() : null}
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((c) => {
          const isCurrent = !!c.entity && c.entity === current;
          return b`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon="mdi:shield-check"></ha-icon>
                <div>
                  <div>${c.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${c.entity ? `Blocked: ${c.entity}` : "No queries-blocked sensor found"}
                  </div>
                </div>
              </div>
              ${isCurrent
                ? b`
                    <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeAdGuardSelection(c)}>
                      Remove
                    </button>
                  `
                : b`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" .disabled=${!c.entity} @click=${() => this._selectAdGuardService(c)}>
                      Select
                    </button>
                  `}
            </div>
          `;
        })}
      </div>
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredAdGuardPage = p;
        this.requestUpdate();
      })}
    `;
  }

  _scanForRouter() {
    const tplinkResult = scanTplinkDevices(this.hass);
    const openwrtResult = scanOpenWrtIntegration(this.hass);
    const haOpenwrtResult = scanHaOpenwrtIntegration(this.hass);
    const srmResult = scanSynologySrmIntegration(this.hass);
    const asusResult = scanAsusRouterIntegration(this.hass);
    const unifiResult = scanUnifiIntegration(this.hass);
    const omadaResult = scanOmadaIntegration(this.hass);
    const netgearResult = scanNetgearIntegration(this.hass);
    const asuswrtResult = scanAsuswrtIntegration(this.hass);
    const fritzResult = scanFritzIntegration(this.hass);
    const pfsenseResult = scanPfsenseIntegration(this.hass);
    const unifiCommunity = scanUnifiCommunityIntegrations(this.hass);
    const candidates = [
      ...fritzResult.routerCandidates,
      ...pfsenseResult.routerCandidates,
      ...tplinkResult.routerCandidates,
      ...unifiResult.routerCandidates,
      ...unifiCommunity.routerCandidates,
      ...omadaResult.routerCandidates,
      ...asuswrtResult.routerCandidates,
      ...haOpenwrtResult.routerCandidates,
      ...scanMikrotikIntegration(this.hass).routerCandidates,
      ...scanMikrotikRouterIntegration(this.hass).routerCandidates,
      ...scanMikrotikExtendedIntegration(this.hass).routerCandidates,
      ...scanOpnsenseIntegration(this.hass).routerCandidates
    ];
    if (openwrtResult.routerCandidate) candidates.push(openwrtResult.routerCandidate);
    if (srmResult.routerCandidate) candidates.push(srmResult.routerCandidate);
    if (asusResult.routerCandidate) candidates.push(asusResult.routerCandidate);
    if (netgearResult.routerCandidate) candidates.push(netgearResult.routerCandidate);

    this._discoveredRouters = candidates;
    this._discoveredRoutersPage = 0;
    this._routerScanMessage = candidates.length
      ? ""
      : "No TP-Link Router, Deco master unit, OpenWrt (LuCI), Synology SRM, AsusRouter, ASUSWRT, UniFi, Omada, Netgear, FRITZ!Box, or pfSense gateway found.";
    this.requestUpdate();
  }

  _selectDiscoveredRouter(candidate) {
    const current = this._config.router || {};
    const lan = this._config.lan || {};
    const incoming = {
      entity: candidate.entity,
      name: candidate.name,
      lan_entity: candidate.lanEntity,
      wan_ip: candidate.wanIpEntity,
      wan_ip_secondary: candidate.wanIpSecondaryEntity,
      lan_ip: candidate.lanIpEntity,
      download: candidate.downloadEntity,
      upload: candidate.uploadEntity
    };
    const existing = {
      entity: current.entity,
      name: current.name,
      lan_entity: lan.entity,
      wan_ip: current.entities?.wan_ip,
      wan_ip_secondary: current.entities?.wan_ip_secondary,
      lan_ip: current.entities?.lan_ip,
      download: current.entities?.download,
      upload: current.entities?.upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (
      conflicts.length &&
      !window.confirm(`Overwrite your existing Router ${conflicts.join(", ")} with values from ${candidate.name || candidate.entity}?`)
    ) {
      return;
    }

    this._config = {
      ...this._config,
      router: {
        ...current,
        entity: candidate.entity || current.entity,
        name: candidate.name || current.name,
        entities: {
          ...current.entities,
          wan_ip: candidate.wanIpEntity || current.entities?.wan_ip,
          wan_ip_secondary: candidate.wanIpSecondaryEntity || current.entities?.wan_ip_secondary,
          lan_ip: candidate.lanIpEntity || current.entities?.lan_ip,
          download: candidate.downloadEntity || current.entities?.download,
          upload: candidate.uploadEntity || current.entities?.upload
        }
      },
      lan: {
        ...lan,
        entity: candidate.lanEntity || lan.entity
      }
    };
    this._routerScanMessage = `Router set to ${candidate.name || candidate.entity}.`;
    this._fireChanged();
  }

  // Clears only the fields THIS candidate actually contributed (not
  // the whole Router config, in case some fields were set by hand or
  // by a different candidate), then it becomes selectable again.
  _removeRouterSelection(candidate) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const current = this._config.router || {};
    const lan = this._config.lan || {};
    const router = { ...current, entities: { ...current.entities } };
    if (router.entity === candidate.entity) router.entity = "";
    if (candidate.wanIpEntity && router.entities.wan_ip === candidate.wanIpEntity) router.entities.wan_ip = "";
    if (candidate.wanIpSecondaryEntity && router.entities.wan_ip_secondary === candidate.wanIpSecondaryEntity) router.entities.wan_ip_secondary = "";
    if (candidate.lanIpEntity && router.entities.lan_ip === candidate.lanIpEntity) router.entities.lan_ip = "";
    if (candidate.downloadEntity && router.entities.download === candidate.downloadEntity) router.entities.download = "";
    if (candidate.uploadEntity && router.entities.upload === candidate.uploadEntity) router.entities.upload = "";
    const newLan = { ...lan };
    if (candidate.lanEntity && newLan.entity === candidate.lanEntity) newLan.entity = "";
    this._config = { ...this._config, router, lan: newLan };
    this._routerScanMessage = "Router selection removed.";
    this._fireChanged();
  }

  _renderDiscoveredRoutersList() {
    const all = this._discoveredRouters || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No TP-Link Router or Deco master unit found.</p>`;
    }
    const sourceLabel = {
      tplink_deco: "TP-Link Deco (master)",
      tplink_router: "TP-Link Router",
      luci: "OpenWrt (LuCI)",
      openwrt: "OpenWrt (ha-openwrt)",
      mikrotik: "MikroTik",
      mikrotik_router: "MikroTik Router",
      mikrotik_extended: "MikroTik Extended",
      opnsense: "OPNsense",
      synology_srm: "Synology SRM",
      asusrouter: "AsusRouter (AiMesh)",
      fritz: "FRITZ!Box / Repeater",
      unifi: "UniFi Network",
      omada: "TP-Link Omada",
      netgear: "Netgear (official)",
      asuswrt: "ASUSWRT (official)",
      fritz: "FRITZ!Box",
      pfsense: "pfSense",
      unifi_network_map: "UniFi Network Map",
      unifi_mqtt: "UniFi Device Info (MQTT)"
    };
    const current = this._config.router?.entity;
    const list = this._discoveredRoutersSearch ? all.filter((c) => this._matchesSearch(c, this._discoveredRoutersSearch)) : all;
    const perPage = 10;
    const page = Math.min(this._discoveredRoutersPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredRoutersSearch, (e) => { this._discoveredRoutersSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length ? this._renderNoSearchMatches() : null}
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((c) => {
          const isCurrent = c.entity === current;
          return b`
            <div class="list-item" style="${isCurrent ? 'background:var(--accent-color); background:rgba(var(--rgb-accent-color, 3,169,244),0.1);' : ''}">
              <div class="list-item-info">
                <ha-icon icon="mdi:router-network"></ha-icon>
                <div>
                  <div>${c.name || c.entity}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${sourceLabel[c.source] || c.source} · ${c.entity}
                    ${c.lanEntity ? b` · LAN: ${c.lanEntity}` : null}
                    ${c.wanIpEntity ? b` · WAN IP: ${c.wanIpEntity}` : null}
                    ${c.wanIpSecondaryEntity ? b` · Secondary WAN IP: ${c.wanIpSecondaryEntity}` : null}
                    ${c.lanIpEntity ? b` · LAN IP: ${c.lanIpEntity}` : null}
                    ${c.downloadEntity ? b` · Download: ${c.downloadEntity}` : null}
                    ${c.uploadEntity ? b` · Upload: ${c.uploadEntity}` : null}
                  </div>
                  ${c.note ? b`<div style="font-size:0.8em; color:var(--warning-color, orange);">${c.note}</div>` : null}
                </div>
              </div>
              ${isCurrent
                ? b`
                    <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeRouterSelection(c)}>
                      Remove
                    </button>
                  `
                : b`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectDiscoveredRouter(c)}>
                      Select
                    </button>
                  `}
            </div>
          `;
        })}
      </div>
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredRoutersPage = p;
        this.requestUpdate();
      })}
    `;
  }

  // --- Main Switch Auto-Discovery ---------------------------------
  // Deliberately narrow: this only offers devices UniFi or Omada have
  // ALREADY classified as switches (their own `scanUnifiIntegration`/
  // `scanOmadaIntegration` .switches arrays - the exact same
  // classification used for Fed Switch and Nodes-page discovery, not a
  // separate heuristic of its own). No other integration this card
  // supports models a distinct switch role - TP-Link Deco, AsusRouter's
  // AiMesh, OpenWrt and Synology SRM all expose a single router/mesh
  // entity with no separate "this is a switch" concept - so there's
  // nothing else to look for here.
  _scanForMainSwitch() {
    const unifiResult = scanUnifiIntegration(this.hass);
    const omadaResult = scanOmadaIntegration(this.hass);
    const unifiCommunity = scanUnifiCommunityIntegrations(this.hass);
    const candidates = [
      ...unifiResult.switches.map((n) => ({ source: "unifi", entity: n.entity, name: n.name, raw: n })),
      ...unifiCommunity.switches.map((n) => ({ source: n.source, entity: n.entity, name: n.name, raw: n })),
      ...omadaResult.switches.map((n) => ({ source: "omada", entity: n.entity, name: n.name, raw: n }))
    ];
    this._discoveredMainSwitches = candidates;
    this._discoveredMainSwitchesPage = 0;
    this._mainSwitchScanMessage = candidates.length ? "" : "No UniFi or Omada switch found.";
    this.requestUpdate();
  }

  _selectDiscoveredMainSwitch(candidate) {
    const current = this._config.switch || {};
    const incoming = {
      entity: candidate.entity,
      name: candidate.name,
      connected_devices: candidate.raw.connectedDevices,
      ip_address: candidate.raw.ipAddress
    };
    const existing = {
      entity: current.entity,
      name: current.name,
      connected_devices: current.entities?.connected_devices,
      ip_address: current.entities?.ip_address
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (
      conflicts.length &&
      !window.confirm(`Overwrite your existing Switch ${conflicts.join(", ")} with values from ${candidate.name || candidate.entity}?`)
    ) {
      return;
    }

    this._config = {
      ...this._config,
      switch: {
        ...current,
        entity: candidate.entity || current.entity,
        name: candidate.name || current.name,
        entities: {
          ...current.entities,
          connected_devices: candidate.raw.connectedDevices || current.entities?.connected_devices,
          ip_address: candidate.raw.ipAddress || current.entities?.ip_address
        }
      }
    };
    this._mainSwitchScanMessage = `Switch set to ${candidate.name || candidate.entity}.`;
    this._fireChanged();
  }

  // Clears only the fields THIS candidate actually contributed, same
  // reasoning as _removeRouterSelection - not the whole Switch config,
  // in case some fields were set by hand or by a different candidate.
  _removeMainSwitchSelection(candidate) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const current = this._config.switch || {};
    const sw = { ...current, entities: { ...current.entities } };
    if (sw.entity === candidate.entity) sw.entity = "";
    if (candidate.raw.connectedDevices && sw.entities.connected_devices === candidate.raw.connectedDevices) {
      sw.entities.connected_devices = "";
    }
    if (candidate.raw.ipAddress && sw.entities.ip_address === candidate.raw.ipAddress) sw.entities.ip_address = "";
    this._config = { ...this._config, switch: sw };
    this._mainSwitchScanMessage = "Switch selection removed.";
    this._fireChanged();
  }

  _renderDiscoveredMainSwitchesList() {
    const all = this._discoveredMainSwitches || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No UniFi or Omada switch found.</p>`;
    }
    const sourceLabel = { unifi: "UniFi Network", omada: "TP-Link Omada", unifi_network_map: "UniFi Network Map", unifi_mqtt: "UniFi Device Info (MQTT)" };
    const current = this._config.switch?.entity;
    const list = this._discoveredMainSwitchesSearch ? all.filter((c) => this._matchesSearch(c, this._discoveredMainSwitchesSearch)) : all;
    const perPage = 10;
    const page = Math.min(this._discoveredMainSwitchesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredMainSwitchesSearch, (e) => { this._discoveredMainSwitchesSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length ? this._renderNoSearchMatches() : null}
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((c) => {
          const isCurrent = c.entity === current;
          return b`
            <div class="list-item" style="${isCurrent ? 'background:var(--accent-color); background:rgba(var(--rgb-accent-color, 3,169,244),0.1);' : ''}">
              <div class="list-item-info">
                <ha-icon icon="mdi:switch"></ha-icon>
                <div>
                  <div>${c.name || c.entity}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${sourceLabel[c.source] || c.source} · ${c.entity}
                    ${c.raw.connectedDevices ? b` · Connected Clients: ${c.raw.connectedDevices}` : null}
                  </div>
                </div>
              </div>
              ${isCurrent
                ? b`
                    <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeMainSwitchSelection(c)}>
                      Remove
                    </button>
                  `
                : b`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectDiscoveredMainSwitch(c)}>
                      Select
                    </button>
                  `}
            </div>
          `;
        })}
      </div>
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredMainSwitchesPage = p;
        this.requestUpdate();
      })}
    `;
  }

  // Netgear's own integration isn't a source here: unlike TP-Link Deco,
  // AsusRouter, UniFi, or Omada, it never distinguishes a satellite,
  // switch, or AP from an ordinary client (see scanNetgearIntegration's
  // own comment above) - there is nothing here it could safely add as a
  // Switch or AP node, only as a Client on the page below.
  // --- Unified Nodes Auto-Discovery (TP-Link Deco + Proxmox VE + -----
  // AsusRouter AiMesh + UniFi + Omada) ---------------------------------
  // Every candidate carries `type` ("ap" for a mesh/AP unit, "switch"
  // for a managed switch - only UniFi and Omada produce these today,
  // since neither TP-Link Deco nor AsusRouter's AiMesh model a separate
  // switch role - or "homelab" for a Proxmox node) and `source` (the
  // owning integration), plus `raw` holding whatever type-specific data
  // _addSelectedNodes needs to build the actual node.

  // Where a discovered UniFi switch/AP is physically plugged in, when the
  // integration reports it (core UniFi's "Device Uplink MAC" sensor, or
  // UniFi Network Map's uplink_device attribute): if that parent is
  // already somewhere in the Nodes tree, pre-select "under <parent>" in
  // its Add-as dropdown instead of "New Node". Only a default - the
  // dropdown can still be changed before adding.
  _defaultUplinkTargets(candidates) {
    const entityByMac = new Map();
    candidates.forEach((c) => { if (c.raw?.mac) entityByMac.set(c.raw.mac, c.entity); });
    const routerMac = (() => {
      const rid = this._config.router?.entity;
      return rid ? normalizeMac(this.hass?.states?.[rid]?.attributes?.mac || this.hass?.states?.[rid]?.attributes?.mac_address) : "";
    })();
    const pathByEntity = new Map();
    this._eligibleAttachTargets().forEach((t) => {
      const holder = this._getAtPath(t.path);
      const ent = /^nodes\.\d+$/.test(t.path) ? holder?.switch?.entity : holder?.entity;
      if (ent && !pathByEntity.has(ent)) pathByEntity.set(ent, t.path);
    });
    const targets = {};
    candidates.forEach((c) => {
      const up = c.raw?.uplinkMac;
      if (!up || up === routerMac) return;
      const parentEntity = entityByMac.get(up);
      const path = parentEntity && pathByEntity.get(parentEntity);
      if (path) targets[c.entity] = `existing:${path}`;
    });
    return targets;
  }

  _scanForNodes() {
    const tplink = scanTplinkDevices(this.hass);
    const proxmox = scanProxmoxIntegration(this.hass);
    const asus = scanAsusRouterIntegration(this.hass);
    const unifi = scanUnifiIntegration(this.hass);
    const omada = scanOmadaIntegration(this.hass);
    const unifiCommunity = scanUnifiCommunityIntegrations(this.hass);
    const fritzNodes = scanFritzIntegration(this.hass).nodes;
    const haOpenwrtNodes = scanHaOpenwrtIntegration(this.hass).nodes;
    const srmNodes = scanSynologySrmIntegration(this.hass).nodes;
    const netgearNodes = scanNetgearIntegration(this.hass).nodes;
    const mikrotikNodes = scanMikrotikIntegration(this.hass).nodes;
    const mikrotikRouterNodes = scanMikrotikRouterIntegration(this.hass).nodes;
    const mikrotikExtendedNodes = scanMikrotikExtendedIntegration(this.hass).nodes;
    const candidates = [
      ...fritzNodes.map((n) => ({ type: "ap", source: "fritz", entity: n.entity, name: n.name, raw: n })),
      ...haOpenwrtNodes.map((n) => ({ type: "ap", source: "openwrt", entity: n.entity, name: n.name, raw: n })),
      ...srmNodes.map((n) => ({ type: "ap", source: "synology_srm", entity: n.entity, name: n.name, raw: n })),
      ...netgearNodes.map((n) => ({ type: "ap", source: "netgear", entity: n.entity, name: n.name, raw: n })),
      ...mikrotikNodes.map((n) => ({ type: "ap", source: "mikrotik", entity: n.entity, name: n.name, raw: n })),
      ...mikrotikRouterNodes.map((n) => ({ type: "ap", source: "mikrotik_router", entity: n.entity, name: n.name, raw: n })),
      ...mikrotikExtendedNodes.map((n) => ({ type: "ap", source: "mikrotik_extended", entity: n.entity, name: n.name, raw: n })),
      ...unifiCommunity.accessPoints.map((n) => ({ type: "ap", source: n.source, entity: n.entity, name: n.name, raw: n })),
      ...unifiCommunity.switches.map((n) => ({ type: "switch", source: n.source, entity: n.entity, name: n.name, raw: n })),
      ...tplink.nodes.map((n) => ({ type: "ap", source: "tplink_deco", entity: n.entity, name: n.name, raw: n })),
      ...proxmox.map((n) => ({ type: "homelab", source: "proxmoxve", entity: n.entity, name: n.name, raw: n })),
      ...asus.nodes.map((n) => ({ type: "ap", source: "asusrouter", entity: n.entity, name: n.name, raw: n })),
      ...unifi.accessPoints.map((n) => ({ type: "ap", source: "unifi", entity: n.entity, name: n.name, raw: n })),
      ...unifi.switches.map((n) => ({ type: "switch", source: "unifi", entity: n.entity, name: n.name, raw: n })),
      ...omada.accessPoints.map((n) => ({ type: "ap", source: "omada", entity: n.entity, name: n.name, raw: n })),
      ...omada.switches.map((n) => ({ type: "switch", source: "omada", entity: n.entity, name: n.name, raw: n }))
    ];
    this._discoveredNodes = candidates;
    this._discoveredNodesSelected = new Set();
    this._discoveredNodesPage = 0;
    this._discoveredNodesFilterSource = "";
    this._discoveredNodesFilterType = "";
    this._discoveredNodesTarget = this._defaultUplinkTargets(candidates);
    this._nodeScanMessage = candidates.length
      ? ""
      : "No TP-Link Deco, Proxmox VE, AsusRouter AiMesh, FRITZ! repeater, UniFi, or Omada nodes found.";
    this.requestUpdate();
  }

  // --- "Remove All" bulk-clear actions, one per Discover section -----
  // Each confirms first, then clears only the fields that section
  // itself owns - never anything more general a different section
  // might also rely on (e.g. Speedtest/ISP's "Remove All" leave
  // internet.entity and internet.name alone, since those are shared,
  // fundamental fields that may have been set by hand or by a
  // different source entirely).

  _removeAllNodes() {
    const count = (this._config.nodes || []).length;
    if (!count) return;
    if (!window.confirm(`Remove all ${count} node${count === 1 ? "" : "s"}? This can't be undone.`)) return;
    this._config = { ...this._config, nodes: [] };
    this._expanded = new Set();
    this._nodeScanMessage = "All nodes removed.";
    this._fireChanged();
  }

  _removeAllContainers(hlPath) {
    const hl = this._getAtPath(hlPath);
    if (!hl) return;
    const count = (hl.containers || []).length;
    if (!count) return;
    if (!window.confirm(`Remove all ${count} container${count === 1 ? "" : "s"}/VM(s) from this node? This can't be undone.`)) return;
    this._config = setPathValue(this._config, `${hlPath}.containers`, []);
    this._containersScanMessage = "All containers/VMs removed from this node.";
    this._fireChanged();
  }

  _removeAllRouter() {
    const router = this._config.router || {};
    if (!router.entity && !router.entities?.wan_ip && !router.entities?.wan_ip_secondary && !router.entities?.lan_ip && !router.entities?.download && !router.entities?.upload) return;
    if (!window.confirm("Remove the Router entity and its WAN/LAN IP and Real-time Speed fields? This can't be undone.")) return;
    const lan = this._config.lan || {};
    this._config = {
      ...this._config,
      router: { ...router, entity: "", entities: { ...router.entities, wan_ip: "", wan_ip_secondary: "", lan_ip: "", download: "", upload: "" } },
      lan: { ...lan, entity: "" }
    };
    this._routerScanMessage = "Router removed.";
    this._fireChanged();
  }

  _removeAllSpeedtest(slot = "internet") {
    const internet = this._config[slot] || {};
    const e = internet.entities || {};
    if (!e.ping && !e.jitter && !e.download && !e.upload) return;
    if (!window.confirm(`Remove all ${this._slotLabel(slot)} Speedtest fields (Ping, Jitter, Download, Upload)? This can't be undone.`)) return;
    this._config = {
      ...this._config,
      [slot]: { ...internet, entities: { ...e, ping: "", jitter: "", download: "", upload: "" } }
    };
    this._internetScanMessage = `${this._slotLabel(slot)} Speedtest fields removed.`;
    this._fireChanged();
  }

  _removeAllIsp(slot = "internet") {
    const internet = this._config[slot] || {};
    const e = internet.entities || {};
    if (!e.quota_total && !e.quota_remaining && !e.total_download && !e.total_upload) return;
    if (!window.confirm(`Remove all ${this._slotLabel(slot)} ISP fields (Quota Total, Quota Remaining, Total Downloaded, Total Uploaded)? This can't be undone.`)) return;
    this._config = {
      ...this._config,
      [slot]: { ...internet, entities: { ...e, quota_total: "", quota_remaining: "", total_download: "", total_upload: "" } }
    };
    this._ispScanMessage = `${this._slotLabel(slot)} ISP fields removed.`;
    this._fireChanged();
  }

  // Drops the whole optional backup Internet block, returning the card to
  // its single-Internet layout.
  _removeSecondaryInternet() {
    if (!this._config.internet_secondary) return;
    if (!window.confirm("Remove the Secondary Internet? This can't be undone.")) return;
    const { internet_secondary, ...rest } = this._config;
    this._config = rest;
    this._internetSlot = "internet";
    this._internetScanMessage = "Secondary Internet removed.";
    this._fireChanged();
  }

  _removeAllAdGuard() {
    if (!this._config.dns_entity) return;
    if (!window.confirm("Remove the DNS Filtering entity? This can't be undone.")) return;
    this._config = { ...this._config, dns_entity: "" };
    this._adguardScanMessage = "DNS Filtering entity removed.";
    this._fireChanged();
  }

  _existingNodeEntities() {
    const existing = new Set();
    (this._config.nodes || []).forEach((n) => {
      (n.access_points || []).forEach((ap) => ap.entity && existing.add(ap.entity));
      (n.fed_switches || []).forEach((sw) => sw.entity && existing.add(sw.entity));
      if (n.homelab?.entity) existing.add(n.homelab.entity);
      if (n.switch?.entity) existing.add(n.switch.entity);
    });
    if (this._config.router?.entity) existing.add(this._config.router.entity);
    return existing;
  }

  _toggleNodeSelection(entityId) {
    const set = new Set(this._discoveredNodesSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredNodesSelected = set;
    this.requestUpdate();
  }

  // Every Switch or Access Point already in the tree that a discovered
  // AP, Switch, or Server candidate could attach under, at any depth -
  // a Node's own Switch, any fed Switch, or any Access Point (which can
  // itself feed Switches, Servers, and further Access Points). A bare
  // Server Node has nothing for a second device to attach beneath, so
  // it's the only Node type left out.
  _eligibleAttachTargets() {
    const out = [];
    const walk = (path, holder, labelChain) => {
      out.push({ path, label: labelChain.join(" \u203a ") });
      (holder.access_points || []).forEach((ap, i) =>
        walk(`${path}.access_points.${i}`, ap, [...labelChain, this._treeLabel(ap, `AP ${i + 1}`)])
      );
      (holder.fed_switches || []).forEach((sw, i) =>
        walk(`${path}.fed_switches.${i}`, sw, [...labelChain, this._treeLabel(sw, `Switch ${i + 1}`)])
      );
    };
    (this._config.nodes || []).forEach((node, i) => {
      if (node.switch) {
        walk(`nodes.${i}`, node, [this._treeLabel(node.switch, `Node ${i + 1}`)]);
      } else if (!node.homelab && node.access_points?.[0]) {
        walk(`nodes.${i}.access_points.0`, node.access_points[0], [this._treeLabel(node.access_points[0], `Node ${i + 1}`)]);
      }
    });
    return out;
  }

  _setNodeTarget(entityId, value) {
    this._discoveredNodesTarget = { ...this._discoveredNodesTarget, [entityId]: value };
    this.requestUpdate();
  }

  _visibleNodeCandidates() {
    const all = this._discoveredNodes || [];
    const activeSource = this._discoveredNodesFilterSource || "";
    const activeType = this._discoveredNodesFilterType || "";
    const search = this._discoveredNodesSearch || "";
    return all.filter(
      (c) =>
        (!activeSource || c.source === activeSource) &&
        (!activeType || c.type === activeType) &&
        this._matchesSearch(c, search)
    );
  }

  _toggleSelectAllNodes() {
    const existing = this._existingNodeEntities();
    const selectable = this._visibleNodeCandidates().filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredNodesSelected.has(c.entity));

    // Only touches entities in the currently filtered view, same fix
    // as the Clients list - a selection made under one filter survives
    // switching to and toggling Select All under another.
    const next = new Set(this._discoveredNodesSelected);
    selectable.forEach((c) => (allSelected ? next.delete(c.entity) : next.add(c.entity)));
    this._discoveredNodesSelected = next;
    this.requestUpdate();
  }

  _addSelectedNodes() {
    const existing = this._existingNodeEntities();
    const toAdd = (this._discoveredNodes || []).filter(
      (c) => this._discoveredNodesSelected.has(c.entity) && !existing.has(c.entity)
    );
    if (!toAdd.length) return;

    const buildAccessPoint = (n) => ({
      ...DEFAULT_ACCESS_POINT,
      entity: n.entity,
      name: n.name,
      icon: "mdi:wifi",
      is_primary: !!n.isMaster,
      entities: {
        ...DEFAULT_ACCESS_POINT.entities,
        connected_devices: n.connectedDevices || "",
        download: n.download || "",
        upload: n.upload || "",
        backhaul_type: n.backhaulType || "",
        backhaul_speed: n.backhaulSpeed || "",
        ip_address: n.ipAddress || ""
      }
    });

    const buildFedSwitch = (n) => ({
      ...DEFAULT_NODE_SWITCH,
      entity: n.entity,
      name: n.name,
      entities: {
        ...DEFAULT_NODE_SWITCH.entities,
        connected_devices: n.connectedDevices || "",
        ip_address: n.ipAddress || ""
      }
    });

    const buildHomelab = (n) => ({
      ...DEFAULT_HOMELAB,
      entity: n.entity,
      name: n.name,
      containers: n.containers.map((cc) => ({
        ...DEFAULT_CONTAINER_BADGE,
        entity: cc.entity,
        name: cc.name,
        icon: PROXMOX_VM_KINDS.has(cc.kind) ? "mdi:desktop-tower" : "mdi:docker"
      }))
    });

    // Split into "attach under an existing node" vs "create a new
    // node", based on each candidate's chosen target - re-validated
    // against _eligibleAttachTargets here (not just trusted from the
    // dropdown state) in case the targeted node lost its Switch, or
    // was deleted, since the dropdown was set; anything no longer
    // eligible simply falls through to creating its own new node
    // instead of silently doing nothing.
    const eligiblePaths = new Set(this._eligibleAttachTargets().map((t) => t.path));
    const attachments = [];
    const toCreate = [];
    toAdd.forEach((c) => {
      const target = this._discoveredNodesTarget[c.entity];
      if ((c.type === "ap" || c.type === "switch" || c.type === "homelab") && target && target !== "new") {
        const path = String(target).slice("existing:".length);
        if (eligiblePaths.has(path)) {
          attachments.push({
            path,
            type: c.type,
            item: c.type === "ap" ? buildAccessPoint(c.raw) : c.type === "switch" ? buildFedSwitch(c.raw) : buildHomelab(c.raw)
          });
          return;
        }
      }
      toCreate.push(c);
    });

    const newNodes = toCreate.map((c) => {
      if (c.type === "homelab") {
        const n = c.raw;
        return {
          ...DEFAULT_NODE,
          name: n.name,
          switch: null,
          homelab: {
            ...DEFAULT_HOMELAB,
            entity: n.entity,
            name: n.name,
            containers: n.containers.map((cc) => ({
              ...DEFAULT_CONTAINER_BADGE,
              entity: cc.entity,
              name: cc.name,
              icon: PROXMOX_VM_KINDS.has(cc.kind) ? "mdi:desktop-tower" : "mdi:docker"
            }))
          },
          access_points: []
        };
      }
      if (c.type === "switch") {
        return { ...DEFAULT_NODE, name: c.raw.name, switch: buildFedSwitch(c.raw), access_points: [] };
      }
      return { ...DEFAULT_NODE, name: c.raw.name, switch: null, access_points: [buildAccessPoint(c.raw)] };
    });

    // Applied one at a time against a running copy of the config, so two
    // attachments under the same (or a parent/child) path never clobber
    // each other the way splicing straight into `nodes[nodeIndex]` would.
    const readPath = (obj, path) => path.split(".").reduce((cur, k) => cur?.[k], obj);
    let cfg = this._config;
    attachments.forEach(({ path, type, item }) => {
      const holder = readPath(cfg, path);
      if (!holder) return;
      const key = type === "ap" ? "access_points" : type === "switch" ? "fed_switches" : "homelabs";
      cfg = setPathValue(cfg, `${path}.${key}`, [...(holder[key] || []), item]);
    });
    const nodes = [...(cfg.nodes || []), ...newNodes];

    this._config = { ...cfg, nodes };
    this._discoveredNodesSelected = new Set();
    this._discoveredNodesTarget = {};

    const parts = [];
    if (newNodes.length) {
      parts.push(
        `${newNodes.length} new node${newNodes.length === 1 ? "" : "s"} (${newNodes
          .map((n) => n.name || n.homelab?.entity || n.switch?.entity || n.access_points[0]?.entity)
          .join(", ")})`
      );
    }
    if (attachments.length) {
      parts.push(
        `${attachments.length} attached to existing node${attachments.length === 1 ? "" : "s"} (${attachments
          .map((a) => a.item.name || a.item.entity)
          .join(", ")})`
      );
    }
    this._nodeScanMessage = `Added ${parts.join("; ")}.`;
    this._fireChanged();
  }

  // Removes the whole node containing this entity (whether it's an AP
  // or a Homelab server) so it becomes selectable again in the scan
  // list, after confirming with the person first.
  // Removes a discovered entity from wherever it actually lives. If it
  // IS a node's own identity (its Switch or its Homelab), the whole
  // node goes, same as before. If it's one Access Point or Fed Switch
  // among possibly several attached to a node, only that one entry is
  // removed and the node itself (and its other children) stays intact -
  // this matters now that attach-to-existing-node can put more than one
  // discovered item under the same node.
  _removeDiscoveredNode(entityId) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const nodes = (this._config.nodes || [])
      .map((n) => {
        const matchesHomelab = n.homelab?.entity === entityId;
        const matchesSwitch = n.switch?.entity === entityId;
        if (matchesHomelab || matchesSwitch) return null;
        const matchesAp = (n.access_points || []).some((ap) => ap.entity === entityId);
        const matchesFedSwitch = (n.fed_switches || []).some((sw) => sw.entity === entityId);
        if (!matchesAp && !matchesFedSwitch) return n;
        return {
          ...n,
          access_points: matchesAp ? n.access_points.filter((ap) => ap.entity !== entityId) : n.access_points,
          fed_switches: matchesFedSwitch ? n.fed_switches.filter((sw) => sw.entity !== entityId) : n.fed_switches
        };
      })
      .filter(Boolean);
    this._config = { ...this._config, nodes };
    this._nodeScanMessage = "Removed.";
    this._fireChanged();
  }

  // Renders a sub-header with its explanatory text moved into a small
  // info icon's native hover tooltip, instead of that text always
  // sitting below the heading as a paragraph - several of these (the
  // Auto-Discovery ones especially) ran 4-6 lines every time, pushing
  // the section's actual controls further down the page than they
  // needed to be. `description` must be plain text (no HTML tags) -
  // a native title tooltip can't render markup.

  // A toggle-row label with the same hoverable (i) as _infoHeader, for
  // a toggle whose explanation is too long to leave as a paragraph
  // underneath it.
  _toggleLabel(text, description) {
    return b`
      <span style="display:flex; align-items:center; gap:4px;">
        ${text}
        <ha-icon
          icon="mdi:information-outline"
          title=${description}
          style="--mdc-icon-size:15px; color:var(--secondary-text-color); cursor:help; flex-shrink:0;"
        ></ha-icon>
      </span>
    `;
  }

  _infoHeader(title, description) {
    return b`
      <div class="sub-header" style="display:flex; align-items:center; gap:4px;">
        <span>${title}</span>
        <ha-icon
          icon="mdi:information-outline"
          title=${description}
          style="--mdc-icon-size:15px; color:var(--secondary-text-color); cursor:help; flex-shrink:0;"
        ></ha-icon>
      </div>
    `;
  }

  // Shared pager controls for the discovered-devices and
  // discovered-nodes lists - 10 items per page.
  // Case-insensitive substring match against a candidate's name and entity
  // id - the two fields every discovery list already shows for an item, so
  // searching "kitchen" finds it whether it matched by friendly name or by
  // an entity id that happens to contain it.
  _matchesSearch(item, query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return true;
    const hay = `${item?.name || ""} ${item?.entity || ""}`.toLowerCase();
    return hay.includes(q);
  }

  _renderDiscoverySearch(value, onInput, placeholder = "Search by name...") {
    return b`
      <input
        type="text"
        placeholder="${placeholder}"
        style="width:100%; box-sizing:border-box; padding:8px 10px; margin-bottom:8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color); font:inherit;"
        .value=${value || ""}
        @input=${onInput}
      />
    `;
  }

  // A one-line "nothing matched" message, used only when a search query is
  // active and it narrowed a non-empty list down to zero - as opposed to
  // the list being genuinely empty, which each caller already handles with
  // its own more specific message.
  _renderNoSearchMatches() {
    return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matches for that search.</p>`;
  }

  _renderPager(page, totalItems, perPage, onPage) {
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    if (totalPages <= 1) return null;
    return b`
      <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin:8px 0;">
        <ha-icon-button
          .disabled=${page <= 0}
          @click=${() => onPage(page - 1)}
          title="Previous page"
        >
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </ha-icon-button>
        <span style="font-size:0.9em; color:var(--secondary-text-color);">Page ${page + 1} of ${totalPages}</span>
        <ha-icon-button
          .disabled=${page >= totalPages - 1}
          @click=${() => onPage(page + 1)}
          title="Next page"
        >
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </ha-icon-button>
      </div>
    `;
  }

  _renderDiscoveredNodesList() {
    const existing = this._existingNodeEntities();
    const all = this._discoveredNodes || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching TP-Link Deco units, Proxmox VE nodes, AsusRouter AiMesh nodes, or UniFi/Omada switches or access points found.</p>`;
    }

    const sourceLabel = {
      tplink_deco: "TP-Link Deco",
      proxmoxve: "Proxmox VE",
      asusrouter: "AsusRouter (AiMesh)",
      fritz: "FRITZ!Box / Repeater",
      unifi: "UniFi Network",
      omada: "TP-Link Omada",
      unifi_network_map: "UniFi Network Map",
      unifi_mqtt: "UniFi Device Info (MQTT)"
    };
    const typeLabel = { ap: "Access Point", switch: "Switch", homelab: "Server" };
    const sources = [...new Set(all.map((c) => c.source))];
    const types = ["ap", "switch", "homelab"];
    const activeSource = this._discoveredNodesFilterSource || "";
    const activeType = this._discoveredNodesFilterType || "";
    const list = this._visibleNodeCandidates();

    const selectable = list.filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredNodesSelected.has(c.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredNodesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
        <select
          style="padding:6px 8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color);"
          .value=${activeSource}
          @change=${(e) => {
            this._discoveredNodesFilterSource = e.target.value;
            this._discoveredNodesPage = 0;
            this.requestUpdate();
          }}
        >
          <option value="">All Integrations (${all.length})</option>
          ${sources.map(
            (s) => b`<option value=${s}>${sourceLabel[s] || s} (${all.filter((c) => c.source === s).length})</option>`
          )}
        </select>
        <select
          style="padding:6px 8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color);"
          .value=${activeType}
          @change=${(e) => {
            this._discoveredNodesFilterType = e.target.value;
            this._discoveredNodesPage = 0;
            this.requestUpdate();
          }}
        >
          <option value="">All Types (${all.length})</option>
          ${types.map(
            (t) => b`<option value=${t}>${typeLabel[t] || t} (${all.filter((c) => c.type === t).length})</option>`
          )}
        </select>
      </div>
      ${this._renderDiscoverySearch(this._discoveredNodesSearch, (e) => { this._discoveredNodesSearch = e.target.value; this.requestUpdate(); })}
      ${!this._visibleNodeCandidates().length && all.length ? this._renderNoSearchMatches() : null}

      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllNodes()}
        ></ha-switch>
      </div>
      ${(() => {
        const attachTargets = this._eligibleAttachTargets();
        return pageItems.map((c) => {
          const already = existing.has(c.entity);
          const checked = this._discoveredNodesSelected.has(c.entity);
          const isMaster = c.type === "ap" && c.raw.isMaster;
          const icon = c.type === "homelab" ? "mdi:server" : c.type === "switch" ? "mdi:switch" : "mdi:wifi";
          const canAttach = !already && (c.type === "ap" || c.type === "switch" || c.type === "homelab") && attachTargets.length > 0;
          const targetValue = this._discoveredNodesTarget[c.entity] || "new";
          return b`
            <div class="list-item" style="opacity:1; ${canAttach ? "flex-direction:column; align-items:stretch; gap:8px;" : ""}">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; width:100%;">
                <div class="list-item-info">
                  <ha-icon icon="${icon}"></ha-icon>
                  <div>
                    <div>${c.name || c.entity}${isMaster ? b` <span style="color:var(--secondary-text-color); font-size:0.85em;">(Master &middot; will default to Primary AP)</span>` : null}</div>
                    <div style="font-size:0.8em; color:var(--secondary-text-color);">
                      ${sourceLabel[c.source] || c.source} &middot; ${typeLabel[c.type] || c.type}${c.type === "homelab" ? ` &middot; ${c.raw.containers.length} container(s)/VM(s)` : ""}
                    </div>
                  </div>
                </div>
                ${already
                  ? b`
                      <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeDiscoveredNode(c.entity)}>
                        Remove
                      </button>
                    `
                  : b`
                      <ha-icon-button
                        @click=${() => this._toggleNodeSelection(c.entity)}
                        title=${checked ? "Deselect" : "Select"}
                      >
                        <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                      </ha-icon-button>
                    `}
              </div>
              ${canAttach
                ? b`
                    <div style="display:flex; align-items:center; gap:6px; padding-left:32px;">
                      <span style="font-size:0.8em; color:var(--secondary-text-color); white-space:nowrap;">Add as:</span>
                      <select
                        style="flex:1; padding:4px 6px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color); font-size:0.85em;"
                        @change=${(e) => this._setNodeTarget(c.entity, e.target.value)}
                      >
                        <option value="new" ?selected=${targetValue === "new"}>New Node</option>
                        ${attachTargets.map(
                          (t) => b`
                            <option value="existing:${t.path}" ?selected=${targetValue === `existing:${t.path}`}>
                              ${c.type === "ap" ? "Access Point" : c.type === "switch" ? "Switch" : "Server"} under "${t.label}"
                            </option>
                          `
                        )}
                      </select>
                    </div>
                  `
                : null}
            </div>
          `;
        });
      })()}
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredNodesPage = p;
        this.requestUpdate();
      })}
      <button class="add-btn" .disabled=${!this._discoveredNodesSelected.size} @click=${() => this._addSelectedNodes()}>
        Add Selected (${this._discoveredNodesSelected.size})
      </button>
    `;
  }


  _scanIndividualDevices() {
    const tplinkResult = scanTplinkDevices(this.hass);
    const openwrtResult = scanOpenWrtIntegration(this.hass);
    const haOpenwrtResult = scanHaOpenwrtIntegration(this.hass);
    const srmResult = scanSynologySrmIntegration(this.hass);
    const asusResult = scanAsusRouterIntegration(this.hass);
    const unifiResult = scanUnifiIntegration(this.hass);
    const omadaResult = scanOmadaIntegration(this.hass);
    const netgearResult = scanNetgearIntegration(this.hass);
    const mobileAppResult = scanMobileAppIntegration(this.hass);
    const asuswrtResult = scanAsuswrtIntegration(this.hass);
    const fritzResult = scanFritzIntegration(this.hass);
    const pfsenseResult = scanPfsenseIntegration(this.hass);
    const unifiCommunity = scanUnifiCommunityIntegrations(this.hass);
    this._discoveredDevices = [
      ...tplinkResult.individualDevices,
      ...openwrtResult.clients,
      ...haOpenwrtResult.clients,
      ...scanMikrotikIntegration(this.hass).clients,
      ...scanMikrotikRouterIntegration(this.hass).clients,
      ...scanMikrotikExtendedIntegration(this.hass).clients,
      ...scanOpnsenseIntegration(this.hass).clients,
      ...srmResult.clients,
      ...asusResult.clients,
      ...unifiResult.clients,
      ...omadaResult.clients,
      ...netgearResult.clients,
      ...mobileAppResult.clients,
      ...asuswrtResult.clients,
      ...fritzResult.clients,
      ...pfsenseResult.clients,
      ...unifiCommunity.clients
    ];
    this._discoveredSelected = new Set();
    this._discoveredDevicesPage = 0;
    this._discoveredDevicesFilter = "";
    this.requestUpdate();
  }

  _toggleDiscoveredSelection(entityId) {
    const set = new Set(this._discoveredSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllDiscovered() {
    const existing = new Set((this._config.individual_devices || []).map((d) => d.entity));
    const activeFilter = this._discoveredDevicesFilter || "";
    const all = this._discoveredDevices || [];
    const filtered = activeFilter ? all.filter((d) => d.source === activeFilter) : all;
    const selectable = filtered.filter((d) => !existing.has(d.entity));
    const allSelected = selectable.length > 0 && selectable.every((d) => this._discoveredSelected.has(d.entity));

    // Only add/remove entities from the currently filtered view - a
    // selection made under a different filter (e.g. TP-Link Deco)
    // stays intact when Select All is toggled for another (e.g.
    // TP-Link Router), rather than being wiped by an unrelated toggle.
    const next = new Set(this._discoveredSelected);
    selectable.forEach((d) => (allSelected ? next.delete(d.entity) : next.add(d.entity)));
    this._discoveredSelected = next;
    this.requestUpdate();
  }

  _addSelectedDiscovered() {
    const existing = new Set((this._config.individual_devices || []).map((d) => d.entity));
    const toAdd = (this._discoveredDevices || [])
      .filter((d) => this._discoveredSelected.has(d.entity) && !existing.has(d.entity))
      .map((d) => ({ ...DEFAULT_INDIVIDUAL_DEVICE, entity: d.entity, name: d.name || "" }));
    if (!toAdd.length) return;
    this._config = { ...this._config, individual_devices: [...(this._config.individual_devices || []), ...toAdd] };
    this._discoveredSelected = new Set();
    this._fireChanged();
  }

  // Removes this Client entry entirely (not just deselecting it), then
  // it becomes selectable again in the scan list, after confirming
  // with the person first.
  _removeDiscoveredClient(entityId) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    this._config = {
      ...this._config,
      individual_devices: (this._config.individual_devices || []).filter((d) => d.entity !== entityId)
    };
    this._fireChanged();
  }

  _renderDiscoveredDevicesList() {
    const existing = new Set((this._config.individual_devices || []).map((d) => d.entity));
    const all = this._discoveredDevices || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching TP-Link entities found.</p>`;
    }

    const sourceLabel = {
      tplink_deco: "TP-Link Deco",
      tplink_router: "TP-Link Router",
      luci: "OpenWrt (LuCI)",
      openwrt: "OpenWrt (ha-openwrt)",
      mikrotik: "MikroTik",
      mikrotik_router: "MikroTik Router",
      mikrotik_extended: "MikroTik Extended",
      opnsense: "OPNsense",
      synology_srm: "Synology SRM",
      asusrouter: "AsusRouter (AiMesh)",
      fritz: "FRITZ!Box / Repeater",
      unifi: "UniFi Network",
      omada: "TP-Link Omada",
      netgear: "Netgear",
      mobile_app: "Mobile App",
      asuswrt: "ASUSWRT",
      fritz: "FRITZ!Box",
      pfsense: "pfSense",
      unifi_network_map: "UniFi Network Map"
    };
    const sources = [...new Set(all.map((d) => d.source))];
    const activeFilter = this._discoveredDevicesFilter || "";
    const bySource = activeFilter ? all.filter((d) => d.source === activeFilter) : all;
    const list = this._discoveredDevicesSearch ? bySource.filter((d) => this._matchesSearch(d, this._discoveredDevicesSearch)) : bySource;

    const selectable = list.filter((d) => !existing.has(d.entity));
    const allSelected = selectable.length > 0 && selectable.every((d) => this._discoveredSelected.has(d.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredDevicesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredDevicesSearch, (e) => { this._discoveredDevicesSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length && bySource.length ? this._renderNoSearchMatches() : null}
      ${sources.length > 1
        ? b`
            <div class="toggle-row">
              <span>Filter by integration</span>
              <select
                style="padding:6px 8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color);"
                .value=${activeFilter}
                @change=${(e) => {
                  this._discoveredDevicesFilter = e.target.value;
                  this._discoveredDevicesPage = 0;
                  this._discoveredSelected = new Set();
                  this.requestUpdate();
                }}
              >
                <option value="">All (${all.length})</option>
                ${sources.map(
                  (s) => b`<option value=${s}>${sourceLabel[s] || s} (${all.filter((d) => d.source === s).length})</option>`
                )}
              </select>
            </div>
          `
        : null}
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllDiscovered()}
        ></ha-switch>
      </div>
      ${pageItems.map((d) => {
        const already = existing.has(d.entity);
        const checked = this._discoveredSelected.has(d.entity);
        return b`
          <div class="list-item" style="opacity:1">
            <div class="list-item-info">
              <ha-icon icon="mdi:devices"></ha-icon>
              <span>${d.name} <span style="color:var(--secondary-text-color); font-size:0.85em;">(${sourceLabel[d.source] || d.source})</span></span>
            </div>
            ${already
              ? b`
                  <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeDiscoveredClient(d.entity)}>
                    Remove
                  </button>
                `
              : b`
                  <ha-icon-button
                    @click=${() => this._toggleDiscoveredSelection(d.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredDevicesPage = p;
        this.requestUpdate();
      })}
      <button class="add-btn" .disabled=${!this._discoveredSelected.size} @click=${() => this._addSelectedDiscovered()}>
        Add Selected (${this._discoveredSelected.size})
      </button>
    `;
  }

  _renderIndividualDevicesPage() {
    if (this._editingDevIndex !== null) {
      return this._renderDevEditor(this._editingDevIndex);
    }

    const devs = this._config.individual_devices || [];
    return b`
      <div class="form-section">
        ${this._config.view_mode === "hyperbolic"
          ? b`
              <div class="sub-header">Unknown Node (Hyperbolic)</div>
              <p style="color:var(--secondary-text-color); font-size:0.85em; margin:0 0 8px 0;">
                Clients whose access point or switch cannot be found hang off an "Unknown" node. Leave a colour blank for the default pink; an icon colour left blank follows the circle colour.
              </p>
              ${this._renderColorInput("Circle Color", this._config.hyperbolic_unknown_circle_color, "hyperbolic_unknown_circle_color")}
              ${this._renderColorInput("Icon Color", this._config.hyperbolic_unknown_icon_color, "hyperbolic_unknown_icon_color")}
            `
          : null}
        <div class="sub-header">Clients</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
          <button class="add-btn" style="flex:1;" @click=${() => this._addDev()}>
            + Add Client (${devs.length})
          </button>
          ${devs.length
            ? b`
                <button class="add-btn" style="flex:0 0 auto; color:var(--error-color);" @click=${() => this._deleteAllDevices()}>
                  Delete All
                </button>
              `
            : null}
        </div>
        ${(() => {
          const perPage = 10;
          const page = Math.min(this._devsPage || 0, Math.max(0, Math.ceil(devs.length / perPage) - 1));
          const pageItems = devs.slice(page * perPage, page * perPage + perPage);
          return b`
            ${pageItems.map((dev, i) => {
              const idx = page * perPage + i;
              return b`
                <div class="list-item">
                  <div class="list-item-info">
                    <ha-icon .icon=${dev.icon || "mdi:devices"} style="color:var(--primary-color);"></ha-icon>
                    <span>${dev.name || dev.entity || `Client ${idx + 1}`}</span>
                  </div>
                  <div class="list-item-actions">
                    <ha-icon-button
                      @click=${() => this._moveDev(idx, -1)}
                      .disabled=${idx === 0}
                      title="Move up"
                    >
                      <ha-icon icon="mdi:arrow-up"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      @click=${() => this._moveDev(idx, 1)}
                      .disabled=${idx === devs.length - 1}
                      title="Move down"
                    >
                      <ha-icon icon="mdi:arrow-down"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      @click=${() => (this._editingDevIndex = idx)}
                      title="Edit"
                    >
                      <ha-icon icon="mdi:pencil"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      @click=${() => this._removeDev(idx)}
                      title="Delete"
                    >
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
              `;
            })}
            ${this._renderPager(page, devs.length, perPage, (p) => {
              this._devsPage = p;
              this.requestUpdate();
            })}
          `;
        })()}

        ${this._infoHeader(
          "Auto-Discovery (TP-Link / OpenWrt / Synology SRM / AsusRouter / ASUSWRT / UniFi / Omada / Netgear / FRITZ!Box / pfSense / Mobile App)",
          "Scans for device_tracker entities from the TP-Link Deco, TP-Link Router, OpenWrt (LuCI), Synology SRM, AsusRouter, ASUSWRT, UniFi, TP-Link Omada, Netgear, FRITZ!Box, pfSense (its ARP-table trackers - these only exist for the clients you select in the pfSense integration's options), and Home Assistant Mobile App integrations (mesh units, switches, access points, and routers/gateways are excluded - use the Nodes and Router pages for those). Netgear's own integration never tells a satellite/switch/AP apart from an ordinary client, so every one of its attached clients shows up here rather than on the Nodes page; Mobile App has no such distinction to make in the first place - every registered phone/tablet is a personal device, always a Client. Nothing is added automatically; review the list and select which ones you want, then add them like any other client - icon, color, name, and group are all still yours to set afterward."
        )}
        <button class="add-btn" @click=${() => this._scanIndividualDevices()}>
          Scan for Clients
        </button>
        ${this._discoveredDevices !== null ? this._renderDiscoveredDevicesList() : null}

        ${this._infoHeader(
          "Grouping",
          `Splits the box into labeled sub-groups. A wired device (its entity's "connection" attribute is "wired", or - for TP-Link Omada - it carries a "switch_mac" attribute) always groups as "Wired", except under Device Area below, which ignores connection type entirely. SSID groups by network name (TP-Link Deco's "interface" attribute, UniFi's "essid", or Omada's "ssid" - a guest network always groups as "Guest" regardless of the actual SSID name). VLAN groups by UniFi's numeric "vlan" attribute or Omada's "vlan_id" when present (even for a guest client on that VLAN), falling back to "Guest" if there's no VLAN but the client is flagged as guest, then to Deco's "interface". Connected Device groups by whatever the client is physically attached to: Deco's "deco_device" (a friendly name) or UniFi's/Omada's "ap_mac" for a wireless client, or - for a wired one - TP-Link Omada's "switch_name" (falling back to "switch_mac"), the only supported integration that reports which switch a wired client is on. Device Area groups by the entity's assigned Home Assistant Area (falling back to its device's Area if the entity itself has none) - independent of any integration, since Areas are set in Home Assistant itself. Anything missing the relevant attribute, or with no Area assigned, falls into "Unknown". Override any individual client's group on its own page below.`
        )}
        <div class="select-field">
          <label class="input-label">Group By</label>
          <select
            class="native-select"
            .value=${this._config.individual_devices_group_by || "ssid"}
            @change=${(e) => this._handleSelectChange(e, "individual_devices_group_by")}
          >
            <option value="none">None</option>
            <option value="ssid">SSID</option>
            <option value="vlan">VLAN</option>
            <option value="ap">Connected Device</option>
            <option value="area">Device Area</option>
          </select>
        </div>
        ${this._config.individual_devices_group_by && this._config.individual_devices_group_by !== "none"
          ? b`
              <div class="select-field">
                <label class="input-label">Sub-Group Width</label>
                <select
                  class="native-select"
                  .value=${this._config.individual_devices_group_layout || "widest_fits"}
                  @change=${(e) => this._handleSelectChange(e, "individual_devices_group_layout")}
                >
                  <option value="gaps">Fit content, fill gaps between boxes</option>
                  <option value="last_fill">Fit content, last box fills remaining space</option>
                  <option value="widest_fits">Widest box fits content, others share the rest</option>
                </select>
              </div>

              ${this._renderInput(
                "Group Box Border Radius",
                this._config.individual_devices_group_box_radius,
                "individual_devices_group_box_radius"
              )}

              <div class="toggle-row">
                <span>Show Sub-Group Outlines</span>
                <ha-switch
                  .checked=${this._config.individual_devices_group_show_border !== false}
                  @change=${(e) => this._valueChanged(e, "individual_devices_group_show_border")}
                ></ha-switch>
              </div>
              ${this._config.individual_devices_group_show_border !== false
                ? b`
                    ${this._renderColorInput(
                      "Default Sub-Group Outline Color",
                      this._config.individual_devices_group_border_color,
                      "individual_devices_group_border_color"
                    )}

                    <p style="color:var(--secondary-text-color); font-size:0.9em; margin:8px 0;">
                      Per-group color overrides - the Name must match a
                      sub-group's label exactly as it appears on the
                      diagram (e.g. "Wired", "Guest", "VLAN 20"). Any
                      group without a matching override uses the
                      default color above.
                    </p>
                    ${(this._config.individual_devices_group_colors || []).map((override, i) => b`
                      <div style="display:flex; align-items:flex-end; gap:8px; margin-bottom:4px;">
                        <div style="flex:1;">${this._renderInput("Group Name", override.name, `individual_devices_group_colors.${i}.name`)}</div>
                        <div style="flex:1;">${this._renderColorInput("Color", override.color, `individual_devices_group_colors.${i}.color`)}</div>
                        <ha-icon-button
                          @click=${() => this._removeGroupColorOverride(i)}
                          title="Delete"
                        >
                          <ha-icon icon="mdi:delete"></ha-icon>
                        </ha-icon-button>
                      </div>
                    `)}
                    <button class="add-btn" @click=${() => this._addGroupColorOverride()}>
                      + Add Group Color Override
                    </button>
                  `
                : null}
            `
          : null}

        ${this._infoHeader(
          "Guest Network",
          "Shown automatically on any device whose entity reports it's on a guest network (TP-Link Deco's \"interface\" attribute, UniFi's \"is_guest\" attribute, or the \"guest\" attribute AsusRouter and TP-Link Omada both use). Applies to every Client - no per-device setup needed."
        )}
        <ha-icon-picker
          .label=${"Icon"}
          .value=${this._config.individual_device_guest_icon || "mdi:account"}
          @value-changed=${(e) => this._valueChanged(e, "individual_device_guest_icon")}
        ></ha-icon-picker>
        ${this._renderColorInput(
          "Icon Color",
          this._config.individual_device_guest_icon_color,
          "individual_device_guest_icon_color"
        )}
        ${this._renderColorInput(
          "Badge Background Color",
          this._config.individual_device_guest_icon_bg,
          "individual_device_guest_icon_bg"
        )}

        <div class="sub-header">Layout</div>
        ${this._renderColorInput(
          "Box Border Color",
          this._config.individual_devices_box_color,
          "individual_devices_box_color"
        )}
        ${this._renderInput(
          "Box Border Radius",
          this._config.individual_devices_box_radius,
          "individual_devices_box_radius"
        )}
        <div class="toggle-row">
          ${this._toggleLabel(
            "Show Client Names",
            "Shows each client's name in small text directly below its circle. Off by default, since it noticeably increases visual density on a Clients box with a lot of clients - the full name is always available on tap/hover either way."
          )}
          <ha-switch
            .checked=${!!this._config.individual_devices_show_names}
            @change=${(e) => this._valueChanged(e, "individual_devices_show_names")}
          ></ha-switch>
        </div>
      </div>
    `;
  }

  _renderDevEditor(index) {
    const dev = this._config.individual_devices[index] || DEFAULT_INDIVIDUAL_DEVICE;
    const prefix = `individual_devices.${index}`;
    const c = dev.colors || {};

    return b`
      <div class="form-section">
        <div class="sub-header">Client</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${dev.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._devEntityChanged(e, index)}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name (Optional)", dev.name, `${prefix}.name`)}
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Defaults to the entity's own Friendly Name the first time you
          pick it above; edit it here any time.
        </p>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${dev.icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        ${this._config.individual_devices_group_by && this._config.individual_devices_group_by !== "none"
          ? b`
              ${this._renderInput("Group Override (Optional)", dev.group_override, `${prefix}.group_override`)}
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Leave blank to auto-detect the group from this client's
                own entity attributes; set a value to force it into
                that group regardless.
              </p>
            `
          : null}

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
            ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
          </div>
        </div>
      </div>
    `;
  }

  _addDev() {
    const devs = [...(this._config.individual_devices || []), { ...DEFAULT_INDIVIDUAL_DEVICE }];
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _deleteAllDevices() {
    const count = (this._config.individual_devices || []).length;
    if (!count) return;
    if (!window.confirm(`Delete all ${count} client${count === 1 ? "" : "s"}? This can't be undone.`)) return;
    this._config = { ...this._config, individual_devices: [] };
    this._fireChanged();
  }

  // Entity picker handler for a Client: behaves like the
  // normal _valueChanged path for the entity field itself, but also
  // prefills the Name field from the newly-picked entity's own
  // friendly_name the first time - only when Name is still blank, so
  // it never overwrites something the user already typed.
  _devEntityChanged(e, index) {
    const entityId = e.detail?.value !== undefined ? e.detail.value : e.target.value;
    const devs = [...(this._config.individual_devices || [])];
    const current = devs[index] || { ...DEFAULT_INDIVIDUAL_DEVICE };
    const next = { ...current, entity: entityId };
    if (!next.name) {
      next.name = this.hass?.states?.[entityId]?.attributes?.friendly_name || "";
    }
    devs[index] = next;
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _addGroupColorOverride() {
    const overrides = [...(this._config.individual_devices_group_colors || []), { name: "", color: "" }];
    this._config = { ...this._config, individual_devices_group_colors: overrides };
    this._fireChanged();
  }

  _removeGroupColorOverride(index) {
    const overrides = (this._config.individual_devices_group_colors || []).filter((_, i) => i !== index);
    this._config = { ...this._config, individual_devices_group_colors: overrides };
    this._fireChanged();
  }

  _removeDev(idx) {
    const devs = (this._config.individual_devices || []).filter((_, i) => i !== idx);
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _moveDev(idx, direction) {
    const devs = [...(this._config.individual_devices || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= devs.length) return;
    [devs[idx], devs[newIdx]] = [devs[newIdx], devs[idx]];
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  // --- Monitoring ---------------------------------------------------------

  // A dedicated handler rather than the generic _valueChanged: that method
  // always runs diagram_scale through parseFloat (needed for the slider's
  // numeric value), which would turn the string "auto" into NaN.
  _toggleAutoScale(e) {
    this._config = setPathValue(this._config, "diagram_scale", e.target.checked ? "auto" : 100);
    this._fireChanged();
  }

  _monitorServices() {
    return (this._config.monitoring && this._config.monitoring.services) || [];
  }

  _setMonitorServices(list) {
    this._config = setPathValue(this._config, "monitoring.services", list);
    this._fireChanged();
  }

  _scanForMonitoring() {
    this._discoveredMonitors = scanMonitoringIntegrations(this.hass);
    this._discoveredMonitorsSelected = new Set();
    this._discoveredMonitorsPage = 0;
    this._discoveredMonitorsFilter = "";
    this._monitorScanMessage = this._discoveredMonitors.length
      ? ""
      : "No Uptime Kuma, Ping, Gatus or UptimeRobot monitors found.";
    this.requestUpdate();
  }

  _toggleMonitorSelection(entityId) {
    const set = new Set(this._discoveredMonitorsSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredMonitorsSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllMonitors() {
    const existing = new Set(this._monitorServices().map((s) => s.entity));
    const all = this._discoveredMonitors || [];
    const filter = all.some((c) => c.source === this._discoveredMonitorsFilter) ? this._discoveredMonitorsFilter : "";
    const filtered = filter ? all.filter((c) => c.source === filter) : all;
    const selectable = filtered.filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredMonitorsSelected.has(c.entity));
    // Only the filtered view is toggled, so a selection made under another
    // integration's filter survives.
    const next = new Set(this._discoveredMonitorsSelected);
    selectable.forEach((c) => (allSelected ? next.delete(c.entity) : next.add(c.entity)));
    this._discoveredMonitorsSelected = next;
    this.requestUpdate();
  }

  _addSelectedMonitors() {
    const services = this._monitorServices();
    const existing = new Set(services.map((s) => s.entity));
    const toAdd = (this._discoveredMonitors || [])
      .filter((c) => this._discoveredMonitorsSelected.has(c.entity) && !existing.has(c.entity))
      .map((c) => ({
        ...DEFAULT_MONITORED_SERVICE,
        entity: c.entity,
        source: c.source,
        name: c.name || "",
        response_entity: c.response_entity || "",
        target: c.target || "",
        target_entities: [...(c.target_entities || [])],
        tags_entity: c.tags_entity || ""
      }));
    if (!toAdd.length) return;
    this._discoveredMonitorsSelected = new Set();
    this._setMonitorServices([...services, ...toAdd]);
  }

  _removeDiscoveredMonitor(entityId) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    this._setMonitorServices(this._monitorServices().filter((s) => s.entity !== entityId));
  }

  // Delete only the services a filter is showing.
  _removeShownMonitors(indices, key) {
    const drop = new Set(indices);
    if (!drop.size) return;
    const label = key === "other" ? "other" : MONITOR_PLATFORM_LABELS[key] || key;
    if (!window.confirm(`Delete the ${drop.size} ${label} service${drop.size === 1 ? "" : "s"} shown? This can't be undone.`)) return;
    this._editingMonitorIndex = null;
    this._monitorsFilter = "";
    this._setMonitorServices(this._monitorServices().filter((_, i) => !drop.has(i)));
  }

  _removeAllMonitors() {
    const count = this._monitorServices().length;
    if (!count) return;
    if (!window.confirm(`Delete all ${count} monitored service${count === 1 ? "" : "s"}? This can't be undone.`)) return;
    this._editingMonitorIndex = null;
    this._setMonitorServices([]);
  }

  _addMonitor() {
    const services = [...this._monitorServices(), { ...DEFAULT_MONITORED_SERVICE, target_entities: [] }];
    this._editingMonitorIndex = services.length - 1;
    this._setMonitorServices(services);
  }

  _removeMonitor(idx) {
    this._setMonitorServices(this._monitorServices().filter((_, i) => i !== idx));
  }

  // `visible` (the real indexes shown under a filter) makes a move swap with
  // the next service that is actually on screen, not a hidden neighbour.
  _moveMonitor(idx, direction, visible = null) {
    const services = [...this._monitorServices()];
    let newIdx = idx + direction;
    if (visible) {
      const p = visible.indexOf(idx) + direction;
      if (p < 0 || p >= visible.length) return;
      newIdx = visible[p];
    }
    if (newIdx < 0 || newIdx >= services.length) return;
    [services[idx], services[newIdx]] = [services[newIdx], services[idx]];
    this._setMonitorServices(services);
  }

  // Entity picker for a service. Picking a monitor from a supported
  // integration also fills in its response-time sensor, address and tags,
  // and prefills the name - each only where still blank.
  _monitorEntityChanged(e, index) {
    const entityId = e.detail?.value !== undefined ? e.detail.value : e.target.value;
    const services = [...this._monitorServices()];
    const next = { ...(services[index] || DEFAULT_MONITORED_SERVICE), entity: entityId };
    const found = entityId
      ? scanMonitoringIntegrations(this.hass).find((c) => c.entities.includes(entityId))
      : null;
    if (found) {
      next.source = found.source;
      if (!next.response_entity) next.response_entity = found.response_entity;
      if (!next.target) next.target = found.target;
      if (!(next.target_entities || []).length) next.target_entities = [...found.target_entities];
      if (!next.tags_entity) next.tags_entity = found.tags_entity;
      if (!next.name) next.name = found.name;
    } else if (!next.name) {
      next.name = this.hass?.states?.[entityId]?.attributes?.friendly_name || "";
    }
    services[index] = next;
    this._setMonitorServices(services);
  }

  // "Filter by integration": every integration is listed with how many it has
  // (one with none is greyed out, so it is clear why nothing shows for it).
  _renderMonitorSourceFilter(active, counts, total, onChange, otherCount = 0) {
    return b`
      <div class="toggle-row">
        <span>Filter by integration</span>
        <select
          style="padding:6px 8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color);"
          .value=${active}
          @change=${(e) => onChange(e.target.value)}
        >
          <option value="" ?selected=${active === ""}>All (${total})</option>
          ${MONITOR_PLATFORMS.map(
            (p) => b`<option value=${p} ?selected=${active === p} ?disabled=${!counts[p]}>${MONITOR_PLATFORM_LABELS[p]} (${counts[p] || 0})</option>`
          )}
          ${otherCount ? b`<option value="other" ?selected=${active === "other"}>Other (${otherCount})</option>` : null}
        </select>
      </div>
    `;
  }

  _renderDiscoveredMonitorsList() {
    const existing = new Set(this._monitorServices().map((s) => s.entity));
    const all = this._discoveredMonitors || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">${this._monitorScanMessage || "No matching monitors found."}</p>`;
    }
    const countsD = Object.fromEntries(MONITOR_PLATFORMS.map((p) => [p, all.filter((c) => c.source === p).length]));
    // A filter left over from an earlier scan that now has nothing falls back to All.
    const activeFilter = countsD[this._discoveredMonitorsFilter] ? this._discoveredMonitorsFilter : "";
    const bySource = activeFilter ? all.filter((c) => c.source === activeFilter) : all;
    const list = this._discoveredMonitorsSearch ? bySource.filter((c) => this._matchesSearch(c, this._discoveredMonitorsSearch)) : bySource;
    const selectable = list.filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredMonitorsSelected.has(c.entity));
    const perPage = 10;
    const page = Math.min(this._discoveredMonitorsPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      ${this._renderDiscoverySearch(this._discoveredMonitorsSearch, (e) => { this._discoveredMonitorsSearch = e.target.value; this.requestUpdate(); })}
      ${!list.length && bySource.length ? this._renderNoSearchMatches() : null}
      ${this._renderMonitorSourceFilter(activeFilter, countsD, all.length, (v) => {
        this._discoveredMonitorsFilter = v;
        this._discoveredMonitorsPage = 0;
        this._discoveredMonitorsSelected = new Set();
        this.requestUpdate();
      })}
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllMonitors()}
        ></ha-switch>
      </div>
      ${pageItems.map((c) => {
        const already = existing.has(c.entity);
        const checked = this._discoveredMonitorsSelected.has(c.entity);
        return b`
          <div class="list-item" style="opacity:1">
            <div class="list-item-info">
              <ha-icon icon="mdi:heart-pulse"></ha-icon>
              <div>
                <div>${c.name} <span style="color:var(--secondary-text-color); font-size:0.85em;">(${MONITOR_PLATFORM_LABELS[c.source] || c.source})</span></div>
                <div style="font-size:0.8em; color:var(--secondary-text-color);">
                  ${c.entity}${c.response_entity ? " · response time" : ""}${c.target ? ` · ${c.target}` : ""}
                </div>
                ${c.auto_hint
                  ? b`<div style="font-size:0.8em; color:var(--warning-color, orange);">${c.auto_hint}</div>`
                  : null}
              </div>
            </div>
            ${already
              ? b`
                  <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeDiscoveredMonitor(c.entity)}>
                    Remove
                  </button>
                `
              : b`
                  <ha-icon-button
                    @click=${() => this._toggleMonitorSelection(c.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredMonitorsPage = p;
        this.requestUpdate();
      })}
      <button class="add-btn" .disabled=${!this._discoveredMonitorsSelected.size} @click=${() => this._addSelectedMonitors()}>
        Add Selected (${this._discoveredMonitorsSelected.size})
      </button>
    `;
  }

  _renderMonitoringPage() {
    if (this._editingMonitorIndex !== null) {
      return this._renderMonitorEditor(this._editingMonitorIndex);
    }

    const services = this._monitorServices();
    const perPage = 10;
    // Filter by integration. Each service keeps its REAL index in the full
    // list, so edit / move / delete act on the right one while filtered.
    const srcOf = (svc) => monitorServiceSource(this.hass, svc);
    const counts = Object.fromEntries(MONITOR_PLATFORMS.map((p) => [p, services.filter((s) => srcOf(s) === p).length]));
    const otherCount = services.filter((s) => !srcOf(s)).length;
    const rawFilter = this._monitorsFilter || "";
    const activeFilter = rawFilter === "other" ? (otherCount ? "other" : "") : counts[rawFilter] ? rawFilter : "";
    const visible = services
      .map((svc, i) => ({ svc, i }))
      .filter(({ svc }) => !activeFilter || (activeFilter === "other" ? !srcOf(svc) : srcOf(svc) === activeFilter));
    const visibleIdx = visible.map((v) => v.i);
    const page = Math.min(this._monitorsPage || 0, Math.max(0, Math.ceil(visible.length / perPage) - 1));
    const pageItems = visible.slice(page * perPage, page * perPage + perPage);

    return b`
      <div class="form-section">
        <div class="sub-header">Monitored Services</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
          <button class="add-btn" style="flex:1;" @click=${() => this._addMonitor()}>
            + Add Service (${services.length})
          </button>
          ${services.length
            ? b`
                <button class="add-btn" style="flex:0 0 auto; color:var(--error-color);" @click=${() => (activeFilter ? this._removeShownMonitors(visibleIdx, activeFilter) : this._removeAllMonitors())}>
                  ${activeFilter ? `Delete Shown (${visible.length})` : "Delete All"}
                </button>
              `
            : null}
        </div>
        ${services.length
          ? this._renderMonitorSourceFilter(
              activeFilter,
              counts,
              services.length,
              (v) => {
                this._monitorsFilter = v;
                this._monitorsPage = 0;
                this.requestUpdate();
              },
              otherCount
            )
          : null}
        ${pageItems.map(({ svc, i: idx }) => {
          const type = svc.type || "auto";
          const resolved = type === "auto" && svc.entity ? resolveMonitorScope(this.hass, svc).scope : type;
          const where =
            resolved === "external"
              ? "External box"
              : svc.assign_to && svc.assign_to !== "clients"
              ? "On a device"
              : "Clients";
          return b`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon .icon=${svc.icon || "mdi:heart-pulse"} style="color:var(--primary-color);"></ha-icon>
                <div>
                  <div>${svc.name || this.hass?.states?.[svc.entity]?.attributes?.friendly_name || svc.entity || `Service ${idx + 1}`}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${type === "auto" ? `Auto → ${capitalizeFirst(resolved)}` : capitalizeFirst(type)} · ${where}
                  </div>
                </div>
              </div>
              <div class="list-item-actions">
                <ha-icon-button @click=${() => this._moveMonitor(idx, -1, visibleIdx)} .disabled=${visibleIdx.indexOf(idx) === 0} title="Move up">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._moveMonitor(idx, 1, visibleIdx)} .disabled=${visibleIdx.indexOf(idx) === visibleIdx.length - 1} title="Move down">
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => (this._editingMonitorIndex = idx)} title="Edit">
                  <ha-icon icon="mdi:pencil"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeMonitor(idx)} title="Delete">
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
            </div>
          `;
        })}
        ${this._renderPager(page, visible.length, perPage, (p) => {
          this._monitorsPage = p;
          this.requestUpdate();
        })}

        ${this._infoHeader(
          "Auto-Discovery (Uptime Kuma / Ping / Gatus / UptimeRobot)",
          "Scans Home Assistant for monitors from the Uptime Kuma, Ping, Gatus and UptimeRobot integrations. Each monitor is one Home Assistant device; its status entity is picked out, along with its response-time sensor and - where the integration exposes them - its address and tags, which Type: Auto uses to decide between External and Internal. Nothing is added automatically: select the ones you want, then edit each afterwards."
        )}
        <button class="add-btn" @click=${() => this._scanForMonitoring()}>
          Scan for Monitors
        </button>
        ${this._discoveredMonitors !== null ? this._renderDiscoveredMonitorsList() : null}

        ${this._renderMonitoringSettings()}
      </div>
    `;
  }

  _renderMonitoringSettings() {
    const mon = this._config.monitoring || DEFAULT_MONITORING;
    const c = mon.colors || {};
    const icons = mon.icons || {};
    const r = mon.response || DEFAULT_MONITORING.response;

    return b`
      <div class="sub-header">Layout</div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        Box Border Color and Radius style the External box above Internet.
        Services assigned to Clients sit in the Clients box, which keeps its
        own box layout - but Show Monitored Names applies to monitored
        services in both places.
      </p>
      ${this._renderColorInput("Box Border Color", mon.box_color, "monitoring.box_color")}
      ${this._renderInput("Box Border Radius", mon.box_radius, "monitoring.box_radius")}
      <div class="toggle-row">
        ${this._toggleLabel(
          "Show Monitored Names",
          "Shows each monitored service's name in small text directly below its circle - in the External box and in the Clients box. It works on its own, independent of the Clients 'Show Names' setting. Off by default, since it makes things denser; the name and state are always available on tap/hover either way."
        )}
        <ha-switch
          .checked=${!!mon.show_names}
          @change=${(e) => this._valueChanged(e, "monitoring.show_names")}
        ></ha-switch>
      </div>

      ${this._infoHeader(
        "Badge Colours",
        "One set of colours for every monitored-service badge on the card, by state: on a service's own circle (External box and Clients) and on any device a service is assigned to. A device with several services shows the most serious state among them."
      )}
      <div class="two-col">
        <div>
          ${this._renderColorInput("Up", c.up, "monitoring.colors.up")}
          ${this._renderColorInput("Pending", c.pending, "monitoring.colors.pending")}
        </div>
        <div>
          ${this._renderColorInput("Down", c.down, "monitoring.colors.down")}
          ${this._renderColorInput("Maintenance", c.maintenance, "monitoring.colors.maintenance")}
        </div>
      </div>
      ${this._renderColorInput("Badge Icon Color", c.icon, "monitoring.colors.icon")}
      ${this._renderColorInput("Badge Outline Color", c.border, "monitoring.colors.border")}
      <div class="select-field">
        <label class="input-label">Treat Unavailable As</label>
        <select
          class="native-select"
          .value=${mon.unavailable_state || "pending"}
          @change=${(e) => this._handleSelectChange(e, "monitoring.unavailable_state")}
        >
          <option value="pending">Pending (monitoring integration unreachable)</option>
          <option value="down">Down</option>
        </select>
      </div>
      ${this._renderLocationSelect(mon.badge_location, "monitoring.badge_location")}

      <div class="sub-header">Badge Icons</div>
      <div class="two-col">
        <div>
          <ha-icon-picker .label=${"Up"} .value=${icons.up || "mdi:check"} @value-changed=${(e) => this._valueChanged(e, "monitoring.icons.up")}></ha-icon-picker>
          <ha-icon-picker .label=${"Pending"} .value=${icons.pending || "mdi:clock-outline"} @value-changed=${(e) => this._valueChanged(e, "monitoring.icons.pending")}></ha-icon-picker>
        </div>
        <div>
          <ha-icon-picker .label=${"Down"} .value=${icons.down || "mdi:close"} @value-changed=${(e) => this._valueChanged(e, "monitoring.icons.down")}></ha-icon-picker>
          <ha-icon-picker .label=${"Maintenance"} .value=${icons.maintenance || "mdi:wrench"} @value-changed=${(e) => this._valueChanged(e, "monitoring.icons.maintenance")}></ha-icon-picker>
        </div>
      </div>
      <ha-icon-picker
        .label=${"Device Badge Icon (several services on one device)"}
        .value=${mon.device_badge_icon || "mdi:heart-pulse"}
        @value-changed=${(e) => this._valueChanged(e, "monitoring.device_badge_icon")}
      ></ha-icon-picker>

      ${this._infoHeader(
        "Response Time Badge",
        "How the response-time badge looks: at the bottom centre of a service's circle (the External box and the Clients box), coloured by these thresholds. Whether a service shows one is set on the service itself (Show Response Time Badge); a badge on a device doesn't carry one. It's hidden while a service is down or has no reading. The reading comes from the service's Response Time entity, or the status entity's own round_trip_time_avg attribute (as the Ping integration provides)."
      )}
      <div class="select-field">
        <label class="input-label">Badge Color</label>
        <select
          class="native-select"
          .value=${r.color_mode || "threshold"}
          @change=${(e) => this._handleSelectChange(e, "monitoring.response.color_mode")}
        >
          <option value="single">Single color</option>
          <option value="threshold">Threshold colors</option>
        </select>
      </div>
      ${r.color_mode === "single"
        ? this._renderColorInput("Badge Color", r.color, "monitoring.response.color")
        : (() => {
            const thresholds = r.thresholds || [];
            return thresholds.map((t, i) => {
              // As with PoE: the LAST row is always the open-ended
              // catch-all, by position rather than by whether its
              // up_to holds a value.
              const isCatchAll = i === thresholds.length - 1;
              return b`
                <div class="two-col">
                  ${isCatchAll
                    ? b`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                    : this._renderInput(`Up to (${r.unit || "ms"})`, t.up_to, `monitoring.response.thresholds.${i}.up_to`, "number")}
                  ${this._renderColorInput("Color", t.color, `monitoring.response.thresholds.${i}.color`)}
                </div>
              `;
            });
          })()}
      ${r.color_mode !== "single"
        ? b`
            <div class="toggle-row">
              <span>Animate when above top threshold</span>
              <ha-switch
                .checked=${r.animate_over_threshold ?? false}
                @change=${(e) => this._valueChanged(e, "monitoring.response.animate_over_threshold")}
              ></ha-switch>
            </div>
          `
        : null}
      ${this._renderColorInput("Text Color", r.text_color, "monitoring.response.text_color")}
    `;
  }

  _renderMonitorEditor(index) {
    const svc = this._monitorServices()[index] || DEFAULT_MONITORED_SERVICE;
    const prefix = `monitoring.services.${index}`;
    const sc = svc.colors || {};
    const type = svc.type || "auto";
    const assign = svc.assign_to || "clients";
    const targets = listMonitorAssignTargets(this.hass, this._config);
    const detected = svc.entity && type === "auto" ? resolveMonitorScope(this.hass, svc) : null;
    const scope = type === "auto" ? (detected ? detected.scope : "internal") : type;
    const address = svc.entity ? resolveMonitorAddress(this.hass, svc) : "";
    const groupBy = this._config.individual_devices_group_by;
    const assignKnown = assign === "clients" || targets.some((t) => t.entity === assign);

    return b`
      <div class="form-section">
        <div class="sub-header">Monitored Service</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${svc.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._monitorEntityChanged(e, index)}
          allow-custom-entity
        ></ha-entity-picker>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          The status entity: an Uptime Kuma status sensor, or a Ping / Gatus /
          UptimeRobot binary sensor.${svc.source ? ` Detected: ${MONITOR_PLATFORM_LABELS[svc.source] || svc.source}.` : ""}
        </p>

        ${this._renderInput("Name Override (Optional)", svc.name, `${prefix}.name`)}
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Defaults to the monitor's own name when discovered; blank uses the
          entity's Friendly Name.
        </p>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${svc.icon || "mdi:heart-pulse"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", sc.circle, `${prefix}.colors.circle`)}
            ${this._renderColorInput("Icon Color", sc.icon, `${prefix}.colors.icon`)}
          </div>
          <div>
            ${this._renderColorInput("Down Border Color", sc.offline_circle, `${prefix}.colors.offline_circle`)}
            ${this._renderColorInput("Down Icon Color", sc.offline_icon, `${prefix}.colors.offline_icon`)}
          </div>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          For a service drawn as its own circle (External box or Clients). The
          Down colours apply while the service is down.
        </p>

        <div class="select-field">
          <label class="input-label">Type</label>
          <select
            class="native-select"
            .value=${type}
            @change=${(e) => this._handleSelectChange(e, `${prefix}.type`)}
          >
            <option value="auto">Auto (from the integration)</option>
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </select>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          ${type === "auto"
            ? `Currently ${scope === "external" ? "External" : "Internal"} - ${detected ? detected.reason : "pick an entity first"}. Auto reads the monitor's tags, then the address it checks (public addresses are External; private ranges, single-word and .local/.lan names are Internal). Gatus exposes neither, so its name is checked for words like External, Public, Internal or LAN.`
            : type === "external"
            ? "Drawn in the External box above Internet, joined to it by dotted lines."
            : "Drawn in the Clients box, or as a badge on a device you choose below."}
          ${address ? ` Address: ${address}.` : ""}
        </p>
        ${type === "auto" && detected && detected.reason.startsWith("no tag or address")
          ? b`
              <p style="color:var(--warning-color, orange); font-size:0.9em; margin:0 0 8px 0;">
                Nothing to classify this service on, so Auto treats it as Internal.
                ${svc.source === "uptime_kuma"
                  ? "Some Uptime Kuma monitor types (push, docker, group ...) have no URL or hostname, and the Monitored URL / hostname and Tags sensors can be switched off in Home Assistant. Enable them, or set Type manually."
                  : "Set Type manually if that's wrong."}
              </p>
            `
          : null}

        ${scope === "internal"
          ? b`
              <div class="select-field">
                <label class="input-label">Assign to:</label>
                <select
                  class="native-select"
                  @change=${(e) => this._handleSelectChange(e, `${prefix}.assign_to`)}
                >
                  <option value="clients" ?selected=${assign === "clients"}>Clients (Monitored group)</option>
                  ${[...new Set(targets.map((t) => t.kind))].map(
                    (kind) => b`
                      <optgroup label=${kind}>
                        ${targets
                          .filter((t) => t.kind === kind)
                          .map((t) => b`<option value=${t.entity} ?selected=${assign === t.entity}>${t.label}</option>`)}
                      </optgroup>
                    `
                  )}
                  ${assignKnown
                    ? null
                    : b`<option value=${assign} selected>Missing device (${assign}) - shown in Clients</option>`}
                </select>
              </div>
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                ${assign === "clients" || !assignKnown
                  ? `A client-style circle with a state badge${groupBy && groupBy !== "none" ? ` in its own "${MONITORED_GROUP_LABEL}" group.` : `. Set Group By on the Clients page to give monitored services their own "${MONITORED_GROUP_LABEL}" group.`}`
                  : "A state badge on that device - the worst state if several services share it."}
                ${type === "auto" ? " Used whenever Auto resolves to Internal." : ""}
              </p>
            `
          : null}

        <div class="sub-header">Response Time</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${svc.response_entity || ""}
          .label=${"Response Time Entity (Optional)"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.response_entity`)}
          allow-custom-entity
        ></ha-entity-picker>
        <div class="toggle-row">
          <span>Show Response Time Badge</span>
          <ha-switch
            .checked=${svc.show_response_time !== false}
            @change=${(e) => this._valueChanged(e, `${prefix}.show_response_time`)}
          ></ha-switch>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shown on this service's circle whenever it has a reading (its look is
          set under Monitoring → Response Time Badge). Not shown while the
          service is down, or when it is a badge on a device.
        </p>
      </div>
    `;
  }

  // The Flat / Hyperbolic tiles - the Discover page opens with the very same ones.
  _renderViewTiles() {
    const viewMode = this._config.view_mode === "hyperbolic" ? "hyperbolic" : "flat";
    const tile = (value, icon, title, blurb) => b`
      <button
        type="button"
        class="view-choice ${viewMode === value ? "selected" : ""}"
        aria-pressed=${viewMode === value ? "true" : "false"}
        @click=${() => this._valueChanged({ target: { value } }, "view_mode")}
      >
        <ha-icon icon=${icon}></ha-icon>
        <span class="view-choice-title">${title}</span>
        <span class="view-choice-blurb">${blurb}</span>
      </button>
    `;
    return b`
      <div class="view-choices">
        ${tile("flat", "mdi:sitemap", "Flat", "The classic top-to-bottom diagram")}
        ${tile("hyperbolic", "mdi:graph-outline", "Hyperbolic", "An explorable tree - drag and tap to zoom in")}
      </div>
    `;
  }

  _toggleLayoutSection(key) {
    const open = this._layoutOpen || { general: true };
    this._layoutOpen = { ...open, [key]: !open[key] };
    this.requestUpdate();
  }

  _renderLayoutPage() {
    const c = this._config;
    const hyper = c.view_mode === "hyperbolic";
    const flatDetails = !hyper && c.flat_show_details === true;
    // The summary card + details panel arrangement is in play (always in the tree, optional in Flat).
    const panels = hyper || flatDetails;
    const detailsOn = hyper ? c.hyperbolic_show_details !== false : flatDetails;
    const arrangement = c.hyperbolic_layout || "auto";
    const pos = c.summary_position || "top";
    const apLayout = c.primary_ap_layout || "flat";
    const showSummary = c.show_summary !== false;
    const animationOn = c.enable_animations === true;
    const popup = detailsOn && c.hyperbolic_details_popup === true;
    const open = this._layoutOpen || (this._layoutOpen = { general: true });
    const note = (text) => b`<p style="color:var(--secondary-text-color); font-size:0.85em; margin:0 0 8px 0;">${text}</p>`;
    const toggle = (label, path, checked) => b`
      <div class="toggle-row">
        <span>${label}</span>
        <ha-switch .checked=${checked} @change=${(e) => this._valueChanged(e, path)}></ha-switch>
      </div>
    `;
    const section = (key, icon, title, body) => b`
      <div class="lay-section ${open[key] ? "open" : ""}">
        <button type="button" class="lay-head" aria-expanded=${open[key] ? "true" : "false"} @click=${() => this._toggleLayoutSection(key)}>
          <ha-icon class="lay-icon" icon=${icon}></ha-icon>
          <span class="lay-title">${title}</span>
          <ha-icon class="lay-chev" icon="mdi:chevron-down"></ha-icon>
        </button>
        ${open[key] ? b`<div class="lay-body">${body()}</div>` : null}
      </div>
    `;

    // ---- General: the card as a whole ------------------------------------
    const general = () => b`
      ${this._renderInput("Title", c.title, "title")}
      ${panels
        ? b`
            <div class="select-field">
              <label class="input-label">Arrangement</label>
              <select
                class="native-select"
                .value=${arrangement}
                @change=${(e) => this._handleSelectChange(e, "hyperbolic_layout")}
              >
                <option value="auto">Auto (by card width)</option>
                <option value="mobile">Phone - summary, diagram and details stacked</option>
                <option value="tablet">Tablet - summary and details on the right</option>
              </select>
            </div>
            ${arrangement !== "mobile"
              ? b`
                  ${hyper
                    ? toggle("Tablet: fit tree to screen height", "hyperbolic_fit_height", c.hyperbolic_fit_height !== false)
                    : null}
                  ${popup
                    ? note(hyper
                        ? "With the details as a pop-up there is no side column: the tree fills the card - as tall as the screen allows if this is on, the full width if it is off."
                        : "With the details as a pop-up there is no side column: the diagram fills the card.")
                    : hyper && c.hyperbolic_fit_height !== false
                    ? note("On: the tree is sized to fill the screen height exactly, and its width follows from that for each display. The summary and details panel take the rest. Turn it off to set the tree width yourself.")
                    : b`
                        ${this._renderSlider(hyper ? "Tablet: Tree Width" : "Tablet: Diagram Width", c.hyperbolic_tablet_split ?? 70, "hyperbolic_tablet_split", 50, 85, 1, "%")}
                        ${note(hyper
                          ? "Off: the tree takes this share of the card width and may be taller than the screen on a wide display."
                          : "The diagram takes this share of the card width in the tablet arrangement; the summary and details panel take the rest. With the details panel on, Card Size Normal is treated as Fit to Width so the whole diagram fits its space - unless Horizontal Scroll is on, in which case the diagram keeps its size and scrolls.")}
                      `}
                `
              : null}
          `
        : null}
      ${hyper
        ? b`
            ${toggle("Glass style (frosted, iOS-like)", "hyperbolic_glass", c.hyperbolic_glass === true)}
            ${c.hyperbolic_glass === true
              ? b`
                  ${this._renderSlider("Glass Blur", c.hyperbolic_glass_blur ?? 45, "hyperbolic_glass_blur", 0, 100, 5, "%")}
                  ${toggle("Transparent card background", "hyperbolic_glass_clear_card", c.hyperbolic_glass_clear_card !== false)}
                  ${note("Glass blurs whatever is behind the card, so it looks best over a dashboard background picture or gradient. Glass replaces the background fill; picking a Background Color (Graph) tints the glass instead. The outline settings still apply.")}
                `
              : null}
          `
        : null}
    `;

    // ---- Graph: the diagram itself ---------------------------------------
    const graph = () => b`
        <div class="toggle-row">
          ${this._toggleLabel(
            "Show IP Addressing",
            "Shows WAN/LAN IP badges on the Router (or Primary AP, if it's acting as your router) and IP badges on every Access Point, wherever an IP Address entity is set. Off by default."
          )}
          <ha-switch
            .checked=${this._config.show_ip_addressing === true}
            @change=${(e) => this._valueChanged(e, "show_ip_addressing")}
          ></ha-switch>
        </div>
      ${hyper
        ? b`
            ${toggle("Show node names", "hyperbolic_show_labels", c.hyperbolic_show_labels !== false)}
            <div class="select-field">
              <label class="input-label">Clients</label>
              <select
                class="native-select"
                .value=${c.hyperbolic_client_layout || "attached"}
                @change=${(e) => this._handleSelectChange(e, "hyperbolic_client_layout")}
              >
                <option value="attached">Attach to the AP / switch they are connected to</option>
                <option value="grouped">Group under a Clients node</option>
              </select>
            </div>
            <div class="sub-header">Tree Appearance</div>
            ${this._renderColorInput("Outline Color", c.hyperbolic_outline_color, "hyperbolic_outline_color")}
            ${this._renderSlider("Outline Transparency", c.hyperbolic_outline_transparency ?? 0, "hyperbolic_outline_transparency", 0, 100, 5, "%")}
            ${this._renderColorInput("Background Color", c.hyperbolic_background_color, "hyperbolic_background_color")}
            ${this._renderSlider("Background Transparency", c.hyperbolic_background_transparency ?? 45, "hyperbolic_background_transparency", 0, 100, 5, "%")}
            ${note("Leave a colour blank to follow your theme. At 100% transparency the circle outline or background disappears completely.")}
          `
        : b`
<div class="select-field">
          <label class="input-label">Primary AP Structure</label>
          <select
            class="native-select"
            .value=${apLayout}
            @change=${(e) => this._handleSelectChange(e, "primary_ap_layout")}
          >
            <option value="tiered">Tiered (Primary AP above the others)</option>
            <option value="flat">Flat (Primary AP in line with the others)</option>
          </select>
        </div>
<div class="select-field">
          <label class="input-label">Card Size</label>
          <select
            class="native-select"
            .value=${this._config.card_size || "normal"}
            @change=${(e) => this._handleSelectChange(e, "card_size")}
          >
            <option value="normal">Normal</option>
            <option value="compact">Compact</option>
            <option value="fit_to_width">Fit to Width</option>
            <option value="scaled">Scaled</option>
          </select>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          ${
            {
              normal: "No change to layout - the size sliders in Sizing and Animations (and everywhere else in this editor) work exactly as set.",
              compact: "Shrinks every circle, badge and icon to its smallest usable size, tightens the column gap between branches to the minimum, and hides client and monitored-service names and IP addressing.",
              fit_to_width: "Automatically finds the smallest zoom that fits the diagram's widest row into the card, recalculating whenever the card is resized or the network changes.",
              scaled: "Shrinks the whole diagram - the External box, the trunk and the Clients box - as one unit, by the percentage below: every circle, badge, icon, connector line and gap between them, continuously, rather than the fixed steps Compact uses."
            }[this._config.card_size || "normal"]
          }
          Whichever is chosen, none of the size settings are changed -
          switching back to Normal shows exactly what was configured before,
          with nothing to set up again.
        </p>
        ${this._config.card_size === "scaled"
          ? this._renderSlider("Scaled", this._config.diagram_scale_value ?? 100, "diagram_scale_value", 40, 100, 5, "%")
          : null}
        ${this._config.card_size === "compact" || this._config.card_size === "scaled"
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">Needs a browser that supports CSS zoom (virtually everything current); on one that doesn't, this has no effect.</p>`
          : null}


        <div class="toggle-row">
          ${this._toggleLabel(
            "Horizontal Scroll",
            "If the diagram is ever wider than the card - a large network with many branches, especially in Normal or before scaling it down - this lets it pan sideways instead of being clipped off the edge. Applies to every Card Size except Fit to Width, which is already sized not to need it. Off by default so existing cards look exactly as they did."
          )}
          <ha-switch
            .checked=${this._config.diagram_horizontal_scroll === true}
            @change=${(e) => this._valueChanged(e, "diagram_horizontal_scroll")}
          ></ha-switch>
        </div>
        <div class="toggle-row">
          ${this._toggleLabel(
            "Hide Names",
            "A global override: hides every name on the card - the label inside Internet, Router, Switch, Access Point, LAN and Server circles, and the names under Clients and Monitored services - even where that section's own Show Names is on. Off by default."
          )}
          <ha-switch
            .checked=${this._config.diagram_hide_names === true}
            @change=${(e) => this._valueChanged(e, "diagram_hide_names")}
          ></ha-switch>
        </div>
        ${this._config.card_size === "fit_to_width" && this._config.diagram_horizontal_scroll === true
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">Not used while Card Size is Fit to Width - the diagram is already sized to fit, so there's nothing to scroll to. Your setting is kept for when you switch to another size.</p>`
          : null}
          `}
${this._infoHeader("Flow Lines", "Controls every connection line and flow dot on the card, except the Internet connection itself (set separately on the Internet page).")}
        ${this._renderColorInput("Flow Line Color", this._config.flow_line_color, "flow_line_color")}
    `;

    // ---- Summary ----------------------------------------------------------
    const summary = () => b`
      ${toggle("Show Summary", "show_summary", showSummary)}
      ${showSummary
        ? b`
            ${panels && arrangement === "tablet" && !popup
              ? null
              : b`
                  <div class="select-field">
                    <label class="input-label">Summary Position</label>
                    <select
                      class="native-select"
                      .value=${pos}
                      @change=${(e) => this._handleSelectChange(e, "summary_position")}
                    >
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                `}
            ${panels && (arrangement !== "tablet" || popup)
              ? note(popup
                  ? "Top puts the summary above the diagram; Bottom puts it just below the diagram. Left and Right do the same as Bottom."
                  : "In the phone arrangement, Top puts the summary above the diagram; Bottom puts it just below the diagram, above the details panel. Left and Right do the same as Bottom. In the tablet arrangement it always sits at the top of the side column.")
              : null}
            ${panels
              ? b`
                  <div class="sub-header">Summary Card</div>
                  ${toggle('Show title ("Summary")', "hyperbolic_summary_show_title", c.hyperbolic_summary_show_title === true)}
                  ${this._renderColorInput("Card Background Color", c.hyperbolic_summary_background_color, "hyperbolic_summary_background_color")}
                  ${this._renderColorInput("Card Outline Color", c.hyperbolic_summary_outline_color, "hyperbolic_summary_outline_color")}
                  ${note("Leave a colour blank to use the same colours as the Details Panel (its own colours if you have set them, otherwise your theme's card and divider colours). The items sit in two columns where there is room.")}
                `
              : null}
${[0, 1, 2, 3, 4].map((idx) => {
                const items = this._config.summary_items || ["realtime_download", "realtime_upload", "ping"];
                const value = items[idx] || "";
                return b`
                  <div class="select-field">
                    <label class="input-label">Summary Item ${idx + 1}</label>
                    <select
                      class="native-select"
                      .value=${value}
                      @change=${(e) => this._handleSelectChange(e, `summary_items.${idx}`)}
                    >
                      <option value="">None</option>
                      <option value="download">Speed test Download</option>
                      <option value="upload">Speed test Upload</option>
                      <option value="realtime_download">Real-time Download</option>
                      <option value="realtime_upload">Real-time Upload</option>
                      <option value="ping">Latency and Jitter</option>
                      <option value="vpn">VPN Status</option>
                      <option value="firewall">Firewall Status</option>
                      <option value="poe">PoE Total</option>
                    </select>
                  </div>
                `;
              })}

              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Download and Upload use the Internet page's entities (e.g.
                Speedtest) - their second line names whichever integration is
                providing that reading. Real-time Download and Real-time
                Upload use the Router's speed entities (Router menu), or the
                Primary Access Point's when there is no Router (a configured
                Router with no speed entity set shows nothing) - their second
                line shows the Total Downloaded / Uploaded entity instead, if
                one is set on the Internet page.
              </p>
              ${(() => {
                const items = this._config.summary_items || ["realtime_download", "realtime_upload", "ping"];
                return [["realtime_download", "download", "Real-time Download"], ["realtime_upload", "upload", "Real-time Upload"]]
                  .filter(([k, dir]) => items.includes(k) && !resolveRealtimeSpeedSource(this._config, dir, this.hass))
                  .map(
                    ([, dir, label]) => b`
                      <p style="color:var(--warning-color, orange); font-size:0.9em; margin:0 0 8px 0;">
                        ${label} has no entity yet - ${this._config.router?.entity ? `set the Router's ${capitalizeFirst(dir)} Speed Entity (Router menu); a configured Router never falls back to the Access Point.` : `set the Primary Access Point's ${capitalizeFirst(dir)} entity, or configure a Router and its ${capitalizeFirst(dir)} Speed Entity.`}
                      </p>
                    `
                  );
              })()}
              ${(this._config.summary_items || ["realtime_download", "realtime_upload", "ping"]).includes("download")
                ? b`
                    <div class="sub-header">Speed Test Download Summary Color</div>
                    <div class="two-col">
                      <div>${this._renderColorInput("Badge Color", this._config.summary_speedtest_download_color, "summary_speedtest_download_color")}</div>
                      <div>${this._renderColorInput("Badge Icon Color", this._config.summary_speedtest_download_icon_color, "summary_speedtest_download_icon_color")}</div>
                    </div>
                  `
                : null}
              ${(this._config.summary_items || ["realtime_download", "realtime_upload", "ping"]).includes("upload")
                ? b`
                    <div class="sub-header">Speed Test Upload Summary Color</div>
                    <div class="two-col">
                      <div>${this._renderColorInput("Badge Color", this._config.summary_speedtest_upload_color, "summary_speedtest_upload_color")}</div>
                      <div>${this._renderColorInput("Badge Icon Color", this._config.summary_speedtest_upload_icon_color, "summary_speedtest_upload_icon_color")}</div>
                    </div>
                  `
                : null}
              ${(this._config.summary_items || ["realtime_download", "realtime_upload", "ping"]).includes("realtime_download")
                ? b`
                    <div class="sub-header">Real-time Download Summary Color</div>
                    <div class="two-col">
                      <div>${this._renderColorInput("Badge Color", this._config.summary_realtime_download_color, "summary_realtime_download_color")}</div>
                      <div>${this._renderColorInput("Badge Icon Color", this._config.summary_realtime_download_icon_color, "summary_realtime_download_icon_color")}</div>
                    </div>
                  `
                : null}
              ${(this._config.summary_items || ["realtime_download", "realtime_upload", "ping"]).includes("realtime_upload")
                ? b`
                    <div class="sub-header">Real-time Upload Summary Color</div>
                    <div class="two-col">
                      <div>${this._renderColorInput("Badge Color", this._config.summary_realtime_upload_color, "summary_realtime_upload_color")}</div>
                      <div>${this._renderColorInput("Badge Icon Color", this._config.summary_realtime_upload_icon_color, "summary_realtime_upload_icon_color")}</div>
                    </div>
                  `
                : null}
              ${(this._config.summary_items || ["realtime_download", "realtime_upload", "ping"]).includes("ping")
                ? b`
                    <div class="sub-header">Latency and Jitter Summary Color</div>
                    <div class="two-col">
                      <div>${this._renderColorInput("Badge Color", this._config.summary_latency_color, "summary_latency_color")}</div>
                      <div>${this._renderColorInput("Badge Icon Color", this._config.summary_latency_icon_color, "summary_latency_icon_color")}</div>
                    </div>
                  `
                : null}
              ${(this._config.summary_items || ["realtime_download", "realtime_upload", "ping"]).includes("poe")
                ? b`
                    <div class="sub-header">PoE Summary Color</div>
                    <div class="select-field">
                      <label class="input-label">Badge Color</label>
                      <select
                        class="native-select"
                        .value=${this._config.summary_poe_color_mode || "single"}
                        @change=${(e) => this._handleSelectChange(e, "summary_poe_color_mode")}
                      >
                        <option value="single">Single color</option>
                        <option value="threshold">Threshold colors</option>
                      </select>
                    </div>

                    ${this._config.summary_poe_color_mode === "threshold"
                      ? (() => {
                          const thresholds = this._config.summary_poe_thresholds || DEFAULT_POE.thresholds;
                          // Same index-based catch-all rule as the
                          // per-switch PoE thresholds: the last row is
                          // always the open-ended tier, decided by
                          // position rather than by whether up_to
                          // currently has a value, so clearing a field
                          // can never lock the row.
                          return thresholds.map((t, i) => {
                            const isCatchAll = i === thresholds.length - 1;
                            return b`
                              <div class="two-col">
                                ${isCatchAll
                                  ? b`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                                  : this._renderInput(
                                      "Up to (W)",
                                      t.up_to,
                                      `summary_poe_thresholds.${i}.up_to`,
                                      "number"
                                    )}
                                ${this._renderColorInput("Color", t.color, `summary_poe_thresholds.${i}.color`)}
                              </div>
                            `;
                          });
                        })()
                      : this._renderColorInput(
                          "Badge Color",
                          this._config.summary_poe_color,
                          "summary_poe_color"
                        )}
                  `
                : null}
          `
        : null}
    `;

    // ---- Details Panel -----------------------------------------------------
    const details = () => b`
      ${hyper
        ? toggle("Show details panel", "hyperbolic_show_details", c.hyperbolic_show_details !== false)
        : b`
            ${toggle("Show Details Panel", "flat_show_details", c.flat_show_details === true)}
            ${note(flatDetails
              ? "On: the classic diagram sits beside (tablet) or above (phone) a summary card and a details panel. Tap a circle to see its details; tap it again to open it. Off: the diagram fills the whole card, exactly as before."
              : "Off: the diagram fills the whole card, exactly as before. Turn on to add a summary card and a details panel (with connected clients and history graphs) beside or below the diagram.")}
          `}
      ${detailsOn
        ? b`
            <div class="select-field">
              <label class="input-label">Header Button</label>
              <select
                class="native-select"
                .value=${c.hyperbolic_details_button || "device"}
                @change=${(e) => this._handleSelectChange(e, "hyperbolic_details_button")}
              >
                <option value="device">Device Page (in the integration it comes from)</option>
                <option value="more-info">More Info (the entity's own dialog)</option>
              </select>
            </div>
            ${note("Device Page opens the device in Settings > Devices. A node with no device, or a user without access to Settings, gets More Info instead. In the pop-up the sheet closes as you go.")}
            ${toggle("Show as Pop-up", "hyperbolic_details_popup", c.hyperbolic_details_popup === true)}
            ${note("On: the panel is not on the page at all - tapping a node slides its details up from the bottom of the screen as a sheet (swipe it down, tap outside it or press the cross to close; its More Info button opens Home Assistant's own dialog). On a phone nothing sits below the diagram any more. On a tablet there is no side column either: the summary moves to the top (per Summary Position) and the diagram fills the card. Off: the panel stays below the diagram on a phone and in the side column on a tablet.")}
            ${toggle("Show connected clients, services and PoE ports", "hyperbolic_show_clients", c.hyperbolic_show_clients !== false)}
            ${toggle("Show history graphs", "hyperbolic_show_graphs", c.hyperbolic_show_graphs !== false)}
            ${c.hyperbolic_show_graphs !== false
              ? b`
                  <div class="select-field">
                    <label class="input-label">Default Graph Timescale</label>
                    <select
                      class="native-select"
                      .value=${c.hyperbolic_graph_range || "24h"}
                      @change=${(e) => this._handleSelectChange(e, "hyperbolic_graph_range")}
                    >
                      ${[["5m", "5 minutes"], ["30m", "30 minutes"], ["1h", "1 hour"], ["12h", "12 hours"], ["24h", "24 hours"], ["72h", "72 hours"]].map(
                        ([v, l]) => b`<option value=${v} ?selected=${(c.hyperbolic_graph_range || "24h") === v}>${l}</option>`
                      )}
                    </select>
                  </div>
                  ${note("Selecting the router, Internet, an access point, a switch or a monitored service shows its recent history: throughput, latency, connected clients or response time. It needs those sensors to be recorded by Home Assistant, and it only loads history for the node you are looking at. Each graph also has its own timescale buttons (5m to 72h) in the card; the choice is remembered on that device.")}
                  <div class="sub-header">Graph Colors</div>
                  <div class="two-col">
                    <div>
                      ${this._renderColorInput("Download Graph Color", c.hyperbolic_graph_download_color, "hyperbolic_graph_download_color")}
                      ${this._renderColorInput("Ping Graph Color", c.hyperbolic_graph_ping_color, "hyperbolic_graph_ping_color")}
                      ${this._renderColorInput("CPU Graph Color", c.hyperbolic_graph_cpu_color, "hyperbolic_graph_cpu_color")}
                      ${this._renderColorInput("Disk Graph Color", c.hyperbolic_graph_disk_color, "hyperbolic_graph_disk_color")}
                    </div>
                    <div>
                      ${this._renderColorInput("Upload Graph Color", c.hyperbolic_graph_upload_color, "hyperbolic_graph_upload_color")}
                      ${this._renderColorInput("Jitter Graph Color", c.hyperbolic_graph_jitter_color, "hyperbolic_graph_jitter_color")}
                      ${this._renderColorInput("Memory Graph Color", c.hyperbolic_graph_memory_color, "hyperbolic_graph_memory_color")}
                      ${this._renderColorInput("Response Time Graph Color", c.hyperbolic_graph_response_color, "hyperbolic_graph_response_color")}
                    </div>
                  </div>
                  ${this._renderColorInput("Connected Clients Graph Color", c.hyperbolic_graph_clients_color, "hyperbolic_graph_clients_color")}
                  ${note("Leave a colour blank for the usual one: Download and Upload follow each device's own line colours (or your Summary colours), the rest use the card's standard colours. A colour set here applies to that series on every graph that has it.")}
                `
              : null}
            ${this._renderColorInput("Panel Background Color", c.hyperbolic_details_background_color, "hyperbolic_details_background_color")}
            ${this._renderColorInput("Panel Outline Color", c.hyperbolic_details_outline_color, "hyperbolic_details_outline_color")}
            ${note("Leave blank to use your theme's card colour and divider colour. The More Info button takes the icon colour of the node it describes.")}
          `
        : null}
    `;

    // ---- Sizing and Animations ----------------------------------------------
    const sizing = () => b`
      ${hyper
        ? b`
            <div class="sub-header">Node Sizes</div>
            ${this._renderSlider("All Nodes", c.hyperbolic_node_scale ?? 100, "hyperbolic_node_scale", 40, 200, 5, "%")}
            ${this._renderSlider("Internet", c.hyperbolic_size_internet ?? 100, "hyperbolic_size_internet", 40, 200, 5, "%")}
            ${this._renderSlider("Router", c.hyperbolic_size_router ?? 100, "hyperbolic_size_router", 40, 200, 5, "%")}
            ${this._renderSlider("LAN", c.hyperbolic_size_lan ?? 100, "hyperbolic_size_lan", 40, 200, 5, "%")}
            ${this._renderSlider("Switch", c.hyperbolic_size_switch ?? 100, "hyperbolic_size_switch", 40, 200, 5, "%")}
            ${this._renderSlider("Access Point", c.hyperbolic_size_ap ?? 100, "hyperbolic_size_ap", 40, 200, 5, "%")}
            ${this._renderSlider("Server", c.hyperbolic_size_homelab ?? 100, "hyperbolic_size_homelab", 40, 200, 5, "%")}
            ${this._renderSlider("Connected Clients", c.hyperbolic_size_count ?? 100, "hyperbolic_size_count", 40, 200, 5, "%")}
            ${this._renderSlider("Clients, Services and Containers", c.hyperbolic_size_client ?? 100, "hyperbolic_size_client", 40, 200, 5, "%")}
            ${note("All Nodes scales everything; each type is then scaled on top of that. The layout spaces the tree out to make room, so bigger nodes do not overlap. Changing a size recentres the view.")}
          `
        : b`
${this._config.card_size === "compact"
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px;">Card Size is set to Compact, so these are ignored for now - they still hold your normal sizes and take effect again the moment it's switched back to Normal.</p>`
          : this._config.card_size === "scaled"
          ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px;">Card Size is set to Scaled, which shrinks these proportionally as one unit rather than reading them individually - they still hold your normal sizes and take effect again the moment it's switched back to Normal.</p>`
          : null}
        <div class="sub-header">Sizes</div>
        ${this._renderSlider("Internet Circle Size", this._config.internet?.circle_size, "internet.circle_size", 40, 120)}
        ${this._renderSlider("Internet Icon Size", this._config.internet?.icon_size, "internet.icon_size", 12, 64)}
        ${this._renderSlider("Router Circle Size", this._config.router?.circle_size, "router.circle_size", 40, 120)}
        ${this._renderSlider("Router Icon Size", this._config.router?.icon_size, "router.icon_size", 12, 64)}
        ${this._renderSlider("Switch Circle Size", this._config.switch?.circle_size, "switch.circle_size", 30, 100)}
        ${this._renderSlider("Switch Icon Size", this._config.switch?.icon_size, "switch.icon_size", 10, 56)}
        ${this._renderSlider("Server Circle Size", this._config.homelab_circle_size, "homelab_circle_size", 30, 100)}
        ${this._renderSlider("Server Icon Size", this._config.homelab_icon_size, "homelab_icon_size", 10, 56)}
        ${this._renderSlider("LAN Circle Size", this._config.lan?.circle_size, "lan.circle_size", 30, 90)}
        ${this._renderSlider("LAN Icon Size", this._config.lan?.icon_size, "lan.icon_size", 10, 48)}
        ${this._renderSlider("AP Circle Size", this._config.ap_circle_size, "ap_circle_size", 40, 120)}
        ${this._renderSlider("AP Icon Size", this._config.ap_icon_size, "ap_icon_size", 12, 64)}
        ${this._renderSlider("Connected Clients Circle Size", this._config.ap_devices_circle_size, "ap_devices_circle_size", 30, 90)}
        ${this._renderSlider("Connected Clients Icon Size", this._config.ap_devices_icon_size, "ap_devices_icon_size", 10, 48)}
        ${this._renderSlider("Backhaul Icon Size", this._config.backhaul_icon_size, "backhaul_icon_size", 8, 24)}
        ${this._renderSlider("Client Circle Size", this._config.individual_device_circle_size, "individual_device_circle_size", 20, 70)}
        ${this._renderSlider("Client Icon Size", this._config.individual_device_icon_size, "individual_device_icon_size", 10, 40)}
          `}
      <div class="sub-header">Badge Sizes</div>
      ${this._renderSlider("Guest Badge Size", c.individual_device_guest_badge_size, "individual_device_guest_badge_size", 12, 40)}
      ${this._renderSlider("Guest Badge Icon Size", c.individual_device_guest_icon_size, "individual_device_guest_icon_size", 8, 24)}
      ${this._renderSlider("Badge Size", c.badge_size, "badge_size", 12, 40)}
      ${this._renderSlider("Badge Icon Size", c.badge_icon_size, "badge_icon_size", 8, 28)}
      ${this._renderSlider("IP/PoE Badge Size", c.poe_badge_size, "poe_badge_size", 10, 32)}
      ${this._renderSlider("IP/PoE Font Size", c.poe_badge_font_size, "poe_badge_font_size", 7, 16)}
      ${hyper
        ? null
        : b`
            ${this._renderSlider("Group Box Padding", c.individual_devices_group_padding, "individual_devices_group_padding", 0, 24)}
            ${this._renderSlider("IP Address Badge Opacity (%)", c.ip_badge_opacity ?? 100, "ip_badge_opacity", 0, 100)}
            ${this._renderSlider("Column Gap", c.ap_column_gap, "ap_column_gap", 8, 60)}
          `}
<div class="sub-header">Animation</div>
        <div class="toggle-row">
          ${this._toggleLabel(
            "Enable Animations",
            "Master switch for all card animations, including flow dots, offline pulsing/flashing and animated status badges. Disabled by default."
          )}
          <ha-switch
            .checked=${animationOn}
            @change=${(e) => this._valueChanged(e, "enable_animations")}
          ></ha-switch>
        </div>

        ${animationOn
          ? b`
              <div class="two-col">
                <div>
                  ${this._renderInput("Min Flow Duration (seconds)", String(this._config.min_flow_duration ?? 0.6), "min_flow_duration", "number")}
                </div>
                <div>
                  ${this._renderInput("Max Flow Duration (seconds)", String(this._config.max_flow_duration ?? 6), "max_flow_duration", "number")}
                </div>
              </div>
            `
          : null}
    `;

    return b`
      <div class="form-section">
        ${this._renderViewTiles()}
        ${section("general", "mdi:cog-outline", "General", general)}
        ${section("graph", "mdi:vector-polyline", "Graph", graph)}
        ${section("summary", "mdi:view-list-outline", "Summary", summary)}
        ${section("details", "mdi:card-text-outline", "Details Panel", details)}
        ${section("sizing", "mdi:resize", "Sizing and Animations", sizing)}
      </div>
    `;
  }

  static get styles() {
    return i$3`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 4px;
      }
      .editor-menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e1e1e1);
        border-radius: 8px;
        cursor: pointer;
      }
      .menu-item:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }
      .lay-section {
        margin: 10px 0 0 0;
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 12px;
        overflow: hidden;
      }
      .lay-head {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        box-sizing: border-box;
        padding: 12px 14px;
        margin: 0;
        border: 0;
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        font-weight: 600;
        text-align: left;
        cursor: pointer;
      }
      .lay-head:hover,
      .lay-head:focus-visible {
        background: color-mix(in srgb, var(--primary-color) 8%, transparent);
        outline: none;
      }
      .lay-icon {
        color: var(--primary-color);
        flex: none;
      }
      .lay-title {
        flex: 1 1 auto;
      }
      .lay-chev {
        flex: none;
        color: var(--secondary-text-color);
        transition: transform 0.2s ease;
      }
      .lay-section.open .lay-chev {
        transform: rotate(180deg);
      }
      .lay-section.open > .lay-head {
        border-bottom: 1px solid var(--divider-color, #ccc);
      }
      .lay-body {
        padding: 6px 14px 14px 14px;
      }
      .view-choices {
        display: flex;
        gap: 8px;
      }

      .view-choice {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 12px 8px;
        border-radius: 12px;
        border: 2px solid var(--divider-color, #ccc);
        background: transparent;
        color: var(--primary-text-color);
        font: inherit;
        cursor: pointer;
        text-align: center;
      }
      .view-choice.selected {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      }
      .view-choice ha-icon {
        --mdc-icon-size: 26px;
        color: var(--secondary-text-color);
      }
      .view-choice.selected ha-icon {
        color: var(--primary-color);
      }
      .view-choice-title {
        font-weight: 700;
        font-size: 0.95rem;
      }
      .view-choice-blurb {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        line-height: 1.25;
      }
      .discover-menu-item {
        background: var(--primary-color) !important;
        border: none;
        margin-bottom: 8px;
      }
      .discover-menu-item:hover {
        filter: brightness(0.94);
      }
      .menu-item-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .menu-item-title {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .menu-item-summary {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .chevron {
        color: var(--secondary-text-color);
      }
      .back-header {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 4px 0 8px 0;
        font-weight: 600;
        color: var(--primary-color, #3b82f6);
      }
      .form-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .sub-header {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--primary-text-color);
        margin-top: 8px;
        margin-bottom: 4px;
        border-bottom: 1px solid var(--divider-color, #e1e1e1);
        padding-bottom: 4px;
      }
      .input-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .input-label {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .text-input {
        width: 100%;
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 0.95rem;
        box-sizing: border-box;
        outline: none;
      }
      .text-input:focus {
        border-color: var(--primary-color, #3b82f6);
      }
      .text-input.dense {
        padding: 8px 10px;
        flex: 1;
        min-width: 0;
      }
      input[type="range"] {
        width: 100%;
        cursor: pointer;
      }
      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 16px;
        align-items: start;
      }
      .two-col > div {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .color-picker-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .color-picker-label {
        font-size: 0.85rem;
        color: var(--primary-text-color);
      }
      .color-picker-group {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
      }
      .color-picker-input {
        width: 32px;
        height: 32px;
        padding: 0;
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 4px;
        cursor: pointer;
        background: none;
      }
      .color-picker-input::-webkit-color-swatch-wrapper {
        padding: 0;
      }
      .color-picker-input::-webkit-color-swatch {
        border: none;
        border-radius: 2px;
      }
      .color-picker-input::-moz-color-swatch {
        border: none;
        border-radius: 2px;
      }
      .select-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .native-select {
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 0.95rem;
        outline: none;
        cursor: pointer;
      }
      .scan-status {
        color: var(--secondary-text-color);
        font-size: 0.8em;
        margin: 4px 0 0 0;
      }
      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e1e1e1);
        border-radius: 8px;
      }
      .list-item-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      /* Nodes tree */
      .tree-node {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .tree-card {
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e1e1e1);
        border-radius: 8px;
        overflow: hidden;
      }
      .tree-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
      }
      .add-node-row {
        display: flex;
        gap: 8px;
        margin-top: 4px;
      }
      .add-node-row .add-btn {
        flex: 1;
        margin-top: 0;
        padding-left: 4px;
        padding-right: 4px;
        white-space: nowrap;
      }
      .tree-item .list-item-info {
        flex: 1;
        min-width: 0;
        gap: 8px;
      }
      .tree-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tree-count {
        flex: none;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, #eee);
        border-radius: 10px;
        padding: 1px 7px;
      }
      .tree-children {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-left: 20px;
        padding-left: 10px;
        border-left: 2px solid var(--divider-color, #e1e1e1);
      }
      .tree-chevron {
        --mdc-icon-button-size: 32px;
        flex: none;
      }
      .tree-chevron-spacer {
        display: inline-block;
        width: 32px;
        flex: none;
      }
      .status-dot {
        flex: none;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--disabled-text-color, #bdbdbd);
      }
      .status-dot.online {
        background: var(--success-color, #43a047);
      }
      .status-dot.offline {
        background: var(--error-color, #db4437);
      }
      .tree-toolbar {
        display: flex;
        justify-content: flex-end;
        gap: 4px;
      }
      .tree-tool-btn {
        background: none;
        border: none;
        color: var(--primary-color, #3b82f6);
        font-weight: 600;
        cursor: pointer;
        padding: 4px 8px;
      }
      .tree-add-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        padding: 6px 12px 10px 44px;
        border-top: 1px solid var(--divider-color, #e1e1e1);
      }
      .tree-add-hint {
        flex: 0 0 100%;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .tree-add-btn {
        padding: 4px 10px;
        background: transparent;
        border: none;
        color: var(--primary-color, #3b82f6);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tree-breadcrumb {
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
      .tree-note {
        margin: 0;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
      .list-item-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .list-item-actions ha-icon-button ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-text-color);
      }
      .add-btn {
        padding: 10px;
        background: var(--primary-color, #3b82f6);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 4px;
      }
      .add-btn:hover {
        opacity: 0.9;
      }
      .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
      }
    `;
  }
}


if (!customElements.get("network-flow-card")) {
  customElements.define("network-flow-card", NetworkFlowCard);
}
if (!customElements.get("network-flow-card-editor")) {
  customElements.define("network-flow-card-editor", NetworkFlowCardEditor);
}

// Home Assistant's "Add Card -> By card" search picker reads from this
// global array to list installed custom cards - separate from (and in
// addition to) customElements.define above, which only makes the
// element renderable once it's actually placed on a dashboard. Without
// this, the card works fine added via YAML (type: custom:network-flow-card)
// but never appears in that search UI at all.
window.customCards = window.customCards || [];
window.customCards.push({
  type: "network-flow-card",
  name: "Network Flow Card",
  description: "Visualize your home network as a live, animated topology diagram - or explore it as a hyperbolic tree. Internet, Router, Switches, Access Points, and Clients.",
  preview: false,
  documentationURL: "https://github.com/benmac7/network-flow-card"
});

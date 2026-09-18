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
 * NETWORK-FLOW-CARD v3.1.0
 * A power-flow-card-plus style custom visual card for Home Assistant
 * featuring internet, router, LAN, Wi-Fi access points, and multi-row client monitoring.
 *
 * Visual style inspired by power-flow-card-plus by flixlix:
 * https://github.com/flixlix/power-flow-card-plus
 * (independent implementation, no shared code)
 *
 * https://github.com/YOUR_GITHUB_USERNAME/network-flow-card
 */


console.info(
  "%c NETWORK-FLOW-CARD %c v3.1.0 ",
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
    // IP Address badges (Advanced > Layout > Show IP Addressing).
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
  // Connected Devices circle to Clients, matching how any
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

const DEFAULT_CONFIG = {
  type: "custom:network-flow-card",
  title: "",
  summary_position: "top",
  summary_items: ["download", "upload", "ping"],
  // Colors the PoE summary badge, mirroring the per-switch PoE badge's
  // own color options (single fixed color, or ascending thresholds).
  // Separate from any individual switch's `poe` config since this one
  // colors an aggregate total across every switch shown on the card.
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
  show_ip_addressing: false,
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
  individual_device_guest_icon: "mdi:account-question",
  individual_device_guest_icon_color: "var(--secondary-text-color)",
  individual_device_guest_icon_bg: "transparent",
  individual_device_guest_icon_size: 16,
  individual_device_guest_badge_size: 24,
  internet: {
    name: "",
    entity: "",
    icon: "mdi:web",
    circle_size: 72,
    icon_size: 24,
    download_icon: "mdi:download",
    upload_icon: "mdi:upload",
    ping_icon: "mdi:speedometer",
    entities: {
      ping: "",
      jitter: "",
      download: "",
      upload: "",
      total_download: "",
      total_upload: "",
      billing_total: "",
      billing_remaining: ""
    },
    colors: {
      icon: "var(--green-color)",
      billing_remaining: "var(--divider-color)",
      billing_progress: "var(--green-color)",
      download: "var(--blue-color)",
      upload: "var(--orange-color)",
      circle: "var(--green-color)",
      download_badge: "var(--green-color)",
      download_badge_icon: "var(--text-primary-color)",
      upload_badge: "var(--pink-color)",
      upload_badge_icon: "var(--text-primary-color)",
      ping_badge: "var(--cyan-color)",
      ping_badge_icon: "var(--text-primary-color)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    }
  },
  router: {
    entity: "",
    name: "",
    icon: "mdi:router-network",
    circle_size: 72,
    icon_size: 24,
    entities: {
      status: "",
      // IP Address badges (Advanced > Layout > Show IP Addressing) -
      // WAN centers below the Internet circle (this router doubles as
      // the gateway), LAN centers below this Router circle itself.
      wan_ip: "",
      lan_ip: ""
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
  // "none" | "vlan" | "ap" - splits the Clients box into
  // labeled sub-groups instead of one flat row.
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
  show_summary: true,
  // Master animation switch. Disabled by default so the card does no
  // continuous animation work unless the user explicitly opts in.
  enable_animations: false,
  min_flow_duration: 0.6,
  max_flow_duration: 6
};

// --- Helper Functions ---
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
// - "ap": groups by connected Access Point - TP-Link's `deco_device`
//   (a friendly name), or UniFi's `ap_mac` (a MAC address, since
//   UniFi doesn't expose a friendly AP name on the client attributes).
//
// Anything missing the relevant attribute (e.g. a binary_sensor with
// none of these) falls into "Unknown" rather than being silently
// dropped.
function getDeviceGroupName(hass, dev, groupBy) {
  if (dev.group_override) return dev.group_override;
  if (groupBy === "none") return null;
  const attrs = hass?.states?.[dev.entity]?.attributes || {};
  // TP-Link Deco reports this as `connection_type` on real devices
  // (confirmed against actual entity attributes); UniFi and some other
  // integrations use the shorter `connection` - both are checked since
  // they don't collide. AsusRouter reports the literal string "Wired"
  // (capitalized, confirmed from its own const.py) rather than
  // lowercase "wired", so the comparison is case-insensitive.
  const connectionValue = String(attrs.connection ?? attrs.connection_type ?? "").toLowerCase();
  if (connectionValue === "wired") return "Wired";

  if (groupBy === "ssid") {
    if (attrs.is_guest === true) return "Guest";
    const ssid = attrs.interface || attrs.essid;
    return ssid ? capitalizeFirst(ssid) : "Unknown";
  }

  if (groupBy === "vlan") {
    if (attrs.vlan != null && attrs.vlan !== "") return `VLAN ${attrs.vlan}`;
    if (attrs.is_guest === true) return "Guest";
    return attrs.interface ? capitalizeFirst(attrs.interface) : "Unknown";
  }

  if (groupBy === "ap") {
    return attrs.deco_device || attrs.ap_mac || "Unknown";
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

function isEntityUnavailable(hass, entityId) {
  if (!entityId) return false;
  if (!hass || !hass.states[entityId]) return true;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "unavailable" || state === "unknown" || state === "off" || state === "not_home";
}

function isVpnActive(hass, entityId) {
  if (!entityId || !hass || !hass.states[entityId]) return false;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "on";
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
    (node.access_points || []).forEach((ap) => {
      if (ap.poe && ap.poe.mode !== "off") switches.push(ap);
    });
    (node.fed_switches || []).forEach((sw) => {
      if (sw.poe && sw.poe.mode !== "off") switches.push(sw);
    });
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


// Builds the parts of the diagram that depend only on configuration.
// This used to run inside render(), which meant a 1-second bandwidth
// sensor update rebuilt the entire node/AP/switch topology even though
// that topology had not changed. setConfig() now computes it once.
function buildNetworkTopology(config) {
  const columns = [];
  (config.nodes || []).forEach((node) => {
    const feedAps = node.access_points || [];
    const feedSwitches = node.fed_switches || [];
    const hasFeedChildren = feedAps.length > 0 || feedSwitches.length > 0;
    if (node.switch && hasFeedChildren) {
      const groupTotal = feedAps.length + feedSwitches.length;
      feedAps.forEach((ap, i) => {
        columns.push({
          ap,
          subSwitch: null,
          switch: node.switch,
          switchGroupStart: i === 0,
          switchGroupSize: groupTotal
        });
      });
      feedSwitches.forEach((sw, i) => {
        columns.push({
          ap: null,
          subSwitch: sw,
          switch: node.switch,
          switchGroupStart: feedAps.length === 0 && i === 0,
          switchGroupSize: groupTotal
        });
      });
    } else if (node.switch) {
      columns.push({ ap: null, subSwitch: null, switch: node.switch, switchGroupStart: true, switchGroupSize: 1 });
    } else if (node.homelab) {
      columns.push({ ap: null, subSwitch: null, switch: node.homelab, switchGroupStart: true, switchGroupSize: 1, isHomelab: true });
    } else {
      (node.access_points || []).forEach((ap) => {
        columns.push({ ap, subSwitch: null, switch: null, switchGroupStart: false, switchGroupSize: 0 });
      });
    }
  });

  const primaryApLayout = config.primary_ap_layout || "flat";
  let primaryAp = primaryApLayout === "tiered"
    ? (columns.find((col) => col.ap?.is_primary)?.ap || null)
    : null;

  // A Primary AP inside a Switch group cannot be promoted to Tiered
  // without breaking the group's shared grid structure.
  if (primaryAp && columns.some((col) => col.ap === primaryAp && col.switch)) {
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
    primaryApLayout,
    primaryAp,
    primaryOriginalIndex
  };
}


// --- Main Card Component ---
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
  }

  static async getConfigElement() {
    // Lazy-load the visual editor only when Home Assistant opens card config.
    // The editor chunk is served from the same HACS/local directory as this
    // runtime bundle; there are no CDN or third-party runtime imports.
    const editorUrl = new URL("./network-flow-card-editor.js", import.meta.url);
    const runtimeUrl = new URL(import.meta.url);
    // Keep the editor chunk on the same cache-busting version as the main
    // resource (HACS uses hacstag; manual installs commonly use v).
    for (const key of ["hacstag", "v"]) {
      const value = runtimeUrl.searchParams.get(key);
      if (value) editorUrl.searchParams.set(key, value);
    }
    await import(editorUrl.href);
    return document.createElement("network-flow-card-editor");
  }

  static getStubConfig() {
    return { ...DEFAULT_CONFIG };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    const migrated = migrateAccessPointsToNodes(config);
    const merged = deepMerge(DEFAULT_CONFIG, migrated);
    // `animation` was the legacy flow-dot setting and used to default on.
    // The new master switch is deliberately a fresh opt-in key so upgrading
    // an existing card cannot silently carry the old default forward.
    delete merged.animation;
    merged.nodes = (migrated.nodes || []).map((node) => {
      const mergedNode = deepMerge(DEFAULT_NODE, node);
      mergedNode.switch = node.switch ? deepMerge(DEFAULT_NODE_SWITCH, node.switch) : null;
      mergedNode.homelab = node.homelab ? deepMerge(DEFAULT_HOMELAB, node.homelab) : null;
      if (mergedNode.homelab) {
        mergedNode.homelab.containers = (node.homelab?.containers || []).map((c) =>
          deepMerge(DEFAULT_CONTAINER_BADGE, c)
        );
      }
      mergedNode.access_points = (node.access_points || []).map((ap) =>
        deepMerge(DEFAULT_ACCESS_POINT, ap)
      );
      mergedNode.fed_switches = (node.fed_switches || []).map((sw) =>
        deepMerge(DEFAULT_NODE_SWITCH, sw)
      );
      return mergedNode;
    });
    merged.individual_devices = (config.individual_devices || []).map((dev) =>
      deepMerge(DEFAULT_INDIVIDUAL_DEVICE, dev)
    );
    this._config = merged;
    // Drives shouldUpdate below - recomputed here (config changes are
    // rare) rather than on every hass tick.
    this._trackedEntityIds = collectEntityIdsFromConfig(merged);
    this._topology = buildNetworkTopology(merged);

    // animation is a true master switch. Existing configs that explicitly
    // opted in remain enabled; new/default configs are disabled.
    this.toggleAttribute("animations-disabled", merged.enable_animations !== true);
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
    return 4;
  }

  connectedCallback() {
    super.connectedCallback();

    if (typeof ResizeObserver !== "undefined" && !this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._scheduleAlignBusLine());
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
    // The bus-line's geometry only depends on config (sizes, labels,
    // how many nodes/columns exist) - never on an entity's live value -
    // so re-measuring it on every entity-triggered update (as opposed
    // to a config change or the very first render) was pure wasted
    // layout work.
    if (changedProps.has("_config") || !this._hasAlignedOnce) {
      this._hasAlignedOnce = true;
      this._scheduleAlignBusLine();
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

    const leftMargin = Math.max(0, leftMost.refLeft - branchesRect.left);
    const rightMargin = Math.max(0, branchesRect.right - rightMost.refRight);
    busLine.style.marginLeft = `${leftMargin}px`;
    busLine.style.marginRight = `${rightMargin}px`;
    this._busMarginLeft = leftMargin;
    this._busMarginRight = rightMargin;

    const trunkEl = root.querySelector(".trunk");
    const trunkCircles = trunkEl
      ? Array.from(
          trunkEl.querySelectorAll(
            ":scope > .circle-wrap, :scope > .internet-row > .circle-wrap"
          )
        )
      : [];
    const feederCircle = trunkCircles[trunkCircles.length - 1];
    if (feederCircle) {
      const leftColCenter = leftMost.center;
      const rightColCenter = rightMost.center;
      const branchesMidpoint = (leftColCenter + rightColCenter) / 2;
      const feederRect = feederCircle.getBoundingClientRect();
      const feederCenterX = feederRect.left + feederRect.width / 2;
      const shiftX = feederCenterX - branchesMidpoint;
      branches.style.transform = `translateX(${shiftX}px)`;
      this._branchesShiftX = shiftX;

      // The trunk-drop defaults to justify-self:center, which centers it
      // against the whole grid group's geometric width - the same wrong
      // reference point that caused the whole-block shift bug. Position
      // it explicitly at the same midpoint used above, so it can never
      // disagree with where the block was just shifted to.
      const trunkDrop = branches.querySelector(".trunk-drop");
      if (trunkDrop) {
        const trunkMarginLeft = branchesMidpoint - branchesRect.left - 1;
        trunkDrop.style.justifySelf = "start";
        trunkDrop.style.marginLeft = `${Math.max(0, trunkMarginLeft)}px`;
        this._trunkMarginLeft = trunkMarginLeft;
      }
    }
  }

  _handleMoreInfo(entityId) {
    if (!entityId) return;
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
      <ha-icon icon="${cfg.primary_badge_icon || 'mdi:star'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
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
      <ha-icon icon="${cfg.vpn_badge_icon || 'mdi:vpn'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
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
      <ha-icon icon="${cfg.firewall_badge_icon || 'mdi:wall-fire'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
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
      <ha-icon icon="${poeConfig.icon || 'mdi:lightning-bolt'}" style="--mdc-icon-size:${fontSize}px; color:${textColor};"></ha-icon>
      <span>${roundVal(total)}${poeConfig.unit || "W"}</span>
    </div>`;
  }

  // IP Address badge - a small pill showing a plain IP address string,
  // gated globally by Advanced > Layout > Show IP Addressing. Unlike
  // every other badge it's centered directly above or below its
  // circle rather than anchored to a corner (see centeredBadgeStyle),
  // and per the ask it's sized identically to the PoE badge
  // (poe_badge_size/poe_badge_font_size) rather than the general
  // badge_size/badge_icon_size the other status badges share.
  // `ownerCfg` is whichever config object (router or an access point)
  // owns the ip_badge_color/ip_badge_icon_color fields for this badge.
  _renderIpBadge(hass, entityId, position, ownerCfg) {
    if (!this._config.show_ip_addressing) return null;
    if (!entityId) return null;
    const stateObj = hass?.states?.[entityId];
    if (!stateObj) return null;
    // Some integrations (e.g. TP-Link Deco) report the address as an
    // `ip`/`ip_address` attribute on a device_tracker entity whose
    // actual state is home/not_home, rather than as a dedicated
    // sensor whose state IS the address (e.g. TP-Link Router's WAN/LAN
    // IPv4 sensors) - check attributes first, then fall back to state.
    const value = stateObj.attributes?.ip ?? stateObj.attributes?.ip_address ?? stateObj.state;
    if (!value || value === "unknown" || value === "unavailable") return null;

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
        <ha-icon icon="${cfg.dns_badge_icon || 'mdi:shield-check'}" style="--mdc-icon-size:${iconSize}px; color:${textColor};"></ha-icon>
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
      <ha-icon icon="${cfg.dns_badge_icon || 'mdi:shield-check'}" style="--mdc-icon-size:${iconSize}px; color:${textColor};"></ha-icon>
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
      <ha-icon icon="${cfg.reverse_proxy_badge_icon || 'mdi:server-network'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  // A single container/VM status badge on a Homelab node. Shaped like
  // VPN/Firewall (active/offline icon badge) but per-item, since a
  // Homelab node can carry any number of these (one per tracked
  // container/VM), each independently positioned and stacking with
  // everything else on that circle.
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
      <ha-icon icon="${containerCfg.icon || 'mdi:docker'}" style="--mdc-icon-size:${this._config.badge_icon_size ?? 12}px"></ha-icon>
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
    const icon = this._config.individual_device_guest_icon || "mdi:account-question";
    const color = this._config.individual_device_guest_icon_color || "var(--secondary-text-color)";
    const bg = this._config.individual_device_guest_icon_bg || "transparent";
    const size = this._config.individual_device_guest_icon_size ?? 16;
    // Container size is independently configurable (Advanced -> Sizes)
    // rather than derived from the icon size, so the badge and its
    // icon can be scaled separately - matching how the PoE badge
    // separates Badge Size from Badge Font Size.
    const containerSize = this._config.individual_device_guest_badge_size ?? 24;
    return b`<div
      class="guest-badge"
      style="background:${bg}; width:${containerSize}px; height:${containerSize}px;"
    >
      <ha-icon icon="${icon}" style="color:${color};--mdc-icon-size:${size}px"></ha-icon>
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
            style="background:${internet.colors.download_badge}"
          >
            <ha-icon
              .icon=${internet.download_icon || "mdi:download"}
              style="color:${internet.colors.download_badge_icon}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.downloadState ? `${ctx.downloadState.display}${ctx.downloadState.unit}` : "-"}
            </div>
            ${ctx.totalDlState
              ? b`<div class="summary-secondary">
                  ${ctx.totalDlState.display}${ctx.totalDlState.unit}
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
            style="background:${internet.colors.upload_badge}"
          >
            <ha-icon
              .icon=${internet.upload_icon || "mdi:upload"}
              style="color:${internet.colors.upload_badge_icon}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.uploadState ? `${ctx.uploadState.display}${ctx.uploadState.unit}` : "-"}
            </div>
            ${ctx.totalUlState
              ? b`<div class="summary-secondary">
                  ${ctx.totalUlState.display}${ctx.totalUlState.unit}
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
            style="background:${internet.colors.ping_badge || '#00bcd4'}"
          >
            <ha-icon
              .icon=${internet.ping_icon || "mdi:speedometer"}
              style="color:${internet.colors.ping_badge_icon || '#ffffff'}"
            ></ha-icon>
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
            <ha-icon
              .icon=${config.vpn_badge_icon || "mdi:vpn"}
              style="color:${iconColor}"
            ></ha-icon>
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
            <ha-icon
              .icon=${config.firewall_badge_icon || "mdi:wall-fire"}
              style="color:${iconColor}"
            ></ha-icon>
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
            <ha-icon icon="mdi:lightning-bolt" style="color:${iconColor}"></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">PoE</div>
            <div class="summary-secondary">${roundVal(total)}W</div>
          </div>
        </div>
      `;
    }
    return null;
  }

  render() {
    if (!this._config || !this.hass) return b``;

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
    const billingTotalState = getEntityState(hass, internet.entities.billing_total);
    const billingRemState = getEntityState(hass, internet.entities.billing_remaining);

    const dlDur = calcFlowDuration(downloadState?.value, minDur, maxDur);
    const ulDur = calcFlowDuration(uploadState?.value, minDur, maxDur);

    const bTotal = billingTotalState?.value;
    const bRem = billingRemState?.value;
    const hasBilling =
      internet.entities.billing_total &&
      internet.entities.billing_remaining &&
      bTotal != null &&
      bTotal > 0 &&
      bRem != null;
    const billingRatio = hasBilling ? Math.max(0, Math.min(1, bRem / bTotal)) : 0;
    const billingCompletedRatio = hasBilling ? 1 - billingRatio : 0;

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

    // Static topology is built once in setConfig(); only the Primary AP's
    // live values are derived here when a relevant entity actually changes.
    const topology = this._topology || buildNetworkTopology(config);
    const {
      branchColumns,
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
            ${(config.summary_items || ["download", "upload", "ping"])
              .slice(0, 3)
              .map((key) => this._renderSummaryItem(key, config, hass, summaryCtx))}
          </div>
        `
      : null;

    return b`
      <ha-card>
        ${config.title
          ? b`<h1 class="card-header">${config.title}</h1>`
          : null}
        <div class="card-content">
          <div class="flow-main-layout pos-${summaryPos}">
            ${summaryPos === "top" || summaryPos === "left" || summaryPos === "right" ? summaryTemplate : null}
            <div class="flow-diagram">
              ${this._renderTrunk(
                internet,
                internetState,
                lan,
                lanState,
                lanDur,
                pingState,
                hasBilling,
                billingCompletedRatio,
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
                    !!(config.individual_devices && config.individual_devices.length),
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    hass,
                    primaryApItem ? primaryApOffline : (switchEnabled ? (routerOfflineTop || switchOfflineTop) : routerOfflineTop),
                    primaryApItem ? primaryApOfflineColor : (switchEnabled ? switchOfflineColor : routerOfflineColor),
                    primaryApItem ? true : (routerEnabled || switchEnabled),
                    primaryApItem,
                    primaryApLayout,
                    minDur,
                    maxDur,
                    primaryOriginalIndex
                  )
                : null}
            </div>
            ${this._renderIndividualDevices(config.individual_devices, hass, config, animate, minDur, maxDur, branchColumns.length)}
            ${summaryPos === "bottom" ? summaryTemplate : null}
          </div>
        </div>
      </ha-card>
    `;
  }

  // Renders one device's circle (icon, colors, offline state, guest
  // badge) - shared by both the flat (ungrouped) row and each
  // grouped sub-box, so the two layouts stay visually identical.
  _renderIndividualDeviceCircle(dev, hass, config) {
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
        @click=${() => this._handleMoreInfo(dev.entity)}
        title="${displayName}"
      >
        <div class="circle" style="border-color:${circleColor}">
          <ha-icon
            .icon=${dev.icon || "mdi:devices"}
            style="color:${iconColor};--mdc-icon-size:${config.individual_device_icon_size ?? 20}px"
          ></ha-icon>
        </div>
        ${this._renderGuestBadge(hass, dev.entity, online)}
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
        <div class="individual-devices-box" style="${groups ? 'padding:8px;' : ''}">
          <svg class="individual-devices-box-border">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              style="rx:${config.individual_devices_box_radius || 'var(--ha-card-border-radius, 12px)'}; ry:${config.individual_devices_box_radius || 'var(--ha-card-border-radius, 12px)'};"
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
                    const pad = config.individual_devices_group_padding ?? 10;
                    const showBorder = config.individual_devices_group_show_border !== false;
                    const colorOverride = (config.individual_devices_group_colors || []).find(
                      (o) => o.name === group.name
                    );
                    const groupBorderColor = colorOverride?.color || config.individual_devices_group_border_color || boxColor;
                    const flexStyle =
                      groupLayout === "widest_fits"
                        ? (group.devices.length === maxGroupSize ? "flex:0 0 auto;" : "flex:1 1 0;")
                        : "";
                    return b`
                      <div class="individual-device-group" style="padding:${pad}px; gap:${pad}px; ${flexStyle}">
                        ${showBorder
                          ? b`
                              <svg class="individual-devices-box-border">
                                <rect
                                  x="1"
                                  y="1"
                                  width="calc(100% - 2px)"
                                  height="calc(100% - 2px)"
                                  style="rx:${radius}; ry:${radius};"
                                  fill="none"
                                  stroke="${groupBorderColor}"
                                  stroke-width="1.5"
                                  stroke-dasharray="2 4"
                                ></rect>
                              </svg>
                            `
                          : null}
                        <div class="individual-device-group-label">${group.name}</div>
                        <div class="individual-device-group-row">
                          ${group.devices.map((dev) => this._renderIndividualDeviceCircle(dev, hass, config))}
                        </div>
                      </div>
                    `;
                  })}
                </div>
              `
            : b`
                <div class="individual-devices-row">
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
        <ha-icon icon="${icon}" style="--mdc-icon-size:${this._config.backhaul_icon_size ?? 13}px"></ha-icon>
      </div>
    `;
  }

  _renderXOnlyVertical(height = 32) {
    return b`
      <div class="vline-pair" style="height:${height}px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          <ha-icon icon="mdi:close"></ha-icon>
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
          <ha-icon icon="mdi:close"></ha-icon>
        </div>
      </div>
    `;
  }

  _renderXOnlyHorizontal(width = 28) {
    return b`
      <div class="hline-single" style="width:${width}px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          <ha-icon icon="mdi:close"></ha-icon>
        </div>
      </div>
    `;
  }

  _verticalDualLine(c1, c2, d1, d2, animate, height = 32, dashed = false) {
    const strandStyle = (color, left) =>
      dashed
        ? `left:${left}px;background-image:repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px);`
        : `left:${left}px;background:${color}`;
    const heightStyle = typeof height === "string"
      ? `height:${height}; min-height:32px;`
      : `height:${height}px;`;
    return b`
      <div class="vline-pair" style="${heightStyle}">
        <div class="vline" style="${strandStyle(c1, 16)}"></div>
        <div class="vline" style="${strandStyle(c2, 32)}"></div>
        ${animate
          ? b`
              ${this._cssDotsY(c1, d1, 16, false)}
              ${this._cssDotsY(c2, d2, 32, true)}
            `
          : null}
      </div>
    `;
  }

  _verticalSingleLine(color, duration, animate, height = 24, dashed = false) {
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
        ${animate ? this._cssDotsY(color, duration, "50%", false, 2) : null}
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

  _ring(completedPct, remainingPct, colorRem, colorProg, entityRem) {
    const radius = 49;
    const circumference = 2 * Math.PI * radius;
    const completedDash = (completedPct / 100) * circumference;
    const remainingDash = circumference - completedDash;

    return w`
      <svg class="ring-svg" viewBox="0 0 100 100">
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
      </svg>
    `;
  }

  _renderTrunk(
    internet,
    internetState,
    lan,
    lanState,
    lanDur,
    pingState,
    hasBilling,
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
    const internetHasBandwidth = !!(internet.entities.download || internet.entities.upload);

    // Primary AP, when designated, sits inline in the trunk directly below
    // Switch (if configured), Router (or Internet, if Router is hidden) -
    // the remaining APs then fan out from the primary AP instead of from
    // whatever's directly above it.
    const primaryApOffline = primaryApItem
      ? isEntityUnavailable(hass, primaryApItem.ap.entity)
      : false;
    const beforePrimaryOffline =
      (routerEnabled ? routerOffline : internetOffline) || (switchEnabled && switchOfflineTop);
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
    const primaryApHasBandwidth = primaryApItem
      ? !!(primaryApItem.ap.entities.download || primaryApItem.ap.entities.upload)
      : false;


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
        <div class="internet-row pos-${summaryPos}">
          <div
            class="circle-wrap"
            style="width:${internetSize}px; height:${internetSize}px; opacity:${internetOffline ? 0.6 : 1};"
            @click=${() => this._handleMoreInfo(internet.entity)}
          >
            <div
              class="circle ${internetOffline ? "circle-pulse" : ""}"
              style="border-color:${internetOffline ? internetCircleColor : (hasBilling ? "transparent" : internetCircleColor)}; --pulse-color:${internetCircleColor};"
            >
              <ha-icon class="${internetOffline ? "icon-pulse" : ""}" .icon=${internetOffline ? "mdi:exclamation-thick" : (internet.icon || "mdi:web")} style="color:${internetIconColor};--mdc-icon-size:${internet.icon_size ?? 24}px"></ha-icon>
              <span class="circle-value">${internetLabel}</span>
            </div>
            ${hasBilling && !internetOffline
              ? this._ring(
                  completedPct,
                  remainingPct,
                  internet.colors.billing_remaining,
                  internet.colors.billing_progress,
                  internet.entities.billing_remaining
                )
              : null}
            ${routerEnabled && router.entities.wan_ip
              ? this._renderIpBadge(hass, router.entities.wan_ip, "below", router)
              : primaryApItem && primaryApItem.ap.entities.wan_ip
              ? this._renderIpBadge(hass, primaryApItem.ap.entities.wan_ip, "below", primaryApItem.ap)
              : null}
          </div>
        </div>

        ${internetOrRouterOffline
          ? this._renderXOnlyVertical(32)
          : internetHasBandwidth
          ? this._verticalDualLine(
              internet.colors.download,
              internet.colors.upload,
              dlDur,
              ulDur,
              animate
            )
          : this._verticalSingleLine(
              internet.colors.download,
              dlDur,
              animate,
              32
            )}

        ${routerEnabled
          ? b`
        <div
          class="circle-wrap router-anchor"
          style="width:${routerSize}px; height:${routerSize}px;"
          @click=${() => this._handleMoreInfo(router.entity)}
        >
          <div class="circle ${routerOffline ? "circle-pulse" : ""}" style="border-color:${routerCircleColor}; opacity:${routerOffline ? 0.6 : 1}; --pulse-color:${routerCircleColor};">
            <ha-icon class="${routerOffline ? "icon-pulse" : ""}" .icon=${routerOffline ? "mdi:exclamation-thick" : (router.icon || "mdi:router-network")} style="color:${routerIconColor};--mdc-icon-size:${router.icon_size ?? 24}px"></ha-icon>
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
              { key: "poe", location: router.poe?.location, visible: poeVisible }
            ]);
            return b`
              ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
              ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
              ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
              ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
              ${this._renderPoeBadge(hass, router.entity, router.poe, stacks.poe || 0)}
              ${this._renderIpBadge(hass, router.entities.lan_ip, "below", router)}
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
                      this._handleMoreInfo(lan.entity);
                    }}
                  >
                    <div class="circle ${lanOffline ? "circle-pulse" : ""}" style="border-color:${lanCircleColor}; --pulse-color:${lanCircleColor};">
                      <ha-icon class="${lanOffline ? "icon-pulse" : ""}" .icon=${lanOffline ? "mdi:exclamation-thick" : (lan.icon || "mdi:lan")} style="color:${lanIconColor};--mdc-icon-size:${lan.icon_size ?? 20}px"></ha-icon>
                      <span class="circle-value">
                        ${lanState ? roundVal(lanState.value) : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              `
            : null}
        </div>
          `
          : null}

        ${switchEnabled
          ? b`
              ${(routerEnabled ? routerOffline : internetOffline) || switchOfflineTop
                ? this._renderXOnlyVertical(28)
                : this._verticalSingleLine(
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    switchDur,
                    animate,
                    28
                  )}
              <div
                class="circle-wrap"
                style="width:${switchSize}px; height:${switchSize}px; opacity:${switchOfflineTop ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(switchConfig.entity)}
              >
                <div class="circle ${switchOfflineTop ? "circle-pulse" : ""}" style="border-color:${switchCircleColor}; --pulse-color:${switchCircleColor};">
                  <ha-icon class="${switchOfflineTop ? "icon-pulse" : ""}" .icon=${switchOfflineTop ? "mdi:exclamation-thick" : (switchConfig.icon || "mdi:switch")} style="color:${switchIconColor};--mdc-icon-size:${switchConfig.icon_size ?? 22}px"></ha-icon>
                  <span class="circle-value">${switchLabel}</span>
                </div>
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
                    { key: "poe", location: switchConfig.poe?.location, visible: poeVisible }
                  ]);
                  return b`
                    ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                    ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                    ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                    ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                    ${this._renderPoeBadge(hass, switchConfig.entity, switchConfig.poe, stacks.poe || 0)}
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
                            }}
                          >
                            <div class="circle ${swDevOffline ? "circle-pulse" : ""}" style="border-color:${swDevCircleColor}; --pulse-color:${swDevCircleColor};">
                              <ha-icon class="${swDevOffline ? "icon-pulse" : ""}" .icon=${swDevOffline ? "mdi:exclamation-thick" : (switchConfig.devices_icon || "mdi:devices")} style="color:${swDevIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"></ha-icon>
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
                  return this._verticalDualLine(
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    primaryApItem.dlDur,
                    primaryApItem.ulDur,
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
                @click=${() => this._handleMoreInfo(primaryApItem.ap.entity)}
              >
                <div
                  class="circle ${primaryApOffline ? "circle-pulse" : ""}"
                  style="border-color:${primaryApCircleColor}; --pulse-color:${primaryApCircleColor};"
                >
                  <ha-icon
                    class="${primaryApOffline ? "icon-pulse" : ""}"
                    .icon=${primaryApOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.icon || "mdi:wifi")}
                    style="color:${primaryApIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px"
                  ></ha-icon>
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
                          this._handleMoreInfo(primaryApItem.ap.entities.connected_devices)}
                      >
                        <div
                          class="circle ${devOffline ? "circle-pulse" : ""}"
                          style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                        >
                          <ha-icon
                            class="${devOffline ? "icon-pulse" : ""}"
                            .icon=${devOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.devices_icon || "mdi:devices")}
                            style="color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"
                          ></ha-icon>
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

  _renderBranches(columns, animate, busLineColor, hasIndividualDevices, individualDevicesLineColor, hass, routerOffline, routerOfflineColor, routerEnabled, primaryApItem, primaryApLayout, minDur, maxDur, primaryOriginalIndex = -1) {
    const count = columns.length;
    const primaryHasDevices = !!(primaryApItem && primaryApItem.hasDevices);
    const showPrimaryExtraCol = !!primaryApItem && (primaryHasDevices || hasIndividualDevices);
    const totalCols = count + (showPrimaryExtraCol ? 1 : 0);
    const extraCol = showPrimaryExtraCol ? Math.max(0, primaryOriginalIndex) + 1 : null;
    const apCol = (i) => {
      if (!showPrimaryExtraCol) return i + 1;
      return i < primaryOriginalIndex ? (i + 1) : (i + 2);
    };
    const collapseTbar = count === 1 && !showPrimaryExtraCol;
    const hideApOwnLine = !routerEnabled && count === 1 && !showPrimaryExtraCol;

    // Three independent layers - Switch, AP, Devices - each spans two
    // grid rows (its own connecting line, then its own circle row).
    // A layer collapses to 0px entirely when nothing in the whole bus
    // uses it, exactly like the Devices layer already did before
    // Nodes existed.
    const hasAnySwitch = columns.some((c) => c.switch);
    const hasAnyAp = columns.some((c) => c.ap) || showPrimaryExtraCol;
    const hasAnyFedSwitch = columns.some((c) => c.subSwitch);
    const hasApRow = hasAnyAp || hasAnyFedSwitch;
    const columnHasDevices = (c) => (c.isHomelab && c.switch.show_devices_line === false) ? false : (c.subSwitch ? !!c.subSwitch.entities.connected_devices : c.ap ? !!c.ap.entities.connected_devices : !!(c.switch && c.switch.entities.connected_devices));
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
    const columnViewModels = columns.map((col) => {
      const switchState = col.switch ? getEntityState(hass, col.switch.entity) : null;
      const switchOffline = !!col.switch && isEntityUnavailable(hass, col.switch.entity);
      const subSwitchState = col.subSwitch ? getEntityState(hass, col.subSwitch.entity) : null;
      const subSwitchOfflineOwn = !!col.subSwitch && isEntityUnavailable(hass, col.subSwitch.entity);
      const apState = col.ap ? getEntityState(hass, col.ap.entity) : null;
      const apOfflineOwn = !!col.ap && isEntityUnavailable(hass, col.ap.entity);
      const feederOffline = routerOffline || switchOffline;
      const subOffline = feederOffline || subSwitchOfflineOwn;
      const apOffline = feederOffline || apOfflineOwn;

      const dlState = col.ap ? getEntityState(hass, col.ap.entities.download) : null;
      const ulState = col.ap ? getEntityState(hass, col.ap.entities.upload) : null;
      const dlDur = col.ap ? calcFlowDuration(dlState?.value, minDur, maxDur) : 3;
      const ulDur = col.ap ? calcFlowDuration(ulState?.value, minDur, maxDur) : 3;
      const wired = col.ap ? (col.switch ? true : isBackhaulWired(hass, col.ap)) : true;

      const homelabHidesLine = !!(col.isHomelab && col.switch.show_devices_line === false);
      const devEntity = homelabHidesLine
        ? null
        : (col.subSwitch
            ? col.subSwitch.entities.connected_devices
            : col.ap
            ? col.ap.entities.connected_devices
            : col.switch?.entities.connected_devices);
      const devState = devEntity ? getEntityState(hass, devEntity) : null;
      const nodeOffline = routerOffline || switchOffline || apOfflineOwn || subSwitchOfflineOwn;
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
    const apRowHeight = hasAnyAp ? "auto auto" : "0px 0px";
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
    if (hasAnyDevices) circleSizeCandidates.push(this._config.ap_devices_circle_size ?? 56);
    const maxCircleSize = circleSizeCandidates.length ? Math.max(...circleSizeCandidates) : 0;

    return b`
      <div
        class="branches ${hasIndividualDevices ? "with-dev-connectors" : ""}"
        style="grid-template-columns:repeat(${totalCols}, minmax(${maxCircleSize}px, max-content)); grid-template-rows:${collapseTbar ? '0px' : (routerEnabled ? '26px' : '0px')} ${collapseTbar ? '0px' : '2px'} ${switchRowHeight} ${apRowHeight} ${devRowHeight} 24px; column-gap:${this._config.ap_column_gap ?? 32}px; transform:translateX(${fallbackShift}px);"
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
                  <ha-icon icon="mdi:close"></ha-icon>
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
            return b`
              <div class="ap-col-line bus-top-connector" style="grid-column:${apCol(i)}; grid-row:3;">
                ${hideApOwnLine || routerOffline
                  ? null
                  : columnLineInfo[i].hasBandwidth
                  ? this._verticalDualLine(
                      busLineColor,
                      busLineColor,
                      columnLineInfo[i].dlDur,
                      columnLineInfo[i].ulDur,
                      animate,
                      "100%",
                      !columnWired[i]
                    )
                  : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate, !columnWired[i])}
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
          const defaultLabel = col.isHomelab ? "Homelab" : "Switch";
          const swLabel = getCircleLabel(col.switch.name, columnViewModels[i].switchState, defaultLabel);
          return b`
            <div class="ap-col-line bus-top-connector" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:3;">
              ${routerOffline
                ? null
                : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
            </div>
            <div
              class="circle-wrap ap-col-circle"
              style="width:${swSize}px; height:${swSize}px; grid-column:${apCol(i)} / span ${colSpan}; grid-row:4; opacity:${(swOffline || routerOffline) ? 0.6 : 1};"
              @click=${() => this._handleMoreInfo(col.switch.entity)}
            >
              <div class="circle ${(swOffline || routerOffline) ? "circle-pulse" : ""}" style="border-color:${swColor}; --pulse-color:${swColor};">
                <ha-icon class="${(swOffline || routerOffline) ? "icon-pulse" : ""}" .icon=${(swOffline || routerOffline) ? "mdi:exclamation-thick" : (col.switch.icon || defaultIcon)} style="color:${swIconColor};--mdc-icon-size:${swIconSize}px"></ha-icon>
                <span class="circle-value">${swLabel}</span>
              </div>
              ${(() => {
                if (!col.isHomelab) {
                  return this._renderPoeBadge(hass, col.switch.entity, col.switch.poe);
                }
                const poeVisible = computePoeTotal(hass, col.switch.entity, col.switch.poe) != null;
                const vpnVisible = this._config.vpn_target === "homelab" && !!this._config.vpn_entity;
                const fwVisible = this._config.firewall_target === "homelab" && !!this._config.firewall_entity;
                const dnsVisible = this._config.dns_target === "homelab" && !!this._config.dns_entity;
                const rpVisible = this._config.reverse_proxy_target === "homelab" && !!this._config.reverse_proxy_entity;
                const containers = col.switch.containers || [];
                const containerVisibility = containers.map((c) => !!c.entity && !!hass?.states?.[c.entity]);
                const stackItems = [
                  { key: "poe", location: col.switch.poe?.location, visible: poeVisible },
                  { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                  { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                  { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                  { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
                  ...containers.map((c, ci) => ({ key: `container${ci}`, location: c.location, visible: containerVisibility[ci] }))
                ];
                const stacks = computeBadgeStacks(stackItems);
                return b`
                  ${this._renderPoeBadge(hass, col.switch.entity, col.switch.poe, stacks.poe || 0)}
                  ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                  ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                  ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                  ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                  ${containers.map((c, ci) => this._renderContainerBadge(hass, c, stacks[`container${ci}`] || 0))}
                `;
              })()}
            </div>
          `;
        })}
        ${!hasAnySwitch ? null : columns.map((col, i) => {
          if (col.switch) return null;
          // Columns with no switch still need a pass-through line at
          // the switch-circle row, so the vertical connection from bus
          // to AP stays unbroken.
          return routerOffline ? null : b`
            <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:4;">
              ${columnLineInfo[i].hasBandwidth
                ? this._verticalDualLine(
                    busLineColor,
                    busLineColor,
                    columnLineInfo[i].dlDur,
                    columnLineInfo[i].ulDur,
                    animate,
                    "100%",
                    !columnWired[i]
                  )
                : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate, !columnWired[i])}
            </div>
          `;
        })}

        ${!hasApRow ? null : columns.map((col, i) => {
          const feederOffline = columnViewModels[i].feederOffline;

          // Fed sub-switch: a leaf Switch fed by this column's parent
          // switch, in the same row as any fed APs. Always solid,
          // never animated (it's wired infrastructure, not a bandwidth
          // metric) - mirrors the group/stem structure used for a
          // multi-AP switch group, just with a forced-solid line style.
          if (col.subSwitch) {
            const subOffline = columnViewModels[i].subOffline;
            if (col.switchGroupSize > 1 && col.switchGroupStart) {
              const colSpan = col.switchGroupSize;
              const apSizeForInset = this._config.ap_circle_size ?? 72;
              return b`
                <div class="mini-bus-stem" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; background:${busLineColor};"></div>
                <div class="mini-bus-line" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; margin-left:${apSizeForInset / 2}px; margin-right:${apSizeForInset / 2}px; background:${busLineColor};"></div>
                <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                  ${subOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
                </div>
              `;
            }
            if (col.switchGroupSize > 1 && !col.switchGroupStart) {
              return b`
                <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                  ${subOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
                </div>
              `;
            }
            return b`
              <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:5;">
                ${subOffline ? this._renderXOnlyVerticalStretch() : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
              </div>
            `;
          }

          if (!col.ap) {
            // Switch-only column with no AP - pass the line straight
            // through the AP layer toward the Devices layer below, but
            // only when there's actually something down there to reach
            // (its own Connected Devices circle, or the shared
            // Clients box) - otherwise the line has nowhere
            // to terminate and just trails off. Always solid, never
            // animated when it does show, since it represents the
            // switch's own wired connection, not a specific metric.
            const hasDownstream = (!!col.switch?.entities?.connected_devices || hasIndividualDevices) && !(col.isHomelab && col.switch.show_devices_line === false);
            // Row 4 (the standalone Switch/Homelab circle row) is one
            // shared grid row across the whole bus - since Homelab can
            // now have its own circle size independent of the global
            // Switch size, a Homelab node sitting alongside a regular
            // Switch-only node of a different size needs the same
            // gap-fill treatment used where APs and fed Switches share
            // a row, or the smaller circle's line would fall short.
            const rowMaxSize4 = Math.max(this._config.switch?.circle_size ?? 60, this._config.homelab_circle_size ?? 60);
            const ownSize4 = col.isHomelab ? (this._config.homelab_circle_size ?? 60) : (this._config.switch?.circle_size ?? 60);
            const gapFill4 = Math.max(0, rowMaxSize4 - ownSize4);
            const fillLineStyle4 = gapFill4 > 0 ? `margin-top:-${gapFill4}px; height:calc(100% + ${gapFill4}px);` : "";
            if (!hasDownstream) {
              return b`<div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:5;"></div>`;
            }
            return b`
              <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:5; ${fillLineStyle4}">
                ${feederOffline ? null : this._verticalPassThroughLine(busLineColor, columnDurations[i], false)}
              </div>
            `;
          }
          columnViewModels[i].dlState;
          columnViewModels[i].ulState;
          const apDlDur = columnViewModels[i].dlDur;
          const apUlDur = columnViewModels[i].ulDur;
          const apLineOffline = columnViewModels[i].apOffline;
          const apWired = columnViewModels[i].wired;
          const apHasBandwidth = !!(col.ap.entities.download || col.ap.entities.upload);

          if (col.switch && col.switchGroupSize > 1 && col.switchGroupStart) {
            // First column of a multi-AP switch group: render the
            // stem connecting down from the Switch circle above, the
            // mini bus-line spanning the whole group (inset by half a
            // circle width on each side so it stops at the outer APs'
            // centers rather than their outer edges), plus this
            // column's own drop into its AP circle.
            const colSpan = col.switchGroupSize;
            const apSizeForInset = this._config.ap_circle_size ?? 72;
            return b`
              <div class="mini-bus-stem" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; background:${busLineColor};"></div>
              <div class="mini-bus-line" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; margin-left:${apSizeForInset / 2}px; margin-right:${apSizeForInset / 2}px; background:${busLineColor};"></div>
              <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                ${apLineOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
              </div>
            `;
          }
          if (col.switch && col.switchGroupSize > 1 && !col.switchGroupStart) {
            return b`
              <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                ${apLineOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
              </div>
            `;
          }
          return b`
            <div class="ap-col-line ${!hasAnySwitch ? "bus-top-connector" : ""}" style="grid-column:${apCol(i)}; grid-row:5;">
              ${hideApOwnLine
                ? null
                : apLineOffline
                ? this._renderXOnlyVerticalStretch()
                : col.switch
                ? this._verticalSingleLine(busLineColor, 3, animate, "100%", false)
                : apHasBandwidth
                ? this._verticalDualLine(
                    busLineColor,
                    busLineColor,
                    apDlDur,
                    apUlDur,
                    animate,
                    "100%",
                    !apWired
                  )
                : this._verticalSingleLine(
                    busLineColor,
                    apDlDur,
                    animate,
                    "100%",
                    !apWired
                  )}
              ${!hideApOwnLine && !apLineOffline && !col.switch
                ? this._backhaulBadge(col.ap, hass)
                : null}
            </div>
          `;
        })}
        ${!hasApRow ? null : columns.map((col, i) => {
          if (col.subSwitch) {
            // A fed sub-switch's own circle, in the same row as any
            // fed APs. Reuses the top-level Switch's size settings
            // since there's no separate sizing namespace for these.
            columnViewModels[i].feederOffline;
            const subOffline = columnViewModels[i].subOffline;
            const subSize = this._config.switch?.circle_size ?? 60;
            const subIconSize = this._config.switch?.icon_size ?? 22;
            const subColor = subOffline
              ? col.subSwitch.colors?.offline_circle || "var(--error-color)"
              : col.subSwitch.colors?.circle;
            const subIconColor = subOffline
              ? col.subSwitch.colors?.offline_icon || "var(--error-color)"
              : col.subSwitch.colors?.icon;
            const subLabel = getCircleLabel(col.subSwitch.name, columnViewModels[i].subSwitchState, "Switch");
            return b`
              <div
                class="circle-wrap ap-col-circle"
                style="width:${subSize}px; height:${subSize}px; grid-column:${apCol(i)}; grid-row:6; opacity:${subOffline ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(col.subSwitch.entity)}
              >
                <div class="circle ${subOffline ? "circle-pulse" : ""}" style="border-color:${subColor}; --pulse-color:${subColor};">
                  <ha-icon class="${subOffline ? "icon-pulse" : ""}" .icon=${subOffline ? "mdi:exclamation-thick" : (col.subSwitch.icon || "mdi:switch")} style="color:${subIconColor};--mdc-icon-size:${subIconSize}px"></ha-icon>
                  <span class="circle-value">${subLabel}</span>
                </div>
                ${this._renderPoeBadge(hass, col.subSwitch.entity, col.subSwitch.poe)}
              </div>
            `;
          }
          if (!col.ap) {
            const swFeederOffline = columnViewModels[i].feederOffline;
            const hasDownstream = (!!col.switch?.entities?.connected_devices || hasIndividualDevices) && !(col.isHomelab && col.switch.show_devices_line === false);
            if (swFeederOffline || !hasDownstream) {
              return b`<div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:6;"></div>`;
            }
            return b`
              <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:6;">
                ${this._verticalPassThroughLine(busLineColor, columnDurations[i], false)}
              </div>
            `;
          }
          columnViewModels[i].feederOffline;
          const apLabel = getCircleLabel(col.ap.name, columnViewModels[i].apState, "AP");
          const apSize = this._config.ap_circle_size ?? 72;
          const apOffline = columnViewModels[i].apOffline;
          const apCircleColor = apOffline
            ? col.ap.colors.offline_circle || "var(--error-color)"
            : col.ap.colors.circle;
          const apIconColor = apOffline
            ? col.ap.colors.offline_icon || "var(--error-color)"
            : col.ap.colors.icon;
          return b`
            <div
              class="circle-wrap ap-col-circle"
              style="width:${apSize}px; height:${apSize}px; grid-column:${apCol(i)}; grid-row:6; opacity:${apOffline ? 0.6 : 1};"
              @click=${() => this._handleMoreInfo(col.ap.entity)}
            >
              <div class="circle ${apOffline ? "circle-pulse" : ""}" style="border-color:${apCircleColor}; --pulse-color:${apCircleColor};">
                <ha-icon class="${apOffline ? "icon-pulse" : ""}" .icon=${apOffline ? "mdi:exclamation-thick" : (col.ap.icon || "mdi:wifi")} style="color:${apIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px"></ha-icon>
                <span class="circle-value">${apLabel}</span>
              </div>
              ${(() => {
                const ap = col.ap;
                const poeVisible = computePoeTotal(hass, ap.entity, ap.poe) != null;
                if (!ap.is_primary) {
                  return b`
                    ${this._renderPoeBadge(hass, ap.entity, ap.poe, 0)}
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
                  ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                `;
              })()}
            </div>
          `;
        })}

        ${!hasAnyDevices ? null : columns.map((col, i) => {
          const vm = columnViewModels[i];
          vm.nodeOffline;
          const homelabHidesLine = vm.homelabHidesLine;
          const devEntity = vm.devEntity;
          const isSwitchDevices = !col.ap;
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
          const rowMaxSize = Math.max(this._config.ap_circle_size ?? 72, this._config.switch?.circle_size ?? 60);
          const ownRowSize = col.subSwitch
            ? (this._config.switch?.circle_size ?? 60)
            : col.ap
            ? (this._config.ap_circle_size ?? 72)
            : null;
          const gapFill = ownRowSize != null ? Math.max(0, rowMaxSize - ownRowSize) : 0;
          const fillLineStyle = gapFill > 0 ? `margin-top:-${gapFill}px; height:calc(100% + ${gapFill}px);` : "";
          return b`
            <div class="ap-col-devline" style="grid-column:${apCol(i)}; grid-row:7; ${devLineOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}">
              ${devLineOffline && (devEntity || (hasIndividualDevices && !homelabHidesLine))
                ? b`
                    <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                      <ha-icon icon="mdi:close"></ha-icon>
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
          const devColorSource = col.subSwitch ? col.subSwitch.colors : col.ap ? col.ap.colors : col.switch?.colors;
          const devIcon = col.subSwitch ? col.subSwitch.devices_icon : col.ap ? col.ap.devices_icon : col.switch?.devices_icon;
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
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${apCol(i)}; grid-row:8; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() => this._handleMoreInfo(devEntity)}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    <ha-icon
                      class="${devOffline ? "icon-pulse" : ""}"
                      .icon=${devOffline ? "mdi:exclamation-thick" : (devIcon || "mdi:devices")}
                      style="color:${devIconColor};--mdc-icon-size:${devIconSize}px"
                    ></ha-icon>
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
                style="grid-column:${apCol(i)}; grid-row:8; ${devOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}"
              >
                ${devOffline
                  ? b`
                      <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                        <ha-icon icon="mdi:close"></ha-icon>
                      </div>
                    `
                  : !col.ap
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
                style="grid-column:${apCol(i)}; grid-row:8;"
              ></div>`;
        })}
        ${hasIndividualDevices
          ? columns.map((col, i) => {
              const vm = columnViewModels[i];
              const feederOffline = vm.nodeOffline;
              const homelabHidesLine = vm.homelabHidesLine;
              vm.devEntity;
              const devLineOffline = vm.devLineOffline;
              const isSwitchFed = !col.ap;
              if (homelabHidesLine) {
                return b`<div class="ap-col-devconnector" style="grid-column:${apCol(i)}; grid-row:9;"></div>`;
              }
              return b`
                <div class="ap-col-devconnector" style="grid-column:${apCol(i)}; grid-row:9; ${(devLineOffline || feederOffline) ? 'display:flex; justify-content:center; align-items:center;' : ''}">
                  ${feederOffline
                    ? null
                    : devLineOffline
                    ? b`
                        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                          <ha-icon icon="mdi:close"></ha-icon>
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
                        style="grid-column:${extraCol}; grid-row:3 / 9; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                      >
                        <div
                          class="ap-col-fillline"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol}; grid-row:9;"
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
                  style="grid-column:${extraCol}; grid-row:3 / 8; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                >
                  <div
                    class="ap-col-fillline"
                    style="background-image:repeating-linear-gradient(to bottom, ${this._config.flow_line_color || 'var(--divider-color, #ccc)'} 0px, ${this._config.flow_line_color || 'var(--divider-color, #ccc)'} 2px, transparent 2px, transparent 6px)"
                  ></div>
                </div>
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${extraCol}; grid-row:8; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() =>
                    this._handleMoreInfo(primaryApItem.ap.entities.connected_devices)}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    <ha-icon
                      class="${devOffline ? "icon-pulse" : ""}"
                      .icon=${devOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.devices_icon || "mdi:devices")}
                      style="color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"
                    ></ha-icon>
                    <span class="circle-value">
                      ${primaryApItem.devicesState ? roundVal(primaryApItem.devicesState.value) : "-"}
                    </span>
                  </div>
                </div>
                ${hasIndividualDevices
                  ? b`
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol}; grid-row:9;"
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
      .circle ha-icon {
        --mdc-icon-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
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
      .offline-x-mid ha-icon {
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
      .primary-ap-badge ha-icon,
      .vpn-badge ha-icon,
      .firewall-badge ha-icon,
      .poe-badge ha-icon {
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
      .dev-dotted-line {
        width: 2px;
        height: 100%;
        opacity: 0.9;
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
        align-items: stretch;
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
      .summary-badge ha-icon {
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
    `;
  }
}

customElements.define("network-flow-card", NetworkFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "network-flow-card",
  name: "Network Flow Card",
  description: "A power-flow-card-plus style visual for internet, router, LAN, Wi-Fi access points, and multi-row monitored clients.",
  preview: false
});

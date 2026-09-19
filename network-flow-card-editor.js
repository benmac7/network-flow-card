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
 * NETWORK-FLOW-CARD v3.1.3
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
  "%c NETWORK-FLOW-CARD %c v3.1.3 ",
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
  individual_device_guest_icon: "mdi:account",
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

// --- TP-Link Auto-Discovery ---------------------------------------
// Scans the entity registry (hass.entities) for anything owned by the
// TP-Link Deco or TP-Link Router integrations and sorts it into three
// buckets: the Router/Gateway (Deco's master unit, or the single
// tplink_router device), Nodes (Deco satellite units - each a Wi-Fi
// access point on the mesh), and Clients (every remaining
// client). Only entity IDs are ever handed back to the caller - the
// caller decides what to actually do with them (populate a form,
// write straight into config, etc).
//
// This relies on hass.entities carrying a `platform` field (standard
// on the frontend's entity registry) and hass.devices carrying a
// `model` field the integration sets to the real hardware name. In
// practice this turned out unreliable (real TP-Link Deco entities
// report `device_model: "BE25"` - a bare product number with no word
// "deco" in it - so a model-substring check never matched). The
// classification below instead uses attributes confirmed directly
// against real Deco device_tracker entities: `device_type: "deco"`
// marks the entity as a mesh unit itself (clients never carry this
// attribute at all), and `master: true` identifies the gateway unit
// among those. If your installed integration version doesn't populate
// these the same way, check Developer Tools > States on one of your
// own Deco entities and adjust tplinkIsDecoUnit/tplinkIsDecoMaster
// below.
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
    // `total_wired_clients`) is the preferred LAN Connected Devices
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
// Looks across four speed-test integrations: the official core
// "Speedtest.net" (platform `speedtestdotnet` - ping/download/upload
// only, no jitter or ISP), the community "Ookla Speedtest" (platform
// `ookla_speedtest` - adds jitter and ISP), "Cloudflare Speed Test"
// (platform `cloudflare_speed_test` - reports latency as
// translation_key "latency" rather than "ping", and its closest
// single-number download/upload equivalent is the "90th percentile"
// sensor rather than a plain "download"/"upload" one), and "LibreSpeed"
// (platform `librespeed` - download/upload/ping/jitter match the same
// translation_keys as Speedtest.net, no ISP sensor at all). Field names
// confirmed straight from each integration's own sensor.py/const.py.
// Returns every service found across all four as a separate candidate
// - a user might have more than one configured - so the editor
// presents all of them and lets the person choose rather than one
// being silently preferred.
// Reuses the same device-sibling lookup helpers as the TP-Link scan
// above (tplinkBuildDeviceEntityMap/tplinkFindSibling) - they're
// generic despite the name, just introduced alongside that feature
// first.
const SPEEDTEST_PLATFORMS = ["speedtestdotnet", "ookla_speedtest", "cloudflare_speed_test", "librespeed"];
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
  librespeed: "LibreSpeed"
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
    if (SPEEDTEST_PLATFORMS.includes(entry.platform)) byPlatform[entry.platform].push(entityId);
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

// --- ISP Auto-Discovery (billing / usage / connectivity) ------------
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
// "uploaded" (cycle data usage, resets each billing period).
// Starlink: translation_key "download" / "upload" (cumulative session
// usage since HA last restarted - NOT billing-cycle data, since
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
const ISP_PLATFORM_LABELS = { aussie_broadband: "Aussie Broadband", starlink: "Starlink", startca: "Start.ca" };
const ISP_FIELD_HINTS = {
  billing_total: ["billing_cycle_length", "cycle_length", "billing_length", "plan_length", "total_bandwidth", "limit"],
  billing_remaining: ["billing_cycle_remaining", "days_remaining", "cycle_remaining", "billing_remaining", "used_remaining", "remaining"],
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
        billingTotal: ispFindField(hass, pool, ISP_FIELD_HINTS.billing_total),
        billingRemaining: ispFindField(hass, pool, ISP_FIELD_HINTS.billing_remaining),
        totalDownload: ispFindField(hass, pool, ISP_FIELD_HINTS.total_download),
        totalUpload: ispFindField(hass, pool, ISP_FIELD_HINTS.total_upload)
      });
    }
  }

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

  return groupEntitiesByDevice(hass, entityIds).map((group) => {
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
}

// --- Proxmox VE Auto-Discovery (Homelab node) ------------------------
// Confirmed straight from home-assistant/core's proxmoxve/entity.py:
// every Node, VM, Container, and Storage gets its own HA device, and
// EVERY one of them exposes an identically-named "status" binary_sensor
// (translation_key "status") - so translation_key alone can't tell them
// apart. What does: VM/Container/Storage devices all set `model` to
// exactly "VM"/"Container"/"Storage" in their device_info, while the
// physical/cluster Node's own device does not - so "status" entities
// whose device model ISN'T one of those three are Node candidates.
// VM/Container devices additionally carry `via_device_id` pointing at
// their parent Node's device, so a discovered Node's own VMs/
// Containers can be attached as its containers[] automatically, rather
// than requiring a second separate scan.
const PROXMOX_PLATFORM = "proxmoxve";

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

    if (model === "VM" || model === "Container") {
      const parentId = device?.via_device_id;
      (containersByParent[parentId] ||= []).push({ entity: entityId, name, kind: model });
    } else if (model !== "Storage") {
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
    if (model !== "VM" && model !== "Container") continue;

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
  if (!hass?.entities) return { routerCandidate: null, clients: [] };

  const trackers = Object.keys(hass.entities).filter(
    (id) =>
      hass.entities[id].platform === SYNOLOGY_SRM_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  if (!trackers.length) return { routerCandidate: null, clients: [] };

  const proxyEntity = trackers.find((id) => hass.states[id].state === "home") || trackers[0];

  return {
    routerCandidate: { entity: proxyEntity, name: "Synology SRM Router (best-effort)", source: "synology_srm" },
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "synology_srm"
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
      routerCandidate = { entity: t.entityId, name: name || "AsusRouter (AiMesh)", source: "asusrouter" };
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
const UNIFI_GATEWAY_PREFIXES = ["UDM", "UDR", "UXG", "USG"];
const UNIFI_SWITCH_PREFIXES = ["USW", "USL"];
const UNIFI_AP_PREFIXES = ["UAP", "U6", "U7", "BZ"];

function unifiClassifyModel(model) {
  const m = String(model || "").toUpperCase();
  if (UNIFI_GATEWAY_PREFIXES.some((p) => m.startsWith(p))) return "gateway";
  if (UNIFI_SWITCH_PREFIXES.some((p) => m.startsWith(p))) return "switch";
  if (UNIFI_AP_PREFIXES.some((p) => m.startsWith(p))) return "ap";
  return null;
}

function unifiBuildDeviceEntityMap(hass) {
  const map = Object.create(null);
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (entry.platform !== UNIFI_PLATFORM || !entry.device_id) continue;
    (map[entry.device_id] ||= []).push({ entityId, entry });
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

  for (const [deviceId, entries] of Object.entries(deviceEntityMap)) {
    const tracker = entries.find((e) => e.entityId.startsWith("device_tracker."));
    if (!tracker) continue;
    const device = hass.devices[deviceId];
    const kind = unifiClassifyModel(device?.model);
    if (!kind) continue;

    // The device's own "Device scanner" tracker doubles as this card's
    // status/online entity (isEntityUnavailable already treats
    // home/not_home the same as on/off) and, via ScannerEntity's own
    // built-in ip_address property, as the self-referencing IP-badge
    // source too - the same pattern TP-Link Deco units use above.
    const name = device?.name_by_user || device?.name || hass.states[tracker.entityId]?.attributes?.friendly_name || "";
    const connectedDevices = unifiFindSibling(entries, "device_clients");

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
      switches.push({
        entity: tracker.entityId,
        name,
        connectedDevices,
        ipAddress: tracker.entityId
      });
    } else if (kind === "ap") {
      accessPoints.push({
        entity: tracker.entityId,
        name,
        isMaster: false,
        connectedDevices,
        download: "",
        upload: "",
        backhaulType: "",
        backhaulSpeed: "",
        ipAddress: tracker.entityId
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


// --- Editor Component ---
const MENU_ITEMS = [
  { key: "internet", title: "Internet", icon: "mdi:web", summary: "Entity, name, icon, billing, bandwidth, ping, colors" },
  { key: "router", title: "Router/Gateway", icon: "mdi:router-network", summary: "Entity, name, icon, LAN, colors" },
  { key: "switch", title: "Switch", icon: "mdi:switch", summary: "Optional element between Router/Gateway and Nodes, PoE" },
  { key: "security", title: "Security", icon: "mdi:shield-lock", summary: "VPN, Firewall, DNS Filtering, and Reverse Proxy badges, target, colors" },
  { key: "nodes", title: "Nodes", icon: "mdi:wifi", summary: "AP, Switch (with fed APs/Switches), or Homelab nodes, PoE" },
  { key: "individual_devices", title: "Clients", icon: "mdi:devices", summary: "Client icons & colors, grouping by SSID/VLAN/AP" },
  { key: "advanced", title: "Advanced", icon: "mdi:cog", summary: "Layout, animation & sizes" }
];

class NetworkFlowCardEditor extends i {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _page: { state: true },
      _editingApIndex: { state: true },
      _editingDevIndex: { state: true }
    };
  }

  constructor() {
    super();
    this._page = null;
    this._editingApIndex = null;
    this._editingDevIndex = null;
    this._editingSwitchApIndex = null;
    this._editingFedSwitchIndex = null;
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
    this._discoveredMainSwitches = null;
    this._discoveredMainSwitchesPage = 0;
    this._mainSwitchScanMessage = "";
    this._discoveredSpeedtestServices = null;
    this._discoveredSpeedtestPage = 0;
    this._discoveredIspServices = null;
    this._discoveredIspPage = 0;
    this._discoveredNodesSelected = new Set();
    this._discoveredNodesPage = 0;
    this._discoveredNodesFilterSource = "";
    this._discoveredNodesFilterType = "";
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
    this._devsPage = 0;
    this._discoveredAdGuard = null;
    this._discoveredAdGuardPage = 0;
    this._adguardScanMessage = "";
    this._discoveredContainers = null;
    this._discoveredContainersSelected = new Set();
    this._discoveredContainersPage = 0;
    this._discoveredContainersFilter = "";
    this._containersScanMessage = "";
  }

  setConfig(config) {
    const migrated = migrateAccessPointsToNodes(config || {});
    const merged = deepMerge(DEFAULT_CONFIG, migrated);
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
    merged.individual_devices = (config && config.individual_devices || []).map((dev) =>
      deepMerge(DEFAULT_INDIVIDUAL_DEVICE, dev)
    );
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

    if (path.includes("circle_size") || path.includes("icon_size") || path === "min_flow_duration" || path === "max_flow_duration" || path.includes(".up_to")) {
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

  _renderSlider(label, value, path, min = 20, max = 120, step = 2) {
    const numVal = value ?? 72;
    return b`
      <div class="input-field">
        <label class="input-label">${label}: ${numVal}px</label>
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
    const c = node.homelab?.containers?.[containerIndex] || DEFAULT_CONTAINER_BADGE;
    const prefix = `nodes.${nodeIndex}.homelab.containers.${containerIndex}`;

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
    if (this._editingSwitchApIndex !== null) {
      this._editingSwitchApIndex = null;
    } else if (this._editingFedSwitchIndex !== null) {
      this._editingFedSwitchIndex = null;
    } else if (this._editingContainerIndex !== null) {
      this._editingContainerIndex = null;
    } else if (this._editingApIndex !== null) {
      this._editingApIndex = null;
    } else if (this._editingDevIndex !== null) {
      this._editingDevIndex = null;
    } else {
      this._page = null;
    }
  }

  _getPageTitle() {
    if (this._page === "discover") return "Discover";
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingSwitchApIndex !== null) {
      return `Access Point ${this._editingSwitchApIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingFedSwitchIndex !== null) {
      return `Switch ${this._editingFedSwitchIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingContainerIndex !== null) {
      return `Container ${this._editingContainerIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null) {
      const node = this._config.nodes?.[this._editingApIndex];
      return node?.switch ? `Node ${this._editingApIndex + 1}` : `Access Point ${this._editingApIndex + 1}`;
    }
    if (this._page === "individual_devices" && this._editingDevIndex !== null) {
      return `Client ${this._editingDevIndex + 1}`;
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
    this._scanForRouter();
    this._scanForNodes();
    this._scanIndividualDevices();
    this._scanForInternet();
    this._scanForIsp();
    this._scanForAdGuard();

    const homelabIndex = (this._config.nodes || []).findIndex((n) => n.homelab?.entity);
    if (homelabIndex !== -1) {
      this._scanForContainers();
    } else {
      this._discoveredContainers = null;
    }
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
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px 0;">
          Scanned every supported integration in one pass. Work through
          each section below - filter, select, and add as many as you
          want; nothing is applied until you act on it in that section.
        </p>
        <button class="add-btn" @click=${() => this._scanEverything()}>
          Re-scan Everything
        </button>

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Internet &middot; Speedtest</span>
          ${this._config.internet?.entities?.ping || this._config.internet?.entities?.jitter || this._config.internet?.entities?.download || this._config.internet?.entities?.upload
            ? b`<ha-icon-button @click=${() => this._removeAllSpeedtest()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredSpeedtestServices !== null
          ? this._renderDiscoveredSpeedtestList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Internet &middot; ISP</span>
          ${this._config.internet?.entities?.billing_total || this._config.internet?.entities?.billing_remaining || this._config.internet?.entities?.total_download || this._config.internet?.entities?.total_upload
            ? b`<ha-icon-button @click=${() => this._removeAllIsp()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
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
          <span>Security &middot; DNS Filtering</span>
          ${this._config.dns_entity
            ? b`<ha-icon-button @click=${() => this._removeAllAdGuard()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredAdGuard !== null
          ? this._renderDiscoveredAdGuardList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Nodes (Access Point / Switch / Homelab)</span>
          ${nodes.length
            ? b`<ha-icon-button @click=${() => this._removeAllNodes()} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${this._discoveredNodes !== null
          ? this._renderDiscoveredNodesList()
          : b`<p style="color:var(--secondary-text-color); font-size:0.9em;">No scan run yet.</p>`}

        <div class="sub-header" style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
          <span>Homelab &middot; Container / VM</span>
          ${homelabNode && (homelabNode.homelab?.containers || []).length
            ? b`<ha-icon-button @click=${() => this._removeAllContainers(homelabIndex)} title="Remove All"><ha-icon icon="mdi:delete-sweep" style="color:var(--error-color);"></ha-icon></ha-icon-button>`
            : null}
        </div>
        ${homelabNode
          ? b`
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Adding to <strong>${homelabNode.name || homelabNode.homelab?.name || `Node ${homelabIndex + 1}`}</strong>${homelabCount > 1
                  ? " - your first Homelab node. Open a different one directly from the Nodes page to target it instead."
                  : "."}
              </p>
              <button class="add-btn" @click=${() => this._scanForContainers()}>
                Scan for Container/VM
              </button>
              ${this._containersScanMessage
                ? b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._containersScanMessage}</p>`
                : null}
              ${this._discoveredContainers !== null ? this._renderDiscoveredContainersList(homelabIndex) : null}
            `
          : b`
              <p style="color:var(--secondary-text-color); font-size:0.9em;">
                Add a Homelab node first (via the Nodes section above, or
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
      case "advanced":
        return this._renderAdvancedPage();
      default:
        return b``;
    }
  }

  _renderInternetPage() {
    const internet = this._config.internet || {};
    const c = internet.colors || {};

    return b`
      <div class="form-section">
        <div class="sub-header">Internet</div>

        ${this._infoHeader(
          "Auto-Discovery (Speedtest)",
          "Looks for both the official Speedtest.net integration and the community Ookla Speedtest integration, and lists every service found on either (e.g. if you have both configured, or more than one instance of one) so you choose which to apply - nothing is set automatically. Only blank fields are filled in on the one you pick - anything you've already set by hand is left alone."
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
          "Looks for Aussie Broadband, Starlink, and Start.ca, and lists every service found across all three - Aussie Broadband in particular often has several services on one account (each its own address/line), so you pick the right one rather than one being assumed. Applies Billing Total, Billing Remaining, Total Downloaded, and Total Uploaded from whichever you choose; for Starlink, also sets the Internet Entity itself to its \"Connected\" binary sensor if that field is still blank."
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
          @value-changed=${(e) => this._valueChanged(e, "internet.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", internet.name, "internet.name")}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${internet.icon || "mdi:web"}
          @value-changed=${(e) => this._valueChanged(e, "internet.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, "internet.colors.circle")}
            ${this._renderColorInput("Icon Color", c.icon, "internet.colors.icon")}
            ${this._renderColorInput("Download Line", c.download, "internet.colors.download")}
            ${this._renderColorInput("Upload Line", c.upload, "internet.colors.upload")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "internet.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "internet.colors.offline_icon")}
          </div>
        </div>

        <div class="sub-header">Billing</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.billing_total || ""}
          .label=${"Billing Total Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.billing_total")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.billing_remaining || ""}
          .label=${"Billing Remaining Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.billing_remaining")}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Billing Progress Color", c.billing_progress, "internet.colors.billing_progress")}
          </div>
          <div>
            ${this._renderColorInput("Billing Remaining Color", c.billing_remaining, "internet.colors.billing_remaining")}
          </div>
        </div>

        <div class="sub-header">Metrics</div>
        <div class="two-col">
          <div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.download || ""}
              .label=${"Download Speed Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.download")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.total_download || ""}
              .label=${"Total Downloaded Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.total_download")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-icon-picker
              .label=${"Download Icon"}
              .value=${internet.download_icon || "mdi:download"}
              @value-changed=${(e) => this._valueChanged(e, "internet.download_icon")}
            ></ha-icon-picker>
            ${this._renderColorInput("Download Badge Icon Color", c.download_badge_icon, "internet.colors.download_badge_icon")}
            ${this._renderColorInput("Download Badge Background Color", c.download_badge, "internet.colors.download_badge")}
          </div>
          <div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.upload || ""}
              .label=${"Upload Speed Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.upload")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.total_upload || ""}
              .label=${"Total Uploaded Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.total_upload")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-icon-picker
              .label=${"Upload Icon"}
              .value=${internet.upload_icon || "mdi:upload"}
              @value-changed=${(e) => this._valueChanged(e, "internet.upload_icon")}
            ></ha-icon-picker>
            ${this._renderColorInput("Upload Badge Icon Color", c.upload_badge_icon, "internet.colors.upload_badge_icon")}
            ${this._renderColorInput("Upload Badge Background Color", c.upload_badge, "internet.colors.upload_badge")}
          </div>
        </div>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.ping || ""}
          .label=${"Ping Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.ping")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.jitter || ""}
          .label=${"Jitter Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.jitter")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderColorInput("Ping Badge Icon Color", c.ping_badge_icon, "internet.colors.ping_badge_icon")}
        ${this._renderColorInput("Ping Badge Background Color", c.ping_badge, "internet.colors.ping_badge")}
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
          "Auto-Discovery (TP-Link / OpenWrt / Synology SRM / AsusRouter / UniFi / Omada)",
          "Looks for the master unit on a TP-Link Deco mesh, the single device from the TP-Link Router integration, an OpenWrt router via the LuCI integration, a Synology SRM router, and an AsusRouter/AiMesh router - if more than one exists (e.g. a TP-Link Router acting as your modem/gateway with a Deco mesh riding behind it), you choose which one is the Router below rather than having one picked for you. Neither LuCI nor Synology SRM has a dedicated router-status entity of its own, so both candidates use one of their client-tracker entities as a reachability proxy instead - don't be surprised by the entity name. LuCI's proxy reliably goes unavailable when the router drops offline; Synology SRM's is best-effort only, since that integration's older polling model doesn't guarantee the same. AsusRouter has a real connectivity sensor for its main AiMesh unit, so its candidate is as reliable as TP-Link's."
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
          "IP Addressing",
          "Shown only when Advanced > Layout > Show IP Addressing is on. WAN Address renders centered below the Internet circle; LAN Address renders centered below this Router circle."
        )}
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.wan_ip || ""}
          .label=${"WAN Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.wan_ip")}
          allow-custom-entity
        ></ha-entity-picker>
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

        <div class="sub-header">LAN Connected Devices</div>
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

  _renderSwitchPage() {
    const sw = this._config.switch || {};
    const c = sw.colors || {};

    return b`
      <div class="form-section">
        ${this._infoHeader("Switch", "Optional node between Router and your Access Points. Only appears once an entity is selected below.")}

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

        ${this._renderPoeSection(sw.poe, "switch.poe")}

        <div class="sub-header">Connected Devices</div>
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
          <option value="homelab">Homelab Server</option>
          <option value="switch">Main Switch</option>
        </select>
      </div>
    `;
  }

  _renderSecurityPage() {
    const vpnTarget = this._config.vpn_target || "router";
    const firewallTarget = this._config.firewall_target || "router";
    const dnsTarget = this._config.dns_target || "router";
    const reverseProxyTarget = this._config.reverse_proxy_target || "router";
    const aps = (this._config.nodes || []).flatMap((node) => node.access_points || []);
    const hasPrimaryAp = aps.some((ap) => ap.is_primary);
    const hasHomelab = (this._config.nodes || []).some((node) => node.homelab);
    const hasMainSwitch = !!this._config.switch?.entity;

    const targetWarning = (target) => {
      if (target === "primary_ap" && !hasPrimaryAp) {
        return "No Access Point is currently marked Primary - the badge won't appear until one is (on the Access Points page).";
      }
      if (target === "homelab" && !hasHomelab) {
        return "No Homelab node exists yet - the badge won't appear until one is added (on the Nodes page).";
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
    return b`
      <div class="form-section">
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
            ? (node.homelab.name || node.homelab.entity || "Homelab Server")
            : (ap.name || ap.entity)) || `Node ${idx + 1}`;
          const label = hasPrimary ? `${baseLabel} (Primary)` : baseLabel;
          return b`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon .icon=${displayIcon} style="color:${hasPrimary ? 'var(--accent-color)' : 'var(--primary-color)'};"></ha-icon>
                <span>${label}</span>
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
                  @click=${() => (this._editingApIndex = idx)}
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
          `;
        })}
        <button class="add-btn" @click=${() => this._addAp()}>
          + Add Node
        </button>

        ${this._infoHeader(
          "Auto-Discovery",
          "Scans TP-Link Deco (satellite units, added as Access Point nodes), Proxmox VE (physical/cluster nodes, added as Homelab Server nodes with their VMs/Containers attached automatically), AsusRouter AiMesh (satellite units, added as Access Point nodes), and UniFi/Omada (their switches and access points) in one pass. Nothing is added automatically; filter and select which ones you want below, and choose whether each UniFi/Omada Switch or Access Point becomes its own new Node or attaches under one you've already added."
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
    const nodes = (this._config.nodes || []).map((node, i) => ({
      ...node,
      access_points: (node.access_points || []).map((ap, j) => ({
        ...ap,
        is_primary: i === index && j === apIndex ? value : false
      }))
    }));
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _renderApEditor(index) {
    const node = this._config.nodes[index] || DEFAULT_NODE;
    const isSwitchNode = !!node.switch;
    const isHomelabNode = !!node.homelab;

    if (isSwitchNode && this._editingSwitchApIndex !== null) {
      return b`
        <div class="form-section">
          ${this._renderApNodeFields(index, node, this._editingSwitchApIndex)}
        </div>
      `;
    }

    if (isSwitchNode && this._editingFedSwitchIndex !== null) {
      return b`
        <div class="form-section">
          ${this._renderFedSwitchFields(index, node, this._editingFedSwitchIndex)}
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
            <option value="homelab">Homelab Server</option>
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

      ${this._renderPoeSection(sw.poe, `${prefix}.poe`)}

      ${this._infoHeader("Access Points", "Access Points added here hang off this Switch's own connector line.")}
      ${(node.access_points || []).map((ap, apIdx) => b`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${ap.icon || "mdi:wifi"} style="color:var(--primary-color);"></ha-icon>
            <span>${ap.name || ap.entity || `AP ${apIdx + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button
              @click=${() => (this._editingSwitchApIndex = apIdx)}
              title="Edit"
            >
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${() => this._removeApFromSwitch(index, apIdx)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addApToSwitch(index)}>
        + Add Access Point
      </button>

      ${this._infoHeader(
        "Fed Switches",
        "Switches added here hang off this Switch too, in the same row as its Access Points - each a leaf with its own Connected Devices and PoE, connected with solid lines the whole way down."
      )}
      ${(node.fed_switches || []).map((fedSw, fedIdx) => b`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${fedSw.icon || "mdi:switch"} style="color:var(--primary-color);"></ha-icon>
            <span>${fedSw.name || fedSw.entity || `Switch ${fedIdx + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button
              @click=${() => (this._editingFedSwitchIndex = fedIdx)}
              title="Edit"
            >
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${() => this._removeFedSwitch(index, fedIdx)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addFedSwitch(index)}>
        + Add Fed Switch
      </button>

      <div class="sub-header">Connected Devices</div>
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

  _addFedSwitch(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      fed_switches: [...(node.fed_switches || []), { ...DEFAULT_NODE_SWITCH }]
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _addContainer(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;
    nodes[nodeIndex] = {
      ...node,
      homelab: {
        ...node.homelab,
        containers: [...(node.homelab.containers || []), { ...DEFAULT_CONTAINER_BADGE }]
      }
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _removeContainer(nodeIndex, containerIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;
    nodes[nodeIndex] = {
      ...node,
      homelab: {
        ...node.homelab,
        containers: (node.homelab.containers || []).filter((_, i) => i !== containerIndex)
      }
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  // Every container entity already used as a badge, on ANY homelab
  // node - not just the one currently being edited - so the same
  // container can't accidentally end up added twice across two nodes.
  _existingContainerEntities() {
    const existing = new Set();
    (this._config.nodes || []).forEach((n) => {
      (n.homelab?.containers || []).forEach((c) => c.entity && existing.add(c.entity));
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

  _addSelectedContainers(nodeIndex) {
    const existing = this._existingContainerEntities();
    const toAdd = (this._discoveredContainers || []).filter(
      (c) => this._discoveredContainersSelected.has(c.entity) && !existing.has(c.entity)
    );
    if (!toAdd.length) return;

    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;

    const newContainers = toAdd.map((c) => ({
      ...DEFAULT_CONTAINER_BADGE,
      entity: c.entity,
      name: c.name,
      icon: c.kind === "VM" ? "mdi:desktop-tower" : "mdi:docker"
    }));

    nodes[nodeIndex] = {
      ...node,
      homelab: {
        ...node.homelab,
        containers: [...(node.homelab.containers || []), ...newContainers]
      }
    };

    this._config = { ...this._config, nodes };
    this._discoveredContainersSelected = new Set();
    this._containersScanMessage = `Added ${newContainers.length} container${newContainers.length === 1 ? "" : "s"}: ${newContainers
      .map((c) => c.name || c.entity)
      .join(", ")}`;
    this._fireChanged();
  }

  // Removes this container/VM badge from WHICHEVER Homelab node
  // currently has it, then it becomes selectable again in the scan
  // list, after confirming with the person first.
  _removeDiscoveredContainer(entityId) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    this._config = {
      ...this._config,
      nodes: (this._config.nodes || []).map((n) => {
        if (!n.homelab) return n;
        return {
          ...n,
          homelab: { ...n.homelab, containers: (n.homelab.containers || []).filter((c) => c.entity !== entityId) }
        };
      })
    };
    this._containersScanMessage = "Container/VM removed.";
    this._fireChanged();
  }

  _renderDiscoveredContainersList(nodeIndex) {
    const existing = this._existingContainerEntities();
    const all = this._discoveredContainers || [];
    if (!all.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No Portainer or Proxmox VM/Container entities found.</p>`;
    }
    const sourceLabel = { portainer: "Portainer", proxmoxve: "Proxmox VE" };
    const sources = [...new Set(all.map((c) => c.source))];
    const activeFilter = this._discoveredContainersFilter || "";
    const list = activeFilter ? all.filter((c) => c.source === activeFilter) : all;

    const selectable = list.filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredContainersSelected.has(c.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredContainersPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
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
              <ha-icon icon="${c.kind === "VM" ? "mdi:desktop-tower" : "mdi:docker"}"></ha-icon>
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
      <button class="add-btn" .disabled=${!this._discoveredContainersSelected.size} @click=${() => this._addSelectedContainers(nodeIndex)}>
        Add Selected (${this._discoveredContainersSelected.size})
      </button>
    `;
  }

  _removeFedSwitch(nodeIndex, fedIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      fed_switches: (node.fed_switches || []).filter((_, i) => i !== fedIndex)
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  // Fields for a single fed Switch (a leaf Switch hanging off a node's
  // own Switch, alongside its Access Points). Deliberately a subset of
  // _renderSwitchNodeFields - no Access Points/Fed Switches list of
  // its own, since fed switches don't feed further children.
  _renderFedSwitchFields(nodeIndex, node, fedIndex) {
    const sw = node.fed_switches?.[fedIndex] || DEFAULT_NODE_SWITCH;
    const prefix = `nodes.${nodeIndex}.fed_switches.${fedIndex}`;
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

      <div class="sub-header">Connected Devices</div>
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

      ${this._renderPoeSection(sw.poe, `${prefix}.poe`)}

      <div class="sub-header">Connected Devices</div>
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
  // colors, Connected Devices), plus PoE and a Containers/VMs list -
  // one status badge per tracked container/VM. DNS Filtering, VPN,
  // Firewall, and Reverse Proxy are configured on the Security page
  // and can each be targeted at this node from there.
  _renderHomelabFields(index, node) {
    const hl = node.homelab || DEFAULT_HOMELAB;
    const prefix = `nodes.${index}.homelab`;
    const c = hl.colors || {};

    return b`
      <div class="sub-header">Homelab Server</div>
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

      ${this._renderPoeSection(hl.poe, `${prefix}.poe`)}

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
              @click=${() => this._removeContainer(index, ci)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addContainer(index)}>
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
      ${this._discoveredContainers !== null ? this._renderDiscoveredContainersList(index) : null}

      <div class="sub-header">Connected Devices</div>
      <div class="toggle-row">
        <span>Show connection to Connected/Clients</span>
        <ha-switch
          .checked=${hl.show_devices_line !== false}
          @change=${(e) => this._valueChanged(e, `${prefix}.show_devices_line`)}
        ></ha-switch>
      </div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        Most Homelab nodes have nothing hanging directly off them -
        turn this off to hide the line down to Connected Devices and
        the shared Clients box entirely.
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

  _addApToSwitch(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      access_points: [...(node.access_points || []), { ...DEFAULT_ACCESS_POINT }]
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _removeApFromSwitch(nodeIndex, apIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      access_points: (node.access_points || []).filter((_, i) => i !== apIndex)
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _renderApNodeFields(index, node, apIndex = 0) {
    const ap = node.access_points?.[apIndex] || DEFAULT_ACCESS_POINT;
    const prefix = `nodes.${index}.access_points.${apIndex}`;
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
            @change=${(e) => this._setPrimaryAp(index, apIndex, e.target.checked)}
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

        ${this._infoHeader(
          "IP Addressing",
          "Shown only when Advanced > Layout > Show IP Addressing is on. IP Address renders centered above this circle."
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

        <div class="sub-header">AP Connected Devices</div>
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

  _addAp() {
    const nodes = [
      ...(this._config.nodes || []),
      { ...DEFAULT_NODE, access_points: [{ ...DEFAULT_ACCESS_POINT }] }
    ];
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _removeAp(idx) {
    const nodes = (this._config.nodes || []).filter((_, i) => i !== idx);
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _moveAp(idx, direction) {
    const nodes = [...(this._config.nodes || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= nodes.length) return;
    [nodes[idx], nodes[newIdx]] = [nodes[newIdx], nodes[idx]];
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

  _selectSpeedtestService(svc) {
    const internet = this._config.internet || {};
    const incoming = { name: svc.isp, ping: svc.ping, jitter: svc.jitter, download: svc.download, upload: svc.upload };
    const existing = {
      name: internet.name,
      ping: internet.entities?.ping,
      jitter: internet.entities?.jitter,
      download: internet.entities?.download,
      upload: internet.entities?.upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing ${conflicts.join(", ")} with values from ${svc.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      internet: {
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
    this._internetScanMessage = `Applied ${svc.name}.`;
    this._fireChanged();
  }

  // A candidate counts as "currently applied" only by its actual entity
  // fields (ping/jitter/download/upload) - not by ISP name, since that's
  // plain text that could've been overwritten by hand or by an ISP-scan
  // candidate afterward, making it an unreliable match signal.
  _isSpeedtestCurrent(svc) {
    const internet = this._config.internet || {};
    const pairs = [
      [svc.ping, internet.entities?.ping],
      [svc.jitter, internet.entities?.jitter],
      [svc.download, internet.entities?.download],
      [svc.upload, internet.entities?.upload]
    ].filter(([v]) => v);
    return pairs.length > 0 && pairs.every(([v, cur]) => v === cur);
  }

  _removeSpeedtestSelection(svc) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const internet = this._config.internet || {};
    const entities = { ...internet.entities };
    if (svc.ping && entities.ping === svc.ping) entities.ping = "";
    if (svc.jitter && entities.jitter === svc.jitter) entities.jitter = "";
    if (svc.download && entities.download === svc.download) entities.download = "";
    if (svc.upload && entities.upload === svc.upload) entities.upload = "";
    this._config = { ...this._config, internet: { ...internet, entities } };
    this._internetScanMessage = "Speedtest selection removed.";
    this._fireChanged();
  }

  _renderDiscoveredSpeedtestList() {
    const list = this._discoveredSpeedtestServices || [];
    if (!list.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const perPage = 10;
    const page = Math.min(this._discoveredSpeedtestPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
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
              ${this._isSpeedtestCurrent(svc)
                ? b`
                    <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeSpeedtestSelection(svc)}>
                      Remove
                    </button>
                  `
                : b`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectSpeedtestService(svc)}>
                      Select
                    </button>
                  `}
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
      : "No Aussie Broadband, Starlink, or Start.ca entities found.";
    this.requestUpdate();
  }

  _selectIspService(svc) {
    const internet = this._config.internet || {};
    const incoming = {
      entity: svc.connected,
      billing_total: svc.billingTotal,
      billing_remaining: svc.billingRemaining,
      total_download: svc.totalDownload,
      total_upload: svc.totalUpload
    };
    const existing = {
      entity: internet.entity,
      billing_total: internet.entities?.billing_total,
      billing_remaining: internet.entities?.billing_remaining,
      total_download: internet.entities?.total_download,
      total_upload: internet.entities?.total_upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing ${conflicts.join(", ")} with values from ${svc.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      internet: {
        ...internet,
        entity: svc.connected || internet.entity,
        entities: {
          ...internet.entities,
          billing_total: svc.billingTotal || internet.entities?.billing_total,
          billing_remaining: svc.billingRemaining || internet.entities?.billing_remaining,
          total_download: svc.totalDownload || internet.entities?.total_download,
          total_upload: svc.totalUpload || internet.entities?.total_upload
        }
      }
    };
    this._ispScanMessage = `Applied ${svc.name}.`;
    this._fireChanged();
  }

  _isIspCurrent(svc) {
    const internet = this._config.internet || {};
    const pairs = [
      [svc.connected, internet.entity],
      [svc.billingTotal, internet.entities?.billing_total],
      [svc.billingRemaining, internet.entities?.billing_remaining],
      [svc.totalDownload, internet.entities?.total_download],
      [svc.totalUpload, internet.entities?.total_upload]
    ].filter(([v]) => v);
    return pairs.length > 0 && pairs.every(([v, cur]) => v === cur);
  }

  _removeIspSelection(svc) {
    if (!window.confirm("Are you sure you want to remove?")) return;
    const internet = this._config.internet || {};
    const entities = { ...internet.entities };
    let entity = internet.entity;
    if (svc.connected && entity === svc.connected) entity = "";
    if (svc.billingTotal && entities.billing_total === svc.billingTotal) entities.billing_total = "";
    if (svc.billingRemaining && entities.billing_remaining === svc.billingRemaining) entities.billing_remaining = "";
    if (svc.totalDownload && entities.total_download === svc.totalDownload) entities.total_download = "";
    if (svc.totalUpload && entities.total_upload === svc.totalUpload) entities.total_upload = "";
    this._config = { ...this._config, internet: { ...internet, entity, entities } };
    this._ispScanMessage = "ISP selection removed.";
    this._fireChanged();
  }

  _renderDiscoveredIspList() {
    const list = this._discoveredIspServices || [];
    if (!list.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const perPage = 10;
    const page = Math.min(this._discoveredIspPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${pageItems.map((svc) => {
          const found = [
            svc.connected && "Connected",
            svc.billingTotal && "Billing total",
            svc.billingRemaining && "Billing remaining",
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
              ${this._isIspCurrent(svc)
                ? b`
                    <button class="add-btn" style="margin:0; white-space:nowrap; background:var(--secondary-text-color);" @click=${() => this._removeIspSelection(svc)}>
                      Remove
                    </button>
                  `
                : b`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectIspService(svc)}>
                      Select
                    </button>
                  `}
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
    const list = this._discoveredAdGuard || [];
    if (!list.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const current = this._config.dns_entity;
    const perPage = 10;
    const page = Math.min(this._discoveredAdGuardPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
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
    const srmResult = scanSynologySrmIntegration(this.hass);
    const asusResult = scanAsusRouterIntegration(this.hass);
    const unifiResult = scanUnifiIntegration(this.hass);
    const omadaResult = scanOmadaIntegration(this.hass);
    const candidates = [
      ...tplinkResult.routerCandidates,
      ...unifiResult.routerCandidates,
      ...omadaResult.routerCandidates
    ];
    if (openwrtResult.routerCandidate) candidates.push(openwrtResult.routerCandidate);
    if (srmResult.routerCandidate) candidates.push(srmResult.routerCandidate);
    if (asusResult.routerCandidate) candidates.push(asusResult.routerCandidate);

    this._discoveredRouters = candidates;
    this._discoveredRoutersPage = 0;
    this._routerScanMessage = candidates.length
      ? ""
      : "No TP-Link Router, Deco master unit, OpenWrt (LuCI), Synology SRM, AsusRouter, UniFi, or Omada gateway found.";
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
      lan_ip: candidate.lanIpEntity
    };
    const existing = {
      entity: current.entity,
      name: current.name,
      lan_entity: lan.entity,
      wan_ip: current.entities?.wan_ip,
      lan_ip: current.entities?.lan_ip
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
          lan_ip: candidate.lanIpEntity || current.entities?.lan_ip
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
    if (candidate.lanIpEntity && router.entities.lan_ip === candidate.lanIpEntity) router.entities.lan_ip = "";
    const newLan = { ...lan };
    if (candidate.lanEntity && newLan.entity === candidate.lanEntity) newLan.entity = "";
    this._config = { ...this._config, router, lan: newLan };
    this._routerScanMessage = "Router selection removed.";
    this._fireChanged();
  }

  _renderDiscoveredRoutersList() {
    const list = this._discoveredRouters || [];
    if (!list.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No TP-Link Router or Deco master unit found.</p>`;
    }
    const sourceLabel = {
      tplink_deco: "TP-Link Deco (master)",
      tplink_router: "TP-Link Router",
      luci: "OpenWrt (LuCI)",
      synology_srm: "Synology SRM",
      asusrouter: "AsusRouter (AiMesh)",
      unifi: "UniFi Network",
      omada: "TP-Link Omada"
    };
    const current = this._config.router?.entity;
    const perPage = 10;
    const page = Math.min(this._discoveredRoutersPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
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
                    ${c.lanIpEntity ? b` · LAN IP: ${c.lanIpEntity}` : null}
                  </div>
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
    const candidates = [
      ...unifiResult.switches.map((n) => ({ source: "unifi", entity: n.entity, name: n.name, raw: n })),
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
      connected_devices: candidate.raw.connectedDevices
    };
    const existing = {
      entity: current.entity,
      name: current.name,
      connected_devices: current.entities?.connected_devices
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
          connected_devices: candidate.raw.connectedDevices || current.entities?.connected_devices
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
    this._config = { ...this._config, switch: sw };
    this._mainSwitchScanMessage = "Switch selection removed.";
    this._fireChanged();
  }

  _renderDiscoveredMainSwitchesList() {
    const list = this._discoveredMainSwitches || [];
    if (!list.length) {
      return b`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No UniFi or Omada switch found.</p>`;
    }
    const sourceLabel = { unifi: "UniFi Network", omada: "TP-Link Omada" };
    const current = this._config.switch?.entity;
    const perPage = 10;
    const page = Math.min(this._discoveredMainSwitchesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
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
                    ${c.raw.connectedDevices ? b` · Connected Devices: ${c.raw.connectedDevices}` : null}
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

  // --- Unified Nodes Auto-Discovery (TP-Link Deco + Proxmox VE + -----
  // AsusRouter AiMesh + UniFi + Omada) ---------------------------------
  // Every candidate carries `type` ("ap" for a mesh/AP unit, "switch"
  // for a managed switch - only UniFi and Omada produce these today,
  // since neither TP-Link Deco nor AsusRouter's AiMesh model a separate
  // switch role - or "homelab" for a Proxmox node) and `source` (the
  // owning integration), plus `raw` holding whatever type-specific data
  // _addSelectedNodes needs to build the actual node.
  _scanForNodes() {
    const tplink = scanTplinkDevices(this.hass);
    const proxmox = scanProxmoxIntegration(this.hass);
    const asus = scanAsusRouterIntegration(this.hass);
    const unifi = scanUnifiIntegration(this.hass);
    const omada = scanOmadaIntegration(this.hass);
    const candidates = [
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
    this._discoveredNodesTarget = {};
    this._nodeScanMessage = candidates.length
      ? ""
      : "No TP-Link Deco, Proxmox VE, AsusRouter AiMesh, UniFi, or Omada nodes found.";
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
    this._nodeScanMessage = "All nodes removed.";
    this._fireChanged();
  }

  _removeAllContainers(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;
    const count = (node.homelab.containers || []).length;
    if (!count) return;
    if (!window.confirm(`Remove all ${count} container${count === 1 ? "" : "s"}/VM(s) from this node? This can't be undone.`)) return;
    nodes[nodeIndex] = { ...node, homelab: { ...node.homelab, containers: [] } };
    this._config = { ...this._config, nodes };
    this._containersScanMessage = "All containers/VMs removed from this node.";
    this._fireChanged();
  }

  _removeAllRouter() {
    const router = this._config.router || {};
    if (!router.entity && !router.entities?.wan_ip && !router.entities?.lan_ip) return;
    if (!window.confirm("Remove the Router entity and its WAN/LAN IP fields? This can't be undone.")) return;
    const lan = this._config.lan || {};
    this._config = {
      ...this._config,
      router: { ...router, entity: "", entities: { ...router.entities, wan_ip: "", lan_ip: "" } },
      lan: { ...lan, entity: "" }
    };
    this._routerScanMessage = "Router removed.";
    this._fireChanged();
  }

  _removeAllSpeedtest() {
    const internet = this._config.internet || {};
    const e = internet.entities || {};
    if (!e.ping && !e.jitter && !e.download && !e.upload) return;
    if (!window.confirm("Remove all Speedtest fields (Ping, Jitter, Download, Upload)? This can't be undone.")) return;
    this._config = {
      ...this._config,
      internet: { ...internet, entities: { ...e, ping: "", jitter: "", download: "", upload: "" } }
    };
    this._internetScanMessage = "Speedtest fields removed.";
    this._fireChanged();
  }

  _removeAllIsp() {
    const internet = this._config.internet || {};
    const e = internet.entities || {};
    if (!e.billing_total && !e.billing_remaining && !e.total_download && !e.total_upload) return;
    if (!window.confirm("Remove all ISP fields (Billing Total, Billing Remaining, Total Downloaded, Total Uploaded)? This can't be undone.")) return;
    this._config = {
      ...this._config,
      internet: { ...internet, entities: { ...e, billing_total: "", billing_remaining: "", total_download: "", total_upload: "" } }
    };
    this._ispScanMessage = "ISP fields removed.";
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

  // Nodes a discovered AP or Switch candidate can be attached under
  // instead of becoming its own new Node - only Nodes that already
  // have their own Switch qualify, since Access Points and Fed
  // Switches only ever hang off a Node's Switch (see
  // buildNetworkTopology): a bare-AP node (switch: null) or a Homelab
  // node has nothing for a second device to visually attach beneath.
  _eligibleAttachTargets() {
    return (this._config.nodes || [])
      .map((node, index) => ({ node, index }))
      .filter(({ node }) => !!node.switch)
      .map(({ node, index }) => ({
        index,
        label: node.name || node.switch.name || node.switch.entity || `Node ${index + 1}`
      }));
  }

  _setNodeTarget(entityId, value) {
    this._discoveredNodesTarget = { ...this._discoveredNodesTarget, [entityId]: value };
    this.requestUpdate();
  }

  _visibleNodeCandidates() {
    const all = this._discoveredNodes || [];
    const activeSource = this._discoveredNodesFilterSource || "";
    const activeType = this._discoveredNodesFilterType || "";
    return all.filter(
      (c) => (!activeSource || c.source === activeSource) && (!activeType || c.type === activeType)
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
        connected_devices: n.connectedDevices || ""
      }
    });

    // Split into "attach under an existing node" vs "create a new
    // node", based on each candidate's chosen target - re-validated
    // against _eligibleAttachTargets here (not just trusted from the
    // dropdown state) in case the targeted node lost its Switch, or
    // was deleted, since the dropdown was set; anything no longer
    // eligible simply falls through to creating its own new node
    // instead of silently doing nothing.
    const eligibleIndexes = new Set(this._eligibleAttachTargets().map((t) => t.index));
    const attachments = [];
    const toCreate = [];
    toAdd.forEach((c) => {
      const target = this._discoveredNodesTarget[c.entity];
      if ((c.type === "ap" || c.type === "switch") && target && target !== "new") {
        const nodeIndex = parseInt(String(target).split(":")[1], 10);
        if (eligibleIndexes.has(nodeIndex)) {
          attachments.push({
            nodeIndex,
            type: c.type,
            item: c.type === "ap" ? buildAccessPoint(c.raw) : buildFedSwitch(c.raw)
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
              icon: cc.kind === "VM" ? "mdi:desktop-tower" : "mdi:docker"
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

    let nodes = [...(this._config.nodes || [])];
    attachments.forEach(({ nodeIndex, type, item }) => {
      const node = nodes[nodeIndex];
      nodes[nodeIndex] =
        type === "ap"
          ? { ...node, access_points: [...(node.access_points || []), item] }
          : { ...node, fed_switches: [...(node.fed_switches || []), item] };
    });
    nodes = [...nodes, ...newNodes];

    this._config = { ...this._config, nodes };
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
      unifi: "UniFi Network",
      omada: "TP-Link Omada"
    };
    const typeLabel = { ap: "Access Point", switch: "Switch", homelab: "Homelab" };
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
          const canAttach = !already && (c.type === "ap" || c.type === "switch") && attachTargets.length > 0;
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
                        .value=${targetValue}
                        @change=${(e) => this._setNodeTarget(c.entity, e.target.value)}
                      >
                        <option value="new">New Node</option>
                        ${attachTargets.map(
                          (t) => b`
                            <option value="existing:${t.index}">
                              ${c.type === "ap" ? "Access Point" : "Fed Switch"} under "${t.label}"
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
    const srmResult = scanSynologySrmIntegration(this.hass);
    const asusResult = scanAsusRouterIntegration(this.hass);
    const unifiResult = scanUnifiIntegration(this.hass);
    const omadaResult = scanOmadaIntegration(this.hass);
    this._discoveredDevices = [
      ...tplinkResult.individualDevices,
      ...openwrtResult.clients,
      ...srmResult.clients,
      ...asusResult.clients,
      ...unifiResult.clients,
      ...omadaResult.clients
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
      synology_srm: "Synology SRM",
      asusrouter: "AsusRouter (AiMesh)",
      unifi: "UniFi Network",
      omada: "TP-Link Omada"
    };
    const sources = [...new Set(all.map((d) => d.source))];
    const activeFilter = this._discoveredDevicesFilter || "";
    const list = activeFilter ? all.filter((d) => d.source === activeFilter) : all;

    const selectable = list.filter((d) => !existing.has(d.entity));
    const allSelected = selectable.length > 0 && selectable.every((d) => this._discoveredSelected.has(d.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredDevicesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return b`
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
          "Auto-Discovery (TP-Link / OpenWrt / Synology SRM / AsusRouter / UniFi / Omada)",
          "Scans for device_tracker entities from the TP-Link Deco, TP-Link Router, OpenWrt (LuCI), Synology SRM, AsusRouter, UniFi, and TP-Link Omada integrations (mesh units, switches, access points, and routers/gateways are excluded - use the Nodes and Router pages for those). Nothing is added automatically; review the list and select which ones you want, then add them like any other client - icon, color, name, and group are all still yours to set afterward."
        )}
        <button class="add-btn" @click=${() => this._scanIndividualDevices()}>
          Scan for Clients
        </button>
        ${this._discoveredDevices !== null ? this._renderDiscoveredDevicesList() : null}

        <div class="sub-header">Grouping</div>
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
            <option value="ap">Connected AP</option>
            <option value="area">Device Area</option>
          </select>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Splits the box into labeled sub-groups. A wired device (its
          entity's "connection" attribute is "wired", or - for TP-Link
          Omada - it carries a "switch_mac" attribute) always groups as
          "Wired", except under <strong>Device Area</strong> below,
          which ignores connection type entirely. <strong>SSID</strong>
          groups by network name (TP-Link Deco's "interface" attribute,
          UniFi's "essid", or Omada's "ssid" - a guest network always
          groups as "Guest" regardless of the actual SSID name).
          <strong>VLAN</strong> groups by UniFi's numeric "vlan"
          attribute or Omada's "vlan_id" when present (even for a guest
          client on that VLAN), falling back to "Guest" if there's no
          VLAN but the client is flagged as guest, then to Deco's
          "interface". <strong>Connected AP</strong> groups by Deco's
          "deco_device" (a friendly name) or UniFi's/Omada's "ap_mac"
          (a MAC address, since neither exposes a friendly AP name
          here). <strong>Device Area</strong> groups by the entity's
          assigned Home Assistant Area (falling back to its device's
          Area if the entity itself has none) - independent of any
          integration, since Areas are set in Home Assistant itself.
          Anything missing the relevant attribute, or with no Area
          assigned, falls into "Unknown". Override any individual
          client's group on its own page below.
        </p>

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
          <span>Show Client Names</span>
          <ha-switch
            .checked=${!!this._config.individual_devices_show_names}
            @change=${(e) => this._valueChanged(e, "individual_devices_show_names")}
          ></ha-switch>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shows each client's name in small text directly below its
          circle. Off by default, since it noticeably increases visual
          density on a Clients box with a lot of devices - the full
          name is always available on tap/hover either way.
        </p>
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

  _renderAdvancedPage() {
    const pos = this._config.summary_position || "top";
    const apLayout = this._config.primary_ap_layout || "flat";
    const showSummary = this._config.show_summary !== false;
    const animationOn = this._config.enable_animations === true;

    return b`
      <div class="form-section">
        <div class="sub-header">Layout</div>
        ${this._renderInput("Title", this._config.title, "title")}

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

        <div class="toggle-row">
          <span>Show IP Addressing</span>
          <ha-switch
            .checked=${this._config.show_ip_addressing === true}
            @change=${(e) => this._valueChanged(e, "show_ip_addressing")}
          ></ha-switch>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shows WAN/LAN IP badges on the Router (or Primary AP, if it's
          acting as your router) and IP badges on every Access Point,
          wherever an IP Address entity is set. Off by default.
        </p>

        <div class="toggle-row">
          <span>Show Summary</span>
          <ha-switch
            .checked=${showSummary}
            @change=${(e) => this._valueChanged(e, "show_summary")}
          ></ha-switch>
        </div>

        ${showSummary
          ? b`
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

              ${[0, 1, 2].map((idx) => {
                const items = this._config.summary_items || ["download", "upload", "ping"];
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
                      <option value="download">Download</option>
                      <option value="upload">Upload</option>
                      <option value="ping">Latency and Jitter</option>
                      <option value="vpn">VPN Status</option>
                      <option value="firewall">Firewall Status</option>
                      <option value="poe">PoE Total</option>
                    </select>
                  </div>
                `;
              })}

              ${(this._config.summary_items || ["download", "upload", "ping"]).includes("poe")
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

        ${this._infoHeader("Flow Lines", "Controls every connection line and flow dot on the card, except the Internet connection itself (set separately on the Internet page).")}
        ${this._renderColorInput("Flow Line Color", this._config.flow_line_color, "flow_line_color")}

        <div class="sub-header">Animation</div>
        <div class="toggle-row">
          <span>Enable Animations</span>
          <ha-switch
            .checked=${animationOn}
            @change=${(e) => this._valueChanged(e, "enable_animations")}
          ></ha-switch>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Master switch for all card animations, including flow dots, offline
          pulsing/flashing and animated status badges. Disabled by default.
        </p>

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

        <div class="sub-header">Sizes</div>
        ${this._renderSlider("Internet Circle Size", this._config.internet?.circle_size, "internet.circle_size", 40, 120)}
        ${this._renderSlider("Internet Icon Size", this._config.internet?.icon_size, "internet.icon_size", 12, 64)}
        ${this._renderSlider("Router Circle Size", this._config.router?.circle_size, "router.circle_size", 40, 120)}
        ${this._renderSlider("Router Icon Size", this._config.router?.icon_size, "router.icon_size", 12, 64)}
        ${this._renderSlider("Switch Circle Size", this._config.switch?.circle_size, "switch.circle_size", 30, 100)}
        ${this._renderSlider("Switch Icon Size", this._config.switch?.icon_size, "switch.icon_size", 10, 56)}
        ${this._renderSlider("Homelab Circle Size", this._config.homelab_circle_size, "homelab_circle_size", 30, 100)}
        ${this._renderSlider("Homelab Icon Size", this._config.homelab_icon_size, "homelab_icon_size", 10, 56)}
        ${this._renderSlider("LAN Circle Size", this._config.lan?.circle_size, "lan.circle_size", 30, 90)}
        ${this._renderSlider("LAN Icon Size", this._config.lan?.icon_size, "lan.icon_size", 10, 48)}
        ${this._renderSlider("AP Circle Size", this._config.ap_circle_size, "ap_circle_size", 40, 120)}
        ${this._renderSlider("AP Icon Size", this._config.ap_icon_size, "ap_icon_size", 12, 64)}
        ${this._renderSlider("Connected Devices Circle Size", this._config.ap_devices_circle_size, "ap_devices_circle_size", 30, 90)}
        ${this._renderSlider("Connected Devices Icon Size", this._config.ap_devices_icon_size, "ap_devices_icon_size", 10, 48)}
        ${this._renderSlider("Backhaul Icon Size", this._config.backhaul_icon_size, "backhaul_icon_size", 8, 24)}
        ${this._renderSlider("Client Circle Size", this._config.individual_device_circle_size, "individual_device_circle_size", 20, 70)}
        ${this._renderSlider("Client Icon Size", this._config.individual_device_icon_size, "individual_device_icon_size", 10, 40)}
        ${this._renderSlider("Guest Badge Size", this._config.individual_device_guest_badge_size, "individual_device_guest_badge_size", 12, 40)}
        ${this._renderSlider("Guest Badge Icon Size", this._config.individual_device_guest_icon_size, "individual_device_guest_icon_size", 8, 24)}
        ${this._renderSlider("Group Box Padding", this._config.individual_devices_group_padding, "individual_devices_group_padding", 0, 24)}
        ${this._renderSlider("Badge Size", this._config.badge_size, "badge_size", 12, 40)}
        ${this._renderSlider("Badge Icon Size", this._config.badge_icon_size, "badge_icon_size", 8, 28)}
        ${this._renderSlider("IP/PoE Badge Size", this._config.poe_badge_size, "poe_badge_size", 10, 32)}
        ${this._renderSlider("IP/PoE Font Size", this._config.poe_badge_font_size, "poe_badge_font_size", 7, 16)}
        ${this._renderSlider("IP Address Badge Opacity (%)", this._config.ip_badge_opacity ?? 100, "ip_badge_opacity", 0, 100)}
        ${this._renderSlider("Column Gap", this._config.ap_column_gap, "ap_column_gap", 8, 60)}
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

if (!customElements.get("network-flow-card-editor")) {
  customElements.define("network-flow-card-editor", NetworkFlowCardEditor);
}

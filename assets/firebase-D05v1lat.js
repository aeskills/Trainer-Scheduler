const Hu=()=>{};var Xo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},zu=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[t++],c=n[t++],u=n[t++],h=((i&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],c=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|c&63)}}return e.join("")},_c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],c=i+1<n.length,u=c?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,_=o>>2,w=(o&3)<<4|u>>4;let A=(u&15)<<2|f>>6,C=f&63;h||(C=64,c||(A=64)),r.push(t[_],t[w],t[A],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(gc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):zu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;const f=i<n.length?t[n.charAt(i)]:64;++i;const w=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||u==null||f==null||w==null)throw new Gu;const A=o<<2|u>>4;if(r.push(A),f!==64){const C=u<<4&240|f>>2;if(r.push(C),w!==64){const k=f<<6&192|w;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Gu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wu=function(n){const e=gc(n);return _c.encodeByteArray(e,!0)},br=function(n){return Wu(n).replace(/\./g,"")},yc=function(n){try{return _c.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu=()=>Ku().__FIREBASE_DEFAULTS__,Ju=()=>{if(typeof process>"u"||typeof Xo>"u")return;const n=Xo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&yc(n[1]);return e&&JSON.parse(e)},Wr=()=>{try{return Hu()||Qu()||Ju()||Xu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},vc=n=>{var e,t;return(t=(e=Wr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ec=n=>{const e=vc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Tc=()=>{var n;return(n=Wr())===null||n===void 0?void 0:n.config},Ic=n=>{var e;return(e=Wr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function hs(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const c=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[br(JSON.stringify(t)),br(JSON.stringify(c)),""].join(".")}const In={};function eh(){const n={prod:[],emulator:[]};for(const e of Object.keys(In))In[e]?n.emulator.push(e):n.prod.push(e);return n}function th(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Yo=!1;function ds(n,e){if(typeof window>"u"||typeof document>"u"||!Ct(window.location.host)||In[n]===e||In[n]||Yo)return;In[n]=e;function t(A){return`__firebase__banner__${A}`}const r="__firebase__banner",o=eh().prod.length>0;function c(){const A=document.getElementById(r);A&&A.remove()}function u(A){A.style.display="flex",A.style.background="#7faaf0",A.style.position="fixed",A.style.bottom="5px",A.style.left="5px",A.style.padding=".5em",A.style.borderRadius="5px",A.style.alignItems="center"}function h(A,C){A.setAttribute("width","24"),A.setAttribute("id",C),A.setAttribute("height","24"),A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.style.marginLeft="-6px"}function f(){const A=document.createElement("span");return A.style.cursor="pointer",A.style.marginLeft="16px",A.style.fontSize="24px",A.innerHTML=" &times;",A.onclick=()=>{Yo=!0,c()},A}function _(A,C){A.setAttribute("id",C),A.innerText="Learn more",A.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",A.setAttribute("target","__blank"),A.style.paddingLeft="5px",A.style.textDecoration="underline"}function w(){const A=th(r),C=t("text"),k=document.getElementById(C)||document.createElement("span"),O=t("learnmore"),N=document.getElementById(O)||document.createElement("a"),H=t("preprendIcon"),F=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(A.created){const q=A.element;u(q),_(N,O);const Y=f();h(F,H),q.append(F,k,N,Y),document.body.appendChild(q)}o?(k.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",w):w()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function nh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())}function rh(){var n;const e=(n=Wr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ih(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function oh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ah(){const n=ye();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ch(){return!rh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function lh(){try{return typeof indexedDB=="object"}catch{return!1}}function uh(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}function I_(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="FirebaseError";class Xe extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=hh,Object.setPrototypeOf(this,Xe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ln.prototype.create)}}class Ln{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],c=o?dh(o,r):"Error",u=`${this.serviceName}: ${c} (${i}).`;return new Xe(i,u,r)}}function dh(n,e){return n.replace(fh,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const fh=/\{\$([^}]+)}/g;function ph(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ct(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const o=n[i],c=e[i];if(Zo(o)&&Zo(c)){if(!ct(o,c))return!1}else if(o!==c)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Zo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function mh(n,e){const t=new gh(n,e);return t.subscribe.bind(t)}class gh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");_h(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Vi),i.error===void 0&&(i.error=Vi),i.complete===void 0&&(i.complete=Vi);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _h(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Vi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(n){return n&&n._delegate?n._delegate:n}class lt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Yu;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Eh(e))try{this.getOrInitializeService({instanceIdentifier:yt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=yt){return this.instances.has(e)}getOptions(e=yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,c]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&c.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const c=this.instances.get(i);return c&&e(c,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vh(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=yt){return this.component?this.component.multipleInstances?e:yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vh(n){return n===yt?void 0:n}function Eh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new yh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var U;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(U||(U={}));const Ih={debug:U.DEBUG,verbose:U.VERBOSE,info:U.INFO,warn:U.WARN,error:U.ERROR,silent:U.SILENT},wh=U.INFO,Ah={[U.DEBUG]:"log",[U.VERBOSE]:"log",[U.INFO]:"info",[U.WARN]:"warn",[U.ERROR]:"error"},Rh=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Ah[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class fs{constructor(e){this.name=e,this._logLevel=wh,this._logHandler=Rh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in U))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ih[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,U.DEBUG,...e),this._logHandler(this,U.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,U.VERBOSE,...e),this._logHandler(this,U.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,U.INFO,...e),this._logHandler(this,U.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,U.WARN,...e),this._logHandler(this,U.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,U.ERROR,...e),this._logHandler(this,U.ERROR,...e)}}const Sh=(n,e)=>e.some(t=>n instanceof t);let ea,ta;function Ph(){return ea||(ea=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bh(){return ta||(ta=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wc=new WeakMap,qi=new WeakMap,Ac=new WeakMap,Oi=new WeakMap,ps=new WeakMap;function Ch(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",c)},o=()=>{t(He(n.result)),i()},c=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&wc.set(t,n)}).catch(()=>{}),ps.set(e,n),e}function kh(n){if(qi.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",c),n.removeEventListener("abort",c)},o=()=>{t(),i()},c=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",c),n.addEventListener("abort",c)});qi.set(n,e)}let Hi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return qi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ac.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return He(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Dh(n){Hi=n(Hi)}function Nh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Mi(this),e,...t);return Ac.set(r,e.sort?e.sort():[e]),He(r)}:bh().includes(n)?function(...e){return n.apply(Mi(this),e),He(wc.get(this))}:function(...e){return He(n.apply(Mi(this),e))}}function Vh(n){return typeof n=="function"?Nh(n):(n instanceof IDBTransaction&&kh(n),Sh(n,Ph())?new Proxy(n,Hi):n)}function He(n){if(n instanceof IDBRequest)return Ch(n);if(Oi.has(n))return Oi.get(n);const e=Vh(n);return e!==n&&(Oi.set(n,e),ps.set(e,n)),e}const Mi=n=>ps.get(n);function Oh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){const c=indexedDB.open(n,e),u=He(c);return r&&c.addEventListener("upgradeneeded",h=>{r(He(c.result),h.oldVersion,h.newVersion,He(c.transaction),h)}),t&&c.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}function w_(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",r=>e(r.oldVersion,r)),He(t).then(()=>{})}const Mh=["get","getKey","getAll","getAllKeys","count"],Lh=["put","add","delete","clear"],Li=new Map;function na(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Li.get(e))return Li.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Lh.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Mh.includes(t)))return;const o=async function(c,...u){const h=this.transaction(c,i?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),i&&h.done]))[0]};return Li.set(e,o),o}Dh(n=>({...n,get:(e,t,r)=>na(e,t)||n.get(e,t,r),has:(e,t)=>!!na(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Uh(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Uh(n){const e=n.getComponent();return e?.type==="VERSION"}const zi="@firebase/app",ra="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke=new fs("@firebase/app"),Fh="@firebase/app-compat",Bh="@firebase/analytics-compat",jh="@firebase/analytics",$h="@firebase/app-check-compat",qh="@firebase/app-check",Hh="@firebase/auth",zh="@firebase/auth-compat",Gh="@firebase/database",Wh="@firebase/data-connect",Kh="@firebase/database-compat",Qh="@firebase/functions",Jh="@firebase/functions-compat",Xh="@firebase/installations",Yh="@firebase/installations-compat",Zh="@firebase/messaging",ed="@firebase/messaging-compat",td="@firebase/performance",nd="@firebase/performance-compat",rd="@firebase/remote-config",id="@firebase/remote-config-compat",sd="@firebase/storage",od="@firebase/storage-compat",ad="@firebase/firestore",cd="@firebase/ai",ld="@firebase/firestore-compat",ud="firebase",hd="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi="[DEFAULT]",dd={[zi]:"fire-core",[Fh]:"fire-core-compat",[jh]:"fire-analytics",[Bh]:"fire-analytics-compat",[qh]:"fire-app-check",[$h]:"fire-app-check-compat",[Hh]:"fire-auth",[zh]:"fire-auth-compat",[Gh]:"fire-rtdb",[Wh]:"fire-data-connect",[Kh]:"fire-rtdb-compat",[Qh]:"fire-fn",[Jh]:"fire-fn-compat",[Xh]:"fire-iid",[Yh]:"fire-iid-compat",[Zh]:"fire-fcm",[ed]:"fire-fcm-compat",[td]:"fire-perf",[nd]:"fire-perf-compat",[rd]:"fire-rc",[id]:"fire-rc-compat",[sd]:"fire-gcs",[od]:"fire-gcs-compat",[ad]:"fire-fst",[ld]:"fire-fst-compat",[cd]:"fire-vertex","fire-js":"fire-js",[ud]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=new Map,fd=new Map,Wi=new Map;function ia(n,e){try{n.container.addComponent(e)}catch(t){Ke.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function wt(n){const e=n.name;if(Wi.has(e))return Ke.debug(`There were multiple attempts to register component ${e}.`),!1;Wi.set(e,n);for(const t of Cn.values())ia(t,n);for(const t of fd.values())ia(t,n);return!0}function Kr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function be(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},at=new Ln("app","Firebase",pd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new lt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw at.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=hd;function gd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Gi,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw at.create("bad-app-name",{appName:String(i)});if(t||(t=Tc()),!t)throw at.create("no-options");const o=Cn.get(i);if(o){if(ct(t,o.options)&&ct(r,o.config))return o;throw at.create("duplicate-app",{appName:i})}const c=new Th(i);for(const h of Wi.values())c.addComponent(h);const u=new md(t,r,c);return Cn.set(i,u),u}function ms(n=Gi){const e=Cn.get(n);if(!e&&n===Gi&&Tc())return gd();if(!e)throw at.create("no-app",{appName:n});return e}function A_(){return Array.from(Cn.values())}function Oe(n,e,t){var r;let i=(r=dd[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const o=i.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const u=[`Unable to register library "${i}" with version "${e}":`];o&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&c&&u.push("and"),c&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ke.warn(u.join(" "));return}wt(new lt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _d="firebase-heartbeat-database",yd=1,kn="firebase-heartbeat-store";let xi=null;function Rc(){return xi||(xi=Oh(_d,yd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(kn)}catch(t){console.warn(t)}}}}).catch(n=>{throw at.create("idb-open",{originalErrorMessage:n.message})})),xi}async function vd(n){try{const t=(await Rc()).transaction(kn),r=await t.objectStore(kn).get(Sc(n));return await t.done,r}catch(e){if(e instanceof Xe)Ke.warn(e.message);else{const t=at.create("idb-get",{originalErrorMessage:e?.message});Ke.warn(t.message)}}}async function sa(n,e){try{const r=(await Rc()).transaction(kn,"readwrite");await r.objectStore(kn).put(e,Sc(n)),await r.done}catch(t){if(t instanceof Xe)Ke.warn(t.message);else{const r=at.create("idb-set",{originalErrorMessage:t?.message});Ke.warn(r.message)}}}function Sc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed=1024,Td=30;class Id{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ad(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=oa();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Td){const c=Rd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(c,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ke.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=oa(),{heartbeatsToSend:r,unsentEntries:i}=wd(this._heartbeatsCache.heartbeats),o=br(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Ke.warn(t),""}}}function oa(){return new Date().toISOString().substring(0,10)}function wd(n,e=Ed){const t=[];let r=n.slice();for(const i of n){const o=t.find(c=>c.agent===i.agent);if(o){if(o.dates.push(i.date),aa(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),aa(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ad{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return lh()?uh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await vd(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return sa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return sa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function aa(n){return br(JSON.stringify({version:2,heartbeats:n})).length}function Rd(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(n){wt(new lt("platform-logger",e=>new xh(e),"PRIVATE")),wt(new lt("heartbeat",e=>new Id(e),"PRIVATE")),Oe(zi,ra,n),Oe(zi,ra,"esm2017"),Oe("fire-js","")}Sd("");function gs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Pc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Pd=Pc,bc=new Ln("auth","Firebase",Pc());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr=new fs("@firebase/auth");function bd(n,...e){Cr.logLevel<=U.WARN&&Cr.warn(`Auth (${Zt}): ${n}`,...e)}function vr(n,...e){Cr.logLevel<=U.ERROR&&Cr.error(`Auth (${Zt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(n,...e){throw _s(n,...e)}function Me(n,...e){return _s(n,...e)}function Cc(n,e,t){const r=Object.assign(Object.assign({},Pd()),{[e]:t});return new Ln("auth","Firebase",r).create(e,{appName:n.name})}function Et(n){return Cc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _s(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return bc.create(n,...e)}function M(n,e,...t){if(!n)throw _s(e,...t)}function $e(n){const e="INTERNAL ASSERTION FAILED: "+n;throw vr(e),new Error(e)}function Je(n,e){n||$e(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Cd(){return ca()==="http:"||ca()==="https:"}function ca(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Cd()||sh()||"connection"in navigator)?navigator.onLine:!0}function Dd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t){this.shortDelay=e,this.longDelay=t,Je(t>e,"Short delay should be less than long delay!"),this.isMobile=nh()||oh()}get(){return kd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(n,e){Je(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$e("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$e("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$e("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Od=new Un(3e4,6e4);function vs(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function en(n,e,t,r,i={}){return Dc(n,i,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});const u=xn(Object.assign({key:n.config.apiKey},c)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return ih()||(f.referrerPolicy="no-referrer"),n.emulatorConfig&&Ct(n.emulatorConfig.host)&&(f.credentials="include"),kc.fetch()(await Nc(n,n.config.apiHost,t,u),f)})}async function Dc(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Nd),e);try{const i=new Ld(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw dr(n,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const u=o.ok?c.errorMessage:c.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw dr(n,"credential-already-in-use",c);if(h==="EMAIL_EXISTS")throw dr(n,"email-already-in-use",c);if(h==="USER_DISABLED")throw dr(n,"user-disabled",c);const _=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Cc(n,_,f);Qe(n,_)}}catch(i){if(i instanceof Xe)throw i;Qe(n,"network-request-failed",{message:String(i)})}}async function Md(n,e,t,r,i={}){const o=await en(n,e,t,r,i);return"mfaPendingCredential"in o&&Qe(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function Nc(n,e,t,r){const i=`${e}${t}?${r}`,o=n,c=o.config.emulator?ys(n.config,i):`${n.config.apiScheme}://${i}`;return Vd.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(c).toString():c}class Ld{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Me(this.auth,"network-request-failed")),Od.get())})}}function dr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Me(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xd(n,e){return en(n,"POST","/v1/accounts:delete",e)}async function kr(n,e){return en(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ud(n,e=!1){const t=Te(n),r=await t.getIdToken(e),i=Es(r);M(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,c=o?.sign_in_provider;return{claims:i,token:r,authTime:wn(Ui(i.auth_time)),issuedAtTime:wn(Ui(i.iat)),expirationTime:wn(Ui(i.exp)),signInProvider:c||null,signInSecondFactor:o?.sign_in_second_factor||null}}function Ui(n){return Number(n)*1e3}function Es(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return vr("JWT malformed, contained fewer than 3 sections"),null;try{const i=yc(t);return i?JSON.parse(i):(vr("Failed to decode base64 JWT payload"),null)}catch(i){return vr("Caught error parsing JWT payload as JSON",i?.toString()),null}}function la(n){const e=Es(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Xe&&Fd(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Fd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=wn(this.lastLoginAt),this.creationTime=wn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dr(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Dn(n,kr(t,{idToken:r}));M(i?.users.length,t,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Vc(o.providerUserInfo):[],u=$d(n.providerData,c),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!u?.length,_=h?f:!1,w={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new Qi(o.createdAt,o.lastLoginAt),isAnonymous:_};Object.assign(n,w)}async function jd(n){const e=Te(n);await Dr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $d(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Vc(n){return n.map(e=>{var{providerId:t}=e,r=gs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qd(n,e){const t=await Dc(n,{},async()=>{const r=xn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,c=await Nc(n,i,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:u,body:r};return n.emulatorConfig&&Ct(n.emulatorConfig.host)&&(h.credentials="include"),kc.fetch()(c,h)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Hd(n,e){return en(n,"POST","/v2/accounts:revokeToken",vs(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):la(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=la(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:o}=await qd(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:o}=t,c=new Bt;return r&&(M(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),c.accessToken=i),o&&(M(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Bt,this.toJSON())}_performRefresh(){return $e("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ke{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,o=gs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Bd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Qi(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Dn(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ud(this,e)}reload(){return jd(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ke(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Dr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(be(this.auth.app))return Promise.reject(Et(this.auth));const e=await this.getIdToken();return await Dn(this,xd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,o,c,u,h,f,_;const w=(r=t.displayName)!==null&&r!==void 0?r:void 0,A=(i=t.email)!==null&&i!==void 0?i:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(c=t.photoURL)!==null&&c!==void 0?c:void 0,O=(u=t.tenantId)!==null&&u!==void 0?u:void 0,N=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,H=(f=t.createdAt)!==null&&f!==void 0?f:void 0,F=(_=t.lastLoginAt)!==null&&_!==void 0?_:void 0,{uid:q,emailVerified:Y,isAnonymous:Ne,providerData:ne,stsTokenManager:E}=t;M(q&&E,e,"internal-error");const p=Bt.fromJSON(this.name,E);M(typeof q=="string",e,"internal-error"),nt(w,e.name),nt(A,e.name),M(typeof Y=="boolean",e,"internal-error"),M(typeof Ne=="boolean",e,"internal-error"),nt(C,e.name),nt(k,e.name),nt(O,e.name),nt(N,e.name),nt(H,e.name),nt(F,e.name);const g=new ke({uid:q,auth:e,email:A,emailVerified:Y,displayName:w,isAnonymous:Ne,photoURL:k,phoneNumber:C,tenantId:O,stsTokenManager:p,createdAt:H,lastLoginAt:F});return ne&&Array.isArray(ne)&&(g.providerData=ne.map(y=>Object.assign({},y))),N&&(g._redirectEventId=N),g}static async _fromIdTokenResponse(e,t,r=!1){const i=new Bt;i.updateFromServerResponse(t);const o=new ke({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Dr(o),o}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];M(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Vc(i.providerUserInfo):[],c=!(i.email&&i.passwordHash)&&!o?.length,u=new Bt;u.updateFromIdToken(r);const h=new ke({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:c}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Qi(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!o?.length};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=new Map;function qe(n){Je(n instanceof Function,"Expected a class definition");let e=ua.get(n);return e?(Je(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ua.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Oc.type="NONE";const ha=Oc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(n,e,t){return`firebase:${n}:${e}:${t}`}class jt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=Er(this.userKey,i.apiKey,o),this.fullPersistenceKey=Er("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await kr(this.auth,{idToken:e}).catch(()=>{});return t?ke._fromGetAccountInfoResponse(this.auth,t,e):null}return ke._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new jt(qe(ha),e,r);const i=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=i[0]||qe(ha);const c=Er(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const _=await f._get(c);if(_){let w;if(typeof _=="string"){const A=await kr(e,{idToken:_}).catch(()=>{});if(!A)break;w=await ke._fromGetAccountInfoResponse(e,A,_)}else w=ke._fromJSON(e,_);f!==o&&(u=w),o=f;break}}catch{}const h=i.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new jt(o,e,r):(o=h[0],u&&await o._set(c,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(c)}catch{}})),new jt(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Uc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Mc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bc(e))return"Blackberry";if(jc(e))return"Webos";if(Lc(e))return"Safari";if((e.includes("chrome/")||xc(e))&&!e.includes("edge/"))return"Chrome";if(Fc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Mc(n=ye()){return/firefox\//i.test(n)}function Lc(n=ye()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xc(n=ye()){return/crios\//i.test(n)}function Uc(n=ye()){return/iemobile/i.test(n)}function Fc(n=ye()){return/android/i.test(n)}function Bc(n=ye()){return/blackberry/i.test(n)}function jc(n=ye()){return/webos/i.test(n)}function Ts(n=ye()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function zd(n=ye()){var e;return Ts(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Gd(){return ah()&&document.documentMode===10}function $c(n=ye()){return Ts(n)||Fc(n)||jc(n)||Bc(n)||/windows phone/i.test(n)||Uc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(n,e=[]){let t;switch(n){case"Browser":t=da(ye());break;case"Worker":t=`${da(ye())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Zt}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((c,u)=>{try{const h=e(o);c(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kd(n,e={}){return en(n,"GET","/v2/passwordPolicy",vs(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd=6;class Jd{constructor(e){var t,r,i,o;const c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=c.minPasswordLength)!==null&&t!==void 0?t:Qd,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,o,c,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(i=h.containsLowercaseLetter)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(c=h.containsNumericCharacter)!==null&&c!==void 0?c:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fa(this),this.idTokenSubscription=new fa(this),this.beforeStateQueue=new Wd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=qe(t)),this._initializationPromise=this.queue(async()=>{var r,i,o;if(!this._deleted&&(this.persistenceManager=await jt.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await kr(this,{idToken:e}),r=await ke._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(be(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i?._redirectEventId,h=await this.tryRedirectSignIn(e);(!c||c===u)&&h?.user&&(i=h.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(c){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Dr(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Dd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(be(this.app))return Promise.reject(Et(this));const t=e?Te(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return be(this.app)?Promise.reject(Et(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return be(this.app)?Promise.reject(Et(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(qe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Kd(this),t=new Jd(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ln("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Hd(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&qe(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await jt.create(this,[qe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let c=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(u,this,"internal-error"),u.then(()=>{c||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,i);return()=>{c=!0,h()}}else{const h=e.addObserver(t);return()=>{c=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&bd(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Is(n){return Te(n)}class fa{constructor(e){this.auth=e,this.observer=null,this.addObserver=mh(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ws={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Yd(n){ws=n}function Zd(n){return ws.loadJS(n)}function ef(){return ws.gapiScript}function tf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(n,e){const t=Kr(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),o=t.getOptions();if(ct(o,e??{}))return i;Qe(i,"already-initialized")}return t.initialize({options:e})}function rf(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(qe);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function sf(n,e,t){const r=Is(n);M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=Hc(e),{host:c,port:u}=of(e),h=u===null?"":`:${u}`,f={url:`${o}//${c}${h}/`},_=Object.freeze({host:c,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){M(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),M(ct(f,r.config.emulator)&&ct(_,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=f,r.emulatorConfig=_,r.settings.appVerificationDisabledForTesting=!0,Ct(c)?(hs(`${o}//${c}${h}`),ds("Auth",!0)):af()}function Hc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function of(n){const e=Hc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:pa(r.substr(o.length+1))}}else{const[o,c]=r.split(":");return{host:o,port:pa(c)}}}function pa(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function af(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return $e("not implemented")}_getIdTokenResponse(e){return $e("not implemented")}_linkToIdToken(e,t){return $e("not implemented")}_getReauthenticationResolver(e){return $e("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(n,e){return Md(n,"POST","/v1/accounts:signInWithIdp",vs(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf="http://localhost";class At extends zc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new At(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Qe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,o=gs(t,["providerId","signInMethod"]);if(!r||!i)return null;const c=new At(r,i);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){const t=this.buildRequest();return $t(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,$t(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,$t(e,t)}buildRequest(){const e={requestUri:cf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=xn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends Gc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt extends Fn{constructor(){super("facebook.com")}static credential(e){return At._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rt.credential(e.oauthAccessToken)}catch{return null}}}rt.FACEBOOK_SIGN_IN_METHOD="facebook.com";rt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it extends Fn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return At._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return it.credential(t,r)}catch{return null}}}it.GOOGLE_SIGN_IN_METHOD="google.com";it.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st extends Fn{constructor(){super("github.com")}static credential(e){return At._fromParams({providerId:st.PROVIDER_ID,signInMethod:st.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return st.credentialFromTaggedObject(e)}static credentialFromError(e){return st.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return st.credential(e.oauthAccessToken)}catch{return null}}}st.GITHUB_SIGN_IN_METHOD="github.com";st.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends Fn{constructor(){super("twitter.com")}static credential(e,t){return At._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return ot.credential(t,r)}catch{return null}}}ot.TWITTER_SIGN_IN_METHOD="twitter.com";ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const o=await ke._fromIdTokenResponse(e,r,i),c=ma(r);return new zt({user:o,providerId:c,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=ma(r);return new zt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function ma(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr extends Xe{constructor(e,t,r,i){var o;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Nr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Nr(e,t,r,i)}}function Wc(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Nr._fromErrorAndOperation(n,o,e,r):o})}async function lf(n,e,t=!1){const r=await Dn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return zt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uf(n,e,t=!1){const{auth:r}=n;if(be(r.app))return Promise.reject(Et(r));const i="reauthenticate";try{const o=await Dn(n,Wc(r,i,e,n),t);M(o.idToken,r,"internal-error");const c=Es(o.idToken);M(c,r,"internal-error");const{sub:u}=c;return M(n.uid===u,r,"user-mismatch"),zt._forOperation(n,i,o)}catch(o){throw o?.code==="auth/user-not-found"&&Qe(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hf(n,e,t=!1){if(be(n.app))return Promise.reject(Et(n));const r="signIn",i=await Wc(n,r,e),o=await zt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}function df(n,e,t,r){return Te(n).onIdTokenChanged(e,t,r)}function ff(n,e,t){return Te(n).beforeAuthStateChanged(e,t)}const Vr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Vr,"1"),this.storage.removeItem(Vr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=1e3,mf=10;class Qc extends Kc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$c(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((c,u,h)=>{this.notifyListeners(c,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const c=this.storage.getItem(r);!t&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);Gd()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,mf):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},pf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Qc.type="LOCAL";const gf=Qc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc extends Kc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Jc.type="SESSION";const Xc=Jc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Qr(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:o}=t.data,c=this.handlersMap[i];if(!c?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(c).map(async f=>f(t.origin,o)),h=await _f(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,c;return new Promise((u,h)=>{const f=As("",20);i.port1.start();const _=setTimeout(()=>{h(new Error("unsupported_event"))},r);c={messageChannel:i,onMessage(w){const A=w;if(A.data.eventId===f)switch(A.data.status){case"ack":clearTimeout(_),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(A.data.response);break;default:clearTimeout(_),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(c),i.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[i.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(){return window}function vf(n){Le().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(){return typeof Le().WorkerGlobalScope<"u"&&typeof Le().importScripts=="function"}async function Ef(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Tf(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function If(){return Yc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc="firebaseLocalStorageDb",wf=1,Or="firebaseLocalStorage",el="fbase_key";class Bn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Jr(n,e){return n.transaction([Or],e?"readwrite":"readonly").objectStore(Or)}function Af(){const n=indexedDB.deleteDatabase(Zc);return new Bn(n).toPromise()}function Ji(){const n=indexedDB.open(Zc,wf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Or,{keyPath:el})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Or)?e(r):(r.close(),await Af(),e(await Ji()))})})}async function ga(n,e,t){const r=Jr(n,!0).put({[el]:e,value:t});return new Bn(r).toPromise()}async function Rf(n,e){const t=Jr(n,!1).get(e),r=await new Bn(t).toPromise();return r===void 0?null:r.value}function _a(n,e){const t=Jr(n,!0).delete(e);return new Bn(t).toPromise()}const Sf=800,Pf=3;class tl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ji(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Pf)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qr._getInstance(If()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ef(),!this.activeServiceWorker)return;this.sender=new yf(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Tf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ji();return await ga(e,Vr,"1"),await _a(e,Vr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ga(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Rf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_a(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=Jr(i,!1).getAll();return new Bn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Sf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tl.type="LOCAL";const bf=tl;new Un(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cf(n,e){return e?qe(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs extends zc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return $t(e,this._buildIdpRequest())}_linkToIdToken(e,t){return $t(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return $t(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function kf(n){return hf(n.auth,new Rs(n),n.bypassAuthState)}function Df(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),uf(t,new Rs(n),n.bypassAuthState)}async function Nf(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),lf(t,new Rs(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:c,type:u}=e;if(c){this.reject(c);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return kf;case"linkViaPopup":case"linkViaRedirect":return Nf;case"reauthViaPopup":case"reauthViaRedirect":return Df;default:Qe(this.auth,"internal-error")}}resolve(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=new Un(2e3,1e4);class Ft extends nl{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Ft.currentPopupAction&&Ft.currentPopupAction.cancel(),Ft.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){Je(this.filter.length===1,"Popup operations only handle one event");const e=As();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Me(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Me(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ft.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Me(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Vf.get())};e()}}Ft.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of="pendingRedirect",Tr=new Map;class Mf extends nl{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Tr.get(this.auth._key());if(!e){try{const r=await Lf(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Tr.set(this.auth._key(),e)}return this.bypassAuthState||Tr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Lf(n,e){const t=Ff(e),r=Uf(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function xf(n,e){Tr.set(n._key(),e)}function Uf(n){return qe(n._redirectPersistence)}function Ff(n){return Er(Of,n.config.apiKey,n.name)}async function Bf(n,e,t=!1){if(be(n.app))return Promise.reject(Et(n));const r=Is(n),i=Cf(r,e),c=await new Mf(r,i,t).execute();return c&&!t&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf=600*1e3;class $f{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!qf(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!rl(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Me(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=jf&&this.cachedEventUids.clear(),this.cachedEventUids.has(ya(e))}saveEventToCache(e){this.cachedEventUids.add(ya(e)),this.lastProcessedEventTime=Date.now()}}function ya(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function rl({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function qf(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rl(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hf(n,e={}){return en(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Gf=/^https?/;async function Wf(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Hf(n);for(const t of e)try{if(Kf(t))return}catch{}Qe(n,"unauthorized-domain")}function Kf(n){const e=Ki(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const c=new URL(n);return c.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&c.hostname===r}if(!Gf.test(t))return!1;if(zf.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf=new Un(3e4,6e4);function va(){const n=Le().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Jf(n){return new Promise((e,t)=>{var r,i,o;function c(){va(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{va(),t(Me(n,"network-request-failed"))},timeout:Qf.get()})}if(!((i=(r=Le().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=Le().gapi)===null||o===void 0)&&o.load)c();else{const u=tf("iframefcb");return Le()[u]=()=>{gapi.load?c():t(Me(n,"network-request-failed"))},Zd(`${ef()}?onload=${u}`).catch(h=>t(h))}}).catch(e=>{throw Ir=null,e})}let Ir=null;function Xf(n){return Ir=Ir||Jf(n),Ir}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf=new Un(5e3,15e3),Zf="__/auth/iframe",ep="emulator/auth/iframe",tp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},np=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function rp(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ys(e,ep):`https://${n.config.authDomain}/${Zf}`,r={apiKey:e.apiKey,appName:n.name,v:Zt},i=np.get(n.config.apiHost);i&&(r.eid=i);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${xn(r).slice(1)}`}async function ip(n){const e=await Xf(n),t=Le().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:rp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:tp,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const c=Me(n,"network-request-failed"),u=Le().setTimeout(()=>{o(c)},Yf.get());function h(){Le().clearTimeout(u),i(r)}r.ping(h).then(h,()=>{o(c)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},op=500,ap=600,cp="_blank",lp="http://localhost";class Ea{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function up(n,e,t,r=op,i=ap){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h=Object.assign(Object.assign({},sp),{width:r.toString(),height:i.toString(),top:o,left:c}),f=ye().toLowerCase();t&&(u=xc(f)?cp:t),Mc(f)&&(e=e||lp,h.scrollbars="yes");const _=Object.entries(h).reduce((A,[C,k])=>`${A}${C}=${k},`,"");if(zd(f)&&u!=="_self")return hp(e||"",u),new Ea(null);const w=window.open(e||"",u,_);M(w,n,"popup-blocked");try{w.focus()}catch{}return new Ea(w)}function hp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp="__/auth/handler",fp="emulator/auth/handler",pp=encodeURIComponent("fac");async function Ta(n,e,t,r,i,o){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const c={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Zt,eventId:i};if(e instanceof Gc){e.setDefaultLanguage(n.languageCode),c.providerId=e.providerId||"",ph(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[_,w]of Object.entries({}))c[_]=w}if(e instanceof Fn){const _=e.getScopes().filter(w=>w!=="");_.length>0&&(c.scopes=_.join(","))}n.tenantId&&(c.tid=n.tenantId);const u=c;for(const _ of Object.keys(u))u[_]===void 0&&delete u[_];const h=await n._getAppCheckToken(),f=h?`#${pp}=${encodeURIComponent(h)}`:"";return`${mp(n)}?${xn(u).slice(1)}${f}`}function mp({config:n}){return n.emulator?ys(n,fp):`https://${n.authDomain}/${dp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fi="webStorageSupport";class gp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xc,this._completeRedirectFn=Bf,this._overrideRedirectResult=xf}async _openPopup(e,t,r,i){var o;Je((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const c=await Ta(e,t,r,Ki(),i);return up(e,c,As())}async _openRedirect(e,t,r,i){await this._originValidation(e);const o=await Ta(e,t,r,Ki(),i);return vf(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):(Je(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await ip(e),r=new $f(e);return t.register("authEvent",i=>(M(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Fi,{type:Fi},i=>{var o;const c=(o=i?.[0])===null||o===void 0?void 0:o[Fi];c!==void 0&&t(!!c),Qe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Wf(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return $c()||Lc()||Ts()}}const _p=gp;var Ia="@firebase/auth",wa="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Ep(n){wt(new lt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:u}=r.options;M(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:c,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qc(n)},f=new Xd(r,i,o,h);return rf(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),wt(new lt("auth-internal",e=>{const t=Is(e.getProvider("auth").getImmediate());return(r=>new yp(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Oe(Ia,wa,vp(n)),Oe(Ia,wa,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=300,Ip=Ic("authIdTokenMaxAge")||Tp;let Aa=null;const wp=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ip)return;const i=t?.token;Aa!==i&&(Aa=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function R_(n=ms()){const e=Kr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=nf(n,{popupRedirectResolver:_p,persistence:[bf,gf,Xc]}),r=Ic("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const c=wp(o.toString());ff(t,c,()=>c(t.currentUser)),df(t,u=>c(u))}}const i=vc("auth");return i&&sf(t,`http://${i}`),t}function Ap(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Yd({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const o=Me("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",Ap().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Ep("Browser");var Ra=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ss;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function g(){}g.prototype=p.prototype,E.D=p.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(y,v,I){for(var m=Array(arguments.length-2),Fe=2;Fe<arguments.length;Fe++)m[Fe-2]=arguments[Fe];return p.prototype[v].apply(y,m)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,p,g){g||(g=0);var y=Array(16);if(typeof p=="string")for(var v=0;16>v;++v)y[v]=p.charCodeAt(g++)|p.charCodeAt(g++)<<8|p.charCodeAt(g++)<<16|p.charCodeAt(g++)<<24;else for(v=0;16>v;++v)y[v]=p[g++]|p[g++]<<8|p[g++]<<16|p[g++]<<24;p=E.g[0],g=E.g[1],v=E.g[2];var I=E.g[3],m=p+(I^g&(v^I))+y[0]+3614090360&4294967295;p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[1]+3905402710&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[2]+606105819&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[3]+3250441966&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(I^g&(v^I))+y[4]+4118548399&4294967295,p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[5]+1200080426&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[6]+2821735955&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[7]+4249261313&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(I^g&(v^I))+y[8]+1770035416&4294967295,p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[9]+2336552879&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[10]+4294925233&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[11]+2304563134&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(I^g&(v^I))+y[12]+1804603682&4294967295,p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[13]+4254626195&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[14]+2792965006&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[15]+1236535329&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(v^I&(g^v))+y[1]+4129170786&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[6]+3225465664&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[11]+643717713&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[0]+3921069994&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(g^v))+y[5]+3593408605&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[10]+38016083&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[15]+3634488961&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[4]+3889429448&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(g^v))+y[9]+568446438&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[14]+3275163606&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[3]+4107603335&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[8]+1163531501&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(g^v))+y[13]+2850285829&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[2]+4243563512&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[7]+1735328473&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[12]+2368359562&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(g^v^I)+y[5]+4294588738&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[8]+2272392833&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[11]+1839030562&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[14]+4259657740&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(g^v^I)+y[1]+2763975236&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[4]+1272893353&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[7]+4139469664&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[10]+3200236656&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(g^v^I)+y[13]+681279174&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[0]+3936430074&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[3]+3572445317&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[6]+76029189&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(g^v^I)+y[9]+3654602809&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[12]+3873151461&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[15]+530742520&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[2]+3299628645&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(v^(g|~I))+y[0]+4096336452&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[7]+1126891415&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[14]+2878612391&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[5]+4237533241&4294967295,g=v+(m<<21&4294967295|m>>>11),m=p+(v^(g|~I))+y[12]+1700485571&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[3]+2399980690&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[10]+4293915773&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[1]+2240044497&4294967295,g=v+(m<<21&4294967295|m>>>11),m=p+(v^(g|~I))+y[8]+1873313359&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[15]+4264355552&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[6]+2734768916&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[13]+1309151649&4294967295,g=v+(m<<21&4294967295|m>>>11),m=p+(v^(g|~I))+y[4]+4149444226&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[11]+3174756917&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[2]+718787259&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(v+(m<<21&4294967295|m>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+I&4294967295}r.prototype.u=function(E,p){p===void 0&&(p=E.length);for(var g=p-this.blockSize,y=this.B,v=this.h,I=0;I<p;){if(v==0)for(;I<=g;)i(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<p;)if(y[v++]=E.charCodeAt(I++),v==this.blockSize){i(this,y),v=0;break}}else for(;I<p;)if(y[v++]=E[I++],v==this.blockSize){i(this,y),v=0;break}}this.h=v,this.o+=p},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;var g=8*this.o;for(p=E.length-8;p<E.length;++p)E[p]=g&255,g/=256;for(this.u(E),E=Array(16),p=g=0;4>p;++p)for(var y=0;32>y;y+=8)E[g++]=this.g[p]>>>y&255;return E};function o(E,p){var g=u;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=p(E)}function c(E,p){this.h=p;for(var g=[],y=!0,v=E.length-1;0<=v;v--){var I=E[v]|0;y&&I==p||(g[v]=I,y=!1)}this.g=g}var u={};function h(E){return-128<=E&&128>E?o(E,function(p){return new c([p|0],0>p?-1:0)}):new c([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return w;if(0>E)return N(f(-E));for(var p=[],g=1,y=0;E>=g;y++)p[y]=E/g|0,g*=4294967296;return new c(p,0)}function _(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return N(_(E.substring(1),p));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=f(Math.pow(p,8)),y=w,v=0;v<E.length;v+=8){var I=Math.min(8,E.length-v),m=parseInt(E.substring(v,v+I),p);8>I?(I=f(Math.pow(p,I)),y=y.j(I).add(f(m))):(y=y.j(g),y=y.add(f(m)))}return y}var w=h(0),A=h(1),C=h(16777216);n=c.prototype,n.m=function(){if(O(this))return-N(this).m();for(var E=0,p=1,g=0;g<this.g.length;g++){var y=this.i(g);E+=(0<=y?y:4294967296+y)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(O(this))return"-"+N(this).toString(E);for(var p=f(Math.pow(E,6)),g=this,y="";;){var v=Y(g,p).g;g=H(g,v.j(p));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=v,k(g))return I+y;for(;6>I.length;)I="0"+I;y=I+y}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=H(this,E),O(E)?-1:k(E)?0:1};function N(E){for(var p=E.g.length,g=[],y=0;y<p;y++)g[y]=~E.g[y];return new c(g,~E.h).add(A)}n.abs=function(){return O(this)?N(this):this},n.add=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],y=0,v=0;v<=p;v++){var I=y+(this.i(v)&65535)+(E.i(v)&65535),m=(I>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);y=m>>>16,I&=65535,m&=65535,g[v]=m<<16|I}return new c(g,g[g.length-1]&-2147483648?-1:0)};function H(E,p){return E.add(N(p))}n.j=function(E){if(k(this)||k(E))return w;if(O(this))return O(E)?N(this).j(N(E)):N(N(this).j(E));if(O(E))return N(this.j(N(E)));if(0>this.l(C)&&0>E.l(C))return f(this.m()*E.m());for(var p=this.g.length+E.g.length,g=[],y=0;y<2*p;y++)g[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<E.g.length;v++){var I=this.i(y)>>>16,m=this.i(y)&65535,Fe=E.i(v)>>>16,nn=E.i(v)&65535;g[2*y+2*v]+=m*nn,F(g,2*y+2*v),g[2*y+2*v+1]+=I*nn,F(g,2*y+2*v+1),g[2*y+2*v+1]+=m*Fe,F(g,2*y+2*v+1),g[2*y+2*v+2]+=I*Fe,F(g,2*y+2*v+2)}for(y=0;y<p;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=p;y<2*p;y++)g[y]=0;return new c(g,0)};function F(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function q(E,p){this.g=E,this.h=p}function Y(E,p){if(k(p))throw Error("division by zero");if(k(E))return new q(w,w);if(O(E))return p=Y(N(E),p),new q(N(p.g),N(p.h));if(O(p))return p=Y(E,N(p)),new q(N(p.g),p.h);if(30<E.g.length){if(O(E)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var g=A,y=p;0>=y.l(E);)g=Ne(g),y=Ne(y);var v=ne(g,1),I=ne(y,1);for(y=ne(y,2),g=ne(g,2);!k(y);){var m=I.add(y);0>=m.l(E)&&(v=v.add(g),I=m),y=ne(y,1),g=ne(g,1)}return p=H(E,v.j(p)),new q(v,p)}for(v=w;0<=E.l(p);){for(g=Math.max(1,Math.floor(E.m()/p.m())),y=Math.ceil(Math.log(g)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),I=f(g),m=I.j(p);O(m)||0<m.l(E);)g-=y,I=f(g),m=I.j(p);k(I)&&(I=A),v=v.add(I),E=H(E,m)}return new q(v,E)}n.A=function(E){return Y(this,E).h},n.and=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],y=0;y<p;y++)g[y]=this.i(y)&E.i(y);return new c(g,this.h&E.h)},n.or=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],y=0;y<p;y++)g[y]=this.i(y)|E.i(y);return new c(g,this.h|E.h)},n.xor=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],y=0;y<p;y++)g[y]=this.i(y)^E.i(y);return new c(g,this.h^E.h)};function Ne(E){for(var p=E.g.length+1,g=[],y=0;y<p;y++)g[y]=E.i(y)<<1|E.i(y-1)>>>31;return new c(g,E.h)}function ne(E,p){var g=p>>5;p%=32;for(var y=E.g.length-g,v=[],I=0;I<y;I++)v[I]=0<p?E.i(I+g)>>>p|E.i(I+g+1)<<32-p:E.i(I+g);return new c(v,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=_,Ss=c}).apply(typeof Ra<"u"?Ra:typeof self<"u"?self:typeof window<"u"?window:{});var fr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var il,Tn,sl,wr,Xi,ol,al,cl;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,l){return s==Array.prototype||s==Object.prototype||(s[a]=l.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof fr=="object"&&fr];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function i(s,a){if(a)e:{var l=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var T=s[d];if(!(T in l))break e;l=l[T]}s=s[s.length-1],d=l[s],a=a(d),a!=d&&a!=null&&e(l,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var l=0,d=!1,T={next:function(){if(!d&&l<s.length){var R=l++;return{value:a(R,s[R]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},u=this||self;function h(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function f(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function _(s,a,l){return s.call.apply(s.bind,arguments)}function w(s,a,l){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),s.apply(a,T)}}return function(){return s.apply(a,arguments)}}function A(s,a,l){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?_:w,A.apply(null,arguments)}function C(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function k(s,a){function l(){}l.prototype=a.prototype,s.aa=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(d,T,R){for(var b=Array(arguments.length-2),z=2;z<arguments.length;z++)b[z-2]=arguments[z];return a.prototype[T].apply(d,b)}}function O(s){const a=s.length;if(0<a){const l=Array(a);for(let d=0;d<a;d++)l[d]=s[d];return l}return[]}function N(s,a){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const T=s.length||0,R=d.length||0;s.length=T+R;for(let b=0;b<R;b++)s[T+b]=d[b]}else s.push(d)}}class H{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function F(s){return/^[\s\xa0]*$/.test(s)}function q(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function Y(s){return Y[" "](s),s}Y[" "]=function(){};var Ne=q().indexOf("Gecko")!=-1&&!(q().toLowerCase().indexOf("webkit")!=-1&&q().indexOf("Edge")==-1)&&!(q().indexOf("Trident")!=-1||q().indexOf("MSIE")!=-1)&&q().indexOf("Edge")==-1;function ne(s,a,l){for(const d in s)a.call(l,s[d],d,s)}function E(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function p(s){const a={};for(const l in s)a[l]=s[l];return a}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,a){let l,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(l in d)s[l]=d[l];for(let R=0;R<g.length;R++)l=g[R],Object.prototype.hasOwnProperty.call(d,l)&&(s[l]=d[l])}}function v(s){var a=1;s=s.split(":");const l=[];for(;0<a&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function I(s){u.setTimeout(()=>{throw s},0)}function m(){var s=li;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class Fe{constructor(){this.h=this.g=null}add(a,l){const d=nn.get();d.set(a,l),this.h?this.h.next=d:this.g=d,this.h=d}}var nn=new H(()=>new lu,s=>s.reset());class lu{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let rn,sn=!1,li=new Fe,Js=()=>{const s=u.Promise.resolve(void 0);rn=()=>{s.then(uu)}};var uu=()=>{for(var s;s=m();){try{s.h.call(s.g)}catch(l){I(l)}var a=nn;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}sn=!1};function Ye(){this.s=this.s,this.C=this.C}Ye.prototype.s=!1,Ye.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ye.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ue(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}ue.prototype.h=function(){this.defaultPrevented=!0};var hu=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch{}return s})();function on(s,a){if(ue.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(Ne){e:{try{Y(a.nodeName);var T=!0;break e}catch{}T=!1}T||(a=null)}}else l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:du[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&on.aa.h.call(this)}}k(on,ue);var du={2:"touch",3:"pen",4:"mouse"};on.prototype.h=function(){on.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Wn="closure_listenable_"+(1e6*Math.random()|0),fu=0;function pu(s,a,l,d,T){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!d,this.ha=T,this.key=++fu,this.da=this.fa=!1}function Kn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Qn(s){this.src=s,this.g={},this.h=0}Qn.prototype.add=function(s,a,l,d,T){var R=s.toString();s=this.g[R],s||(s=this.g[R]=[],this.h++);var b=hi(s,a,d,T);return-1<b?(a=s[b],l||(a.fa=!1)):(a=new pu(a,this.src,R,!!d,T),a.fa=l,s.push(a)),a};function ui(s,a){var l=a.type;if(l in s.g){var d=s.g[l],T=Array.prototype.indexOf.call(d,a,void 0),R;(R=0<=T)&&Array.prototype.splice.call(d,T,1),R&&(Kn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function hi(s,a,l,d){for(var T=0;T<s.length;++T){var R=s[T];if(!R.da&&R.listener==a&&R.capture==!!l&&R.ha==d)return T}return-1}var di="closure_lm_"+(1e6*Math.random()|0),fi={};function Xs(s,a,l,d,T){if(Array.isArray(a)){for(var R=0;R<a.length;R++)Xs(s,a[R],l,d,T);return null}return l=eo(l),s&&s[Wn]?s.K(a,l,f(d)?!!d.capture:!1,T):mu(s,a,l,!1,d,T)}function mu(s,a,l,d,T,R){if(!a)throw Error("Invalid event type");var b=f(T)?!!T.capture:!!T,z=mi(s);if(z||(s[di]=z=new Qn(s)),l=z.add(a,l,d,b,R),l.proxy)return l;if(d=gu(),l.proxy=d,d.src=s,d.listener=l,s.addEventListener)hu||(T=b),T===void 0&&(T=!1),s.addEventListener(a.toString(),d,T);else if(s.attachEvent)s.attachEvent(Zs(a.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function gu(){function s(l){return a.call(s.src,s.listener,l)}const a=_u;return s}function Ys(s,a,l,d,T){if(Array.isArray(a))for(var R=0;R<a.length;R++)Ys(s,a[R],l,d,T);else d=f(d)?!!d.capture:!!d,l=eo(l),s&&s[Wn]?(s=s.i,a=String(a).toString(),a in s.g&&(R=s.g[a],l=hi(R,l,d,T),-1<l&&(Kn(R[l]),Array.prototype.splice.call(R,l,1),R.length==0&&(delete s.g[a],s.h--)))):s&&(s=mi(s))&&(a=s.g[a.toString()],s=-1,a&&(s=hi(a,l,d,T)),(l=-1<s?a[s]:null)&&pi(l))}function pi(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[Wn])ui(a.i,s);else{var l=s.type,d=s.proxy;a.removeEventListener?a.removeEventListener(l,d,s.capture):a.detachEvent?a.detachEvent(Zs(l),d):a.addListener&&a.removeListener&&a.removeListener(d),(l=mi(a))?(ui(l,s),l.h==0&&(l.src=null,a[di]=null)):Kn(s)}}}function Zs(s){return s in fi?fi[s]:fi[s]="on"+s}function _u(s,a){if(s.da)s=!0;else{a=new on(a,this);var l=s.listener,d=s.ha||s.src;s.fa&&pi(s),s=l.call(d,a)}return s}function mi(s){return s=s[di],s instanceof Qn?s:null}var gi="__closure_events_fn_"+(1e9*Math.random()>>>0);function eo(s){return typeof s=="function"?s:(s[gi]||(s[gi]=function(a){return s.handleEvent(a)}),s[gi])}function he(){Ye.call(this),this.i=new Qn(this),this.M=this,this.F=null}k(he,Ye),he.prototype[Wn]=!0,he.prototype.removeEventListener=function(s,a,l,d){Ys(this,s,a,l,d)};function ve(s,a){var l,d=s.F;if(d)for(l=[];d;d=d.F)l.push(d);if(s=s.M,d=a.type||a,typeof a=="string")a=new ue(a,s);else if(a instanceof ue)a.target=a.target||s;else{var T=a;a=new ue(d,s),y(a,T)}if(T=!0,l)for(var R=l.length-1;0<=R;R--){var b=a.g=l[R];T=Jn(b,d,!0,a)&&T}if(b=a.g=s,T=Jn(b,d,!0,a)&&T,T=Jn(b,d,!1,a)&&T,l)for(R=0;R<l.length;R++)b=a.g=l[R],T=Jn(b,d,!1,a)&&T}he.prototype.N=function(){if(he.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var l=s.g[a],d=0;d<l.length;d++)Kn(l[d]);delete s.g[a],s.h--}}this.F=null},he.prototype.K=function(s,a,l,d){return this.i.add(String(s),a,!1,l,d)},he.prototype.L=function(s,a,l,d){return this.i.add(String(s),a,!0,l,d)};function Jn(s,a,l,d){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var T=!0,R=0;R<a.length;++R){var b=a[R];if(b&&!b.da&&b.capture==l){var z=b.listener,se=b.ha||b.src;b.fa&&ui(s.i,b),T=z.call(se,d)!==!1&&T}}return T&&!d.defaultPrevented}function to(s,a,l){if(typeof s=="function")l&&(s=A(s,l));else if(s&&typeof s.handleEvent=="function")s=A(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(s,a||0)}function no(s){s.g=to(()=>{s.g=null,s.i&&(s.i=!1,no(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class yu extends Ye{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:no(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function an(s){Ye.call(this),this.h=s,this.g={}}k(an,Ye);var ro=[];function io(s){ne(s.g,function(a,l){this.g.hasOwnProperty(l)&&pi(a)},s),s.g={}}an.prototype.N=function(){an.aa.N.call(this),io(this)},an.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _i=u.JSON.stringify,vu=u.JSON.parse,Eu=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function yi(){}yi.prototype.h=null;function so(s){return s.h||(s.h=s.i())}function oo(){}var cn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function vi(){ue.call(this,"d")}k(vi,ue);function Ei(){ue.call(this,"c")}k(Ei,ue);var pt={},ao=null;function Xn(){return ao=ao||new he}pt.La="serverreachability";function co(s){ue.call(this,pt.La,s)}k(co,ue);function ln(s){const a=Xn();ve(a,new co(a))}pt.STAT_EVENT="statevent";function lo(s,a){ue.call(this,pt.STAT_EVENT,s),this.stat=a}k(lo,ue);function Ee(s){const a=Xn();ve(a,new lo(a,s))}pt.Ma="timingevent";function uo(s,a){ue.call(this,pt.Ma,s),this.size=a}k(uo,ue);function un(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},a)}function hn(){this.g=!0}hn.prototype.xa=function(){this.g=!1};function Tu(s,a,l,d,T,R){s.info(function(){if(s.g)if(R)for(var b="",z=R.split("&"),se=0;se<z.length;se++){var $=z[se].split("=");if(1<$.length){var de=$[0];$=$[1];var fe=de.split("_");b=2<=fe.length&&fe[1]=="type"?b+(de+"="+$+"&"):b+(de+"=redacted&")}}else b=null;else b=R;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+a+`
`+l+`
`+b})}function Iu(s,a,l,d,T,R,b){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+a+`
`+l+`
`+R+" "+b})}function Vt(s,a,l,d){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+Au(s,l)+(d?" "+d:"")})}function wu(s,a){s.info(function(){return"TIMEOUT: "+a})}hn.prototype.info=function(){};function Au(s,a){if(!s.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var d=l[s];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var R=T[0];if(R!="noop"&&R!="stop"&&R!="close")for(var b=1;b<T.length;b++)T[b]=""}}}}return _i(l)}catch{return a}}var Yn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ho={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ti;function Zn(){}k(Zn,yi),Zn.prototype.g=function(){return new XMLHttpRequest},Zn.prototype.i=function(){return{}},Ti=new Zn;function Ze(s,a,l,d){this.j=s,this.i=a,this.l=l,this.R=d||1,this.U=new an(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new fo}function fo(){this.i=null,this.g="",this.h=!1}var po={},Ii={};function wi(s,a,l){s.L=1,s.v=rr(Be(a)),s.m=l,s.P=!0,mo(s,null)}function mo(s,a){s.F=Date.now(),er(s),s.A=Be(s.v);var l=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Co(l.i,"t",d),s.C=0,l=s.j.J,s.h=new fo,s.g=Wo(s.j,l?a:null,!s.m),0<s.O&&(s.M=new yu(A(s.Y,s,s.g),s.O)),a=s.U,l=s.g,d=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(ro[0]=T.toString()),T=ro);for(var R=0;R<T.length;R++){var b=Xs(l,T[R],d||a.handleEvent,!1,a.h||a);if(!b)break;a.g[b.key]=b}a=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),ln(),Tu(s.i,s.u,s.A,s.l,s.R,s.m)}Ze.prototype.ca=function(s){s=s.target;const a=this.M;a&&je(s)==3?a.j():this.Y(s)},Ze.prototype.Y=function(s){try{if(s==this.g)e:{const fe=je(this.g);var a=this.g.Ba();const Lt=this.g.Z();if(!(3>fe)&&(fe!=3||this.g&&(this.h.h||this.g.oa()||Lo(this.g)))){this.J||fe!=4||a==7||(a==8||0>=Lt?ln(3):ln(2)),Ai(this);var l=this.g.Z();this.X=l;t:if(go(this)){var d=Lo(this.g);s="";var T=d.length,R=je(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){mt(this),dn(this);var b="";break t}this.h.i=new u.TextDecoder}for(a=0;a<T;a++)this.h.h=!0,s+=this.h.i.decode(d[a],{stream:!(R&&a==T-1)});d.length=0,this.h.g+=s,this.C=0,b=this.h.g}else b=this.g.oa();if(this.o=l==200,Iu(this.i,this.u,this.A,this.l,this.R,fe,l),this.o){if(this.T&&!this.K){t:{if(this.g){var z,se=this.g;if((z=se.g?se.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(z)){var $=z;break t}}$=null}if(l=$)Vt(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ri(this,l);else{this.o=!1,this.s=3,Ee(12),mt(this),dn(this);break e}}if(this.P){l=!0;let Se;for(;!this.J&&this.C<b.length;)if(Se=Ru(this,b),Se==Ii){fe==4&&(this.s=4,Ee(14),l=!1),Vt(this.i,this.l,null,"[Incomplete Response]");break}else if(Se==po){this.s=4,Ee(15),Vt(this.i,this.l,b,"[Invalid Chunk]"),l=!1;break}else Vt(this.i,this.l,Se,null),Ri(this,Se);if(go(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),fe!=4||b.length!=0||this.h.h||(this.s=1,Ee(16),l=!1),this.o=this.o&&l,!l)Vt(this.i,this.l,b,"[Invalid Chunked Response]"),mt(this),dn(this);else if(0<b.length&&!this.W){this.W=!0;var de=this.j;de.g==this&&de.ba&&!de.M&&(de.j.info("Great, no buffering proxy detected. Bytes received: "+b.length),Di(de),de.M=!0,Ee(11))}}else Vt(this.i,this.l,b,null),Ri(this,b);fe==4&&mt(this),this.o&&!this.J&&(fe==4?qo(this.j,this):(this.o=!1,er(this)))}else $u(this.g),l==400&&0<b.indexOf("Unknown SID")?(this.s=3,Ee(12)):(this.s=0,Ee(13)),mt(this),dn(this)}}}catch{}finally{}};function go(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Ru(s,a){var l=s.C,d=a.indexOf(`
`,l);return d==-1?Ii:(l=Number(a.substring(l,d)),isNaN(l)?po:(d+=1,d+l>a.length?Ii:(a=a.slice(d,d+l),s.C=d+l,a)))}Ze.prototype.cancel=function(){this.J=!0,mt(this)};function er(s){s.S=Date.now()+s.I,_o(s,s.I)}function _o(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=un(A(s.ba,s),a)}function Ai(s){s.B&&(u.clearTimeout(s.B),s.B=null)}Ze.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(wu(this.i,this.A),this.L!=2&&(ln(),Ee(17)),mt(this),this.s=2,dn(this)):_o(this,this.S-s)};function dn(s){s.j.G==0||s.J||qo(s.j,s)}function mt(s){Ai(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,io(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function Ri(s,a){try{var l=s.j;if(l.G!=0&&(l.g==s||Si(l.h,s))){if(!s.K&&Si(l.h,s)&&l.G==3){try{var d=l.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)lr(l),ar(l);else break e;ki(l),Ee(18)}}else l.za=T[1],0<l.za-l.T&&37500>T[2]&&l.F&&l.v==0&&!l.C&&(l.C=un(A(l.Za,l),6e3));if(1>=Eo(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else _t(l,11)}else if((s.K||l.g==s)&&lr(l),!F(a))for(T=l.Da.g.parse(a),a=0;a<T.length;a++){let $=T[a];if(l.T=$[0],$=$[1],l.G==2)if($[0]=="c"){l.K=$[1],l.ia=$[2];const de=$[3];de!=null&&(l.la=de,l.j.info("VER="+l.la));const fe=$[4];fe!=null&&(l.Aa=fe,l.j.info("SVER="+l.Aa));const Lt=$[5];Lt!=null&&typeof Lt=="number"&&0<Lt&&(d=1.5*Lt,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const Se=s.g;if(Se){const hr=Se.g?Se.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(hr){var R=d.h;R.g||hr.indexOf("spdy")==-1&&hr.indexOf("quic")==-1&&hr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Pi(R,R.h),R.h=null))}if(d.D){const Ni=Se.g?Se.g.getResponseHeader("X-HTTP-Session-Id"):null;Ni&&(d.ya=Ni,W(d.I,d.D,Ni))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var b=s;if(d.qa=Go(d,d.J?d.ia:null,d.W),b.K){To(d.h,b);var z=b,se=d.L;se&&(z.I=se),z.B&&(Ai(z),er(z)),d.g=b}else jo(d);0<l.i.length&&cr(l)}else $[0]!="stop"&&$[0]!="close"||_t(l,7);else l.G==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?_t(l,7):Ci(l):$[0]!="noop"&&l.l&&l.l.ta($),l.v=0)}}ln(4)}catch{}}var Su=class{constructor(s,a){this.g=s,this.map=a}};function yo(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function vo(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Eo(s){return s.h?1:s.g?s.g.size:0}function Si(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Pi(s,a){s.g?s.g.add(a):s.h=a}function To(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}yo.prototype.cancel=function(){if(this.i=Io(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Io(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.D);return a}return O(s.i)}function Pu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var a=[],l=s.length,d=0;d<l;d++)a.push(s[d]);return a}a=[],l=0;for(d in s)a[l++]=s[d];return a}function bu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var a=[];s=s.length;for(var l=0;l<s;l++)a.push(l);return a}a=[],l=0;for(const d in s)a[l++]=d;return a}}}function wo(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var l=bu(s),d=Pu(s),T=d.length,R=0;R<T;R++)a.call(void 0,d[R],l&&l[R],s)}var Ao=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cu(s,a){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var d=s[l].indexOf("="),T=null;if(0<=d){var R=s[l].substring(0,d);T=s[l].substring(d+1)}else R=s[l];a(R,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function gt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof gt){this.h=s.h,tr(this,s.j),this.o=s.o,this.g=s.g,nr(this,s.s),this.l=s.l;var a=s.i,l=new mn;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),Ro(this,l),this.m=s.m}else s&&(a=String(s).match(Ao))?(this.h=!1,tr(this,a[1]||"",!0),this.o=fn(a[2]||""),this.g=fn(a[3]||"",!0),nr(this,a[4]),this.l=fn(a[5]||"",!0),Ro(this,a[6]||"",!0),this.m=fn(a[7]||"")):(this.h=!1,this.i=new mn(null,this.h))}gt.prototype.toString=function(){var s=[],a=this.j;a&&s.push(pn(a,So,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(pn(a,So,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(pn(l,l.charAt(0)=="/"?Nu:Du,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",pn(l,Ou)),s.join("")};function Be(s){return new gt(s)}function tr(s,a,l){s.j=l?fn(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function nr(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function Ro(s,a,l){a instanceof mn?(s.i=a,Mu(s.i,s.h)):(l||(a=pn(a,Vu)),s.i=new mn(a,s.h))}function W(s,a,l){s.i.set(a,l)}function rr(s){return W(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function fn(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function pn(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,ku),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function ku(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var So=/[#\/\?@]/g,Du=/[#\?:]/g,Nu=/[#\?]/g,Vu=/[#\?@]/g,Ou=/#/g;function mn(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function et(s){s.g||(s.g=new Map,s.h=0,s.i&&Cu(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}n=mn.prototype,n.add=function(s,a){et(this),this.i=null,s=Ot(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function Po(s,a){et(s),a=Ot(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function bo(s,a){return et(s),a=Ot(s,a),s.g.has(a)}n.forEach=function(s,a){et(this),this.g.forEach(function(l,d){l.forEach(function(T){s.call(a,T,d,this)},this)},this)},n.na=function(){et(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let d=0;d<a.length;d++){const T=s[d];for(let R=0;R<T.length;R++)l.push(a[d])}return l},n.V=function(s){et(this);let a=[];if(typeof s=="string")bo(this,s)&&(a=a.concat(this.g.get(Ot(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)a=a.concat(s[l])}return a},n.set=function(s,a){return et(this),this.i=null,s=Ot(this,s),bo(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},n.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function Co(s,a,l){Po(s,a),0<l.length&&(s.i=null,s.g.set(Ot(s,a),O(l)),s.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var d=a[l];const R=encodeURIComponent(String(d)),b=this.V(d);for(d=0;d<b.length;d++){var T=R;b[d]!==""&&(T+="="+encodeURIComponent(String(b[d]))),s.push(T)}}return this.i=s.join("&")};function Ot(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function Mu(s,a){a&&!s.j&&(et(s),s.i=null,s.g.forEach(function(l,d){var T=d.toLowerCase();d!=T&&(Po(this,d),Co(this,T,l))},s)),s.j=a}function Lu(s,a){const l=new hn;if(u.Image){const d=new Image;d.onload=C(tt,l,"TestLoadImage: loaded",!0,a,d),d.onerror=C(tt,l,"TestLoadImage: error",!1,a,d),d.onabort=C(tt,l,"TestLoadImage: abort",!1,a,d),d.ontimeout=C(tt,l,"TestLoadImage: timeout",!1,a,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else a(!1)}function xu(s,a){const l=new hn,d=new AbortController,T=setTimeout(()=>{d.abort(),tt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:d.signal}).then(R=>{clearTimeout(T),R.ok?tt(l,"TestPingServer: ok",!0,a):tt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(T),tt(l,"TestPingServer: error",!1,a)})}function tt(s,a,l,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(l)}catch{}}function Uu(){this.g=new Eu}function Fu(s,a,l){const d=l||"";try{wo(s,function(T,R){let b=T;f(T)&&(b=_i(T)),a.push(d+R+"="+encodeURIComponent(b))})}catch(T){throw a.push(d+"type="+encodeURIComponent("_badmap")),T}}function ir(s){this.l=s.Ub||null,this.j=s.eb||!1}k(ir,yi),ir.prototype.g=function(){return new sr(this.l,this.j)},ir.prototype.i=(function(s){return function(){return s}})({});function sr(s,a){he.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(sr,he),n=sr.prototype,n.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,_n(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,gn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,_n(this)),this.g&&(this.readyState=3,_n(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ko(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function ko(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?gn(this):_n(this),this.readyState==3&&ko(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,gn(this))},n.Qa=function(s){this.g&&(this.response=s,gn(this))},n.ga=function(){this.g&&gn(this)};function gn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,_n(s)}n.setRequestHeader=function(s,a){this.u.append(s,a)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function _n(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(sr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Do(s){let a="";return ne(s,function(l,d){a+=d,a+=":",a+=l,a+=`\r
`}),a}function bi(s,a,l){e:{for(d in l){var d=!1;break e}d=!0}d||(l=Do(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):W(s,a,l))}function J(s){he.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(J,he);var Bu=/^https?$/i,ju=["POST","PUT"];n=J.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,a,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ti.g(),this.v=this.o?so(this.o):so(Ti),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(R){No(this,R);return}if(s=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)l.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())l.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(R=>R.toLowerCase()=="content-type"),T=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(ju,a,void 0))||d||T||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,b]of l)this.g.setRequestHeader(R,b);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Mo(this),this.u=!0,this.g.send(s),this.u=!1}catch(R){No(this,R)}};function No(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,Vo(s),or(s)}function Vo(s){s.A||(s.A=!0,ve(s,"complete"),ve(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,ve(this,"complete"),ve(this,"abort"),or(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),or(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Oo(this):this.bb())},n.bb=function(){Oo(this)};function Oo(s){if(s.h&&typeof c<"u"&&(!s.v[1]||je(s)!=4||s.Z()!=2)){if(s.u&&je(s)==4)to(s.Ea,0,s);else if(ve(s,"readystatechange"),je(s)==4){s.h=!1;try{const b=s.Z();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var d;if(d=b===0){var T=String(s.D).match(Ao)[1]||null;!T&&u.self&&u.self.location&&(T=u.self.location.protocol.slice(0,-1)),d=!Bu.test(T?T.toLowerCase():"")}l=d}if(l)ve(s,"complete"),ve(s,"success");else{s.m=6;try{var R=2<je(s)?s.g.statusText:""}catch{R=""}s.l=R+" ["+s.Z()+"]",Vo(s)}}finally{or(s)}}}}function or(s,a){if(s.g){Mo(s);const l=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||ve(s,"ready");try{l.onreadystatechange=d}catch{}}}function Mo(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function je(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<je(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),vu(a)}};function Lo(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function $u(s){const a={};s=(s.g&&2<=je(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(F(s[d]))continue;var l=v(s[d]);const T=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const R=a[T]||[];a[T]=R,R.push(l)}E(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function yn(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function xo(s){this.Aa=0,this.i=[],this.j=new hn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=yn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=yn("baseRetryDelayMs",5e3,s),this.cb=yn("retryDelaySeedMs",1e4,s),this.Wa=yn("forwardChannelMaxRetries",2,s),this.wa=yn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new yo(s&&s.concurrentRequestLimit),this.Da=new Uu,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=xo.prototype,n.la=8,n.G=1,n.connect=function(s,a,l,d){Ee(0),this.W=s,this.H=a||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=Go(this,null,this.W),cr(this)};function Ci(s){if(Uo(s),s.G==3){var a=s.U++,l=Be(s.I);if(W(l,"SID",s.K),W(l,"RID",a),W(l,"TYPE","terminate"),vn(s,l),a=new Ze(s,s.j,a),a.L=2,a.v=rr(Be(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=a.v,l=!0),l||(a.g=Wo(a.j,null),a.g.ea(a.v)),a.F=Date.now(),er(a)}zo(s)}function ar(s){s.g&&(Di(s),s.g.cancel(),s.g=null)}function Uo(s){ar(s),s.u&&(u.clearTimeout(s.u),s.u=null),lr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function cr(s){if(!vo(s.h)&&!s.s){s.s=!0;var a=s.Ga;rn||Js(),sn||(rn(),sn=!0),li.add(a,s),s.B=0}}function qu(s,a){return Eo(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=un(A(s.Ga,s,a),Ho(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new Ze(this,this.j,s);let R=this.o;if(this.S&&(R?(R=p(R),y(R,this.S)):R=this.S),this.m!==null||this.O||(T.H=R,R=null),this.P)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=Bo(this,T,a),l=Be(this.I),W(l,"RID",s),W(l,"CVER",22),this.D&&W(l,"X-HTTP-Session-Id",this.D),vn(this,l),R&&(this.O?a="headers="+encodeURIComponent(String(Do(R)))+"&"+a:this.m&&bi(l,this.m,R)),Pi(this.h,T),this.Ua&&W(l,"TYPE","init"),this.P?(W(l,"$req",a),W(l,"SID","null"),T.T=!0,wi(T,l,null)):wi(T,l,a),this.G=2}}else this.G==3&&(s?Fo(this,s):this.i.length==0||vo(this.h)||Fo(this))};function Fo(s,a){var l;a?l=a.l:l=s.U++;const d=Be(s.I);W(d,"SID",s.K),W(d,"RID",l),W(d,"AID",s.T),vn(s,d),s.m&&s.o&&bi(d,s.m,s.o),l=new Ze(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),a&&(s.i=a.D.concat(s.i)),a=Bo(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Pi(s.h,l),wi(l,d,a)}function vn(s,a){s.H&&ne(s.H,function(l,d){W(a,d,l)}),s.l&&wo({},function(l,d){W(a,d,l)})}function Bo(s,a,l){l=Math.min(s.i.length,l);var d=s.l?A(s.l.Na,s.l,s):null;e:{var T=s.i;let R=-1;for(;;){const b=["count="+l];R==-1?0<l?(R=T[0].g,b.push("ofs="+R)):R=0:b.push("ofs="+R);let z=!0;for(let se=0;se<l;se++){let $=T[se].g;const de=T[se].map;if($-=R,0>$)R=Math.max(0,T[se].g-100),z=!1;else try{Fu(de,b,"req"+$+"_")}catch{d&&d(de)}}if(z){d=b.join("&");break e}}}return s=s.i.splice(0,l),a.D=s,d}function jo(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;rn||Js(),sn||(rn(),sn=!0),li.add(a,s),s.v=0}}function ki(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=un(A(s.Fa,s),Ho(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,$o(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=un(A(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ee(10),ar(this),$o(this))};function Di(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function $o(s){s.g=new Ze(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=Be(s.qa);W(a,"RID","rpc"),W(a,"SID",s.K),W(a,"AID",s.T),W(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&W(a,"TO",s.ja),W(a,"TYPE","xmlhttp"),vn(s,a),s.m&&s.o&&bi(a,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=rr(Be(a)),l.m=null,l.P=!0,mo(l,s)}n.Za=function(){this.C!=null&&(this.C=null,ar(this),ki(this),Ee(19))};function lr(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function qo(s,a){var l=null;if(s.g==a){lr(s),Di(s),s.g=null;var d=2}else if(Si(s.h,a))l=a.D,To(s.h,a),d=1;else return;if(s.G!=0){if(a.o)if(d==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var T=s.B;d=Xn(),ve(d,new uo(d,l)),cr(s)}else jo(s);else if(T=a.s,T==3||T==0&&0<a.X||!(d==1&&qu(s,a)||d==2&&ki(s)))switch(l&&0<l.length&&(a=s.h,a.i=a.i.concat(l)),T){case 1:_t(s,5);break;case 4:_t(s,10);break;case 3:_t(s,6);break;default:_t(s,2)}}}function Ho(s,a){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*a}function _t(s,a){if(s.j.info("Error code "+a),a==2){var l=A(s.fb,s),d=s.Xa;const T=!d;d=new gt(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||tr(d,"https"),rr(d),T?Lu(d.toString(),l):xu(d.toString(),l)}else Ee(2);s.G=0,s.l&&s.l.sa(a),zo(s),Uo(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Ee(2)):(this.j.info("Failed to ping google.com"),Ee(1))};function zo(s){if(s.G=0,s.ka=[],s.l){const a=Io(s.h);(a.length!=0||s.i.length!=0)&&(N(s.ka,a),N(s.ka,s.i),s.h.i.length=0,O(s.i),s.i.length=0),s.l.ra()}}function Go(s,a,l){var d=l instanceof gt?Be(l):new gt(l);if(d.g!="")a&&(d.g=a+"."+d.g),nr(d,d.s);else{var T=u.location;d=T.protocol,a=a?a+"."+T.hostname:T.hostname,T=+T.port;var R=new gt(null);d&&tr(R,d),a&&(R.g=a),T&&nr(R,T),l&&(R.l=l),d=R}return l=s.D,a=s.ya,l&&a&&W(d,l,a),W(d,"VER",s.la),vn(s,d),d}function Wo(s,a,l){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new J(new ir({eb:l})):new J(s.pa),a.Ha(s.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ko(){}n=Ko.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ur(){}ur.prototype.g=function(s,a){return new Ae(s,a)};function Ae(s,a){he.call(this),this.g=new xo(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!F(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!F(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new Mt(this)}k(Ae,he),Ae.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ae.prototype.close=function(){Ci(this.g)},Ae.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=_i(s),s=l);a.i.push(new Su(a.Ya++,s)),a.G==3&&cr(a)},Ae.prototype.N=function(){this.g.l=null,delete this.j,Ci(this.g),delete this.g,Ae.aa.N.call(this)};function Qo(s){vi.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){e:{for(const l in a){s=l;break e}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}k(Qo,vi);function Jo(){Ei.call(this),this.status=1}k(Jo,Ei);function Mt(s){this.g=s}k(Mt,Ko),Mt.prototype.ua=function(){ve(this.g,"a")},Mt.prototype.ta=function(s){ve(this.g,new Qo(s))},Mt.prototype.sa=function(s){ve(this.g,new Jo)},Mt.prototype.ra=function(){ve(this.g,"b")},ur.prototype.createWebChannel=ur.prototype.g,Ae.prototype.send=Ae.prototype.o,Ae.prototype.open=Ae.prototype.m,Ae.prototype.close=Ae.prototype.close,cl=function(){return new ur},al=function(){return Xn()},ol=pt,Xi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Yn.NO_ERROR=0,Yn.TIMEOUT=8,Yn.HTTP_ERROR=6,wr=Yn,ho.COMPLETE="complete",sl=ho,oo.EventType=cn,cn.OPEN="a",cn.CLOSE="b",cn.ERROR="c",cn.MESSAGE="d",he.prototype.listen=he.prototype.K,Tn=oo,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha,il=J}).apply(typeof fr<"u"?fr:typeof self<"u"?self:typeof window<"u"?window:{});const Sa="@firebase/firestore",Pa="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}me.UNAUTHENTICATED=new me(null),me.GOOGLE_CREDENTIALS=new me("google-credentials-uid"),me.FIRST_PARTY=new me("first-party-uid"),me.MOCK_USER=new me("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new fs("@firebase/firestore");function xt(){return Rt.logLevel}function D(n,...e){if(Rt.logLevel<=U.DEBUG){const t=e.map(Ps);Rt.debug(`Firestore (${tn}): ${n}`,...t)}}function St(n,...e){if(Rt.logLevel<=U.ERROR){const t=e.map(Ps);Rt.error(`Firestore (${tn}): ${n}`,...t)}}function Gt(n,...e){if(Rt.logLevel<=U.WARN){const t=e.map(Ps);Rt.warn(`Firestore (${tn}): ${n}`,...t)}}function Ps(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ll(n,r,t)}function ll(n,e,t){let r=`FIRESTORE (${tn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw St(r),new Error(r)}function X(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||ll(e,i,r)}function G(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Xe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Rp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(me.UNAUTHENTICATED)))}shutdown(){}}class Sp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Pp{constructor(e){this.t=e,this.currentUser=me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let r=this.i;const i=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new Tt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Tt,e.enqueueRetryable((()=>i(this.currentUser)))};const c=()=>{const h=o;e.enqueueRetryable((async()=>{await h.promise,await i(this.currentUser)}))},u=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Tt)}}),0),c()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string",31837,{l:r}),new ul(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new me(e)}}class bp{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=me.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Cp{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new bp(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(me.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ba{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class kp{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,be(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const c=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>r(o)))};const i=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ba(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ba(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=Dp(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%62))}return r}}function j(n,e){return n<e?-1:n>e?1:0}function Yi(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return j(r,i);{const o=Np(),c=Vp(o.encode(Ca(n,t)),o.encode(Ca(e,t)));return c!==0?c:j(r,i)}}t+=r>65535?2:1}return j(n.length,e.length)}function Ca(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function Vp(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return j(n[t],e[t]);return j(n.length,e.length)}function Wt(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka="__name__";class Ve{constructor(e,t,r){t===void 0?t=0:t>e.length&&x(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&x(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ve.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ve?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const o=Ve.compareSegments(e.get(i),t.get(i));if(o!==0)return o}return j(e.length,t.length)}static compareSegments(e,t){const r=Ve.isNumericId(e),i=Ve.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?Ve.extractNumericId(e).compare(Ve.extractNumericId(t)):Yi(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ss.fromString(e.substring(4,e.length-2))}}class Z extends Ve{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new Z(t)}static emptyPath(){return new Z([])}}const Op=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ce extends Ve{construct(e,t,r){return new ce(e,t,r)}static isValidIdentifier(e){return Op.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ce.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ka}static keyField(){return new ce([ka])}static fromServerFormat(e){const t=[];let r="",i=0;const o=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let c=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,i+=2}else u==="`"?(c=!c,i++):u!=="."||c?(r+=u,i++):(o(),i++)}if(o(),c)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ce(t)}static emptyPath(){return new ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Z.fromString(e))}static fromName(e){return new L(Z.fromString(e).popFirst(5))}static empty(){return new L(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Z(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mp(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Lp(n,e,t,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Da(n){if(!L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function hl(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Cs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function Zi(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Cs(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,e){const t={typeString:n};return e&&(t.value=e),t}function jn(n,e){if(!hl(n))throw new V(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,o="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const c=n[r];if(i&&typeof c!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&c!==o.value){t=`Expected '${r}' field to equal '${o.value}'`;break}}if(t)throw new V(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na=-62135596800,Va=1e6;class Q{static now(){return Q.fromMillis(Date.now())}static fromDate(e){return Q.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Va);return new Q(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Na)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Va}_compareTo(e){return this.seconds===e.seconds?j(this.nanoseconds,e.nanoseconds):j(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Q._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(jn(e,Q._jsonSchema))return new Q(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Na;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Q._jsonSchemaVersion="firestore/timestamp/1.0",Q._jsonSchema={type:te("string",Q._jsonSchemaVersion),seconds:te("number"),nanoseconds:te("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new Q(0,0))}static max(){return new K(new Q(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=-1;function xp(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=K.fromTimestamp(r===1e9?new Q(t+1,0):new Q(t,r));return new ut(i,L.empty(),e)}function Up(n){return new ut(n.readTime,n.key,Nn)}class ut{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ut(K.min(),L.empty(),Nn)}static max(){return new ut(K.max(),L.empty(),Nn)}}function Fp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:j(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jp{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ks(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Bp)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S(((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):S.reject(t)}static resolve(e){return new S(((t,r)=>{t(e)}))}static reject(e){return new S(((t,r)=>{r(e)}))}static waitFor(e){return new S(((t,r)=>{let i=0,o=0,c=!1;e.forEach((u=>{++i,u.next((()=>{++o,c&&o===i&&t()}),(h=>r(h)))})),c=!0,o===i&&t()}))}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next((i=>i?S.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,o)=>{r.push(t.call(this,i,o))})),this.waitFor(r)}static mapArray(e,t){return new S(((r,i)=>{const o=e.length,c=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next((_=>{c[f]=_,++u,u===o&&r(c)}),(_=>i(_)))}}))}static doWhile(e,t){return new S(((r,i)=>{const o=()=>{e()===!0?t().next((()=>{o()}),i):r()};o()}))}}function $p(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function $n(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Ds.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns=-1;function Vs(n){return n==null}function Mr(n){return n===0&&1/n==-1/0}function qp(n){return typeof n=="number"&&Number.isInteger(n)&&!Mr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl="";function Hp(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Oa(e)),e=zp(n.get(t),e);return Oa(e)}function zp(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const o=n.charAt(i);switch(o){case"\0":t+="";break;case dl:t+="";break;default:t+=o}}return t}function Oa(n){return n+dl+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function kt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function fl(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,t){this.comparator=e,this.root=t||oe.EMPTY}insert(e,t){return new we(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,oe.BLACK,null,null))}remove(e){return new we(this.comparator,this.root.remove(e,this.comparator).copy(null,null,oe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new pr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new pr(this.root,e,this.comparator,!1)}getReverseIterator(){return new pr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new pr(this.root,e,this.comparator,!0)}}class pr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class oe{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r??oe.RED,this.left=i??oe.EMPTY,this.right=o??oe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new oe(e??this.key,t??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return oe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return oe.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,oe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,oe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}}oe.EMPTY=null,oe.RED=!0,oe.BLACK=!1;oe.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,t,r,i,o){return this}insert(e,t,r){return new oe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.comparator=e,this.data=new we(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new La(this.data.getIterator())}getIteratorFrom(e){return new La(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new le(this.comparator);return t.data=e,t}}class La{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.fields=e,e.sort(ce.comparator)}static empty(){return new De([])}unionWith(e){let t=new le(ce.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new De(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wt(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Gp("Invalid base64 string: "+o):o}})(e);return new xe(t)}static fromUint8Array(e){const t=(function(i){let o="";for(let c=0;c<i.length;++c)o+=String.fromCharCode(i[c]);return o})(e);return new xe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return j(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}xe.EMPTY_BYTE_STRING=new xe("");const Wp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Pt(n){if(X(!!n,39018),typeof n=="string"){let e=0;const t=Wp.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ae(n.seconds),nanos:ae(n.nanos)}}function ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Kt(n){return typeof n=="string"?xe.fromBase64String(n):xe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl="server_timestamp",ml="__type__",gl="__previous_value__",_l="__local_write_time__";function Os(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[ml])===null||t===void 0?void 0:t.stringValue)===pl}function Ms(n){const e=n.mapValue.fields[gl];return Os(e)?Ms(e):e}function Lr(n){const e=Pt(n.mapValue.fields[_l].timestampValue);return new Q(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(e,t,r,i,o,c,u,h,f,_){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=c,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=_}}const xr="(default)";class Ur{constructor(e,t){this.projectId=e,this.database=t||xr}static empty(){return new Ur("","")}get isDefaultDatabase(){return this.database===xr}isEqual(e){return e instanceof Ur&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="__type__",Qp="__max__",mr={mapValue:{}},vl="__vector__",es="value";function bt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Os(n)?4:Xp(n)?9007199254740991:Jp(n)?10:11:x(28295,{value:n})}function Ue(n,e){if(n===e)return!0;const t=bt(n);if(t!==bt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Lr(n).isEqual(Lr(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const c=Pt(i.timestampValue),u=Pt(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,o){return Kt(i.bytesValue).isEqual(Kt(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,o){return ae(i.geoPointValue.latitude)===ae(o.geoPointValue.latitude)&&ae(i.geoPointValue.longitude)===ae(o.geoPointValue.longitude)})(n,e);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return ae(i.integerValue)===ae(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const c=ae(i.doubleValue),u=ae(o.doubleValue);return c===u?Mr(c)===Mr(u):isNaN(c)&&isNaN(u)}return!1})(n,e);case 9:return Wt(n.arrayValue.values||[],e.arrayValue.values||[],Ue);case 10:case 11:return(function(i,o){const c=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Ma(c)!==Ma(u))return!1;for(const h in c)if(c.hasOwnProperty(h)&&(u[h]===void 0||!Ue(c[h],u[h])))return!1;return!0})(n,e);default:return x(52216,{left:n})}}function Vn(n,e){return(n.values||[]).find((t=>Ue(t,e)))!==void 0}function Qt(n,e){if(n===e)return 0;const t=bt(n),r=bt(e);if(t!==r)return j(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,e.booleanValue);case 2:return(function(o,c){const u=ae(o.integerValue||o.doubleValue),h=ae(c.integerValue||c.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,e);case 3:return xa(n.timestampValue,e.timestampValue);case 4:return xa(Lr(n),Lr(e));case 5:return Yi(n.stringValue,e.stringValue);case 6:return(function(o,c){const u=Kt(o),h=Kt(c);return u.compareTo(h)})(n.bytesValue,e.bytesValue);case 7:return(function(o,c){const u=o.split("/"),h=c.split("/");for(let f=0;f<u.length&&f<h.length;f++){const _=j(u[f],h[f]);if(_!==0)return _}return j(u.length,h.length)})(n.referenceValue,e.referenceValue);case 8:return(function(o,c){const u=j(ae(o.latitude),ae(c.latitude));return u!==0?u:j(ae(o.longitude),ae(c.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Ua(n.arrayValue,e.arrayValue);case 10:return(function(o,c){var u,h,f,_;const w=o.fields||{},A=c.fields||{},C=(u=w[es])===null||u===void 0?void 0:u.arrayValue,k=(h=A[es])===null||h===void 0?void 0:h.arrayValue,O=j(((f=C?.values)===null||f===void 0?void 0:f.length)||0,((_=k?.values)===null||_===void 0?void 0:_.length)||0);return O!==0?O:Ua(C,k)})(n.mapValue,e.mapValue);case 11:return(function(o,c){if(o===mr.mapValue&&c===mr.mapValue)return 0;if(o===mr.mapValue)return 1;if(c===mr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=c.fields||{},_=Object.keys(f);h.sort(),_.sort();for(let w=0;w<h.length&&w<_.length;++w){const A=Yi(h[w],_[w]);if(A!==0)return A;const C=Qt(u[h[w]],f[_[w]]);if(C!==0)return C}return j(h.length,_.length)})(n.mapValue,e.mapValue);default:throw x(23264,{le:t})}}function xa(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return j(n,e);const t=Pt(n),r=Pt(e),i=j(t.seconds,r.seconds);return i!==0?i:j(t.nanos,r.nanos)}function Ua(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const o=Qt(t[i],r[i]);if(o)return o}return j(t.length,r.length)}function Jt(n){return ts(n)}function ts(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Pt(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Kt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return L.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const o of t.values||[])i?i=!1:r+=",",r+=ts(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",o=!0;for(const c of r)o?o=!1:i+=",",i+=`${c}:${ts(t.fields[c])}`;return i+"}"})(n.mapValue):x(61005,{value:n})}function Ar(n){switch(bt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ms(n);return e?16+Ar(e):16;case 5:return 2*n.stringValue.length;case 6:return Kt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,o)=>i+Ar(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return kt(r.fields,((o,c)=>{i+=o.length+Ar(c)})),i})(n.mapValue);default:throw x(13486,{value:n})}}function ns(n){return!!n&&"integerValue"in n}function Ls(n){return!!n&&"arrayValue"in n}function Rr(n){return!!n&&"mapValue"in n}function Jp(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[yl])===null||t===void 0?void 0:t.stringValue)===vl}function An(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return kt(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=An(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=An(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Xp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Qp}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Rr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=An(t)}setAll(e){let t=ce.emptyPath(),r={},i=[];e.forEach(((c,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,i),r={},i=[],t=u.popLast()}c?r[u.lastSegment()]=An(c):i.push(u.lastSegment())}));const o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){const t=this.field(e.popLast());Rr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ue(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Rr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){kt(t,((i,o)=>e[i]=o));for(const i of r)delete e[i]}clone(){return new Re(An(this.value))}}function El(n){const e=[];return kt(n.fields,((t,r)=>{const i=new ce([t]);if(Rr(r)){const o=El(r.mapValue).fields;if(o.length===0)e.push(i);else for(const c of o)e.push(i.child(c))}else e.push(i)})),new De(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t,r,i,o,c,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=c,this.documentState=u}static newInvalidDocument(e){return new Pe(e,0,K.min(),K.min(),K.min(),Re.empty(),0)}static newFoundDocument(e,t,r,i){return new Pe(e,1,t,K.min(),r,i,0)}static newNoDocument(e,t){return new Pe(e,2,t,K.min(),K.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new Pe(e,3,t,K.min(),K.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t){this.position=e,this.inclusive=t}}function Fa(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const o=e[i],c=n.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(c.referenceValue),t.key):r=Qt(c,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ba(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ue(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,t="asc"){this.field=e,this.dir=t}}function Yp(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{}class ie extends Tl{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new em(e,t,r):t==="array-contains"?new rm(e,r):t==="in"?new im(e,r):t==="not-in"?new sm(e,r):t==="array-contains-any"?new om(e,r):new ie(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new tm(e,r):new nm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Qt(t,this.value)):t!==null&&bt(this.value)===bt(t)&&this.matchesComparison(Qt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ht extends Tl{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new ht(e,t)}matches(e){return Il(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Il(n){return n.op==="and"}function wl(n){return Zp(n)&&Il(n)}function Zp(n){for(const e of n.filters)if(e instanceof ht)return!1;return!0}function rs(n){if(n instanceof ie)return n.field.canonicalString()+n.op.toString()+Jt(n.value);if(wl(n))return n.filters.map((e=>rs(e))).join(",");{const e=n.filters.map((t=>rs(t))).join(",");return`${n.op}(${e})`}}function Al(n,e){return n instanceof ie?(function(r,i){return i instanceof ie&&r.op===i.op&&r.field.isEqual(i.field)&&Ue(r.value,i.value)})(n,e):n instanceof ht?(function(r,i){return i instanceof ht&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((o,c,u)=>o&&Al(c,i.filters[u])),!0):!1})(n,e):void x(19439)}function Rl(n){return n instanceof ie?(function(t){return`${t.field.canonicalString()} ${t.op} ${Jt(t.value)}`})(n):n instanceof ht?(function(t){return t.op.toString()+" {"+t.getFilters().map(Rl).join(" ,")+"}"})(n):"Filter"}class em extends ie{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class tm extends ie{constructor(e,t){super(e,"in",t),this.keys=Sl("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class nm extends ie{constructor(e,t){super(e,"not-in",t),this.keys=Sl("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Sl(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>L.fromName(r.referenceValue)))}class rm extends ie{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ls(t)&&Vn(t.arrayValue,this.value)}}class im extends ie{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Vn(this.value.arrayValue,t)}}class sm extends ie{constructor(e,t){super(e,"not-in",t)}matches(e){if(Vn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Vn(this.value.arrayValue,t)}}class om extends ie{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ls(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Vn(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e,t=null,r=[],i=[],o=null,c=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=c,this.endAt=u,this.Pe=null}}function ja(n,e=null,t=[],r=[],i=null,o=null,c=null){return new am(n,e,t,r,i,o,c)}function xs(n){const e=G(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>rs(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Vs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Jt(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Jt(r))).join(",")),e.Pe=t}return e.Pe}function Us(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Yp(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Al(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ba(n.startAt,e.startAt)&&Ba(n.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,t=null,r=[],i=[],o=null,c="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=c,this.startAt=u,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function cm(n,e,t,r,i,o,c,u){return new Xr(n,e,t,r,i,o,c,u)}function lm(n){return new Xr(n)}function $a(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function um(n){return n.collectionGroup!==null}function Rn(n){const e=G(n);if(e.Te===null){e.Te=[];const t=new Set;for(const o of e.explicitOrderBy)e.Te.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let u=new le(ce.comparator);return c.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(u=u.add(f.field))}))})),u})(e).forEach((o=>{t.has(o.canonicalString())||o.isKeyField()||e.Te.push(new Br(o,r))})),t.has(ce.keyField().canonicalString())||e.Te.push(new Br(ce.keyField(),r))}return e.Te}function It(n){const e=G(n);return e.Ie||(e.Ie=hm(e,Rn(n))),e.Ie}function hm(n,e){if(n.limitType==="F")return ja(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new Br(i.field,o)}));const t=n.endAt?new Fr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Fr(n.startAt.position,n.startAt.inclusive):null;return ja(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function is(n,e,t){return new Xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Pl(n,e){return Us(It(n),It(e))&&n.limitType===e.limitType}function bl(n){return`${xs(It(n))}|lt:${n.limitType}`}function En(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>Rl(i))).join(", ")}]`),Vs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(c){return`${c.field.canonicalString()} (${c.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Jt(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Jt(i))).join(",")),`Target(${r})`})(It(n))}; limitType=${n.limitType})`}function Fs(n,e){return e.isFoundDocument()&&(function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,e)&&(function(r,i){for(const o of Rn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(c,u,h){const f=Fa(c,u,h);return c.inclusive?f<=0:f<0})(r.startAt,Rn(r),i)||r.endAt&&!(function(c,u,h){const f=Fa(c,u,h);return c.inclusive?f>=0:f>0})(r.endAt,Rn(r),i))})(n,e)}function dm(n){return(e,t)=>{let r=!1;for(const i of Rn(n)){const o=fm(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function fm(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):(function(o,c,u){const h=c.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Qt(h,f):x(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){kt(this.inner,((t,r)=>{for(const[i,o]of r)e(i,o)}))}isEmpty(){return fl(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm=new we(L.comparator);function jr(){return pm}const Cl=new we(L.comparator);function gr(...n){let e=Cl;for(const t of n)e=e.insert(t.key,t);return e}function kl(n){let e=Cl;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function vt(){return Sn()}function Dl(){return Sn()}function Sn(){return new Dt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const mm=new we(L.comparator),gm=new le(L.comparator);function ge(...n){let e=gm;for(const t of n)e=e.add(t);return e}const _m=new le(j);function ym(){return _m}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Mr(e)?"-0":e}}function Nl(n){return{integerValue:""+n}}function vm(n,e){return qp(e)?Nl(e):Bs(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(){this._=void 0}}function Em(n,e,t){return n instanceof $r?(function(i,o){const c={fields:{[ml]:{stringValue:pl},[_l]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Os(o)&&(o=Ms(o)),o&&(c.fields[gl]=o),{mapValue:c}})(t,e):n instanceof Xt?Ol(n,e):n instanceof On?Ml(n,e):(function(i,o){const c=Vl(i,o),u=qa(c)+qa(i.Ee);return ns(c)&&ns(i.Ee)?Nl(u):Bs(i.serializer,u)})(n,e)}function Tm(n,e,t){return n instanceof Xt?Ol(n,e):n instanceof On?Ml(n,e):t}function Vl(n,e){return n instanceof qr?(function(r){return ns(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(e)?e:{integerValue:0}:null}class $r extends Yr{}class Xt extends Yr{constructor(e){super(),this.elements=e}}function Ol(n,e){const t=Ll(e);for(const r of n.elements)t.some((i=>Ue(i,r)))||t.push(r);return{arrayValue:{values:t}}}class On extends Yr{constructor(e){super(),this.elements=e}}function Ml(n,e){let t=Ll(e);for(const r of n.elements)t=t.filter((i=>!Ue(i,r)));return{arrayValue:{values:t}}}class qr extends Yr{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function qa(n){return ae(n.integerValue||n.doubleValue)}function Ll(n){return Ls(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{constructor(e,t){this.field=e,this.transform=t}}function wm(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof Xt&&i instanceof Xt||r instanceof On&&i instanceof On?Wt(r.elements,i.elements,Ue):r instanceof qr&&i instanceof qr?Ue(r.Ee,i.Ee):r instanceof $r&&i instanceof $r})(n.transform,e.transform)}class Am{constructor(e,t){this.version=e,this.transformResults=t}}class ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ze}static exists(e){return new ze(void 0,e)}static updateTime(e){return new ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Sr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Zr{}function xl(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Fl(n.key,ze.none()):new ei(n.key,n.data,ze.none());{const t=n.data,r=Re.empty();let i=new le(ce.comparator);for(let o of e.fields)if(!i.has(o)){let c=t.field(o);c===null&&o.length>1&&(o=o.popLast(),c=t.field(o)),c===null?r.delete(o):r.set(o,c),i=i.add(o)}return new Nt(n.key,r,new De(i.toArray()),ze.none())}}function Rm(n,e,t){n instanceof ei?(function(i,o,c){const u=i.value.clone(),h=za(i.fieldTransforms,o,c.transformResults);u.setAll(h),o.convertToFoundDocument(c.version,u).setHasCommittedMutations()})(n,e,t):n instanceof Nt?(function(i,o,c){if(!Sr(i.precondition,o))return void o.convertToUnknownDocument(c.version);const u=za(i.fieldTransforms,o,c.transformResults),h=o.data;h.setAll(Ul(i)),h.setAll(u),o.convertToFoundDocument(c.version,h).setHasCommittedMutations()})(n,e,t):(function(i,o,c){o.convertToNoDocument(c.version).setHasCommittedMutations()})(0,e,t)}function Pn(n,e,t,r){return n instanceof ei?(function(o,c,u,h){if(!Sr(o.precondition,c))return u;const f=o.value.clone(),_=Ga(o.fieldTransforms,h,c);return f.setAll(_),c.convertToFoundDocument(c.version,f).setHasLocalMutations(),null})(n,e,t,r):n instanceof Nt?(function(o,c,u,h){if(!Sr(o.precondition,c))return u;const f=Ga(o.fieldTransforms,h,c),_=c.data;return _.setAll(Ul(o)),_.setAll(f),c.convertToFoundDocument(c.version,_).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((w=>w.field)))})(n,e,t,r):(function(o,c,u){return Sr(o.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):u})(n,e,t)}function Sm(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),o=Vl(r.transform,i||null);o!=null&&(t===null&&(t=Re.empty()),t.set(r.field,o))}return t||null}function Ha(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Wt(r,i,((o,c)=>wm(o,c)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ei extends Zr{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Nt extends Zr{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Ul(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function za(n,e,t){const r=new Map;X(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){const o=n[i],c=o.transform,u=e.data.field(o.field);r.set(o.field,Tm(c,u,t[i]))}return r}function Ga(n,e,t){const r=new Map;for(const i of n){const o=i.transform,c=t.data.field(i.field);r.set(i.field,Em(o,c,e))}return r}class Fl extends Zr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Pm extends Zr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(e.key)&&Rm(o,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Pn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Pn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Dl();return this.mutations.forEach((i=>{const o=e.get(i.key),c=o.overlayedDocument;let u=this.applyToLocalView(c,o.mutatedFields);u=t.has(i.key)?null:u;const h=xl(c,u);h!==null&&r.set(i.key,h),c.isValidDocument()||c.convertToNoDocument(K.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ge())}isEqual(e){return this.batchId===e.batchId&&Wt(this.mutations,e.mutations,((t,r)=>Ha(t,r)))&&Wt(this.baseMutations,e.baseMutations,((t,r)=>Ha(t,r)))}}class js{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=(function(){return mm})();const o=e.mutations;for(let c=0;c<o.length;c++)i=i.insert(o[c].key,r[c].version);return new js(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee,B;function km(n){switch(n){case P.OK:return x(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function Dm(n){if(n===void 0)return St("GRPC error has no .code"),P.UNKNOWN;switch(n){case ee.OK:return P.OK;case ee.CANCELLED:return P.CANCELLED;case ee.UNKNOWN:return P.UNKNOWN;case ee.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ee.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ee.INTERNAL:return P.INTERNAL;case ee.UNAVAILABLE:return P.UNAVAILABLE;case ee.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ee.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ee.NOT_FOUND:return P.NOT_FOUND;case ee.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ee.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ee.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ee.ABORTED:return P.ABORTED;case ee.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ee.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ee.DATA_LOSS:return P.DATA_LOSS;default:return x(39323,{code:n})}}(B=ee||(ee={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Ss([4294967295,4294967295],0);class Nm{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ss(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Vm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Om(n,e){return ss(n,e.toTimestamp())}function qt(n){return X(!!n,49232),K.fromTimestamp((function(t){const r=Pt(t);return new Q(r.seconds,r.nanos)})(n))}function Bl(n,e){return os(n,e).canonicalString()}function os(n,e){const t=(function(i){return new Z(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Mm(n){const e=Z.fromString(n);return X(qm(e),10190,{key:e.toString()}),e}function as(n,e){return Bl(n.databaseId,e.path)}function Lm(n){const e=Mm(n);return e.length===4?Z.emptyPath():Um(e)}function xm(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Um(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Wa(n,e,t){return{name:as(n,e),fields:t.value.mapValue.fields}}function Fm(n,e){let t;if(e instanceof ei)t={update:Wa(n,e.key,e.value)};else if(e instanceof Fl)t={delete:as(n,e.key)};else if(e instanceof Nt)t={update:Wa(n,e.key,e.data),updateMask:$m(e.fieldMask)};else{if(!(e instanceof Pm))return x(16599,{Rt:e.type});t={verify:as(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(o,c){const u=c.transform;if(u instanceof $r)return{fieldPath:c.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Xt)return{fieldPath:c.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof On)return{fieldPath:c.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof qr)return{fieldPath:c.field.canonicalString(),increment:u.Ee};throw x(20930,{transform:c.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,o){return o.updateTime!==void 0?{updateTime:Om(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x(27497)})(n,e.precondition)),t}function Bm(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map((t=>(function(i,o){let c=i.updateTime?qt(i.updateTime):qt(o);return c.isEqual(K.min())&&(c=qt(o)),new Am(c,i.transformResults||[])})(t,e)))):[]}function jm(n){let e=Lm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){X(r===1,65062);const _=t.from[0];_.allDescendants?i=_.collectionId:e=e.child(_.collectionId)}let o=[];t.where&&(o=(function(w){const A=jl(w);return A instanceof ht&&wl(A)?A.getFilters():[A]})(t.where));let c=[];t.orderBy&&(c=(function(w){return w.map((A=>(function(k){return new Br(Ut(k.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(A)))})(t.orderBy));let u=null;t.limit&&(u=(function(w){let A;return A=typeof w=="object"?w.value:w,Vs(A)?null:A})(t.limit));let h=null;t.startAt&&(h=(function(w){const A=!!w.before,C=w.values||[];return new Fr(C,A)})(t.startAt));let f=null;return t.endAt&&(f=(function(w){const A=!w.before,C=w.values||[];return new Fr(C,A)})(t.endAt)),cm(e,i,c,o,u,"F",h,f)}function jl(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Ut(t.unaryFilter.field);return ie.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Ut(t.unaryFilter.field);return ie.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ut(t.unaryFilter.field);return ie.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const c=Ut(t.unaryFilter.field);return ie.create(c,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ie.create(Ut(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ht.create(t.compositeFilter.filters.map((r=>jl(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(t.compositeFilter.op))})(n):x(30097,{filter:n})}function Ut(n){return ce.fromServerFormat(n.fieldPath)}function $m(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function qm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(e){this.gt=e}}function zm(n){const e=jm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?is(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(){this.Dn=new Wm}addToCollectionParentIndex(e,t){return this.Dn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(ut.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(ut.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class Wm{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new le(Z.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new le(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},$l=41943040;class Ie{static withCacheSize(e){return new Ie(e,Ie.DEFAULT_COLLECTION_PERCENTILE,Ie.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ie.DEFAULT_COLLECTION_PERCENTILE=10,Ie.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ie.DEFAULT=new Ie($l,Ie.DEFAULT_COLLECTION_PERCENTILE,Ie.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ie.DISABLED=new Ie(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Yt(0)}static ur(){return new Yt(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa="LruGarbageCollector",Km=1048576;function Ja([n,e],[t,r]){const i=j(n,t);return i===0?j(e,r):i}class Qm{constructor(e){this.Tr=e,this.buffer=new le(Ja),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ja(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Jm{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){D(Qa,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$n(t)?D(Qa,"Ignoring IndexedDB error during garbage collection: ",t):await ks(t)}await this.Rr(3e5)}))}}class Xm{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return S.resolve(Ds.ue);const r=new Qm(t);return this.Vr.forEachTarget(e,(i=>r.Er(i.sequenceNumber))).next((()=>this.Vr.gr(e,(i=>r.Er(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Ka)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ka):this.pr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,o,c,u,h,f;const _=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((w=>(w>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),i=this.params.maximumSequenceNumbersToCollect):i=w,c=Date.now(),this.nthSequenceNumber(e,i)))).next((w=>(r=w,u=Date.now(),this.removeTargets(e,r,t)))).next((w=>(o=w,h=Date.now(),this.removeOrphanedDocuments(e,r)))).next((w=>(f=Date.now(),xt()<=U.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${c-_}ms
	Determined least recently used ${i} in `+(u-c)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${w} documents in `+(f-h)+`ms
Total Duration: ${f-_}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:w}))))}}function Ym(n,e){return new Xm(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(){this.changes=new Dt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&Pn(r.mutation,i,De.empty(),Q.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,ge()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=ge()){const i=vt();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((o=>{let c=gr();return o.forEach(((u,h)=>{c=c.insert(u,h.overlayedDocument)})),c}))))}getOverlayedDocuments(e,t){const r=vt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,ge())))}populateOverlays(e,t,r){const i=[];return r.forEach((o=>{t.has(o)||i.push(o)})),this.documentOverlayCache.getOverlays(e,i).next((o=>{o.forEach(((c,u)=>{t.set(c,u)}))}))}computeViews(e,t,r,i){let o=jr();const c=Sn(),u=(function(){return Sn()})();return t.forEach(((h,f)=>{const _=r.get(f.key);i.has(f.key)&&(_===void 0||_.mutation instanceof Nt)?o=o.insert(f.key,f):_!==void 0?(c.set(f.key,_.mutation.getFieldMask()),Pn(_.mutation,f,_.mutation.getFieldMask(),Q.now())):c.set(f.key,De.empty())})),this.recalculateAndSaveOverlays(e,o).next((h=>(h.forEach(((f,_)=>c.set(f,_))),t.forEach(((f,_)=>{var w;return u.set(f,new eg(_,(w=c.get(f))!==null&&w!==void 0?w:null))})),u)))}recalculateAndSaveOverlays(e,t){const r=Sn();let i=new we(((c,u)=>c-u)),o=ge();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((c=>{for(const u of c)u.keys().forEach((h=>{const f=t.get(h);if(f===null)return;let _=r.get(h)||De.empty();_=u.applyToLocalView(f,_),r.set(h,_);const w=(i.get(u.batchId)||ge()).add(h);i=i.insert(u.batchId,w)}))})).next((()=>{const c=[],u=i.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,_=h.value,w=Dl();_.forEach((A=>{if(!o.has(A)){const C=xl(t.get(A),r.get(A));C!==null&&w.set(A,C),o=o.add(A)}})),c.push(this.documentOverlayCache.saveOverlays(e,f,w))}return S.waitFor(c)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return(function(c){return L.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):um(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((o=>{const c=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):S.resolve(vt());let u=Nn,h=o;return c.next((f=>S.forEach(f,((_,w)=>(u<w.largestBatchId&&(u=w.largestBatchId),o.get(_)?S.resolve():this.remoteDocumentCache.getEntry(e,_).next((A=>{h=h.insert(_,A)}))))).next((()=>this.populateOverlays(e,f,o))).next((()=>this.computeViews(e,h,f,ge()))).next((_=>({batchId:u,changes:kl(_)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((r=>{let i=gr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const o=t.collectionGroup;let c=gr();return this.indexManager.getCollectionParents(e,o).next((u=>S.forEach(u,(h=>{const f=(function(w,A){return new Xr(A,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)})(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,i).next((_=>{_.forEach(((w,A)=>{c=c.insert(w,A)}))}))})).next((()=>c))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((c=>(o=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i)))).next((c=>{o.forEach(((h,f)=>{const _=f.getKey();c.get(_)===null&&(c=c.insert(_,Pe.newInvalidDocument(_)))}));let u=gr();return c.forEach(((h,f)=>{const _=o.get(h);_!==void 0&&Pn(_.mutation,f,De.empty(),Q.now()),Fs(t,f)&&(u=u.insert(h,f))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return S.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:qt(i.createTime)}})(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,(function(i){return{name:i.name,query:zm(i.bundledQuery),readTime:qt(i.readTime)}})(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(){this.overlays=new we(L.comparator),this.kr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=vt();return S.forEach(t,(i=>this.getOverlay(e,i).next((o=>{o!==null&&r.set(i,o)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,o)=>{this.wt(e,t,o)})),S.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach((o=>this.overlays=this.overlays.remove(o))),this.kr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const i=vt(),o=t.length+1,c=new L(t.child("")),u=this.overlays.getIteratorFrom(c);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return S.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new we(((f,_)=>f-_));const c=this.overlays.getIterator();for(;c.hasNext();){const f=c.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let _=o.get(f.largestBatchId);_===null&&(_=vt(),o=o.insert(f.largestBatchId,_)),_.set(f.getKey(),f)}}const u=vt(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,_)=>u.set(f,_))),!(u.size()>=i)););return S.resolve(u)}wt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const c=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,c)}this.overlays=this.overlays.insert(r.key,new Cm(t,r));let o=this.kr.get(t);o===void 0&&(o=ge(),this.kr.set(t,o)),this.kr.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(){this.sessionToken=xe.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(){this.qr=new le(re.Qr),this.$r=new le(re.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new re(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new re(e,t))}Gr(e,t){e.forEach((r=>this.removeReference(r,t)))}zr(e){const t=new L(new Z([])),r=new re(t,e),i=new re(t,e+1),o=[];return this.$r.forEachInRange([r,i],(c=>{this.Wr(c),o.push(c.key)})),o}jr(){this.qr.forEach((e=>this.Wr(e)))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new L(new Z([])),r=new re(t,e),i=new re(t,e+1);let o=ge();return this.$r.forEachInRange([r,i],(c=>{o=o.add(c.key)})),o}containsKey(e){const t=new re(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class re{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return L.comparator(e.key,t.key)||j(e.Hr,t.Hr)}static Ur(e,t){return j(e.Hr,t.Hr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new le(re.Qr)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const c=new bm(o,t,r,i);this.mutationQueue.push(c);for(const u of i)this.Yr=this.Yr.add(new re(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return S.resolve(c)}lookupMutationBatch(e,t){return S.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Ns:this.er-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new re(t,0),i=new re(t,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,i],(c=>{const u=this.Zr(c.Hr);o.push(u)})),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new le(j);return t.forEach((i=>{const o=new re(i,0),c=new re(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,c],(u=>{r=r.add(u.Hr)}))})),S.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const c=new re(new L(o),0);let u=new le(j);return this.Yr.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(u=u.add(h.Hr)),!0)}),c),S.resolve(this.ei(u))}ei(e){const t=[];return e.forEach((r=>{const i=this.Zr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){X(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return S.forEach(t.mutations,(i=>{const o=new re(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Yr=r}))}rr(e){}containsKey(e,t){const r=new re(t,0),i=this.Yr.firstAfterOrEqual(r);return S.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this.ni=e,this.docs=(function(){return new we(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),o=i?i.size:0,c=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:c}),this.size+=c-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():Pe.newInvalidDocument(t))}getEntries(e,t){let r=jr();return t.forEach((i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Pe.newInvalidDocument(i))})),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=jr();const c=t.path,u=new L(c.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:_}}=h.getNext();if(!c.isPrefixOf(f.path))break;f.path.length>c.length+1||Fp(Up(_),r)<=0||(i.has(_.key)||Fs(t,_))&&(o=o.insert(_.key,_.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,i){x(9500)}ri(e,t){return S.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new ag(this)}getSize(e){return S.resolve(this.size)}}class ag extends Zm{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)})),S.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e){this.persistence=e,this.ii=new Dt((t=>xs(t)),Us),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.si=0,this.oi=new $s,this.targetCount=0,this._i=Yt.ar()}forEachTarget(e,t){return this.ii.forEach(((r,i)=>t(i))),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),S.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Yt(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.hr(t),S.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let i=0;const o=[];return this.ii.forEach(((c,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.ii.delete(c),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)})),S.waitFor(o).next((()=>i))}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const i=this.persistence.referenceDelegate,o=[];return i&&t.forEach((c=>{o.push(i.markPotentiallyOrphaned(e,c))})),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e,t){this.ai={},this.overlays={},this.ui=new Ds(0),this.ci=!1,this.ci=!0,this.li=new ig,this.referenceDelegate=e(this),this.hi=new cg(this),this.indexManager=new Gm,this.remoteDocumentCache=(function(i){return new og(i)})((r=>this.referenceDelegate.Pi(r))),this.serializer=new Hm(t),this.Ti=new ng(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new rg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new sg(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);const i=new lg(this.ui.next());return this.referenceDelegate.Ii(),r(i).next((o=>this.referenceDelegate.di(i).next((()=>o)))).toPromise().then((o=>(i.raiseOnCommittedEvent(),o)))}Ei(e,t){return S.or(Object.values(this.ai).map((r=>()=>r.containsKey(e,t))))}}class lg extends jp{constructor(e){super(),this.currentSequenceNumber=e}}class qs{constructor(e){this.persistence=e,this.Ai=new $s,this.Ri=null}static Vi(e){return new qs(e)}get mi(){if(this.Ri)return this.Ri;throw x(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach((i=>this.mi.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((o=>this.mi.add(o.toString())))})).next((()=>r.removeTargetData(e,t)))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.mi,(r=>{const i=L.fromPath(r);return this.fi(e,i).next((o=>{o||t.removeEntry(i,K.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.fi(e,t).next((r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())}))}Pi(e){return 0}fi(e,t){return S.or([()=>S.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Hr{constructor(e,t){this.persistence=e,this.gi=new Dt((r=>Hp(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=Ym(this,t)}static Vi(e,t){return new Hr(e,t)}Ii(){}di(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}yr(e){let t=0;return this.gr(e,(r=>{t++})).next((()=>t))}gr(e,t){return S.forEach(this.gi,((r,i)=>this.Sr(e,r,i).next((o=>o?S.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ri(e,(c=>this.Sr(e,c,t).next((u=>{u||(r++,o.removeEntry(c,K.min()))})))).next((()=>o.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),S.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ar(e.data.value)),t}Sr(e,t,r){return S.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return S.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=ge(),i=ge();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Hs(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=(function(){return ch()?8:$p(ye())>0?6:4})()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){const o={result:null};return this.ps(e,t).next((c=>{o.result=c})).next((()=>{if(!o.result)return this.ys(e,t,i,r).next((c=>{o.result=c}))})).next((()=>{if(o.result)return;const c=new ug;return this.ws(e,t,c).next((u=>{if(o.result=u,this.Rs)return this.Ss(e,t,c,u.size)}))})).next((()=>o.result))}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(xt()<=U.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",En(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(xt()<=U.DEBUG&&D("QueryEngine","Query:",En(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(xt()<=U.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",En(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,It(t))):S.resolve())}ps(e,t){if($a(t))return S.resolve(null);let r=It(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=is(t,null,"F"),r=It(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((o=>{const c=ge(...o);return this.gs.getDocuments(e,c).next((u=>this.indexManager.getMinOffset(e,r).next((h=>{const f=this.bs(t,u);return this.Ds(t,f,c,h.readTime)?this.ps(e,is(t,null,"F")):this.vs(e,f,t,h)}))))})))))}ys(e,t,r,i){return $a(t)||i.isEqual(K.min())?S.resolve(null):this.gs.getDocuments(e,r).next((o=>{const c=this.bs(t,o);return this.Ds(t,c,r,i)?S.resolve(null):(xt()<=U.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),En(t)),this.vs(e,c,t,xp(i,Nn)).next((u=>u)))}))}bs(e,t){let r=new le(dm(e));return t.forEach(((i,o)=>{Fs(e,o)&&(r=r.add(o))})),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ws(e,t,r){return xt()<=U.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",En(t)),this.gs.getDocumentsMatchingQuery(e,t,ut.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next((o=>(t.forEach((c=>{o=o.insert(c.key,c)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="LocalStore";class fg{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new we(j),this.Ms=new Dt((o=>xs(o)),Us),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new tg(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Fs)))}}function pg(n,e,t,r){return new fg(n,e,t,r)}async function Hl(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((o=>(i=o,t.Ns(e),t.mutationQueue.getAllMutationBatches(r)))).next((o=>{const c=[],u=[];let h=ge();for(const f of i){c.push(f.batchId);for(const _ of f.mutations)h=h.add(_.key)}for(const f of o){u.push(f.batchId);for(const _ of f.mutations)h=h.add(_.key)}return t.localDocuments.getDocuments(r,h).next((f=>({Bs:f,removedBatchIds:c,addedBatchIds:u})))}))}))}function mg(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),o=t.Os.newChangeBuffer({trackRemovals:!0});return(function(u,h,f,_){const w=f.batch,A=w.keys();let C=S.resolve();return A.forEach((k=>{C=C.next((()=>_.getEntry(h,k))).next((O=>{const N=f.docVersions.get(k);X(N!==null,48541),O.version.compareTo(N)<0&&(w.applyToRemoteDocument(O,f),O.isValidDocument()&&(O.setReadTime(f.commitVersion),_.addEntry(O)))}))})),C.next((()=>u.mutationQueue.removeMutationBatch(h,w)))})(t,r,e,o).next((()=>o.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let h=ge();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function gg(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.hi.getLastRemoteSnapshotVersion(t)))}function _g(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Ns),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}class Xa{constructor(){this.activeTargetIds=ym()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class yg{constructor(){this.Fo=new Xa,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Xa,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="ConnectivityMonitor";class Za{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){D(Ya,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){D(Ya,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _r=null;function cs(){return _r===null?_r=(function(){return 268435456+Math.round(2147483648*Math.random())})():_r++,"0x"+_r.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi="RestConnection",Eg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Tg{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===xr?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,o){const c=cs(),u=this.Go(e,t.toUriEncodedString());D(Bi,`Sending RPC '${e}' ${c}:`,u,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,i,o);const{host:f}=new URL(u),_=Ct(f);return this.jo(e,u,h,r,_).then((w=>(D(Bi,`Received RPC '${e}' ${c}: `,w),w)),(w=>{throw Gt(Bi,`RPC '${e}' ${c} failed with error: `,w,"url: ",u,"request:",r),w}))}Jo(e,t,r,i,o,c){return this.Wo(e,t,r,i,o)}zo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+tn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((i,o)=>e[o]=i)),r&&r.headers.forEach(((i,o)=>e[o]=i))}Go(e,t){const r=Eg[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe="WebChannelConnection";class wg extends Tg{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,o){const c=cs();return new Promise(((u,h)=>{const f=new il;f.setWithCredentials(!0),f.listenOnce(sl.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case wr.NO_ERROR:const w=f.getResponseJson();D(pe,`XHR for RPC '${e}' ${c} received:`,JSON.stringify(w)),u(w);break;case wr.TIMEOUT:D(pe,`RPC '${e}' ${c} timed out`),h(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case wr.HTTP_ERROR:const A=f.getStatus();if(D(pe,`RPC '${e}' ${c} failed with status:`,A,"response text:",f.getResponseText()),A>0){let C=f.getResponseJson();Array.isArray(C)&&(C=C[0]);const k=C?.error;if(k&&k.status&&k.message){const O=(function(H){const F=H.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(F)>=0?F:P.UNKNOWN})(k.status);h(new V(O,k.message))}else h(new V(P.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new V(P.UNAVAILABLE,"Connection failed."));break;default:x(9055,{c_:e,streamId:c,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{D(pe,`RPC '${e}' ${c} completed.`)}}));const _=JSON.stringify(i);D(pe,`RPC '${e}' ${c} sending request:`,i),f.send(t,"POST",_,r,15)}))}P_(e,t,r){const i=cs(),o=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=cl(),u=al(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const _=o.join("");D(pe,`Creating RPC '${e}' stream ${i}: ${_}`,h);const w=c.createWebChannel(_,h);this.T_(w);let A=!1,C=!1;const k=new Ig({Ho:N=>{C?D(pe,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(A||(D(pe,`Opening RPC '${e}' stream ${i} transport.`),w.open(),A=!0),D(pe,`RPC '${e}' stream ${i} sending:`,N),w.send(N))},Yo:()=>w.close()}),O=(N,H,F)=>{N.listen(H,(q=>{try{F(q)}catch(Y){setTimeout((()=>{throw Y}),0)}}))};return O(w,Tn.EventType.OPEN,(()=>{C||(D(pe,`RPC '${e}' stream ${i} transport opened.`),k.s_())})),O(w,Tn.EventType.CLOSE,(()=>{C||(C=!0,D(pe,`RPC '${e}' stream ${i} transport closed`),k.__(),this.I_(w))})),O(w,Tn.EventType.ERROR,(N=>{C||(C=!0,Gt(pe,`RPC '${e}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),k.__(new V(P.UNAVAILABLE,"The operation could not be completed")))})),O(w,Tn.EventType.MESSAGE,(N=>{var H;if(!C){const F=N.data[0];X(!!F,16349);const q=F,Y=q?.error||((H=q[0])===null||H===void 0?void 0:H.error);if(Y){D(pe,`RPC '${e}' stream ${i} received error:`,Y);const Ne=Y.status;let ne=(function(g){const y=ee[g];if(y!==void 0)return Dm(y)})(Ne),E=Y.message;ne===void 0&&(ne=P.INTERNAL,E="Unknown error status: "+Ne+" with message "+Y.message),C=!0,k.__(new V(ne,E)),w.close()}else D(pe,`RPC '${e}' stream ${i} received:`,F),k.a_(F)}})),O(u,ol.STAT_EVENT,(N=>{N.stat===Xi.PROXY?D(pe,`RPC '${e}' stream ${i} detected buffering proxy`):N.stat===Xi.NOPROXY&&D(pe,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{k.o_()}),0),k}terminate(){this.u_.forEach((e=>e.close())),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter((t=>t===e))}}function ji(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(n){return new Nm(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e,t,r=1e3,i=1.5,o=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&D("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,(()=>(this.m_=Date.now(),e()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="PersistentStream";class Ag{constructor(e,t,r,i,o,c,u,h){this.Fi=e,this.w_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=c,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new zl(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(St(t.toString()),St("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.b_===t&&this.W_(r,i)}),(r=>{e((()=>{const i=new V(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)}))}))}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.e_((()=>{r((()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.e_())))})),this.stream.n_((i=>{r((()=>this.G_(i)))})),this.stream.onMessage((i=>{r((()=>++this.C_==1?this.j_(i):this.onNext(i)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return D(ec,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget((()=>this.b_===e?t():(D(ec,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Rg extends Ag{constructor(e,t,r,i,o,c){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,c),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Bm(e.writeResults,e.commitTime),r=qt(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=xm(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Fm(this.serializer,r)))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{}class Pg extends Sg{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Wo(e,os(t,r),i,o,c))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(P.UNKNOWN,o.toString())}))}Jo(e,t,r,i,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([c,u])=>this.connection.Jo(e,os(t,r),i,c,u,o))).catch((c=>{throw c.name==="FirebaseError"?(c.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new V(P.UNKNOWN,c.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}class bg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(St(t),this._a=!1):D("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn="RemoteStore";class Cg{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo((c=>{r.enqueueAndForget((async()=>{zn(this)&&(D(qn,"Restarting streams for network reachability change."),await(async function(h){const f=G(h);f.Ia.add(4),await Hn(f),f.Aa.set("Unknown"),f.Ia.delete(4),await ni(f)})(this))}))})),this.Aa=new bg(r,i)}}async function ni(n){if(zn(n))for(const e of n.da)await e(!0)}async function Hn(n){for(const e of n.da)await e(!1)}function zn(n){return G(n).Ia.size===0}async function Gl(n,e,t){if(!$n(e))throw e;n.Ia.add(1),await Hn(n),n.Aa.set("Offline"),t||(t=()=>gg(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{D(qn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await ni(n)}))}function Wl(n,e){return e().catch((t=>Gl(n,t,e)))}async function ri(n){const e=G(n),t=dt(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ns;for(;kg(e);)try{const i=await _g(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,Dg(e,i)}catch(i){await Gl(e,i)}Kl(e)&&Ql(e)}function kg(n){return zn(n)&&n.Pa.length<10}function Dg(n,e){n.Pa.push(e);const t=dt(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Kl(n){return zn(n)&&!dt(n).M_()&&n.Pa.length>0}function Ql(n){dt(n).start()}async function Ng(n){dt(n).na()}async function Vg(n){const e=dt(n);for(const t of n.Pa)e.X_(t.mutations)}async function Og(n,e,t){const r=n.Pa.shift(),i=js.from(r,e,t);await Wl(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await ri(n)}async function Mg(n,e){e&&dt(n).Z_&&await(async function(r,i){if((function(c){return km(c)&&c!==P.ABORTED})(i.code)){const o=r.Pa.shift();dt(r).N_(),await Wl(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i))),await ri(r)}})(n,e),Kl(n)&&Ql(n)}async function tc(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),D(qn,"RemoteStore received new credentials");const r=zn(t);t.Ia.add(3),await Hn(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await ni(t)}async function Lg(n,e){const t=G(n);e?(t.Ia.delete(2),await ni(t)):e||(t.Ia.add(2),await Hn(t),t.Aa.set("Unknown"))}function dt(n){return n.ma||(n.ma=(function(t,r,i){const o=G(t);return o.ia(),new Rg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Ng.bind(null,n),n_:Mg.bind(null,n),ea:Vg.bind(null,n),ta:Og.bind(null,n)}),n.da.push((async e=>{e?(n.ma.N_(),await ri(n)):(await n.ma.stop(),n.Pa.length>0&&(D(qn,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Tt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((c=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){const c=Date.now()+r,u=new zs(e,t,c,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jl(n,e){if(St("AsyncQueue",`${e}: ${n}`),$n(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}class xg{constructor(){this.queries=nc(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const i=G(t),o=i.queries;i.queries=nc(),o.forEach(((c,u)=>{for(const h of u.wa)h.onError(r)}))})(this,new V(P.ABORTED,"Firestore shutting down"))}}function nc(){return new Dt((n=>bl(n)),Pl)}function Ug(n){n.Da.forEach((e=>{e.next()}))}var rc,ic;(ic=rc||(rc={})).Fa="default",ic.Cache="cache";const Fg="SyncEngine";class Bg{constructor(e,t,r,i,o,c){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=c,this.hu={},this.Pu=new Dt((u=>bl(u)),Pl),this.Tu=new Map,this.Iu=new Set,this.du=new we(L.comparator),this.Eu=new Map,this.Au=new $s,this.Ru={},this.Vu=new Map,this.mu=Yt.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function jg(n,e,t){const r=zg(n);try{const i=await(function(c,u){const h=G(c),f=Q.now(),_=u.reduce(((C,k)=>C.add(k.key)),ge());let w,A;return h.persistence.runTransaction("Locally write mutations","readwrite",(C=>{let k=jr(),O=ge();return h.Os.getEntries(C,_).next((N=>{k=N,k.forEach(((H,F)=>{F.isValidDocument()||(O=O.add(H))}))})).next((()=>h.localDocuments.getOverlayedDocuments(C,k))).next((N=>{w=N;const H=[];for(const F of u){const q=Sm(F,w.get(F.key).overlayedDocument);q!=null&&H.push(new Nt(F.key,q,El(q.value.mapValue),ze.exists(!0)))}return h.mutationQueue.addMutationBatch(C,f,H,u)})).next((N=>{A=N;const H=N.applyToLocalDocumentSet(w,O);return h.documentOverlayCache.saveOverlays(C,N.batchId,H)}))})).then((()=>({batchId:A.batchId,changes:kl(w)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(c,u,h){let f=c.Ru[c.currentUser.toKey()];f||(f=new we(j)),f=f.insert(u,h),c.Ru[c.currentUser.toKey()]=f})(r,i.batchId,t),await ii(r,i.changes),await ri(r.remoteStore)}catch(i){const o=Jl(i,"Failed to persist write");t.reject(o)}}function sc(n,e,t){const r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Pu.forEach(((o,c)=>{const u=c.view.va(e);u.snapshot&&i.push(u.snapshot)})),(function(c,u){const h=G(c);h.onlineState=u;let f=!1;h.queries.forEach(((_,w)=>{for(const A of w.wa)A.va(u)&&(f=!0)})),f&&Ug(h)})(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function $g(n,e){const t=G(n),r=e.batch.batchId;try{const i=await mg(t.localStore,e);Yl(t,r,null),Xl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ii(t,i)}catch(i){await ks(i)}}async function qg(n,e,t){const r=G(n);try{const i=await(function(c,u){const h=G(c);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let _;return h.mutationQueue.lookupMutationBatch(f,u).next((w=>(X(w!==null,37113),_=w.keys(),h.mutationQueue.removeMutationBatch(f,w)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,_,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,_))).next((()=>h.localDocuments.getDocuments(f,_)))}))})(r.localStore,e);Yl(r,e,t),Xl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ii(r,i)}catch(i){await ks(i)}}function Xl(n,e){(n.Vu.get(e)||[]).forEach((t=>{t.resolve()})),n.Vu.delete(e)}function Yl(n,e,t){const r=G(n);let i=r.Ru[r.currentUser.toKey()];if(i){const o=i.get(e);o&&(t?o.reject(t):o.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}async function ii(n,e,t){const r=G(n),i=[],o=[],c=[];r.Pu.isEmpty()||(r.Pu.forEach(((u,h)=>{c.push(r.gu(h,e,t).then((f=>{var _;if((f||t)&&r.isPrimaryClient){const w=f?!f.fromCache:(_=void 0)===null||_===void 0?void 0:_.current;r.sharedClientState.updateQueryState(h.targetId,w?"current":"not-current")}if(f){i.push(f);const w=Hs.Es(h.targetId,f);o.push(w)}})))})),await Promise.all(c),r.hu.J_(i),await(async function(h,f){const _=G(h);try{await _.persistence.runTransaction("notifyLocalViewChanges","readwrite",(w=>S.forEach(f,(A=>S.forEach(A.Is,(C=>_.persistence.referenceDelegate.addReference(w,A.targetId,C))).next((()=>S.forEach(A.ds,(C=>_.persistence.referenceDelegate.removeReference(w,A.targetId,C)))))))))}catch(w){if(!$n(w))throw w;D(dg,"Failed to update sequence numbers: "+w)}for(const w of f){const A=w.targetId;if(!w.fromCache){const C=_.Fs.get(A),k=C.snapshotVersion,O=C.withLastLimboFreeSnapshotVersion(k);_.Fs=_.Fs.insert(A,O)}}})(r.localStore,o))}async function Hg(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){D(Fg,"User change. New user:",e.toKey());const r=await Hl(t.localStore,e);t.currentUser=e,(function(o,c){o.Vu.forEach((u=>{u.forEach((h=>{h.reject(new V(P.CANCELLED,c))}))})),o.Vu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ii(t,r.Bs)}}function zg(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=$g.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=qg.bind(null,e),e}class zr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ti(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return pg(this.persistence,new hg,e.initialUser,this.serializer)}Du(e){return new ql(qs.Vi,this.serializer)}bu(e){return new yg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}zr.provider={build:()=>new zr};class Gg extends zr{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){X(this.persistence.referenceDelegate instanceof Hr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Jm(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Ie.withCacheSize(this.cacheSizeBytes):Ie.DEFAULT;return new ql((r=>Hr.Vi(r,t)),this.serializer)}}class ls{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Hg.bind(null,this.syncEngine),await Lg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new xg})()}createDatastore(e){const t=ti(e.databaseInfo.databaseId),r=(function(o){return new wg(o)})(e.databaseInfo);return(function(o,c,u,h){return new Pg(o,c,u,h)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,o,c,u){return new Cg(r,i,o,c,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>sc(this.syncEngine,t,0)),(function(){return Za.C()?new Za:new vg})())}createSyncEngine(e,t){return(function(i,o,c,u,h,f,_){const w=new Bg(i,o,c,u,h,f);return _&&(w.fu=!0),w})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const o=G(i);D(qn,"RemoteStore shutting down."),o.Ia.add(5),await Hn(o),o.Ea.shutdown(),o.Aa.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ls.provider={build:()=>new ls};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft="FirestoreClient";class Wg{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=me.UNAUTHENTICATED,this.clientId=bs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async c=>{D(ft,"Received user=",c.uid),await this.authCredentialListener(c),this.user=c})),this.appCheckCredentials.start(r,(c=>(D(ft,"Received new app check token=",c),this.appCheckCredentialListener(c,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Tt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Jl(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function $i(n,e){n.asyncQueue.verifyOperationInProgress(),D(ft,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await Hl(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>{Gt("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then((()=>{D("Terminating Firestore due to IndexedDb database deletion completed successfully")})).catch((i=>{Gt("Terminating Firestore due to IndexedDb database deletion failed",i)}))})),n._offlineComponents=e}async function oc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Kg(n);D(ft,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>tc(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>tc(e.remoteStore,i))),n._onlineComponents=e}async function Kg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(ft,"Using user provided OfflineComponentProvider");try{await $i(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;Gt("Error using user provided cache. Falling back to memory cache: "+t),await $i(n,new zr)}}else D(ft,"Using default OfflineComponentProvider"),await $i(n,new Gg(void 0));return n._offlineComponents}async function Qg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(ft,"Using user provided OnlineComponentProvider"),await oc(n,n._uninitializedComponentsProvider._online)):(D(ft,"Using default OnlineComponentProvider"),await oc(n,new ls))),n._onlineComponents}function Jg(n){return Qg(n).then((e=>e.syncEngine))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu="firestore.googleapis.com",cc=!0;class lc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=eu,this.ssl=cc}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:cc;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=$l;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Km)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Lp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Zl((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Gs{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new lc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new lc(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Rp;switch(r.type){case"firstParty":return new Cp(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=ac.get(t);r&&(D("ComponentProvider","Removing Datastore"),ac.delete(t),r.terminate())})(this),Promise.resolve()}}function Xg(n,e,t,r={}){var i;n=Zi(n,Gs);const o=Ct(e),c=n._getSettings(),u=Object.assign(Object.assign({},c),{emulatorOptions:n._getEmulatorOptions()}),h=`${e}:${t}`;o&&(hs(`https://${h}`),ds("Firestore",!0)),c.host!==eu&&c.host!==h&&Gt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const f=Object.assign(Object.assign({},c),{host:h,ssl:o,emulatorOptions:r});if(!ct(f,u)&&(n._setSettings(f),r.mockUserToken)){let _,w;if(typeof r.mockUserToken=="string")_=r.mockUserToken,w=me.MOCK_USER;else{_=Zu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const A=r.mockUserToken.sub||r.mockUserToken.user_id;if(!A)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new me(A)}n._authCredentials=new Sp(new ul(_,w))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ws(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Mn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(jn(t,_e._jsonSchema))return new _e(e,r||null,new L(Z.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:te("string",_e._jsonSchemaVersion),referencePath:te("string")};class Mn extends Ws{constructor(e,t,r){super(e,t,lm(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new L(e))}withConverter(e){return new Mn(this.firestore,e,this._path)}}function P_(n,e,...t){if(n=Te(n),arguments.length===1&&(e=bs.newId()),Mp("doc","path",e),n instanceof Gs){const r=Z.fromString(e,...t);return Da(r),new _e(n,null,new L(r))}{if(!(n instanceof _e||n instanceof Mn))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return Da(r),new _e(n.firestore,n instanceof Mn?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc="AsyncQueue";class hc{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new zl(this,"async_queue_retry"),this.oc=()=>{const r=ji();r&&D(uc,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=ji();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=ji();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise((()=>{}));const t=new Tt;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Zu.push(e),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!$n(e))throw e;D(uc,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(e){const t=this._c.then((()=>(this.nc=!0,e().catch((r=>{throw this.tc=r,this.nc=!1,St("INTERNAL UNHANDLED ERROR: ",dc(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=zs.createAndSchedule(this,e,t,r,(o=>this.lc(o)));return this.ec.push(i),i}ac(){this.tc&&x(47125,{hc:dc(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then((()=>{this.ec.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()}))}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function dc(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class tu extends Gs{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new hc,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new hc(e),this._firestoreClient=void 0,await e}}}function b_(n,e){const t=typeof n=="object"?n:ms(),r=typeof n=="string"?n:xr,i=Kr(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=Ec("firestore");o&&Xg(i,...o)}return i}function Yg(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Zg(n),n._firestoreClient}function Zg(n){var e,t,r;const i=n._freezeSettings(),o=(function(u,h,f,_){return new Kp(u,h,f,_.host,_.ssl,_.experimentalForceLongPolling,_.experimentalAutoDetectLongPolling,Zl(_.experimentalLongPollingOptions),_.useFetchStreams,_.isUsingEmulator)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Wg(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&(function(u){const h=u?._online.build();return{_offline:u?._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ce(xe.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ce(xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ce._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(jn(e,Ce._jsonSchema))return Ce.fromBase64String(e.bytes)}}Ce._jsonSchemaVersion="firestore/bytes/1.0",Ce._jsonSchema={type:te("string",Ce._jsonSchemaVersion),bytes:te("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return j(this._lat,e._lat)||j(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ge._jsonSchemaVersion}}static fromJSON(e){if(jn(e,Ge._jsonSchema))return new Ge(e.latitude,e.longitude)}}Ge._jsonSchemaVersion="firestore/geoPoint/1.0",Ge._jsonSchema={type:te("string",Ge._jsonSchemaVersion),latitude:te("number"),longitude:te("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:We._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(jn(e,We._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new We(e.vectorValues);throw new V(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}We._jsonSchemaVersion="firestore/vectorValue/1.0",We._jsonSchema={type:te("string",We._jsonSchemaVersion),vectorValues:te("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_=/^__.*__$/;class nu{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Nt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ru(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ec:n})}}class ai{constructor(e,t,r,i,o,c){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=c||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new ai(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Gr(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(ru(this.Ec)&&e_.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class t_{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ti(e)}Dc(e,t,r,i=!1){return new ai({Ec:e,methodName:t,bc:r,path:ce.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function n_(n){const e=n._freezeSettings(),t=ti(n._databaseId);return new t_(n._databaseId,!!e.ignoreUndefinedProperties,t)}class ci extends oi{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ci}}function r_(n,e,t){return new ai({Ec:3,bc:e.settings.bc,methodName:n._methodName,mc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Ks extends oi{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=r_(this,e,!0),r=this.vc.map((o=>Gn(o,t))),i=new Xt(r);return new Im(e.path,i)}isEqual(e){return e instanceof Ks&&ct(this.vc,e.vc)}}function i_(n,e,t,r){const i=n.Dc(1,e,t);su("Data must be an object, but it was:",i,r);const o=[],c=Re.empty();kt(r,((h,f)=>{const _=Qs(e,h,t);f=Te(f);const w=i.gc(_);if(f instanceof ci)o.push(_);else{const A=Gn(f,w);A!=null&&(o.push(_),c.set(_,A))}}));const u=new De(o);return new nu(c,u,i.fieldTransforms)}function s_(n,e,t,r,i,o){const c=n.Dc(1,e,t),u=[fc(e,r,t)],h=[i];if(o.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let A=0;A<o.length;A+=2)u.push(fc(e,o[A])),h.push(o[A+1]);const f=[],_=Re.empty();for(let A=u.length-1;A>=0;--A)if(!c_(f,u[A])){const C=u[A];let k=h[A];k=Te(k);const O=c.gc(C);if(k instanceof ci)f.push(C);else{const N=Gn(k,O);N!=null&&(f.push(C),_.set(C,N))}}const w=new De(f);return new nu(_,w,c.fieldTransforms)}function Gn(n,e){if(iu(n=Te(n)))return su("Unsupported field value:",e,n),o_(n,e);if(n instanceof oi)return(function(r,i){if(!ru(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return(function(r,i){const o=[];let c=0;for(const u of r){let h=Gn(u,i.yc(c));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),c++}return{arrayValue:{values:o}}})(n,e)}return(function(r,i){if((r=Te(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return vm(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Q.fromDate(r);return{timestampValue:ss(i.serializer,o)}}if(r instanceof Q){const o=new Q(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ss(i.serializer,o)}}if(r instanceof Ge)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ce)return{bytesValue:Vm(i.serializer,r._byteString)};if(r instanceof _e){const o=i.databaseId,c=r.firestore._databaseId;if(!c.isEqual(o))throw i.wc(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Bl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof We)return(function(c,u){return{mapValue:{fields:{[yl]:{stringValue:vl},[es]:{arrayValue:{values:c.toArray().map((f=>{if(typeof f!="number")throw u.wc("VectorValues must only contain numeric values.");return Bs(u.serializer,f)}))}}}}}})(r,i);throw i.wc(`Unsupported field value: ${Cs(r)}`)})(n,e)}function o_(n,e){const t={};return fl(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):kt(n,((r,i)=>{const o=Gn(i,e.Vc(r));o!=null&&(t[r]=o)})),{mapValue:{fields:t}}}function iu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Q||n instanceof Ge||n instanceof Ce||n instanceof _e||n instanceof oi||n instanceof We)}function su(n,e,t){if(!iu(t)||!hl(t)){const r=Cs(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function fc(n,e,t){if((e=Te(e))instanceof si)return e._internalPath;if(typeof e=="string")return Qs(n,e);throw Gr("Field path arguments must be of type string or ",n,!1,void 0,t)}const a_=new RegExp("[~\\*/\\[\\]]");function Qs(n,e,t){if(e.search(a_)>=0)throw Gr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new si(...e.split("."))._internalPath}catch{throw Gr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Gr(n,e,t,r,i){const o=r&&!r.isEmpty(),c=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||c)&&(h+=" (found",o&&(h+=` in field ${r}`),c&&(h+=` in document ${i}`),h+=")"),new V(P.INVALID_ARGUMENT,u+n+h)}function c_(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e,t,r,i,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new l_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(au("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class l_ extends ou{data(){return super.data()}}function au(n,e){return typeof e=="string"?Qs(n,e):e instanceof si?e._internalPath:e._delegate._internalPath}class yr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ht extends ou{constructor(e,t,r,i,o,c){super(e,t,r,i,c),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Pr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(au("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Ht._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Ht._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ht._jsonSchema={type:te("string",Ht._jsonSchemaVersion),bundleSource:te("string","DocumentSnapshot"),bundleName:te("string"),bundle:te("string")};class Pr extends Ht{data(e={}){return super.data(e)}}class bn{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new yr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Pr(this._firestore,this._userDataWriter,r.key,r,new yr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let c=0;return i._snapshot.docChanges.map((u=>{const h=new Pr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new yr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:c++}}))}{let c=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((u=>o||u.type!==3)).map((u=>{const h=new Pr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new yr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,_=-1;return u.type!==0&&(f=c.indexOf(u.doc.key),c=c.delete(u.doc.key)),u.type!==1&&(c=c.add(u.doc),_=c.indexOf(u.doc.key)),{type:u_(u.type),doc:h,oldIndex:f,newIndex:_}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=bn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=bs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(t.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function u_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}bn._jsonSchemaVersion="firestore/querySnapshot/1.0",bn._jsonSchema={type:te("string",bn._jsonSchemaVersion),bundleSource:te("string","QuerySnapshot"),bundleName:te("string"),bundle:te("string")};function C_(n,e,t,...r){n=Zi(n,_e);const i=Zi(n.firestore,tu),o=n_(i);let c;return c=typeof(e=Te(e))=="string"||e instanceof si?s_(o,"updateDoc",n._key,e,t,r):i_(o,"updateDoc",n._key,e),h_(i,[c.toMutation(n._key,ze.exists(!0))])}function h_(n,e){return(function(r,i){const o=new Tt;return r.asyncQueue.enqueueAndForget((async()=>jg(await Jg(r),i,o))),o.promise})(Yg(n),e)}function k_(...n){return new Ks("arrayUnion",n)}(function(e,t=!0){(function(i){tn=i})(Zt),wt(new lt("firestore",((r,{instanceIdentifier:i,options:o})=>{const c=r.getProvider("app").getImmediate(),u=new tu(new Pp(r.getProvider("auth-internal")),new kp(c,r.getProvider("app-check-internal")),(function(f,_){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ur(f.options.projectId,_)})(c,i),c);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),Oe(Sa,Pa,e),Oe(Sa,Pa,"esm2017")})();var d_="firebase",f_="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe(d_,f_,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e,t,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,be(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(o=>this.auth=o,()=>{}),this.messaging||r.get().then(o=>this.messaging=o,()=>{}),this.appCheck||i?.get().then(o=>this.appCheck=o,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us="us-central1";class m_{constructor(e,t,r,i,o=us,c=(...u)=>fetch(...u)){this.app=e,this.fetchImpl=c,this.emulatorOrigin=null,this.contextProvider=new p_(e,t,r,i),this.cancelAllRequests=new Promise(u=>{this.deleteService=()=>Promise.resolve(u())});try{const u=new URL(o);this.customDomain=u.origin+(u.pathname==="/"?"":u.pathname),this.region=us}catch{this.customDomain=null,this.region=o}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function g_(n,e,t){const r=Ct(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&(hs(n.emulatorOrigin),ds("Functions",!0))}const pc="@firebase/functions",mc="0.12.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const __="auth-internal",y_="app-check-internal",v_="messaging-internal";function E_(n){const e=(t,{instanceIdentifier:r})=>{const i=t.getProvider("app").getImmediate(),o=t.getProvider(__),c=t.getProvider(v_),u=t.getProvider(y_);return new m_(i,o,c,u,r)};wt(new lt(cu,e,"PUBLIC").setMultipleInstances(!0)),Oe(pc,mc,n),Oe(pc,mc,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(n=ms(),e=us){const r=Kr(Te(n),cu).getImmediate({identifier:e}),i=Ec("functions");return i&&T_(r,...i),r}function T_(n,e,t){g_(Te(n),e,t)}E_();export{lt as C,Ln as E,Xe as F,wt as _,R_ as a,b_ as b,D_ as c,P_ as d,k_ as e,Kr as f,A_ as g,Te as h,gd as i,ms as j,lh as k,I_ as l,w_ as m,Oh as o,Oe as r,C_ as u,uh as v};

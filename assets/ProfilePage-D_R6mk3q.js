import{j as i}from"./motion-BWLjIqtK.js";import{b as g,L as Ce}from"./react-CP9hZ00F.js";import{u as se,k as Pe,n as Oe,o as De,B as Me,L as Re}from"./index-CKNq54p_.js";import{r as y,_ as T,C as I,n as q,E as oe,p as K,F as Fe,t as ie,v as qe,x as Ke,y as Le,z as $e,A as j}from"./firebase-VNdk7pcS.js";import{B as _}from"./Button-Cn0ncopA.js";import{B as Be}from"./Badge-BnwGsXX5.js";import{M as Ve}from"./mail-DpZuSORg.js";import{P as He}from"./phone-iZD8F9Pm.js";import{M as Ue}from"./map-pin-CYkdXJvy.js";import{C}from"./circle-check-al0NIoIq.js";import{D as We}from"./download-_l0-4IKe.js";import"./circle-x-C4bz-KT3.js";import"./clock-BLbuz0ra.js";import"./triangle-exclamation-point-CulSrBfK.js";const re="@firebase/installations",L="0.6.18";/**
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
 */const ae=1e4,ce=`w:${L}`,de="FIS_v2",Ge="https://firebaseinstallations.googleapis.com/v1",ze=3600*1e3,Je="installations",Ye="Installations";/**
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
 */const Xe={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},h=new oe(Je,Ye,Xe);function le(e){return e instanceof Fe&&e.code.includes("request-failed")}/**
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
 */function ue({projectId:e}){return`${Ge}/projects/${e}/installations`}function fe(e){return{token:e.token,requestStatus:2,expiresIn:Ze(e.expiresIn),creationTime:Date.now()}}async function pe(e,t){const s=(await t.json()).error;return h.create("request-failed",{requestName:e,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function ge({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Qe(e,{refreshToken:t}){const n=ge(e);return n.append("Authorization",et(t)),n}async function me(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Ze(e){return Number(e.replace("s","000"))}function et(e){return`${de} ${e}`}/**
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
 */async function tt({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const s=ue(e),o=ge(e),r=t.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&o.append("x-firebase-client",l)}const a={fid:n,authVersion:de,appId:e.appId,sdkVersion:ce},d={method:"POST",headers:o,body:JSON.stringify(a)},u=await me(()=>fetch(s,d));if(u.ok){const l=await u.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:fe(l.authToken)}}else throw await pe("Create Installation",u)}/**
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
 */function he(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function nt(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const st=/^[cdef][\w-]{21}$/,F="";function ot(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=it(e);return st.test(n)?n:F}catch{return F}}function it(e){return nt(e).substr(0,22)}/**
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
 */function A(e){return`${e.appName}!${e.appId}`}/**
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
 */const we=new Map;function be(e,t){const n=A(e);xe(n,t),rt(n,t)}function xe(e,t){const n=we.get(e);if(n)for(const s of n)s(t)}function rt(e,t){const n=at();n&&n.postMessage({key:e,fid:t}),ct()}let m=null;function at(){return!m&&"BroadcastChannel"in self&&(m=new BroadcastChannel("[Firebase] FID Change"),m.onmessage=e=>{xe(e.data.key,e.data.fid)}),m}function ct(){we.size===0&&m&&(m.close(),m=null)}/**
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
 */const dt="firebase-installations-database",lt=1,w="firebase-installations-store";let P=null;function $(){return P||(P=K(dt,lt,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(w)}}})),P}async function S(e,t){const n=A(e),o=(await $()).transaction(w,"readwrite"),r=o.objectStore(w),a=await r.get(n);return await r.put(t,n),await o.done,(!a||a.fid!==t.fid)&&be(e,t.fid),t}async function ve(e){const t=A(e),s=(await $()).transaction(w,"readwrite");await s.objectStore(w).delete(t),await s.done}async function N(e,t){const n=A(e),o=(await $()).transaction(w,"readwrite"),r=o.objectStore(w),a=await r.get(n),d=t(a);return d===void 0?await r.delete(n):await r.put(d,n),await o.done,d&&(!a||a.fid!==d.fid)&&be(e,d.fid),d}/**
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
 */async function B(e){let t;const n=await N(e.appConfig,s=>{const o=ut(s),r=ft(e,o);return t=r.registrationPromise,r.installationEntry});return n.fid===F?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function ut(e){const t=e||{fid:ot(),registrationStatus:0};return ke(t)}function ft(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(h.create("app-offline"));return{installationEntry:t,registrationPromise:o}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},s=pt(e,n);return{installationEntry:n,registrationPromise:s}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:gt(e)}:{installationEntry:t}}async function pt(e,t){try{const n=await tt(e,t);return S(e.appConfig,n)}catch(n){throw le(n)&&n.customData.serverCode===409?await ve(e.appConfig):await S(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function gt(e){let t=await z(e.appConfig);for(;t.registrationStatus===1;)await he(100),t=await z(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:s}=await B(e);return s||n}return t}function z(e){return N(e,t=>{if(!t)throw h.create("installation-not-found");return ke(t)})}function ke(e){return mt(e)?{fid:e.fid,registrationStatus:0}:e}function mt(e){return e.registrationStatus===1&&e.registrationTime+ae<Date.now()}/**
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
 */async function ht({appConfig:e,heartbeatServiceProvider:t},n){const s=wt(e,n),o=Qe(e,n),r=t.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&o.append("x-firebase-client",l)}const a={installation:{sdkVersion:ce,appId:e.appId}},d={method:"POST",headers:o,body:JSON.stringify(a)},u=await me(()=>fetch(s,d));if(u.ok){const l=await u.json();return fe(l)}else throw await pe("Generate Auth Token",u)}function wt(e,{fid:t}){return`${ue(e)}/${t}/authTokens:generate`}/**
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
 */async function V(e,t=!1){let n;const s=await N(e.appConfig,r=>{if(!ye(r))throw h.create("not-registered");const a=r.authToken;if(!t&&vt(a))return r;if(a.requestStatus===1)return n=bt(e,t),r;{if(!navigator.onLine)throw h.create("app-offline");const d=yt(r);return n=xt(e,d),d}});return n?await n:s.authToken}async function bt(e,t){let n=await J(e.appConfig);for(;n.authToken.requestStatus===1;)await he(100),n=await J(e.appConfig);const s=n.authToken;return s.requestStatus===0?V(e,t):s}function J(e){return N(e,t=>{if(!ye(t))throw h.create("not-registered");const n=t.authToken;return Tt(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function xt(e,t){try{const n=await ht(e,t),s=Object.assign(Object.assign({},t),{authToken:n});return await S(e.appConfig,s),n}catch(n){if(le(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ve(e.appConfig);else{const s=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await S(e.appConfig,s)}throw n}}function ye(e){return e!==void 0&&e.registrationStatus===2}function vt(e){return e.requestStatus===2&&!kt(e)}function kt(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+ze}function yt(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function Tt(e){return e.requestStatus===1&&e.requestTime+ae<Date.now()}/**
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
 */async function It(e){const t=e,{installationEntry:n,registrationPromise:s}=await B(t);return s?s.catch(console.error):V(t).catch(console.error),n.fid}/**
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
 */async function St(e,t=!1){const n=e;return await At(n),(await V(n,t)).token}async function At(e){const{registrationPromise:t}=await B(e);t&&await t}/**
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
 */function Nt(e){if(!e||!e.options)throw O("App Configuration");if(!e.name)throw O("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw O(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function O(e){return h.create("missing-app-config-values",{valueName:e})}/**
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
 */const Te="installations",Et="installations-internal",jt=e=>{const t=e.getProvider("app").getImmediate(),n=Nt(t),s=q(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},_t=e=>{const t=e.getProvider("app").getImmediate(),n=q(t,Te).getImmediate();return{getId:()=>It(n),getToken:o=>St(n,o)}};function Ct(){T(new I(Te,jt,"PUBLIC")),T(new I(Et,_t,"PRIVATE"))}Ct();y(re,L);y(re,L,"esm2017");/**
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
 */const Pt="/firebase-messaging-sw.js",Ot="/firebase-cloud-messaging-push-scope",Ie="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Dt="https://fcmregistrations.googleapis.com/v1",Se="google.c.a.c_id",Mt="google.c.a.c_l",Rt="google.c.a.ts",Ft="google.c.a.e",Y=1e4;var X;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(X||(X={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var x;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(x||(x={}));/**
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
 */function p(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function qt(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(n),o=new Uint8Array(s.length);for(let r=0;r<s.length;++r)o[r]=s.charCodeAt(r);return o}/**
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
 */const D="fcm_token_details_db",Kt=5,Q="fcm_token_object_Store";async function Lt(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(D))return null;let t=null;return(await K(D,Kt,{upgrade:async(s,o,r,a)=>{var d;if(o<2||!s.objectStoreNames.contains(Q))return;const u=a.objectStore(Q),l=await u.index("fcmSenderId").get(e);if(await u.clear(),!!l){if(o===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;t={token:c.fcmToken,createTime:(d=c.createTime)!==null&&d!==void 0?d:Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:p(c.vapidKey)}}}else if(o===3){const c=l;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:p(c.auth),p256dh:p(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:p(c.vapidKey)}}}else if(o===4){const c=l;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:p(c.auth),p256dh:p(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:p(c.vapidKey)}}}}}})).close(),await j(D),await j("fcm_vapid_details_db"),await j("undefined"),$t(t)?t:null}function $t(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */const Bt="firebase-messaging-database",Vt=1,v="firebase-messaging-store";let M=null;function Ae(){return M||(M=K(Bt,Vt,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(v)}}})),M}async function Ht(e){const t=Ne(e),s=await(await Ae()).transaction(v).objectStore(v).get(t);if(s)return s;{const o=await Lt(e.appConfig.senderId);if(o)return await H(e,o),o}}async function H(e,t){const n=Ne(e),o=(await Ae()).transaction(v,"readwrite");return await o.objectStore(v).put(t,n),await o.done,t}function Ne({appConfig:e}){return e.appId}/**
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
 */const Ut={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},f=new oe("messaging","Messaging",Ut);/**
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
 */async function Wt(e,t){const n=await W(e),s=Ee(t),o={method:"POST",headers:n,body:JSON.stringify(s)};let r;try{r=await(await fetch(U(e.appConfig),o)).json()}catch(a){throw f.create("token-subscribe-failed",{errorInfo:a?.toString()})}if(r.error){const a=r.error.message;throw f.create("token-subscribe-failed",{errorInfo:a})}if(!r.token)throw f.create("token-subscribe-no-token");return r.token}async function Gt(e,t){const n=await W(e),s=Ee(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(s)};let r;try{r=await(await fetch(`${U(e.appConfig)}/${t.token}`,o)).json()}catch(a){throw f.create("token-update-failed",{errorInfo:a?.toString()})}if(r.error){const a=r.error.message;throw f.create("token-update-failed",{errorInfo:a})}if(!r.token)throw f.create("token-update-no-token");return r.token}async function zt(e,t){const s={method:"DELETE",headers:await W(e)};try{const r=await(await fetch(`${U(e.appConfig)}/${t}`,s)).json();if(r.error){const a=r.error.message;throw f.create("token-unsubscribe-failed",{errorInfo:a})}}catch(o){throw f.create("token-unsubscribe-failed",{errorInfo:o?.toString()})}}function U({projectId:e}){return`${Dt}/projects/${e}/registrations`}async function W({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Ee({p256dh:e,auth:t,endpoint:n,vapidKey:s}){const o={web:{endpoint:n,auth:t,p256dh:e}};return s!==Ie&&(o.web.applicationPubKey=s),o}/**
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
 */const Jt=10080*60*1e3;async function Yt(e){const t=await Qt(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:p(t.getKey("auth")),p256dh:p(t.getKey("p256dh"))},s=await Ht(e.firebaseDependencies);if(s){if(Zt(s.subscriptionOptions,n))return Date.now()>=s.createTime+Jt?Xt(e,{token:s.token,createTime:Date.now(),subscriptionOptions:n}):s.token;try{await zt(e.firebaseDependencies,s.token)}catch(o){console.warn(o)}return Z(e.firebaseDependencies,n)}else return Z(e.firebaseDependencies,n)}async function Xt(e,t){try{const n=await Gt(e.firebaseDependencies,t),s=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await H(e.firebaseDependencies,s),n}catch(n){throw n}}async function Z(e,t){const s={token:await Wt(e,t),createTime:Date.now(),subscriptionOptions:t};return await H(e,s),s.token}async function Qt(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:qt(t)})}function Zt(e,t){const n=t.vapidKey===e.vapidKey,s=t.endpoint===e.endpoint,o=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&s&&o&&r}/**
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
 */function ee(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return en(t,e),tn(t,e),nn(t,e),t}function en(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const s=t.notification.body;s&&(e.notification.body=s);const o=t.notification.image;o&&(e.notification.image=o);const r=t.notification.icon;r&&(e.notification.icon=r)}function tn(e,t){t.data&&(e.data=t.data)}function nn(e,t){var n,s,o,r,a;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};const d=(o=(s=t.fcmOptions)===null||s===void 0?void 0:s.link)!==null&&o!==void 0?o:(r=t.notification)===null||r===void 0?void 0:r.click_action;d&&(e.fcmOptions.link=d);const u=(a=t.fcmOptions)===null||a===void 0?void 0:a.analytics_label;u&&(e.fcmOptions.analyticsLabel=u)}/**
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
 */function sn(e){return typeof e=="object"&&!!e&&Se in e}/**
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
 */function on(e){if(!e||!e.options)throw R("App Configuration Object");if(!e.name)throw R("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const s of t)if(!n[s])throw R(s);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function R(e){return f.create("missing-app-config-values",{valueName:e})}/**
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
 */class rn{constructor(t,n,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const o=on(t);this.firebaseDependencies={app:t,appConfig:o,installations:n,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
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
 */async function an(e){try{e.swRegistration=await navigator.serviceWorker.register(Pt,{scope:Ot}),e.swRegistration.update().catch(()=>{}),await cn(e.swRegistration)}catch(t){throw f.create("failed-service-worker-registration",{browserErrorMessage:t?.message})}}async function cn(e){return new Promise((t,n)=>{const s=setTimeout(()=>n(new Error(`Service worker not registered after ${Y} ms`)),Y),o=e.installing||e.waiting;e.active?(clearTimeout(s),t()):o?o.onstatechange=r=>{var a;((a=r.target)===null||a===void 0?void 0:a.state)==="activated"&&(o.onstatechange=null,clearTimeout(s),t())}:(clearTimeout(s),n(new Error("No incoming service worker found.")))})}/**
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
 */async function dn(e,t){if(!t&&!e.swRegistration&&await an(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw f.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function ln(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Ie)}/**
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
 */async function je(e,t){if(!navigator)throw f.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw f.create("permission-blocked");return await ln(e,t?.vapidKey),await dn(e,t?.serviceWorkerRegistration),Yt(e)}/**
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
 */async function un(e,t,n){const s=fn(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:n[Se],message_name:n[Mt],message_time:n[Rt],message_device_time:Math.floor(Date.now()/1e3)})}function fn(e){switch(e){case x.NOTIFICATION_CLICKED:return"notification_open";case x.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function pn(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===x.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(ee(n)):e.onMessageHandler.next(ee(n)));const s=n.data;sn(s)&&s[Ft]==="1"&&await un(e,n.messageType,s)}const te="@firebase/messaging",ne="0.12.22";/**
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
 */const gn=e=>{const t=new rn(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>pn(t,n)),t},mn=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:s=>je(t,s)}};function hn(){T(new I("messaging",gn,"PUBLIC")),T(new I("messaging-internal",mn,"PRIVATE")),y(te,ne),y(te,ne,"esm2017")}/**
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
 */async function wn(){try{await Ke()}catch{return!1}return typeof window<"u"&&Le()&&$e()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function bn(e=qe()){return wn().then(t=>{if(!t)throw f.create("unsupported-browser")},t=>{throw f.create("indexed-db-unsupported")}),q(ie(e),"messaging").getImmediate()}async function xn(e,t){return e=ie(e),je(e,t)}hn();function vn(){const{appUser:e}=se(),[t,n]=g.useState("default"),[s,o]=g.useState(!1),[r,a]=g.useState(!1);return g.useEffect(()=>{typeof window<"u"&&"Notification"in window&&"serviceWorker"in navigator&&(o(!0),n(Notification.permission))},[]),{supported:s,permission:t,requesting:r,requestPushPermission:async()=>{if(!(!s||!e)){a(!0);try{const u=await Notification.requestPermission();if(n(u),u==="granted"){console.warn("VITE_FIREBASE_VAPID_KEY not configured in env");return}}catch(u){console.warn("Push registration error:",u)}finally{a(!1)}}}}}const Mn=()=>{const{appUser:e,role:t,logout:n}=se(),{theme:s,setTheme:o}=De(),{supported:r,permission:a,requesting:d,requestPushPermission:u}=vn(),[l,c]=g.useState(null),[E,b]=g.useState(!1);g.useEffect(()=>{const k=G=>{G.preventDefault(),c(G)};return window.addEventListener("beforeinstallprompt",k),window.matchMedia("(display-mode: standalone)").matches&&b(!0),()=>window.removeEventListener("beforeinstallprompt",k)},[]);const _e=async()=>{if(!l)return;l.prompt();const{outcome:k}=await l.userChoice;k==="accepted"&&(b(!0),c(null))};return i.jsxs("div",{className:"flex flex-col gap-6 max-w-2xl mx-auto animate-fadeIn",children:[i.jsxs("div",{className:"rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left",children:[i.jsx("div",{className:"w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-violet-500/20 shrink-0",children:e?.name?e.name.charAt(0).toUpperCase():"T"}),i.jsxs("div",{className:"flex-1 min-w-0",children:[i.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2",children:[i.jsx("h1",{className:"text-xl font-bold text-slate-900 dark:text-white truncate",children:e?.name||"Trainer"}),i.jsxs("div",{className:"flex justify-center sm:justify-end gap-1.5",children:[i.jsx(Be,{status:e?.status||"Approved"}),t==="admin"&&i.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",children:"Admin"})]})]}),i.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-slate-600 dark:text-slate-400",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(Ve,{className:"w-4 h-4 text-slate-400"}),i.jsx("span",{className:"truncate",children:e?.email})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(He,{className:"w-4 h-4 text-slate-400"}),i.jsx("span",{children:e?.phone||"No phone added"})]}),i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx(Ue,{className:"w-4 h-4 text-slate-400"}),i.jsxs("span",{children:["State: ",i.jsx("strong",{children:e?.state||"Unassigned"})]})]})]})]})]}),i.jsxs(Ce,{to:"/my-performance",className:"rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-purple-500/10 dark:from-violet-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 p-5 shadow-sm hover:border-violet-500 transition-all flex items-center justify-between gap-4 group",children:[i.jsxs("div",{className:"flex items-center gap-3",children:[i.jsx("div",{className:"w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20",children:i.jsx(C,{className:"w-5 h-5"})}),i.jsxs("div",{children:[i.jsx("h3",{className:"text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors",children:"My Field Performance & Impact"}),i.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:"View your completion rate %, total students trained, and school log history."})]})]}),i.jsxs("span",{className:"text-xs font-bold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1 shrink-0",children:[i.jsx("span",{children:"Scorecard"}),i.jsx("span",{className:"text-base leading-none",children:"→"})]})]}),i.jsxs("div",{className:"rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-5",children:[i.jsx("h3",{className:"text-sm font-bold text-slate-900 dark:text-white",children:"App Preferences"}),i.jsxs("div",{className:"flex items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-xs font-semibold text-slate-800 dark:text-slate-200",children:"Install TrainerPlan PWA"}),i.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400 mt-0.5",children:"Add app to your home screen for quick offline access and smooth performance."})]}),E?i.jsxs("span",{className:"inline-flex items-center gap-1 text-xs font-semibold text-emerald-600",children:[i.jsx(C,{className:"w-4 h-4"}),i.jsx("span",{children:"Installed"})]}):i.jsx(_,{variant:"outline",size:"sm",disabled:!l,onClick:_e,icon:i.jsx(We,{className:"w-4 h-4 text-violet-600"}),children:"Install App"})]}),i.jsxs("div",{className:"flex items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-xs font-semibold text-slate-800 dark:text-slate-200",children:"Push Notifications (FCM)"}),i.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400 mt-0.5",children:"Get timely reminder alerts at 6:00 PM IST before your daily work is due."})]}),a==="granted"?i.jsxs("span",{className:"inline-flex items-center gap-1 text-xs font-semibold text-emerald-600",children:[i.jsx(C,{className:"w-4 h-4"}),i.jsx("span",{children:"Enabled"})]}):i.jsx(_,{variant:"outline",size:"sm",loading:d,disabled:!r,onClick:u,icon:i.jsx(Me,{className:"w-4 h-4 text-amber-500"}),children:"Enable Push"})]}),i.jsxs("div",{className:"flex items-center justify-between gap-4 py-2",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-xs font-semibold text-slate-800 dark:text-slate-200",children:"Theme"}),i.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400 mt-0.5",children:"Choose your preferred interface appearance."})]}),i.jsxs("div",{className:"flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1",children:[i.jsx("button",{onClick:()=>o("light"),className:`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${s==="light"?"bg-white text-violet-600 shadow-sm":"text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"}`,children:"Light"}),i.jsx("button",{onClick:()=>o("dark"),className:`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${s==="dark"?"bg-slate-800 text-violet-400 shadow-sm":"text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"}`,children:"Dark"}),i.jsx("button",{onClick:()=>o("system"),className:`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${s==="system"?"bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm":"text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"}`,children:"System"})]})]})]}),i.jsx("div",{className:"flex justify-end pt-2",children:i.jsx(_,{variant:"danger",size:"md",onClick:n,icon:i.jsx(Re,{className:"w-4 h-4"}),children:"Sign Out of Account"})})]})};export{Mn as ProfilePage};

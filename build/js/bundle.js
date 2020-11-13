/*! For license information please see bundle.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vengarl",[],t):"object"==typeof exports?exports.vengarl=t():e.vengarl=t()}(self,(function(){return(()=>{var e={387:(e,t,s)=>{"use strict";let n,i;(()=>{const e=new Map;function t(t,n){return{id:t,import:n=>async function(t,n){let i=t.replace(/\.\w+$/i,"");if(i.includes("./")){const[e,...t]=i.split("/").reverse(),[,...s]=n.split("/").reverse(),r=[e];let o,l=0;for(;o=t.shift();)if(".."===o)l++;else{if("."===o)break;r.push(o)}l<s.length&&r.push(...s.slice(l)),i=r.reverse().join("/")}return e.has(i)?o(i):Promise.resolve().then((()=>s(607)(t)))}(n,t),meta:{url:t,main:n}}}function r(e){return(t,s)=>{s="string"==typeof t?{[t]:s}:t;for(const[t,n]of Object.entries(s))Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0})}}async function o(t){if(!e.has(t))return;const s=e.get(t);if(s.s){const{d:e,e:t,s:n}=s;delete s.s,delete s.e;for(let t=0;t<n.length;t++)n[t](await o(e[t]));const i=t();i&&await i}return s.exp}function l(t){if(!e.has(t))return;const s=e.get(t);if(s.s){const{d:e,e:t,s:n}=s;delete s.s,delete s.e;for(let t=0;t<n.length;t++)n[t](l(e[t]));t()}return s.exp}n={register(t,s,n){e.set(t,{d:s,f:n,exp:{}})}},i=(s,a)=>(n=i=void 0,function(s){for(const[n,i]of e.entries()){const{f:e,exp:o}=i,{execute:l,setters:a}=e(r(o),t(n,n===s));delete i.f,i.e=l,i.s=a}}(s),a?o(s):l(s))})(),n.register("version",[],(function(e,t){return t&&t.id,{setters:[],execute:function(){e("default","3.0.5")}}})),n.register("mod",["version"],(function(e,t){var s,n,i;return t&&t.id,{setters:[function(e){s=e}],execute:function(){n={digits:[48,58],lowerCase:[97,123],upperCase:[65,91]},i={dictionary:[],shuffle:!0,debug:!1,length:6},e("default",class extends Function{constructor(e={}){super(),this.dictIndex=0,this.dictRange=[],this.lowerBound=0,this.upperBound=0,this.dictLength=0;const t={...i,...e};this.counter=0,this.debug=!1,this.dict=[],this.version=s.default;const{dictionary:r,shuffle:o,length:l}=t;if(this.uuidLength=l,r&&r.length>1)this.setDictionary(r);else{let e;this.dictIndex=e=0,Object.keys(n).forEach((t=>{const s=t;for(this.dictRange=n[s],this.lowerBound=this.dictRange[0],this.upperBound=this.dictRange[1],this.dictIndex=e=this.lowerBound;this.lowerBound<=this.upperBound?e<this.upperBound:e>this.upperBound;this.dictIndex=this.lowerBound<=this.upperBound?e+=1:e-=1)this.dict.push(String.fromCharCode(this.dictIndex))}))}if(o){const e=.5;this.setDictionary(this.dict.sort((()=>Math.random()-e)))}else this.setDictionary(this.dict);return this.debug=t.debug,this.log(this.dict),this.log("Generator instantiated with Dictionary Size "+this.dictLength),new Proxy(this,{apply:(e,t,s)=>this.randomUUID(...s)})}log(...e){const t=[...e];if(t[0]="[short-unique-id] "+e[0],!0===this.debug&&"undefined"!=typeof console&&null!==console)return console.log(...t)}setDictionary(e){this.dict=e,this.dictLength=this.dict.length,this.counter=0}seq(){return this.sequentialUUID()}sequentialUUID(){let e,t,s="";for(e=this.counter;t=e%this.dictLength,e=Math.trunc(e/this.dictLength),s+=this.dict[t],0!==e;);return this.counter+=1,s}randomUUID(e=this.uuidLength||6){let t,s,n,i;if(null==e||e<1)throw new Error("Invalid UUID Length Provided");for(t="",i=n=0;0<=e?n<e:n>e;i=0<=e?n+=1:n-=1)s=parseInt((Math.random()*this.dictLength).toFixed(0),10)%this.dictLength,t+=this.dict[s];return t}availableUUIDs(e=this.uuidLength){return parseFloat(Math.pow([...new Set(this.dict)].length,e).toFixed(0))}approxMaxBeforeCollision(e=this.availableUUIDs(this.uuidLength)){return parseFloat(Math.sqrt(Math.PI/2*e).toFixed(20))}collisionProbability(e=this.availableUUIDs(this.uuidLength),t=this.uuidLength){return parseFloat((this.approxMaxBeforeCollision(e)/this.availableUUIDs(t)).toFixed(20))}uniqueness(e=this.availableUUIDs(this.uuidLength)){const t=parseFloat((1-this.approxMaxBeforeCollision(e)/e).toFixed(20));return t>1?1:t<0?0:t}getVersion(){return this.version}})}}}));const r=i("mod",!1);t.Z=r.default},607:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=607,e.exports=t},906:(e,t,s)=>{"use strict";s.r(t),s.d(t,{addGlobalCSS:()=>P,createComp:()=>H,store:()=>I});const n=new WeakMap,i=e=>"function"==typeof e&&n.has(e),r="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},l={},a={},h=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${h}--\x3e`,u=new RegExp(`${h}|${c}`),d="$lit$";class p{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],i=document.createTreeWalker(t.content,133,null,!1);let r=0,o=-1,l=0;const{strings:a,values:{length:c}}=e;for(;l<c;){const e=i.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let n=0;for(let e=0;e<s;e++)g(t[e].name,d)&&n++;for(;n-- >0;){const t=a[l],s=_.exec(t)[2],n=s.toLowerCase()+d,i=e.getAttribute(n);e.removeAttribute(n);const r=i.split(u);this.parts.push({type:"attribute",index:o,name:s,strings:r}),l+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(h)>=0){const n=e.parentNode,i=t.split(u),r=i.length-1;for(let t=0;t<r;t++){let s,r=i[t];if(""===r)s=m();else{const e=_.exec(r);null!==e&&g(e[2],d)&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-d.length)+e[3]),s=document.createTextNode(r)}n.insertBefore(s,e),this.parts.push({type:"node",index:++o})}""===i[r]?(n.insertBefore(m(),e),s.push(e)):e.data=i[r],l+=r}}else if(8===e.nodeType)if(e.data===h){const t=e.parentNode;null!==e.previousSibling&&o!==r||(o++,t.insertBefore(m(),e)),r=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(s.push(e),o--),l++}else{let t=-1;for(;-1!==(t=e.data.indexOf(h,t+1));)this.parts.push({type:"node",index:-1}),l++}}else i.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const g=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},f=e=>-1!==e.index,m=()=>document.createComment(""),_=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class y{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,o=0,l=0,a=n.nextNode();for(;o<s.length;)if(i=s[o],f(i)){for(;l<i.index;)l++,"TEMPLATE"===a.nodeName&&(t.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=t.pop(),a=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${h} `;class x{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let n=0;n<e;n++){const e=this.strings[n],i=e.lastIndexOf("\x3c!--");s=(i>-1||s)&&-1===e.indexOf("--\x3e",i+1);const r=_.exec(e);t+=null===r?e+(s?b:c):e.substr(0,r.index)+r[1]+r[2]+d+r[3]+h}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class C{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new E(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!w(e))return e}let n="";for(let i=0;i<t;i++){n+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(S(e)||!w(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===l||S(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=l,e(this)}this.value!==l&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(m()),this.endNode=e.appendChild(m())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=m()),e.__insert(this.endNode=m())}insertAfterPart(e){e.__insert(this.startNode=m()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=l,e(this)}const e=this.__pendingValue;e!==l&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):w(e)?this.__commitIterable(e):e===a?(this.value=a,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const s=new y(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const i of e)s=t[n],void 0===s&&(s=new N(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(i),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){o(this.startNode.parentNode,e.nextSibling,this.endNode)}}class A{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=l,e(this)}if(this.__pendingValue===l)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=l}}class T extends C{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new L(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class L extends E{}let R=!1;(()=>{try{const e={get capture(){return R=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class j{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=l,e(this)}if(this.__pendingValue===l)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=V(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=l}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const V=e=>e&&(R?{capture:e.capture,passive:e.passive,once:e.once}:e.capture),O=new class{handleAttributeExpressions(e,t,s,n){const i=t[0];return"."===i?new T(e,t.slice(1),s).parts:"@"===i?[new j(e,t.slice(1),n.eventContext)]:"?"===i?[new A(e,t.slice(1),s)]:new C(e,t,s).parts}handleTextExpression(e){return new N(e)}};function M(e){let t=$.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},$.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(h);return s=t.keyString.get(n),void 0===s&&(s=new p(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const $=new Map,B=new WeakMap;"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const G=(e,...t)=>new x(e,t,"html",O),I=(()=>{const e=new Map,t="globals";return e.set(t,{}),{__add(t,s){return e.set(t,s),this},__get(t){return e.has(t)?e.get(t).state:this},__addToExisting(t,s){const n=e.get(t).state,i=Object.assign(Object.assign({},n),s);return e.get(t).state=i,this},__replace(t,s,n){return e.get(t).state[s]=n,this},remove(t){return e.delete(t),this},createGlobalState(e){for(const[t,s]of Object.entries(e)){if("function"==typeof s){this.getGlobal()[t]=s;continue}const e={val:s,corStates:[]};this.getGlobal()[t]=e}return this},subscribeToGlobal(e,t){const s=this.getGlobal();if(!s.hasOwnProperty(e))throw new Error(`The global state object doesn't have a "${e}" key.`);return s[e].corStates.push(t),this},setGlobal(t,s){let n=this.getGlobal()[t];return n||(n={val:s,corStates:[]},this.getGlobal()[t]=n.val),n.val=s,0!==n.corStates.length&&(n.corStates.forEach((t=>{e.get(t).ctx.__prepareUpdate()})),!0)},getGlobal:(s=null)=>s?e.get(t)[s].val:e.get(t),getGlobalValues(){const e={};let[t,s]=[null,null];for([t,s]of Object.entries(this.getGlobal()))s.hasOwnProperty("val")?e[t]=s.val:e[t]=s;return e},getGlobalState(){return Object.assign(Object.assign({},this.getGlobalValues()),{setGlobal:this.setGlobal,getGlobal:this.getGlobal})}}})(),U=new(s(387).Z)({length:8});function q(e,t,s=!1){const n=s?/(\r\n|\n|\r)/gm:/(\r\n|\n|\r|\s)/gm;return e.reduce(((e,s,i)=>{var r;return`${e}${s=s.replace(n,"")}${null!==(r=t[i])&&void 0!==r?r:""}`}),"")}function P(e,...t){const s=document.querySelector("style");s&&(s.innerHTML+=q(e,t,!0))}const k=(e,t)=>{"string"==typeof e&&(e=[e]);let s=null;Array.isArray(e)||(s=Object.keys(e),e=Object.values(e));let n=!0,i=[],r=[],o=null!==s?{}:[],l=null!==s?{}:[];const a=Promise.all(e.map(((e,s)=>{let n=t;Array.isArray(t)&&void 0!==t[s]&&(n=t[s]);const{req:o,getResponse:l,getError:a}=((e,t)=>{let s=!0,n=null,i=null;return{req:fetch(e,t).then((e=>(s=!1,i=e,e.json()))).catch((e=>(s=!1,n=e,e))),isLoading:()=>s,getResponse:()=>i,getError:()=>n}})(e,n);return r.push(l),i.push(a),o}))).then((e=>e)).catch((e=>e)).finally((()=>{n=!1,[r,i].forEach(((e,t)=>{const n=0===t?l:o;e.forEach(((e,t)=>{null!==s?n[s[t]]=e():n.push(e())}))}))}));return{req:new Promise(((e,t)=>{if(null!==s){const n={};return a.then((t=>(t.forEach(((e,t)=>{n[s[t]]=e})),e(n)))).catch((e=>t(e)))}return a.then((t=>e(t))).catch((e=>t(e)))})),isLoading:()=>n,getResponse:()=>l,getError:()=>o}},F=(e,t={},s=!1)=>s?((e,t)=>{const{req:s,isLoading:n,getResponse:i,getError:r}=k(e,t);return{req:s,isLoading:n,getResponse:i,getError:r}})(e,t):((e,t)=>{const s=(t,s,n)=>{let i="";"string"==typeof t?i=`${e}${t}`:Array.isArray(t)?i=t.map((t=>`${e}${t}`)):(i={},Object.keys(t).forEach((s=>{i[s]=`${e}${t[s]}`})));const{req:r,isLoading:o,getResponse:l,getError:a}=k(i,n);return s({req:r,isLoading:o,getResponse:l,getError:a})};return[(...e)=>{const[n,i]=(e=>{let t="",s=()=>null;if(2===e.length)t=e[0],s=e[1];else if(1===e.length)s=e[0];else if(0===e.length)throw new Error("post function needs at least 1 argument : a callback function");return[t,s]})(e),r=Object.assign(Object.assign({},t),{method:"get"});return s(n,i,r)},(...e)=>{const[n,i,r]=(e=>{let t,s="",n=()=>null;if(3===e.length)t=e[0],s=e[1],n=e[2];else if(2===e.length)t=e[0],n=e[1];else if(e.length<=1)throw new Error("post function needs at least 2 arguments, 1 : the data to post in object format, 2 : a callback function");return[t,s,n]})(e);let o;return o=Array.isArray(n)?n.reduce(((e,s)=>[...e,Object.assign(Object.assign({},t),{body:JSON.stringify(s),method:"post"})]),[]):Object.assign(Object.assign({},t),{body:JSON.stringify(n),method:"post"}),s(i,r,o)}]})(e,t),D=()=>new Error("ShadowRoot isn't yet attached to the dom yet, listen to onAttached lifecycle event");function H(e,t,s=!1){class n extends HTMLElement{constructor(){var e;super(),this.storeSymbol=Symbol(),this.attached=!1,this.setStateQueue=[],this.childrenComponents=[],this.cycleBeforeRender=()=>{},this.cycleAfterRender=()=>{},this.cycleBeforeFirstRender=()=>{},this.cycleAfterAttached=()=>{},this.cycleAfterRemoved=()=>{},this.shadowRootAccessor=this.attachShadow({mode:"open"}),this.liteCSS=new class{constructor(e){this.shadowContainer=e,this.styleQueue=[],this.injectedStyle="",this.generatedClasses=new Map,this.namespaces=new Map}__createNewClass(e){const t="_"+U(),s=`.${t}{${e}}`;return this.generatedClasses.set(t,e),this.styleQueue.push(s),t}parser(e,...t){const s=q(e,t);return this.__createNewClass(s)}cx(...e){if(1===e.length){const t=e[0];return Object.keys(t).reduce(((e,s)=>{const n="true"===s;return n&&Array.isArray(t[s])?e+t[s].reduce(((e,t)=>`${e} ${t}`),""):`${e}${n?t[s]:""}`}),"")}{const t=e.reduce(((e,t)=>`${e}${this.generatedClasses.get(t)}`),"");return this.__createNewClass(t)}}injectRawCSS(e,...t){this.injectedStyle+=q(e,t,!0)}addCSS(){this.shadowContainer.querySelector("style").innerHTML+=this.injectedStyle}execQueue(){const e=this.shadowContainer.querySelector("style");for(;this.styleQueue.length>0;)e.innerHTML+=this.styleQueue.pop()}namespaceCSS(e,t){if(this.namespaces.has(e)){const s=this.shadowContainer.querySelector("style");if(null===s)throw new Error(`css ids must be unique, got multiple "${e}" ids declared at once`);const n=this.namespaces.get(e),i=this.generatedClasses.get(n);s.innerHTML=s.innerHTML.replace(`.${n}{${i}}`,""),this.generatedClasses.delete(n),this.namespaces.set(e,t)}else this.namespaces.set(e,t);return t}}(this.shadowRootAccessor),this.shadowStyleEl=null===(e=document.querySelector("style"))||void 0===e?void 0:e.cloneNode(!0),I.__add(this.storeSymbol,{ctx:this,state:{}}),this.__prepareUpdate=()=>this.attached?(this.setStateQueue.push("update"),this.__execSetStateQueue(),this.liteCSS.execQueue(),!0):0===this.setStateQueue.length&&(this.setStateQueue.push("update"),!1),this.htmlTemplate=t({useState:e=>{const t=Symbol();I.__addToExisting(this.storeSymbol,{[t]:e});const s=e=>{const s=I.__get(this.storeSymbol)[t];return e?e(s):s};return[s,(e,n)=>{"function"!=typeof e?I.__replace(this.storeSymbol,t,e):I.__replace(this.storeSymbol,t,e(s()));const i=this.__prepareUpdate(),r=I.__get(this.storeSymbol)[t];return n?n({updated:i,value:r}):r}]},onAttached:e=>this.cycleAfterAttached=e,beforeFirstRender:e=>this.cycleBeforeFirstRender=e,onRender:e=>this.cycleAfterRender=e,beforeRender:e=>this.cycleBeforeRender=e,onRemove:e=>this.cycleAfterRemoved=e,useGlobal:e=>{I.subscribeToGlobal(e,this.storeSymbol);const t=t=>{const s=I.getGlobal()[e].val;return t?t(s):s};return[t,(s,n)=>{let i=!1;i="function"!=typeof s?I.setGlobal(e,s):I.setGlobal(e,s(t()));const r=I.getGlobal()[e].val;return n?n({updated:i,value:r}):r}]},html:G,query:e=>{if(this.attached)return this.shadowRootAccessor.querySelector(e);throw D()},queryAll:e=>{if(this.attached)return this.shadowRootAccessor.querySelectorAll(e);throw D()},fetcher:F,scopedComp:e=>{this.childrenComponents.push(e)},attributes:this.attributes,css:this.liteCSS.parser.bind(this.liteCSS),rawCss:this.liteCSS.injectRawCSS.bind(this.liteCSS),cx:this.liteCSS.cx.bind(this.liteCSS),nc:this.liteCSS.namespaceCSS.bind(this.liteCSS),props:this.props,self:this}),this.cycleBeforeFirstRender(),this.cycleBeforeRender(),this.__renderElement(),this.cycleAfterRender()}__execSetStateQueue(){for(;this.setStateQueue.length>0;)this.setStateQueue.pop(),this.cycleBeforeRender(),this.__renderElement(),this.cycleAfterRender()}__renderElement(){((e,t,s)=>{let n=B.get(t);void 0===n&&(o(t,t.firstChild),B.set(t,n=new N(Object.assign({templateFactory:M},void 0))),n.appendInto(t)),n.setValue(e),n.commit()})(G`${this.shadowStyleEl}${this.htmlTemplate()}`,this.shadowRootAccessor)}__connectScopedChildren(){this.childrenComponents.forEach((e=>{Object.keys(e).forEach((t=>{e[t]()}))}))}connectedCallback(){this.attached=!0,this.__execSetStateQueue(),this.cycleAfterAttached(),this.liteCSS.addCSS(),this.liteCSS.execQueue(),this.__connectScopedChildren()}disconnectedCallback(){this.cycleAfterRemoved()}}return!0===s?customElements.define(e,n):()=>customElements.define(e,n)}document.querySelector("style")||document.head.appendChild(document.createElement("style"))}},t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={exports:{}};return e[n](i,i.exports,s),i.exports}return s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(906)})()}));
(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./src/vmess-tools/__doc__/tools.mdx":function(e,t,n){"use strict";n.r(t);var a=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),s=n("react"),r=n.n(s),o=n("./node_modules/@mdx-js/react/dist/esm.js"),c=(n("./node_modules/antd/es/form/style/index.js"),n("./node_modules/antd/es/form/index.js")),l=(n("./node_modules/antd/es/input/style/index.js"),n("./node_modules/antd/es/input/index.js")),i=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),d=(n("./node_modules/antd/es/popover/style/index.js"),n("./node_modules/antd/es/popover/index.js")),m=(n("./node_modules/antd/es/icon/style/index.js"),n("./node_modules/antd/es/icon/index.js")),u=(n("./node_modules/antd/es/empty/style/index.js"),n("./node_modules/antd/es/empty/index.js")),b=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),f=n("./node_modules/atob/browser-atob.js"),p=n.n(f),j=n("./node_modules/btoa/index.js"),v=n.n(j),_={remarks:"ps",obfsParam:"host",obfs:"net"},O={ps:"remarks",host:"obfsParam",net:"obfs"},x={},y={ps:function(e){return encodeURIComponent(e)}},E=function(e){try{return p()(e)}catch(t){}},h=function(e){return/^vmess:\/\//i.test(e)&&(Boolean(w(e))||Boolean(P(e)))};h&&h===Object(h)&&Object.isExtensible(h)&&Object.defineProperty(h,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"isVMessLink",filename:"src/vmess-tools/index.ts"}});var g=function(e){return e.replace(/^vmess:\/\//i,"").includes("?")};g&&g===Object(g)&&Object.isExtensible(g)&&Object.defineProperty(g,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"isVMessLinkV1",filename:"src/vmess-tools/index.ts"}});var k=function(e){var t=e.replace(/^vmess:\/\//i,"");return!t.includes("?")&&function(e){try{return JSON.parse(e)}catch(t){}}(E(t))};k&&k===Object(k)&&Object.isExtensible(k)&&Object.defineProperty(k,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"isVMessLinkV2",filename:"src/vmess-tools/index.ts"}});var w=function(e){if(g(e)){var t=e.replace(/^vmess:\/\//i,"").split("?"),n=Object(i.a)(t,2),a=n[0],s=n[1],r=E(a);if(r){var o=r.split(/[@:]/),c=Object(i.a)(o,4),l=c[0],d=c[1],m=c[2],u=c[3],f={};return new URLSearchParams(s).forEach((function(e,t){var n=_[t]||t;f[n]=y[n]?y[n](e):e})),Object(b.a)({v:"2",type:l,id:d,add:m,port:Number(u)},f)}}};"undefined"!==typeof w&&w&&w===Object(w)&&Object.isExtensible(w)&&Object.defineProperty(w,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"parseV1Link",filename:"src/vmess-tools/index.ts"}});var P=function(e){if(k(e)){var t=p()(e.replace(/^vmess:\/\//i,""));if(t)return JSON.parse(t)}};"undefined"!==typeof P&&P&&P===Object(P)&&Object.isExtensible(P)&&Object.defineProperty(P,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"parseV2Link",filename:"src/vmess-tools/index.ts"}});var V=function(e){if(!h(e))return"";if(g(e))return e;var t=P(e);if(!t)return"";t.v;var n=t.type,s=t.id,r=t.port,o=t.add,c=Object(a.a)(t,["v","type","id","port","add"]),l=new URLSearchParams;return Object.keys(c).forEach((function(e){var t=O[e]||e,n=x[t]?x[t](c[e]):c[e];l.append(t,n)})),"vmess://".concat(v()("".concat(n,":").concat(s,"@").concat(o,":").concat(r)),"?").concat(decodeURIComponent(l.toString()))};V&&V===Object(V)&&Object.isExtensible(V)&&Object.defineProperty(V,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"toV1Link",filename:"src/vmess-tools/index.ts"}});var L=function(e){if(!h(e))return"";if(k(e))return e;var t=w(e);return t?"vmess://".concat(v()(JSON.stringify(Object(b.a)({},t,{v:"2"})))):""};L&&L===Object(L)&&Object.isExtensible(L)&&Object.defineProperty(L,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"toV2Link",filename:"src/vmess-tools/index.ts"}});var S=n("./node_modules/qrcode.react/lib/index.js"),M=n.n(S),T=function(e){return r.a.createElement("span",null,r.a.createElement(d.a,{placement:"right",content:e.data?r.a.createElement(M.a,{value:e.data}):r.a.createElement(u.a,null)},e.children,"\xa0",e.data&&r.a.createElement("a",null,r.a.createElement(m.a,{type:"qrcode"}))))},C=function(){var e=Object(s.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],o=Object(s.useState)(""),d=Object(i.a)(o,2),m=d[0],u=d[1],b=Object(s.useState)(""),f=Object(i.a)(b,2),p=f[0],j=f[1];return Object(s.useEffect)((function(){u(V(n)),j(L(n))}),[n]),r.a.createElement("div",null,r.a.createElement(c.a,{layout:"vertical"},r.a.createElement(c.a.Item,null,r.a.createElement(l.a.TextArea,{placeholder:"vmess://",value:n,onChange:function(e){return a(e.target.value.replace(/\n*/g,""))},autosize:{minRows:3}})),m&&r.a.createElement(c.a.Item,{label:r.a.createElement(T,{data:m},"VMess V1")},r.a.createElement("div",{style:{wordBreak:"break-word"}},m)),p&&r.a.createElement(c.a.Item,{label:r.a.createElement(T,{data:p},"VMess V2")},r.a.createElement("div",{style:{wordBreak:"break-word"}},p))))},I=C;C&&C===Object(C)&&Object.isExtensible(C)&&Object.defineProperty(C,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"Tools",filename:"src/vmess-tools/__doc__/Tools.tsx"}}),n.d(t,"default",(function(){return R}));var J={};function R(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object.assign({},J,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"\u94fe\u63a5\u8f6c\u6362"},"\u94fe\u63a5\u8f6c\u6362"),Object(o.b)(I,{mdxType:"Tools"}))}R&&R===Object(R)&&Object.isExtensible(R)&&Object.defineProperty(R,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/vmess-tools/__doc__/tools.mdx"}}),R.isMDXComponent=!0}}]);
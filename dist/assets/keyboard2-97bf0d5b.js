import{K as f}from"./index-9305475e.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const g="ionKeyboardDidShow",p="ionKeyboardDidHide",b=150;let n={},o={},s=!1;const v=()=>{n={},o={},s=!1},k=e=>{if(f.getEngine()!==void 0)y(e);else{if(!e.visualViewport)return;o=d(e.visualViewport),e.visualViewport.onresize=()=>{K(e),l()||D(e)?r(e):a(e)&&i(e)}}},y=e=>{e.addEventListener("keyboardDidShow",t=>r(e,t)),e.addEventListener("keyboardDidHide",()=>i(e))},r=(e,t)=>{E(e,t),s=!0},i=e=>{u(e),s=!1},l=()=>{const e=(n.height-o.height)*o.scale;return!s&&n.width===o.width&&e>b},D=e=>s&&!a(e),a=e=>s&&o.height===e.innerHeight,E=(e,t)=>{const c=t?t.keyboardHeight:e.innerHeight-o.height,h=new CustomEvent(g,{detail:{keyboardHeight:c}});e.dispatchEvent(h)},u=e=>{const t=new CustomEvent(p);e.dispatchEvent(t)},K=e=>{n=Object.assign({},o),o=d(e.visualViewport)},d=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale});export{p as KEYBOARD_DID_CLOSE,g as KEYBOARD_DID_OPEN,d as copyVisualViewport,a as keyboardDidClose,l as keyboardDidOpen,D as keyboardDidResize,v as resetKeyboardAssist,i as setKeyboardClose,r as setKeyboardOpen,k as startKeyboardAssist,K as trackViewportChanges};

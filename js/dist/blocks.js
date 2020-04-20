this.formation=this.formation||{},this.formation.blocks=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=27)}({0:function(t,e){!function(){t.exports=this.React}()},1:function(t,e){!function(){t.exports=this.wp.components}()},18:function(t,e,n){},27:function(t,e,n){"use strict";n.r(e);n(3);var r=n(0),o=n.n(r),i=n(1),u=n(8);function a(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,i=!0,u=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return i=t.done,t},e:function(t){u=!0,o=t},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw o}}}}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var c=wp.element.Fragment,f=wp.editor.InspectorControls,s=window.wp.i18n.__,m=function(){return{title:s("Embed Form"),category:"common",icon:u.a,keywords:[s("Form"),s("Embed")],attributes:{show_title:{type:"bool"},form_id:{type:"number"}},edit:function(t){var e=t.attributes,n=e.show_title,r=e.form_id;return o.a.createElement(c,null,o.a.createElement(f,null,o.a.createElement(i.PanelBody,{title:s("Form Settings")},o.a.createElement(i.ToggleControl,{label:s("Show Form Title"),onChange:function(e){return t.setAttributes({show_title:e})},checked:n}))),o.a.createElement("div",{className:t.className},n&&o.a.createElement("span",null,function(t){var e,n=a(Formation.forms);try{for(n.s();!(e=n.n()).done;){var r=e.value;if(r.value===t)return r.label}}catch(t){n.e(t)}finally{n.f()}return s("No form selected, or form removed.")}(r)),o.a.createElement(i.SelectControl,{value:r,options:Formation.forms,onChange:function(e){return t.setAttributes({form_id:parseInt(e)})}})))},save:function(){return null}}};n(18);(0,wp.blocks.registerBlockType)("formation/form-embed",m())},3:function(t,e){!function(){t.exports=this.wp.element}()},8:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return i}));var r=wp.element.createElement,o=r("svg",{width:40,height:40,viewBox:"0 0 768 768"},r("path",{d:"M223.5 480h64.5v64.5h-64.5v-64.5zM223.5 352.5h64.5v63h-64.5v-63zM223.5 223.5h64.5v64.5h-64.5v-64.5zM352.5 480h192v64.5h-192v-64.5zM352.5 352.5h192v63h-192v-63zM352.5 223.5h192v64.5h-192v-64.5zM643.5 96q10.5 0 19.5 8.25t9 20.25v519q0 10.5-9 19.5t-19.5 9h-519q-12 0-20.25-9t-8.25-19.5v-519q0-28.5 28.5-28.5h519zM607.5 160.5h-447v447h447v-447z"})),i=r("svg",{width:30,height:30,viewBox:"0 0 768 768"},r("path",{d:"M663 225l-58.5 58.5-120-120 58.5-58.5q9-9 22.5-9t22.5 9l75 75q9 9 9 22.5t-9 22.5zM96 552l354-354 120 120-354 354h-120v-120z"}))}});
!function t(e,r,n){function o(a,c){if(!r[a]){if(!e[a]){var u="function"==typeof require&&require;if(!c&&u)return u(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var s=r[a]={exports:{}};e[a][0].call(s.exports,function(t){var r=e[a][1][t];return o(r||t)},s,s.exports,t,e,r,n)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(t,e,r){function n(t){function e(t){s.innerHTML="",r.forEach(function(e,r){var n=document.createElement("canvas");n.setAttribute("id","target-canvas-"+r),s.appendChild(n);var o=Object.assign({},e,{img:t.currentTarget,targetCanvas:n,grayscale:"yes"===e.grayscale,showBase:"yes"===e.showBase});new l[e.renderer](o).start()})}var r,n=i(t);r=n.runs?JSON.parse(decodeURIComponent(n.runs)).map(i):[n],function(t){var e=t?"remove":"add";document.getElementById("source-canvas").classList[e]("hidden")}("yes"===n.displaySrcImage),function(){var t=new Image;t.crossOrigin="Anonymous",t.addEventListener("load",e),t.src=n.srcImgUrl}()}function o(t,e,r,n,o){a(o)}function i(t){return Object.assign({},c,t)}var a=t("handle-error-web"),c={srcImgUrl:"data/fish.jpg",displaySrcImage:"yes",quant:16,grayscale:"yes",recolorMode:"random",renderer:"replacer",showBase:"no",opacityPercentOverBase:50,numberOfRetriesToAvoidSingleColor:5,minimumValueDifference:0,tolerance:10},u=t("route-state")({followRoute:n,windowObject:window}),l={replacer:t("./replacer"),linefiller:t("./linefiller")},s=document.getElementById("target-canvases-container");window.onerror=o,u.routeFromHash()},{"./linefiller":3,"./replacer":15,"handle-error-web":5,"route-state":14}],2:[function(t,e,r){var n=t("probable"),o=t("d3-color").hsl;e.exports=function({originalString:t,newForOld:e,recolorMode:r="random",rgbaToString:i}){if("none"===r)return t;let a=e[t];if(!a){if("random"===r)a=i([n.roll(256),n.roll(256),n.roll(256),255]);else if("shiftHue"===r){let e=o(t);e.h=n.roll(360),a=e.toString()}e[t]=a}return a}},{"d3-color":4,probable:8}],3:[function(t,e,r){function n(t){return`rgba(${t.slice(0,3).join(", ")}, ${t[3]/255})`}var o=t("./getReplacementColor");class i{constructor(t){this.quantizationFactor=t.quant,this.grayscale=t.grayscale,this.recolorMode=t.recolorMode,this.img=t.img,this.targetCanvas=t.targetCanvas,this.showBase=t.showBase,this.opacityPercentOverBase=t.opacityPercentOverBase,this.numberOfRetriesToAvoidSingleColor=+t.numberOfRetriesToAvoidSingleColor,this.minimumValueDifference=+t.minimumValueDifference,this.tolerance=+t.tolerance}start(){const t=this.drawSrcCanvas();this.recolor({imgData:t})}drawSrcCanvas(){var t=this.img,e=document.getElementById("source-canvas"),r=e.getContext("2d");return e.width=t.width,e.height=t.height,r.drawImage(t,0,0,t.width,t.height),r.getImageData(0,0,t.width,t.height)}recolor({imgData:t}){this.targetCanvas.width=t.width,this.targetCanvas.height=t.height;const e=this.targetCanvas.getContext("2d");var r={};for(let i=0;i<t.height;i++){let a=0,c=null;for(let u=0;u<t.width;u++){const l=this.getImgDataRgba({imgData:t,x:u,y:i});if(null===c)c=l;else{((function(t,e){let r=0;for(let n=0;n<4;n++)r+=Math.abs(e[n]-t[n]);return r/4})(c,l)>this.tolerance||u===t.width-1)&&(e.beginPath(),e.moveTo(a,i),e.lineTo(u,i),e.strokeStyle=o({originalString:n(c),newForOld:r,recolorMode:this.recolorMode,rgbaToString:n}),e.stroke(),a=u,c=null)}}}}getImgDataRgba({imgData:t,x:e,y:r}){const n=4*(t.width*r+e);return[0,1,2,3].map(function(e){return t.data[n+e]})}}e.exports=i},{"./getReplacementColor":2}],4:[function(t,e,r){!function(t,n){"object"==typeof r&&void 0!==e?n(r):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})}(this,function(t){"use strict";function e(t,e,r){t.prototype=e.prototype=r,r.constructor=t}function r(t,e){var r=Object.create(t.prototype);for(var n in e)r[n]=e[n];return r}function n(){}function o(t){var e;return t=(t+"").trim().toLowerCase(),(e=C.exec(t))?(e=parseInt(e[1],16),new l(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1)):(e=R.exec(t))?i(parseInt(e[1],16)):(e=D.exec(t))?new l(e[1],e[2],e[3],1):(e=E.exec(t))?new l(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=P.exec(t))?a(e[1],e[2],e[3],e[4]):(e=I.exec(t))?a(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=F.exec(t))?f(e[1],e[2]/100,e[3]/100,1):(e=T.exec(t))?f(e[1],e[2]/100,e[3]/100,e[4]):B.hasOwnProperty(t)?i(B[t]):"transparent"===t?new l(NaN,NaN,NaN,0):null}function i(t){return new l(t>>16&255,t>>8&255,255&t,1)}function a(t,e,r,n){return n<=0&&(t=e=r=NaN),new l(t,e,r,n)}function c(t){return t instanceof n||(t=o(t)),t?(t=t.rgb(),new l(t.r,t.g,t.b,t.opacity)):new l}function u(t,e,r,n){return 1===arguments.length?c(t):new l(t,e,r,null==n?1:n)}function l(t,e,r,n){this.r=+t,this.g=+e,this.b=+r,this.opacity=+n}function s(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function f(t,e,r,n){return n<=0?t=e=r=NaN:r<=0||r>=1?t=e=NaN:e<=0&&(t=NaN),new p(t,e,r,n)}function h(t,e,r,i){return 1===arguments.length?function(t){if(t instanceof p)return new p(t.h,t.s,t.l,t.opacity);if(t instanceof n||(t=o(t)),!t)return new p;if(t instanceof p)return t;var e=(t=t.rgb()).r/255,r=t.g/255,i=t.b/255,a=Math.min(e,r,i),c=Math.max(e,r,i),u=NaN,l=c-a,s=(c+a)/2;return l?(u=e===c?(r-i)/l+6*(r<i):r===c?(i-e)/l+2:(e-r)/l+4,l/=s<.5?c+a:2-c-a,u*=60):l=s>0&&s<1?0:u,new p(u,l,s,t.opacity)}(t):new p(t,e,r,null==i?1:i)}function p(t,e,r,n){this.h=+t,this.s=+e,this.l=+r,this.opacity=+n}function d(t,e,r){return 255*(t<60?e+(r-e)*t/60:t<180?r:t<240?e+(r-e)*(240-t)/60:e)}function g(t){if(t instanceof b)return new b(t.l,t.a,t.b,t.opacity);if(t instanceof A){if(isNaN(t.h))return new b(t.l,0,0,t.opacity);var e=t.h*q;return new b(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}t instanceof l||(t=c(t));var r,n,o=j(t.r),i=j(t.g),a=j(t.b),u=v((.2225045*o+.7168786*i+.0606169*a)/H);return o===i&&i===a?r=n=u:(r=v((.4360747*o+.3850649*i+.1430804*a)/L),n=v((.0139322*o+.0971045*i+.7141733*a)/V)),new b(116*u-16,500*(r-u),200*(u-n),t.opacity)}function y(t,e,r,n){return 1===arguments.length?g(t):new b(t,e,r,null==n?1:n)}function b(t,e,r,n){this.l=+t,this.a=+e,this.b=+r,this.opacity=+n}function v(t){return t>Q?Math.pow(t,1/3):t/W+U}function m(t){return t>z?t*t*t:W*(t-U)}function w(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function j(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function _(t){if(t instanceof A)return new A(t.h,t.c,t.l,t.opacity);if(t instanceof b||(t=g(t)),0===t.a&&0===t.b)return new A(NaN,0,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*$;return new A(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function O(t,e,r,n){return 1===arguments.length?_(t):new A(t,e,r,null==n?1:n)}function A(t,e,r,n){this.h=+t,this.c=+e,this.l=+r,this.opacity=+n}function x(t,e,r,n){return 1===arguments.length?function(t){if(t instanceof k)return new k(t.h,t.s,t.l,t.opacity);t instanceof l||(t=c(t));var e=t.r/255,r=t.g/255,n=t.b/255,o=(et*n+Z*e-tt*r)/(et+Z-tt),i=n-o,a=(Y*(r-o)-K*i)/X,u=Math.sqrt(a*a+i*i)/(Y*o*(1-o)),s=u?Math.atan2(a,i)*$-120:NaN;return new k(s<0?s+360:s,u,o,t.opacity)}(t):new k(t,e,r,null==n?1:n)}function k(t,e,r,n){this.h=+t,this.s=+e,this.l=+r,this.opacity=+n}var M="\\s*([+-]?\\d+)\\s*",N="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",S="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",C=/^#([0-9a-f]{3})$/,R=/^#([0-9a-f]{6})$/,D=new RegExp("^rgb\\("+[M,M,M]+"\\)$"),E=new RegExp("^rgb\\("+[S,S,S]+"\\)$"),P=new RegExp("^rgba\\("+[M,M,M,N]+"\\)$"),I=new RegExp("^rgba\\("+[S,S,S,N]+"\\)$"),F=new RegExp("^hsl\\("+[N,S,S]+"\\)$"),T=new RegExp("^hsla\\("+[N,S,S,N]+"\\)$"),B={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};e(n,o,{displayable:function(){return this.rgb().displayable()},hex:function(){return this.rgb().hex()},toString:function(){return this.rgb()+""}}),e(l,u,r(n,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new l(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new l(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},hex:function(){return"#"+s(this.r)+s(this.g)+s(this.b)},toString:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),e(p,h,r(n,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new p(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new p(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,r=this.l,n=r+(r<.5?r:1-r)*e,o=2*r-n;return new l(d(t>=240?t-240:t+120,o,n),d(t,o,n),d(t<120?t+240:t-120,o,n),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var q=Math.PI/180,$=180/Math.PI,L=.96422,H=1,V=.82521,U=4/29,z=6/29,W=3*z*z,Q=z*z*z;e(b,y,r(n,{brighter:function(t){return new b(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new b(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,r=isNaN(this.b)?t:t-this.b/200;return e=L*m(e),t=H*m(t),r=V*m(r),new l(w(3.1338561*e-1.6168667*t-.4906146*r),w(-.9787684*e+1.9161415*t+.033454*r),w(.0719453*e-.2289914*t+1.4052427*r),this.opacity)}})),e(A,O,r(n,{brighter:function(t){return new A(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new A(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return g(this).rgb()}}));var G=-.14861,J=1.78277,K=-.29227,X=-.90649,Y=1.97294,Z=Y*X,tt=Y*J,et=J*K-X*G;e(k,x,r(n,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new k(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new k(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*q,e=+this.l,r=isNaN(this.s)?0:this.s*e*(1-e),n=Math.cos(t),o=Math.sin(t);return new l(255*(e+r*(G*n+J*o)),255*(e+r*(K*n+X*o)),255*(e+r*(Y*n)),this.opacity)}})),t.color=o,t.rgb=u,t.hsl=h,t.lab=y,t.hcl=O,t.lch=function(t,e,r,n){return 1===arguments.length?_(t):new A(r,e,t,null==n?1:n)},t.gray=function(t,e){return new b(t,0,0,null==e?1:e)},t.cubehelix=x,Object.defineProperty(t,"__esModule",{value:!0})})},{}],5:[function(t,e,r){function n(t){if(t){console.error(t,t.stack);var e="";t.name&&(e+=t.name+": "),e+=t.message,t.stack&&(e+=" | "+t.stack.toString()),function(t){var e=document.getElementById("status-message");e.textContent=t,e.classList.remove("hidden")}(e)}}e.exports=n},{}],6:[function(t,e,r){(function(t){function n(t,e){return t.set(e[0],e[1]),t}function o(t,e){return t.add(e),t}function i(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function a(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function c(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}function u(t,e){return function(r){return t(e(r))}}function l(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}function s(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function f(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function h(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function p(t){this.__data__=new f(t)}function d(t,e){var r=Wt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&k(t)}(t)&&vt.call(t,"callee")&&(!kt.call(t,"callee")||mt.call(t)==E)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!vt.call(t,i)||o&&("length"==i||function(t,e){return!!(e=null==e?D:e)&&("number"==typeof t||ot.test(t))&&t>-1&&t%1==0&&t<e}(i,n))||r.push(i);return r}function g(t,e,r){var n=t[e];vt.call(t,e)&&x(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function y(t,e){for(var r=t.length;r--;)if(x(t[r][0],e))return r;return-1}function b(t,e,r,u,s,f,h){var d;if(u&&(d=f?u(t,s,f,h):u(t)),void 0!==d)return d;if(!N(t))return t;var y=Wt(t);if(y){if(d=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&vt.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,d)}else{var v=zt(t),j=v==F||v==T;if(Qt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(v==$||v==E||j&&!f){if(a(t))return f?t:{};if(d=function(t){return"function"!=typeof t.constructor||O(t)?{}:function(t){return N(t)?xt(t):{}}(At(t))}(j?{}:t),!e)return function(t,e){return w(t,Ut(t),e)}(t,function(t,e){return t&&w(e,S(e),t)}(d,t))}else{if(!it[v])return f?t:{};d=function(t,e,r,a){var u=t.constructor;switch(e){case z:return m(t);case P:case I:return new u(+t);case W:return function(t,e){var r=e?m(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,a);case Q:case G:case J:case K:case X:case Y:case Z:case tt:case et:return function(t,e){var r=e?m(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,a);case B:return function(t,e,r){return i(e?r(c(t),!0):c(t),n,new t.constructor)}(t,a,r);case q:case V:return new u(t);case L:return function(t){var e=new t.constructor(t.source,rt.exec(t));return e.lastIndex=t.lastIndex,e}(t);case H:return function(t,e,r){return i(e?r(l(t),!0):l(t),o,new t.constructor)}(t,a,r);case U:return function(t){return Vt?Object(Vt.call(t)):{}}(t)}}(t,v,b,e)}}h||(h=new p);var _=h.get(t);if(_)return _;if(h.set(t,d),!y)var A=r?function(t){return function(t,e,r){var n=e(t);return Wt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,S,Ut)}(t):S(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(A||t,function(n,o){A&&(n=t[o=n]),g(d,o,b(n,e,r,u,o,t,h))}),d}function v(t){if(!N(t)||function(t){return!!yt&&yt in t}(t))return!1;return(M(t)||a(t)?wt:nt).test(A(t))}function m(t){var e=new t.constructor(t.byteLength);return new Ot(e).set(new Ot(t)),e}function w(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;g(r,a,void 0===c?t[a]:c)}return r}function j(t,e){var r=t.__data__;return function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}(e)?r["string"==typeof e?"string":"hash"]:r.map}function _(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return v(r)?r:void 0}function O(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||dt)}function A(t){if(null!=t){try{return bt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function x(t,e){return t===e||t!=t&&e!=e}function k(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=D}(t.length)&&!M(t)}function M(t){var e=N(t)?mt.call(t):"";return e==F||e==T}function N(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function S(t){return k(t)?d(t):function(t){if(!O(t))return Ct(t);var e=[];for(var r in Object(t))vt.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}var C=200,R="__lodash_hash_undefined__",D=9007199254740991,E="[object Arguments]",P="[object Boolean]",I="[object Date]",F="[object Function]",T="[object GeneratorFunction]",B="[object Map]",q="[object Number]",$="[object Object]",L="[object RegExp]",H="[object Set]",V="[object String]",U="[object Symbol]",z="[object ArrayBuffer]",W="[object DataView]",Q="[object Float32Array]",G="[object Float64Array]",J="[object Int8Array]",K="[object Int16Array]",X="[object Int32Array]",Y="[object Uint8Array]",Z="[object Uint8ClampedArray]",tt="[object Uint16Array]",et="[object Uint32Array]",rt=/\w*$/,nt=/^\[object .+?Constructor\]$/,ot=/^(?:0|[1-9]\d*)$/,it={};it[E]=it["[object Array]"]=it[z]=it[W]=it[P]=it[I]=it[Q]=it[G]=it[J]=it[K]=it[X]=it[B]=it[q]=it[$]=it[L]=it[H]=it[V]=it[U]=it[Y]=it[Z]=it[tt]=it[et]=!0,it["[object Error]"]=it[F]=it["[object WeakMap]"]=!1;var at="object"==typeof t&&t&&t.Object===Object&&t,ct="object"==typeof self&&self&&self.Object===Object&&self,ut=at||ct||Function("return this")(),lt="object"==typeof r&&r&&!r.nodeType&&r,st=lt&&"object"==typeof e&&e&&!e.nodeType&&e,ft=st&&st.exports===lt,ht=Array.prototype,pt=Function.prototype,dt=Object.prototype,gt=ut["__core-js_shared__"],yt=function(){var t=/[^.]+$/.exec(gt&&gt.keys&&gt.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),bt=pt.toString,vt=dt.hasOwnProperty,mt=dt.toString,wt=RegExp("^"+bt.call(vt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),jt=ft?ut.Buffer:void 0,_t=ut.Symbol,Ot=ut.Uint8Array,At=u(Object.getPrototypeOf,Object),xt=Object.create,kt=dt.propertyIsEnumerable,Mt=ht.splice,Nt=Object.getOwnPropertySymbols,St=jt?jt.isBuffer:void 0,Ct=u(Object.keys,Object),Rt=_(ut,"DataView"),Dt=_(ut,"Map"),Et=_(ut,"Promise"),Pt=_(ut,"Set"),It=_(ut,"WeakMap"),Ft=_(Object,"create"),Tt=A(Rt),Bt=A(Dt),qt=A(Et),$t=A(Pt),Lt=A(It),Ht=_t?_t.prototype:void 0,Vt=Ht?Ht.valueOf:void 0;s.prototype.clear=function(){this.__data__=Ft?Ft(null):{}},s.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},s.prototype.get=function(t){var e=this.__data__;if(Ft){var r=e[t];return r===R?void 0:r}return vt.call(e,t)?e[t]:void 0},s.prototype.has=function(t){var e=this.__data__;return Ft?void 0!==e[t]:vt.call(e,t)},s.prototype.set=function(t,e){return this.__data__[t]=Ft&&void 0===e?R:e,this},f.prototype.clear=function(){this.__data__=[]},f.prototype.delete=function(t){var e=this.__data__,r=y(e,t);return!(r<0||(r==e.length-1?e.pop():Mt.call(e,r,1),0))},f.prototype.get=function(t){var e=this.__data__,r=y(e,t);return r<0?void 0:e[r][1]},f.prototype.has=function(t){return y(this.__data__,t)>-1},f.prototype.set=function(t,e){var r=this.__data__,n=y(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},h.prototype.clear=function(){this.__data__={hash:new s,map:new(Dt||f),string:new s}},h.prototype.delete=function(t){return j(this,t).delete(t)},h.prototype.get=function(t){return j(this,t).get(t)},h.prototype.has=function(t){return j(this,t).has(t)},h.prototype.set=function(t,e){return j(this,t).set(t,e),this},p.prototype.clear=function(){this.__data__=new f},p.prototype.delete=function(t){return this.__data__.delete(t)},p.prototype.get=function(t){return this.__data__.get(t)},p.prototype.has=function(t){return this.__data__.has(t)},p.prototype.set=function(t,e){var r=this.__data__;if(r instanceof f){var n=r.__data__;if(!Dt||n.length<C-1)return n.push([t,e]),this;r=this.__data__=new h(n)}return r.set(t,e),this};var Ut=Nt?u(Nt,Object):function(){return[]},zt=function(t){return mt.call(t)};(Rt&&zt(new Rt(new ArrayBuffer(1)))!=W||Dt&&zt(new Dt)!=B||Et&&"[object Promise]"!=zt(Et.resolve())||Pt&&zt(new Pt)!=H||It&&"[object WeakMap]"!=zt(new It))&&(zt=function(t){var e=mt.call(t),r=e==$?t.constructor:void 0,n=r?A(r):void 0;if(n)switch(n){case Tt:return W;case Bt:return B;case qt:return"[object Promise]";case $t:return H;case Lt:return"[object WeakMap]"}return e});var Wt=Array.isArray,Qt=St||function(){return!1};e.exports=function(t){return b(t,!0,!0)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(t,e,r){function n(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}function o(t,e){var r=A(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&h(t)}(t)&&w.call(t,"callee")&&(!_.call(t,"callee")||j.call(t)==g)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!w.call(t,i)||o&&("length"==i||s(i,n))||r.push(i);return r}function i(t,e,r,n){return void 0===t||f(t,m[r])&&!w.call(n,r)?e:t}function a(t,e,r){var n=t[e];w.call(t,e)&&f(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function c(t){if(!p(t))return function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e}(t);var e=function(t){var e=t&&t.constructor,r="function"==typeof e&&e.prototype||m;return t===r}(t),r=[];for(var n in t)("constructor"!=n||!e&&w.call(t,n))&&r.push(n);return r}function u(t,e){return e=O(void 0===e?t.length-1:e,0),function(){for(var r=arguments,o=-1,i=O(r.length-e,0),a=Array(i);++o<i;)a[o]=r[e+o];o=-1;for(var c=Array(e+1);++o<e;)c[o]=r[o];return c[e]=a,n(t,this,c)}}function l(t){return u(function(e,r){var n=-1,o=r.length,i=o>1?r[o-1]:void 0,a=o>2?r[2]:void 0;for(i=t.length>3&&"function"==typeof i?(o--,i):void 0,a&&function(t,e,r){if(!p(r))return!1;var n=typeof e;if("number"==n?h(r)&&s(e,r.length):"string"==n&&e in r)return f(r[e],t);return!1}(r[0],r[1],a)&&(i=o<3?void 0:i,o=1),e=Object(e);++n<o;){var c=r[n];c&&t(e,c,n,i)}return e})}function s(t,e){return!!(e=null==e?d:e)&&("number"==typeof t||v.test(t))&&t>-1&&t%1==0&&t<e}function f(t,e){return t===e||t!=t&&e!=e}function h(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=d}(t.length)&&!function(t){var e=p(t)?j.call(t):"";return e==y||e==b}(t)}function p(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var d=9007199254740991,g="[object Arguments]",y="[object Function]",b="[object GeneratorFunction]",v=/^(?:0|[1-9]\d*)$/,m=Object.prototype,w=m.hasOwnProperty,j=m.toString,_=m.propertyIsEnumerable,O=Math.max,A=Array.isArray,x=l(function(t,e,r,n){!function(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var c=e[o],u=n?n(r[c],t[c],c,r,t):void 0;a(r,c,void 0===u?t[c]:u)}}(e,function(t){return h(t)?o(t,!0):c(t)}(e),t,n)}),k=u(function(t){return t.push(void 0,i),n(x,void 0,t)});e.exports=k},{}],8:[function(t,e,r){function n(t){function e(t){return Math.floor(h()*t)}function r(t){function r(t){return function(t,e){e=+e;for(var r=0;r<t.length;++r){var n=t[r],o=n[0];if(e>=o[0]&&e<=o[1])return n[1]}}(n,t)}var n=t,o=n[n.length-1][0][1]-n[0][0][0]+1;return{outcomeAtIndex:r,roll:function(){var t=r(e(o));return"function"!=typeof t||"probable_rollOnTable"!==t.name&&"probable_pick"!==t.name?t:t()},length:o,getRangesAndOutcomesArray:function(){return n}}}function n(t){var e=[],r=-1,n=function(t){var e=[];for(var r in t){var n=t[r];e.push([n,r])}return e}(t);return(n=n.sort(o)).forEach(function(t){var n=t[0],o=t[1],i=r+1,a=i+n-1;e.push([[i,a],o]),r=a}),e}function o(t,e){return t[0]>e[0]?-1:1}function i(t){return r(function(t){var e=[];for(var r in t){var n=function(t){var e=t.split("-");if(e.length>2)return;return 1===e.length?[+t,+t]:[+e[0],+e[1]]}(r),o=t[r];if("object"==typeof o)if(Array.isArray(o))o=l(o);else{var c=i(o);"function"==typeof c.roll&&(o=c.roll)}e.push([n,o])}return e.sort(a)}(t))}function a(t,e){return t[0][0]<e[0][0]?-1:1}function c(t){return r(function(t){function e(t){var e=t[0],n=t[1],o=r+e-1,i=[r,o];if(r=o+1,Array.isArray(n))if(function(t){return Array.isArray(t)&&t.length>0&&Array.isArray(t[0])&&2===t[0].length&&"number"==typeof t[0][0]}(n)){var a=c(n);"function"==typeof a.roll&&(n=a.roll)}else n=l(n);return[i,n]}var r=0;return t.map(e)}(t))}function u(t,r){return!t||"number"!=typeof t.length||t.length<1?r:t[e(t.length)]}function l(t,e){return function(){return u(t,e)}}function s(t,e){var r=[];return t.forEach(function(t){e.forEach(function(e){Array.isArray(t)||Array.isArray(e)?r.push(t.concat(e)):r.push([t,e])})}),r}function f(t){for(var r,n=t.length,o=Array(n),i=0;i<n;i++)(r=e(i+1))!==i&&(o[i]=o[r]),o[r]=t[i];return o}var h=Math.random;return t&&t.random&&(h=t.random),{roll:e,rollDie:function(t){return 0===t?0:e(t)+1},createRangeTable:r,createRangeTableFromDict:function(t){return r(n(t))},createTableFromDef:i,createTableFromSizes:c,convertDictToRangesAndOutcomePairs:n,pickFromArray:u,crossArrays:s,getCartesianProduct:function(t){return t.slice(1).reduce(s,t[0])},shuffle:f,sample:function(t,e){return f(t).slice(0,e)},randomFn:h}}var o=n();"object"==typeof e&&(e.exports=o,e.exports.createProbable=n)},{}],9:[function(t,e,r){"use strict";var n=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(t){return n.call(t,o,"+")},RFC3986:function(t){return t}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},{}],10:[function(t,e,r){"use strict";var n=t("./stringify"),o=t("./parse"),i=t("./formats");e.exports={formats:i,parse:o,stringify:n}},{"./formats":9,"./parse":11,"./stringify":12}],11:[function(t,e,r){"use strict";var n=t("./utils"),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(t,e,r){if(t){var n=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,i=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(n),c=a?n.slice(0,a.index):n,u=[];if(c){if(!r.plainObjects&&o.call(Object.prototype,c)&&!r.allowPrototypes)return;u.push(c)}for(var l=0;null!==(a=i.exec(n))&&l<r.depth;){if(l+=1,!r.plainObjects&&o.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(a[1])}return a&&u.push("["+n.slice(a.index)+"]"),function(t,e,r){for(var n=e,o=t.length-1;o>=0;--o){var i,a=t[o];if("[]"===a)i=(i=[]).concat(n);else{i=r.plainObjects?Object.create(null):{};var c="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,u=parseInt(c,10);!isNaN(u)&&a!==c&&String(u)===c&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(i=[])[u]=n:i[c]=n}n=i}return n}(u,e,r)}};e.exports=function(t,e){var r=e?n.assign({},e):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:i.delimiter,r.depth="number"==typeof r.depth?r.depth:i.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:i.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:i.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:i.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:i.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:i.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:i.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:i.strictNullHandling,""===t||null===t||void 0===t)return r.plainObjects?Object.create(null):{};for(var c="string"==typeof t?function(t,e){for(var r={},n=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,a=e.parameterLimit===1/0?void 0:e.parameterLimit,c=n.split(e.delimiter,a),u=0;u<c.length;++u){var l,s,f=c[u],h=f.indexOf("]="),p=-1===h?f.indexOf("="):h+1;-1===p?(l=e.decoder(f,i.decoder),s=e.strictNullHandling?null:""):(l=e.decoder(f.slice(0,p),i.decoder),s=e.decoder(f.slice(p+1),i.decoder)),o.call(r,l)?r[l]=[].concat(r[l]).concat(s):r[l]=s}return r}(t,r):t,u=r.plainObjects?Object.create(null):{},l=Object.keys(c),s=0;s<l.length;++s){var f=l[s],h=a(f,c[f],r);u=n.merge(u,h,r)}return n.compact(u)}},{"./utils":13}],12:[function(t,e,r){"use strict";var n=t("./utils"),o=t("./formats"),i={brackets:function(t){return t+"[]"},indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},a=Date.prototype.toISOString,c={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(t){return a.call(t)},skipNulls:!1,strictNullHandling:!1},u=function t(e,r,o,i,a,u,l,s,f,h,p,d){var g=e;if("function"==typeof l)g=l(r,g);else if(g instanceof Date)g=h(g);else if(null===g){if(i)return u&&!d?u(r,c.encoder):r;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||n.isBuffer(g)){if(u){return[p(d?r:u(r,c.encoder))+"="+p(u(g,c.encoder))]}return[p(r)+"="+p(String(g))]}var y=[];if(void 0===g)return y;var b;if(Array.isArray(l))b=l;else{var v=Object.keys(g);b=s?v.sort(s):v}for(var m=0;m<b.length;++m){var w=b[m];a&&null===g[w]||(y=Array.isArray(g)?y.concat(t(g[w],o(r,w),o,i,a,u,l,s,f,h,p,d)):y.concat(t(g[w],r+(f?"."+w:"["+w+"]"),o,i,a,u,l,s,f,h,p,d)))}return y};e.exports=function(t,e){var r=t,a=e?n.assign({},e):{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!=typeof a.encoder)throw new TypeError("Encoder has to be a function.");var l=void 0===a.delimiter?c.delimiter:a.delimiter,s="boolean"==typeof a.strictNullHandling?a.strictNullHandling:c.strictNullHandling,f="boolean"==typeof a.skipNulls?a.skipNulls:c.skipNulls,h="boolean"==typeof a.encode?a.encode:c.encode,p="function"==typeof a.encoder?a.encoder:c.encoder,d="function"==typeof a.sort?a.sort:null,g=void 0!==a.allowDots&&a.allowDots,y="function"==typeof a.serializeDate?a.serializeDate:c.serializeDate,b="boolean"==typeof a.encodeValuesOnly?a.encodeValuesOnly:c.encodeValuesOnly;if(void 0===a.format)a.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,a.format))throw new TypeError("Unknown format option provided.");var v,m,w=o.formatters[a.format];"function"==typeof a.filter?r=(m=a.filter)("",r):Array.isArray(a.filter)&&(v=m=a.filter);var j=[];if("object"!=typeof r||null===r)return"";var _;_=a.arrayFormat in i?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var O=i[_];v||(v=Object.keys(r)),d&&v.sort(d);for(var A=0;A<v.length;++A){var x=v[A];f&&null===r[x]||(j=j.concat(u(r[x],x,O,s,f,h?p:null,m,d,g,y,w,b)))}var k=j.join(l),M=!0===a.addQueryPrefix?"?":"";return k.length>0?M+k:""}},{"./formats":9,"./utils":13}],13:[function(t,e,r){"use strict";var n=Object.prototype.hasOwnProperty,o=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),i=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},n=0;n<t.length;++n)void 0!==t[n]&&(r[n]=t[n]);return r};e.exports={arrayToObject:i,assign:function(t,e){return Object.keys(e).reduce(function(t,r){return t[r]=e[r],t},t)},compact:function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],n=0;n<e.length;++n)for(var o=e[n],i=o.obj[o.prop],a=Object.keys(i),c=0;c<a.length;++c){var u=a[c],l=i[u];"object"==typeof l&&null!==l&&-1===r.indexOf(l)&&(e.push({obj:i,prop:u}),r.push(l))}return function(t){for(var e;t.length;){var r=t.pop();if(e=r.obj[r.prop],Array.isArray(e)){for(var n=[],o=0;o<e.length;++o)void 0!==e[o]&&n.push(e[o]);r.obj[r.prop]=n}}return e}(e)},decode:function(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(e){return t}},encode:function(t){if(0===t.length)return t;for(var e="string"==typeof t?t:String(t),r="",n=0;n<e.length;++n){var i=e.charCodeAt(n);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?r+=e.charAt(n):i<128?r+=o[i]:i<2048?r+=o[192|i>>6]+o[128|63&i]:i<55296||i>=57344?r+=o[224|i>>12]+o[128|i>>6&63]+o[128|63&i]:(n+=1,i=65536+((1023&i)<<10|1023&e.charCodeAt(n)),r+=o[240|i>>18]+o[128|i>>12&63]+o[128|i>>6&63]+o[128|63&i])}return r},isBuffer:function(t){return null!==t&&void 0!==t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))},isRegExp:function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},merge:function t(e,r,o){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];(o.plainObjects||o.allowPrototypes||!n.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!=typeof e)return[e].concat(r);var a=e;return Array.isArray(e)&&!Array.isArray(r)&&(a=i(e,o)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,i){n.call(e,i)?e[i]&&"object"==typeof e[i]?e[i]=t(e[i],r,o):e.push(r):e[i]=r}),e):Object.keys(r).reduce(function(e,i){var a=r[i];return n.call(e,i)?e[i]=t(e[i],a,o):e[i]=a,e},a)}}},{}],14:[function(t,e,r){var n=t("qs"),o=t("lodash.clonedeep"),i=t("lodash.defaults");e.exports=function(t){function e(){c(r())}function r(){return n.parse(u.location.hash.slice(1))}function a(t){var e=u.location.protocol+"//"+u.location.host+u.location.pathname+"#"+n.stringify(t);u.history.pushState(null,null,e)}var c,u;return t&&(c=t.followRoute,u=t.windowObject),u.onhashchange=e,{addToRoute:function(t,e=!0){var n=i(o(t),r());a(n),e&&c(n)},overwriteRouteEntirely:function(t){a(t),c(t)},routeFromHash:e,unpackEncodedRoute:function(t){var e=n.parse(decodeURIComponent(t));a(e),c(e)}}}},{"lodash.clonedeep":6,"lodash.defaults":7,qs:10}],15:[function(t,e,r){function n(t){return a(t).l}var o,i=t("probable"),a=t("d3-color").hsl;class c{constructor(t){this.quantizationFactor=t.quant,this.grayscale=t.grayscale,this.recolorMode=t.recolorMode,this.img=t.img,this.targetCanvas=t.targetCanvas,this.showBase=t.showBase,this.opacityPercentOverBase=t.opacityPercentOverBase,this.numberOfRetriesToAvoidSingleColor=+t.numberOfRetriesToAvoidSingleColor,this.minimumValueDifference=+t.minimumValueDifference}start(){this.scaleDownImage(.5)}scaleDownImage(t){var e=this.img,r=document.getElementById("source-canvas");o=e.width;var n=r.getContext("2d"),i=~~(e.width*t),a=~~(e.height*t);r.width=i,r.height=a,this.grayscale&&(n.filter="saturate(0%)"),n.drawImage(e,0,0,i,a),n.filter="none";var c=n.getImageData(0,0,i,a);this.recolor({srcDataArray:Array.from(c.data),smallWidth:i,smallHeight:a,scale:o/i})}recolor({srcDataArray:t,scale:e=1,smallWidth:r,smallHeight:o}){var c=this.targetCanvas;c.width=r*e,c.height=o*e;var u=c.getContext("2d");this.showBase&&(u.filter="saturate(0%)",u.drawImage(this.img,0,0),u.filter="none",u.globalAlpha=this.opacityPercentOverBase/100);for(var l=0;l<this.numberOfRetriesToAvoidSingleColor;++l){var s=function(n,o){for(var c={},l={},s=0;s<t.length;s+=4){let f=n(t.slice(s,s+4)),h=c[f];if(!h){if("random"===o)h=n([i.roll(256),i.roll(256),i.roll(256),255]);else if("shiftHue"===o){let t=a(f);t.h=i.roll(360),h=t.toString()}c[f]=h}let p=s/4,d=p%r*e,g=~~(p/r)*e;u.fillStyle=h,u.fillRect(d,g,e,e),l[h]=!0}return Object.keys(l)}(this.rgbaToString.bind(this),this.recolorMode);if(console.log("replacementColors",s),s.length>1){if(this.minimumValueDifference<=0)break;if(function(t,e){for(var r=t.map(n),o=0;o<r.length;++o)for(let t=o;t<r.length;++t)if(Math.abs(r[o]-r[t])>=e)return!0;return!1}(s,this.minimumValueDifference))break}}}rgbaToString(t){return`rgba(${t.slice(0,3).map(this.roundColorRawValue.bind(this)).join(", ")}, ${t[3]/255})`}roundColorRawValue(t){return~~(t/this.quantizationFactor)*this.quantizationFactor}}e.exports=c},{"d3-color":4,probable:8}]},{},[1]);
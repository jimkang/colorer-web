!function e(t,r,n){function i(a,l){if(!r[a]){if(!t[a]){var s="function"==typeof require&&require;if(!l&&s)return s(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var u=r[a]={exports:{}};t[a][0].call(u.exports,function(e){var r=t[a][1][e];return i(r||e)},u,u.exports,e,t,r,n)}return r[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(e,t,r){function n(e,t,r,n,i){o(i)}var i,o=e("handle-error-web"),a=e("probable"),l=e("qs"),s=e("d3-color").hsl;class c{constructor({quant:e=16,grayscale:t=!1,srcImgUrl:r="data/fish.jpg",recolorMode:n="random"}){this.quantizationFactor=e,this.srcImgUrl=r,this.grayscale=t,this.recolorMode=n}loadSourceImage(){var e=new Image;e.crossOrigin="Anonymous",e.addEventListener("load",function(){this.scaleDownImage(e,.5)}.bind(this)),e.src=this.srcImgUrl}scaleDownImage(e,t){var r=document.getElementById("source-canvas");i=e.width;var n=r.getContext("2d"),o=~~(e.width*t),a=~~(e.height*t);r.width=o,r.height=a,this.grayscale&&(n.filter="saturate(0%)"),n.drawImage(e,0,0,o,a),n.filter="none";var l=n.getImageData(0,0,o,a);this.recolor({srcDataArray:Array.from(l.data),smallWidth:o,smallHeight:a,scale:i/o})}recolor({srcDataArray:e,scale:t=1,smallWidth:r,smallHeight:n}){var i=document.getElementById("target-canvas");i.width=r*t,i.height=n*t;for(var o=i.getContext("2d"),l={},c=0;c<e.length;c+=4){let n=e.slice(c,c+4),i=this.rgbaToString(n),u=l[i];if(!u){if("random"===this.recolorMode)u=this.rgbaToString([a.roll(256),a.roll(256),a.roll(256),255]);else if("shiftHue"===this.recolorMode){let e=s(i);e.h=a.roll(360),u=e.toString()}l[i]=u}let f=c/4,h=f%r*t,p=~~(f/r)*t;o.fillStyle=u,o.fillRect(h,p,t,t)}}rgbaToString(e){return`rgba(${e.slice(0,3).map(this.roundColorRawValue.bind(this)).join(", ")}, ${e[3]/255})`}roundColorRawValue(e){return~~(e/this.quantizationFactor)*this.quantizationFactor}}!function(){window.onerror=n;const e=l.parse(window.location.hash.slice(1));new c(e).loadSourceImage()}()},{"d3-color":2,"handle-error-web":3,probable:4,qs:6}],2:[function(e,t,r){!function(e,n){"object"==typeof r&&void 0!==t?n(r):"function"==typeof define&&define.amd?define(["exports"],n):n(e.d3=e.d3||{})}(this,function(e){"use strict";function t(e,t,r){e.prototype=t.prototype=r,r.constructor=e}function r(e,t){var r=Object.create(e.prototype);for(var n in t)r[n]=t[n];return r}function n(){}function i(e){var t;return e=(e+"").trim().toLowerCase(),(t=R.exec(e))?(t=parseInt(t[1],16),new c(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1)):(t=P.exec(e))?o(parseInt(t[1],16)):(t=q.exec(e))?new c(t[1],t[2],t[3],1):(t=I.exec(e))?new c(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=S.exec(e))?a(t[1],t[2],t[3],t[4]):(t=C.exec(e))?a(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=F.exec(e))?f(t[1],t[2]/100,t[3]/100,1):(t=L.exec(e))?f(t[1],t[2]/100,t[3]/100,t[4]):T.hasOwnProperty(e)?o(T[e]):"transparent"===e?new c(NaN,NaN,NaN,0):null}function o(e){return new c(e>>16&255,e>>8&255,255&e,1)}function a(e,t,r,n){return n<=0&&(e=t=r=NaN),new c(e,t,r,n)}function l(e){return e instanceof n||(e=i(e)),e?(e=e.rgb(),new c(e.r,e.g,e.b,e.opacity)):new c}function s(e,t,r,n){return 1===arguments.length?l(e):new c(e,t,r,null==n?1:n)}function c(e,t,r,n){this.r=+e,this.g=+t,this.b=+r,this.opacity=+n}function u(e){return((e=Math.max(0,Math.min(255,Math.round(e)||0)))<16?"0":"")+e.toString(16)}function f(e,t,r,n){return n<=0?e=t=r=NaN:r<=0||r>=1?e=t=NaN:t<=0&&(e=NaN),new p(e,t,r,n)}function h(e,t,r,o){return 1===arguments.length?function(e){if(e instanceof p)return new p(e.h,e.s,e.l,e.opacity);if(e instanceof n||(e=i(e)),!e)return new p;if(e instanceof p)return e;var t=(e=e.rgb()).r/255,r=e.g/255,o=e.b/255,a=Math.min(t,r,o),l=Math.max(t,r,o),s=NaN,c=l-a,u=(l+a)/2;return c?(s=t===l?(r-o)/c+6*(r<o):r===l?(o-t)/c+2:(t-r)/c+4,c/=u<.5?l+a:2-l-a,s*=60):c=u>0&&u<1?0:s,new p(s,c,u,e.opacity)}(e):new p(e,t,r,null==o?1:o)}function p(e,t,r,n){this.h=+e,this.s=+t,this.l=+r,this.opacity=+n}function d(e,t,r){return 255*(e<60?t+(r-t)*e/60:e<180?r:e<240?t+(r-t)*(240-e)/60:t)}function g(e){if(e instanceof b)return new b(e.l,e.a,e.b,e.opacity);if(e instanceof j){if(isNaN(e.h))return new b(e.l,0,0,e.opacity);var t=e.h*H;return new b(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}e instanceof c||(e=l(e));var r,n,i=k(e.r),o=k(e.g),a=k(e.b),s=m((.2225045*i+.7168786*o+.0606169*a)/U);return i===o&&o===a?r=n=s:(r=m((.4360747*i+.3850649*o+.1430804*a)/z),n=m((.0139322*i+.0971045*o+.7141733*a)/B)),new b(116*s-16,500*(r-s),200*(s-n),e.opacity)}function y(e,t,r,n){return 1===arguments.length?g(e):new b(e,t,r,null==n?1:n)}function b(e,t,r,n){this.l=+e,this.a=+t,this.b=+r,this.opacity=+n}function m(e){return e>W?Math.pow(e,1/3):e/Q+V}function w(e){return e>_?e*e*e:Q*(e-V)}function v(e){return 255*(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function k(e){return(e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function N(e){if(e instanceof j)return new j(e.h,e.c,e.l,e.opacity);if(e instanceof b||(e=g(e)),0===e.a&&0===e.b)return new j(NaN,0,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*$;return new j(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function x(e,t,r,n){return 1===arguments.length?N(e):new j(e,t,r,null==n?1:n)}function j(e,t,r,n){this.h=+e,this.c=+t,this.l=+r,this.opacity=+n}function O(e,t,r,n){return 1===arguments.length?function(e){if(e instanceof A)return new A(e.h,e.s,e.l,e.opacity);e instanceof c||(e=l(e));var t=e.r/255,r=e.g/255,n=e.b/255,i=(te*n+Z*t-ee*r)/(te+Z-ee),o=n-i,a=(Y*(r-i)-K*o)/X,s=Math.sqrt(a*a+o*o)/(Y*i*(1-i)),u=s?Math.atan2(a,o)*$-120:NaN;return new A(u<0?u+360:u,s,i,e.opacity)}(e):new A(e,t,r,null==n?1:n)}function A(e,t,r,n){this.h=+e,this.s=+t,this.l=+r,this.opacity=+n}var M="\\s*([+-]?\\d+)\\s*",D="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",E="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",R=/^#([0-9a-f]{3})$/,P=/^#([0-9a-f]{6})$/,q=new RegExp("^rgb\\("+[M,M,M]+"\\)$"),I=new RegExp("^rgb\\("+[E,E,E]+"\\)$"),S=new RegExp("^rgba\\("+[M,M,M,D]+"\\)$"),C=new RegExp("^rgba\\("+[E,E,E,D]+"\\)$"),F=new RegExp("^hsl\\("+[D,E,E]+"\\)$"),L=new RegExp("^hsla\\("+[D,E,E,D]+"\\)$"),T={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};t(n,i,{displayable:function(){return this.rgb().displayable()},hex:function(){return this.rgb().hex()},toString:function(){return this.rgb()+""}}),t(c,s,r(n,{brighter:function(e){return e=null==e?1/.7:Math.pow(1/.7,e),new c(this.r*e,this.g*e,this.b*e,this.opacity)},darker:function(e){return e=null==e?.7:Math.pow(.7,e),new c(this.r*e,this.g*e,this.b*e,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},hex:function(){return"#"+u(this.r)+u(this.g)+u(this.b)},toString:function(){var e=this.opacity;return(1===(e=isNaN(e)?1:Math.max(0,Math.min(1,e)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===e?")":", "+e+")")}})),t(p,h,r(n,{brighter:function(e){return e=null==e?1/.7:Math.pow(1/.7,e),new p(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?.7:Math.pow(.7,e),new p(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,r=this.l,n=r+(r<.5?r:1-r)*t,i=2*r-n;return new c(d(e>=240?e-240:e+120,i,n),d(e,i,n),d(e<120?e+240:e-120,i,n),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var H=Math.PI/180,$=180/Math.PI,z=.96422,U=1,B=.82521,V=4/29,_=6/29,Q=3*_*_,W=_*_*_;t(b,y,r(n,{brighter:function(e){return new b(this.l+18*(null==e?1:e),this.a,this.b,this.opacity)},darker:function(e){return new b(this.l-18*(null==e?1:e),this.a,this.b,this.opacity)},rgb:function(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,r=isNaN(this.b)?e:e-this.b/200;return t=z*w(t),e=U*w(e),r=B*w(r),new c(v(3.1338561*t-1.6168667*e-.4906146*r),v(-.9787684*t+1.9161415*e+.033454*r),v(.0719453*t-.2289914*e+1.4052427*r),this.opacity)}})),t(j,x,r(n,{brighter:function(e){return new j(this.h,this.c,this.l+18*(null==e?1:e),this.opacity)},darker:function(e){return new j(this.h,this.c,this.l-18*(null==e?1:e),this.opacity)},rgb:function(){return g(this).rgb()}}));var G=-.14861,J=1.78277,K=-.29227,X=-.90649,Y=1.97294,Z=Y*X,ee=Y*J,te=J*K-X*G;t(A,O,r(n,{brighter:function(e){return e=null==e?1/.7:Math.pow(1/.7,e),new A(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?.7:Math.pow(.7,e),new A(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=isNaN(this.h)?0:(this.h+120)*H,t=+this.l,r=isNaN(this.s)?0:this.s*t*(1-t),n=Math.cos(e),i=Math.sin(e);return new c(255*(t+r*(G*n+J*i)),255*(t+r*(K*n+X*i)),255*(t+r*(Y*n)),this.opacity)}})),e.color=i,e.rgb=s,e.hsl=h,e.lab=y,e.hcl=x,e.lch=function(e,t,r,n){return 1===arguments.length?N(e):new j(r,t,e,null==n?1:n)},e.gray=function(e,t){return new b(e,0,0,null==t?1:t)},e.cubehelix=O,Object.defineProperty(e,"__esModule",{value:!0})})},{}],3:[function(e,t,r){function n(e){if(e){console.error(e,e.stack);var t="";e.name&&(t+=e.name+": "),t+=e.message,e.stack&&(t+=" | "+e.stack.toString()),function(e){var t=document.getElementById("status-message");t.textContent=e,t.classList.remove("hidden")}(t)}}t.exports=n},{}],4:[function(e,t,r){function n(e){function t(e){return Math.floor(h()*e)}function r(e){function r(e){return function(e,t){t=+t;for(var r=0;r<e.length;++r){var n=e[r],i=n[0];if(t>=i[0]&&t<=i[1])return n[1]}}(n,e)}var n=e,i=n[n.length-1][0][1]-n[0][0][0]+1;return{outcomeAtIndex:r,roll:function(){var e=r(t(i));return"function"!=typeof e||"probable_rollOnTable"!==e.name&&"probable_pick"!==e.name?e:e()},length:i,getRangesAndOutcomesArray:function(){return n}}}function n(e){var t=[],r=-1,n=function(e){var t=[];for(var r in e){var n=e[r];t.push([n,r])}return t}(e);return(n=n.sort(i)).forEach(function(e){var n=e[0],i=e[1],o=r+1,a=o+n-1;t.push([[o,a],i]),r=a}),t}function i(e,t){return e[0]>t[0]?-1:1}function o(e){return r(function(e){var t=[];for(var r in e){var n=function(e){var t=e.split("-");if(t.length>2)return;return 1===t.length?[+e,+e]:[+t[0],+t[1]]}(r),i=e[r];if("object"==typeof i)if(Array.isArray(i))i=c(i);else{var l=o(i);"function"==typeof l.roll&&(i=l.roll)}t.push([n,i])}return t.sort(a)}(e))}function a(e,t){return e[0][0]<t[0][0]?-1:1}function l(e){return r(function(e){function t(e){var t=e[0],n=e[1],i=r+t-1,o=[r,i];if(r=i+1,Array.isArray(n))if(function(e){return Array.isArray(e)&&e.length>0&&Array.isArray(e[0])&&2===e[0].length&&"number"==typeof e[0][0]}(n)){var a=l(n);"function"==typeof a.roll&&(n=a.roll)}else n=c(n);return[o,n]}var r=0;return e.map(t)}(e))}function s(e,r){return!e||"number"!=typeof e.length||e.length<1?r:e[t(e.length)]}function c(e,t){return function(){return s(e,t)}}function u(e,t){var r=[];return e.forEach(function(e){t.forEach(function(t){Array.isArray(e)||Array.isArray(t)?r.push(e.concat(t)):r.push([e,t])})}),r}function f(e){for(var r,n=e.length,i=Array(n),o=0;o<n;o++)(r=t(o+1))!==o&&(i[o]=i[r]),i[r]=e[o];return i}var h=Math.random;return e&&e.random&&(h=e.random),{roll:t,rollDie:function(e){return 0===e?0:t(e)+1},createRangeTable:r,createRangeTableFromDict:function(e){return r(n(e))},createTableFromDef:o,createTableFromSizes:l,convertDictToRangesAndOutcomePairs:n,pickFromArray:s,crossArrays:u,getCartesianProduct:function(e){return e.slice(1).reduce(u,e[0])},shuffle:f,sample:function(e,t){return f(e).slice(0,t)},randomFn:h}}var i=n();"object"==typeof t&&(t.exports=i,t.exports.createProbable=n)},{}],5:[function(e,t,r){"use strict";var n=String.prototype.replace,i=/%20/g;t.exports={default:"RFC3986",formatters:{RFC1738:function(e){return n.call(e,i,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},{}],6:[function(e,t,r){"use strict";var n=e("./stringify"),i=e("./parse"),o=e("./formats");t.exports={formats:o,parse:i,stringify:n}},{"./formats":5,"./parse":7,"./stringify":8}],7:[function(e,t,r){"use strict";var n=e("./utils"),i=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(n),l=a?n.slice(0,a.index):n,s=[];if(l){if(!r.plainObjects&&i.call(Object.prototype,l)&&!r.allowPrototypes)return;s.push(l)}for(var c=0;null!==(a=o.exec(n))&&c<r.depth;){if(c+=1,!r.plainObjects&&i.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;s.push(a[1])}return a&&s.push("["+n.slice(a.index)+"]"),function(e,t,r){for(var n=t,i=e.length-1;i>=0;--i){var o,a=e[i];if("[]"===a)o=(o=[]).concat(n);else{o=r.plainObjects?Object.create(null):{};var l="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,s=parseInt(l,10);!isNaN(s)&&a!==l&&String(s)===l&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(o=[])[s]=n:o[l]=n}n=o}return n}(s,t,r)}};t.exports=function(e,t){var r=t?n.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof e?function(e,t){for(var r={},n=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,l=n.split(t.delimiter,a),s=0;s<l.length;++s){var c,u,f=l[s],h=f.indexOf("]="),p=-1===h?f.indexOf("="):h+1;-1===p?(c=t.decoder(f,o.decoder),u=t.strictNullHandling?null:""):(c=t.decoder(f.slice(0,p),o.decoder),u=t.decoder(f.slice(p+1),o.decoder)),i.call(r,c)?r[c]=[].concat(r[c]).concat(u):r[c]=u}return r}(e,r):e,s=r.plainObjects?Object.create(null):{},c=Object.keys(l),u=0;u<c.length;++u){var f=c[u],h=a(f,l[f],r);s=n.merge(s,h,r)}return n.compact(s)}},{"./utils":9}],8:[function(e,t,r){"use strict";var n=e("./utils"),i=e("./formats"),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},a=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(e){return a.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,r,i,o,a,s,c,u,f,h,p,d){var g=t;if("function"==typeof c)g=c(r,g);else if(g instanceof Date)g=h(g);else if(null===g){if(o)return s&&!d?s(r,l.encoder):r;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||n.isBuffer(g)){if(s){return[p(d?r:s(r,l.encoder))+"="+p(s(g,l.encoder))]}return[p(r)+"="+p(String(g))]}var y=[];if(void 0===g)return y;var b;if(Array.isArray(c))b=c;else{var m=Object.keys(g);b=u?m.sort(u):m}for(var w=0;w<b.length;++w){var v=b[w];a&&null===g[v]||(y=Array.isArray(g)?y.concat(e(g[v],i(r,v),i,o,a,s,c,u,f,h,p,d)):y.concat(e(g[v],r+(f?"."+v:"["+v+"]"),i,o,a,s,c,u,f,h,p,d)))}return y};t.exports=function(e,t){var r=e,a=t?n.assign({},t):{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!=typeof a.encoder)throw new TypeError("Encoder has to be a function.");var c=void 0===a.delimiter?l.delimiter:a.delimiter,u="boolean"==typeof a.strictNullHandling?a.strictNullHandling:l.strictNullHandling,f="boolean"==typeof a.skipNulls?a.skipNulls:l.skipNulls,h="boolean"==typeof a.encode?a.encode:l.encode,p="function"==typeof a.encoder?a.encoder:l.encoder,d="function"==typeof a.sort?a.sort:null,g=void 0!==a.allowDots&&a.allowDots,y="function"==typeof a.serializeDate?a.serializeDate:l.serializeDate,b="boolean"==typeof a.encodeValuesOnly?a.encodeValuesOnly:l.encodeValuesOnly;if(void 0===a.format)a.format=i.default;else if(!Object.prototype.hasOwnProperty.call(i.formatters,a.format))throw new TypeError("Unknown format option provided.");var m,w,v=i.formatters[a.format];"function"==typeof a.filter?r=(w=a.filter)("",r):Array.isArray(a.filter)&&(m=w=a.filter);var k=[];if("object"!=typeof r||null===r)return"";var N;N=a.arrayFormat in o?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var x=o[N];m||(m=Object.keys(r)),d&&m.sort(d);for(var j=0;j<m.length;++j){var O=m[j];f&&null===r[O]||(k=k.concat(s(r[O],O,x,u,f,h?p:null,w,d,g,y,v,b)))}var A=k.join(c),M=!0===a.addQueryPrefix?"?":"";return A.length>0?M+A:""}},{"./formats":5,"./utils":9}],9:[function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r};t.exports={arrayToObject:o,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var i=t[n],o=i.obj[i.prop],a=Object.keys(o),l=0;l<a.length;++l){var s=a[l],c=o[s];"object"==typeof c&&null!==c&&-1===r.indexOf(c)&&(t.push({obj:o,prop:s}),r.push(c))}return function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var n=[],i=0;i<t.length;++i)void 0!==t[i]&&n.push(t[i]);r.obj[r.prop]=n}}return t}(t)},decode:function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},encode:function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",n=0;n<t.length;++n){var o=t.charCodeAt(n);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(n):o<128?r+=i[o]:o<2048?r+=i[192|o>>6]+i[128|63&o]:o<55296||o>=57344?r+=i[224|o>>12]+i[128|o>>6&63]+i[128|63&o]:(n+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(n)),r+=i[240|o>>18]+i[128|o>>12&63]+i[128|o>>6&63]+i[128|63&o])}return r},isBuffer:function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,i){if(!r)return t;if("object"!=typeof r){if(Array.isArray(t))t.push(r);else{if("object"!=typeof t)return[t,r];(i.plainObjects||i.allowPrototypes||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if("object"!=typeof t)return[t].concat(r);var a=t;return Array.isArray(t)&&!Array.isArray(r)&&(a=o(t,i)),Array.isArray(t)&&Array.isArray(r)?(r.forEach(function(r,o){n.call(t,o)?t[o]&&"object"==typeof t[o]?t[o]=e(t[o],r,i):t.push(r):t[o]=r}),t):Object.keys(r).reduce(function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t},a)}}},{}]},{},[1]);
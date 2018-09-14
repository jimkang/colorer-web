var handleError = require('handle-error-web');
var qs = require('qs');
var renderers = {
  replacer: require('./replacer'),
  linefiller: require('./linefiller')
};

(function go() {
  window.onerror = reportTopLevelError;
  const parms = qs.parse(window.location.hash.slice(1));
  loadSourceImage();

  function loadSourceImage() {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', useImage);
    img.src = parms.srcImgUrl || 'data/fish.jpg';
  }

  function useImage(e) {
    var rendererOpts = Object.assign({ img: e.currentTarget }, parms);
    var renderer = new renderers[parms.renderer || 'replacer'](rendererOpts);
    renderer.start();
  }
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

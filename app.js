var handleError = require('handle-error-web');
var RouteState = require('route-state');

var routeState = RouteState({
  followRoute,
  windowObject: window
});

var renderers = {
  replacer: require('./replacer'),
  linefiller: require('./linefiller')
};

(function go() {
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function followRoute({
  srcImgUrl = 'data/fish.jpg',
  renderer = 'replacer',
  quant = 16,
  grayscale = false,
  recolorMode = 'random'
}) {
  loadSourceImage();

  function loadSourceImage() {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', useImage);
    img.src = srcImgUrl;
  }

  function useImage(e) {
    var rendererOpts = { img: e.currentTarget, quant, grayscale, recolorMode };
    var theRenderer = new renderers[renderer](rendererOpts);
    theRenderer.start();
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

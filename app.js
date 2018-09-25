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
  grayscale = 'yes',
  recolorMode = 'random',
  displaySrcImage = 'yes'
}) {
  hideOrShowSrcImage(displaySrcImage === 'yes');
  loadSourceImage();

  function loadSourceImage() {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', useImage);
    img.src = srcImgUrl;
  }

  function useImage(e) {
    var rendererOpts = {
      img: e.currentTarget,
      quant,
      grayscale: grayscale === 'yes',
      recolorMode
    };
    var theRenderer = new renderers[renderer](rendererOpts);
    theRenderer.start();
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function hideOrShowSrcImage(shouldShow) {
  var action = shouldShow ? 'remove' : 'add';
  document.getElementById('source-canvas').classList[action]('hidden');
}

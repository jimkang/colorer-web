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

var targetContainer = document.getElementById('target-canvases-container');

(function go() {
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function followRoute({
  srcImgUrl = 'data/fish.jpg',
  displaySrcImage = 'yes',
  quant = 16,
  grayscale = 'yes',
  recolorMode = 'random',
  renderer = 'replacer',
  showBase = 'no',
  opacityPercentOverBase = 50,
  runs
  // Example url that uses runs: http://localhost:9966/#runs=[{"renderer"%3A "replacer"%2C "quant"%3A 16%2C "grayscale"%3A true%3C "recolorMode"%3A "random"}%2C{"renderer"%3A "replacer"%2C "quant"%3A 128%2C "grayscale"%3A true%2C "recolorMode"%3A "random"}]
}) {
  var optsForEachRun;
  if (runs) {
    optsForEachRun = JSON.parse(decodeURIComponent(runs));
  } else {
    optsForEachRun = [
      {
        quant,
        grayscale,
        recolorMode,
        renderer,
        showBase,
        opacityPercentOverBase
      }
    ];
  }
  hideOrShowSrcImage(displaySrcImage === 'yes');
  loadSourceImage();

  function loadSourceImage() {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', useImage);
    img.src = srcImgUrl;
  }

  function useImage(e) {
    targetContainer.innerHTML = '';
    optsForEachRun.forEach(renderRun);

    function renderRun(
      {
        renderer,
        quant,
        grayscale,
        recolorMode,
        showBase,
        opacityPercentOverBase
      },
      i
    ) {
      var targetCanvas = document.createElement('canvas');
      targetCanvas.setAttribute('id', 'target-canvas-' + i);
      targetContainer.appendChild(targetCanvas);
      var rendererOpts = {
        img: e.currentTarget,
        quant,
        grayscale: grayscale === 'yes',
        recolorMode,
        targetCanvas,
        showBase: showBase === 'yes',
        opacityPercentOverBase: +opacityPercentOverBase
      };
      var theRenderer = new renderers[renderer](rendererOpts);
      theRenderer.start();
    }
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function hideOrShowSrcImage(shouldShow) {
  var action = shouldShow ? 'remove' : 'add';
  document.getElementById('source-canvas').classList[action]('hidden');
}

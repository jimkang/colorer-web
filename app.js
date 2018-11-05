var handleError = require('handle-error-web');
var RouteState = require('route-state');

var routeDefaults = {
  srcImgUrl: 'data/fish.jpg',
  displaySrcImage: 'yes',
  quant: 16,
  grayscale: 'yes',
  recolorMode: 'random',
  renderer: 'replacer',
  showBase: 'no',
  opacityPercentOverBase: 50,
  numberOfRetriesToAvoidSingleColor: 5,
  // The required minimum value between at least two of the colors.
  minimumValueDifference: 0,
  tolerance: 10, // for linefiller line breaks
  maxLength: 2048,
  useWholeNumberScaleUpFactor: 'yes'
};

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

function followRoute(routeOpts) {
  var opts = setDefaults(routeOpts);
  var optsForEachRun;
  if (opts.runs) {
    // Example url that uses runs:
    // http://localhost:9966/#runs=[{"renderer"%3A "replacer"%2C "quant"%3A 16%2C "grayscale"%3A true%2C "recolorMode"%3A "random"}%2C{"renderer"%3A "replacer"%2C "quant"%3A 128%2C "grayscale"%3A true%2C "recolorMode"%3A "random"}]
    optsForEachRun = JSON.parse(decodeURIComponent(opts.runs)).map(setDefaults);
  } else {
    optsForEachRun = [opts];
  }
  hideOrShowSrcImage(opts.displaySrcImage === 'yes');
  loadSourceImage();

  function loadSourceImage() {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', useImage);
    img.src = opts.srcImgUrl;
  }

  function useImage(e) {
    targetContainer.innerHTML = '';
    optsForEachRun.forEach(renderRun);

    function renderRun(runOpts, i) {
      var targetCanvas = document.createElement('canvas');
      targetCanvas.setAttribute('id', 'target-canvas-' + i);
      targetContainer.appendChild(targetCanvas);
      var rendererOpts = Object.assign({}, runOpts, {
        img: e.currentTarget,
        targetCanvas,
        grayscale: runOpts.grayscale === 'yes',
        showBase: runOpts.showBase === 'yes'
      });
      var theRenderer = new renderers[runOpts.renderer](rendererOpts);
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

function setDefaults(opts) {
  return Object.assign({}, routeDefaults, opts);
}

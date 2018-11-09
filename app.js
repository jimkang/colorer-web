var handleError = require('handle-error-web');
var RouteState = require('route-state');
var curry = require('lodash.curry');

var routeDefaults = {
  srcImgUrl: 'data/fish.jpg',
  useCamera: 'no',
  cameraRefreshInterval: 1000,
  videoSize: 640,
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
  if (opts.useCamera === 'yes') {
    // one frame first. then timer after that.
    loadCameraFrame();
  } else {
    loadSourceImage();
  }

  function loadCameraFrame() {
    console.log('loadCameraFrame!');
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        var runOpts = optsForEachRun[0];
        var videoEl = document.getElementById('camera-buffer');
        videoEl.height = runOpts.videoSize;
        videoEl.width = runOpts.videoSize;
        videoEl.srcObject = stream;
        videoEl.play();
        function renderFromVideo () {
          renderRun(videoEl, runOpts, 0);
        }
        if (runOpts.cameraRefreshInterval) {
          setInterval(renderFromVideo, runOpts.cameraRefreshInterval);
        } else {
          doInAnimationFrame(renderFromVideo);
        }
      })
      .catch(function(err) {
        console.log('An error occurred! ' + err);
      });
  }

  function doInAnimationFrame (renderFn) {
    renderFn();
    requestAnimationFrame(doInAnimationFrame);
  }

  function loadSourceImage() {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', useImage);
    img.src = opts.srcImgUrl;
  }

  function useImage(e) {
    targetContainer.innerHTML = '';
    var curriedRun = curry(renderRun)(e.currentTarget);
    optsForEachRun.forEach(curriedRun);
  }

  function renderRun(srcImg, runOpts, i) {
    var targetCanvasId = `target-canvas-${i}`;
    var targetCanvas = document.getElementById(targetCanvasId);
    if (!targetCanvas) {
      targetCanvas = document.createElement('canvas');
      targetCanvas.setAttribute('id', targetCanvasId);
      targetContainer.appendChild(targetCanvas);
    }
    var rendererOpts = Object.assign({}, runOpts, {
      img: srcImg,
      targetCanvas,
      grayscale: runOpts.grayscale === 'yes',
      showBase: runOpts.showBase === 'yes'
    });
    var theRenderer = new renderers[runOpts.renderer](rendererOpts);
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

function setDefaults(opts) {
  return Object.assign({}, routeDefaults, opts);
}

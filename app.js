var handleError = require('handle-error-web');
var probable = require('probable');

var originalWidth;

(function go() {
  window.onerror = reportTopLevelError;
  loadSourceImage();
})();

function loadSourceImage() {
  var img = new Image();
  img.addEventListener('load', doTransform);
  img.src = 'data/fish.jpg';
  
  function doTransform() {
    const srcScale = .5;
    scaleDownImage(img, srcScale);
  }
}

function scaleDownImage(img, scale) {
  var srcCanvas = document.getElementById('source-canvas');
  originalWidth = img.width;
  var ctx = srcCanvas.getContext('2d');
  var smallWidth = ~~(img.width * scale);
  var smallHeight = ~~(img.height * scale);
  srcCanvas.width = smallWidth;
  srcCanvas.height = smallHeight;
  ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
  // Now we are in smallville.
  var imageData = ctx.getImageData(0, 0, smallWidth, smallHeight);
  recolor({ srcDataArray: Array.from(imageData.data), smallWidth, smallHeight, scale: originalWidth/smallWidth });
}

function recolor({ srcDataArray, scale = 1.0, smallWidth, smallHeight }) {
  var targetCanvas = document.getElementById('target-canvas');
  targetCanvas.width = smallWidth * scale;
  targetCanvas.height = smallHeight * scale;
  var targetCtx = targetCanvas.getContext('2d');
  var newForOld = {};

  for (var i = 0; i < srcDataArray.length; i += 4) {
    let rgbaArray = srcDataArray.slice(i, i + 4);
    let originalString = rgbaToString(rgbaArray);
    let replacement = newForOld[originalString];
    if (!replacement) {
      replacement = rgbaToString([probable.roll(256), probable.roll(256), probable.roll(256), 255]);
      newForOld[originalString] = replacement;
    }
    replacement = originalString;

    let pixelIdx = i / 4;
    let srcRow = ~~(pixelIdx / smallWidth);
    let srcCol = pixelIdx % smallWidth;
    let destX = (srcCol * scale);
    let destY = (srcRow * scale);
    if (pixelIdx < 100) {
      console.log(JSON.stringify({srcCol, srcRow, destX, destY, scale}));
    }

    targetCtx.fillStyle = replacement;
    targetCtx.fillRect(destX, destY, scale, scale);
  }

  // targetCtx.fillStyle = 'blue';
  // targetCtx.fillRect(0, 0, 1000, 1000);
}

function rgbaToString(rgbaArray) {
  return `rgba(${rgbaArray.slice(0, 3).map(roundColorRawValue).join(', ')}, ${rgbaArray[3]/255})`;
}

function roundColorRawValue(v) {
  return ~~(v/16) * 16;
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}


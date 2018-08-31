var handleError = require('handle-error-web');
var probable = require('probable');

var originalWidth;

(function go() {
  window.onerror = reportTopLevelError;
  loadSourceImage();
})();

function loadSourceImage() {
  var img = new Image();
  img.addEventListener('load', drawSrcImage);
  img.src = 'data/fish.jpg';
  
  function drawSrcImage() {
    var srcCanvas = document.getElementById('source-canvas');
    originalWidth = img.width;
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    var ctx = srcCanvas.getContext('2d');
    scaleDownImage(ctx, img, 1/32);
  }
}

function scaleDownImage(ctx, img, scale) {
  var smallWidth = img.width * scale;
  var smallHeight = img.height * scale;
  ctx.drawImage(img, 0, 0, smallWidth, smallHeight);

  var imageData = ctx.getImageData(0, 0, smallWidth, smallHeight);
  console.log(imageData.data);
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
    // replacement = originalString;

    let srcY = ~~(i/4/smallWidth);
    let srcX = ~~(i/4) % smallWidth;
    let destX = ~~(srcX * scale);
    let destY = ~~(srcY * scale);
    // console.log('src', srcX, srcY);
    // console.log('dest', destX, destY);

    targetCtx.fillStyle = replacement;
    targetCtx.fillRect(destX, destY, scale, scale);
  }

  // targetCtx.fillStyle = 'blue';
  // targetCtx.fillRect(0, 0, 1000, 1000);
}

function rgbaToString(rgbaArray) {
  console.log('array', rgbaArray);
  return `rgba(${rgbaArray.slice(0, 3).map(roundColorRawValue).join(', ')}, ${rgbaArray[3]/255})`;
}

function roundColorRawValue(v) {
  return ~~(v/16) * 16;
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}


var handleError = require('handle-error-web');
var probable = require('probable');
var qs = require('qs');

var originalWidth;

class ColorerApp {
  constructor ({quant = 16, srcImgUrl = 'data/fish.jpg'}) {
    this.quantizationFactor = quant;
    this.srcImgUrl = srcImgUrl;
  }

  loadSourceImage () {
    var img = new Image();
    img.addEventListener('load', doTransform.bind(this));
    img.src = this.srcImgUrl;

    function doTransform() {
      const srcScale = .5;
      this.scaleDownImage(img, srcScale);
    }
  }

  scaleDownImage(img, scale) {
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
    this.recolor({
      srcDataArray: Array.from(imageData.data),
      smallWidth,
      smallHeight,
      scale: originalWidth/smallWidth
    });
  }

  recolor({ srcDataArray, scale = 1.0, smallWidth, smallHeight }) {
    var targetCanvas = document.getElementById('target-canvas');
    targetCanvas.width = smallWidth * scale;
    targetCanvas.height = smallHeight * scale;
    var targetCtx = targetCanvas.getContext('2d');
    var newForOld = {};

    for (var i = 0; i < srcDataArray.length; i += 4) {
      let rgbaArray = srcDataArray.slice(i, i + 4);
      let originalString = this.rgbaToString(rgbaArray);
      let replacement = newForOld[originalString];
      if (!replacement) {
        replacement = this.rgbaToString([probable.roll(256), probable.roll(256), probable.roll(256), 255]);
        newForOld[originalString] = replacement;
      }
      // replacement = originalString;

      let pixelIdx = i / 4;
      let srcRow = ~~(pixelIdx / smallWidth);
      let srcCol = pixelIdx % smallWidth;
      let destX = (srcCol * scale);
      let destY = (srcRow * scale);

      targetCtx.fillStyle = replacement;
      targetCtx.fillRect(destX, destY, scale, scale);
    }

    // targetCtx.fillStyle = 'blue';
    // targetCtx.fillRect(0, 0, 1000, 1000);
  }

  rgbaToString(rgbaArray) {
    return `rgba(${rgbaArray.slice(0, 3).map(this.roundColorRawValue.bind(this)).join(', ')}, ${rgbaArray[3]/255})`;
  }

  roundColorRawValue(v) {
    return ~~( v / this.quantizationFactor) * this.quantizationFactor;
  }
}

(function go() {
  window.onerror = reportTopLevelError;
  const parms = qs.parse(window.location.hash.slice(1));
  const app = new ColorerApp(parms);
  app.loadSourceImage();
})();


function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}


var probable = require('probable');
var hsl = require('d3-color').hsl;

var originalWidth;

class Replacer {
  constructor({
    img,
    quant,
    grayscale,
    recolorMode,
    targetCanvas,
    showBase,
    opacityPercentOverBase
  }) {
    this.quantizationFactor = quant;
    this.grayscale = grayscale;
    this.recolorMode = recolorMode;
    this.img = img;
    this.targetCanvas = targetCanvas;
    this.showBase = showBase;
    this.opacityPercentOverBase = opacityPercentOverBase;
  }

  start() {
    const srcScale = 0.5;
    this.scaleDownImage(srcScale);
  }

  scaleDownImage(scale) {
    var img = this.img;
    var srcCanvas = document.getElementById('source-canvas');
    originalWidth = img.width;
    var ctx = srcCanvas.getContext('2d');
    var smallWidth = ~~(img.width * scale);
    var smallHeight = ~~(img.height * scale);
    srcCanvas.width = smallWidth;
    srcCanvas.height = smallHeight;
    if (this.grayscale) {
      ctx.filter = 'saturate(0%)';
    }
    ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
    ctx.filter = 'none';
    // Now we are in smallville.
    var imageData = ctx.getImageData(0, 0, smallWidth, smallHeight);
    this.recolor({
      srcDataArray: Array.from(imageData.data),
      smallWidth,
      smallHeight,
      scale: originalWidth / smallWidth,
      showBase: this.showBase,
      opacityPercentOverBase: this.opacityPercentOverBase
    });
  }

  recolor({
    srcDataArray,
    scale = 1.0,
    smallWidth,
    smallHeight,
    showBase = false,
    opacityPercentOverBase = 50
  }) {
    var targetCanvas = this.targetCanvas;
    targetCanvas.width = smallWidth * scale;
    targetCanvas.height = smallHeight * scale;
    var targetCtx = targetCanvas.getContext('2d');

    if (showBase) {
      targetCtx.filter = 'saturate(0%)';
      targetCtx.drawImage(this.img, 0, 0);

      targetCtx.filter = 'none';
      targetCtx.globalAlpha = opacityPercentOverBase / 100;
    }

    var newForOld = {};

    for (var i = 0; i < srcDataArray.length; i += 4) {
      let rgbaArray = srcDataArray.slice(i, i + 4);
      let originalString = this.rgbaToString(rgbaArray);
      let replacement = newForOld[originalString];
      if (!replacement) {
        if (this.recolorMode === 'random') {
          replacement = this.rgbaToString([
            probable.roll(256),
            probable.roll(256),
            probable.roll(256),
            255
          ]);
        } else if (this.recolorMode === 'shiftHue') {
          let color = hsl(originalString);
          color.h = probable.roll(360);
          replacement = color.toString();
        }
        newForOld[originalString] = replacement;
      }
      // replacement = originalString;

      let pixelIdx = i / 4;
      let srcRow = ~~(pixelIdx / smallWidth);
      let srcCol = pixelIdx % smallWidth;
      let destX = srcCol * scale;
      let destY = srcRow * scale;

      targetCtx.fillStyle = replacement;
      targetCtx.fillRect(destX, destY, scale, scale);
    }

    // targetCtx.fillStyle = 'blue';
    // targetCtx.fillRect(0, 0, 1000, 1000);
  }

  rgbaToString(rgbaArray) {
    return `rgba(${rgbaArray
      .slice(0, 3)
      .map(this.roundColorRawValue.bind(this))
      .join(', ')}, ${rgbaArray[3] / 255})`;
  }

  roundColorRawValue(v) {
    return ~~(v / this.quantizationFactor) * this.quantizationFactor;
  }
}

module.exports = Replacer;

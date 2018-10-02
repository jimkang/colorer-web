var probable = require('probable');
var hsl = require('d3-color').hsl;

var originalWidth;

class Replacer {
  constructor(routeOpts) {
    this.quantizationFactor = routeOpts.quant;
    this.grayscale = routeOpts.grayscale;
    this.recolorMode = routeOpts.recolorMode;
    this.img = routeOpts.img;
    this.targetCanvas = routeOpts.targetCanvas;
    this.showBase = routeOpts.showBase;
    this.opacityPercentOverBase = routeOpts.opacityPercentOverBase;
    this.numberOfRetriesToAvoidSingleColor = +routeOpts.numberOfRetriesToAvoidSingleColor;
    this.minimumValueDifference = +routeOpts.minimumValueDifference;
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
      scale: originalWidth / smallWidth
    });
  }

  recolor({ srcDataArray, scale = 1.0, smallWidth, smallHeight }) {
    var targetCanvas = this.targetCanvas;
    targetCanvas.width = smallWidth * scale;
    targetCanvas.height = smallHeight * scale;
    var targetCtx = targetCanvas.getContext('2d');

    if (this.showBase) {
      targetCtx.filter = 'saturate(0%)';
      targetCtx.drawImage(this.img, 0, 0);

      targetCtx.filter = 'none';
      targetCtx.globalAlpha = this.opacityPercentOverBase / 100;
    }

    for (
      var attempts = 0;
      attempts < this.numberOfRetriesToAvoidSingleColor;
      ++attempts
    ) {
      var replacementColors = replaceColors(
        this.rgbaToString.bind(this),
        this.recolorMode
      );
      console.log('replacementColors', replacementColors);
      if (replacementColors.length > 1) {
        if (this.minimumValueDifference <= 0) {
          break;
        }
        if (
          colorsHaveAValueDiffOverMin(
            replacementColors,
            this.minimumValueDifference
          )
        ) {
          break;
        }
      }
    }

    function replaceColors(rgbaToString, recolorMode) {
      var newForOld = {};
      var replacementsSet = {};

      for (var i = 0; i < srcDataArray.length; i += 4) {
        let rgbaArray = srcDataArray.slice(i, i + 4);
        let originalString = rgbaToString(rgbaArray);
        let replacement = newForOld[originalString];
        if (!replacement) {
          if (recolorMode === 'random') {
            replacement = rgbaToString([
              probable.roll(256),
              probable.roll(256),
              probable.roll(256),
              255
            ]);
          } else if (recolorMode === 'shiftHue') {
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
        replacementsSet[replacement] = true;
      }

      return Object.keys(replacementsSet);
    }
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

function colorsHaveAValueDiffOverMin(colors, min) {
  var values = colors.map(getColorValue);
  for (var i = 0; i < values.length; ++i) {
    for (let j = i; j < values.length; ++j) {
      let diff = Math.abs(values[i] - values[j]);
      // console.log('diff', diff);
      if (diff >= min) {
        return true;
      }
    }
  }
  return false;
}

function getColorValue(colorString) {
  var color = hsl(colorString);
  return color.l;
}

module.exports = Replacer;

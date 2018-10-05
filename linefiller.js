var probable = require('probable');
var hsl = require('d3-color').hsl;

var originalWidth;

class LineFiller {
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
    // Draw srcCanvas
    const imgData = this.drawSrcCanvas();
    this.recolor({imgData});
  }

  drawSrcCanvas () {
    var img = this.img;
    var srcCanvas = document.getElementById('source-canvas');
    var ctx = srcCanvas.getContext('2d');
    srcCanvas.width = img.width
    srcCanvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // pass back imgData? or reference from this.bla
    // for now: passing back.
    return ctx.getImageData(0, 0, img.width, img.height);
  }

  recolor({imgData}) {
    this.targetCanvas.width = imgData.width
    this.targetCanvas.height = imgData.height
    const targetCtx = this.targetCanvas.getContext('2d');
    // Pick a direction: left-to-right
    for (let y = 0; y < imgData.height; y++) {
      // if (y == 10) { return }
      // Watch out! be careful about edge cases, depends on direction.
      // Literal edge cases :)
      for (let x = 0; x < imgData.width - 1; x++) {
        const srcRgba = this.getImgDataRgba({imgData, x, y});
        targetCtx.strokeStyle = rgbaToString(srcRgba);
        targetCtx.beginPath()
        targetCtx.moveTo(x, y);
        targetCtx.lineTo(x + 1, y);
        targetCtx.stroke()
      }
    }
    // Expand a 'line': start w/ beginning color, go until we hit a new color, then
    // fill in all the pixels up to the switch.

    // For extra credit: weave perpendicular directions! (alternate pixels?)
  }

  getImgDataRgba({imgData, x, y}) {
    const startIdx = ((imgData.width * y) + x) * 4
    const rgba = [0, 1, 2, 3].map(function fishPie (i) {
      return imgData.data[startIdx + i]
    })
    return rgba
  }

}

function rgbaToString(rgbaArray) {
  return `rgba(${rgbaArray.slice(0, 3).join(', ')}, ${rgbaArray[3] / 255})`;
}

module.exports = LineFiller;

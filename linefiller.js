var getReplacementColor = require('./getReplacementColor');

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
    this.tolerance = +routeOpts.tolerance;
  }

  start() {
    // Draw srcCanvas
    const imgData = this.drawSrcCanvas();
    this.recolor({ imgData });
  }

  drawSrcCanvas() {
    var img = this.img;
    var srcCanvas = document.getElementById('source-canvas');
    var ctx = srcCanvas.getContext('2d');
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // pass back imgData? or reference from this.bla
    // for now: passing back.
    return ctx.getImageData(0, 0, img.width, img.height);
  }

  recolor({ imgData }) {
    this.targetCanvas.width = imgData.width;
    this.targetCanvas.height = imgData.height;
    const targetCtx = this.targetCanvas.getContext('2d');
    var newForOld = {}; // for replacing colors.
    // Pick a direction: left-to-right
    for (let y = 0; y < imgData.height; y++) {
      let lineStartX = 0;
      let lineColorRgba = null;
      // Watch out! be careful about edge cases, depends on direction.
      // Literal edge cases :)
      for (let x = 0; x < imgData.width; x++) {
        const currentRgba = this.getImgDataRgba({ imgData, x, y });
        if (lineColorRgba === null) {
          lineColorRgba = currentRgba;
        } else {
          // distance function (value-by-avg, d3 stuff)
          const rgbaDistance = getRgbaDistance(lineColorRgba, currentRgba);
          const shouldDrawLine =
            rgbaDistance > this.tolerance || x === imgData.width - 1;
          if (shouldDrawLine) {
            // draw line
            // first get color for line (w/ replacement)
            targetCtx.beginPath();
            targetCtx.moveTo(lineStartX, y);
            targetCtx.lineTo(x, y);
            targetCtx.strokeStyle = getReplacementColor({
              originalString: rgbaToString(lineColorRgba),
              newForOld,
              recolorMode: this.recolorMode,
              rgbaToString
            });
            targetCtx.stroke();
            // reset line.
            lineStartX = x;
            lineColorRgba = null;
          }
        }
      }
    }
    // Expand a 'line': start w/ beginning color, go until we hit a new color, then
    // fill in all the pixels up to the switch.

    // For extra credit: weave perpendicular directions! (alternate pixels?)
    // extra extra credit: only recolor for one weave?
    // or even alternating w/in a line
  }

  getImgDataRgba({ imgData, x, y }) {
    const startIdx = (imgData.width * y + x) * 4;
    const rgba = [0, 1, 2, 3].map(function fishPie(i) {
      return imgData.data[startIdx + i];
    });
    return rgba;
  }
}

function rgbaToString(rgbaArray) {
  return `rgba(${rgbaArray.slice(0, 3).join(', ')}, ${rgbaArray[3] / 255})`;
}

function getRgbaDistance(rgba1, rgba2) {
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    sum += Math.abs(rgba2[i] - rgba1[i]);
  }
  const distance = sum / 4;
  return distance;
}

module.exports = LineFiller;

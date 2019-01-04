var getReplacementColor = require('./getReplacementColor');

class Igniter {
  constructor(routeOpts) {
    this.img = routeOpts.img;
    this.targetCanvas = routeOpts.targetCanvas;
    this.showBase = routeOpts.showBase;
    this.opacityPercentOverBase = routeOpts.opacityPercentOverBase;
  }

  start() {
    // Draw srcCanvas, get imgData.
    this.imgData = this.initCanvases(); // names :(
    // Init stuff before animation.
    this.currentSrcRow = 0; // names :)
    // do request animation frame here.
    requestAnimationFrame(() => {
      this.drawFrame()
      // draw frame!
    })
  }

  initCanvases() {
    var img = this.img;
    var srcCanvas = document.getElementById('source-canvas');
    var ctx = srcCanvas.getContext('2d');
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    this.targetCanvas.width = imgData.width;
    this.targetCanvas.height = imgData.height;
    // pass back imgData? or reference from this.bla
    // for now: passing back.
    return ctx.getImageData(0, 0, img.width, img.height);
  }

  drawFrame () {
    // get current line of srcImage.
    for (let x = 0; x < imgData.width; x++) {
    }
    // bump row.
  }
}

module.exports = Igniter;

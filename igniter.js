var probable = require('probable');

class Igniter {
  constructor(routeOpts) {
    this.img = routeOpts.img;
    this.targetCanvas = routeOpts.targetCanvas;
    this.targetCtx = this.targetCanvas.getContext('2d');
    this.showBase = routeOpts.showBase;
    this.opacityPercentOverBase = routeOpts.opacityPercentOverBase;
    this.boundDrawFrame = this.drawFrame.bind(this);
    this.frameCount = 0;
    this.swapColorPerFrame = routeOpts.swapColorPerFrame === 'yes';
    this.swapColorPerPixel = routeOpts.swapColorPerPixel === 'yes';
    this.swapColorPerAlternateRow =
      routeOpts.swapColorPerAlternateRow === 'yes';
    this.lastAnimationRequestId;
    this.shuffleSwappedColors();
  }

  destroy() {
    if (this.lastAnimationRequestId) {
      window.cancelAnimationFrame(this.lastAnimationRequestId);
    }
  }

  start() {
    // Draw srcCanvas, get imgData.
    this.imgData = this.initCanvases(); // names :(
    // Init stuff before animation.

    this.lastAnimationRequestId = requestAnimationFrame(this.boundDrawFrame);
  }

  initCanvases() {
    var img = this.img;
    var srcCanvas = document.getElementById('source-canvas');
    var ctx = srcCanvas.getContext('2d');
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    this.outputBuffer = new Uint8ClampedArray(img.width * img.height * 4);
    ctx.drawImage(img, 0, 0, img.width, img.height);
    this.targetCanvas.width = img.width;
    this.targetCanvas.height = img.height;
    // pass back imgData? or reference from this.bla
    // for now: passing back.
    return ctx.getImageData(0, 0, img.width, img.height);
  }

  drawFrame() {
    if (this.swapColorPerFrame) {
      this.shuffleSwappedColors();
    }
    for (var row = 0; row < this.imgData.height; ++row) {
      // get current line of srcImage.
      for (let x = 0; x < this.imgData.width; x++) {
        const srcPixelIndex = this.imgData.width * row + x;
        let destPixelIndex =
          (srcPixelIndex + this.frameCount) %
          (this.imgData.width * this.imgData.height);
        if (row % 2 === 0) {
          if (this.swapColorPerPixelAlternateRow) {
            this.shuffleSwappedColors();
          }
          destPixelIndex =
            (srcPixelIndex - this.frameCount) %
            (this.imgData.width * this.imgData.height);
        }
        if (this.swapColorPerPixel) {
          this.shuffleSwappedColors();
        }
        for (let rgbaIndex = 0; rgbaIndex < 4; ++rgbaIndex) {
          const srcBufferIndex = srcPixelIndex * 4 + rgbaIndex;
          let outputBufferIndex = destPixelIndex * 4 + rgbaIndex;

          if (row % 2 === 0) {
            if (rgbaIndex === this.swapColorIndex1) {
              outputBufferIndex = destPixelIndex * 4 + this.swapColorIndex2;
            } else if (rgbaIndex === this.swapColorIndex2) {
              outputBufferIndex = destPixelIndex * 4 + this.swapColorIndex2;
            }
          }
          this.outputBuffer[outputBufferIndex] = this.imgData.data[
            srcBufferIndex
          ];
        }
      }
    }

    this.targetCtx.putImageData(
      new ImageData(this.outputBuffer, this.imgData.width, this.imgData.height),
      0,
      0
    );
    this.frameCount++;
    this.lastAnimationRequestId = requestAnimationFrame(this.boundDrawFrame);
  }

  shuffleSwappedColors() {
    this.swapColorIndex1 = probable.roll(3);
    this.swapColorIndex2 = probable.roll(3);
  }
}

module.exports = Igniter;

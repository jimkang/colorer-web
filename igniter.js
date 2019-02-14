class Igniter {
  constructor(routeOpts) {
    this.img = routeOpts.img;
    this.targetCanvas = routeOpts.targetCanvas;
    this.targetCtx = this.targetCanvas.getContext('2d');
    this.showBase = routeOpts.showBase;
    this.opacityPercentOverBase = routeOpts.opacityPercentOverBase;
    this.boundDrawFrame = this.drawFrame.bind(this);
    this.frameCount = 0;
  }

  start() {
    // Draw srcCanvas, get imgData.
    this.imgData = this.initCanvases(); // names :(
    // Init stuff before animation.
    // do request animation frame here.

    requestAnimationFrame(this.boundDrawFrame);
    //  this.drawFrame();
    //}
    //requestAnimationFrame(this.boundDrawFrame);
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
    for (var row = 0; row < this.imgData.height; ++row) {
      // get current line of srcImage.
      for (let x = 0; x < this.imgData.width; x++) {
        const srcPixelIndex = this.imgData.width * row + x;
        let destPixelIndex =
          (srcPixelIndex + this.frameCount) %
          (this.imgData.width * this.imgData.height);
        if (row % 2 === 0) {
          destPixelIndex =
            (srcPixelIndex - this.frameCount) %
            (this.imgData.width * this.imgData.height);
        }
        for (let rgbaIndex = 0; rgbaIndex < 4; ++rgbaIndex) {
          const i = srcPixelIndex * 4 + rgbaIndex;
          this.outputBuffer[destPixelIndex * 4 + rgbaIndex] = this.imgData.data[
            i
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
    requestAnimationFrame(this.boundDrawFrame);
  }
}

module.exports = Igniter;

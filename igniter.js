class Igniter {
  constructor(routeOpts) {
    this.img = routeOpts.img;
    this.targetCanvas = routeOpts.targetCanvas;
    this.targetCtx = this.targetCanvas.getContext('2d');
    this.showBase = routeOpts.showBase;
    this.opacityPercentOverBase = routeOpts.opacityPercentOverBase;
    this.boundDrawFrame = this.drawFrame.bind(this);
  }

  start() {
    // Draw srcCanvas, get imgData.
    this.imgData = this.initCanvases(); // names :(
    // Init stuff before animation.
    this.currentSrcRow = 0; // names :)
    // do request animation frame here.
    for (var i = 0; i < this.imgData.height; ++i) {
      this.drawFrame();
    }
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
    if (this.currentSrcRow >= this.imgData.height) {
      console.log(this.currentSrcRow, this.imgData.height);
      return;
    }

    // get current line of srcImage.
    for (let x = 0; x < this.imgData.width; x++) {
      const pixelIndex = (this.imgData.width * this.currentSrcRow + x) * 4;
      for (let rgbaIndex = 0; rgbaIndex < 4; ++rgbaIndex) {
        const i = pixelIndex + rgbaIndex;
        this.outputBuffer[i] = this.imgData.data[i];
      }
    }

    this.targetCtx.putImageData(
      new ImageData(this.outputBuffer, this.imgData.width, this.imgData.height),
      0,
      0
    );
    this.currentSrcRow += 1;

    //requestAnimationFrame(this.boundDrawFrame);
    //setTimeout(this.boundDrawFrame, 0);
  }
}

module.exports = Igniter;

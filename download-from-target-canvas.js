function downloadFromTargetCanvas() {
  // If needed someday, we can export a specific canvas chosen
  // by the user.
  var targetCanvas = document.getElementById('target-canvas-0');
  targetCanvas.toBlob(setURLToBlob);
}

function setURLToBlob(blob) {
  window.location.href = window.URL.createObjectURL(blob);
}

module.exports = downloadFromTargetCanvas;

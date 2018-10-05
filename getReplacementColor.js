var probable = require('probable');
var hsl = require('d3-color').hsl;

module.exports = function getReplacementColor({
  originalString,
  newForOld,
  recolorMode = 'random',
  rgbaToString, // @TODO: untangle this later.
}) {
  if (recolorMode === 'none') {
    return originalString;
  }
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
  return replacement;
};

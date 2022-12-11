const fs = require('fs');
const path = require('path')

const genPanelFilename = (comic, panel) => `${comic}-${panel}`;
const genMobilePath = (filename) => `images/comics/${filename}.jpg`;
const genDesktopPath = (comic) => `images/comics/${comic}.png`;
const genFilesystemPath = (urlPath) => path.join(__dirname, '..', '..', 'public', urlPath);

// Count panels by enumerating public assets on disk.  For specifying HTML for mobile.
const countPanelsFromAssets = (comicNum) => {
  let panel = 0;
  while (fs.existsSync(genFilesystemPath(genMobilePath(genPanelFilename(comicNum, panel))))) {
    panel++;
  }
  return panel;
}

module.exports = {
  genPanelFilename,
  genMobilePath,
  genDesktopPath,
  genFilesystemPath,
  countPanelsFromAssets
}

const panelFilename = (comic, panel) => `${comic}-${panel}`;
const mobile = (id, numPanels) =>
  [...Array(numPanels).keys()].map(panel => `images/comics/${panelFilename(id, panel)}.jpg`);
const desktop = (comic) => `images/comics/${comic}.png`;

module.exports = {
  panelFilename,
  mobile,
  desktop
}

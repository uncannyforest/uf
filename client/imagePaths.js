export const panelFilename = (comic, panel) => `${comic}-${panel}`;
export const mobile = (comic, panel) => `images/comics/${panelFilename(comic, panel)}.jpg`;
export const desktop = (comic) => `images/comics/${comic}.png`;

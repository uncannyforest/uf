import data from '../config/uncannyforest.yaml'

const correctDate = (yamlDate) => {
  return new Date(yamlDate.toLocaleDateString('en-US', { timeZone: 'America/Denver', timeZoneName: 'short' } ));
}

const getMaxPanel = (nestedArray) => {
  let maxPanel = 0;
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[i].length; j++) {
      maxPanel = Math.max(maxPanel, nestedArray[i][j])
    }
  }
  return maxPanel;
}

const generateRecord = () => {
  data.comics.forEach((comic, index) => {
    comic.date = correctDate(comic.date);
    if (!comic.panels) comic.panels = getMaxPanel(comic.layout) + 1;
  })

  const getComicsWithSpoilers = () => data.comics;

  const isSpoiler = (comicNum) => {
    return new Date() < data.comics[comicNum].date;
  }

  const getNumComics = () => {
    let currentComic = data.comics.length - 1;
    while (isSpoiler(currentComic)) currentComic--;
    return currentComic + 1;
  }

  const getComics = () => data.comics.slice(0, getNumComics());

  return {
    getComicsWithSpoilers,
    getNumComics,
    getComics,
  };
}

export default generateRecord();

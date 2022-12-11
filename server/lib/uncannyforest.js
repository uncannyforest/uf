const config = require('./config');
const { countPanelsFromAssets } = require('./panels')

const generateRecord = () => {
  const TIME_ZONE = 'Mountain Time (US & Canada)';

  const data = config.load('uncannyforest');

  data.comics.forEach((comic, index) => {
    comic.date = config.correctDate(comic.date);
    comic.panels = countPanelsFromAssets(index);
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

module.exports = generateRecord();

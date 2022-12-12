const express = require('express');
const uncannyforest = require('../lib/uncannyforest')

const router = express.Router();

// /api/comics
router.get('/', (req, res) => {
  return res.json(uncannyforest.getComics());
});

// /api/comics/latest
router.get('/latest', (req, res) => {
  const totalComics = uncannyforest.getNumComics();

  return res.json({
    ...uncannyforest.getComicsWithSpoilers()[totalComics - 1],
    totalComics: totalComics
  });
});

// /api/comics/:id
router.get('/:id', (req, res) => {
  return res.json({
    ...uncannyforest.getComicsWithSpoilers()[req.params.id],
    totalComics: uncannyforest.getNumComics()
  });
});

module.exports = router;

const express = require('express');

const { User, Comment } = require ('../db');
const requireToken = require('./requireToken');

const router = express.Router();

// POST /api/user
// for registration
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name)
      return res.status(400).send('Body must contain fields "email," "password," and "name"');
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      url: req.body.url
    })
    res.json(await User.authenticate(req.body));
  } catch (e) {
    next(e);
  }
})

// POST /api/user/set/
// for login
router.post('/set/', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).send('Body must contain fields "email" and "password"');
    res.json(await User.authenticate(req.body));
  } catch (e) {
    next(e);
  }
})

// PUT /api/user
router.put('/', requireToken, async (req, res, next) => {
  try {
    const user = await req.user.update({
      name: req.body.name,
      url: req.body.url
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
})

// GET /api/user
router.get('/', requireToken, (req, res) => {
  res.json(req.user.minusPassword());
})

// GET /api/user/comments
// returns comments and replies
router.get('/comments', requireToken, async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        userId: req.user.id
      },
      include: {
        model: Comment,
        as: 'children'
      }
    });
    res.json(comments);
  } catch (e) {
    next(e);
  }
})

module.exports = router;

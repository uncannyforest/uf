const express = require('express');

const { User, Comment } = require ('../db');
const requireToken = require('./requireToken');

const router = express.Router();

// POST /api/user
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name)
      return res.status(400).send('Body must contain field "name"');
    const user = await User.create({
      name: req.body.name,
      url: req.body.name
    })
    const token = await user.generateToken();
    res.send(token);
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
  res.json(req.user);
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

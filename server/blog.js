const express = require('express')
const { getLatestPostByTag } = require('./tumblr')

const router = express.Router()

// GET /blog/tag/:tag/latest
router.get('/tag/:tag/latest', async (req, res, next) => {
  try {
    const post = await getLatestPostByTag(req.params.tag)

    res.redirect(`${post.url}?tag=${req.params.tag}`)
  } catch (e) {
    next(e)
  }
})

module.exports = router

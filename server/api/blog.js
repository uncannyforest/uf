const express = require('express')
const { getTagNavForPost } = require('../tumblr')

const router = express.Router()

// GET /api/blog/tag/:tag/post/:postId/nav
router.get('/tag/:tag/post/:postId/nav', async (req, res, next) => {
  try {
    const nav = await getTagNavForPost(req.params.tag, req.params.postId)

    res.json(nav)
  } catch (e) {
    next(e)
  }
})

module.exports = router

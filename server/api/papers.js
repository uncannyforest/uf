const express = require('express')

const requireToken = require('./requireToken')
const { Comment, User } = require('../db')

const router = express.Router()

// GET /api/papers/:id/comments
router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        paperId: req.params.id
      }
    })
    res.json(comments)
  } catch (e) {
    next(e)
  }
})

// POST /api/papers/:id/comments
// body must contain { text } and optionally { parentId }
router.post('/:id/comments', requireToken, async (req, res, next) => {
  try {
    if (!req.body.text)
      return res.status(400).send('Body must contain field "text"')
    let parent
    if (req.body.parentId) {
      parent = await Comment.findByPk(req.body.parentId)
      if (!parent)
        return res.status(400).send(`No such parent comment with id ${req.body.parentId}`)
      if (parent.paperId !== req.params.id)
        return res.status(400).send(`Parent comment ${req.body.parentId} is for page ${parent.paperId}, not ${req.params.id}`)
    }
    const comment = await Comment.create({
      paperId: req.params.id,
      userId: req.user.id,
      text: req.body.text,
      parentId: req.body.parentId
    })
    res.json(await Comment.findByPk(comment.id))
  } catch (e) {
    next(e)
  }
})

// PUT /api/papers/:paperId/comments/:commentId
// body must contain { text }
router.put('/:paperId/comments/:commentId', requireToken, async (req, res, next) => {
  try {
    let comment = await Comment.findByPk(req.params.commentId)
    if (comment.userId !== req.user.id)
      return res.status(403).send(`User not authorized to edit comment ${req.params.commentId}`)
    if (!req.body.text)
      return res.status(400).send('Body must contain field "text"')
    comment = await comment.update({
      text: req.body.text,
    })
    res.json(comment)
  } catch (e) {
    next(e)
  }
})

// DELETE /api/papers/:paperId/comments/:commentId
router.delete('/:paperId/comments/:commentId', requireToken, async (req, res, next) => {
  try {
    let comment = await Comment.findByPk(req.params.commentId)
    if (comment.userId !== req.user.id)
      return res.status(403).send(`User not authorized to delete comment ${req.params.commentId}`)
    await comment.destroy()
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

module.exports = router

const express = require('express')

const router = express.Router()

router.use('/user', require('./user'))
router.use('/papers', require('./papers'))

router.use('*', (req, res) => {
  res.sendStatus(404)
})

module.exports = router

const express = require('express')

const router = express.Router()

router.use('/blog', require('./blog'))
router.use('/papers', require('./papers'))
router.use('/user', require('./user'))

router.use('*', (req, res) => {
  res.sendStatus(404)
})

module.exports = router

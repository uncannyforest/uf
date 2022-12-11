const express = require('express');
const router = express.Router();

router.use('/comics', require('./comics'));

module.exports = router;

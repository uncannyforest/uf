const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('comment', {
  paperId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

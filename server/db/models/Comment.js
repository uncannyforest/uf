const Sequelize = require('sequelize')
const User = require('./User')
const db = require('../db')

module.exports = db.define('comment',
  {
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
  }, {
    defaultScope: {
      include: {
        model: User,
        attributes: ['id', 'name', 'url']
      }
    },
  })

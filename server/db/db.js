const Sequelize = require('sequelize')

const db = new Sequelize(`postgres://${process.env.DBUSER}localhost:5432/uf`, { logging: false })

module.exports = db

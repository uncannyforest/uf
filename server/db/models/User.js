const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize');

const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.STRING
  },
});

User.prototype.generateToken = async function() {
  console.log(process.env);
  return await jwt.sign({ id: this.id }, process.env.JWT);
}

User.byToken = async function(token) {
  const payload = await jwt.verify(token, process.env.JWT);
  if (payload) {
    const user = await User.findByPk(payload.id);
    if (user) return user;
  }
  const error = Error('Bad credentials');
  error.status = 401;
  throw error;
}

module.exports = User;

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')

const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  },
})

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
})

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})

User.prototype.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT)
}

User.byToken = async function(token) {
  const payload = jwt.verify(token, process.env.JWT)
  if (payload) {
    const user = await User.findByPk(payload.id)
    if (user) return user
  }
  const error = Error('Bad credentials')
  error.status = 401
  throw error
}

User.authenticate = async function({ email, password }) {
  const user = await User.findOne({
    where: {
      email: email
    }
  })
  if (!user) {
    const error = Error('No user with that email')
    error.status = 404
    throw error
  }
  if (! await bcrypt.compare(password, user.password)) {
    const error = Error('Bad credentials')
    error.status = 401
    throw error
  }
  return {
    token: user.generateToken(),
    user: user.minusPassword()
  }
}

User.prototype.minusPassword = function() {
  return {
    ...this.dataValues,
    password: undefined
  }
}

module.exports = User

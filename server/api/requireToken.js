const { User } = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.byToken(token)
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = requireToken

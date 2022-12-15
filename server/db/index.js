const db = require('./db');
const Comment = require('./models/Comment');
const User = require('./models/User');

Comment.belongsTo(Comment, { as: 'parent' });
Comment.hasMany(Comment, { as: 'children', foreignKey: 'parentId' });

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = {
  Comment,
  User,
  db
}

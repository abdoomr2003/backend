const User = require('./user');
const Task = require('./task');

// Set up associations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Task
};

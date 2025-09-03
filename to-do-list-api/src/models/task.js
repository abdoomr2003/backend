const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('task', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	status: {
		type: DataTypes.ENUM(['pending', 'in_progress', 'completed']),
		defaultValue: 'pending',
		allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'users',
			key: 'id'
		}
	}
}, {
	timestamps: true,
	indexes: [{
		unique: true,
		fields: ['title', 'userId'],
		name: 'unique_title_per_user'
	}]
});

module.exports = Task;
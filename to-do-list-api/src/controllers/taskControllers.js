const { Op } = require('sequelize');
const Task = require('../models/task');


// get all tasks
exports.getAllTasks = async (req, res) => {
	try {
		const userId = req.user.id;
		const tasks = await Task.findAll({
			where: {userId}
		});
		return res.status(200).json({
			success: true,
			tasks
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}
};

// get task by id
exports.getTaskById = async (req, res) => {
	try {
		const userId = req.user.id;
		const task = await Task.findOne({
			where: {
				[Op.and]: [{ userId }, { id: req.params.id }]
			}
		});
		if (!task) {
			return res.status(404).json({
				success: false,
				message: 'task not found'
			});
		}
		return res.status(200).json({
			success: true,
			task
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}
};

// create task

exports.createTask = async (req, res) => {
	try {
		const userId = req.user.id;
		const {title, description} =  req.body;
		const exist = await Task.findOne({
			where: { [Op.and]:[ {title}, {userId}]}
		});
		if (exist) {
			return res.status(409).json({
				success: false,
				message: 'task with this title already exists'
			});
		}
		const task = await Task.create({
			title,
			description,
			userId
		});
		return res.status(200).json({
			success: true,
			task
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}
};

// update task
exports.updateTask = async (req, res) => {
	try {
		const userId = req.user.id;
		const task = await Task.findOne({
			where: {
				[Op.and]: [{userId}, {id: req.params.id}]
			}
		});
		if (!task) {
			return res.status(404).json({
				success: false,
				message: 'task not found!'
			});
		}
		const { title, description, status } = req.body;
		await task.update({
			title: title || task.title,
			description: description || task.description,
			status: status || task.status
		});
		return res.status(200).json({
			success: true,
			updatedTask: task
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const userId = req.user.id;
		const task = await Task.findOne({
			where: {
				[Op.and]: [{userId}, {id: req.params.id}]
			}
		});
		if (!task) {
			return res.status(404).json({
				success: false,
				message: 'task not found!'
			});
		}
		await task.destroy();
		return res.status(200).json({
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}
};

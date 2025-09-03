const express = require('express');
const router = express.Router();

const taskControllers = require('../controllers/taskControllers');
const {createTaskSchema, updateTaskSchema} = require('../validators/taskValidator');
const { validateRequest } = require('../middleware/validation')
const { verifyToken } = require('../middleware/verifyToken');


//routes
router.post('/', verifyToken, validateRequest(createTaskSchema), taskControllers.createTask);
router.get('/', verifyToken, taskControllers.getAllTasks);
router.get('/:id', verifyToken, taskControllers.getTaskById);
router.put('/:id', verifyToken,validateRequest(updateTaskSchema), taskControllers.updateTask);
router.delete('/:id', verifyToken, taskControllers.deleteTask);

module.exports = router;

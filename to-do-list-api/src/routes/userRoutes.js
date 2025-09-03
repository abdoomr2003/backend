const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');
const {registerSchema, loginSchema, updateSchema} = require('../validators/userValidator');
const { validateRequest } = require('../middleware/validation')


// routes
router.post('/register', validateRequest(registerSchema), userControllers.createUser);
router.post('/login', validateRequest(loginSchema), userControllers.loginUser);
router.get('/', userControllers.findAllUsers);
router.get('/:id', userControllers.findById);
router.put('/:id', validateRequest(updateSchema), userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);


module.exports = router;

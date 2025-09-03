const User = require('../models/user');
const {compare} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
// get all users
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

// find by id 
exports.findById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        } else {
            return res.status(200).json({
                success: true,
                user: user
            });
        }
    } catch (error) {
     return res.status(400).json({
        success: false,
        error: error.message
     });
    }
};

// login user
exports.loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        const user =  await User.findOne({
            where: {username}
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
        const token = jwt.sign({id: user.id, username}, process.env.JWT_KEY);
        return res.status(200).json({
            success: true,
            token: token
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

// create new user
exports.createUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const exist = await User.findOne({
            where: {username}
        });
        if (exist) {
            return res.status(409).json({
                success: false,
                message: 'User with this username already exists'
            })
        }
        const user = await User.create({
            username,
            password
        });
        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

// update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        } else {
            const {username, password} = req.body;
            await user.update({
                username: username || user.username,
                password: password || user.password
            }, {individualHooks: true});
            return res.status(200).json({
                success: true,
                user: user
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// delete user
exports.deleteUser= async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        } else {
            await user.destroy();
            return res.status(200).json({
                success: true
            });
        }
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


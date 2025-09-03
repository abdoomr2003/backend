const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const passwordOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
};

// user register schema
const registerSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'Username must only contain alphanumeric characters',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username cannot exceed 30 characters',
            'any.required': 'Username is required'
    }),

    password: passwordComplexity(passwordOptions)
        .required()
        .messages({
            'any.required': 'Password is required'
        }),
    confirmedPassword: joi.string()
        .valid(joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Password confirmation is required'
        })
    
});

// user login schema
const loginSchema = joi.object({
    username: joi.string()
        .required()
        .messages({
            'any.required': 'username is required'
        }),
    
    password: joi.string()
        .required()
        .messages({
            'any.required': 'password is required'
        })
});

// user update schema (the diffrence is optional)

const updateSchema = joi.object({
    username: joi.string()
        .min(3)
        .max(30)
        .optional(),
    password: passwordComplexity(passwordOptions)
        .optional()
});

module.exports = {
    registerSchema,
    loginSchema,
    updateSchema,
    passwordOptions
};
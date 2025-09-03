const joi = require('joi');

const createTaskSchema = joi.object({
    title: joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'title must be at least 3 characters long',
            'string.max': 'title cannot exceed 100 characters',
            'any.required': 'title is required'
        }),
    description: joi.string()
        .trim()
        .optional(),
    status: joi.string()
    .valid('pending', 'in_progress', 'completed')
    .default('pending')
    .required()
});

const updateTaskSchema = joi.object({
    title: joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.min': 'title must be at least 3 characters long',
      'string.max': 'title cannot exceed 100 characters'
    }),
    description: joi.string()
    .trim()
    .optional(),
    
  status: joi.string()
    .valid('pending', 'in_progress', 'completed')
    .optional()
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};
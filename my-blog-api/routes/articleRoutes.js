const express = require('express');
const router = express.Router();
const articleControler = require('../controllers/articleController');

// Create a new blog
router.post('/', articleControler.createArticle);

// Get all bloges
router.get('/', articleControler.getAll);

// Get by id
router.get('/:id', articleControler.getById);

// Update blog
router.put('/:id', articleControler.updateBlog);

// Delete blog
router.delete('/:id', articleControler.deleteBlog);

module.exports = router;

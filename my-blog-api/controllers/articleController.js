const Article = require('../models/article');

// Create Article
exports.createArticle = async (req, res) => {
    try {
        const {title, content, author} = req.body;
        const blog = await Article.create({
            title,
            content,
            author
        });
        res.status(201).json({
            success: true,
            blog: blog 
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all blogs

exports.getAll = async (req, res) => {
    try {
        const blogs = await Article.findAll();
        res.status(201).json({
            success: true,
            count: blogs.length,
            blog: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get blog by id
exports.getById = async (req, res) => {
    try {
        const blog = await Article.findByPk(req.params.id);
        if (!blog) {
            res.status(404).json({
                success: false,
                error: 'Blog not found!!'
            });
        } else { res.status(200).json({
            success: true,
            data: blog
        });
    }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
          });
    }
};

// Update a blog By Id
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Article.findByPk(req.params.id);
        if (!blog) {
            res.status(404).json({
                success: false,
                error: 'Blog not found!!'
            });
        }else {
            const {title, content, author} = req.body;
            await blog.update({
                title: title || blog.title,
                content: content || blog.content,
                author: author || blog.author
            });
        }

        res.status(200).json({
            success: true,
            'updated blog': blog 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
          });
    }
};

// Delete blog by id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Article.findByPk(req.params.id);
        if (!blog) {
            res.status(404).json({
                success: false,
                error: 'Blog not found!!'
            });
        } else {
            await blog.destroy();
            res.status(200).json({
                success: true,
                blog: {}
              });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
          });
    }
};
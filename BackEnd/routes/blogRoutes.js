const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog
router.get('/:id', blogController.getBlogById);

// Create a new blog
router.post('/', blogController.createBlog);

// Update a blog
router.put('/:id', blogController.updateBlog);

// Delete a blog
router.delete('/:id', blogController.deleteBlog);

// Get blogs by category
router.get('/category/:category', blogController.getBlogsByCategory);

// Get blogs by author
router.get('/author/:author_id', blogController.getBlogsByAuthor);

module.exports = router;
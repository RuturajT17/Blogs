const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blogId = await Blog.createBlog(req.body);
    res.status(201).json({ id: blogId, ...req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    await Blog.updateBlog(req.params.id, req.body);
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.deleteBlog(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.getBlogsByCategory(req.params.category);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogsByAuthor = async (req, res) => {
  try {
    const blogs = await Blog.getBlogsByAuthor(req.params.author_id);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
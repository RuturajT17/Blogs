const pool = require('../config/db');

class Blog {
  static async getAllBlogs() {
    const [rows] = await pool.query('SELECT * FROM blogs');
    return rows;
  }

  static async getBlogById(id) {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE blog_id = ?', [id]);
    return rows[0];
  }

  static async createBlog(blogData) {
    const { title, content, category, author_id, keywords, image_url } = blogData;
    const [result] = await pool.query(
      'INSERT INTO blogs (title, content, category, author_id, keywords, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, content, category, author_id, keywords, image_url || '/public/images/blog-placeholder.jpg']
    );
    return result.insertId;
  }

  static async updateBlog(id, blogData) {
    const { title, content, category, keywords, image_url } = blogData;
    await pool.query(
      'UPDATE blogs SET title = ?, content = ?, category = ?, keywords = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE blog_id = ?',
      [title, content, category, keywords, image_url, id]
    );
  }

  static async deleteBlog(id) {
    await pool.query('DELETE FROM blogs WHERE blog_id = ?', [id]);
  }

  static async getBlogsByCategory(category) {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE category = ?', [category]);
    return rows;
  }

  static async getBlogsByAuthor(author_id) {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE author_id = ?', [author_id]);
    return rows;
  }
}

module.exports = Blog;
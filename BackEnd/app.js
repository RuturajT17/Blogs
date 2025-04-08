require('dotenv').config();
const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Blog API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
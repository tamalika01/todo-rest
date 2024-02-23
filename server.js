require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Import database configuration
require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Default route for testing if the server is running
app.get('/', (req, res) => {
  res.send('Server is running. Use /api/auth for authentication and /api/todos for CRUD operations on To-Do items.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware to protect routes
router.use(authMiddleware.verifyToken);

// POST route to create a new todo item
router.post('/', todoController.createTodoItem);

// GET route to fetch all todo items for the logged-in user
router.get('/', todoController.getAllTodoItems);

// GET route to fetch a single todo item by its id
router.get('/:id', todoController.getTodoItem);

// PUT route to update a todo item by its id
router.put('/:id', todoController.updateTodoItem);

// DELETE route to delete a todo item by its id
router.delete('/:id', todoController.deleteTodoItem);

module.exports = router;

const TodoItem = require('../models/todoItem');

// Create a new todo item
exports.createTodoItem = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id; // Assuming req.user is populated by the auth middleware
  console.log("user id: ", userId);

  try {
    const newTodoItem = new TodoItem(null, userId, title, description, status);
    const result = await newTodoItem.save();
    res.status(201).json({ message: 'Todo item created successfully', todoItemId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo item', error: error.message });
  }
};

// Update an existing todo item
exports.updateTodoItem = async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const userId = req.user.id; // Assuming req.user is populated by the auth middleware

  try {
    const todoItem = new TodoItem(id, userId, title, description, status);
    await todoItem.update();
    res.status(200).json({ message: 'Todo item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo item', error: error.message });
  }
};

// Delete a todo item
exports.deleteTodoItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Assuming req.user is populated by the auth middleware

  try {
    await TodoItem.delete(id, userId);
    res.status(200).json({ message: 'Todo item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo item', error: error.message });
  }
};

// Get a single todo item by id
exports.getTodoItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Assuming req.user is populated by the auth middleware

  try {
    const todoItem = await TodoItem.findById(id, userId);
    if (!todoItem) {
      return res.status(404).json({ message: 'Todo item not found' });
    }
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get todo item', error: error.message });
  }
};
// Ensure that the findAll method is correctly implemented and called
exports.getAllTodoItems = async (req, res) => {
  const userId = req.user.id; // Assuming req.user is populated by the auth middleware

  console.log("User id:", userId);

  try {
    // Correctly call the findAll method with the userId to fetch all todo items for the logged-in user
    const todoItems = await TodoItem.findAll(userId);
    // Check if todoItems is not empty
    if (todoItems.length === 0) {
      // If no todo items found for the user, return a message indicating that
      return res.status(404).json({ message: 'No todo items found for the user' });
    }
    // If todo items are found, return them
    res.status(200).json(todoItems);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Failed to get todo items', error: error.message });
  }
};

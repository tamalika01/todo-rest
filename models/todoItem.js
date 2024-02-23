const db = require('../config/database');

class TodoItem {
  constructor(id, userId, title, description, status, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = status; // Assuming status could be 'pending', 'in progress', 'completed'
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Save a new todo item
  save() {
    let sql = `
      INSERT INTO todo_items (userId, title, description, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [this.userId, this.title, this.description, this.status], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Update an existing todo item
  update() {
    let sql = `
      UPDATE todo_items
      SET title = ?, description = ?, status = ?, updatedAt = NOW()
      WHERE id = ? AND userId = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [this.title, this.description, this.status, this.id, this.userId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Static method to delete a todo item
  static delete(id, userId) {
    let sql = 'DELETE FROM todo_items WHERE id = ? AND userId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id, userId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Static method to find a todo item by its ID
  static findById(id, userId) {
    let sql = 'SELECT * FROM todo_items WHERE id = ? AND userId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id, userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  // Static method to get all todo items for a user
  static findAll(userId) {
    let sql = 'SELECT * FROM todo_items WHERE userId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = TodoItem;

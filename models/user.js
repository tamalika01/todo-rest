const dbConnection = require('../config/database');

class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  // Save user to database
  save() {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
      dbConnection.query(query, [this.username, this.password, this.email], (error, results) => {
        if (error) reject(error);
        else resolve(results.insertId);
      });
    });
  }

  // Find user by username
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
      dbConnection.query(query, [username], (error, results) => {
        if (error) reject(error);
        else resolve(results.length > 0 ? new User(results[0].id, results[0].username, results[0].password, results[0].email) : null);
      });
    });
  }

  // Find user by ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';
      dbConnection.query(query, [id], (error, results) => {
        if (error) reject(error);
        else resolve(results.length > 0 ? new User(results[0].id, results[0].username, results[0].password, results[0].email) : null);
      });
    });
  }
}

module.exports = User;

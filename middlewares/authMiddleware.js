const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Middleware to verify if the user is authenticated
const verifyToken = async (req, res, next) => {
  try {
    // Get token from the header
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

    // Verify token
    if (!token) {
      return res.status(403).json({ message: 'No token provided, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

module.exports = { verifyToken };

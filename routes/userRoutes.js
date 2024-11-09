/**
 * @file routes/userRoutes.js
 * @description Defines user registration, login, and profile retrieval.
 */

const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route
router.get('/profile', protect, getUserProfile);

module.exports = router;


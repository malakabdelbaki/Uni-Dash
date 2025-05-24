const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

// Get student profile
router.get('/student', auth, profileController.getStudentProfile);

// Get restaurant profile
router.get('/restaurant', auth, profileController.getRestaurantProfile);

module.exports = router; 
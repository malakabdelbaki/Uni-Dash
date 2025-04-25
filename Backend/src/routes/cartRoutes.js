const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

router.post('/cart', protect, addToCart);

module.exports = router;

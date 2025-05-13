const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');
const { removeFromCart } = require('../controllers/cartController');
const { getCart } = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

router.post('/cart', protect, addToCart);
router.delete('/cart', protect, removeFromCart); 
router.get('/cart', protect, getCart); 


module.exports = router;

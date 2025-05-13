const mongoose = require('mongoose');
const Order = require('./Order');

const reviewSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
  menuItem: {type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true,},
  order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true,},
  rating: { type: Number, required: true, min: 1, max: 5,},
  comment: {type: String,trim: true,},
  createdAt: {type: Date, default: Date.now,},
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
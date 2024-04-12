const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: String, required: true },
  comment: { type: String, required: true },
  isAnonymous: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
  parentReview: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

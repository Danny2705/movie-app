const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    movieId: { type: String },
    rating: { type: String },
    comment: { type: String },
    isAnonymous: { type: Boolean },
    parentReview: { type: mongoose.Schema.Types.ObjectId, ref: "reviews" },
    likeAmount: { type: Number },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

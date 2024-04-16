const Review = require("../model/reviewModel");

const postReview = async (req, res) => {
  try {
    const { userId, rating, comment, parentReview, movieId } = req.body;
    const isAnonymous = req.body.anonymous;
    console.log(req.body);
    const review = await Review.create({
      userId,
      rating,
      comment,
      isAnonymous,
      parentReview,
      movieId,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const review = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getReviewByMovieId = async (req, res) => {
  try {
    const review = await Review.aggregate([
      {
        $match: { movieId: req.params.id },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const updateReviewById = async (req, res) => {
  try {
    const { userId, rating, comment, isAnonymous, parentReview } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { userId, rating, comment, isAnonymous, parentReview },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Updated Successfully", updatedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postReview,
  getAllReviews,
  getReviewByMovieId,
  updateReviewById,
  deleteReview,
};

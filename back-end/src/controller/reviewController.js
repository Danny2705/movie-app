const Review = require("../model/reviewModel");
const User = require("../model/userModel");

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
      likeAmount: 0,
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
        $project: {
          "user.password": 0,
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

const likeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const comment = await Review.findById(commentId);
    const index = user.likedComment.indexOf(commentId);
    if (index === -1) {
      user.likedComment.push(commentId);
      comment.likeAmount++;
    } else {
      user.likedComment.splice(index, 1);
      comment.likeAmount--;
    }
    await user.save();
    await comment.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error liking/unliking comment:", error);
    res.status(500).json({ error: "Internal server error" });
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
  likeComment,
};

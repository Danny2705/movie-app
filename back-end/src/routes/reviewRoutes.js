const express = require("express");
const reviewController = require("../controller/reviewController");

const router = express.Router();

router.post("/review", reviewController.postReview);
router.post("/review/like-comments", reviewController.likeComment);

router.get("/review", reviewController.getAllReviews);
router.get("/review/:id", reviewController.getReviewByMovieId);
router.put("/review/:id", reviewController.updateReviewById);
router.delete("/review/:id", reviewController.deleteReview);

module.exports = router;

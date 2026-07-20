const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get(
    "/:phoneId",
    reviewController.getReviews
);

router.post(
    "/",
    reviewController.addReview
);

module.exports = router;
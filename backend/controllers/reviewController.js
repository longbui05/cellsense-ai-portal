const Review = require("../models/reviewModel");

const getReviews = (req, res) => {

    const phoneId = req.params.phoneId;

    Review.getReviewsByPhone(phoneId, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

const addReview = (req, res) => {

    const review = {

        user_id: req.body.user_id,
        phone_id: req.body.phone_id,
        rating: req.body.rating,
        comment: req.body.comment

    };

    Review.addReview(review, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Đánh giá thành công"

        });

    });

};

module.exports = {

    getReviews,

    addReview

};
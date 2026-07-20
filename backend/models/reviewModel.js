const db = require("../config/db");

const getReviewsByPhone = (phoneId, callback) => {

    const sql = `
        SELECT
            reviews.*,
            users.full_name
        FROM reviews
        JOIN users
            ON reviews.user_id = users.id
        WHERE reviews.phone_id = ?
        ORDER BY reviews.created_at DESC
    `;

    db.query(sql, [phoneId], callback);

};

const addReview = (review, callback) => {

    const sql = `
        INSERT INTO reviews
        (user_id, phone_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            review.user_id,
            review.phone_id,
            review.rating,
            review.comment
        ],
        callback
    );

};

module.exports = {

    getReviewsByPhone,

    addReview

};
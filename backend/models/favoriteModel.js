const db = require("../config/db");

const addFavorite = (userId, phoneId, callback) => {

    const checkSql = `
        SELECT *
        FROM favorites
        WHERE user_id = ?
        AND phone_id = ?
    `;

    db.query(checkSql, [userId, phoneId], (err, result) => {

        if (err) {

            return callback(err);

        }

        if (result.length > 0) {

            return callback(null, {
                existed: true
            });

        }

        const insertSql = `
            INSERT INTO favorites (user_id, phone_id)
            VALUES (?, ?)
        `;

        db.query(insertSql, [userId, phoneId], callback);

    });

};

const getFavorites = (userId, callback) => {

    const sql = `
        SELECT
            favorites.id,
            phones.*
        FROM favorites
        INNER JOIN phones
            ON favorites.phone_id = phones.id
        WHERE favorites.user_id = ?
    `;

    db.query(sql, [userId], callback);

};

const removeFavorite = (userId, phoneId, callback) => {

    const sql = `
        DELETE
        FROM favorites
        WHERE user_id = ?
        AND phone_id = ?
    `;

    db.query(sql, [userId, phoneId], callback);

};

module.exports = {

    addFavorite,
    getFavorites,
    removeFavorite

};
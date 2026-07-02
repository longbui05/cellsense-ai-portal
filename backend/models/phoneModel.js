const db = require("../config/db");

const getAllPhones = (callback) => {

    const sql = `
        SELECT
            phones.*,
            brands.name AS brand
        FROM phones
        INNER JOIN brands
            ON phones.brand_id = brands.id
    `;

    db.query(sql, callback);

};

module.exports = {

    getAllPhones

};
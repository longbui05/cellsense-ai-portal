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

const getPhoneById = (id, callback) => {

    const sql = `
        SELECT
            phones.*,
            brands.name AS brand
        FROM phones
        INNER JOIN brands
            ON phones.brand_id = brands.id
        WHERE phones.id = ?
    `;

    db.query(sql, [id], callback);

};
const addPhone = (phone, callback) => {

    const sql = `
        INSERT INTO phones
        (
            brand_id,
            model,
            price,
            processor,
            ram,
            storage,
            camera,
            battery,
            display_screen,
            os,
            image,
            description
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql, [

        phone.brand_id,
        phone.model,
        phone.price,
        phone.processor,
        phone.ram,
        phone.storage,
        phone.camera,
        phone.battery,
        phone.display_screen,
        phone.os,
        phone.image,
        phone.description

    ], callback);

};

module.exports = {

    getAllPhones,
    addPhone,
    getPhoneById

};
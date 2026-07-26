const db = require("../config/db");

const getAllPhones = (filter, callback) => {

    let sql = `
        SELECT
            phones.*,
            brands.name AS brand
        FROM phones
        INNER JOIN brands
        ON phones.brand_id = brands.id
        WHERE 1=1
    `;

    const params = [];

    if (filter.search) {

    sql += `
        AND phones.model LIKE ?
    `;

    params.push(
        `%${filter.search}%`
    );

}
if (filter.brand) {

    sql += `
        AND brands.name = ?
    `;

    params.push(
        filter.brand
    );

}
if (filter.minPrice) {

    sql += `
        AND phones.price >= ?
    `;

    params.push(
        filter.minPrice
    );

}
if (filter.maxPrice) {

    sql += `
        AND phones.price <= ?
    `;

    params.push(
        filter.maxPrice
    );

}
if (filter.ram) {

    const ramList = filter.ram.split(",");

    sql += `
        AND phones.ram IN (${ramList.map(() => "?").join(",")})
    `;

    params.push(...ramList);

}
if (filter.storage) {

    const storageList = filter.storage.split(",");

    sql += `
        AND phones.storage IN (${storageList.map(() => "?").join(",")})
    `;

    params.push(...storageList);

}
if (filter.sort) {

    if (filter.sort === "price_asc") {

        sql += `
            ORDER BY phones.price ASC
        `;

    } else if (filter.sort === "price_desc") {

        sql += `
            ORDER BY phones.price DESC
        `;

    } else if (filter.sort === "newest") {

        sql += `
            ORDER BY phones.id DESC
        `;

    }

} else {

    sql += `
        ORDER BY phones.id DESC
    `;

}
const countSql = sql.replace(
    `
        SELECT
            phones.*,
            brands.name AS brand
    `,
    `
        SELECT COUNT(*) AS total
    `
);
sql += `
    LIMIT ?
    OFFSET ?
`;

console.log("SQL:");
console.log(sql);

console.log("PARAMS:");
console.log(params);

const limit = parseInt(filter.limit) || 20;

const offset = parseInt(filter.offset) || 0;

const phoneParams = [...params, limit, offset];

db.query(countSql, params, (err, countResult) => {

    if (err) {

        return callback(err);

    }

    db.query(sql, phoneParams, (err, phones) => {

        if (err) {

            return callback(err);

        }

        callback(null, {

            phones,

            total: countResult[0].total

        });

    });

});
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

const updatePhone = (id, phone, callback) => {

    const sql = `
        UPDATE phones
        SET
            brand_id=?,
            model=?,
            price=?,
            processor=?,
            ram=?,
            storage=?,
            camera=?,
            battery=?,
            display_screen=?,
            os=?,
            image=?,
            description=?
        WHERE id=?
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
        phone.description,
        id

    ], callback);

};
const deletePhone = (id, callback) => {

    const sql = `
        DELETE FROM phones
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

module.exports = {

    getAllPhones,
    getPhoneById,
    addPhone,
    updatePhone,
    deletePhone

};
const db = require("../config/db");

const register = (user, callback) => {

    const sql = `
        INSERT INTO users
        (
            full_name,
            email,
            password
        )
        VALUES (?,?,?)
    `;

    db.query(sql, [

        user.full_name,
        user.email,
        user.password

    ], callback);

};

const login = (email, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);

};

module.exports = {

    register,
    login

};
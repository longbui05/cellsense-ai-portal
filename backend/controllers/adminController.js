const Admin = require("../models/adminModel");
const Phone = require("../models/phoneModel");

const login = (req, res) => {

    const username = req.body.username;
    
    const password = req.body.password;

    Admin.login(username, password, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(401).json({

                message: "Sai tài khoản hoặc mật khẩu"

            });

        }

        res.json({

            message: "Đăng nhập thành công",

            admin: result[0]

        });

    });

};
const getPhones = (req, res) => {

    Phone.getAllPhones((err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};
const addPhone = (req, res) => {

    Phone.addPhone(req.body, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Thêm điện thoại thành công"

        });

    });

};

module.exports = {

    login,
    getPhones,
    addPhone

};
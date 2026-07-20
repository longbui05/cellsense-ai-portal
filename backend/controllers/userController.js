const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = (req, res) => {

    const { full_name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {

        if (err) {

            return res.status(500).json(err);

        }

        User.register({

            full_name,
            email,
            password: hash

        }, (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                message: "Đăng ký thành công"

            });

        });

    });

};

const login = (req, res) => {

    const { email, password } = req.body;

    User.login(email, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(401).json({

                message: "Email không tồn tại"

            });

        }

        bcrypt.compare(password, result[0].password, (err, same) => {

            if (!same) {

                return res.status(401).json({

                    message: "Sai mật khẩu"

                });

            }

            res.json({

                message: "Đăng nhập thành công",

                user: result[0]

            });

        });

    });

};

module.exports = {

    register,
    login

};
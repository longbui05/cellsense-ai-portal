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

    const phone = {

        brand_id: req.body.brand_id,
        model: req.body.model,
        price: req.body.price,
        processor: req.body.processor,
        ram: req.body.ram,
        storage: req.body.storage,
        camera: req.body.camera,
        battery: req.body.battery,
        display_screen: req.body.display_screen,
        os: req.body.os,
        image: req.file.filename,
        description: req.body.description

    };

    Phone.addPhone(phone, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Thêm điện thoại thành công"

        });

    });

};

const updatePhone = (req, res) => {

    const id = req.params.id;

    const phone = {

        brand_id: req.body.brand_id,
        model: req.body.model,
        price: req.body.price,
        processor: req.body.processor,
        ram: req.body.ram,
        storage: req.body.storage,
        camera: req.body.camera,
        battery: req.body.battery,
        display_screen: req.body.display_screen,
        os: req.body.os,
        image: req.file ? req.file.filename : req.body.image,
        description: req.body.description

    };

    Phone.updatePhone(id, phone, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Cập nhật thành công"

        });

    });

};
const deletePhone = (req, res) => {

    const id = req.params.id;

    Phone.deletePhone(id, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Xóa thành công"

        });

    });

};

module.exports = {

    login,
    getPhones,
    addPhone,
    updatePhone,
    deletePhone

};
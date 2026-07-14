const Phone = require("../models/phoneModel");

const getPhones = (req, res) => {

    Phone.getAllPhones((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        res.json(result);

    });

};

const getPhoneById = (req, res) => {

    const id = req.params.id;

    Phone.getPhoneById(id, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Phone not found"
            });

        }

        res.json(result[0]);

    });

};

module.exports = {

    getPhones,
    getPhoneById

};
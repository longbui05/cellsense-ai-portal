const Phone = require("../models/phoneModel");

const getPhones = (req, res) => {

    Phone.getAllPhones((err, result) => {

        if(err){

            console.log(err);

            return res.status(500).json({

                message:"Database Error"

            });

        }

        res.json(result);

    });

};

module.exports = {

    getPhones

};
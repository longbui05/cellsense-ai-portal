const Phone = require("../models/phoneModel");

const getPhones = (req, res) => {

    const {

        limit = 20,

        offset = 0,

        search,

        brand,

        minPrice,

        maxPrice,

        ram,

        storage,

        sort

    } = req.query;

    Phone.getAllPhones(
    {
        limit,
        offset,
        search,
        brand,
        minPrice,
        maxPrice,
        ram,
        storage,
        sort
    },
    (err, result) => {

        console.log("CALLBACK MODEL");

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        console.log("SEND RESPONSE");

        res.json({

    phones: result.phones,

    total: result.total

});
    }
);

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
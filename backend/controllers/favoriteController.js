const Favorite = require("../models/favoriteModel");

const addFavorite = (req, res) => {

    const { user_id, phone_id } = req.body;

    Favorite.addFavorite(user_id, phone_id, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result && result.existed) {

            return res.json({

                message: "Điện thoại đã có trong yêu thích"

            });

        }

        res.json({

            message: "Đã thêm vào yêu thích"

        });

    });

};

const getFavorites = (req, res) => {

    const userId = req.params.userId;

    Favorite.getFavorites(userId, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

const removeFavorite = (req, res) => {

    const userId = req.params.userId;

    const phoneId = req.params.phoneId;

    Favorite.removeFavorite(userId, phoneId, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Đã xóa khỏi yêu thích"

        });

    });

};

module.exports = {

    addFavorite,
    getFavorites,
    removeFavorite

};
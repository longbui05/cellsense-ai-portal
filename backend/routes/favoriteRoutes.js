const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.post(
    "/",
    favoriteController.addFavorite
);

router.get(
    "/:userId",
    favoriteController.getFavorites
);

router.delete("/:userId/:phoneId", favoriteController.removeFavorite);

module.exports = router;
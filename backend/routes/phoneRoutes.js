const express = require("express");

const router = express.Router();

const phoneController = require("../controllers/phoneController");


router.get("/", phoneController.getPhones);

router.get("/:id", phoneController.getPhoneById);

module.exports = router;
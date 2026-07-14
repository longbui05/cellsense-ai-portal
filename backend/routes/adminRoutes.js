const upload = require("../middleware/upload");

const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.post(
    "/phones",
    upload.single("image"),
    adminController.addPhone
);
router.get("/phones", adminController.getPhones);
router.post("/phones", adminController.addPhone);

module.exports = router;
const upload = require("../middleware/upload");

const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.post(
    "/phones",
    upload.single("image"),
    adminController.addPhone
);
router.put(
    "/phones/:id",
    upload.single("image"),
    adminController.updatePhone
);
router.delete(
    "/phones/:id",
    adminController.deletePhone
);
router.get("/phones", adminController.getPhones);

module.exports = router;
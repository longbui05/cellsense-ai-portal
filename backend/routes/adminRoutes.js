const {

    phoneValidation,

    checkValidation

} = require("../middleware/validatePhone");

const upload = require("../middleware/upload");

const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.post(
    "/phones",
    upload.single("image"),
    phoneValidation,
    checkValidation,
    adminController.addPhone
);
router.put(
    "/phones/:id",
    upload.single("image"),
    phoneValidation,
    checkValidation,
    adminController.updatePhone
);
router.delete(
    "/phones/:id",
    adminController.deletePhone
);
router.get(
    "/phones/:id",
    adminController.getPhoneById
);
router.get("/phones", adminController.getPhones);

module.exports = router;
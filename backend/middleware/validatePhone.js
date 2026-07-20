const { body, validationResult } = require("express-validator");

const phoneValidation = [

    body("model")
        .notEmpty()
        .withMessage("Tên điện thoại không được để trống"),

    body("brand_id")
        .notEmpty()
        .withMessage("Hãng không được để trống"),

    body("price")
        .notEmpty()
        .withMessage("Giá không được để trống")
        .isNumeric()
        .withMessage("Giá phải là số")
        .isFloat({ min: 1 })
        .withMessage("Giá phải lớn hơn 0"),

    body("processor")
        .notEmpty()
        .withMessage("Chip không được để trống"),

    body("ram")
        .notEmpty()
        .withMessage("RAM không được để trống"),

    body("storage")
        .notEmpty()
        .withMessage("Bộ nhớ không được để trống"),

    body("camera")
        .notEmpty()
        .withMessage("Camera không được để trống"),

    body("battery")
        .notEmpty()
        .withMessage("Pin không được để trống")

];

const checkValidation = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            errors: errors.array()

        });

    }

    next();

};

module.exports = {

    phoneValidation,

    checkValidation

};
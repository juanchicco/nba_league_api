const {check,validationResult} = require("express-validator");

const validatorCreateTeam = [
    check("name")
    .exists().withMessage("name is required")
    .notEmpty().withMessage("Name must not be empty")
    .isLength({min: 3, max: 70}).withMessage("Character count must be between 3 and 70"),

    check("city")
    .exists().withMessage("city is required")
    .notEmpty().withMessage("City must not be empty"),


    (req,res,next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            res.status(404).json({errores: errors.array()})
        }
        else{
            next()
        }
    }

]

module.exports = {validatorCreateTeam}
const {check,validationResult} = require("express-validator")

const validatorCreateUser = [
    check("userName")
    .exists().withMessage("User Name is required")
    .trim()
    .notEmpty().withMessage("User Name must not be empty")
    .isLength({ min:3, max: 80}).withMessage("Character count: min 3; max 80"),
    
    check("email")
    .exists().withMessage("Email is required")
    .notEmpty().withMessage("Email must not be empty")
    .isEmail().withMessage("Enter a valid email address")
    .normalizeEmail(),

    check("password")
    .exists().withMessage("Password is required")
    .isLength({min:8 , max: 50}).withMessage("Password length between 8 and 50 characters")
    .trim(),

    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errores: errors.array()})
        }
        else{
            next()
        }
    }
]

const validatorLoginUser = [
    check("userName")
    .exists().withMessage("User Name is required")
    .trim(),
    check("password")
    .exists().withMessage("Password is required")
    .trim(),
    
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(403).json({errors: errors.array()})
        }
        else{next()}
    }
]


const validatorResetPassword = [
    check("password_1")
        .exists()
        .isLength({ min: 8, max: 50 }).withMessage("Password length between 8 and 50 characters")
        .trim(),
    check("password_2")
        .custom( async(password_2, { req }) => {
            if (req.body.password_1 !== password_2) {
                throw new Error("Both passwords must be identical")
            }
        }),
    (req, res, next) => {
        const { token } = req.params
        const errs = validationResult(req)
        if (!errs.isEmpty()) {
            const errores = errs.array()
            res.render("reset", { errores, token })
        } else {
            return next()
        }
    }
]
module.exports = {validatorCreateUser,validatorResetPassword,validatorLoginUser}
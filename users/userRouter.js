const { validatorCreateUser, validatorResetPassword, validatorLoginUser } = require("../validators/users")
const { listAll, register, login, deleteUser, forgot, reset, saveNewPass } = require("./userContorl")

const router = require("express").Router()

router.get("/",listAll)

router.post("/register",validatorCreateUser,register)

router.post("/login",validatorLoginUser,login)

router.post("/forgot-password",forgot)

router.get("/reset/:token",reset)
router.post("/reset/:token",validatorResetPassword,saveNewPass)

router.delete("/",deleteUser)

module.exports = router;
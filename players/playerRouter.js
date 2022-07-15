const { isAuth } = require("../middlewares/isAuth");
const fileUpload = require("../utils/handleStorage");
const { listAll, register, editPlayer, deleteOne } = require("./playerControl");
const router = require("express").Router()

router.get("/",listAll)

router.post("/register",fileUpload.single("file"),isAuth,register)
router.patch("/:id",isAuth,editPlayer)

router.delete("/:id",isAuth,deleteOne)

module.exports = router;
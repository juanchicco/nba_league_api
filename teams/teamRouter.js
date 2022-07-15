const {isAuth} = require("../middlewares/isAuth");
const fileUpload = require("../utils/handleStorage");
const { validatorCreateTeam } = require("../validators/teams");
const { listAll, register, deleteTeam, addPlayers, editTeam} = require("./teamControl");

const router = require("express").Router()

router.get("/",listAll)

router.post("/register",fileUpload.single("file"),validatorCreateTeam, isAuth,register)

router.delete("/",isAuth,deleteTeam)

router.post("/addPlayers",addPlayers)

router.patch("/:id",fileUpload.single("file"), editTeam)


module.exports = router;
const { tokenSign, tokenVerify } = require("../utils/handleJWT");
const { hashedPassword, checkPassword } = require("../utils/handlePassword");
const { notNumber } = require("../utils/notNumber");
const { getAllUsers, registerUser, loginUser, deleteUserById, editUserById } = require("./userModel")
const url = process.env.url_base
const nodemailer = require("nodemailer")


const listAll = async(req,res,next) => {
    const dbResponse = await getAllUsers();
    if(dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next();
}

const register = async(req,res,next) => {
    const password = await hashedPassword(req.body.password)
    const dbResponse = await registerUser({...req.body,password})
    if(dbResponse instanceof Error) return next(dbResponse)
    else {
        res.status(201).json(`User ${req.body.userName} created`)
    };
}

const login = async(req,res,next) => {
    const dbResponse = await loginUser(req.body.userName)
    if(!dbResponse.length) return next();
    if( await checkPassword(req.body.password, dbResponse[0].password)){
        const user = {
            id : dbResponse[0].id,
            userName: dbResponse[0].userName,
            email: dbResponse[0].email
        };
        const tokenData = {
            token : await tokenSign(user,"3h"),
            user
        }
        res.status(200).json({message: `User ${dbResponse[0].userName} logged in`, Token_info: tokenData})
    }
    else {
        let error = new Error()
        error.status = 401
        error.message = "Unauthorized"
        next(error)
    }
}

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.mailTrapUser,
      pass: process.env.mailTrapPass 
    }
  })

const forgot = async(req,res,next) => {
    const dbResponse = await loginUser(req.body.userName)
    if(!dbResponse.length) return next();
    const user = {
        id: dbResponse[0].id,
        userName: dbResponse[0].userName,
        email: dbResponse[0].email
    }
    const token = await tokenSign(user,"30m")
    const link = `${url}users/reset/${token}` 
    
    const mailDetails = {
        from: "nba.support@nbaleague.com",
        to: user.email,
        subject: "NBA Password recovery",
        html: `<h3>Password Recovery</h3>
        <a href="${link}">Click aquí para recuperar contraseña</a>`
    }
    transport.sendMail(mailDetails,(err,data)=>{
        if(err) return next(err);
        res.status(200).json({message:`Hi ${user.userName}, we have sent an email to ${user.email} to reset your password`})
    })

}
  
const reset = async(req,res,next) => {
    const token = req.params.token
    const tokenData = await tokenVerify(token)
    if(tokenData instanceof Error) {
        res.status(403).json({message: "Invalid or expired token"})
    }
    else{
        res.render("reset",{token,tokenData})
    } 
}

const saveNewPass = async(req,res,next) => {
    const token = req.params.token
    const tokenData = await tokenVerify(token)
    if(tokenData instanceof Error) return next(tokenData);
    const newPassword = await hashedPassword(req.body.password_2)
    const dbResponse = await editUserById(tokenData.id, {password: newPassword})
    dbResponse instanceof Error ? next(dbResponse) : res.status(200).json({message: "Successfully modified password"})
}

const deleteUser = async(req,res,next) => {
    if(notNumber(+req.query.id,res)) return;
    const dbResponse = await deleteUserById(+req.query.id)
    if(dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next();
}

module.exports =  {listAll,register,login,deleteUser,forgot,reset, saveNewPass}
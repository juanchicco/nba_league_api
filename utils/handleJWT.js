const jwt = require("jsonwebtoken")
const key = "r39'nfasf83querlo%#"

const tokenSign = async(user, time) => {
    return jwt.sign(user,key, {expiresIn: time})
}

const tokenVerify = async(token) => {
    try {
        return jwt.verify(token,key)    
    } catch (error) {
        return error;
    }
    
}

module.exports = {tokenSign,tokenVerify}
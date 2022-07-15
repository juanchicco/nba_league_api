const bcrypt = require("bcrypt");
const saltRound = 10;

const hashedPassword = async(password) => {
    const hash = await bcrypt.hash(password,saltRound)
    return hash
}

const checkPassword = async(originalPassword, hashPassword) => {
    const res = await bcrypt.compare(originalPassword,hashPassword)
    return res
}

module.exports = {hashedPassword,checkPassword}
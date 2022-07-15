const notNumber = (id,res) => {
    if(isNaN(+id)){
        res.status(400).json({message:"ID must be a positive integer"})
        return true
    }
    else{
        return false
    }
}

module.exports = {notNumber}
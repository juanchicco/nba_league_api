const res = require("express/lib/response");
const { notNumber } = require("../utils/notNumber");
const { getPlayers, registerPlayer, editOnePlayer, getPlayerWith,deletePlayer } = require("./playerModel")
const url = process.env.url_base

const listAll = async(req,res,next) => {
    let dbResponse = null;
    if(req.query.lastName){
        dbResponse = await getPlayerWith(req.query.lastName)
    }
    else{
        dbResponse = await getPlayers()
    }
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}

const register = async(req,res,next) => {
    const file = url + req.file.filename
    const dbResponse = await registerPlayer({...req.body,file, id_user: req.token.id})
    if(dbResponse instanceof Error) return next(dbResponse);
    else{
        res.status(201).json(`Player ${req.body.firstName} created`)
    }
}

const editPlayer = async(req,res,next) => {
    if (notNumber(+req.params.id,res)) return;
    const dbResponse = await editOnePlayer(+req.params.id,{...req.body})
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(200).json(req.body) : next()
}

const deleteOne = async(req,res,next) => {
    if (notNumber(+req.params.id,res)) return;
    const dbResponse = await deletePlayer(+req.params.id)
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next()
}

module.exports = {listAll,register,editPlayer,deleteOne}
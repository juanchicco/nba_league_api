const { getAllTeams, getTeamById, registerTeam, deleteTeamByName, addPlayersToTeam, editTeamById } = require("./teamModel")
const {notNumber} = require("../utils/notNumber")
const url = process.env.url_base

const listAll = async(req,res,next) => {
    let dbResponse = null
    if(req.query.id){
        if(notNumber(+req.query.id,res)) return;
        dbResponse = await getTeamById(+req.query.id)
    }
    else{
        dbResponse = await getAllTeams()
    }
    if(dbResponse instanceof Error)return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}


const register = async(req,res,next) => {
    const file = url + req.file.filename
    const dbResponse = await registerTeam({...req.body, id_user: req.token.id,file})
    dbResponse instanceof Error ? next(dbResponse) : res.status(201).json(`Team  created by ${req.token.userName}`)
}

const addPlayers = async(req,res,next) => {
    const dbResponse = await addPlayersToTeam(+req.query.id_team)
    if(dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(201).json(`Players added sucesfully`) : next();

}

const deleteTeam = async(req,res,next) => {
    const dbResponse = await deleteTeamByName(req.query.name)
    if(dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next();

}

const editTeam = async(req,res,next) => {
    if (notNumber(+req.params.id,res)) return;
    const file = url + req.file.filename
    const dbResponse = await editTeamById(+req.params.id,{...req.body,file})
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(200).json("Team edited") : next();
}

module.exports = {listAll,register,deleteTeam,addPlayers,editTeam}
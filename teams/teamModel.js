const query = require("express")
const pool = require("../data/config")
const { getPlayersByTeam } = require("../players/playerModel")

//obtiene todos los equipos
const getAllTeams = async() => {
    const query = "SELECT * FROM teams"
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//obtiene un equipo segun su id
const getTeamById = async(id) => {
    const query = `SELECT * FROM teams WHERE id=${id}`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//crea un nuevo equipo
const registerTeam = async(team) => {
    const query = `INSERT INTO teams SET ?`
    try {
        return await pool.query(query,team)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//agrega todos los jugadores que tienen la misma FK(id_team) a dicho equipo 
const addPlayersToTeam = async(id_team) => {
    try {
        const dbResponse = await getPlayersByTeam(id_team)
        let res = [];
        for (let i = 0; i < dbResponse.length; i++) {
            res.push(dbResponse[i])
        }
        const result = JSON.stringify(res)
        const query = `UPDATE teams SET players = '${result}' WHERE id = ${id_team}`
        return await pool.query(query,id_team)

    } catch (error) {
        error.message = error.code
        return error
    }
}

//eliminar un equipo segun su nombre
const deleteTeamByName = async(name) =>{
    const query = `DELETE FROM teams WHERE name ='${name}'`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//editar un equipo segun id
const editTeamById= async(id,team) => {
    const query = `UPDATE teams SET ? WHERE id=${id}`
    try {
        return await pool.query(query,team)
    } catch (error) {
        error.message = error.code
        return error
    }
}



module.exports = {getAllTeams,getTeamById,registerTeam,deleteTeamByName,addPlayersToTeam,editTeamById}
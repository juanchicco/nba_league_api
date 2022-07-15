const pool = require("../data/config");
const query = require("express")

//listar todos los jugadores
const getPlayers = async() => {
    const query = "SELECT * FROM players"
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//listar jugadores según apellido
const getPlayerWith = async(name)=> {
    const query = `SELECT * FROM players WHERE lastName LIKE '${name}'`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error        
    }
}

const registerPlayer = async(player) =>{
    const query = `INSERT INTO players SET ?`
    try {
        return await pool.query(query,player)
    } catch (error) {
        error.message = error.code
        return error
    }
} 

//obtiene todos los datos de aquellos jugadores que pertenezcan a cierto equipo
const getPlayersByTeam = async(id_team) =>{
    const query = `SELECT * FROM players WHERE id_team = ${id_team}`
    try {
        return await pool.query(query,id_team)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const editOnePlayer = async(id,player) => {
    const query = `UPDATE players SET ? WHERE id_player = ${id}`;
    try {
        return await pool.query(query,player)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const deletePlayer = async(id) => {
    const query = `DELETE FROM players WHERE id_player = ${id}`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

module.exports = {getPlayers,registerPlayer,getPlayerWith,editOnePlayer,deletePlayer,getPlayersByTeam}
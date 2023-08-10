const { Pool } = require("pg");

const pool = new Pool({
    user: "",
    host: "",
    password: "",
    database: "lugar_turistico",
    port: 5432,
    allowExitOnIdle: true
})

const getTurismo = async() =>{
    const result = await pool.query("SELECT * FROM turismo")
    return result.rows
}

const postTurismo = async(post) => {
    const values = Object.values(post)
    const consulta = {
        text: 
         "INSERT INTO turismo (id, titulo, img, descripcion, likes ) values (DEFAULT, $1, $2, $3, $4) RETURNING *",
        values,
    };
    const result = await pool.query(consulta)
    return result.rows
}

const putTurismo = async(id)=> {
    const result = await pool.query(
        "UPDATE turismo SET likes = likes + 1 WHERE id = $1",
        [id]
    );
    return result.rows
}

const deleteTurismo = async(id)=> {
    const result = await pool.query("DELETE FROM turismo WHERE id = $1", [id]);
    return result.rows;
};






module.exports = { getTurismo, postTurismo, putTurismo, deleteTurismo }

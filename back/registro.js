const bcrypt = require('bcryptjs')
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "cirkuit32",
    database: "lugar_turistico",
    port: 5432,
    allowExitOnIdle: true
})



const registrarUsuario = async(usuario) => {
    let { email, password } = usuario
    const contraseñaEncriptada = bcrypt.hashSync(password)
    password = contraseñaEncriptada
    const values = [email, contraseñaEncriptada]
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2)"
    await pool.query(consulta, values)
}

const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
}

const obtenerDatosDeUsuario = async (email) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    if (!rowCount) {
        throw { code: 404, message: "No se encontró ningún usuario con este email" }
    }
    delete usuario.password
    return usuario
}



module.exports = { registrarUsuario, verificarCredenciales, obtenerDatosDeUsuario }
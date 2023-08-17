const express = require('express')
const cors = require('cors')
const app = express()

app.listen(3001, console.log('Server ON'))
app.use(express.json())
app.use(cors())

const { getTurismo, postTurismo, putTurismo, deleteTurismo } = require('./consultas');

app.get("/turismo", async (req, res) => {
    try {
        const lugares = await getTurismo();
        res.send(lugares)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.post("/turismo", async(req, res) => {
    try {
        const post = req.body;
        const result = await postTurismo(post);
        res.send(result)
    }catch(error){
        res.status(500).send(error.message)
    }

})

app.put("/turismo/like/:id", async(req, res)=> {
    try{
        const { id } = req.params;
        const result = await putTurismo(id)
        res.send(result)
    }catch(error) {
        res.status(500).send(error.message)
    }

})

app.delete("/turismo/:id", async (req, res)=> {
    try {
        const { id } = req.params;
        const result = await deleteTurismo(id)
        res.send(result)
    }catch(error) {
        res.status(500).send(error.message)
    }
})

//---------------------------parte 2 -------------------------------------------
const { registrarUsuario, verificarCredenciales, obtenerDatosDeUsuario } = require('./registro');
const { controlarCredencial, tokenVerification } = require('./middlewares');
const jwt = require("jsonwebtoken");
const secretKey = require('./secretKey')

app.post("/usuarios", controlarCredencial, async (req, res)=>{ 
    try{
        const usuario = req.body
        await registrarUsuario(usuario)
        res.send("Usuario creado con exito")
    } catch(error){
        res.status(500).send(error.message)
    }

}) 

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({ email }, "Ultra Secret KEY")
        res.send(token)
    } catch ({ code, message }) {
        console.log(message)
        res.status(code).send(message)
    }
  
  })

  
app.get("/usuarios", tokenVerification, async (req, res) => {
    try {
        const token = req.header("Authorization").split("Bearer ")[1]
        const { email } = jwt.decode(token)
        const usuario = await obtenerDatosDeUsuario(email)
        res.json(usuario)
    } catch (error) {
        console.log(error)
        const { code, message } = error
        res.status(code).send(message)
    }
  })




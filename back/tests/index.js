const express = require('express');
const app = express();
const lugares = require("./turismo.json")
app.listen(3000, console.log("SERVER ON"))
app.use(express.json())


app.get("/turismo", (req, res) => {
    res.status(200).send(lugares)
})



app.post("/turismo", (req, res) => {
    const lugar = req.body
    const { id } = lugar
    const existeUnlugarConEseId = lugares.some(c => c.id == id)
    if (existeUnlugarConEseId) res.status(400).send({ message: "Ya existe un lugar con ese id" })
    else {
        lugares.push(lugar)
        res.status(201).send(lugares)
    }
})



app.delete("/turismo/:id", (req, res) => {

    const { id } = req.params
    const turismoIndexFound = lugares.findIndex(c => c.id == id)

    if (turismoIndexFound >= 0) {
        lugares.splice(turismoIndexFound, 1)
        console.log(turismoIndexFound, lugares)
        res.send(lugares)
    } else {
        res.status(404).send({ message: "No se encontró ningún turismo con ese id" })
    }

})

app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" })
})

module.exports = app

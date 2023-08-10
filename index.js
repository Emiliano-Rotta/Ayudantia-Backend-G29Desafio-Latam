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
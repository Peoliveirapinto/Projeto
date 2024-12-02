const express =require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')

app.use(express.json())
app.use(cors())

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true},
    password: {type:String, required:true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model('Usuario', usuarioSchema)

app.post("/signup", async(req,res)=>{
    try{
        const login = req.body.login
        const password = req.body.password
        const criptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({
            login: login,
            password: criptografada
        })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    } catch (error){
        console.log(error)
        res.status(409).end()
    }
})

app.post("/login", async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const u = await Usuario.findOne({ login: req.body.login })
    if (!u) {
        return res.status(401).json({ mensagem: "login inválido" })
    }
    const senhaValida = await bcrypt.compare(password, u.password)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "senha inválida" })
    }
    const token =jwt.sign(
        {login: login},
        "chave-secreta",
        {expiresIn: '1h'}
    )
    res.status(200).json({token: token})
})

async function conectarAoBanco() {
    await mongoose.connect()
}

app.listen(3000, () => {
    try {
        conectarAoBanco()
        console.log("up and running")
    }
    catch (e) {
        console.log('erro na conexão ', e)
    }
})
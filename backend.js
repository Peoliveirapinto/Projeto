const express =require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const app =express()
const { config }= require ('./config.js')

app.use(express.json())
app.use(cors())

//conexão de login ao banco
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

//conexão das dúvidas do fórum ao banco
const duvidaSchema = mongoose.Schema({
    tituloDuvida: {type:String, required:true},
    conteudoDuvida: {type: String, required:true},
    user: {type:String, required:true},
    isResolvida: {type:Boolean, required:true},
})
duvidaSchema.plugin(uniqueValidator)
const Duvida = mongoose.model('Duvida', duvidaSchema)

app.post("/postDuvida", async (req,res)=>{
    try{
        const tituloDuvida = req.body.tituloDuvida
        const conteudoDuvida =req.body.conteudoDuvida
        const user =req.body.user
        const isResolvida = false
        const duvida = new Duvida({
            tituloDuvida: tituloDuvida,
            conteudoDuvida:conteudoDuvida,
            user: user,
            isResolvida: isResolvida
        })
        const respMongo = await duvida.save()
        console.log(respMongo)
        res.status(201).end()
    } catch(error){
        console.log(error)
        res.status(409).end()
    }
})

app.get("/getDuvidas", async (req,res)=>{
    const duvidas = await Duvida.find()
    res.json(duvidas)
})

//conexão das respostas das dúvidas do fórum ao banco
const respDuvidaSchema = mongoose.Schema({
    conteudoRespDuvida: {type: String, required:true},
    idDuvida: {type: Number, required: true}
})
respDuvidaSchema.plugin(uniqueValidator)
const RespDuvida =mongoose.model('RespDuvida',respDuvidaSchema)

app.post("/respDuvida", async (req,res)=>{
    try{
        const conteudoRespDuvida = req.body.conteudoRespDuvida
        const idDuvida = req.body.idDuvida
        const respDuvida = new RespDuvida({
            conteudoRespDuvida: conteudoRespDuvida,
            idDuvida: idDuvida
        })
        const respMongo = await respDuvida.save()
        console.log(respMongo)
        res.status(201).end()
    } catch(error){
        console.log(error)
        res.status(409).end()
    }
})

app.get("/getRespDuvida", async (req,res)=>{
    const idDuvida = req.body.idDuvida
    const resposta = await RespDuvida.findOne({idDuvida: req.body.idDuvida})
    res.json(resposta)
})

//conexão dos exercícios ao banco


//conexão ao banco
async function conectarAoBanco() {
    await mongoose.connect(config.mongoKey)
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
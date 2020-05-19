const {ApolloServer}= require("apollo-server")
const jwt = require("jsonwebtoken")
require("dotenv").config("./variables.env")

const typeDefs = require("./db/schema")
const resolvers = require("./db/resolvers")

const conectarDB = require("./config/db")



// conectar a la BD

conectarDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token = req.headers["authorization"] || ""
        if(token){
            try{
                const usuario = jwt.verify(token,process.env.SECRETA)
                return{
                    usuario
                }
            }catch(error){
                console.log(error)
            }
        }
    }    
})

const puerto = `192.168.0.10:19006`

server.listen({port: process.env.PORT || 4000}).then(({url})=>{
    console.log(`Servidor listo en la URL ${url}`)
})


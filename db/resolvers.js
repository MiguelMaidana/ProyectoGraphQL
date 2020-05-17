const Usuario = require("../models/usuario")
const bcrypts = require("bcryptjs")

const resolvers ={
    Query : {
        
    },

    Mutation :{
        crearUsuario: async (_,{input})=>{
          const {email,password} = input;

          const existeUsuario = await Usuario.findOne({email})

        // Si el Usuario Ya existe
          if(existeUsuario){
              throw new Error ("El usuario ya esta registrado ")
          }
          try{
            // Hashear password
            const salt = await bcrypts.genSalt(10)
            input.password = await bcrypts.hash(password, salt)

            console.log(input)

            // registrart nuevo usuario 
            const nuevoUsuario = new Usuario(input)
            console.log(nuevoUsuario)

            // guardo En la base de datos 
            nuevoUsuario.save()
            return "Usuario Creado Correctamente"


          }
          catch(error){
              console.log(error)
          }
    }
    }
}

module.exports=resolvers
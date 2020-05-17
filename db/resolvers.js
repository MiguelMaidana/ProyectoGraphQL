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

            //console.log(input)

            // registrart nuevo usuario 
            const nuevoUsuario = new Usuario(input)
            //console.log(nuevoUsuario)

            // guardo En la base de datos 
            nuevoUsuario.save()
            return "Usuario Creado Correctamente"


          }
          catch(error){
              console.log(error)
          }
    },
    autenticarUsuario : async (_,{input}) =>{
        const {email,password} = input

        // revisar si el usuario existe

        const existeUsuario = await Usuario.findOne({email})

        // Si el Usuario Ya existe
          if(!existeUsuario){
              throw new Error ("El usuario No existe ")
          }

        // si el password es correcto

        const passwordCorrecto = await bcrypts.compare(password,existeUsuario.password)

        if(!passwordCorrecto){
            throw new Error("Password Incorrecto")
        }

        // Dar acceso a la app

        return "Has Iniciado Sesion"
    }
    }
}

module.exports=resolvers
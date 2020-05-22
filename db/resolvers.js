const Usuario = require("../models/usuario")
const Proyecto = require("../models/Proyecto")
const Tarea = require("../models/Tarea")
const bcrypts = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../variables.env"})

// crea y firma un JWT

const crearToken =(usuario,secreta,expiresIn)=>{
   // console.log(usuario)
    const {id,email,nombre} = usuario
    
    return jwt.sign({id,email,nombre},secreta,{expiresIn})

}

const resolvers ={
    Query : {

        obtenerProyectos : async (_,{},ctx) =>{
            const proyectos = await Proyecto.find({creador: ctx.usuario.id})

            return proyectos
        },
        obtenerTareas : async (_,{input},ctx) =>{
            const tareas = await Tarea.find({creador : ctx.usuario.id}).where("proyecto").equals(input.proyecto)
            
            return tareas
        }
        
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

        return {
            token : crearToken(existeUsuario,process.env.SECRETA,"4hr")
        }
     },
       nuevoProyecto : async (_,{input},ctx) =>{

           
            try{
                const proyecto = new Proyecto(input)

                //  asociar el creador 

                proyecto.creador = ctx.usuario.id

                // almacenarlo en la BD

                const resultado = await proyecto.save()

                return resultado;

            }catch(error){
                console.log(error)
            }
       },
       
       actualizarProyecto : async (_,{id,input}, ctx) =>{

        // revisar que el proyecto exista

        let proyecto = await Proyecto.findById(id)


        if(!proyecto){
            throw new Error ("Proyecto no encontrado")
        }

        // verificar que si la persona que trata de editarlo es el creador

        if(proyecto.creador.toString() !== ctx.usuario.id){
            throw new Error ("No tienes las credenciakes para editar")

        }

        // Guardar el proyecto

        proyecto= await Proyecto.findOneAndUpdate({_id:id}, input , {new: true})

        return proyecto

       },

       eliminarProyecto : async(_,{id},ctx)=>{


        // revisar que el proyecto exista

        let proyecto = await Proyecto.findById(id)


        if(!proyecto){
            throw new Error ("Proyecto no encontrado")
        }

        // verificar que si la persona que trata de editarlo es el creador

        if(proyecto.creador.toString() !== ctx.usuario.id){
            throw new Error ("No tienes las credenciakes para editar")

        }

        // Eliminar 

        await Proyecto.findOneAndDelete({_id : id})

        return "Proyecto Eliminado"


       },


       nuevatarea : async (_,{input}, ctx) =>{
            try{
                const tarea = new Tarea(input)
                tarea.creador = ctx.usuario.id

                const resultado = await tarea.save()
                return resultado


            }catch(error){
                console.log(error)
            }
       },

       actualizartarea : async (_,{id,estado,input},ctx)=> {

        // si la tarea existe o no 
        
        let tarea = await Tarea.findById(id)

        if(!tarea){
            throw new Error ("Tarea no encontrada")

        }

        // si la persona que edita es el creador


        if(tarea.creador.toString() !== ctx.usuario.id){
            throw new Error ("No tienes las credenciakes para editar")

        }
        // asiganar estado

        input.estado = estado; 

        // Guardar y retomar la tarea 

        tarea = await Tarea.findOneAndUpdate({_id :id}, input ,{new:true})

       return tarea

       },

       eliminarTarea : async (_,{id}, ctx)=>{

          // si la tarea existe o no 
        
          let tarea = await Tarea.findById(id)

          if(!tarea){
              throw new Error ("Tarea no encontrada")
  
          }
  
          // si la persona que edita es el creador
  
  
          if(tarea.creador.toString() !== ctx.usuario.id){
              throw new Error ("No tienes las credenciakes para editar")
  
          }

          // Eliminar

          await Tarea.findOneAndDelete({_id:id})

          return " Tarea Eliminada"

       }

    }
}

module.exports=resolvers
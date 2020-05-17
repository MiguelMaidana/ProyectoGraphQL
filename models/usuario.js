const mongoose = require("mongoose")

const UsuariosSchema= mongoose.Schema({
    nombre :  {
        type : String,
        required : true, // hace que sea obligatorio llenar este campo 
        trim : true // elminina espacios en blanco tanto adelante como al final 
    },
    email :{
        type : String,
        required : true,
        trim : true,
        unique : true // que no se repitan los mails

    },
    password :{
        type : String,
        required : true,
        trim : true,
        unique : true // que no se repitan los mails
        
    },
    registro: {
        type:Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Usuario",UsuariosSchema)
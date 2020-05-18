const moongose = require("mongoose")

const TareaSquema = moongose.Schema({

    nombre : {
        type: String,
        require: true,
        trim :  true
    },
    creador :{
        type : moongose.Schema.Types.ObjectId, // Toma los valore que estan dentro de ObjetId en la base de datos
        ref : "Usuario"
    },
    creado :{
        type: Date,
        default : Date.now()
    },
    proyecto : {

        type: moongose.Schema.Types.ObjectId,
        ref :"Proyecto"

    },
    estado :{
        type : Boolean,
        default: false
    }
})

module.exports = moongose.model("Tarea", TareaSquema)
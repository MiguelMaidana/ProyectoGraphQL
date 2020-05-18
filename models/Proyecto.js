const moongose = require("mongoose")

const ProyectoSquema = moongose.Schema({

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
    }
})

module.exports = moongose.model("Proyecto", ProyectoSquema)
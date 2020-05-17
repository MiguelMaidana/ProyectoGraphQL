const mongoose = require("mongoose")
require("dotenv").config({path: "variables.env"})


const conectarDB = async () =>{

    try{

        await mongoose.connect(
            'mongodb+srv://mono:mono34512744@cluster0-h6s4u.mongodb.net/uptask',
             { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify : false,useCreateIndex: true });
        
        console.log("DB Conectada")

    }catch(error){
        console.log("Hubo un error")
        console.log(error)
        process.exit(1) ; // detener la app

    }
}

//mongoose.connect('mongodb+srv://mono:mono34512744@cluster0-h6s4u.mongodb.net/prueba?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conectarDB
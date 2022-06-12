const { Schema,model } = require("mongoose");


const UsuarioSchema = Schema({
    name:{
        type:String,
        requiere:true
    },
    email:{
        type:String,
        requiere:true,
        unique:true
    },
    password:{
        type:String,
        requiere:true
    }
})

module.exports = model('Usuario',UsuarioSchema);
const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (solicitud,respuesta=response,next) =>{
    
    const errors = validationResult(solicitud);
    console.log(errors)

    if(!errors.isEmpty()){
    
        return respuesta.status(400).json({
        ok:false,
        errors:errors.mapped()
    
    });

    }
    next();


}

module.exports= {
    validarCampos
}
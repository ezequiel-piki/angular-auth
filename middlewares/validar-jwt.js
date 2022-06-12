const {response} = require ('express')
const jwt = require ('jsonwebtoken')


const validarJWT= (solicitud,respuesta=response,next)=>{
    const token = solicitud.header('x-token');
    
    if(!token){
    return respuesta.status(401).json({
        ok:false,
        msg:'error en el token'
    })
    }

    try {
        const {uid,name,email} = jwt.verify(token,process.env.SECRET_JWT_SEED);
        console.log(uid,name)
        solicitud.uid = uid;
        solicitud.name=name;
        solicitud.email=email;
        


    } catch (error) {
        return respuesta.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }

/* TODOO OK!! */
next();
}

module.exports = {
    validarJWT
}
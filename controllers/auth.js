const{response}=require('express');
const Usuario = require ('../models/Usuario')
const bcrypt = require ('bcryptjs');
const {generarJWT} = require ('../helpers/jwt')

/* CREAR USUARIO */
const CrearUsuario = async  (solicitud,respuesta=response)=>{
     

    const {name,email,password} = solicitud.body;
    
    try {

        /* Verificar el mail */
        const usuario = await Usuario.findOne({email})

        if(usuario){
            return respuesta.status(400).json({
                ok:false,
                msg:'El usuario con ese mail ya existe'
            })
        }

        /* Crear usuario con el modelo */
       const dbUser = new Usuario(solicitud.body)

        /* Hashear la contraseña */
        const salt = bcrypt.genSaltSync();
        dbUser.password=bcrypt.hashSync(password,salt);
      
        /* Generar el JWT */
       const token = await generarJWT(dbUser.id,name)

       /* Crear usuario de DB */
       await dbUser.save()
       /* Generar respuesta exitosa */
       return respuesta.status(201).json({
           ok:true,
           uid:dbUser.id,
           name,
           email,
           token
       })





        
    } catch (error) {
        console.log(error)
        return respuesta.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });     

    }
}

/* LOGIN DE USUARIO */

const Login = async (solicitud,respuesta=response)=>{
    
    
    
    const {email,password} = solicitud.body;

    try {

         const dbUser = await Usuario.findOne({email})

         if(!dbUser){
         return respuesta.status(400).json({
             ok:false,
             msg:'El correo no existe'
         })
         }
        /* Confirmar si el password hace match */

        const validPassword = bcrypt.compareSync(password,dbUser.password);

        if(!validPassword){
            return respuesta.status(400).json({
                ok:false,
                msg:'El password no es valido'
            })

        }
       /* Generar JWT */
       const token = await generarJWT(dbUser.id,dbUser.name,dbUser.email)

       /* Respuesta del Servicio */
       return respuesta.json({
           ok:true,
           uid:dbUser.id,
           name:dbUser.name,
           email:dbUser.email,
           token
       });


    } catch (error) {
        console.log(error)
        return respuesta.status(500).json({
            ok:false,
            msg:'Habla con el administrador'
        })
    }
    
    
   
}

/* RENOVAR TOKEN */

const RenewUsuario = async (solicitud,respuesta=response)=>{
   const {uid} = solicitud;
   
   /* Leer la base de datos */
   const dbUser = await Usuario.findById(uid);
    /* Generar JWT */
    const token = await generarJWT(uid,dbUser.name)
   
    return respuesta.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token 
    });
}

module.exports = {
    CrearUsuario,
    Login,
    RenewUsuario
}
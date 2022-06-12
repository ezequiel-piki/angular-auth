const {Router} = require('express');
const { check } = require('express-validator');
const { CrearUsuario, Login, RenewUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


/* Crear nuevo usuario */
router.post('/new',[
                    check('name','El nombre es Obligatorio').not().isEmpty(),
                    check('email','El mail es obligatorio').isEmail(),
                    check('password','La contraseña es obligatoria').isLength( { min:6} ), validarCampos 
                   ]
                    ,CrearUsuario);


/* Login de usuario */
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos
],Login);



/* Validar y Revalidar Token */
router.get('/renew',validarJWT,RenewUsuario);

module.exports=router;
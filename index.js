const express = require ('express')
const cors    = require('cors');
const path    = require('path')
const { databaseConnection } = require('./database/config');
require('dotenv').config()


/* Crear servidor/aplicacion de express */
const app = express();

/* Base de Datos */
databaseConnection();
  
/* Crear directorio Public */
app.use(express.static('public'))

/* CORSE */
app.use(cors());

/* Lectura y parseo del body */
app.use(express.json());

/* Rutas */
app.use('/api/auth',require('./routes/auth'))

/* Manejador */
app.get('*',(solicitud,respuesta)=>{
    respuesta.sendFile(path.resolve(__dirname,'public/index.html'))
})
    
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})
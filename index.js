const express = require("express")
const rutas = require('./routes');

const {manejarError,mostrarError, boomManejarError} = require('./middlewares/error.middleware')

const aplicacion = express()

const port = 3500

aplicacion.use(express.json())

aplicacion.get('/',(req,res) =>{
  res.send("Api Reserva de Habitaciones")
})

rutas(aplicacion);
aplicacion.use(mostrarError)
aplicacion.use(boomManejarError)
aplicacion.use(manejarError)

aplicacion.listen(port,() => {
  console.log('puerto activo: ' + port)
})

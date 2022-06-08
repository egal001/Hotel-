const express = require('express');

const clienteRouter = require('./habitaciones');
const reservasRouter = require('./reservas.route')
const empleadoRouter = require('./recepcionista.route')

function rutas(app){
  const router = express.Router();
  app.use('/cliente/r1',router);
  router.use('/habitaciones', clienteRouter);
  router.use('/reservas', reservasRouter);
  router.use('/empleados', empleadoRouter);

}
module.exports = rutas;

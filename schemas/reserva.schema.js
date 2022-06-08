const Joi = require('joi');

const codR = Joi.string().uuid()
const nombreCliente = Joi.string().min(3)
const apellidosCliente = Joi.string().min(5).max(30)
const correoCliente = Joi.string().email().max(50);
const numeroCelularCliente = Joi.string().alphanum().min(9)
const fechaIngreso = Joi.date()
const fechaSalida = Joi.date()
const cantidadPersonas = Joi.number().min(1).max(8)
const tipoHabitacion = Joi.string().min(10)
const Estado = Joi.string()
const pagado = Joi.string()

const crearReservaSchema = Joi.object({
  codR: codR.required(),
  nombreCliente: nombreCliente.required(),
  apellidosCliente: apellidosCliente.required(),
  correoCliente: correoCliente.required(),
  numeroCelularCliente: numeroCelularCliente.required(),
  fechaIngreso: fechaIngreso.required(),
  fechaSalida: fechaSalida.required(),
  cantidadPersonas: cantidadPersonas.required(),
  tipoHabitacion: tipoHabitacion.required(),
  Estado,
  pagado
})

const actualizarReservaSchema = Joi.object({
  nombreCliente,
  apellidosCliente,
  correoCliente,
  numeroCelularCliente,
  fechaIngreso,
  fechaSalida,
  cantidadPersonas,
  tipoHabitacion,
  Estado,
  pagado
})

const findByReservaSchema = Joi.object({
  codR: codR.required()
})

module.exports = {crearReservaSchema,actualizarReservaSchema,findByReservaSchema}

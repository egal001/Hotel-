const Joi = require('joi')

const codH = Joi.string().uuid()
const caracteristicas = Joi.string().min(10)
const tipoHabitacionH = Joi.string().min(10)
const nroHabitacion = Joi.number().min(1)
const precioHabitacion = Joi.number().min(1)
const pisoHabitacion = Joi.number().min(1)
const capacidad = Joi.number().min(1).max(8)

const crearHabitacionSchema = Joi.object({
  codH:codH.required(),
  caracteristicas:caracteristicas.required(),
  tipoHabitacionH:tipoHabitacionH.required(),
  nroHabitacion:nroHabitacion.required(),
  precioHabitacion:precioHabitacion.required(),
  pisoHabitacion:pisoHabitacion.required(),
  capacidad:capacidad.required()
})

const actualizarHabitacionesSchema = Joi.object({
  caracteristicas,
  tipoHabitacionH,
  nroHabitacion,
  precioHabitacion,
  pisoHabitacion,
  capacidad
})

const findByHabitacionSchema = Joi.object({
  codH: codH.required()
})

module.exports = {crearHabitacionSchema,actualizarHabitacionesSchema,findByHabitacionSchema}

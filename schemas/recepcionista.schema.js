const Joi = require('joi')

const codE = Joi.string().uuid()
const nombre = Joi.string().min(1).max(30);
const apellidoP = Joi.string().min(1).max(30);
const apellidoM = Joi.string().min(1).max(30);
const contrasenia = Joi.string().min(10).max(30);
const correo = Joi.string().email();
const direccion = Joi.string().max(50);
const telefono = Joi.string().alphanum().min(9)

const crearRecepcionistaSchema = Joi.object({
  codE: codE.required(),
  nombre: nombre.required(),
  apellidoP: apellidoP.required(),
  apellidoM: apellidoM.required(),
  contrasenia: contrasenia.required(),
  correo: correo.required(),
  direccion: direccion.required(),
  telefono: telefono.required()
})

const actualizarRecepcionistaSchema = Joi.object({
  nombre,
  apellidoP,
  apellidoM,
  contrasenia,
  correo,
  direccion,
  telefono
})

const findByRecepcionistaSchema = Joi.object({
  codE: codE.required()
})

module.exports = {crearRecepcionistaSchema,actualizarRecepcionistaSchema,findByRecepcionistaSchema}

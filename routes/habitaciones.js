const express = require("express")
const router = express.Router()

const controlValidar = require("../middlewares/validation.middleware")
const {crearHabitacionSchema,actualizarHabitacionesSchema,findByHabitacionSchema} = require("../schemas/habitaciones.schema")

const HabitacionesService = require('../services/habitaciones.service')
const servicioHabitaciones = new HabitacionesService()

router.get('/',async (req,res,next) => {
  try {
    const habitaciones = await servicioHabitaciones.findAll()
    res.status(200).json(habitaciones)
  } catch (error) {
    next(error)
  }

})

router.get('/:codH',controlValidar(findByHabitacionSchema,'params'),async (req,res,next) => {
  try {
    const {codH} = req.params;
    const habitacion = await servicioHabitaciones.findBy(codH)
    res.status(200).json(habitacion)
  } catch (error) {
    next(error)
  }

})

router.post('/',controlValidar(crearHabitacionSchema,'body'),async (req,res,next) => {
  try {
    const body = req.body
    const habitacion = await servicioHabitaciones.create(body)
    res.status(200).json({
      mensaje: 'registro de habitacion exitoso',
      datosHabitacion: habitacion
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:codH',controlValidar(actualizarHabitacionesSchema,'body'),async(req, res, next) => {
  try {
    const { codH } = req.params
    const body = {
      codH: codH,
      ...req.body
    }
    const habitacion = await servicioHabitaciones.update(codH, body)
    res.status(200).json({
      mensaje: 'habitacion actualizada',
      datos: habitacion
    })

  } catch (error) {
    next(error)
  }
})

router.patch('/:codH',controlValidar(actualizarHabitacionesSchema,'body'),async(req, res, next) => {
  try {
    const { codH } = req.params
    const body = {
      codH: codH,
      ...req.body
    }
    const habitacion = await servicioHabitaciones.updateParcial(codH, body)
    res.status(200).json({
      mensaje: 'habitacion actualizada parcialmente',
      datos: habitacion
    })

  } catch (error) {
    next(error)
  }
})

router.delete('/:codH',controlValidar(findByHabitacionSchema,'params'),async (req,res,next) => {
  try {
    const {codH} = req.params
    const habitacionEliminada = await servicioHabitaciones.delete(codH)
    res.status(200).json({
      mensaje: "habitacion eliminada",
      dato: habitacionEliminada
    })

  } catch (error) {
    next(error)

  }

})

module.exports = router

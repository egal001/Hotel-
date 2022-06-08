const express = require("express")
const router = express.Router()

const controlValidar = require("../middlewares/validation.middleware")
const {crearReservaSchema,actualizarReservaSchema,findByReservaSchema} = require("../schemas/reserva.schema")

const ReservaService = require('../services/reserva.service')
const servicioReservas = new ReservaService()

router.get('/',async (req,res,next) => {
  try {
    const reservas = await servicioReservas.findAll()
    res.status(200).json(reservas)
  } catch (error) {
    next(error)
  }

})

router.get('/:codR',controlValidar(findByReservaSchema,'params'),async (req,res,next) => {
  try {
    const {codR} = req.params;
    const reserva = await servicioReservas.findBy(codR)
    res.status(200).json(reserva)
  } catch (error) {
    next(error)
  }

})

router.post('/',controlValidar(crearReservaSchema,'body'),async (req,res,next) => {
  try {
    const body = req.body
    const reserva = await servicioReservas.create(body)
    res.status(200).json({
      mensaje: 'registro de reserva exitoso',
      datosreserva: reserva
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:codR',controlValidar(actualizarReservaSchema,'body'),async(req, res, next) => {
  try {
    const { codR } = req.params
    const body = {
      codR: codR,
      ...req.body
    }
    const reserva = await servicioReservas.update(codR, body)
    res.status(200).json({
      mensaje: 'reserva actualizada',
      datos: reserva
    })

  } catch (error) {
    next(error)
  }
})

router.patch('/:codR',controlValidar(actualizarReservaSchema,'body'),async(req, res, next) => {
  try {
    const { codR } = req.params
    const body = {
      codR: codR,
      ...req.body
    }
    const reserva = await servicioReservas.updateParcial(codR, body)
    res.status(200).json({
      mensaje: 'reserva actualizada parcial',
      datos: reserva
    })

  } catch (error) {
    next(error)
  }
})

router.delete('/:codR',controlValidar(findByReservaSchema,'params'),async (req,res,next) => {
  try {
    const {codR} = req.params
    const reservaEliminada = await servicioReservas.delete(codR)
    res.status(200).json({
      mensaje: "reserva eliminada",
      dato: reservaEliminada
    })

  } catch (error) {
    next(error)

  }
})

module.exports = router


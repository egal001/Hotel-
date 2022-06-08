const express = require("express")
const router = express.Router()//ENCARGARDO DEL PROCESO DE ROUTING

const controlValidar = require("../middlewares/validation.middleware")
const {crearRecepcionistaSchema,actualizarRecepcionistaSchema,findByRecepcionistaSchema} = require("../schemas/recepcionista.schema")

const recepcionistaService = require('../services/recepcionista.service')
const servicioRecepcion = new recepcionistaService()

router.get('/',async (req,res,next) => {
  try {
    const recepcionistas = await servicioRecepcion.findAll()
    res.status(200).json(recepcionistas)
  } catch (error) {
    next(error)
  }

})

router.get('/:codE',controlValidar(findByRecepcionistaSchema,'params'),async (req,res,next) => {
  try {
    const {codE} = req.params;
    const recepcionista = await servicioRecepcion.findBy(codE)
    res.status(200).json(recepcionista)
  } catch (error) {
    next(error)
  }

})

router.post('/',controlValidar(crearRecepcionistaSchema,'body'),async (req,res,next) => {
  try {
    const body = req.body
    const recepcionista = await servicioRecepcion.create(body)
    res.status(200).json({
      mensaje: 'registro de empleado exitoso',
      datosRecepcion: recepcionista
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:codE',controlValidar(actualizarRecepcionistaSchema,'body'),async(req, res, next) => {
  try {
    const { codE } = req.params
    const body = {
      codE: codE,
      ...req.body
    }
    const recepcionista = await servicioRecepcion.update(codE, body)
    res.status(200).json({
      mensaje: 'empleado actualizado',
      datos: recepcionista
    })

  } catch (error) {
    next(error)
  }
})

router.patch('/:codE',controlValidar(actualizarRecepcionistaSchema,'body'),async(req, res, next) => {
  try {
    const { codE } = req.params
    const body = {
      codE: codE,
      ...req.body
    }
    const recepcionista = await servicioRecepcion.updateParcial(codE, body)
    res.status(200).json({
      mensaje: 'empleado actualizado parcialmente',
      datos: recepcionista
    })

  } catch (error) {
    next(error)
  }
})

router.delete('/:codE',controlValidar(findByRecepcionistaSchema,'params'),async (req,res,next) => {
  try {
    const {codE} = req.params
    const recepcionistaEliminado = await servicioRecepcion.delete(codE)
    res.status(200).json({
      mensaje: "empleado eliminada",
      dato: recepcionistaEliminado
    })

  } catch (error) {
    next(error)

  }

})


module.exports = router

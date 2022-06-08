const faker = require("faker")
const boom = require('@hapi/boom');
class HabitacionesService {
  constructor() {
    this.Habitaciones = []
    this.generarHabitaciones()
  }
  generarHabitaciones() {
    const tipoHabitacion = ["Matromonial", "Duplex", "Cuadruples", "Suite", "Junio Suite", "Familiar"]
    const limite = 10
    for (let index = 0; index < limite; index++) {
      var rand = Math.floor(Math.random() * tipoHabitacion.length);
      this.Habitaciones.push({
        codH: faker.datatype.uuid(),
        caracteristicas: faker.commerce.productDescription(),
        tipoHabitacionH: tipoHabitacion[rand],
        nroHabitacion: Math.floor(Math.random() * (50 - 1)) + 1,
        precioHabitacion: Math.floor(Math.random() * (500 - 100)) + 100,
        pisoHabitacion: Math.floor(Math.random() * (10 - 1)) + 1,
        capacidad: Math.floor(Math.random() * (6 - 1)) + 1
      })
    }
  }
  async create(habitacion) {
    let nuevaHabitacion = {
      codH: faker.datatype.uuid(),
      ...habitacion
    }
    this.Habitaciones.push(nuevaHabitacion)
    return nuevaHabitacion
  }

  async update(id, habitacion) {
    const posHabitacion = this.Habitaciones.findIndex(item => item.codH == id)
    if (posHabitacion === -1) {
      throw boom.notFound("No se encuentra habitacion")
    }
    this.Habitaciones[posHabitacion] = habitacion
    return this.Habitaciones[posHabitacion]
  }

  async updateParcial(id, habitacionParcial) {
    const posHabitacion = this.Habitaciones.findIndex(item => item.codH == id)
    if (posHabitacion === -1) {
      throw boom.notFound("No se encuentra habitacion")
    }
    const habitacion = this.Habitaciones[posHabitacion]
    this.Habitaciones[posHabitacion] = {
      ...habitacion,
      ...habitacionParcial
    }
    return this.Habitaciones[posHabitacion]
  }

  async delete(id) {
    const posHabitacion = this.Habitaciones.findIndex(item => item.codH == id)
    if (posHabitacion === -1) {
      throw boom.notFound("No se encuentra habitacion")
    }
    this.Habitaciones.splice(posHabitacion, 1)
    return {
      mensaje: 'habitacion elimanada',
      id
    }
  }

  async findAll() {
    return this.Habitaciones
  }

  async findBy(id) {
    const habitacion = this.Habitaciones.find(item => item.codH == id)
    if (!habitacion) {
      throw boom.notFound("No se encuentra habitacion")
    }
    return habitacion
  }
}

module.exports = HabitacionesService

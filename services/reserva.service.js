const faker = require("faker")
const boom = require('@hapi/boom')
class ReservaService{
  constructor(){
    this.Reservas = []
    this.generarReservas()
  }
  generarReservas(){
    const tipoHabitacion = ["Matromonial","Duplex","Cuadruples","Suite","Junio Suite","Familiar"]
    const limite = 10
    for (let index = 0; index < limite; index++) {
      var rand = Math.floor(Math.random() * tipoHabitacion.length);
      this.Reservas.push({
      codR: faker.datatype.uuid(),
      nombreCliente: faker.name.firstName(),
      apellidosCliente: faker.name.lastName(),
      correoCliente: faker.internet.email(),
      numeroCelularCliente: faker.phone.phoneNumber(),
      fechaIngreso: faker.datatype.datetime(),
      fechaSalida: faker.datatype.datetime(),
      cantidadPersonas: Math.floor(Math.random() * (6 - 1)) + 1,
      tipoHabitacion: tipoHabitacion[rand],
      Estado: "SIN CONFIRMAR",
      pagado: "NO"
      })
    }
  }
  async create(reserva) {
    let nuevaReserva = {
      codR: faker.datatype.uuid(),
      ...reserva
    }
    this.Reservas.push(nuevaReserva)
    return nuevaReserva
  }

  async update(id, reserva) {
    const posReserva = this.Reservas.findIndex(item => item.codR == id)
    if (posReserva === -1) {
      throw boom.notFound("No se encuentra reserva")
    }
    this.Reservas[posReserva] = reserva
    return this.Reservas[posReserva]
  }

  async updateParcial(id, reservaParcial) {
    const posReserva = this.Reservas.findIndex(item => item.codR == id)
    if (posReserva === -1) {
      throw boom.notFound("No se encuentra reserva")
    }
    const reserva = this.Reservas[posReserva]
    this.Reservas[posReserva] = {
      ...reserva,
      ...reservaParcial
    }
    return this.Reservas[posReserva]
  }

  async delete(id) {
    const posReserva = this.Reservas.findIndex(item => item.codR == id)
    if (posReserva === -1) {
      throw boom.notFound("No se encuentra reserva")
    }
    this.Reservas.splice(posReserva, 1)
    return {
      mensaje: 'Reserva elimanada',
      id
    }
  }

  async findAll() {
    return this.Reservas
  }

  async findBy(id) {
    const reserva = this.Reservas.find(item => item.codR == id)
    if (!reserva) {
      throw boom.notFound("No se encuentra reserva")
    }
    return reserva
  }
}

module.exports = ReservaService

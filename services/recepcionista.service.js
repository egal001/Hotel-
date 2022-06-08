const faker = require("faker")
const boom = require('@hapi/boom')
class recepcionistaService {
  constructor() {
    this.recepcionstas = []
    this.generarRecepcionista()
  }
  generarRecepcionista() {
    const limite = 10
    for (let index = 0; index < limite; index++) {
      this.recepcionstas.push({
        codE: faker.datatype.uuid(),
        nombre: faker.name.firstName(),
        apellidoP: faker.name.lastName(),
        apellidoM: faker.name.lastName(),
        contrasenia: faker.internet.password(),
        correo: faker.internet.email(),
        direccion: faker.address.streetAddress(),
        telefono: faker.phone.phoneNumber()
      })
    }
  }
  async create(recepcionista) {
    let nuevoRecepcionista = {
      codE: faker.datatype.uuid(),
      ...recepcionista
    }
    this.recepcionstas.push(nuevoRecepcionista)
    return nuevoRecepcionista
  }

  async update(id, recepcionista) {
    const posRecepcionista = this.recepcionstas.findIndex(item => item.codE == id)
    if (posRecepcionista === -1) {
      throw boom.notFound("No se encuentra recepcionista")
    }
    this.recepcionstas[posRecepcionista] = recepcionista
    return this.recepcionstas[posRecepcionista]
  }

  async updateParcial(id, recepcionistaParcial) {
    const posRecepcionista = this.recepcionstas.findIndex(item => item.codE == id)
    if (posRecepcionista === -1) {
      throw boom.notFound("No se encuentra recepcionista")
    }
    const recepcionista = this.recepcionstas[posRecepcionista]
    this.recepcionstas[posRecepcionista] = {
      ...recepcionista,
      ...recepcionistaParcial
    }
    return this.recepcionstas[posRecepcionista]
  }

  async delete(id) {
    const posRecepcionista = this.recepcionstas.findIndex(item => item.codE == id)
    if (posRecepcionista === -1) {
      throw boom.notFound("No se encuentra recepcionista")
    }
    this.recepcionstas.splice(posRecepcionista, 1)
    return {
      mensaje: 'recepcionista elimanado',
      id
    }
  }

  async findAll() {
    return this.recepcionstas
  }

  async findBy(id) {
    const recepcionista = this.recepcionstas.find(item => item.codE == id)
    if (!recepcionista) {
      throw boom.notFound("No se encuentra recepcionista")
    }
    return recepcionista
  }
}

module.exports = recepcionistaService

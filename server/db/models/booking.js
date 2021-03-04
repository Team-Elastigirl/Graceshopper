const Sequelize = require('sequelize')
const db = require('../db')

const Booking = db.define('booking', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  unitPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Booking

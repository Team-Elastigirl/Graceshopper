const Sequelize = require('sequelize')
const db = require('../db')
// TODO: helper function for subtotal

const Order = db.define('order', {
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  orderStatus: {
    type: Sequelize.STRING // in cart, purchased, processing, shipped
  },
  subtotal: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Order

const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://i0.wp.com/themindcircle.com/wp-content/uploads/2017/07/3-2.jpg'
  },
  location: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  disclaimer: {
    type: Sequelize.TEXT
  }
})

Product.prototype.decreaseQuantity = function(num) {
  if (this.quantity === 0) {
    return new Error('Sorry No More Trips Avaliable')
  } else {
    this.quantity = this.quantity - num
    return this.quantity
  }
}

module.exports = Product

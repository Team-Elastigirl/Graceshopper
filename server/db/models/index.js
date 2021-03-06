const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Booking = require('./booking')
const Cart = require('./cart')

Product.belongsToMany(Order, {through: Booking})
Order.belongsToMany(Product, {through: Booking})

// User has many orders
// Order only has ONE user
User.hasMany(Order)
Order.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Product,
  Order,
  Booking
}

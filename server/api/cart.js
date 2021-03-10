const router = require('express').Router()
const {Product, Booking, Order, User, Cart} = require('../db/models')
module.exports = router

// GET api/cart
router.get('/', async (req, res, next) => {
  //if guest sends the cart on session
  if (!req.query.userId) {
    return res.send(req.session.cart).status(200)
  }
  // if user found in db
  try {
    // find an order with matching userId and status = in the cart
    const order = await Order.findOne({
      where: {userId: parseInt(req.query.userId, 1), orderStatus: 'in cart'}
    })
    // find all items/products part of this order
    if (order) {
      const bookings = await Booking.findAll({where: {orderId: order.id}})
      res.json(bookings).status(200)
    } else {
      res.json({}).status(200)
    }
  } catch (err) {
    console.log('err in api/cart', err).status(401)
    next(err)
  }
})

// PUT api/cart/:productId modifies the order of the cart
router.put('/:productId', async (req, res, next) => {
  // req.body. needs updated quanity and unit price
  const productId = req.params.productId
  const {quantity, unitPrice, userId} = req.body
  if (userId) {
    try {
      const tempOrder = await Order.findOne({
        where: {
          userId: req.body.userId
        }
      })
      const orderId = tempOrder[0].id
      const foundBooking = await Booking.findOne({where: {orderId, productId}})
      if (!quantity >= 1) {
        foundBooking.destroy()
      }
      const updatedBooking = foundBooking.update({unitPrice, quantity})
      res.json(updatedBooking).status(200)
    } catch (error) {
      console.log('err', error)
    }
  }
  let cart = new Cart(req.session.cart ? req.session.cart : {})
  const foundProduct = await Product.findByPk(productId)
  if (!foundProduct) {
    res.redirect('/').status(307)
  }
  cart.add(foundProduct, foundProduct.id)
  req.session.cart = cart
  res.redirect('/').status(307)
})

// Post api/cart/add/:productId
//makes a booking for an item if an order exists.
//If an order does not exist, make one and add a booking.
router.post('/add/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const {quantity, unitPrice, userId} = req.body
  if (userId > 0) {
    // a user is found
    try {
      const tempOrder = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          orderStatus: 'in cart'
        },
        defaults: {
          orderDate: new Date(),
          subtotal: unitPrice
        }
      })
      const orderId = tempOrder[0].dataValues.id
      // WISHLIST TODO: if a booking exists just update that booking instead creating a new booking
      const booking = await Booking.create({
        orderId,
        productId,
        amount: 1,
        unitPrice
      })
      return res.json(booking).status(201)
    } catch (error) {
      console.log('err', error)
    }
  }
  //if guest posts guest's items on a cart in session store.
  try {
    let cart = new Cart(req.session.cart ? req.session.cart : [])
    const foundProduct = await Product.findByPk(productId)
    if (!foundProduct) {
      res.redirect('/').status(307)
    }
    const addedItem = cart.add(foundProduct)
    req.session.cart = cart.generateArray()
    res.json(addedItem).status(202)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params
    if (orderId > 0) {
      await Booking.destroy({
        where: {
          orderId: orderId,
          productId: productId
        }
      })
      res.json('Deleted').status(204)
    } else {
      let cart = new Cart(req.session.cart ? req.session.cart : {})
      cart.remove(productId)
      req.session.cart = cart.generateArray()
      res.json(cart).status(200)
    }
  } catch (error) {
    next(error)
  }
})

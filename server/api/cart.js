const router = require('express').Router()
//ensure model name matches new db
const {Product, Booking, Order, User, Cart} = require('../db/models')
module.exports = router

// GET api/cart
router.get('/', async (req, res, next) => {
  //if guest send the cart on session
  if (!req.query.userId) {
    return res.send(req.session.cart)
  }
  // if user find in db
  // api/cart?userId=123
  try {
    // find an order with matching userId and status = in the cart
    const order = await Order.findOne({
      where: {userId: parseInt(req.query.userId, 1), orderStatus: 'in cart'}
    })
    // find all items/products part of this order
    if (order) {
      const bookings = await Booking.findAll({where: {orderId: order.id}})
      res.json(bookings)
    } else {
      res.json({})
    }
  } catch (err) {
    console.log('err in api/cart', err)
  }
})

// PUT api/cart/:productId modifies the order of the cart
// TODO: adjusts logic for session
router.put('/:orderId/:productId', async (req, res, next) => {
  // req.body. needs updated quanity and unit price
  const {orderId, productId} = req.params
  const {quantity, unitPrice, userId} = req.body
  if (userId) {
    try {
      const foundBooking = await Booking.findOne({
        where: {
          orderId,
          productId
        }
      })
      if (!quantity >= 1) {
        foundBooking.destroy()
      }
      const updatedBooking = foundBooking.update({unitPrice, quantity})
      res.json(updatedBooking)
    } catch (error) {
      console.log('err', error)
    }
  }
  let cart = new Cart(req.session.cart ? req.session.cart : {})
  const foundProduct = await Product.findByPk(productId)
  if (!foundProduct) {
    res.redirect('/')
  }
  cart.add(foundProduct, foundProduct.id)
  req.session.cart = cart
  // console.log('session', req.session.cart)
  res.redirect('/')
})

// Post api/cart/add/:productId
//makes a booking for an item if an order exists.
//If an order does not exist, make one and add a booking.

router.post('/add/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const {quantity, unitPrice, userId} = req.body
  // console.log('USER ID', typeof userId, userId)
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
          subtotal: unitPrice * quantity
        }
      })
      const orderId = tempOrder[0].dataValues.id


      const booking = await Booking.findOrCreate({
        where: {
          orderId,
          productId
        },
        defaults: {
          quantity: 1,
          unitPrice: unitPrice * quantity
        }

      
      })
      const foundProduct = await Product.findByPk(productId)
      console.log('', foundProduct)
      const count = await foundProduct.decreaseQuantity(1)
      await foundProduct.update({quantity: count})

      return res.json(booking)
    } catch (error) {
      console.log('err', error)
    }
  }
  //if guest posts guest's items on a cart in session store.
  try {
    // console.log('CART', req.session.cart)

    let cart = new Cart(req.session.cart ? req.session.cart : [])
    const foundProduct = await Product.findByPk(productId)
    if (!foundProduct) {
      res.redirect('/')
    }
    // console.log('in the cart route guest', foundProduct)

    const addedItem = cart.add(foundProduct)
    req.session.cart = cart.generateArray()

    const newQuantity = foundProduct.decreaseQuantity(1)
    await foundProduct.update({quantity: newQuantity})
    res.json(foundProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params
    // console.log('req.params', req.params)
    if (orderId > 0) {
      await Booking.destroy({
        where: {
          orderId: orderId,
          productId: productId
        }
      })
      res.json('Deleted')
    } else {
      let cart = new Cart(req.session.cart ? req.session.cart : {})

      cart.remove(productId)
      req.session.cart = cart.generateArray()

      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

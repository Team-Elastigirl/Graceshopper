const router = require('express').Router()
//ensure model name matches new db
const {Product, Booking, Order, User, Cart} = require('../db/models')
module.exports = router

// GET api/cart
router.get('/', async (req, res, next) => {
  // if user exits find card in db
  // if guest get cart from session
  // in session there should a cart that looks like booking objs
  // api/cart?userId=123
  if (!req.query.userId) {
    res.send(req.session.cart)
  }
  try {
    const order = await Order.findOne({
      where: {userId: parseInt(req.query.userId), orderStatus: 'in cart'}
    })
    // console.log(order);
    if (order) {
      const bookings = await Booking.findAll({where: {orderId: order.id}})
      // console.log('bookings', bookings)
      res.json(bookings)
    } else {
      res.json({})
    }
  } catch (err) {
    console.log('err in api/cart', err)
  }
})

// PUT api/cart/:productId edits the cart
// TODO: adjusts logic for session
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

// Post api/cart/:productId  puts guest's items on a cart in session store
router.post('/add/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const {quantity, unitPrice, userId} = req.body
  if (userId) {
    try {
      const tempOrder = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          orderStatus: 'in cart',
          orderDate: new Date(),
          subtotal: unitPrice
        }
      })
      const orderId = tempOrder[0].id
      // TODO: if a booking exists just update that booking instead creating a new booking
      await Booking.create({
        orderId,
        productId,
        quantity,
        unitPrice
      })
      res.json(tempOrder)
    } catch (error) {
      console.log('err', error)
    }
  }
  //if guest
  try {
    let cart = new Cart(req.session.cart ? req.session.cart : {})
    const foundProduct = await Product.findByPk(productId)
    if (!foundProduct) {
      res.redirect('/')
    }
    cart.add(foundProduct, foundProduct.id)
    req.session.cart = cart
    // console.log('session', req.session.cart)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

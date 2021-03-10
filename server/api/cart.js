const router = require('express').Router()
const {Product, Booking, Order, User, Cart} = require('../db/models')
module.exports = router

// GET api/cart
router.get('/:userId', async (req, res, next) => {
  //if guest send the cart on session

  if (!req.session.passport) {
    let cartObj
    if (!req.session.cart) {
      cartObj = {cart: [], orderId: 0}
    } else cartObj = {cart: req.session.cart, orderId: 0}

    res.send(cartObj).status(200)
  } else {
    // if user find in db
    // api/cart?userId=123
    try {
      let cartObj
      // find an order with matching userId and status = in the cart

      const order = await Order.findOne({
        where: {
          userId: Number(req.session.passport.user),
          orderStatus: 'in cart'
        }
      })
      if (!order) cartObj = {cart: [], orderId: 0}
      else {
        cartObj = {cart: req.session.cart, orderId: order.dataValues.id}
      }
      res.send(cartObj).status(200)
    } catch (err) {
      next(err)
      console.log('err in api/cart', err)
    }
  }
})

// PUT api/cart/:productId modifies the order of the cart
router.put('/:productId', async (req, res, next) => {
  // req.body. needs updated quanity and unit price
  const productId = req.params.productId
  const {amount, orderId} = req.body
  if (orderId && orderId !== 0) {
    try {
      const [updatedRowCount, updatedBooking] = await Booking.update(
        {amount},
        {
          where: {
            orderId,
            productId
          },
          returning: true
        }
      )
      let cart = new Cart(req.session.cart ? req.session.cart : [])
      cart.updateAmount(productId, amount)
      req.session.cart = cart.getCart()

      res.json(updatedBooking[0]).status(200)
    } catch (error) {
      next(error)
      console.log('err', error)
    }
  } else {
    let cart = new Cart(req.session.cart ? req.session.cart : [])

    cart.updateAmount(productId, amount)
    req.session.cart = cart.getCart()
    res.json('Updated').status(200)
  }
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
      const booking = await Booking.create({
        orderId,
        productId,
        amount: 1,
        unitPrice
      })

      let cart = new Cart(req.session.cart ? req.session.cart : [])
      const foundProduct = await Product.findByPk(productId)
      if (!foundProduct) {
        res.redirect('/').status(307)
      }

      const addedItem = cart.add(foundProduct)
      req.session.cart = cart.getCart()
      return res.json(booking).status(201)
    } catch (error) {
      next(error)
      console.log('err', error)
    }
  } else {
    //if guest posts guest's items on a cart in session store.
    try {
      let cart = new Cart(req.session.cart ? req.session.cart : [])
      const foundProduct = await Product.findByPk(productId)
      if (!foundProduct) {
        res.redirect('/').status(307)
      }

      const addedItem = cart.add(foundProduct)
      req.session.cart = cart.getCart()
      res.json(addedItem).status(201)
    } catch (error) {
      next(error)
    }
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
      req.session.cart = cart.getCart()

      res.json(cart).status(204)
    }
  } catch (error) {
    next(error)
  }
})

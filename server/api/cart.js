const router = require('express').Router()
//ensure model name matches new db
const {Product, Booking, Order, User, Cart} = require('../db/models')
module.exports = router

// GET api/cart
router.get('/:userId', async (req, res, next) => {
  //if guest send the cart on session
  console.log('GET USERID', typeof req.params.userId, req.params.userId)
  console.log('req session ', req.session)

  if (!req.session.passport) {
    // if (req.params.userId === 'undefined' || req.params.userId === 0) {
    console.log('inside the req', req.session.cart)
    let cartObj
    if (!req.session.cart) {
      console.log('EMPTY CART')
      cartObj = {cart: [], orderId: 0}
    } else cartObj = {cart: req.session.cart, orderId: 0}
    console.log('cartObj', cartObj)

    res.send(cartObj)
  } else {
    // if user find in db
    // api/cart?userId=123
    try {
      let cartObj
      // find an order with matching userId and status = in the cart
      console.log('req session user', req.session.passport.user)

      const order = await Order.findOne({
        where: {
          userId: Number(req.session.passport.user),
          orderStatus: 'in cart'
        }
      })
      if (!order) cartObj = {cart: [], orderId: 0}
      else {
        console.log('get Orderid', order.dataValues.id)
        cartObj = {cart: req.session.cart, orderId: order.dataValues.id}
        console.log('cartObj', cartObj)
        // find all items/products part of this order
        // const bookings = await Booking.findAll({where: {orderId: order.dataValues.id}})
        // console.log('bookings', bookings)

        // products = await bookings.map(async booking => {
        //   console.log('datavalues', booking.dataValues)
        //   const product = await Product.findByPk(booking.dataValues.productId)
        //   console.log('product', product)
        //   return {...product.dataValues, amount: booking.dataValues.amount}
        // })
        // console.log('products', products)
        // res.json(products)
      }
      res.send(cartObj)
    } catch (err) {
      next(err)
      console.log('err in api/cart', err)
    }
  }
})

// PUT api/cart/:productId modifies the order of the cart
// TODO: adjusts logic for session
router.put('/:productId', async (req, res, next) => {
  // req.body. needs updated quanity and unit price
  const productId = req.params.productId
  const {amount, orderId} = req.body
  console.log('put REQ.BODY', req.body)
  if (orderId && orderId !== 0) {
    console.log('PUT USER')
    try {
      // const tempOrder = await Order.findOne({
      //   where: {
      //     userId: req.body.userId
      //   }
      // })
      // const orderId = tempOrder[0].id
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

      res.json(updatedBooking[0])
    } catch (error) {
      next(error)
      console.log('err', error)
    }
  } else {
    let cart = new Cart(req.session.cart ? req.session.cart : [])
    // const foundProduct = await Product.findByPk(productId)
    // if (!foundProduct) {
    //   res.redirect('/')
    // }
    cart.updateAmount(productId, amount)
    req.session.cart = cart.getCart()
    res.json('Updated')
  }
  // console.log('session', req.session.cart)
  // res.redirect('/')
})

// Post api/cart/add/:productId
//makes a booking for an item if an order exists.
//If an order does not exist, make one and add a booking.

router.post('/add/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const {quantity, unitPrice, userId} = req.body
  console.log('USER ID', typeof userId, userId)
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
      // TODO: if a booking exists just update that booking instead creating a new booking
      const booking = await Booking.create({
        orderId,
        productId,
        amount: 1,
        unitPrice
      })
      console.log('user CART', req.session.cart)

      let cart = new Cart(req.session.cart ? req.session.cart : [])
      const foundProduct = await Product.findByPk(productId)
      if (!foundProduct) {
        res.redirect('/')
      }
      // console.log('in the cart route guest', foundProduct)

      const addedItem = cart.add(foundProduct)
      req.session.cart = cart.getCart()
      return res.json(booking)
    } catch (error) {
      next(error)
      console.log('err', error)
    }
  } else {
    //if guest posts guest's items on a cart in session store.
    try {
      console.log('guest CART', req.session.cart)

      let cart = new Cart(req.session.cart ? req.session.cart : [])
      const foundProduct = await Product.findByPk(productId)
      if (!foundProduct) {
        res.redirect('/')
      }
      // console.log('in the cart route guest', foundProduct)

      const addedItem = cart.add(foundProduct)
      req.session.cart = cart.getCart()
      res.json(addedItem)
    } catch (error) {
      next(error)
    }
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
      req.session.cart = cart.getCart()

      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

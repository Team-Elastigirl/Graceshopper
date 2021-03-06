const router = require('express').Router()
//ensure model name matches new db
const {Product} = require('../db/models')
module.exports = router

//securing routes
const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Stop, in the name of law')
    err.status = 401
    return next(err)
  }
  next()
}

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    //console.log(products)
    res.json(products)
  } catch (err) {
    console.log('error thrown')
    next(err)
  }
})

// GET api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    // const product = await Product.findOne({
    //   where: {
    //     id: req.params.productId
    //   }
    // })
    //more elegant below but above works. Awaiting testing.
    const product = await Product.findByPk(req.params.productId)
    if (!product) return res.send('Product Not Found').status(404)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//POST /api/campuses
//updated post route to be secure
router.post('/', adminsOnly, async (req, res, next) => {
  const {
    name,
    quanity,
    price,
    description,
    imageUrl,
    location,
    disclaimer
  } = req.body
  try {
    await Product.create({
      name,
      quanity,
      price,
      description,
      imageUrl,
      location,
      disclaimer
    }).then(product => {
      res.status(201).json(product)
    })
  } catch (err) {
    console.log('Error in post products route')
    next(err)
  }
})

//DELETE /api/products/:productId
router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.productId}})
    //send status console not showing?
    res.status(204).send('Item deleted')
  } catch (err) {
    console.log('Error in delete products route')
    next(err)
  }
})

//PUT /api/products/:productId
//updated post route to be secure
router.put('/:productId', adminsOnly, async (req, res, next) => {
  const {
    name,
    quantity,
    price,
    description,
    imageUrl,
    location,
    disclaimer
  } = req.body
  try {
    const product = await Product.findByPk(req.params.productId)
    const updatedProduct = await product.update({
      name,
      quantity,
      price,
      imageUrl,
      disclaimer,
      description,
      location
    })
    res.json(updatedProduct)
  } catch (err) {
    console.log('Error in update product route')
    next(err)
  }
})

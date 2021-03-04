const router = require('express').Router()
//ensure model name matches new db
const {Product} = require('../db/models')
module.exports = router

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET api/products/:productId

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    // const product = await Product.findByPk(req.params.productId)

    if (!product) return res.send('Product Not Found').status(404)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

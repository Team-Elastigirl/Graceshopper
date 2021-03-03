const router = require('express').Router()
//ensure model name matches new db
const {Constellation} = require('../db/models')
module.exports = router

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Constellation.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET api/products/:productId

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Constellation.findOne({
      where: {
        id: req.params.productId
      }
    })
    if (!product) return res.send('Product Not Found').status(404)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

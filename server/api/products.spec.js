const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productName = 'Orion'

    beforeEach(() => {
      return Product.create({
        id: 1,
        name: productName,
        quantity: 3,
        price: 700.0,
        description: 'describing the test',
        imageUrl: '/images/mars.png',
        location: 'far far away locations',
        disclaimer: 'n/a now'
      })
    })
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(1)
    })
  }) // end describe('/api/products')

  describe('/api/products/:productId', () => {
    const productId = 53

    beforeEach(() => {
      return Product.create({
        id: productId,
        name: 'Orion',
        quantity: 3,
        price: 700.0,
        description: 'describing the test',
        imageUrl: '/images/mars.png',
        location: 'far far away locations',
        disclaimer: 'n/a now'
      })
    })

    //Sofija: I believe first test is working, below is not.
    //   let product

    //   it('GET /api/products/:productId', async () => {
    //     const res = await request(app)
    //       .get(`/api/products/${product.id}`)
    //       .expect(200)

    //     expect(res.body).to.be.an('array')
    //     expect(res.body[0].id).to.be.equal(productId)
    //   })
    // }) // end describe('/api/products')
  }) // end describe('Products routes')
})

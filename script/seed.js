'use strict'
// TODO: user/product id is NULL
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order, Booking} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = []
  const products = []
  const orders = []
  const bookings = []

  // Users
  for (let i = 0; i < 20; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
  }

  const userInstances = await User.bulkCreate(users)
  console.log(`seeded ${users.length} users`)
  // console.log('USER 1', userInstances[0])

  // Products
  for (let i = 0; i < 20; i++) {
    products.push({
      name: faker.lorem.word(),
      quanity: faker.random.number(),
      price: i * 100 + 1,
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.nature(),
      location: faker.address.nearbyGPSCoordinate(),
      disclaimer: faker.lorem.sentence()
    })
  }

  const productInstances = await Product.bulkCreate(products)
  console.log(`seeded ${products.length} products`)

  // COMMENTED OUT FOR CONFLICTS

  // // Orders
  // for (let i = 0; i < 20; i++) {
  //   orders.push({
  //     orderStatus: faker.lorem.word(),
  //     subtotal: i*1000+1,
  //     userId: i+1
  //   })
  // }

  // const orderInstances = await Order.bulkCreate(orders)
  // console.log(`seeded ${orders.length} orders`)

  // // Bookings
  // for (let i = 0; i < 20; i++) {
  //   let prodID = i+1
  //   let orderID = i%15+1

  //   bookings.push({
  //     productId: prodID,
  //     orderId: orderID,
  //     unitPrice: i*100+1,
  //     quantity: i*10+1
  //   })
  // }

  // const bookingInstances = await Booking.bulkCreate(bookings)
  // console.log(`seeded ${bookings.length} bookings`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

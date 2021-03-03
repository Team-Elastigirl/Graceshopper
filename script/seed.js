'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123', username: 'hey'}),
  //   User.create({email: 'murphy@email.com', password: '123', username: 'joh'})
  // ])

  // for (const student of students) {
  //   const createdStudent = await Student.create(student);
  //   createdStudents.push(createdStudent);
  // }

  const users = []
  const products = []

  for (let i = 0; i < 20; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
  }

  const userInstance = await User.bulkCreate(users)

  for (let i = 0; i < 20; i++) {
    products.push({
      name: faker.lorem.word(),
      quanity: faker.random.number(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.nature(),
      location: faker.address.nearbyGPSCoordinate(),
      disclaimer: faker.lorem.sentence()
    })
  }

  const productInstance = await Product.bulkCreate(products)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
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

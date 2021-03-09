'use strict'
// TODO: user/product id is NULL
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order, Booking} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync() //{force: true}
  console.log('db synced!')

  const bookings = []
  const orders = []

  // Users
  const users = [
    {
      username: 'Adomas',
      email: 'adomas@gmail.com',
      password: '123456',
      isAdmin: true
    },
    {
      username: 'Lillian',
      email: 'lillypad@gmail.com',
      password: 'abcde',
      isAdmin: true
    },
    {
      username: 'Sanchit',
      email: 'sanchit@gmail.com',
      password: 'cats',
      isAdmin: true
    },
    {
      username: 'Samara',
      email: 'samara@gmail.com',
      password: 'sammas',
      isAdmin: true
    },
    {
      username: 'Natalie',
      email: 'nat@gmail.com',
      password: 'lane'
    },
    {
      username: 'Celine',
      email: 'celine@gmail.com',
      password: 'sky'
    },
    {
      username: 'Cody',
      email: 'cody@gmail.com',
      password: 'puglife'
    },
    {
      username: 'Orion',
      email: 'orion@gmail.com',
      password: 'belt'
    },
    {
      username: 'Julia',
      email: 'julia@gmail.com',
      password: 'likesCake'
    },
    {
      username: 'Danielle',
      email: 'dan@gmail.com',
      password: 'elle'
    }
  ]

  const products = [
    {
      name: 'Orion, the Hunter',
      quantity: 10,
      price: 7000,
      description:
        'Take a seven star trip across the legendary hunter’s outline. Warm up with an active weekend visiting Orion’s head and learn more about the history of this legendary myth. Next amp with an active visit to the stars of Orion’s sword and learn intergalactic sword skills - both historical and contemporary techniques. Finally complete your active trip across Orion with three jammed-packed days on Orion’s Belt exploring meteor debris, star hiking, space games, and completing your active adventure with a relaxing feast fit for a hunter.',
      imageUrl:
        'https://images.unsplash.com/photo-1586234491813-2a87fb06abea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2046&q=80',
      location: '{NQ1 +85°}',
      disclaimer:
        'Star Hopper holds no responsibility or liability for lost property, damage, bodily harm, trips extending beyond planned trip duration up to but not excluding additional 10 years of travel time, or collection of lost properties or bodies.'
    },
    {
      name: 'Sagittarius, the Archer',
      quantity: 10,
      price: 12000,
      description:
        'This twelve-star zodiac package is all about exploration! Take time to practice space walking off of the archer’s knee by the star Rukbat. Learn about long-range photography by tackling the constellation’s brightest star: Epsilon Sagittarii. As we pass the ‘teapot’s spout’ enjoy the proximity to the Milky Way and explore the splendid views of the Large Sagittarius Star Cloud. The star of the Sagittarius package is a day spent observing a supermassive black hole at the center of the galaxy while relaxing on our top-notch space deck rotatable for 360° galaxy views.',
      imageUrl:
        'https://images.unsplash.com/photo-1541185934-01b600ea069c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2V4fGVufDB8MHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60',
      location: '{SQ4 +55°}',
      disclaimer:
        'Star Hopper holds no responsibility or liability for lost property, damage, bodily harm, trips extending beyond planned trip duration up to but not excluding additional 10 years of travel time, or collection of lost properties or bodies.'
    },
    {
      name: 'Taurus, the Bull',
      quantity: 10,
      price: 30000,
      description:
        'Take a trip across the oldest named constellation, Taurus. With historical roots that date back to the Bronze Age, and written records to the 2nd Century CE, Taurus is a great trip for families and history buffs alike. We will start our trip at Alderbaran, a large red star situated at the fork of bull’s horns. Here you will take some time to learn about this constellation’s mythological associations and may be lucky to experience meteor showers. (The Taurids peak in November, while the Beta Taurids can be seen in June and July.) As we make our way around the bull’s outline, this trip offers an amazing view of the Pleidas star cluster.  In addition to star viewing,this twelve day trip offers many in-ship activities including and not limited to spacecar racing, space rock climbing and space helium ice cream making classes.',
      imageUrl:
        'https://www.saltwire.com/media/photologue/photos/cache/30122019-AC-GlenRoberts-Column-AtlanticSkies_large.jpg',
      location: '{NQ1 +90°}',
      disclaimer:
        'Star Hopper holds no responsibility or liability for lost property, damage, bodily harm, trips extending beyond planned trip duration up to but not excluding additional 10 years of travel time, or collection of lost properties or bodies.'
    },
    {
      name: 'Cassiopeia, the Seated Queen',
      quantity: 10,
      price: 5000,
      description:
        'This five-star package is all about supporting women+ (this includes trans and nonbinary folx)! Cassiopeia was historically considered vain, but on this trip we celebrate a powerful woman on the throne and encourage confident learning and exploration. This trip follows the ‘W’-patten of the queen’s throne, making time on each star to explore individual development and community building. From group star climbing on Gamma that pushes us to trust and rely on each other’s experiences, to philosophical debates about the role of mythology and evolving roles of women+ in society while basking in the beautiful star-lights of Delta, each trip is designed to build as sense of wonder in the stars, challenge the views of the past, and leave each group feeling closer and more informed about themselves than when they started. Finally, on the final star of Epsilon Cassiopeiae, we have some fun recreating our own individual space-walk thrones and finish with a calming return-trip tea suited for royalty.',
      imageUrl:
        'https://images.unsplash.com/photo-1450849608880-6f787542c88a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80',
      location: '{SQ25 +90°}',
      disclaimer:
        'Star Hopper holds no responsibility or liability for lost property, damage, bodily harm, trips extending beyond planned trip duration up to but not excluding additional 10 years of travel time, or collection of lost properties or bodies.'
    },
    {
      name: 'Aquila, the Eagle',
      quantity: 10,
      price: 8500,
      description:
        'At Star Hopper, Aquila is for lovers. This epic ten-star trip is all about romance and bonding. This constellation, visible with the naked eye back on earth, represents the bird that carried Zeus/Jupiter’s thunderbolts. We hope Aquila can still hold a spark for you and your loved one! Starting off in the Milky Way, this trip warms up with 360° galaxy views and private chambers each with an external window for impressive sights. At Altair, the brightest star, we have fun with our partners and focus on friendship through space-games. On the 15 Aql double star, we send each couple off to a respective orbiting planet for their own, private, camping experience. We’ll pack the picnic! On the final star of Aquilae, we admire the star’s red-colored glow and our partner’s eyes with a paint and sip perfect for creating a memento for your time in space together. ',
      imageUrl:
        'https://images.unsplash.com/photo-1614089254151-676cc373b01e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      location: '{NQ4 -75°}',
      disclaimer:
        'Star Hopper holds no responsibility or liability for lost property, damage, bodily harm, trips extending beyond planned trip duration up to but not excluding additional 10 years of travel time, or collection of lost properties or bodies.'
    },
    {
      name: 'Big Dipper, the Plough',
      quantity: 7,
      price: 5500,
      description:
        'The Big Dipper is a classic. Often the first constellation children learn, this trip celebrates family and science. Starting on the handle of the dipper, we move along learning about space exploration, mythology, navigation, travel and research technology, and artistic representation. Children and their families will see stunning views through a variety of windows, telescopes, and monitor readings on Polaris. They will learn about mythology while putting on a little play of the many stories of Ursa Major (Greater Bear) on Megrez. Parents will enjoy a relaxing day passing Alioth as all the children have a hackathon to create a star-catcher game introducing them to some of our top-notch space-travel technologies. Everyone will enjoy getting their hands dirty on Alkaid on craft day! The craft changes every trip, so prepared to be surprised! At the end of the week, families will have learned a great deal, created many memories together, and have earned a well-deserved return trip full of starry dreams.',
      imageUrl:
        'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
      location: '{SQ4 +55°}',
      disclaimer:
        'Star Hopper holds no responsibility or liability for lost property, damage, bodily harm, trips extending beyond planned trip duration up to but not excluding additional 10 years of travel time, or collection of lost properties or bodies.'
    }
  ]

  // for (let i = 0; i < 20; i++) {
  //   users.push({
  //     username: faker.internet.userName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     isAdmin: true
  //   })
  // }

  const userInstances = await User.bulkCreate(users)
  console.log(`seeded ${users.length} users`)

  // // console.log('USER 1', userInstances[0])

  // Products
  // for (let i = 0; i < 20; i++) {
  //   products.push({
  //     name: faker.lorem.word(),
  //     quanity: faker.random.number(),
  //     price: i * 100 + 1,
  //     description: faker.commerce.productDescription(),
  //     imageUrl: faker.image.nature(),
  //     location: faker.address.nearbyGPSCoordinate(),
  //     disclaimer: faker.lorem.sentence(),
  //   })
  // }

  const productInstances = await Product.bulkCreate(products)
  console.log(`seeded ${products.length} products`)
}
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

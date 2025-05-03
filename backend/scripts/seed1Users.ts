// ./backend/scripts/seed1Users.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User } from '../models'


// ==============================< CONFIG >===============================
// Number of users created.
const minUsers = 40
const maxUsers = 60


// =========================< MAIN FUNCTION(S) >==========================
async function seedUsers() {
  const startTime = Date.now()
  console.log(`🚀 Starting user seeding at: ${new Date(startTime).toISOString()}`)

  await sequelize.sync()

  const totalUsers = faker.number.int({ min: minUsers, max: maxUsers })
  const usernames = new Set<string>()

  while (usernames.size < totalUsers) {
    usernames.add(faker.internet.username().toLowerCase())
  }

  let createdCount = 0

  for (const username of usernames) {
    await User.create({
      username,
      email: faker.internet.email({ firstName: username }),
      password: 'Password1!'
    })

    createdCount++

    if (createdCount % 10 === 0 || createdCount === totalUsers) {
      console.log(`   👤 Created ${createdCount}/${totalUsers} users...`)
    }
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  console.log(`✅ Finished seeding ${createdCount} users.`)
  console.log(`🕒 Finished at: ${new Date(endTime).toISOString()} (Duration: ${duration} ms)`)

  process.exit(0)
}

seedUsers().catch((err) => {
  console.error('❌ User seeding failed:', err)

  process.exit(1)
})

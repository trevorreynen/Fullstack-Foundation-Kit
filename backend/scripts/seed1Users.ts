// ./backend/scripts/seed1Users.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User } from '../models'


// ==============================< CONFIG >===============================
// Number of users created.
const minUsers = 20
const maxUsers = 22


// =========================< MAIN FUNCTION(S) >==========================
async function seedUsers() {
  await sequelize.sync()

  const totalUsers = faker.number.int({ min: minUsers, max: maxUsers })
  const usernames = new Set<string>()

  while (usernames.size < totalUsers) {
    usernames.add(faker.internet.username().toLowerCase())
  }

  for (const username of usernames) {
    await User.create({
      username,
      email: faker.internet.email({ firstName: username }),
      password: 'Password1!'
    })
  }

  console.log(`✅ Created ${usernames.size} users.`)

  process.exit(0)
}


seedUsers().catch((err) => {
  console.error('❌ User seeding failed:', err)

  process.exit(1)
})


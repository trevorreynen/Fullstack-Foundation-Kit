// ./backend/scripts/seed1Users.ts

// Imports
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { convertISO8601ToFormatted } from './seeder-utils/usefulFunctions'
import { initLogger, log, closeLogger } from '../utils/logger'


// ==============================< CONFIG >===============================
initLogger('timestamp', 'seed1Users', './Logs-Seeders')

// Number of users created.
const minUsers = 120
const maxUsers = 120

// Default password for new test users.
const DEFAULT_PASSWORD = 'Password1!'

// Use faker for email?
const FAKER_EMAIL = false

// The API call for register user
const REGISTER_URL = 'http://localhost:3050/api/v1/auth/register'


// =========================< MAIN FUNCTION(S) >==========================
async function seedUsers() {
  const startTime = Date.now()
  log(`[start] Starting user seeding at: ${convertISO8601ToFormatted(new Date(startTime).toISOString())}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })


  const totalUsers = faker.number.int({ min: minUsers, max: maxUsers })
  const usernames = new Set<string>()

  while (usernames.size < totalUsers) {
    usernames.add(faker.internet.username().toLowerCase())
  }

  let createdCount = 0

  for (const username of usernames) {
    const email = FAKER_EMAIL
      ? faker.internet.email({ firstName: username })
      : `${username}@email.com`

    try {
      await axios.post(REGISTER_URL, {
        username,
        email,
        password: DEFAULT_PASSWORD
      })

      createdCount++

      if (createdCount % 10 === 0 || createdCount === totalUsers) {
        log(`  Created ${createdCount}/${totalUsers} users...`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
      }
    } catch (err: any) {
      log(`    [error] Failed to create user ${username}: ${err}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
    }
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  log(`[success] Finished seeding ${createdCount} users.`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[time] Finished at: ${convertISO8601ToFormatted(new Date(endTime).toISOString())} (Duration: ${duration} ms)`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await closeLogger()
  process.exit(0)
}

seedUsers().catch((err) => {
  (async () => {
    log(`User seeding failed: ${err}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

    await closeLogger()
    process.exit(1)
  })()
})

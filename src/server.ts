'use strict'

// Read the .env file.
import * as dotenv from 'dotenv'
dotenv.config()

// Require the framework
import Fastify from 'fastify'

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace'

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV === 'development',
  },
})

// Register your application as a normal plugin.
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.register(require('./app'))

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ err }: { err?: Error }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

// Start listening.
app.listen(process.env.PORT || 3000, (err: Error | null) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

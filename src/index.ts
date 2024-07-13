import "reflect-metadata"
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import AppDataSource from './config/database'
import router from './routes'
import { authMiddleware } from './middleware/authMiddleware'
import { rateLimitMiddleware } from './middleware/rateLimitMiddleware'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors(
  {
    origin: 'http://localhost:3000',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  }
))
// app.use('*', authMiddleware)
app.use('*', rateLimitMiddleware)
app.use('*', errorHandlerMiddleware)

app.get('/', (c) => c.text('This is profanity checker API'));
app.route('/api', router)

const start = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
  } catch (err) {
    console.error("Error during Data Source initialization:", err)
  }
}

start()

export default {
  port: process.env.API_PORT,
  fetch: app.fetch,
}
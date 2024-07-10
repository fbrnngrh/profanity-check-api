import "reflect-metadata"
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { AppDataSource } from './config/database'

const app = new Hono()

app.use('*', logger())
app.use('*', prettyJSON())

app.get('/', (c) => c.text('Hello Hono!'))

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
  port: 3000,
  fetch: app.fetch,
}

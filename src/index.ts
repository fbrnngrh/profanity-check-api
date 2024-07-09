import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { errorHandler } from "./middleware/errorHandler";
import router from './routes/index'

const app = new Hono()

app.use('*', logger());
app.use('*', prettyJSON())
app.use('*', errorHandler) 

app.route('/', router);

export default {
    port: 3000,
    fetch: app.fetch
}
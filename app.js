import config from "./app/config.js"
import express from "express"
import router from "./routes/router.js"
import { logger } from "./app/middleware/logger.js"
import { exceptionHandler } from "./app/exceptions.js"

const server = express()

server.use(express.json())
server.use(logger)
server.use(express.static(config.public.path))
server.use(router)
server.use(exceptionHandler)

server.listen(config.api.port, () => console.log(`Listening on: http://localhost:${config.api.port}`))

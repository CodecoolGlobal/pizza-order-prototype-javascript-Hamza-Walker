import config from "./app/config.js"
import express from "express"
import cors from "cors"
import routers from "./routes/routers.js"
import { logger } from "./app/middleware/logger.js"
import { exceptionHandler } from "./app/middleware/exceptions.js"

const server = express()

server.use(express.json())
server.use(cors({ origin: config.server.allowed }))
server.use(logger)
server.use(express.static(config.public.path))
server.use(routers)
server.use(exceptionHandler)

server.listen(config.server.port, () => console.log(`Listening on: http://localhost:${config.server.port}`))

import config from "./app/config.js"
import express from "express"

import rootRoute from "./routes/root.route.js"

const server = express()

server.use(express.static("public"))
server.use("/", rootRoute)

server.listen(config.api.port, () => console.log(`Server listening on http://localhost:${config.api.port}`))

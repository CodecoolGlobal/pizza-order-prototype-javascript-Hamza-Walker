import config from "./app/config.js"
import express from "express"
import router from "./routes/router.js"

const server = express()

server.use((req, res, next) => {
	console.log(new Date(), req.ip, req.method, req.url)
	next()
})
server.use(express.json())
server.use(express.static(config.public.path))
server.use("/", router)
server.use((err, req, res, next) => {
	console.log(err)
	res.json(err)
})

server.listen(config.api.port, () => console.log(`Listening on: http://localhost:${config.api.port}`))

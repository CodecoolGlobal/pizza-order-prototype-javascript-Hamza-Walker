import { Router } from "express"

const route = Router()

route.get("/", (req, res) => {
	res.json({ message: "not implemented yet" })
})

export default route

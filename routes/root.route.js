import { Router } from "express"

const route = Router()

route.get("/", (req, res) => res.redirect("/index.html"))

export default route

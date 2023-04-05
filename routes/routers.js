import { Router } from "express"

import apiRoute from "./api.route.js"

const routing = Router()

routing.use("/api", apiRoute)
routing.get("/", (req, res) => res.redirect("/index.html"))

export default routing

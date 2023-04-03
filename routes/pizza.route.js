import { Router } from "express"

import { get } from "../app/database.js"

const route = Router()

route.get("/", (req, res) => res.json(get("pizza")))

export default route

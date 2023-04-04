import { Router } from "express"

import { get, createAt } from "../app/database.js"

const route = Router()

route.get("/", (req, res) => res.json(get("pizza")))
route.post("/", (req, res) => res.json(createAt("pizza", req.body)))

export default route

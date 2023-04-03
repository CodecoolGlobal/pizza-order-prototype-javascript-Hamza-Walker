import { Router } from "express"
import pizzaRoute from "./pizza.route.js"

const route = Router()

route.use("/pizza", pizzaRoute)

export default route

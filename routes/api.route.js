import { Router } from "express"
import pizzaRoute from "./pizza.route.js"
import ingredientRoute from "./ingredients.route.js"

const route = Router()

route.use("/pizza", pizzaRoute)
route.use("/ingredients", ingredientRoute)

export default route

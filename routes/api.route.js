import { Router } from "express"
import pizzaRoute from "./pizza.route.js"
import ingredientsRoute from "./ingredients.route.js"
import allergensRoute from "./allergens.route.js"
import ordersRoute from "./orders.route.js"

const route = Router()

route.use(pizzaRoute)
route.use(ingredientsRoute)
route.use(allergensRoute)
route.use(ordersRoute)

export default route

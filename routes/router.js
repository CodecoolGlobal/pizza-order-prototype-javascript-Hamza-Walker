import { Router } from "express"
import apiRoute from "./api.route.js"
const router = Router()

router.use("/api", apiRoute)

router.get("/", (req, res) => res.redirect("/index.html"))

export default router

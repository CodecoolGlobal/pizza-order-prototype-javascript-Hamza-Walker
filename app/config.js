import fs from "node:fs/promises"

const config = JSON.parse(await fs.readFile("config.json"))

export default config

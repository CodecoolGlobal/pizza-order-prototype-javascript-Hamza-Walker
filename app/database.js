import config from "./config.js"
import fs from "node:fs/promises"
import { v4 as uuid } from "uuid"

const tableNames = Object.keys(config.api.dataPath)
const diskData = Object.values(config.api.dataPath).map((path) => fs.readFile(path, { encoding: "utf-8" }))
const loadedData = await Promise.all(diskData)

const database = loadedData.reduce((db, data, index) => {
	db[tableNames[index]] = JSON.parse(data)
	return db
}, {})

export function get(table) {
	return database[table]
}
export function getFrom(table, id) {
	return get(table).find((item) => item.id === id)
}
export function createAt(table, item) {
	const created = { id: uuid(), ...item }
	get(table).push(created)
	return item
}
export function setFrom(table, id, data) {
	get(table)[id] = { ...getFrom(table, id), ...data }
	return get(table)[id]
}
export function deleteFrom(table, id) {
	const index = get(table).findIndex((item) => item.id === id)
	const deleted = get(table).splice(index, 1)
	return deleted
}

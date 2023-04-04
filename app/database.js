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

export function all(table) {
	return database[table]
}
export function get(table, id) {
	const entry = all(table).find((item) => item.id === id)
	if (!entry) throw { status: 404, message: "Not found", data: { id } }
	return entry
}
export function create(table, item) {
	const created = { id: uuid(), ...item }
	all(table).push(created)
	return created
}
export function update(table, id, data) {
	all(table)[id] = { ...get(table, id), ...data }
	return all(table)[id]
}
export function remove(table, id) {
	const index = all(table).findIndex((item) => item.id === id)
	const deleted = all(table).splice(index, 1)
	return deleted
}

import config from "./config.js"
import fs from "node:fs/promises"
import { v4 as uuid } from "uuid"

const tableNames = Object.keys(config.api.dataPath)
const diskData = Object.values(config.api.dataPath).map(path => fs.readFile(path, { encoding: "utf-8" }))
const loadedData = await Promise.all(diskData)

const database = loadedData.reduce((db, data, index) => {
	db[tableNames[index]] = JSON.parse(data)
	return db
}, {})

export function all(table) {
	return database[table]
}
export function get(table, id) {
	const entry = all(table).find(item => item.id === id)
	return entry
}
export function create(table, item) {
	const created = { createdAt: new Date().toISOString(), id: uuid(), ...item }
	all(table).push(created)
	saveData(table)
	return created
}
export function update(table, id, data) {
	all(table)[id] = { ...get(table, id), updatedAt: new Date().toISOString(), ...data }
	saveData(table)
	return all(table)[id]
}
export function remove(table, id) {
	const index = all(table).findIndex(item => item.id === id)
	const deleted = all(table).splice(index, 1)
	saveData(table)
	return deleted
}

function saveData(table) {
	fs.writeFile(config.api.dataPath[table], JSON.stringify(database[table], null, 2), { encoding: "utf-8" })
}

import { get, getItem } from "../database.js"

export function isUuidValidator(uuid) {
	if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(uuid))
		throw { status: 400, message: "Malformed UUID", data: { id: uuid } }
}

export function keyExistsValidator(table, id) {
	if (!getItem(table, id)) throw { status: 404, message: "Id not found", data: { id } }
}

export function nameIsUniqueValidator(table, name) {
	if (get(table).find(item => item.name === name))
		throw { status: 400, message: "Name already exists", data: { name } }
}

import { all, get } from "../database.js"

export function isValidUuid(uuid) {
	if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(uuid))
		throw { status: 400, message: "Malformed UUID", data: { id: uuid } }
}

export function keyExistsValidator(table, id) {
	if (!get(table, id)) throw { status: 404, message: "Id not found", data: { id } }
}

export function nameIsUniqueValidator(table, name) {
	if (all(table).find(item => item.name === name))
		throw { status: 400, message: "Name already exists", data: { name } }
}

export function isNotEmptyString(name, value) {
	if (value === "")
		throw { status: 400, message: `Required field "${name}" can not be empty.`, data: { fieldName: name } }
}

export function isValidEmail(email) {
	if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
		throw { status: 400, message: "Malformed e-mail address", data: { email } }
}

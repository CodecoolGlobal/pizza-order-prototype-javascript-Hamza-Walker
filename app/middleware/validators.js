export function uuidValidator(uuid) {
	if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(uuid))
		throw { stats: 400, message: "Malformed UUID", data: { id: uuid } }
}

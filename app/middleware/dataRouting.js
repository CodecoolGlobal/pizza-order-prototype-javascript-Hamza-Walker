import { Router } from "express"
import { get, getItem, create, update, remove } from "../database.js"

export default function dataBaseRouter(
	dataKey,
	{ validation, transformOnSend } = {
		validation: null,
		transformOnSend: null
	}
) {
	const path = `/${dataKey}`
	const pathWithParams = `/${dataKey}/:id`

	transformOnSend ??= item => item
	validation = {
		...{
			post: (req, res, next) => {
				next()
			},
			put: (req, res, next) => {
				next()
			},
			delete: (req, res, next) => {
				next()
			},
			...validation
		}
	}

	const route = Router()

	route.get(path, sendTable)
	route.get(pathWithParams, sendItem)
	route.post(path, [validation.post, createItem])
	route.put(pathWithParams, [validation.put, updateItem])
	route.delete(pathWithParams, [validation.delete, deleteItem])

	return route

	function sendTable(req, res) {
		res.json(get(dataKey).map(transformOnSend))
	}
	function sendItem(req, res) {
		const item = getItem(dataKey, req.params.id)
		res.json(transformOnSend(item))
	}
	function createItem(req, res) {
		const item = create(dataKey, req.body)
		res.status(201).json(transformOnSend(item))
	}
	function updateItem(req, res) {
		const item = update(dataKey, req.params.id, req.body)
		res.json(transformOnSend(item))
	}
	function deleteItem(req, res) {
		const item = remove(dataKey, req.params.id)
		res.json(transformOnSend(item))
	}
}

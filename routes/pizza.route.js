import { get } from "../app/database.js"
import dataBaseRouter from "../app/middleware/dataRouting.js"
import { keyExistsValidator, nameIsUniqueValidator, uuidValidator } from "../app/middleware/validators.js"

const KEY = "pizza"

export default dataBaseRouter(KEY, {
	validation: {
		post: postValidator,
		put: putValidator,
		delete: deleteValidator
	},
	transformOnSend: dataTransformer
})

function postValidator(req, res, next) {
	nameIsUniqueValidator(KEY, req.body.name)
	next()
}
function putValidator(req, res, next) {
	uuidValidator(req.params.id)
	keyExistsValidator(KEY, req.params.id)
	next()
}
function deleteValidator(req, res, next) {
	uuidValidator(req.params.id)
	keyExistsValidator(KEY, req.params.id)
	next()
}
function dataTransformer(pizza) {
	return { ...pizza, ingredients: pizza.ingredients.map((ingredient) => get("ingredients", ingredient)) }
}

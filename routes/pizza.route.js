import { get } from "../app/database.js"
import dataBaseRouter from "../app/middleware/dataRouting.js"
import { keyExistsValidator, nameIsUniqueValidator, isUuidValidator } from "../app/middleware/validators.js"

const DATA_KEY = "pizza"

export default dataBaseRouter(DATA_KEY, {
	validation: {
		post: postValidator,
		put: putValidator,
		delete: deleteValidator
	},
	transformOnSend: dataTransformer
})

function postValidator(req, res, next) {
	nameIsUniqueValidator(DATA_KEY, req.body.name)
	next()
}
function putValidator(req, res, next) {
	isUuidValidator(req.params.id)
	keyExistsValidator(DATA_KEY, req.params.id)
	next()
}
function deleteValidator(req, res, next) {
	isUuidValidator(req.params.id)
	keyExistsValidator(DATA_KEY, req.params.id)
	next()
}
function dataTransformer(pizza) {
	return { ...pizza, ingredients: pizza.ingredients.map(ingredient => get("ingredients", ingredient)) }
}

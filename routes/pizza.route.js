import { get } from "../app/database.js"
import dataBaseRouter from "../app/middleware/dataRouting.js"

export default dataBaseRouter("pizza", {
	validation: {
		post: postValidator,
		put: putValidator,
		delete: deleteValidator
	},
	transformOnSend: dataTransformer
})

function postValidator(req, res, next) {
	next()
}
function putValidator(req, res, next) {
	next()
}
function deleteValidator(req, res, next) {
	next()
}
function dataTransformer(pizza) {
	return { ...pizza, ingredients: pizza.ingredients.map((ingredient) => get("ingredients", ingredient)) }
}

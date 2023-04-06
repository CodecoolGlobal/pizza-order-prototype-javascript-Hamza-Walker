import { get } from "../app/database.js"
import dataBaseRouter from "../app/middleware/dataRouting.js"
import { isUuidValidator } from "../app/middleware/validators.js"

export default dataBaseRouter("allergens", {
	validation: {
		post: postValidator,
		put: putValidator,
		delete: deleteValidator
	}
})

function postValidator(req, res, next) {
	next()
}
function putValidator(req, res, next) {
	isUuidValidator(req.params.id)
	next()
}
function deleteValidator(req, res, next) {
	isUuidValidator(req.params.id)
	next()
}

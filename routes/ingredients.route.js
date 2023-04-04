import dataBaseRouter from "../app/middleware/dataRouting.js"

export default dataBaseRouter("ingredients", {
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
	next()
}
function deleteValidator(req, res, next) {
	next()
}

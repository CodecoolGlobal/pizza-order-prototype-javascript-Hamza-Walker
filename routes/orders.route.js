import dataBaseRouter from "../app/middleware/dataRouting.js"
import { isNotEmptyString, isValidEmail, isValidUuid } from "../app/middleware/validators.js"

export default dataBaseRouter("orders", {
	validation: {
		post: postValidator,
		put: putValidator,
		delete: deleteValidator
	}
})

function postValidator(req, res, next) {
	const { name, email, phone, address } = req.body.customerInfo

	console.log(req.body)

	isNotEmptyString("name", name)
	isNotEmptyString("email", email)
	isValidEmail(email)
	isNotEmptyString("phone", phone)
	isNotEmptyString("address", address)

	next()
}
function putValidator(req, res, next) {
	isValidUuid(req.params.id)
	next()
}
function deleteValidator(req, res, next) {
	isValidUuid(req.params.id)
	next()
}

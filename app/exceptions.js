export function exceptionHandler(err, req, res, next) {
	res.status(404).json(err)
}

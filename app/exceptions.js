export function exceptionHandler(err, req, res, next) {
	res.status(err.status ?? 404).json(err)
}

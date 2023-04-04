export function exceptionHandler(err, req, res, next) {
	const errorData = {
		date: new Date().toISOString(),
		method: req.method,
		status: err.status ?? 500,
		path: req.url,
		message: err.message,
		data: err.data
	}

	res.status(errorData.status).json(errorData)
}

export function logger(req, res, next) {
	res.on("finish", () => {
		const log = {
			date: new Date().toISOString(),
			ip: req.ip,
			method: req.method,
			url: req.url,
			status: res.statusCode,
			message: res.statusMessage
		}
		console.log(Object.values(log).join(" "))
	})

	next()
}

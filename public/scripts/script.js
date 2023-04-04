export async function getAll(endpoint) {
	const request = await fetch(endpoint)
	return request.json()
}
export async function get(endpoint, id) {
	return get(`${endpoint}/${id}`)
}
export async function post(endpoint, data) {
	const request = await fetch(endpoint, {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	return request.json()
}

console.log(await getAll("/api/pizza"))

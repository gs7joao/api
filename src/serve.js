import http from "node:http"

// In Terminal execute "dev"
const serve = http.createServer((request, response) => {
	return response.end("Test")
})

serve.listen(3333)
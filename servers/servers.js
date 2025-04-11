import http from "http";

http
	.createServer((req, res) => {
		res.writeHead(200, { "content-type": "application/json" });
		res.write("Hola Mundo!");
		res.end();
	})
	.listen(3000, "localhost", () => {
		console.log("Encendiendo server.");
	});

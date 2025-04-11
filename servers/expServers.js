import express from "express";

const PORT = 3000;
const app = express();

app.get("/saludar", (req, res) => {
	res.send("Hola Mundo desde Express!");
});

app.listen(PORT, () => {
	console.log("Express encendido.");
});

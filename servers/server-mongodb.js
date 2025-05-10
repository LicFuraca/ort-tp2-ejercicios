import express from "express";
import chalk from "chalk";
import { getInventor, getInventors, updateInventor, deleteInventor, updateInventor } from "../data/inventors.js";

const PORT = 3000;

const html = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
                <h3>Esto es la pagina de documentación de la API Inventores</h3>
            </body>
            </html>
        `;

const app = express();

app.get("/", (req, res) => {
  res.json(getInventors())
});

app.use(express.json());
// TODO: traer un inventor
// Crear un inventor
app.post("/api/inventors", (req, res) => {
    
});

// TODO: actualizar un inventor

//Todo: eliminar un inventor

app.listen(PORT, () => {
  console.log(chalk.bgGreen("Servidor levantado en puerto ", PORT));
});
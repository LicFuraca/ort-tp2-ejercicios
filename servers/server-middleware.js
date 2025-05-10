import express from "express";

const PORT = 3000;
const app = express();

app.get("/saludar", (req, res) => {
    res.send("Hola Mundo desde Express!");
});

app.listen(PORT, () => {
    console.log("Express encendido.");
});

app.use("/", (req,res,next) => {
    if (req.query.key == "123abc")
        next()
    else {
        res.status(401).send("Login fail")
    }
})
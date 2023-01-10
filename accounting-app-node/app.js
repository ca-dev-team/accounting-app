const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
    res.json({ 
        message: "un mensaje"
    })
});

app.listen(3000, function() {
    console.log("la app está corriendo...");
});
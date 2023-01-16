if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

require('./src/config/db.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, function() {
    console.log("La app está corriendo en el puerto " + PORT);
});
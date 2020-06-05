const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const path = require('path');

// default options, no immediate parsing

const app = express();

require("./config/firabaseConfig");
//Middleware
app.use(morgan("dev"));
app.use(cors({ origin: true }));

// app.use(fileupload());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api/products", require("./routes/index"));

// exports.app = functions.https.onRequest(app);


app.listen(5000, () => {
  console.log("servidor en el puerto 5000");
});

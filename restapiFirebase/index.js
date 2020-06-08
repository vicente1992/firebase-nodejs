const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");



// default options, no immediate parsing

const app = express();

require("./config/firabaseConfig");
//Middleware
app.use(morgan("dev"));
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routes
app.use("/api/products", require("./routes/index"));

// module.exports.app = functions.https.onRequest(app);


app.listen(5000, () => {
  console.log("servidor en el puerto 5000");
});

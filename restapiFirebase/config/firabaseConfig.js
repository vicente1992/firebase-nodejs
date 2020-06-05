const admin = require("firebase-admin");
const firebase = require("firebase");
const storage = require("firebase/storage");
var serviceAccount = require("../key.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-crud-restapi-d6e1c.firebaseio.com",
  storageBucket: 'fir-crud-restapi-d6e1c.appspot.com'
});


module.exports = admin;

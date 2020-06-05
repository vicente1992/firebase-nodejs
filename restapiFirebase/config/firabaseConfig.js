const admin = require("firebase-admin");
const firebase = require("firebase");
const storage = require("firebase/storage");
var serviceAccount = require("../key.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-crud-restapi-d6e1c.firebaseio.com",
  storageBucket: 'fir-crud-restapi-d6e1c.appspot.com'
});

// const firebaseConfig = {
//   apiKey: "AIzaSyDlA6KZFxJYLqCAf8dPLRjp8JW564bSwLM",
//   authDomain: "fir-crud-restapi-d6e1c.firebaseapp.com",
//   databaseURL: "https://fir-crud-restapi-d6e1c.firebaseio.com",
//   projectId: "fir-crud-restapi-d6e1c",
//   storageBucket: "fir-crud-restapi-d6e1c.appspot.com",
//   messagingSenderId: "808831583965",
//   appId: "1:808831583965:web:028a4eeca2db0e6941bd34",
//   storageBucket: 'gs://fir-crud-restapi-d6e1c.appspot.com'

// };
// 
// firebase.initializeApp(firebaseConfig);
// module.exports = firebase;

module.exports = admin;

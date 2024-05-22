/* eslint-disable linebreak-style */
const admin = require("firebase-admin");
// const firebaseapp = require("firebase-admin/app");
const serviceAccountKey = require("../../serviceAccountKey.json");

// const firebaseService = admin.initializeApp({
//   credential: firebaseapp.cert(serviceAccountKey),
//   databaseURL: "",
// });

const firebaseService = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://rxcountry-backoffice.firebaseio.com",
});

const dbService = firebaseService.database();
const authService = firebaseService.auth();

console.log(firebaseService);

module.exports = {
  dbService,
  authService,
};

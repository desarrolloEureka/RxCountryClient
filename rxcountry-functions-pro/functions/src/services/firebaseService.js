/* eslint-disable linebreak-style */
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

const serviceAccountKey = {
  type: serviceAccount.type,
  project_id: serviceAccount.project_id,
  private_key_id: serviceAccount.private_key_id,
  private_key: serviceAccount.private_key,
  client_email: serviceAccount.client_email,
  client_id: serviceAccount.client_id,
  auth_uri: serviceAccount.auth_uri,
  token_uri: serviceAccount.token_uri,
  auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
  client_x509_cert_url: serviceAccount.client_x509_cert_url,
  universe_domain: serviceAccount.universe_domain,
};

const firebaseService = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: process.env.DATABASE_URL,
});

const dbService = firebaseService.database();
const authService = firebaseService.auth();

// console.log(
//     "***-------------firebaseService-------------*** :",
//     firebaseService,
// );

module.exports = {
  dbService,
  authService,
};

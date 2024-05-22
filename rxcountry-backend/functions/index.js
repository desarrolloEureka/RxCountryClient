const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const {authRouter} = require("./src/endpoints/auth");
const {errorHandler} = require("./src/middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use(errorHandler);

module.exports = {
  api: functions.https.onRequest(app),
};

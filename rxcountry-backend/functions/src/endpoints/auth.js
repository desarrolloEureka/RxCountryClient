/* eslint-disable linebreak-style */
const {Router} = require("express");
const {authenticate} = require("../middlewares/authentication");
const {authService} = require("../services/firebaseService");

// eslint-disable-next-line new-cap
const authRouter = Router();

authRouter.post("/createUser", authenticate, async (req, res, next) => {
  try {
    const user = req.body;
    const userFirebase = await authService.createUser(user);
    return res.send({userId: userFirebase.uid});
  } catch (e) {
    e.status = 500;
    return next(e);
  }
});

authRouter.post("/updatePassword", authenticate, async (req, res, next) => {
  try {
    const {uid, password} = req.body;
    const userFirebase = await authService.updateUser(uid, {password});
    return res.send({userId: userFirebase.uid});
  } catch (e) {
    e.status = 500;
    return next(e);
  }
});

module.exports = {
  authRouter,
};

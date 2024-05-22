/* eslint-disable linebreak-style */
const {authService} = require("../services/firebaseService");

const authenticate = async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    const decodedIdToken = await authService.verifyIdToken(req.get("Authorization").split(" ")[1]);
    req.clientId = decodedIdToken.uid;
    return next();
  } catch (error) {
    error.status = 401;
    error.message = "Unauthorized";
    return next(error);
  }
};

module.exports = {
  authenticate,
};

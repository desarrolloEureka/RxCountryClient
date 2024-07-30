/* eslint-disable linebreak-style */
const errorHandler = (error, req, res, next) => {
  console.error(`Error at ${req.originalUrl}`);
  console.error(`Request body:`, req.body);
  console.error(`Error object:`, error);
  res.status(error.status || 500).send({message: error.message});
};

module.exports = {
  errorHandler,
};

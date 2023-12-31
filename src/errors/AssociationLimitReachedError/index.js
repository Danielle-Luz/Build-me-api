const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class AssociationLimitReachedError extends AppError {
  constructor(message) {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
  }
}

module.exports = { AssociationLimitReachedError };

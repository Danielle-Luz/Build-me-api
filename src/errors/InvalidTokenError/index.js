const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class InvalidTokenError extends AppError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = { InvalidTokenError };

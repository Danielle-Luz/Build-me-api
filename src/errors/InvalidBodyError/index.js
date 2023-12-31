const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class InvalidBodyError extends AppError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

module.exports = { InvalidBodyError };

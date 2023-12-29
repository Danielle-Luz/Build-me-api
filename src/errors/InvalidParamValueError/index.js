const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class InvalidParamValueError extends AppError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

module.exports = { InvalidParamValueError };

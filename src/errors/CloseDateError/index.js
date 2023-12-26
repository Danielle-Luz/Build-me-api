const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../AppError");

class CloseDateError extends AppError {
  constructor(message) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}

module.exports = { CloseDateError };

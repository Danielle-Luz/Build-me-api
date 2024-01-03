const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../AppError");

class CloseDateError extends AppError {
  constructor(message) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

module.exports = { CloseDateError };

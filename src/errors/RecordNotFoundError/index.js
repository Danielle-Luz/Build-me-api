const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class RecordNotFoundError extends AppError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

module.exports = { RecordNotFoundError };

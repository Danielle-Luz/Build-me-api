const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class DuplicatedInfoError extends AppError {
  constructor(message) {
    super(message, StatusCodes.CONFLICT);
  }
}

module.exports = { DuplicatedInfoError };

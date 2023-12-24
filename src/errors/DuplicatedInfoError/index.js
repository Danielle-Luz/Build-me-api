const { AppError } = require("../AppError/index");

class DuplicatedInfoError extends AppError {
  constructor(message) {
    const statusCode = 409;
    super(message, statusCode);
  }
}

module.exports = { DuplicatedInfoError };

const { AppError } = require("../AppError/index");

class InvalidTokenError extends AppError {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

module.exports = { InvalidTokenError };

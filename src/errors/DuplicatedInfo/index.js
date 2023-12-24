const { AppError } = require("../AppError/index");

class DuplicatedInfo extends AppError {
  constructor(message) {
    const statusCode = 409;
    super(message, statusCode);
  }
}

module.exports = { DuplicatedInfo };

const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class InvalidLoginInfoError extends AppError {
  constructor() {
    const errorMessage = "No user found with the login info informed";
    super(errorMessage, StatusCodes.NOT_FOUND);
  }
}

module.exports = { InvalidLoginInfoError };

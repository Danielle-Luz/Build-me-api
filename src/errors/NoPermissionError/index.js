const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../AppError");

class NoPermissionError extends AppError {
  constructor(
    message = "The user is unauthorized to access the route or to perform this operation with other users"
  ) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = { NoPermissionError };

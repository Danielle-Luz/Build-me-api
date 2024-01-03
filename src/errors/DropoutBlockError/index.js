const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../AppError");

class DropoutBlockError extends AppError {
  constructor(blockExpireDate) {
    super(
      `The user is restricted from applying to vacancies due to a previous withdrawal. They can only register again starting from this date: ${blockExpireDate}`,
      StatusCodes.FORBIDDEN
    );
  }
}

module.exports = { DropoutBlockError };

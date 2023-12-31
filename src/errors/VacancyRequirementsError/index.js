const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class VacancyRequirementsError extends AppError {
  constructor(message) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}

module.exports = { VacancyRequirementsError };

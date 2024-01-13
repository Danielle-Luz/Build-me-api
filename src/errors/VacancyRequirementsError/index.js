const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

class VacancyRequirementsError extends AppError {
  constructor(message) {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
  }
}

module.exports = { VacancyRequirementsError };

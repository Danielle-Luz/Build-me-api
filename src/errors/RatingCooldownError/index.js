const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../AppError");

class RatingCooldownError extends AppError {
  constructor() {
    super(
      "This user has already rated the same user for this project within the last fifteen days",
      StatusCodes.TOO_MANY_REQUESTS
    );
  }
}

module.exports = { RatingCooldownError };

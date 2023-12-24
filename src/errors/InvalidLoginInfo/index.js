const { AppError } = require("../AppError/index");

class InvalidLoginInfo extends AppError {
  constructor() {
    const errorMessage = "No user found with the login info informed";
    const statusCode = 404;

    super(errorMessage, statusCode);
  }
}

module.exports = { InvalidLoginInfo };

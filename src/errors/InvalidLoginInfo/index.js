import AppError from "../AppError";

export default class InvalidLoginInfo extends AppError {
  constructor() {
    const errorMessage = "No user found with the login info informed";
    const statusCode = 404;

    super(errorMessage, statusCode);
  }
}

import AppError from "../AppError";

export default class DuplicatedInfo extends AppError {
  constructor(message) {
    const statusCode = 409;
    super(message, statusCode);
  }
}

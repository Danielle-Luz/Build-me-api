const { ZodError } = require("zod");
const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

exports.errorHandler = (error, request, response, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let errorMessage = { message: error.message };

  if (error instanceof AppError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = statusCode.BAD_REQUEST;
    errorMessage = error.flatten().fieldErrors;
  }

  return response.status(statusCode).json(errorMessage);
};

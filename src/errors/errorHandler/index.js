const { ZodError } = require("zod");
const { AppError } = require("../AppError/index");
const { StatusCodes } = require("http-status-codes");

exports.errorHandler = (error, request, response, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let errorMessage = { message: error.message };

  console.error(error);

  if (error instanceof AppError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    errorMessage = error.flatten().fieldErrors;
  }

  return response.status(statusCode).json(errorMessage);
};

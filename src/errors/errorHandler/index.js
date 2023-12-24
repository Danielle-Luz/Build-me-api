const { ZodError } = require("zod");
const { AppError } = require("../AppError/index");

exports.errorHandler = (error, request, response, next) => {
  let statusCode = 500;
  let errorMessage = { message: error.message };

  console.log("error", error);

  if (error instanceof AppError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    errorMessage = error.flatten().fieldErrors;
  }

  return response.status(statusCode).json(errorMessage);
};

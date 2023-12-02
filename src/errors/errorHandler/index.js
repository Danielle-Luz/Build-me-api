import { ZodError } from "zod";
import AppError from "../AppError";

export default function errorHandler(error, request, response, next) {
  let statusCode = 500;
  let errorMessage = { message: error.errorMessage };

  if (error instanceof AppError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    errorMessage = error.flatten().fieldErrors;
  }

  return response.status(statusCode).json(errorMessage);
}

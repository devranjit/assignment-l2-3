import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";



export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails = {};

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "validation failed";

    const errors: Record<string, any> = {};
    for (const field in err.errors) {
      const fieldError = err.errors[field] as mongoose.Error.ValidatorError;
      errors[field] = {
        message: fieldError.message,
        name: fieldError.name,
        properties: fieldError.properties,
        kind: fieldError.kind,
        path: fieldError.path,
        value: fieldError.value,
      };
    }

    errorDetails = {
      name: err.name,
      errors,
    };
  } else {
    errorDetails = err; 

  res.status(statusCode).json({
    message,
    success: false,
    error: errorDetails,
  });
}};

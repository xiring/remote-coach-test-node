import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import { ErrorRes } from "@utils/response";
import { isInstance } from "class-validator";
import BadRequestException from "../utils/exceptions/bad-request.exception";
import FileUploadException from "@utils/exceptions/file-upload.exception";
import * as fs from "fs";
import HttpException from "@utils/exceptions/http.exception";
import { getValidationError } from "@utils/validation-error";

const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();

  logger.error(err.stack, err.name, err);
  logger.error("****************************** ASYNC ERRORS ******************************");
  logger.error("req.originalUrl =====> ", req.get("Host"), req.originalUrl);

  let errorObj = {
    status: err.status || 500,
    message: err.message,
    error: err.error || null,
  };

  if (isInstance(err, BadRequestException)) errorObj.error = getValidationError(err.error);
  else if (isInstance(err, FileUploadException)) {
    errorObj.error = getValidationError(err.error);
    fs.unlink(err.filePath, (e) => {
      if (e) logger.error("Unable to unlink file:", err.filePath);
      else logger.success("unlink file:", err.filePath);
    });
  } else if (isInstance(err, HttpException)) errorObj.message = err.message;
  else errorObj.message = "Something went wrong !";

  return ErrorRes(res, errorObj.status || 500, {
    message: errorObj.message,
    error: errorObj.error,
  });
};

export default ErrorMiddleware;

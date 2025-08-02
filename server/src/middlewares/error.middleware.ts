import express from "express";

import { ENV } from "../constants/env";
import { Prisma } from "../../generated/prisma";
import { AppError, prettifyError } from "../lib/error";
import { STATUS_CODES } from "../constants/http";

export const errorMiddleware: express.ErrorRequestHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // handle prisma initialization error
  if (error instanceof Prisma.PrismaClientInitializationError) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      stack: prettifyError(error),
      message: "Could not connect to the database.",
    });
    return;
  } else if (error instanceof AppError) {
    // custom error
    res.status(error.httpStatusCode).json({
      stack: prettifyError(error),
      message: error.message,
    });
  }

  // Server-related error. (default)
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    stack: prettifyError(error),
  });
};

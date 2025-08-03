import express from "express";

import * as UserService from "../services/user.service";
import { AppError } from "../lib/error";
import { STATUS_CODES } from "../constants/http";
import prisma from "../db/client";

export const userHasAccess = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (accessToken === undefined)
    throw new AppError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");

  const accessTokenPayload = UserService.validateAccessToken(accessToken);

  // validate user
  const user = await prisma.user.findFirst({
    where: {
      id: accessTokenPayload.uid,
    },
  });

  if (user === null)
    throw new AppError(STATUS_CODES.UNAUTHORIZED, "Unauthorized");

  req.user = user;
  next();
};

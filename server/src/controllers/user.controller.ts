import express from "express";

import * as UserService from "../services/user.service";

import prisma from "../db/client";
import { loginPayloadSchema, newUserSchema } from "../lib/schemas";
import { AppError } from "../lib/error";
import { STATUS_CODES } from "../constants/http";

export const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const data = newUserSchema.parse(req.body);

  //   check for existing user
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser !== null)
    throw new AppError(STATUS_CODES.CONFLICT, "Email already exists");

  const user = await UserService.createUser(data);

  const userSession = await UserService.createUserSession(user.id);

  const { accessToken, refreshToken } =
    UserService.createAccessAndRefreshTokens(userSession);

  UserService.setRefreshTokenCookie(res, refreshToken)
    .status(STATUS_CODES.OK)
    .json({
      user,
      accessToken,
    });
};

export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const data = loginPayloadSchema.parse(req.body);

  const existingUser = await UserService.validateUser(data);
  if (existingUser === null)
    throw new AppError(STATUS_CODES.NOT_FOUND, "User not found");
  if (existingUser === false)
    throw new AppError(STATUS_CODES.BAD_REQUEST, "Invalid credentials");

  const userSession = await UserService.createUserSession(existingUser.id);

  const { accessToken, refreshToken } =
    UserService.createAccessAndRefreshTokens(userSession);

  UserService.setRefreshTokenCookie(res, refreshToken)
    .status(STATUS_CODES.OK)
    .json({
      user: existingUser,
      accessToken,
    });
};

export const logoutUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.user!;

  await UserService.deleteUserSession(user.id);

  UserService.unsetRefreshTokenCookie(res).status(STATUS_CODES.OK).end();
};

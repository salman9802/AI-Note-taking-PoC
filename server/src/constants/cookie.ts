import express from "express";

import { ENV } from "./env";

export const DEFAULT_COOKIE_OPTIONS: express.CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  signed: true,
} as const;

export const REFRESH_TOKEN_COOKIE_PATH = "/user/access";

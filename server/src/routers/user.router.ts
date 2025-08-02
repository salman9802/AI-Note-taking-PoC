import express from "express";

import * as UserController from "../controllers/user.controller";
import { errorCatch } from "../lib/error";
import { userHasAccess } from "../middlewares/user.middleware";

const userRouter = express.Router();

userRouter.post("/register", errorCatch(UserController.registerUser));
userRouter.post("/login", errorCatch(UserController.loginUser));
userRouter.delete(
  "/logout",
  errorCatch(userHasAccess),
  errorCatch(UserController.logoutUser)
);

export default userRouter;

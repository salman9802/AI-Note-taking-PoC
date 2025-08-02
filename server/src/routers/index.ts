import express from "express";

import userRouter from "./user.router";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "server running" });
});

router.use("/user", userRouter);

export default router;

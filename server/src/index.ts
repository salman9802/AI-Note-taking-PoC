import express from "express";
import cookieParser from "cookie-parser";

import { ENV } from "./constants/env";
import router from "./routers";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(ENV.COOKIE_SECRET));

app.use("/", router);

// custom error handler
app.use(errorMiddleware);

app.listen(ENV.PORT, (err) => {
  console.log("Server started");
});

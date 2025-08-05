import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./constants/env";
import router from "./routers";
import { errorMiddleware } from "./middlewares/error.middleware";

const allowedClientOrigins = ["http://localhost:5173"];

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(ENV.COOKIE_SECRET));
app.use(
  cors({
    origin: (origin, cb) => {
      // allow requests with no origin (like curl or mobile apps)
      if (!origin) return cb(null, true);

      if (allowedClientOrigins.includes(origin)) return cb(null, true);

      return cb(new Error("Blocked by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", router);

// custom error handler
app.use(errorMiddleware);

app.listen(ENV.PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server started");
});

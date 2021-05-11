import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

/* Middleware */
import { localMiddleware } from "./middlewares";

/* Router */
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

/* passport */
import passport from "passport";
import "./passport";
import apiRouter from "./routers/apiRouter";

/* Message Flash */
import flash from "express-flash";

const app = express();

/* Express Template */
app.set("view engine", "pug");

/* Middleware */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(localMiddleware);

/* Router */
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

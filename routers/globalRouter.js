import express from "express";
import passport from "passport";
import {
  facebookLogin,
  getJoin,
  getLogin,
  githubLogin,
  logout,
  postJoin,
  postLogin,
  successFacebookLogin,
  successGithubLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

// Github
globalRouter.get(routes.github, onlyPublic, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  successGithubLogin
);

// facebook
globalRouter.get(routes.facebook, onlyPublic, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  successFacebookLogin
);

export default globalRouter;

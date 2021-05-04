import express from "express";
import {
  changePassword,
  getEditProfile,
  getProfile,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

userRouter.get("/", onlyPrivate, getProfile);
export default userRouter;

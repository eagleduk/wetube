import express from "express";
import {
  postAddComment,
  postDeleteComment,
  postRegisterView,
} from "../controllers/videoController";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);
apiRouter.post(routes.delComment, onlyPrivate, postDeleteComment);

export default apiRouter;

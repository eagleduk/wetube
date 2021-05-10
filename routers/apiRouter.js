import express from "express";
import { getRegisterView } from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, getRegisterView);

export default apiRouter;

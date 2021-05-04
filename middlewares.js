import routes from "./routes";
import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || false;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

const multerVideo = multer({ dest: "uploads/videos/" });
export const uploadVideo = multerVideo.single("videoFile");

const multerAvatar = multer({ dest: "uploads/avatar" });
export const uploadAvatar = multerAvatar.single("avatar");

import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Incorrect Passwords");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  successFlash: "Welcome",
  failureFlash: "Log in failed",
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Log in failed",
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id: githubId, avatar_url: avatarUrl, name, email },
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = githubId;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const successGithubLogin = (req, res) => {
  req.flash("success", "Welcom from GitHub");
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id: facebookId, name, email },
  } = profile;
  const avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = facebookId;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const successFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Good Bye, bro");
  req.logout();
  res.redirect(routes.home);
};

export const getProfile = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findById(id).populate("Videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    console.log(error);
    req.flash("error", "User is not found");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file?.path || req.user.avatarUrl,
    });
    req.flash("success", "User Profile has Updated");
    res.redirect(routes.users);
  } catch (error) {
    req.flash("error", "User Profile Updated Error");
    res.redirect(`${routes.users + routes.editProfile}`);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  try {
    if (newPassword === newPassword2) {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.users);
    }
    throw Error("Incorrect newPassword and Verify New Password.");
  } catch (error) {
    req.flash("error", "Can't Change Password");
    res.status(400);
    res.redirect(`${routes.users + routes.changePassword}`);
  }
};

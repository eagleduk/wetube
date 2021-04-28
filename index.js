import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening... http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from Home");

const handleProfile = (req, res) => res.send("Your Profile");

const handleMiddleware = (req, res, next) => {
  console.log("Hello Middleware!!");
  next();
};

app.use(handleMiddleware);

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

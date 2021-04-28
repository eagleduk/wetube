const express = require("express");
const app = express();

const PORT = 4000;

function handleListening() {
  console.log(`Listening... http://localhost:${PORT}`);
}

function handleHome(req, res) {
  res.send("Hello from Home");
}

function handleProfile(req, res) {
  res.send("Your Profile");
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

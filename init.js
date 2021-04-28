import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening... ✅ http://localhost:${PORT}`);

app.listen(PORT, handleListening);

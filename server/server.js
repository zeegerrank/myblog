require("dotenv").config();
const express = require("express");
const app = express();

app.post("/", (req, res) => {
  return res.status(200).send("Hello World");
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});

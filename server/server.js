require("dotenv").config();const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose;

app.post("/", (req, res) => {
  return res.status(200).send("Hello World");
});

const DB_SECRET = process.env.DB_SECRET;
const COLLECTION_NAME = "main";

db.connect(
  `mongodb+srv://zeegerrank:${DB_SECRET}@cluster0.itngpio.mongodb.net/${COLLECTION_NAME}?retryWrites=true&w=majority`
);
db.connection.once("open", () => {
  console.log("Database is connected");
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
  });
});
db.connection.on("error", (err) => {
  console.log("db connect error: ", err);
});

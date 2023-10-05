require("dotenv").config();
const express = require("express");
const app = express();

/**express middleware config */

/**express middleware init*/
app.use(express.json());

/**third party middleware import*/
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

/**third party middleware config */
const devLogStream = fs
  .createWriteStream("development.log", {
    interval: "1d" /*rotate daily */,
    path: path.join(__dirname, "log"),
  })

  /**third party middleware init*/
  .app.use(cors());
app.use(logger("dev"), { stream: devLogStream });

app.post("/", (req, res) => {
  return res.status(200).send("Hello World");
});

/**database and server init */

const mongoose = require("mongoose");
const internal = require("stream");
const db = mongoose;

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

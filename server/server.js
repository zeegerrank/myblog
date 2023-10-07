require("dotenv").config();const express = require("express");
const app = express();
const Role = require("./models/Role.model");

/**express middleware config */

/**express middleware init*/
app.use(express.json());

/**third party middleware import*/
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

/**third party middleware config */
const devLogStream = fs.createWriteStream("development.log", {
  interval: "1d" /*rotate daily */,
  path: path.join(__dirname, "log"),
});

/**third party middleware init*/
app.use(cors());
app.use(logger("dev", { stream: devLogStream }));

//**routes */
app.post("/", (req, res) => {
  return res.status(200).send("Hello World");
});
const authRoutes = require("./routers/authRoutes");
app.use("/auth", authRoutes);

const userRoutes = require("./routers/userRoutes");
app.use("/user", userRoutes);

/**database and server init */

const mongoose = require("mongoose");
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

  /**init roles function */
  const rolesInit = async (roles) => {
    for (let i = 0; roles.length > i; i++) {
      const exitsRole = await Role.findOne({ name: roles[i] });
      if (exitsRole) {
        console.log(`${roles[i]} is already exits`);
      } else {
        await Role.create({ name: roles[i] });
        console.log(`${roles[i]} is created`);
      }
    }
    return console.log("Roles model is successfully initiated");
  };

  /**roles init */
  const insertRoles = ["user", "moderator", "admin"];
  rolesInit(insertRoles);
});
db.connection.on("error", (err) => {
  console.log("db connect error: ", err);
});

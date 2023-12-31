require("dotenv").config();
const express = require("express");
const app = express();
const Role = require("./models/Role.model");

/**express middleware config */

/**express middleware init*/
app.use(express.json());

/**third party middleware import*/
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const rfs = require("rotating-file-stream");
const path = require("path");

/**third party middleware config */
const devLogStream = rfs.createStream("development.log", {
  interval: "1d" /*rotate daily */,
  path: path.join(__dirname, "log"),
});

/**third party middleware init*/
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(logger("dev"));
app.use(logger("combined", { stream: devLogStream }));

/**set headers */
const Client = "http://localhost:3000";
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", Client);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//**routes */
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});
const authRoutes = require("./routers/api/auth.routes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routers/api/user.routes");
app.use("/api/user", userRoutes);

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

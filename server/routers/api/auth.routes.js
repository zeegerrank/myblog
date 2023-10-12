const express = require("express");const router = express.Router();

const User = require("../../models/User.model");
const Role = require("../../models/Role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkRoles = require("../../middlewares/checkRoles");

const JWT_SECRET = process.env.JWT_SECRET;

//**register */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = 12;
  const hashedPassword = await bcrypt.hashSync(password, salt);
  const defaultRole = await Role.findOne({ name: "user" });
  const newUser = new User({
    username,
    password: hashedPassword,
    roles: [defaultRole._id],
  });

  newUser.save();
  return res.status(200).send({
    message: "Register succeeded",
    newUser,
    defaultRole,
  });
});

//**login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  /**check user existence */
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  /**check valid password */
  const validPassword = await bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Password invalid" });
  }
  const { _id, roles } = user;

  /**create accessToken and set on cookies */
  const accessToken = await jwt.sign({ _id, roles }, JWT_SECRET, {
    expiresIn: "5m",
  });
  res.cookie("accessToken", accessToken);

  /**create refreshToken and set on cookies, db */
  const refreshToken = await jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("refreshToken", refreshToken);
  await user.updateOne({ refreshToken });

  return res
    .status(200)
    .send({ message: "Login succeeded", accessToken, refreshToken });
});

//**refresh */
router.post("/refresh", async (req, res) => {
  console.log("🚀 -> req.cookies:", req.cookies);
  const { refreshToken } = req.cookies;

  const decoded = await jwt.verify(refreshToken, JWT_SECRET);
  if (!decoded) {
    return res.status(400).send({ message: "Invalid token" });
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  /**detect re-used refreshToken */

  console.log("🚀 -> user.refreshToken:", user.refreshToken);
  if (user.refreshToken !== refreshToken) {
    await user.updateOne({ refreshToken: null });
    return res.status(400).send({ message: "Re-used token detected" });
  }

  const { _id, roles } = user;

  /**create accessToken and set on cookies */
  const accessToken = await jwt.sign({ _id, roles }, JWT_SECRET, {
    expiresIn: "5m",
  });
  res.cookie("accessToken", accessToken);

  /**create refreshToken and update on cookies, db */
  const newRefreshToken = await jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("refreshToken", newRefreshToken);
  await user.updateOne({ refreshToken: newRefreshToken });
  return res
    .status(200)
    .send({ message: "Refresh token sent", newRefreshToken });
});

//**logout */
router.post("/logout", async (req, res) => {
  const { accessToken } = req.cookies;
  const decoded = await jwt.verify(accessToken, JWT_SECRET);
  if (!decoded) {
    return res.status(400).send({ message: "Invalid token" });
  }
  const user = await User.findById({ _id: decoded._id });
  await user.updateOne({ refreshToken: null });

  const updatedUser = await User.findById({ _id: decoded._id });
  const result = updatedUser.refreshToken;
  return res.status(200).send({ result });
});

module.exports = router;

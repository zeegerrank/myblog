/**admin only */ const express = require("express");const router = express.Router();
const User = require("../models/User.model");

/**list all users */
router.post("/list", async (req, res) => {
  /**add middleware to check role */
  let listUsers = [];
  for (let i = 0; (await User.countDocuments()) > i; i++) {
    listUsers.push(User[i]);
  }
  return res.status(200).send({ message: "Get users list", listUsers });
});

/**delete user */
router.post("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  const deletedUserName = await User.findById(userId).get({ username });
  await User.findByIdAndRemove(userId);
  return res.status(200).send({ message: "User deleted", deletedUserName });
});

/**update user role */
router.post("/update-role/:userId", async (req, res) => {
  const { userId } = req.params;
});

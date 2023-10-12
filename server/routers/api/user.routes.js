const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Role = require("../../models/Role.model");
/**check admin middleware */
const checkRoles = require("../../middlewares/checkRoles");

//**list all users */
router.post("/list", checkRoles(["admin", "moderator"]), async (req, res) => {
  /**add middleware to check role */
  let listUsers = await User.find().skip();
  return res.status(200).send({ message: "Get users list", listUsers });
});

//**delete user */
router.delete("/delete/:userId", checkRoles(["admin"]), async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await User.findById(userId);
  await User.findByIdAndRemove(userId);
  return res.status(200).send({ message: "User deleted", deletedUser });
});

//**update user role */
router.put("/update-role/:userId", checkRoles(["admin"]), async (req, res) => {
  const { userId } = req.params;

  const { changeRole } = req.body;
  let modRoles = [];
  for (let i = 0; changeRole.length > i; i++) {
    const exitsRole = await Role.findOne({ name: changeRole[i] });
    modRoles.push(exitsRole._id);
  }
  const updatedUser = await User.findByIdAndUpdate(userId, {
    roles: modRoles,
  });
  return res
    .status(200)
    .send({ message: "User updated succeeded", updatedUser, modRoles });
});

module.exports = router;

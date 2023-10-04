const User = require("../models/User.model");const bcrypt = require("bcrypt");

//**register */
const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = 12;
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  newUser.save();
  return res.status(200).send({ message: "Register succeeded", newUser });
};

//**login */
const login = async (req, res) => {
  const { username, password } = req.body;
  /**check user existence */
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  /**check valid password */
  const validPassword = bcrypt.compareSync(password, user.get(password));
  if (!validPassword) {
    return res.status(400).send({ message: "Password invalid" });
  }

  return res.status(200).send({ message: "Login succeeded" });
};

//**logout */
/**use with refreshtoken */

//**refresh */
/**use with refreshtoken */

//**mod role */

const userController = { register, login };
module.exports = userController;

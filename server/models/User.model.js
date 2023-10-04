const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    roles: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Role" }],
    refreshToken: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "RefreshToken" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

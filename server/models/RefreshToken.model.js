const mongoose = require("mongoose");const RefreshTokenSchema = new mongoose.Schema(
  {
    token: String,
    expiresDate: Date,
  },
  { timestamps: true }
);

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;

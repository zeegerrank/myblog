const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

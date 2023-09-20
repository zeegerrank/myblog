const mongoose = require("mongoose");const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    title: String,
    content: String,
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = POST;

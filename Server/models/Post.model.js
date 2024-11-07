// model for storing the post information.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    like_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

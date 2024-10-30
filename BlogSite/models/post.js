const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
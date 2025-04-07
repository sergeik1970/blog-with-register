const mongoose = require("mongoose");
const { create } = require("./UserModel");

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    file: String,
    email: String,
    username: String,
    createdAt: { type: Date, default: Date.now }
})

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;
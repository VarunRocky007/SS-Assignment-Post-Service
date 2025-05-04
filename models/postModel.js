const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "This is a required field"],
    },
    description: {
        type: String,
        required: [true, "This is a required field"],
    },
    imageId: {
        type: String,
        required: [true, "This is a required field"],
    },
    owner: {
        type: String,
        required: [true, "Owner is required"],
    },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

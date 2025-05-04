const catchAsync = require("../utils/catchAsync");
const Post = require("../models/postModel");

exports.addPost = catchAsync(async (req, res, next) => {
    const {title, description, imageId} = req.body;
    const owner = req.user.userId;

    if (!title || !description || !imageId) {
        return res.status(400).json({
            status: 'fail',
            message: 'All fields (title, description, imageId) are required'
        });
    }

    const newPost = await Post.create({
        title,
        description,
        imageId,
        owner
    });

    res.status(201).json({
        status: 'success',
        data: {
            post: newPost
        }
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, imageId } = req.body;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post not found'
        });
    }

    if(post.owner !== req.user.userId) {
        return res.status(403).json({
            status: 'fail',
            message: 'You are not authorized to update this post'
        });
    }

    if (title) post.title = title;
    if (description) post.description = description;
    if (imageId) post.imageId = imageId;

    await post.save();

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
});

exports.getPostById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post not found'
        });
    }

    if(post.owner !== req.user.userId) {
        return res.status(403).json({
            status: 'fail',
            message: 'You are not authorized to delete this post'
        });
    }

    await post.delete();

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.deleteAllPostsOfUser = catchAsync(async (req, res, next) => {
    const userId = req.user.userId;

    await Post.deleteMany({ owner: userId });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getAllPostsOfUser = catchAsync(async (req, res, next) => {
    const userId = req.user.userId;

    const posts = await Post.find({ owner: userId });

    res.status(200).json({
        status: 'success',
        data: {
            posts
        }
    });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find();

    res.status(200).json({
        status: 'success',
        data: {
            posts
        }
    });
});

const { authenticateToken } = require('../middleware/authMiddleware');
const express = require('express');

const {
    addPost,
    updatePost,
    getPostById,
    deletePost,
    deleteAllPostsOfUser,
    getAllPostsOfUser,
    getAllPosts
} = require('../controllers/postController');

const router = express.Router();

// Middleware to authenticate the user
router.use(authenticateToken);
// Route to add a new post
router.post('/', addPost);
// Route to update a post by ID
router.put('/:id', updatePost);
// Route to get a post by ID
router.get('/:id', getPostById);
// Route to delete a post by ID
router.delete('/:id', deletePost);
// Route to delete all posts of the authenticated user
router.delete('/all', deleteAllPostsOfUser);
// Route to get all posts of the authenticated user
router.get('/all', getAllPostsOfUser);
// Route to get all posts
router.get('/', getAllPosts);
// Export the router

module.exports = router;

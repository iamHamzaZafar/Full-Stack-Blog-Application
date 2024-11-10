const express = require('express')
const router = express.Router() ;
const isAuthenticated = require('../middleware/auth.Middleware')
const {createPost} = require('../controllers/postController')
const upload = require('../middleware/multer.Middleware')
const isPostOwner = require('../middleware/isPostOwner.Middleware')
const {deletePost, editPost} = require('../controllers/postController')


// create-the post
router.post('/create-post' , isAuthenticated, upload.single('image') , createPost ) ;
//delete the post.
router.delete('/delete-post/:id' , isAuthenticated , isPostOwner ,deletePost )
// edit the post route
router.patch('.edit-post/:id' , isAuthenticated , isPostOwner , editPost)



module.exports = router ;
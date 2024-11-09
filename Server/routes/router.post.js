const express = require('express')
const router = express.Router() ;
const isAuthenticated = require('../middleware/auth.Middleware')
const createPost = require('../controllers/postController')
const upload = require('../middleware/multer.Middleware')



router.post('/create-post' , isAuthenticated, upload.single('image') , createPost ) ;


module.exports = router ;
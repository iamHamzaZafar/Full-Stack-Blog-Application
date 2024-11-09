const express = require('express')
const router = express.Router() ;
const isAuthenticated = require('../middleware/auth.Middleware')
const createPost = require('../controllers/postController')



router.post('/create-post' , isAuthenticated , createPost  ) ;


module.exports = router ;
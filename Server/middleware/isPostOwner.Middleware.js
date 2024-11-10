const Post = require("../models/Post.model");

const isPostOwner = async (req, res, next) => {
  const postId = req.params.id;
  try {
    // find the post in the data base.
    const post = await Post.findById(postId);
    console.log("post data is", post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("userid inside post:" , post.user_id , req.user.userId) ;
    if(post.user_id != req.user.userId){
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    next();
    // Check if the authenticated user is the creator of the post or an admin
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  
};

module.exports = isPostOwner;

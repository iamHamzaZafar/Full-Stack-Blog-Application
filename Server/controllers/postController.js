const Post = require('../models/Post.model')
const uploadOnCloudinary = require('../utils/cloudinary.config');

const createPost = async (req , res ) =>{
    const { title, description, details } = req.body;

    // Check if all required fields are present
    if (!title || !description || !details || !req.file) {
      return res.status(400).json({ message: "All fields are required, including the image file." });
    }
    
    try {
      // Upload image to Cloudinary
      const imageUploadResponse = await uploadOnCloudinary(req.file.path);
    
      if (!imageUploadResponse) {
        // Handle case if image upload fails
        return res.status(500).json({ message: "Image upload failed." });
      }
    
      // Extract image URL from the response
      const imageUrl = imageUploadResponse.url;
    
      // Proceed to create the post in your database (example only)
      const newPost = await Post.create({
        title,
        description,
        details,
        image: imageUrl,
        user_id: req.user.userId, // Assuming the user ID is added by the auth middleware
      });
    
      // Send success response
      res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      // Handle unexpected errors
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
}



module.exports = createPost ;
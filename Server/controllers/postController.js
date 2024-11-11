const Post = require("../models/Post.model");
const fs = require('fs');
const { uploadOnCloudinary } = require("../utils/cloudinary.config");
const { deleteFromCloudinary } = require("../utils/cloudinary.config");

// controller for post creation
const createPost = async (req, res) => {
  const { title, description, details } = req.body;

  // Check if all required fields are present
  if (!title || !description || !details || !req.file) {
    return res
      .status(400)
      .json({ message: "All fields are required, including the image file." });
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
    const imagePublicId = imageUploadResponse.public_id;
    console.log("Image public id is:", imagePublicId);
    console.log("cloudinary res", imageUploadResponse);

    // Proceed to create the post in your database
    const newPost = await Post.create({
      title,
      description,
      details,
      image: imageUrl,
      imageId: imagePublicId,
      user_id: req.user.userId, // Assuming the user ID is added by the auth middleware
    });

    // Send success response
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// controller for the post deletion
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    // if the post is not found.
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // post found two steps 1- delete from cloudinary 2- delete from the database
    // step #1 - delete image from the cloudinary.
    await deleteFromCloudinary(post.imageId);
    // step#2 delete the post from the database.
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
  res.status(200).json({ message: "Post deletion successfull" });
};




// controller to edit the post.
const editPost = async (req, res) => {
  console.log("Req received");
  const { title, description, details } = req.body;
  const postId = req.params.id;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Handle new image upload if there's a new file
    if (req.file) {
      // Delete the old image from Cloudinary
      if (post.imageId) {
        await deleteFromCloudinary(post.imageId);
      }

      // Upload new image to Cloudinary
      const uploadResponse = await uploadOnCloudinary(req.file.path);
      if (!uploadResponse) {
        return res.status(500).json({ message: "Image upload failed." });
      }

      // Update image URL and public ID in post
      post.image = uploadResponse.secure_url;
      post.imageId = uploadResponse.public_id;

      // Delete the local file after uploading
     
    }

    // Update other fields
    post.title = title || post.title;
    post.description = description || post.description;
    post.details = details || post.details;

    // Save the updated post to the database
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ message: "Error editing post", error: error.message });
  }
};






// controller to fetch all the posts from the db.
const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log("Post are", posts);
    // if the posts are empty.
    if (!posts) {
      return res
        .status(404)
        .json({ message: "No post found in the data base" });
    }
    // posts found return the responce.
    return res.status(200).json({ message: "success", postsData: posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createPost, deletePost, editPost, fetchPosts };

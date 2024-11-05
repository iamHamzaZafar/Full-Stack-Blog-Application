import React from "react";
import './Post.css';

const Post = () => {
  return (
    <div className="post-wrapper">
      <div className="post-container">
        <div className="post-image">
          {/* Left side image placeholder */}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dVbLMzlaeJnL5C6RpZ8HLRECJhH6ILEGKg&s" alt="Post" />
        </div>
        <div className="post-content">
          <h1 className="post-title">Lorem ipsum dolor sit amet.</h1>
          <div className="post-meta">
            <span className="post-author">Author</span>
            <span className="post-date">Date of the post</span>
          </div>
          <p className="post-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque minus placeat necessitatibus minima architecto in dolorem! Esse sed earum neque!</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

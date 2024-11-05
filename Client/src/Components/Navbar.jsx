import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <Link to='/'><h1>MyBlog</h1></Link>
      <nav className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
};

export default Navbar;

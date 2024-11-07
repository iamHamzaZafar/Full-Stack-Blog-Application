const User = require("../models/User.model");
const bcrypt = require('bcrypt')

//signup controller function.
async function signup(req, res) {
    const { username, password } = req.body;
    console.log(req.body);
  
    // Check if both fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" }); // 400 Bad Request is more appropriate for missing fields
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          message: "User already exists. Please choose a different username.",
        });
      }
  
      // Check if the password length is too short
      if (password.length < 8) {
        return res.status(400).json({
          message: "Password length is too short. Minimum length is 8 characters.",
        });
      }
  
      // Encrypt the password.
      const hashedPassword = await bcrypt.hash(password,10);
      console.log("hashedPassword" , hashedPassword) ;
      // Proceed with saving the new user (assumes you have user creation logic here)
      const newUser = new User({ username, password:hashedPassword });  // You may want to hash the password before saving
      await newUser.save();
  
      // Respond with success
      return res.status(201).json({
        message: "Account created successfully",
      });
    } catch (error) {
      console.error(error);  
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

function login(req, res) {}

module.exports = { signup, login };

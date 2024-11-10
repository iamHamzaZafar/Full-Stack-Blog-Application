const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        message:
          "Password length is too short. Minimum length is 8 characters.",
      });
    }

    // Encrypt the password.
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    // Proceed with saving the new user (assumes you have user creation logic here)
    const newUser = new User({ username, password: hashedPassword }); // You may want to hash the password before saving
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

async function login(req, res) {
  const { username, password } = req.body;

  // Check if both fields are provided
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" }); // 400 Bad Request is more appropriate for missing fields
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // compare the password if the user is found
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // create a token and send the responce.
    const token = await jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token
    return res.status(200).json({
      message: "Login successful",
      token, // Send the token back to the client
    });
  } catch (error) {
    console.error(error.message); // Optional: log the error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { signup, login };

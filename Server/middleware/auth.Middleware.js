const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  // token is provided now verify the token.
  try {
    const decode =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = isAuthenticated;

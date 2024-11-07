const dotenv = require("dotenv");
const app = require("./app");
const connectToDb = require("./connect");

dotenv.config();
// Set the port
const port = process.env.PORT || 3000;

// DataBase connection
connectToDb().then(() => {
  console.log("Database connection successfull!!!");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

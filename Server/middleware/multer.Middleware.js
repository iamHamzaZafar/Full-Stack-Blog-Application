const multer = require("multer");
const path = require("path");

// Configure Multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public")); // Set a correct relative path for upload directory
  },
  filename: function (req, file, cb) {
    console.log("file is", file);
    cb(null, `${Date.now()}-${file.originalname}`); // Adding timestamp to filename to avoid duplicates
  },
});

// Export Multer upload middleware
const upload = multer({ storage: storage });
module.exports = upload;

const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 5000;

// Define the storage for uploaded images
const storage = multer.diskStorage({
  destination: "./upload_images", // Upload to the "upload_images" folder in the project root
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Serve static files (uploaded images)
app.use(express.static("upload_images"));

// Handle POST requests to "/upload"
app.post("/upload", upload.array("image", 10), (req, res) => {
  res.json({ message: "Images uploaded successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

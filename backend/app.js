require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

// Configure CORS for development and production
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://yourplaces.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Use built-in JSON parser (no need for body-parser)
app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

// Routes
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// Handle unsupported routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// Global error handler
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  // Handle Multer errors
  if (error.code === "LIMIT_FILE_SIZE") {
    return res
      .status(413)
      .json({ message: "File too large. Maximum size is 1MB." });
  }
  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ message: "Unexpected file field." });
  }
  if (error.message === "Invalid mime type!") {
    return res
      .status(400)
      .json({
        message: "Invalid file type. Only PNG, JPEG, and JPG are allowed.",
      });
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occurred!" });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is required");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

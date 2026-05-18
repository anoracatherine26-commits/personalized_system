const express = require("express");
const path = require("path");

const app = express();

// 🌍 Render provides this automatically
const PORT = process.env.PORT || 10000;

// 📁 Frontend folder (make sure you have /public)
const publicDir = path.join(__dirname, "public");

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (HTML, CSS, JS)
app.use(express.static(publicDir));

// ========================
// ROUTES
// ========================

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(publicDir, "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(publicDir, "admin.html"));
});

// Example API route (you can delete or modify this)
app.get("/api", (req, res) => {
  res.json({
    message: "Personalized Grocery AI System API is running 🚀"
  });
});

// ========================
// FALLBACK ROUTE (IMPORTANT FOR FRONTEND ROUTING)
// ========================
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// ========================
// START SERVER (RENDER SAFE)
// ========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

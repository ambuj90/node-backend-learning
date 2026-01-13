const express = require("express");
const app = express();

app.use(express.json());

// Routes
const fileRoutes = require("./routes/fileRoutes");
app.use("/files", fileRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Mini File Manager API Running");
});

// 🔥 GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.name || "Error",
    message: err.message || "Something went wrong",
    field: err.field || null,
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

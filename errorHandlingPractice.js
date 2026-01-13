const fs = require("fs");

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

// Error-first callback example
function readConfigFile(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return callback(new Error("Config file not found"));
      }
      return callback(err);
    }

    try {
      const config = JSON.parse(data);
      callback(null, config);
    } catch {
      callback(new Error("Invalid JSON format"));
    }
  });
}

// Test
readConfigFile("config.json", (err, config) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Config:", config);
});

// • Express error middleware
// • Database connection handling
// • File upload systems
// • Payment gateways
// • Background workers

// • Errors are normal
// • Crashes are not
// • Catch early, handle clearly
// • Translate system errors for users
// • Use global handlers only as backup

// Error handling is not about avoiding errors, it’s about controlling failure so your application stays stable, debuggable, and safe in production.

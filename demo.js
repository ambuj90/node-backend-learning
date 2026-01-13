// let http = require("http");

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello World!");
//   })
//   .listen(8080, () => {
//     console.log("Server running on http://localhost:8080");
//   });

// const os = require("os");
// console.log(os.platform());

const express = require("express");
const os = require("os");

const app = express();

app.get("/", (req, res) => {
  const platform = os.platform();
  res.send("Hello World\nOS Platform: " + platform);
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

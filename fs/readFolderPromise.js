const fs = require("fs");
const path = require("path");

const folderPath = path.join("E:", "learn node", "backend-project", "fs");

fs.promises
  .readdir(folderPath)
  .then((files) => {
    console.log("Files in folder:");
    console.log(files);
  })
  .catch((error) => {
    console.error("Error reading folder:", error);
  });

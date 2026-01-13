const fs = require("fs");
const path = require("path");

const folderPath = path.join("E:", "learn node", "backend-project", "fs");

const readFolder = async () => {
  try {
    const files = await fs.promises.readdir(folderPath);
    console.log("Files in folder:");
    console.log(files);
  } catch (error) {
    console.error("Error reading folder:", error);
  }
};

readFolder();

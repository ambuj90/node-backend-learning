const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

fs.writeFile(filePath, "Hello from Node")
  .then(() => {
    console.log("File created");
    return fs.readFile(filePath, "utf8");
  })
  .then((data) => {
    console.log("File content:", data);
    return fs.writeFile(filePath, "This is updated data", "utf8");
  })
  .then(() => {
    console.log("File updated");
    return fs.appendFile(filePath, "\nMore data added", "utf8");
  })
  .then(() => {
    console.log("Data appended");
    return fs.readFile(filePath, "utf8");
  })
  .then((data) => {
    console.log("Final content:", data);
    return fs.unlink(filePath);
  })
  .then(() => {
    console.log("File deleted");
  })
  .catch((err) => {
    console.error(err);
  });

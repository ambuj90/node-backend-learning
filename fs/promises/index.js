const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

//CREATE. Write file
fs.writeFile(filePath, "Hello from Node")
  .then(() => {
    console.log("File created");
  })
  .catch((err) => {
    console.error(err);
  });

//READ. Read file
fs.readFile(filePath, "utf8")
  .then((data) => {
    console.log("File content:", data);
  })
  .catch((err) => {
    console.error(err);
  });

//UPDATE. Replace content
fs.writeFile(filePath, "This is updated data", "utf8")
  .then(() => {
    console.log("File updated");
  })
  .catch((err) => {
    console.error(err);
  });

//
//UPDATE. Append conten
fs.appendFile(filePath, "\nMore data added", "utf8")
  .then(() => {
    console.log("Data appended");
  })
  .catch((err) => {
    console.error(err);
  });

//DELETE. Remove file

fs.unlink(filePath)
  .then(() => {
    console.log("File deleted");
  })
  .catch((err) => {
    console.error(err);
  });

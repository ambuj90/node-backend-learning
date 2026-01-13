const fs = require("fs");
const path = require("path");

const baseDir = "E:\\learn node\\fs\\callbacks";
const dataDir = path.join(baseDir, "data");
const filePath = path.join(dataDir, "sample.txt");

// CREATE folder
fs.mkdir(dataDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Folder created");

  // CREATE file
  fs.writeFile(filePath, "Hello from Node FS", "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File created");

    // READ file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File content:", data);

      // UPDATE file
      fs.writeFile(filePath, "This is updated data", "utf8", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File updated");

        // APPEND file
        fs.appendFile(filePath, "\nMore data added", "utf8", (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Data appended");

          // READ again
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Updated content:", data);

            // DELETE file
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("File deleted");
            });
          });
        });
      });
    });
  });
});

const fs = require("fs");

fs.writeFile("data.txt", "Hello Backend", "utf8", (err) => {
  if (err) throw err;
  console.log("File written");
});

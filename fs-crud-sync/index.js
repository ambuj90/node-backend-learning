const fs = require("fs");

// CREATE
fs.writeFileSync("user.txt", "User: Ambuj Sharma");

// READ
let data = fs.readFileSync("user.txt", "utf8");
console.log(data);

// UPDATE
fs.appendFileSync("user.txt", "\nRole: Developer");

// READ AGAIN
data = fs.readFileSync("user.txt", "utf8");
console.log(data);

// RENAME
fs.renameSync("user.txt", "profile.txt");

// DELETE
// fs.unlinkSync("profile.txt");

// console.log("CRUD completed");

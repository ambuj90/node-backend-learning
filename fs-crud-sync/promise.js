const fs = require("fs/promises");

async function fileCRUD() {
  try {
    // CREATE
    await fs.writeFile("user.txt", "Name: Ambuj Sharma");
    console.log("Created");

    // READ
    let data = await fs.readFile("user.txt", "utf8");
    console.log(data);

    // UPDATE
    await fs.appendFile("user.txt", "\nRole: Developer");

    // READ AGAIN
    data = await fs.readFile("user.txt", "utf8");
    console.log(data);

    // RENAME
    await fs.rename("user.txt", "profile.txt");

    // DELETE
    await fs.unlink("profile.txt");

    console.log("CRUD completed");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

fileCRUD();

const fs = require("fs/promises");
const path = require("path");

const baseDir = "E:\\learn node\\fs";
const dataDir = path.join(baseDir, "data");
const filePath = path.join(dataDir, "sample.txt");

async function createFolder() {
  await fs.mkdir(dataDir, { recursive: true });
  console.log("Folder created");
}

async function createFile() {
  await fs.writeFile(filePath, "Hello from Node FS");
  console.log("File created");
}

async function readFile() {
  const data = await fs.readFile(filePath, "utf8");
  console.log("File content:", data);
}

async function updateFile() {
  await fs.writeFile(filePath, "This is the Updated Data", "utf8");
  console.log("File updated");
}

async function appendFile() {
  await fs.appendFile(filePath, "\nMore data added", "utf8");
  console.log("Data appended");
}

// async function deleteFile() {
//   await fs.unlink(filePath);
//   console.log("File deleted");
// }

async function run() {
  await createFolder();
  await createFile();
  await readFile();
  await updateFile();
  await appendFile();
  await readFile();
  //   await deleteFile();
}

run();

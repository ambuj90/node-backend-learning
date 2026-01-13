const express = require("express");
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const router = express.Router();

const BASE_DIR = path.join(__dirname, "..", "fs", "files");

// LIST files
router.get("/list", async (req, res) => {
  try {
    const files = await fs.readdir(BASE_DIR);
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPLOAD file with size limit (STREAM)
router.post("/upload", (req, res) => {
  const fileName = req.headers["file-name"];

  if (!fileName) {
    return res.status(400).json({ error: "file-name header missing" });
  }

  // Prevent path traversal
  if (fileName.includes("..") || fileName.includes("/")) {
    return res.status(400).json({ error: "Invalid file name" });
  }

  const filePath = path.join(BASE_DIR, fileName);
  const writeStream = fsSync.createWriteStream(filePath);

  let uploadedSize = 0;
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  let blocked = false;

  req.on("data", (chunk) => {
    if (blocked) return;

    uploadedSize += chunk.length;

    if (uploadedSize > MAX_SIZE) {
      blocked = true;
      writeStream.destroy();
      req.destroy();

      return res.status(413).json({ error: "File too large" });
    }
  });

  req.pipe(writeStream);

  writeStream.on("finish", () => {
    if (!blocked) {
      res.json({ message: "File uploaded successfully" });
    }
  });

  writeStream.on("error", (err) => {
    if (!blocked) {
      res.status(500).json({ error: err.message });
    }
  });
});

// CREATE folder
router.post("/folder/create", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Folder name required" });
    }

    if (name.includes("..") || name.includes("/")) {
      return res.status(400).json({ error: "Invalid folder name" });
    }

    const folderPath = path.join(BASE_DIR, name);
    await fs.mkdir(folderPath);

    res.json({ message: "Folder created" });
  } catch (err) {
    if (err.code === "EEXIST") {
      return res.status(409).json({ error: "Folder already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});

// RENAME folder
router.put("/folder/rename", async (req, res) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      return res
        .status(400)
        .json({ error: "Both oldName and newName required" });
    }

    if (
      oldName.includes("..") ||
      oldName.includes("/") ||
      newName.includes("..") ||
      newName.includes("/")
    ) {
      return res.status(400).json({ error: "Invalid folder name" });
    }

    const oldPath = path.join(BASE_DIR, oldName);
    const newPath = path.join(BASE_DIR, newName);

    await fs.rename(oldPath, newPath);

    res.json({ message: "Folder renamed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE folder
router.delete("/folder/delete/:name", async (req, res) => {
  try {
    const name = req.params.name;

    if (name.includes("..") || name.includes("/")) {
      return res.status(400).json({ error: "Invalid folder name" });
    }

    const folderPath = path.join(BASE_DIR, name);

    // recursive + force = safe delete
    await fs.rm(folderPath, { recursive: true, force: true });

    res.json({ message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

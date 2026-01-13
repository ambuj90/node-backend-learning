const express = require("express");
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const router = express.Router();

const {
  ValidationError,
  NotFoundError,
  FileSizeError,
} = require("../errors/customErrors");

const BASE_DIR = path.join(__dirname, "..", "fs", "files");

const { addUser, getUsers } = require("../services/userService");

// LIST files
router.get("/list", async (req, res, next) => {
  try {
    const files = await fs.readdir(BASE_DIR);
    res.json({ files });
  } catch (err) {
    next(err);
  }
});

// UPLOAD file (STREAM + custom errors)
router.post("/upload", (req, res, next) => {
  try {
    const fileName = req.headers["file-name"];

    if (!fileName) {
      throw new ValidationError("file-name header is required", "file-name");
    }

    if (fileName.includes("..") || fileName.includes("/")) {
      throw new ValidationError("Invalid file name", "file-name");
    }

    const filePath = path.join(BASE_DIR, fileName);
    const writeStream = fsSync.createWriteStream(filePath);

    let uploadedSize = 0;
    const MAX_SIZE = 5 * 1024 * 1024;

    req.on("data", (chunk) => {
      uploadedSize += chunk.length;

      if (uploadedSize > MAX_SIZE) {
        writeStream.destroy();
        req.destroy();
        next(new FileSizeError());
      }
    });

    req.pipe(writeStream);

    writeStream.on("finish", () => {
      res.json({ message: "File uploaded successfully" });
    });

    writeStream.on("error", (err) => {
      next(err);
    });
  } catch (err) {
    next(err);
  }
});

// CREATE folder
router.post("/folder/create", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ValidationError("Folder name required", "name");
    }

    if (name.includes("..") || name.includes("/")) {
      throw new ValidationError("Invalid folder name", "name");
    }

    const folderPath = path.join(BASE_DIR, name);
    await fs.mkdir(folderPath);

    res.json({ message: "Folder created" });
  } catch (err) {
    if (err.code === "EEXIST") {
      return next(new ValidationError("Folder already exists", "name"));
    }
    next(err);
  }
});

// RENAME folder
router.put("/folder/rename", async (req, res, next) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
      throw new ValidationError("Both oldName and newName are required");
    }

    if (
      oldName.includes("..") ||
      oldName.includes("/") ||
      newName.includes("..") ||
      newName.includes("/")
    ) {
      throw new ValidationError("Invalid folder name");
    }

    const oldPath = path.join(BASE_DIR, oldName);
    const newPath = path.join(BASE_DIR, newName);

    await fs.rename(oldPath, newPath);

    res.json({ message: "Folder renamed" });
  } catch (err) {
    next(err);
  }
});

// DELETE folder
router.delete("/folder/delete/:name", async (req, res, next) => {
  try {
    const name = req.params.name;

    if (name.includes("..") || name.includes("/")) {
      throw new ValidationError("Invalid folder name", "name");
    }

    const folderPath = path.join(BASE_DIR, name);
    await fs.rm(folderPath, { recursive: true, force: true });

    res.json({ message: "Folder deleted" });
  } catch (err) {
    next(err);
  }
});
router.post("/users", (req, res, next) => {
  try {
    const user = req.body;

    if (!user || !user.name) {
      throw new ValidationError("User name is required", "name");
    }

    addUser(user);
    res.json(getUsers());
  } catch (err) {
    next(err);
  }
});

module.exports = router;

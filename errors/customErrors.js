class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class FileSizeError extends Error {
  constructor(message = "File too large") {
    super(message);
    this.name = "FileSizeError";
    this.statusCode = 413;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  FileSizeError,
};

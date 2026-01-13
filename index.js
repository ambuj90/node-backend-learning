const http = require("http");

http
  .createServer((req, res) => {
    const time = new Date().toISOString();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Server Time</h1><p>${time}</p>`);
  })
  .listen(3000);

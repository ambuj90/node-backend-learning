const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    // Variables and functions
    const name = "Ambuj";
    const version = 20;

    function greet(user) {
      return `Hello ${user}!`;
    }

    const add = (a, b) => a + b;
    const sum = add(5, 8);
    const greeting = greet("Ambuj Sharma");

    const user = {
      name: "Ambuj",
      age: 32,
      greet() {
        return `Hi, I'm ${this.name}`;
      },
    };

    // Arrays
    const colors = ["red", "green", "blue", "pink"];
    const colorList = colors.map((c) => `<li>${c}</li>`).join("");
    const colorLengths = colors.map((c) => c.length).join(", ");

    // 1. Callback
    function fetchData(callback) {
      setTimeout(() => {
        callback("Data received via Callback");
      }, 1000);
    }

    // 2. Promise
    const fetchDataPromise = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data received via Promise");
        }, 1000);
      });
    };

    // Execute async flow
    fetchData((callbackData) => {
      fetchDataPromise()
        .then((promiseData) => {
          return Promise.resolve("Data received via Async/Await").then(
            (asyncData) => {
              // Send response AFTER async work completes
              res.end(`
              <h1>Hello World</h1>

              <h2>Basic Values</h2>
              <p>Name: ${name}</p>
              <p>Version: ${version}</p>

              <h2>Functions</h2>
              <p>Add Result: ${sum}</p>
              <p>Greeting: ${greeting}</p>

              <h2>Object</h2>
              <p>User Name: ${user.name}</p>
              <p>User Age: ${user.age}</p>
              <p>User Greet: ${user.greet()}</p>

              <h2>Array</h2>
              <ul>${colorList}</ul>

              <h2>Array Map Result</h2>
              <p>Color Lengths: ${colorLengths}</p>

              <h2>Async Examples</h2>
              <p>${callbackData}</p>
              <p>${promiseData}</p>
              <p>${asyncData}</p>
            `);
            }
          );
        })
        .catch((err) => {
          res.end(`<p>Error: ${err.message}</p>`);
        });
    });
  })
  .listen(8080, () => {
    console.log("Server running at http://localhost:8080");
  });

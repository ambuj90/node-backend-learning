const EventEmitter = require("events");

// Create emitter instance
const emitter = new EventEmitter();

// Listen to event
emitter.on("greet", (data) => {
  console.log(`Hello ${data.username}, You are a ${data.prof}`);
});

// Emit event
emitter.emit("greet", {
  username: "Ambuj Sharma",
  prof: "Full Stack Dev",
});

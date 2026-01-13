const os = require("os");

console.log(os.platform());

console.log(os.arch());

const cpus = os.cpus();

console.log(cpus.length);
console.log(cpus[0].model);

console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());

const toGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2);

console.log("Total:", toGB(os.totalmem()), "GB");
console.log("Free:", toGB(os.freemem()), "GB");

console.log("Uptime (seconds):", os.uptime());

console.log(os.userInfo());

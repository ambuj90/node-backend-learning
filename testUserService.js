const { addUser, getUsers } = require("./services/userService");

addUser({ name: "Test User", age: 25 });
addUser({ name: "Another User", age: 30 });

console.log(getUsers());

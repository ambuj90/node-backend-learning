// CALLBACK VERSION

// • getUser takes a callback function
// • After 1 second, it calls the callback
// • First argument is error
// • Second argument is data

// This is the Node.js error-first callback convention.
function getUser(userId, callback) {
  setTimeout(() => {
    callback(null, { id: userId, name: "Ambuj" });
  }, 1000);
}

function getUserPosts(user, callback) {
  setTimeout(() => {
    callback(null, ["Post 1", "Post 2"]);
  }, 1000);
}

// PROMISE VERSION

// “I promise I will give you a value later.”
// • Function returns a Promise immediately
// • Promise resolves later
// • You chain .then()

function getUserPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "Ambuj" });
    }, 1000);
  });
}

function getUserPostsPromise(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2"]);
    }, 1000);
  });
}

// ASYNC / AWAIT VERSION

// Async/await is built on Promises, not a replacement.
// • Pause this function
// • Let event loop continue
// • Resume when Promise resolves

// Thread is never blocked.

async function getUserAndPosts() {
  try {
    const user = await getUserPromise(1);
    console.log("User:", user);

    const posts = await getUserPostsPromise(user);
    console.log("Posts:", posts);
  } catch (error) {
    console.error(error);
  }
}

// Why async/await is superior

// • Reads top to bottom
// • Looks synchronous
// • Uses normal try/catch
// • Easier debugging
// • Cleaner error handling

// This is why all modern Node.js backends use async/await.

// RUN
getUser(1, (err, user) => {
  if (!err) {
    console.log("Callback User:", user);
  }
});

getUserPromise(1).then((user) => console.log("Promise User:", user));

getUserAndPosts();

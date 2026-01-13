// asyncTryCatch.js

async function fetchUserData() {
  //     • async tells JavaScript this function will run asynchronous code
  // • This function will always return a Promise, even if you return normal data
  try {
    console.log("Fetching user data...");
    // • fetch() sends an HTTP request
    // • await pauses only this function, not the whole program
    // • Event loop remains free
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    //     • fetch does NOT throw errors for HTTP 404 / 500
    // • It only throws on network failure
    // • So we manually check status
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    //     • Converting response stream into JSON
    // • This is also async
    // • await pauses until parsing completes
    const user = await response.json();
    console.log("User data:", user);
    // return user resolves the Promise returned by this async function

    return user;

    //     • Catches any error in try
    // • Logs it
    // • Re-throws it so the caller can handle it
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
}

// Call async function

// • Re-thrown error rejects the Promise
// • .catch() handles the rejection

// This gives you two-level error control:
// – Inside the function
// – Outside the function
fetchUserData()
  .then((data) => {
    console.log("Final data received:", data.name);
  })
  .catch((error) => {
    console.log("Caught outside async function:", error.message);
  });

//   • async → returns Promise
// • await → pauses function only
// • try/catch → handles async errors
// • throw → forwards error
// • .catch() → final safety net

// async/await lets you handle asynchronous errors using normal try/catch, making backend code cleaner, safer, and easier to maintain.

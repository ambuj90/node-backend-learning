// Helper function to simulate an API call

// • Returns a Promise
// • Promise resolves after 1 second
// • Each call takes ~1 second

// This is fake async work, but behaves like real network calls.
function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ID ${id}`), 1000);
  });
}

// Sequential operation - slow

// Time 0s
// • fetchData(1) starts
// • await pauses function

// Time 1s
// • fetchData(1) finishes
// • fetchData(2) starts

// Time 2s
// • fetchData(2) finishes
// • fetchData(3) starts

// Time 3s
// • fetchData(3) finishes

// Total time ≈ 3 seconds

// Why?

// Each await waits before starting the next task.
async function fetchSequential() {
  console.time("sequential");

  const data1 = await fetchData(1);
  const data2 = await fetchData(2);
  const data3 = await fetchData(3);

  console.timeEnd("sequential");
  return [data1, data2, data3];
}

// Parallel operation - fast

// Time 0s
// • fetchData(1) starts
// • fetchData(2) starts
// • fetchData(3) starts

// All run together.

// Time 1s
// • All three finish
// • Promise.all resolves

// Total time ≈ 1 second

// Why?

// • Promises are created immediately
// • Promise.all waits for all of them
// • No waiting between calls

async function fetchParallel() {
  console.time("parallel");

  const results = await Promise.all([fetchData(1), fetchData(2), fetchData(3)]);

  console.timeEnd("parallel");
  return results;
}

// Demo runner

// • Calls sequential version first
// • Prints result and time
// • Calls parallel version next
// • Prints result and time

// This makes the difference obvious.

async function runDemo() {
  console.log("Running sequentially...");
  const seqResults = await fetchSequential();
  console.log(seqResults);

  console.log("\nRunning in parallel...");
  const parResults = await fetchParallel();
  console.log(parResults);
}

runDemo();

// Fetch multiple APIs

// const [users, posts, comments] = await Promise.all([
//   fetchUsers(),
//   fetchPosts(),
//   fetchComments()
// ]);

// Database queries

// const [profile, orders, payments] = await Promise.all([
//   getProfile(id),
//   getOrders(id),
//   getPayments(id)
// ]);

// File operations

// await Promise.all([
//   fs.readFile("a.txt"),
//   fs.readFile("b.txt"),
//   fs.readFile("c.txt")
// ]);

// • await pauses execution
// • Sequential = wait → start → wait → start
// • Parallel = start all → wait once
// • Promise.all = concurrency tool

// Use sequential async/await when tasks depend on each other, and use Promise.all when tasks are independent and performance matters.

// 1. Callbacks
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received!");
  }, 1000);
}

// Call callback version
fetchData((data) => {
  console.log(data);
});

// 2. Promises
const fetchDataPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promise resolved!");
    }, 1000);
  });
};

// 3. Async/Await
async function getData() {
  const result = await fetchDataPromise();
  console.log(result);
}

// Call async function
getData();

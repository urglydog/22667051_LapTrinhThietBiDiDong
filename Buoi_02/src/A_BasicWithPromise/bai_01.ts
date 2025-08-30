// 1. Create a Promise that returns the string "Hello Async" after 2 seconds.
const helloAsyncPromise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

// Example usage:
helloAsyncPromise.then((result) => {
  console.log(result); // "Hello Async" (sau 2 giây)
});

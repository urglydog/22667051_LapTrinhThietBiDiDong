// 3. Write a function that rejects a Promise with the error "Something went wrong" after 1
// second.
const rejectPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong");
  }, 1000);
});

rejectPromise.catch((err) => {
  console.error(err);
});

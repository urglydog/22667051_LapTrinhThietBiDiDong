// 6. Use Promise.all() to run 3 simulated Promises in parallel and print the result.
const taskOne = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 1 done"), 1000);
});

const taskTwo = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 2 done"), 1500);
});

const taskThree = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 3 done"), 2000);
});

Promise.all([taskOne, taskTwo, taskThree])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log("Erro", err);
  });

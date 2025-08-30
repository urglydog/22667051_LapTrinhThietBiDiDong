// 6. Use Promise.all() to run 3 simulated Promises in parallel and print the result.
const task1 = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 1 done"), 1000);
});

const task2 = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 2 done"), 1500);
});

const task3 = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 3 done"), 2000);
});

Promise.all([task1, task2, task3])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log("Erro", err);
  });

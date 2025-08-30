// 7. Use Promise.race() to return whichever Promise resolves first.
const task1 = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 1 done first"), 3000);
});

const task2 = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 2 done first"), 1500);
});

const task3 = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Task 3 done first"), 2000);
});

Promise.race([task1, task2, task3]).then((result) => {
  console.log(result);
});

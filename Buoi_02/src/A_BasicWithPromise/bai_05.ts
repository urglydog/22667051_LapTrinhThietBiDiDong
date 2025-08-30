// 5. Create a function simulateTask(time) that returns a Promise resolving with "Task
// done" after time ms.
const simulateTask = (time: number): Promise<string> => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
};

// Test
simulateTask(2000).then((result) => {
  console.log(result); // sẽ in "Task done" sau 2 giây
});

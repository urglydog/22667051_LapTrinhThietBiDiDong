// 29. Write an async function queueProcess() that processes tasks sequentially in a queue.
// Hàm giả lập một task async
function asyncTasks(id: number, time: number) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} done in ${time} ms`);
    }, time);
  });
}
// Hàm xử lý queue tuần tự
async function queueProcess() {
  const tasks = [
    () => asyncTasks(1, 1000),
    () => asyncTasks(2, 1500),
    () => asyncTasks(3, 500),
    () => asyncTasks(4, 2000),
  ];
  const results: string[] = [];
  for (const task of tasks) {
    const result = await task(); // chờ task xong mới chạy task tiếp
    console.log(result);
    results.push(result);
  }

  return results;
}

// Gọi hàm
queueProcess().then((res) => {
  console.log("All tasks finished sequentially:");
  console.log(res);
});

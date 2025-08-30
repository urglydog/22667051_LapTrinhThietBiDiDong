// 28. Write an async function batchProcess() that processes 5 async tasks at once (use
// Promise.all).
// Hàm giả lập 1 task async
function asyncTask(id: number, time: number) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} completed in ${time} ms`);
    }, time);
  });
}

// Hàm batchProcess xử lý 5 tasks song song
async function batchProcess() {
  const tasks = [
    asyncTask(1, 1000),
    asyncTask(2, 1500),
    asyncTask(3, 2000),
    asyncTask(4, 2500),
    asyncTask(5, 3000),
  ];

  const results = await Promise.all(tasks);
  return results;
}

// Gọi hàm
batchProcess().then((res) => {
  console.log("All tasks done:");
  console.log(res);
});

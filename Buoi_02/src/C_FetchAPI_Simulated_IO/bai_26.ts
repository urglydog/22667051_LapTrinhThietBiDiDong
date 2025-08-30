// 26. Use async/await with setTimeout to simulate a 5-second wait.
// Hàm delay dùng setTimeout
function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitFiveSeconds() {
  console.log("Start waiting...");

  await delay(5000); // chờ 5 giây

  console.log("5 seconds have passed!");
}

// Gọi hàm
waitFiveSeconds();

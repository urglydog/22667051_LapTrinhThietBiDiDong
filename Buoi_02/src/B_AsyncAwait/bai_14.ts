// 14. Write an async function that takes a number, waits 1 second, and returns the number × 3.
async function tackNumber(a: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(a * 3);
    }, 1000);
  });
}

async function run() {
  try {
    const result = await tackNumber(1);
    console.log("Result:", result);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    console.log("Done");
  }
}
run();

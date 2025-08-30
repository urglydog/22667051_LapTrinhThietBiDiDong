"use strict";
// 11. Convert Exercise 1 into async/await.
const helloPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
// Dùng async/await
async function runHelloAsync() {
    try {
        const result = await helloPromise; // đợi 2 giây
        console.log(result); // "Hello Async"
    }
    catch (error) {
        console.error("Error:", error);
    }
    finally {
        console.log("Done");
    }
}
runHelloAsync();

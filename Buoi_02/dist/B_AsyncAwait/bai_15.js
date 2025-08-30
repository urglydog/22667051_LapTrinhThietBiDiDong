"use strict";
// 15. Call multiple async functions sequentially using await.
// Hàm trả về promise để có thể await
async function fc1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(1);
            resolve(1);
        }, 1000);
    });
}
async function fc2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(2);
            resolve(2);
        }, 1500);
    });
}
async function fc3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(3);
            resolve(3);
        }, 2000);
    });
}
// Hàm chạy tuần tự
async function runSequece() {
    await fc1(); // đợi in 1 xong
    await fc2(); // đợi in 2 xong
    await fc3(); // đợi in 3 xong
    console.log("Done!");
}
runSequece();

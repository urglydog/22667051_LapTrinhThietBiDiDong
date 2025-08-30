"use strict";
// 2. Write a function that returns a Promise resolving with the number 10 after 1 second.
const numberAsync = new Promise((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 1000);
});
numberAsync.then((result) => {
    console.log(result);
});

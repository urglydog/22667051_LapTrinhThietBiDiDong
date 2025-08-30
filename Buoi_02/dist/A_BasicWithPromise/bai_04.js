"use strict";
// 4. Use .then() and .catch() to handle a Promise that returns a random number.
const randomPromise = new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
        if (random > 0.2) {
            resolve(random); // thành công (80% cơ hội)
        }
        else {
            reject("Random number too small!"); // thất bại (20% cơ hội)
        }
    }, 1000);
});
randomPromise
    .then((result) => {
    console.log("Random number:", result);
})
    .catch((error) => {
    console.error("Error:", error);
});

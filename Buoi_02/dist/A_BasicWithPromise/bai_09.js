"use strict";
// 9. Write a Promise that reads an array after 1 second and filters even numbers.
const readArray = (arr) => {
    return new Promise((reslove) => {
        setTimeout(() => {
            const evenNumbers = arr.filter((num) => num % 2 === 0);
            reslove(evenNumbers);
        }, 1000);
    });
};
// Test
readArray([1, 2, 3, 4, 5, 6]).then((result) => {
    console.log("Even numbers:", result); // [2, 4, 6]
});

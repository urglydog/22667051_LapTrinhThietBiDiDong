"use strict";
// 8. Create a Promise chain: square the number 2, then double it, then add 5.
const chain = Promise.resolve(2)
    .then((num) => {
    return num * num;
})
    .then((num) => {
    return num * 2;
})
    .then((num) => {
    return num + 5;
});
chain.then((result) => {
    console.log("Result: ", result);
});

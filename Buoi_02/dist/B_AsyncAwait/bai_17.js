"use strict";
// 17. Use for await...of to iterate over an array of Promises.
async function demoForAwaitOf() {
    const promises = [
        Promise.resolve("A"),
        Promise.resolve("B"),
        Promise.resolve("C"),
    ];
    for await (const value of promises) {
        console.log(value);
    }
}
demoForAwaitOf();

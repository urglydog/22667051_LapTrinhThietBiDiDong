"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 20. Add a timeout: if the API call takes more than 2 seconds, throw an error.
const bai_18_1 = require("./bai_18");
async function fetchWithTimeOut(id, timeout = 2000) {
    const timeOutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout"));
        }, timeout);
    });
    return Promise.race([(0, bai_18_1.fetchUser)(id), timeOutPromise]);
}
fetchWithTimeOut("1")
    .then((user) => {
    console.log(user);
})
    .catch((err) => {
    console.error("Error: ", err.message);
});

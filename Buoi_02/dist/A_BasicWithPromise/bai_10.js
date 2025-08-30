"use strict";
// 10. Use .finally() to log "Done" when a Promise finishes (success or failure).
const finallyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Process successful");
    }, 1000);
});
finallyPromise
    .then((result) => {
    console.log(result);
})
    .catch((err) => {
    console.error(err);
})
    .finally(() => {
    console.log("Done");
});

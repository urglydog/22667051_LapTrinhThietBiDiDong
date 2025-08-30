"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 16. Call multiple async functions in parallel using Promise.all().
const bai_15_1 = require("./bai_15");
Promise.all([bai_15_1.fc1, bai_15_1.fc2, bai_15_1.fc3]).then((result) => {
    console.log(result);
});

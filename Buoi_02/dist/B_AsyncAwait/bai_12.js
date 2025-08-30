"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 12. Write an async function that calls simulateTask(2000) and logs the result.
const bai_05_1 = require("../A_BasicWithPromise/bai_05");
async function runsimulateTask() {
    try {
        const result = await (0, bai_05_1.simulateTask)(2000);
    }
    catch (error) {
        console.error("Error: ", error);
    }
    finally {
        console.log("Done");
    }
}
runsimulateTask();

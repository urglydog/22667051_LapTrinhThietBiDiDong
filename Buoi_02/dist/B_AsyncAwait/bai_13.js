"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 13. Handle errors using try/catch with async/await.
const bai_05_1 = require("../A_BasicWithPromise/bai_05");
async function useTryCatch() {
    try {
        const result = await (0, bai_05_1.simulateTask)(1000);
    }
    catch (error) {
        console.error("Error: ", error);
    }
    finally {
        console.log("Done");
    }
}
useTryCatch();

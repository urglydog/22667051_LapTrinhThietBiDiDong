// 12. Write an async function that calls simulateTask(2000) and logs the result.
import { simulateTask } from "../A_BasicWithPromise/bai_05";
async function runsimulateTask() {
  try {
    const result = await simulateTask(2000);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    console.log("Done");
  }
}

runsimulateTask();

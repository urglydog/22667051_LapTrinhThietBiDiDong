// 13. Handle errors using try/catch with async/await.
import { simulateTask } from "../A_BasicWithPromise/bai_05";
async function useTryCatch() {
  try {
    const result = await simulateTask(1000);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    console.log("Done");
  }
}

useTryCatch();

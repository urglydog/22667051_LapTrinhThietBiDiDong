// 16. Call multiple async functions in parallel using Promise.all().
import { fc1, fc2, fc3 } from "./bai_15";
Promise.all([fc1, fc2, fc3]).then((result) => {
  console.log(result);
});

// 20. Add a timeout: if the API call takes more than 2 seconds, throw an error.
import { fetchUser } from "./bai_18";
async function fetchWithTimeOut(id: string, timeout = 2000) {
  const timeOutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, timeout);
  });
  return Promise.race([fetchUser(id), timeOutPromise]);
}

fetchWithTimeOut("1")
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.error("Error: ", err.message);
  });

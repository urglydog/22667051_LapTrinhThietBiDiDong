"use strict";
// 27. Write a function fetchWithRetry(url, retries) that retries up to retries times if
// the API call fails.
async function fetchWithRetry(url, retries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Attempt ${attempt}...`);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            return data; // Thành công thì trả về luôn
        }
        catch (error) {
            console.error(`Error on attempt ${attempt}:`, error);
            if (attempt === retries) {
                throw new Error(`Failed after ${retries} attempts`);
            }
            // có thể chèn delay giữa các lần thử lại (ví dụ 1s)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}
fetchWithRetry("https://6819db9a1ac115563506bd6e.mockapi.io/users/1", 3)
    .then((data) => console.log("Success:", data))
    .catch((err) => console.error("Final Error:", err.message));

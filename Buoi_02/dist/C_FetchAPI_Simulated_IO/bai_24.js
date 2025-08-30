"use strict";
// 24. Write an async function postData() that sends a POST request to a test API.
async function postData() {
    try {
        const res = await fetch("https://6819db9a1ac115563506bd6e.mockapi.io/users", {
            method: "POST", // dùng POST
            headers: {
                "Content-Type": "application/json", // gửi JSON
            },
            body: JSON.stringify({
                title: "Hello API",
                body: "This is a test POST request",
                userId: 1,
            }),
        });
        const data = await res.json(); // đọc JSON trả về
        console.log("Response:", data);
        return data;
    }
    catch (error) {
        console.error("Error posting data:", error);
    }
}
// Gọi hàm
postData();

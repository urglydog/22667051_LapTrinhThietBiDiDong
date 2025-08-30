"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = fetchUser;
// 18. Write an async function fetchUser(id) that simulates an API call (resolves a user
// object after 1 second).
async function fetchUser(id) {
    const api_data = await fetch(`https://6819db9a1ac115563506bd6e.mockapi.io/users/${id}`);
    const users = api_data.json();
    return users;
}
fetchUser("1").then((result) => {
    console.log(result);
});

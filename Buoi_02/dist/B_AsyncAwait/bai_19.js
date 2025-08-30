"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 19. Create an async function fetchUsers(ids: number[]) that calls fetchUser for each
// ID.
const bai_18_1 = require("./bai_18");
async function fetchUsers(ids) {
    const promises = ids.map((id) => (0, bai_18_1.fetchUser)(id));
    const users = Promise.all(promises);
    return users;
}
fetchUsers(["1", "2", "3", "4"]).then((result) => {
    console.log(result);
});

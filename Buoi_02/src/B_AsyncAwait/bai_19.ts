// 19. Create an async function fetchUsers(ids: number[]) that calls fetchUser for each
// ID.
import { fetchUser } from "./bai_18";
async function fetchUsers(ids: string[]) {
  const promises = ids.map((id) => fetchUser(id));
  const users = Promise.all(promises);
  return users;
}

fetchUsers(["1", "2", "3", "4"]).then((result) => {
  console.log(result);
});

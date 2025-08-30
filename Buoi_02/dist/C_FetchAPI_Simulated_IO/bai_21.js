"use strict";
// 21. Use fetch to get data from a public API (e.g.,
// https://jsonplaceholder.typicode.com/todos/1).
async function fetchPublic() {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    const jsonData = await data.json();
    return jsonData;
}
fetchPublic().then((jsonData) => {
    console.log(jsonData);
});

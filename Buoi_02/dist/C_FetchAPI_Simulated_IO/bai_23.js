"use strict";
// 23. Write an async function that fetches a list of todos and filters out those that are not
// completed.
async function fetch_Fillter() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const jsondata = await res.json();
    return jsondata.filter((todo) => todo.completed === false);
}
fetch_Fillter().then((result) => {
    console.log(result);
});

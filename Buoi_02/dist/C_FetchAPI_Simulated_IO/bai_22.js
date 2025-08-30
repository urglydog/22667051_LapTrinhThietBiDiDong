"use strict";
// 22. Call the API multiple times and log the results.
async function fetchTodo() {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    const jsonData = await data.json();
    console.log("API data: ", jsonData);
}
setInterval(fetchTodo, 1000);

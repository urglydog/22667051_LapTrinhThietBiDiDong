// 30. Use async/await + Promise.allSettled() to handle multiple API calls and display their
// success/failure status.
async function fetchUrl(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
}

async function runMultipleApis() {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1", // hợp lệ
    "https://jsonplaceholder.typicode.com/todos/2", // hợp lệ
    "https://jsonplaceholder.typicode.com/invalid", // sai -> lỗi 404
  ];

  const results = await Promise.allSettled(urls.map((url) => fetchUrl(url)));

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`✅ API ${index + 1} success:`, result.value);
    } else {
      console.log(`❌ API ${index + 1} failed:`, result.reason.message);
    }
  });
}

// Gọi hàm
runMultipleApis();

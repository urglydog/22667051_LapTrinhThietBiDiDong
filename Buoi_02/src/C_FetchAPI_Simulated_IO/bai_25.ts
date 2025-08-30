// 25. Create a function downloadFile that simulates downloading a file in 3 seconds and logs
// when done.
async function downloadFile(filename: string) {
  console.log(`Downloading ${filename}...`);

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`${filename} downloaded successfully!`);
      resolve();
    }, 3000); // 3 giây
  });
}

// Gọi hàm
downloadFile("report.pdf").then(() => {
  console.log("Done!");
});

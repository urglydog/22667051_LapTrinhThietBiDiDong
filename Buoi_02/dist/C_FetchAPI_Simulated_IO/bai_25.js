"use strict";
// 25. Create a function downloadFile that simulates downloading a file in 3 seconds and logs
// when done.
async function downloadFile(filename) {
    console.log(`Downloading ${filename}...`);
    return new Promise((resolve) => {
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

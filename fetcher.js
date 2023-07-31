const fs = require('fs');
const request = require('request');

if (process.argv.length !== 4) {
  console.error('Usage: node fetcher.js <URL> <localFilePath>');
  process.exit(1);
}

const url = process.argv[2];
const localFilePath = process.argv[3];

request.get(url, (error, response, body) => {
  if (error) {
    console.error('Error: ', error.message);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Error: Failed to download the resource. Status code: ${response.statusCode}`);
    process.exit(1);
  }

  fs.writeFile(localFilePath, body, (error) => {
    if (error) {
      console.error('Error writing the file: ', error.message);
      process.exit(1);
    }

    console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
  });
});
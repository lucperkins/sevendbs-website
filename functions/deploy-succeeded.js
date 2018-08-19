const https = require('https');

const handle = (res) => {
  const headers = res.headers;

  headers.forEach((header) => {
    console.log(header);
  });
}

exports.handler = (event, context, callback) => {
  console.log("Processing function...");

  https.get("https://7dbs.io", handle);
}

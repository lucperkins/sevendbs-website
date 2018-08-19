const https = require('https');

const handle = (res) => {
  const headers = res.headers;

  Object.keys(headers).forEach((key) => {
    const header = headers[key];
    console.log("Header: " + header);
  });
}

exports.handler = (event, context, callback) => {
  console.log("Processing function...");

  https.get("https://7dbs.io", handle);
}

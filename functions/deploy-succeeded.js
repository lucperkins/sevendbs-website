const https = require('https'),
      url = 'https://7dbs.io';

const handleResponse = (res) => {
  const headers = res.headers;

  if ("X-Robots-Tag" in headers) {
    callback(null, {
      statusCode: 500,
      body: `The page ${url} contains the "X-Robots-Tag" header`
    });

  } else {
    callback(null, {
      statusCode: 200,
      body: "All clear!"
    })
  }
}

const handleError = (e) => {
  console.error(e);
}

exports.handler = (event, context, callback) => {
  console.log("Printing event:");
  console.log(event);

  https.get(url, (res) => {
    const headers = res.headers;

    if ("X-Robots-Tag" in headers) {
      console.error("X-Robots-Tag header present");
      callback(null, {
        statusCode: 500,
        body: `The page ${url} contains the "X-Robots-Tag" header`
      });

    } else {
      console.log("All clear!");
      callback(null, {
        statusCode: 200,
        body: "All clear!"
      })
    }
  }).on('error', handleError);
}

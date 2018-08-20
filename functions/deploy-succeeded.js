const https = require('https'),
      slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

exports.handler = (event, context, callback) => {
  const slackMessage = {
    text: "This is an example message"
  }

  const httpOptions = {
    hostname: slackWebhookUrl,
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = https.request(httpOptions, (res) => {
    res.on('data', (data) => console.log(`Data: ${data}`));
    res.on('end', () => console.log('No more data in response'));
  });

  req.on('error', (e) => console.log(e));
  req.write(JSON.stringify(slackMessage));
  req.end();
}

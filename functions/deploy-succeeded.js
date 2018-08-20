const https = require('https'),
      { IncomingWebhook } = require('@slack/client'),
      slackWebhookUrl = process.env.SLACK_WEBHOOK_URL,
      url = 'https://7dbs.io';

const webhook = new IncomingWebhook(slackWebhookUrl);

const handleError = (e) => {
  console.error(e);
}

const handleWebhookResponse = (res, err) => {
  if (err) {
    console.err(`Slack webhook error: ${err}`);
  } else {
    console.log(`Message received from Slack: ${res}`);
  }
}

exports.handler = (event, context, callback) => {
  console.log("Printing event:");
  console.log(event);

  https.get(url, (res) => {
    const headers = res.headers;

    if ("X-Robots-Tag" in headers) {
      console.error("X-Robots-Tag header present");

      const msg = `WARNING: The page ${url} contains the "X-Robots-Tag" header`;

      webhook.send(msg, handleWebhookResponse);

      callback(null, {
        statusCode: 500,
        body: `The page ${url} contains the "X-Robots-Tag" header`
      });

    } else {
      console.log("All clear!");

      const msg = "Page deployment succeeded!";

      webhook.send(msg, handleWebhookResponse);

      callback(null, {
        statusCode: 200,
        body: "All clear!"
      })
    }
  }).on('error', handleError);
}

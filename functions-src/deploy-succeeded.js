const { IncomingWebhook } = require('@slack/client'),
      fetch = require('node-fetch').default;

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(slackWebhookUrl);

const sendSlackMessage = (msg) => {
  const slackMessageObject = {
    username: "Indexing checker",
    text: msg
  }

  webhook.send(slackMessageObject, (err, res) => {
    if (err) {
      console.error(`Slack webhook error: ${err}`);
    } else {
      console.log(`Response received from Slack: ${JSON.stringify(res)}`);
    }
  });
}

exports.handler = (event, context, callback) => {
  fetch('https://7dbs.io')
    .then(res => {
      const headers = res.headers.raw();
      console.log(JSON.stringify(headers));
      if ('X-Robots-Tag' in headers && (headers.get('X-Robots-Tag') == "noindex")) {
        sendSlackMessage(`WARNING: X-Robots-Tag found in main page headers.\n\nCurrent headers: ${JSON.stringify(headers)}`);
      } else {
        sendSlackMessage("No X-Robots-Tag header present. All clear!");
      }
    });
}

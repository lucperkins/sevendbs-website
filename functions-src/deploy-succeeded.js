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
      const headers = res.headers;
      if ('x-robots-tag' in headers.raw() && (headers.get('x-robots-tag') == "noindex")) {
        sendSlackMessage(`WARNING: X-Robots-Tag found in main page headers.\n\nCurrent headers: ${headers.raw()}`);
      } else {
        sendSlackMessage("No X-Robots-Tag header present. All clear!");
      }
    });
}

const { IncomingWebhook } = require('@slack/client'),
      fetch = require('node-fetch');

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(slackWebhookUrl);

const sendSlackErrorMessage = (msg) => {
  const slackMessageObject = {
    text: msg
  }

  webhook.send(slackMessageObject, (err, res) => {
    if (err) {
      console.error(`Slack webhook error: ${err}`);
    } else {
      console.log(`Response received from Slack: ${res}`);
    }
  });
}

exports.handler = (event, context, callback) => {
  fetch('https://7dbs.io')
    .then(res => {
      const headers = res.headers.raw();
      if ('X-Robots-Tag' in headers) {
        const msg = `WARNING: X-Robots-Tag found in main page headers.\n\nCurrent headers: ${JSON.stringify(headers)}`;
        sendSlackErrorMessage(msg);
      }
    });
}

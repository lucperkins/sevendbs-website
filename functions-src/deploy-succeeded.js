const { IncomingWebhook } = require('@slack/client');
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';

if (!slackWebhookUrl) {
  console.log("You must specify a Slack webhook URL using the SLACK_WEBHOOK_URL environment variable");
  process.exitCode = 1;
  return;
}

const webhook = new IncomingWebhook(slackWebhookUrl);

exports.handler = (event, context, callback) => {
  webhook.send('Here is a test message', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
}

const { IncomingWebhook } = require('@slack/client');
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';
const webhook = new IncomingWebhook(slackWebhookUrl);

exports.handler = (event, context, callback) => {
  console.log(`Slack webhook URL: ${slackWebhookUrl}`);

  webhook.send('Here is a test message', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
}

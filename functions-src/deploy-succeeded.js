const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '',
      { IncomingWebhook } = require('@slack/client'),
      webhook = new IncomingWebhook(slackWebhookUrl);

if (!slackWebhookUrl) {
  console.error("You must specify a Slack webhook URL using the SLACK_WEBHOOK_URL environment variable");
  process.exitCode = 1;
  return;
}

exports.handler = (event, context, callback) => {
  webhook.send('Here is a test message', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
}

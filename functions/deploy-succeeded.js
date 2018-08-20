const https = require('https'),
      slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;


exports.handler = (event, context, callback) => {
  console.log(`Slack webhook URL: ${slackWebhookUrl}`);
}

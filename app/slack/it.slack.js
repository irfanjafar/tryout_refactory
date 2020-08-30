var Slack = require("node-slack");
var slack = new Slack(
  "https://hooks.slack.com/services/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"
);
exports.sendMessage = async (username, channel, message) => {
  try {
    await slack.send({
      text: message,
      channel: "#" + channel,
      username: username,
    });
  } catch (err) {
    console.log("ERR" + err);
  }
  console.log("Sending message", message, "to channel", channel);
};

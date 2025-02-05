const handleMessage = require("./handlers/messageHandler");
const handleCommand = require("./handlers/commandHandler");

module.exports = (bot, message) => {
  if (message.text && message.text.startsWith("/")) {
    handleCommand(bot, message); // For commands
  } else {
    handleMessage(bot, message); // For other messages
  }
};

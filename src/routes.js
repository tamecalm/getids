import handleMessage from "./handlers/messageHandler";
import handleCommand from "./handlers/commandHandler";

const routeUpdates = (bot, message) => {
  if (message.text && message.text.startsWith("/")) {
    handleCommand(bot, message); // For commands
  } else {
    handleMessage(bot, message); // For other messages
  }
};

export default routeUpdates;

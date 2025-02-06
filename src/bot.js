import TelegramBot from "node-telegram-bot-api";
import botConfig from "./config/botConfig.js";
import routeUpdates from "./routes.js";

// Creating an export name for botToken to be used in other files
const { botToken } = botConfig;

// Create the bot instance
const bot = new TelegramBot(botToken, { polling: true });

// Listen for incoming messages and route them to the appropriate handler
bot.on("message", (message) => routeUpdates(bot, message));

// Listen for callback queries (inline button presses)
/*
bot.on("callback_query", (callbackQuery) => {
  const { data, message, from } = callbackQuery;
  const { chat, message_id } = message;

  try {
    if (data === "get_chat_id") {
      // Show chat name for group or channel (or user ID if private)
      const chatName = chat.type === "private" ? from.first_name : chat.title;
      bot.sendMessage(
        chat.id,
        `This is the ID of the current chat (${chatName}): <code>${chat.id}</code>`,
        { parse_mode: "HTML" }
      );
    } else if (data === "get_help") {
      // Send help message when 'Get Help' button is pressed
      bot.sendMessage(
        chat.id,
        "🔧 Use /id to get the ID of this chat (user, group, or channel)."
      );
    } else if (data === "get_id") {
      // Send specific ID of the current chat (user/group/channel)
      const chatName = chat.type === "private" ? from.first_name : chat.title;
      bot.sendMessage(
        chat.id,
        `The ID of this <b>${chatName}</b> is: <code>${chat.id}</code>`,
        { parse_mode: "HTML" }
      );
    }

    // Acknowledge callback query to remove loading state from the button
    bot.answerCallbackQuery(callbackQuery.id);

    // Delete the message after processing (if necessary)
    bot.deleteMessage(chat.id, message_id).catch(() => {});
  } catch (error) {
    console.error(error); // Log error for debugging
  }
});
*/

// Export bot to be used in other files
export default bot;

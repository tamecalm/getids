import validation from "../utils/validation.js";

export default (bot, message) => {
  const { chat, text, from, message_id } = message;

  try {
    // Validate if userId and chatId are valid
    if (!validation.isValidUserId(from.id)) {
      bot.sendMessage(chat.id, "⚠️ Invalid user ID!");
      return;
    }

    if (!validation.isValidChatId(chat.id)) {
      bot.sendMessage(chat.id, "⚠️ Invalid chat ID!");
      return;
    }

    // Validate if the message text is a command (e.g., starts with "/")
    if (text && validation.isCommand(text)) {
      bot.sendMessage(chat.id, `✅ Command detected: <b>${text}</b>`, {
        parse_mode: "HTML",
      });
    }

    // Handle the message depending on the type of chat
    if (chat.type === "private") {
      // For direct messages (User ID)
      bot.sendMessage(chat.id, `👤 Your User ID is: <code>${from.id}</code>`, {
        parse_mode: "HTML",
      });
      // else if forwarded message from a channel or group or supergroup or user
      if (message.forward_from) {
        bot.sendMessage(
          chat.id,
          `👤 Forwarded User ID is: <code>${message.forward_from.id}</code>`,
          {
            parse_mode: "HTML",
          }
        );
      }
    } else if (chat.type === "group" || chat.type === "supergroup") {
      // For groups or supergroups (Group ID)
      bot.sendMessage(chat.id, `🗣️ This Group ID is: <code>${chat.id}</code>`, {
        parse_mode: "HTML",
      });
    } else if (chat.type === "channel") {
      // For channels (Channel ID)
      bot.sendMessage(
        chat.id,
        `📡 This Channel ID is: <code>${chat.id}</code>`,
        { parse_mode: "HTML" }
      );
    }

    // Schedule auto-delete of the message after 24 hours
    scheduleAutoDelete(bot, chat.id, message_id);

    // Delete the original message after processing (to clean up)
    bot.deleteMessage(chat.id, message_id).catch(() => {});
  } catch (error) {
    // Handle any unexpected errors gracefully, without showing them to the user
    console.error(error); // Log error on the server side for debugging
    bot.sendMessage(
      chat.id,
      "❗ An error occurred while processing your request. Please try again later."
    );
  }
};

// Function to schedule the auto-deletion of messages after 24 hours
const scheduleAutoDelete = (bot, chatId, messageId) => {
  const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  setTimeout(() => {
    bot.deleteMessage(chatId, messageId).catch(() => {}); // Silent fail in case of an issue
  }, oneDayInMs);
};

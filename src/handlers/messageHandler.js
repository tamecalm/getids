const validation = require('../utils/validation');

module.exports = (bot, message) => {
    const { chat, text, from } = message;

    // Validate if userId and chatId are valid
    if (!validation.isValidUserId(from.id)) {
        bot.sendMessage(chat.id, 'Invalid user ID!');
        return;
    }

    if (!validation.isValidChatId(chat.id)) {
        bot.sendMessage(chat.id, 'Invalid chat ID!');
        return;
    }

    if (text && validation.isCommand(text)) {
        bot.sendMessage(chat.id, `Command detected: ${text}`);
    }

    // Further chat-specific handling
    if (chat.type === 'private') {
      // For direct messages
      bot.sendMessage(chat.id, `Your User ID is: ${message.from.id}`);
  } else if (chat.type === 'group' || chat.type === 'supergroup') {
      // For groups or supergroups
      bot.sendMessage(chat.id, `This Group ID is: ${chat.id}`);
  } else if (chat.type === 'channel') {
      // For channels
      bot.sendMessage(chat.id, `This Channel ID is: ${chat.id}`);
  }
};

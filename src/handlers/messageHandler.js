const validation = require('../utils/validation');

module.exports = (bot, message) => {
    const { chat, text, from, message_id } = message;

    try {
        // Validate if userId and chatId are valid
        if (!validation.isValidUserId(from.id)) {
            bot.sendMessage(chat.id, '⚠️ Invalid user ID!');
            return;
        }

        if (!validation.isValidChatId(chat.id)) {
            bot.sendMessage(chat.id, '⚠️ Invalid chat ID!');
            return;
        }

        // Validate if the message text is a command (e.g., starts with "/")
        if (text && validation.isCommand(text)) {
            bot.sendMessage(chat.id, `✅ Command detected: <b>${text}</b>`, { parse_mode: 'HTML' });
        }

        // Handle the message depending on the type of chat
        if (chat.type === 'private') {
            // For direct messages (User ID)
            bot.sendMessage(
                chat.id,
                `👤 Your User ID is: <code>${from.id}</code>`,
                { parse_mode: 'HTML' }
            );
        } else if (chat.type === 'group' || chat.type === 'supergroup') {
            // For groups or supergroups (Group ID)
            bot.sendMessage(
                chat.id,
                `🗣️ This Group ID is: <code>${chat.id}</code>`,
                { parse_mode: 'HTML' }
            );
        } else if (chat.type === 'channel') {
            // For channels (Channel ID)
            bot.sendMessage(
                chat.id,
                `📡 This Channel ID is: <code>${chat.id}</code>`,
                { parse_mode: 'HTML' }
            );
        }

        // Adding buttons for user interaction
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Delete this message', callback_data: `delete_${message_id}` }],
                    [{ text: 'Get Help', callback_data: 'get_help' }]
                ]
            }
        };

        bot.sendMessage(chat.id, 'Choose an option:', options);

        // Schedule auto-delete of the message after 24 hours
        scheduleAutoDelete(bot, chat.id, message_id);
    } catch (error) {
        // Handle any unexpected errors gracefully, without showing them to the user
        console.error(error); // Log error on the server side for debugging
    }
};

// Function to schedule the auto-deletion of messages after 24 hours
const scheduleAutoDelete = (bot, chatId, messageId) => {
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    setTimeout(() => {
        bot.deleteMessage(chatId, messageId).catch(() => {}); // Silent fail in case of an issue
    }, oneDayInMs);
};

// Handle inline button presses (e.g., to delete the message or get help)
bot.on('callback_query', (callbackQuery) => {
    const { data, message, from } = callbackQuery;
    const { chat, message_id } = message;

    try {
        if (data.startsWith('delete_')) {
            // Delete the message when the "Delete this message" button is clicked
            bot.deleteMessage(chat.id, message_id).catch(() => {}); // Silent fail
            bot.sendMessage(chat.id, '✅ Message deleted successfully!');
        } else if (data === 'get_help') {
            // Provide help information when the "Get Help" button is clicked
            bot.sendMessage(chat.id, '🔧 Use /id to get the ID of this chat (user, group, or channel).');
        }

        // Acknowledge callback query to remove the loading state from the button
        bot.answerCallbackQuery(callbackQuery.id);
    } catch (error) {
        console.error(error); // Log error for debugging
    }
});

const { CronJob } = require('cron'); // Use the `cron` package for scheduling

module.exports = (bot, message) => {
    const { text, chat, message_id } = message;

    try {
        // Handle /start command
        if (text === '/start') {
            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Get Chat ID', callback_data: 'get_chat_id' }],
                        [{ text: 'Delete Message', callback_data: 'delete_message' }]
                    ]
                }
            };
            bot.sendMessage(chat.id, 'Welcome! Add me to a group or channel to get its ID.', options);
        }
        // Handle /help command
        else if (text === '/help') {
            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Get Help', callback_data: 'get_help' }]
                    ]
                }
            };
            bot.sendMessage(chat.id, 'Use /id to get the ID of this chat (user, group, or channel).', options);
        }
        // Handle /id command
        else if (text === '/id') {
            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: `Get ID for this ${chat.type}`, callback_data: 'get_id' }]
                    ]
                }
            };
            bot.sendMessage(chat.id, `The ID of this <b>${chat.type}</b> is: <code>${chat.id}</code>`, {
                parse_mode: 'HTML',
                reply_markup: options.reply_markup
            });

            // Schedule auto-delete after 24 hours
            scheduleAutoDelete(bot, chat.id, message_id);
        }
    } catch (error) {
        console.error(error); // Log error on the server side
    }
};

// Schedule message deletion after 24 hours
const scheduleAutoDelete = (bot, chatId, messageId) => {
    // 24 hours later
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    setTimeout(() => {
        bot.deleteMessage(chatId, messageId).catch(() => {}); // Silent fail if the message is already deleted
    }, oneDayInMs);
};

const { CronJob } = require('cron'); // Use the `cron` package for scheduling

module.exports = (bot, message) => {
    const { text, chat, message_id } = message;

    try {
        // Handle /start command
        if (text === '/start') {
            // Make the welcome message unique and smooth
            const welcomeMessage = `
                👋 Hey there! Welcome to the chat ID Bot!
                
                I'm here to help you quickly get the ID of any chat, be it a group, user, or channel. 
                Simply choose the right option below to get started.
                
                If you need any help or want to contact me directly, you can reach out to me via my [Telegram Handle](https://t.me/your_telegram_handle).
                
                Enjoy using the bot! 😄
            `;

            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Get Chat ID', callback_data: 'get_chat_id' }]
                    ]
                },
                parse_mode: 'Markdown' // Use Markdown to make the contact link clickable
            };

            // Send the smooth welcome message with a contact link
            bot.sendMessage(chat.id, welcomeMessage, options);

            // Delete the /start command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});
        }
        // Handle /help command
        else if (text === '/help') {
            bot.sendMessage(chat.id, '🔧 Use /id to get the ID of this chat (user, group, or channel).');
            // Delete the /help command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});
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

            // Delete the /id command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});
            
            // Schedule auto-delete after 24 hours (Cron job will also check)
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

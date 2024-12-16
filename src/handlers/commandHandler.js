const { CronJob } = require('cron'); // Use the `cron` package for scheduling

module.exports = (bot, message) => {
    const { text, chat, message_id, from } = message;
    const botName = bot.username; // Get the bot's username
    const userName = from.username || from.first_name; // Get user's username or first name

    try {
        // Handle /start command
        if (text === '/start') {
            // Smooth and welcoming message with a personal touch
            const welcomeMessage = `
            👋 Hey <b>${userName}</b>! Welcome to <b>${botName}</b>! 🚀
            
            I'm here to help you easily find the ID of any chat: group, user, or channel. 
            No hassle, just a quick click! 😎

            👉 To get started, choose one of the options below.
            
            If you need any help or want to reach out to me directly, just [click here](https://t.me/your_telegram_handle) to message me on Telegram! 📲
            
            🎉 Enjoy using <b>${botName}</b> and let's get things done! 🎉
            `;

            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Get Chat ID 📜', callback_data: 'get_chat_id' }]
                    ]
                },
                parse_mode: 'HTML' // Use HTML for bold and clickable links
            };

            // Send the smooth and unique welcome message with a contact link
            bot.sendMessage(chat.id, welcomeMessage, options);

            // Delete the /start command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});
        }
        // Handle /help command
        else if (text === '/help') {
            const helpMessage = `
            🔧 Need help? Here’s what you can do:
            
            📝 Use <b>/id</b> to get the ID of this chat (whether it’s a user, group, or channel).

            You can always reach me for any questions or support at [my Telegram](https://t.me/your_telegram_handle) 📲.
            `;
            bot.sendMessage(chat.id, helpMessage, { parse_mode: 'HTML' });
            
            // Delete the /help command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});
        }
        // Handle /id command
        else if (text === '/id') {
            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: `Get ID for this ${chat.type} 🆔`, callback_data: 'get_id' }]
                    ]
                }
            };
            bot.sendMessage(chat.id, `🔑 The ID of this <b>${chat.type}</b> is: <code>${chat.id}</code>`, {
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

const { CronJob } = require('cron'); // Use the `cron` package for scheduling

module.exports = (bot, message) => {
    const { text, chat, message_id, from } = message;
    const userName = from.username || from.first_name; // Get user's username or first name

    // Fetch bot details, including its name
    bot.getMe().then(botInfo => {
        const botName = botInfo.first_name; // Dynamic bot name
        const userMessage = `
            👋 <b>Hey ${userName}!</b> Welcome to <b>${botName}</b>! 🚀
            
            I'm here to help you easily find the ID of any chat: whether it's a group, user, or channel. 
            No hassle, just a quick click! 😎
            
            👉 To get started, choose one of the options below.
            
            📱 If you need any help or want to reach out to me directly, feel free to contact me on Telegram: @tamecalm.

            🎉 Enjoy using <b>${botName}</b>! Let's make this quick and fun! 🎉
        `;

        const options = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Get Chat ID 📜', callback_data: 'get_chat_id' }]
                ]
            },
            parse_mode: 'HTML' // Use HTML for bold formatting
        };

        // Send the dynamic and smooth welcome message with options
        bot.sendMessage(chat.id, userMessage, options).then(sentMessage => {
            // Delete the /start command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});

            // Set up auto-deletion of this message after 10 seconds
            scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 10);
        });
    }).catch(err => {
        console.error("Error fetching bot details: ", err);
    });
    
    // Handle /help command
    if (text === '/help') {
        const helpMessage = `
        🔧 <b>Need help?</b> Here’s what you can do:

        1️⃣ Use <b>/id</b> to get the ID of this chat (whether it’s a user, group, or channel).

        2️⃣ If you need further assistance or have any questions, feel free to reach out to me directly on Telegram: @tamecalm.

        <i>I'm here to help! 😊</i>
        `;

        bot.sendMessage(chat.id, helpMessage, { parse_mode: 'HTML' }).then(sentMessage => {
            bot.deleteMessage(chat.id, message_id).catch(() => {});
            // Set up auto-deletion of this message after 10 seconds
            scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 10);
        });
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
        }).then(sentMessage => {
            // Delete the /id command message after sending
            bot.deleteMessage(chat.id, message_id).catch(() => {});

            // Schedule auto-delete after 24 hours (Cron job will also check)
            scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 10);
        });
    }
};

// Function to schedule message deletion after 10 seconds
const scheduleAutoDelete = (bot, chatId, messageId, timeoutInSeconds) => {
    const timeoutInMs = timeoutInSeconds * 1000; // Convert seconds to milliseconds
    setTimeout(() => {
        bot.deleteMessage(chatId, messageId).catch(() => {}); // Silent fail if the message is already deleted
    }, timeoutInMs);
};

const TelegramBot = require('node-telegram-bot-api');
const { botToken } = require('./config/botConfig');
const routeUpdates = require('./routes');

const bot = new TelegramBot(botToken, { polling: true });

// Listen for incoming messages and route them to the appropriate handler
bot.on('message', (message) => routeUpdates(bot, message));

// Listen for callback queries (inline button presses)
bot.on('callback_query', (callbackQuery) => {
    const { data, message, from } = callbackQuery;
    const { chat, message_id } = message;

    try {
        if (data === 'get_chat_id') {
            bot.sendMessage(chat.id, `This is the ID of the current chat: <code>${chat.id}</code>`, { parse_mode: 'HTML' });
        } else if (data === 'delete_message') {
            bot.deleteMessage(chat.id, message_id).catch(() => {}); // Silent fail
            bot.sendMessage(chat.id, '✅ Message deleted! Have a nice day!');
        } else if (data === 'get_help') {
            bot.sendMessage(chat.id, '🔧 Use /id to get the ID of this chat (user, group, or channel).');
        } else if (data === 'get_id') {
            bot.sendMessage(chat.id, `The ID of this <b>${chat.type}</b> is: <code>${chat.id}</code>`, {
                parse_mode: 'HTML'
            });
        }

        // Acknowledge callback query to remove the loading state on the button
        bot.answerCallbackQuery(callbackQuery.id);
    } catch (error) {
        console.error(error); // Log error on the server side
    }
});

module.exports = bot;

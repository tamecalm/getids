const TelegramBot = require('node-telegram-bot-api');
const { botToken } = require('./config/botConfig');
const routeUpdates = require('./routes');

const bot = new TelegramBot(botToken, { polling: true });

bot.on('message', (message) => routeUpdates(bot, message));  // Route messages

module.exports = bot;

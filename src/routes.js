const handleMessage = require('./handlers/messageHandler');
const handleCommand = require('./handlers/commandHandler');

module.exports = (bot, message) => {
    if (message.text.startsWith('/')) {
        handleCommand(bot, message);
    } else {
        handleMessage(bot, message);
    }
};

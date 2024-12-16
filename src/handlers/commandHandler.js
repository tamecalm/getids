module.exports = (bot, message) => {
  const { text, chat } = message;

  if (text === '/start') {
      bot.sendMessage(chat.id, 'Welcome! Add me to a group or channel to get its ID.');
  } else if (text === '/help') {
      bot.sendMessage(chat.id, 'Use /id to get the ID of this chat (user, group, or channel).');
  } else if (text === '/id') {
      bot.sendMessage(chat.id, `The ID of this ${chat.type} is: ${chat.id}`);
  }
};

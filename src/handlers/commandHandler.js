export default (bot, message) => {
  const { text, chat, message_id, from } = message;
  const userName = from.username || from.first_name; // Get user's username or first name

  // Handle /start command
  if (text === "/start") {
    bot
      .getMe()
      .then((botInfo) => {
        const botName = botInfo.first_name; // Dynamic bot name
        const userMessage = `
👋 <b>Hey ${userName}!</b> Welcome to <b>${botName}</b>! 🚀

I'm here to help you find the ID of any chat: group, user, or channel.

📱 For help, contact me on Telegram: @tamecalm.

🎉 Enjoy using <b>${botName}</b>! 🎉
        `;

        const options = {
          parse_mode: "HTML", // Use HTML for bold formatting
        };

        bot.sendMessage(chat.id, userMessage, options).then((sentMessage) => {
          bot.deleteMessage(chat.id, message_id).catch(() => {});

          scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 60);
        });
      })
      .catch((err) => {
        console.error("Error fetching bot details: ", err);
      });
  }

  // Handle /donate command
  else if (text === "/donate") {
    const donateMessage = `
🎉 <b>Support the Developer</b> 🎉

👋 Hey ${userName}! If you find this bot helpful and want to support the developer, you can donate any amount you like. Your contribution will help in maintaining and improving this bot for you and others to enjoy. 🚀

👉 <b>Donate via PayPal:</b> [PayPal.Me](https://www.paypal.me/yourusername)

🙏 Thank you for your support! It means a lot! ❤️
        `;

    bot
      .sendMessage(chat.id, donateMessage, { parse_mode: "HTML" })
      .then((sentMessage) => {
        bot.deleteMessage(chat.id, message_id).catch(() => {});
        scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 60);
      });
  }

  // Handle /id command
  else if (text === "/id") {
    bot
      .sendMessage(
        chat.id,
        `🔑 The ID of this <b>${chat.type}</b> is: <code>${chat.id}</code>`,
        { parse_mode: "HTML" }
      )
      .then((sentMessage) => {
        bot.deleteMessage(chat.id, message_id).catch(() => {});
        scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 10);
      });
  }

  // Handle /help command
  else if (text === "/help") {
    const helpMessage = `
🚀 <b>How to Use This Bot</b> 🚀 

1. Start the bot by clicking the /start command.
2. Use the /id command to get the ID of the current chat.
3. Use the /donate command to support the developer.
4. Enjoy using the bot! 🎉

📱 For any issues or feedback, contact the developer: @tamecalm.

🙏 Thank you for using this bot! ❤️
  `;

    bot
      .sendMessage(chat.id, helpMessage, { parse_mode: "HTML" })
      .then((sentMessage) => {
        bot.deleteMessage(chat.id, message_id).catch(() => {});
        scheduleAutoDelete(bot, chat.id, sentMessage.message_id, 60);
      });
  }
};

// Function to schedule message deletion after a specified timeout
const scheduleAutoDelete = (bot, chatId, messageId, timeoutInSeconds) => {
  const timeoutInMs = timeoutInSeconds * 1000; // Convert seconds to milliseconds
  setTimeout(() => {
    bot.deleteMessage(chatId, messageId).catch(() => {}); // Silent fail if the message is already deleted
  }, timeoutInMs);
};

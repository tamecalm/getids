module.exports = {
  // Validates if a string is a valid Telegram user ID (positive integer)
  isValidUserId: (userId) => {
      return Number.isInteger(userId) && userId > 0;
  },

  // Validates if a string is a valid Telegram chat ID (positive integer)
  isValidChatId: (chatId) => {
      return Number.isInteger(chatId) && chatId > 0;
  },

  // Validates that the input is not empty (useful for validating user input)
  isNotEmpty: (input) => {
      return input && input.trim() !== '';
  },

  // Validates if the text of the message starts with a command (e.g., "/")
  isCommand: (text) => {
      return text.startsWith('/');
  },

  // Custom validation function example (validates if a user is in a specific group)
  isUserInGroup: (userId, groupId) => {
      // This would need additional logic, like querying a database or an API
      // For now, returning true as a placeholder
      return true;
  }
};

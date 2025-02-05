export default {
  // Validates if a string is a valid Telegram user ID (positive integer)
  isValidUserId: (userId) => {
    const num = Number(userId);
    return Number.isInteger(num) && num > 0;
  },

  // Validates if a string is a valid Telegram chat ID (positive integer)
  isValidChatId: (chatId) => {
    const num = Number(chatId);
    return Number.isInteger(num) && num > 0;
  },

  // Validates that the input is not empty (useful for validating user input)
  isNotEmpty: (input) => {
    return typeof input === "string" && input.trim() !== "";
  },

  // Validates if the text of the message starts with a command (e.g., "/")
  isCommand: (text) => {
    return typeof text === "string" && text.startsWith("/");
  },

  // Custom validation function example (validates if a user is in a specific group)
  isUserInGroup: (userId, groupId) => {
    // This would need additional logic, like querying a database or an API
    // For now, returning true as a placeholder
    return true;
  },
};

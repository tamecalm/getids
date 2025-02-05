const bot = require("./bot");
const express = require("express");
const { CronJob } = require("cron");
const process = require("process");
const fs = require("fs");

// Create an Express app for health checks
const app = express();
const port = process.env.PORT || 3000;

// Basic health check route
app.get("/health", (req, res) => {
  res.status(200).send("Bot is running!");
});

// Start Express server
app.listen(port, () => {
  console.log(`Health check server running on port ${port}`);
});

// Logging functionality
const logMessage = (message) => {
  const log = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync("bot.log", log);
};

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Bot is shutting down...");
  logMessage("Bot shutting down...");
  bot.stopPolling();
  process.exit(0);
};

// Handle unexpected termination (SIGINT, SIGTERM)
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Bot logging for bot start and any activities
console.log("Bot is running...");
logMessage("Bot started successfully");

// Periodic Task Example: Send a daily reminder message at 9:00 AM
const dailyReminderJob = new CronJob(
  "0 9 * * *",
  () => {
    const chatId = "YOUR_CHAT_ID"; // Replace with your desired chat ID for the daily reminder
    bot.sendMessage(chatId, "Good morning! This is your daily reminder.");
    logMessage("Sent daily reminder message");
  },
  null,
  true,
  "America/New_York"
);
dailyReminderJob.start();

// Error Handling: Catch uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  logMessage(`Uncaught Exception: ${error.message}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  logMessage(`Unhandled Rejection: ${reason}`);
});

// Adding a functionality to send a message to a group or user every specific interval
const sendPeriodicMessage = (chatId, intervalMinutes = 60) => {
  setInterval(() => {
    bot.sendMessage(
      chatId,
      `This is your periodic message at ${new Date().toLocaleTimeString()}.`
    );
    logMessage(`Sent periodic message to ${chatId}`);
  }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds
};

// Example of sending periodic message every 1 hour
const chatIdForPeriodicMessages = "YOUR_CHAT_ID"; // Replace with the chat ID to receive periodic messages
sendPeriodicMessage(chatIdForPeriodicMessages, 60);

// Log when the bot is ready
bot.on("polling_error", (error) => {
  console.error("Polling Error:", error);
  logMessage(`Polling Error: ${error.message}`);
});

// Example: Adding a command to restart the bot using a manual trigger
bot.onText(/\/restart/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Restarting the bot...");
  logMessage("Bot restart triggered by user");
  setTimeout(() => {
    bot.stopPolling();
    process.exit(0); // Forces the bot to restart
  }, 2000);
});

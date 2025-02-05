import bot from "./bot.js";
import express from "express";
import { CronJob } from "cron";
import connectDB from "./db.js";
import adminController from "./controllers/adminController.js";
import process from "process";
import fs from "fs";
import path from "path";

// Create an Express app for health checks
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Uss the admin controller
app.use("/admin", adminController);

// Store user interactions (in-memory)
const interactions = [];

// Middleware to log bot interactions
bot.on("message", (msg) => {
  const { text, chat, from } = msg;
  const logEntry = {
    user: from.username || from.first_name,
    userId: from.id,
    chatId: chat.id,
    message: text,
    time: new Date().toLocaleString(),
  };

  console.log("User Interaction:", logEntry); // Log to console
  interactions.push(logEntry); // Save in memory (resets on restart)
});

// Route to check user interactions
app.get("/check", (req, res) => {
  res.json({
    status: "success",
    total_interactions: interactions.length,
    interactions,
  });
});

// Basic health check route
app.get("/health", async (req, res) => {
  try {
    const botInfo = await bot.getMe();
    if (botInfo) {
      res.status(200).send("Bot is running!");
    } else {
      res.status(500).send("Bot is not responding.");
    }
  } catch {
    res.status(500).send("Bot is not responding.");
  }
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
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatIdsFilePath = path.join(__dirname, "chatIds.json");

// Load chat IDs from file
let chatIds = [];
if (fs.existsSync(chatIdsFilePath)) {
  chatIds = JSON.parse(fs.readFileSync(chatIdsFilePath));
}

// Save chat IDs to file
const saveChatIds = () => {
  fs.writeFileSync(chatIdsFilePath, JSON.stringify(chatIds));
};

// Add chat ID to the list if not already present
const addChatId = (chatId) => {
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
    saveChatIds();
  }
};

// Listen for new chat members
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  addChatId(chatId);
});

const dailyReminderJob = new CronJob(
  "0 9 * * *",
  () => {
    chatIds.forEach((chatId) => {
      bot.sendMessage(chatId, "Good morning!");
      logMessage(`Sent daily reminder message to chat ID: ${chatId}`);
    });
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

process.on("unhandledRejection", (reason) => {
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

export { logMessage };

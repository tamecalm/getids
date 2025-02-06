import dotenv from "dotenv"; // Imports the dotenv package to load environment variables from a .env file.
dotenv.config(); // Loads environment variables from the .env file into process.env.
import process from "node:process"; // Imports the process module to access environment variables.

export default {
  botToken: process.env.BOT_TOKEN, // Retrieves the bot token from the environment variables.
};

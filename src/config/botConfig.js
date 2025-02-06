import("dotenv").config();
import process from "node:process";

export default {
  botToken: process.env.BOT_TOKEN,
};

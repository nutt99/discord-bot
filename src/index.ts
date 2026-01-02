import 'dotenv/config';
import { Bot } from './bot/Bot.js';
import { EventHandler } from './event/EventHandler.js';
import { Events } from 'discord.js';

const bot = new Bot(process.env.BOT_TOKEN);
const eventHandler = new EventHandler();

process.on("uncaughtException", err => {
    console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", reason => {
    console.error("🔥 Unhandled Rejection:", reason);
});

bot.startBot();

bot.botStreamListener(Events.MessageCreate, message => {
    eventHandler.eventProcess(message);
});

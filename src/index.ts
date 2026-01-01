import 'dotenv/config';
import { Bot } from './bot/Bot.js';
import { EventHandler } from './event/EventHandler.js';

const bot: Bot = new Bot(process.env.BOT_TOKEN);
const eventHandler = new EventHandler();

bot.startBot();

bot.botStreamListener("messageCreate", 
    (message) => eventHandler.eventProcess(message))

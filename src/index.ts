import 'dotenv/config';
import { Bot } from './bot/Bot.js';

const bot: Bot = new Bot(process.env.BOT_TOKEN);

bot.startBot();
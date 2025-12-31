import { Client, GatewayIntentBits, Message } from "discord.js";
import { Prefix } from '../config/Prefix.js';


export class Bot{
    public client: Client;
    protected token: string | undefined;
    private prefix: Prefix = new Prefix();

    constructor(token: string | undefined){
        
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        this.token = token;
    }

    startBot(): void{
        this.client.login(this.token);
    }

    onceBotStart(event: string, eventHandler: (...args: any[]) => void): void{
        this.client.once(event, eventHandler);
    }

    botStreamListener(event: string, eventHandler: (...args: any[]) => void) : void{
        this.client.on(event, eventHandler);
    }
}
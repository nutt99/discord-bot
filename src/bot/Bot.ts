import { Client, GatewayIntentBits, ClientEvents } from "discord.js";
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
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
            ]
        });

        this.token = token;
    }

    startBot(): void{
        this.client.login(this.token);
    }

    onceBotStart<K extends keyof ClientEvents>(
        event: K, 
        eventHandler: (...args: ClientEvents[K]) => void
    ): void{
        this.client.once(event, eventHandler);
    }

    botStreamListener<K extends keyof ClientEvents>(
        event: K, 
        eventHandler: (...args: ClientEvents[K]) => void
    ) : void{
        this.client.on(event, eventHandler);
    }
}
import { Message, VoiceBasedChannel } from "discord.js";
import { Prefix } from '../config/Prefix.js';
import { VoiceManager } from "../utils/VoiceManager.js";
import 'dotenv/config';
import { VoiceConnection } from "@discordjs/voice";


export class EventHandler{
    private prefix : Prefix = new Prefix();
    private vm: VoiceManager = new VoiceManager();

    public eventProcess(message: Message) : void{
        if(message.author.bot || !message.guild?.id) return;

        if(message.channel.id != process.env.CHANEL_ID) {
            console.log("chanel tidak valid")
            return;
        }

        if(message.content === this.prefix.test){
            message.reply("Hello Master");
        }

        if(message.content === this.prefix.joinVoice){
            this.joinVoice(message);
        }

        if(message.content === this.prefix.leaveVoice){
            this.leaveVoice(message);
        }
    }

    private joinVoice(message: Message){
        try{
            if (message.member?.voice.channel) {
                const voiceInstance = this.vm.joinChannel(message.member.voice.channel);
                message.reply("join ke voice chanel!");
            } 
            else{
                message.reply("Harap join ke voice terlebih dahulu master");
            }
        } catch(e){
            throw e;
        }
        
    }

    private leaveVoice(message: Message){
        this.vm.leaveChannel()
    }
}
import {joinVoiceChannel, VoiceConnection} from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';

export class VoiceManager{

    private connectionInstance?: VoiceConnection;

    public joinChanel(chanel: VoiceBasedChannel): VoiceConnection{
        const connection = joinVoiceChannel({
            channelId: chanel.id,
            guildId: chanel.guild.id,
            adapterCreator: chanel.guild.voiceAdapterCreator
        });

        this.connectionInstance = connection;
        return connection;
    }

    public leaveChanel(){
        try{
            if(this.connectionInstance){
                this.connectionInstance.destroy();
            }
            else {
                return false;
            }
            return true;
        } catch(e){
            return false;
        }
    }
}
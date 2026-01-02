import {
    EndBehaviorType,
    joinVoiceChannel,
    VoiceConnection,
} from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";
import prism from "prism-media";
import WebSocket from "ws";

export class VoiceManager {
    private connection?: VoiceConnection;
    private sttSockets = new Map<string, WebSocket>();

    public joinChannel(channel: VoiceBasedChannel) {
        this.connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false,
        });

        this.listenVoice();
    }

    public leaveChannel() {
        this.connection?.destroy();
        this.connection = undefined;

        for (const ws of this.sttSockets.values()) {
            ws.close();
        }
        this.sttSockets.clear();
    }

    private listenVoice() {
        if (!this.connection) return;

        const receiver = this.connection.receiver;

        receiver.speaking.on("start", userId => {
            console.log("🎤 User speaking:", userId);

            const ws = new WebSocket("ws://localhost:2700");
            this.sttSockets.set(userId, ws);

            ws.on("open", () => {
                console.log("🧠 STT connected for", userId);
            });

            ws.on("message", data => {
                const msg = JSON.parse(data.toString());
                if (msg.type === "final") {
                    this.handleFinalText(userId, msg.text);
                }
            });

            const opusStream = receiver.subscribe(userId, {
                end: {
                    behavior: EndBehaviorType.AfterSilence,
                    duration: 600,
                },
            });

            const decoder = new prism.opus.Decoder({
                rate: 48000,
                channels: 1,
                frameSize: 960,
            });

            opusStream
                .pipe(decoder)
                .on("data", chunk => {
                    if (ws.readyState !== WebSocket.OPEN) return;
                    ws.send(this.downSample(chunk));
                })
                .on("end", () => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ event: "end" }));
                    }

                    ws.close();
                    this.sttSockets.delete(userId);

                    decoder.destroy();
                    opusStream.destroy();
                    console.log("🛑 User stopped:", userId);
                });
        });
    }

    private downSample(buffer: Buffer): Buffer {
        const input = new Int16Array(buffer.buffer);
        const output = new Int16Array(Math.floor(input.length / 3));

        for (let i = 0, j = 0; i < input.length; i += 3, j++) {
            output[j] = input[i];
        }

        return Buffer.from(output.buffer);
    }

    private handleFinalText(userId: string, text: string) {
        console.log(`🧠 ${userId} said:`, text);
    }
}

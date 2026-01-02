export class Prefix{
    public basePrefix: string = "mira";
    public test: string = `${this.basePrefix} hello`;
    public joinVoice: string = `${this.basePrefix} join`;
    public leaveVoice: string = `${this.basePrefix} leave`;
    public startListening: string = `${this.basePrefix} listening`;
}
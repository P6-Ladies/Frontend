export class Message {
    private body: string;
    private received_at: number;
    private user_sent: boolean;
    
    constructor(body: string, user_sent: boolean, date:number) {
        this.body = body;
        this.received_at = date;
        this.user_sent = user_sent;
    }

    // Getters and Setters

    public getBody(): string {
        return this.body;
    }

    public setBody(body: string): void {
        this.body = body;
    }

    public getReceivedAt(): number {
        return this.received_at;
    }

    public setReceivedAt(received_at: number): void {
        this.received_at = received_at;
    }

    public isUserSent(): boolean {
        return this.user_sent;
    }

    public setUserSent(user_sent: boolean): void {
        this.user_sent = user_sent;
    }
}

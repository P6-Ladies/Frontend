import { Message } from "./Message";

export class ShownConversation {
    private title: string;
    private messages: Array<Message>;
    private completed: boolean;

    constructor(title: string, messages: Array<Message>, completed: boolean) {
        this.title = title;
        this.messages = messages;
        this.completed = completed;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getMessages(): Array<Message> {
        return this.messages;
    }

    public setMessages(messages: Array<Message>): void {
        this.messages = messages;
    }

    public isCompleted(): boolean {
        return this.completed;
    }

    public setCompleted(completed: boolean): void {
        this.completed = completed;
    }
}

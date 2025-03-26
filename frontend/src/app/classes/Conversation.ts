import { Message } from './Message'

export class Conversation {
    private id: number;
    private title: string;
    private startDate: number;
    private timeElapsed: number;
    private messageCount: number;
    private messages: Array<Message>;
    private tokenCount: number;
    private user: number;
    private agent: string;
    private scenario: string;
    private completed: boolean;

    constructor(id: number, title: string, user: number,agent: string, scenario: string,) {
        this.id = id;
        this.title = title;
        this.startDate = Date.now();
        this.timeElapsed = 0;
        this.messageCount = 0;
        this.messages = new Array<Message>();
        this.tokenCount = 0;
        this.user = user;
        this.agent = agent;
        this.scenario = scenario;
        this.completed = false;
    }

    // Getters and Setters

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getStartDate(): number {
        return this.startDate;
    }

    public setStartDate(startDate: number): void {
        this.startDate = startDate;
    }

    public getTimeElapsed(): number {
        return this.timeElapsed;
    }

    public setTimeElapsed(timeElapsed: number): void {
        this.timeElapsed = timeElapsed;
    }

    public getMessageCount(): number {
        return this.messageCount;
    }

    public setMessageCount(messageCount: number): void {
        this.messageCount = messageCount;
    }

    public addMessage(messageText: string, user_sent: boolean) : void {
        this.messages.push(new Message(messageText, user_sent,Date.now()));
    }

    public getMessages(): Array<Message> {
        return this.messages;
    }

    public setMessages(messages: Array<Message>): void {
        this.messages = messages;
    }

    public getTokenCount(): number {
        return this.tokenCount;
    }

    public setTokenCount(tokenCount: number): void {
        this.tokenCount = tokenCount;
    }

    public getUser(): number {
        return this.user;
    }

    public setUser(user: number): void {
        this.user = user;
    }

    public getAgent(): string {
        return this.agent;
    }

    public setAgent(agent: string): void {
        this.agent = agent;
    }

    public getScenario(): string {
        return this.scenario;
    }

    public setScenario(scenario: string): void {
        this.scenario = scenario;
    }

    public isCompleted(): boolean {
        return this.completed;
    }

    public setCompleted(completed: boolean): void {
        this.completed = completed;
    }
}
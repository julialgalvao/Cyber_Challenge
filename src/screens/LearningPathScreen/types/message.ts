export type Sender = 'bot' | 'user';

export interface Message {
    from: Sender;
    text: string;
}
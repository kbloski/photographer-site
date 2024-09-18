export enum MessageStatus {
    NEW = "new",
    READ = "read",
    ARCHIVED = "archived",
}

export interface MessageInterface {
    id: number;
    email: string;
    subject: string;
    status: MessageStatus.NEW | MessageStatus.READ | MessageStatus.ARCHIVED;
    message?: string;
    sender_id?: number;
    recipient_id?: number;
}

export type MessageType = MessageInterface;

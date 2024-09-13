export enum MessageStatus {
    NEW = 'new',
    READ = 'read',
    ARCHIVED = 'archived'
}

export interface MessageInterface {
    id: number;
    email: string;
    subject: string;
    status: MessageStatus;
    message?: string;
}

export type MessageType = MessageInterface
export enum MessageStatus {
    NEW = 'new',
    READ = 'read',
    ARCHIVED = 'archived'
}

export interface MessageType {
    id: number;
    email: string;
    subject: string;
    status: MessageStatus;
    message?: string;
}
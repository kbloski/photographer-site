export enum MessageStatus {
    NEW = 'new',
    READ = 'read',
    ARCHIVED = 'archived'
}

export interface MessageType {
    id?: number;
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    status?: MessageStatus;
}
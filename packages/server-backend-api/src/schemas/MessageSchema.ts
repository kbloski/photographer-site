import { z } from "zod";
import { MessageStatus } from "../types/MessageType";

export const MessageSchema = z.object({
    id: z.number().int().positive().optional(),
    email: z.string().min(5).max(128).email(),
    subject: z.string().max(124),
    message: z.string().max(1024).optional(),
    status: z.nativeEnum(MessageStatus).optional(),
    sender_id: z.number().int().positive().optional(),
    recipient_id: z.number().int().positive().optional(),
});

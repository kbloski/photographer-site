import { z } from "zod";

export const AlbumSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(2).max(64),
    description: z.string().max(1024).optional(),
    user_id: z.number().int().positive().optional(),
});

import { z } from "zod";

export const PhotoSchema = z.object({
    id: z.number().int().positive().optional(),
    url: z.string(),
    title: z.string().min(2).max(64),
    description: z.string().max(1024).optional(),
})
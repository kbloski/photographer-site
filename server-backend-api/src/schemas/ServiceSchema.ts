import { z } from "zod";

export const ServiceSchema = z.object({
    id: z.number().int().optional(),
    price: z.number().positive().max(999999999.99).optional(),
    name: z.string().min(2).max(64),
    description: z.string().max(1024).optional()
})
import { z } from "zod";
import { DBUserRoles, } from "../types/UserType";

export const UserSchema = z.object(
     {
        id: z.number().int().positive().optional(),
        role: z.nativeEnum(DBUserRoles).optional(),
        username: z.string().min(2).max(64),
        email: z.string().min(5).max(128).email(),
        password: z.string().min(4).max(128),
        phone: z.string().min(9).max(15).optional(),
     }
)


import { Request } from "express";
import { UserType } from "./UserType";

declare global {
    namespace Express {
        interface Request {
            user?: UserType
        }
    }
}
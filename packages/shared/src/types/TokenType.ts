import { UserType } from "./UserType";

export type TokenValidationResult = {
    valid: boolean;
    decoded?: UserType;
    error?: string;
    details?: string;
}

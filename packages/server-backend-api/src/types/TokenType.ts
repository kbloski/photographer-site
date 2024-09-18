import { UserType } from "./UserType";

interface TokenInterfejs {
    valid: boolean;
    decoded?: UserType;
    error?: string;
    details?: string;
}

export type TokenType = TokenInterfejs;

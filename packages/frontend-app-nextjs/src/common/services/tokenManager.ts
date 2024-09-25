import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN_KEY } from "../config";
import { TokenValidationResult } from "shared/src/types/TokenType";
import { UserType } from "packages/shared/src/types/UserType";

class WebTokenManger {
    setLocalToken(token: string) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    deleteLocalToken() {
        localStorage.setItem(AUTH_TOKEN_KEY, "");
    }

    getLocalToken() {
        return localStorage.getItem(AUTH_TOKEN_KEY) ?? "";
    }

    getTokenDecoded(token: string): TokenValidationResult {
        try {
            if (!token)
                return {
                    valid: false,
                    error: "Not found local token",
                };

            const decoded = jwtDecode(token);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                return {
                    valid: false,
                    error: "Token expired",
                };
            }

            return {
                valid: true,
                decoded: decoded as UserType,
            };
        } catch (err) {
            return { valid: false, error: "Token decoding failed" };
        }
    }

    getLocalTokenDecoded(): TokenValidationResult {
        try {
            const token = this.getLocalToken();

            if (!token)
                return {
                    valid: false,
                    error: "Not found local token",
                };
            const decoded = jwtDecode(token);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                return {
                    valid: false,
                    error: "Token expired",
                };
            }

            return {
                valid: true,
                decoded: decoded as UserType,
            };
        } catch (err) {
            return { valid: false, error: "Token decoding failed" };
        }
    }
}

export const webTokenManger = new WebTokenManger();

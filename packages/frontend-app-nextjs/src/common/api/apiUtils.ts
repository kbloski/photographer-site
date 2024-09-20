import { PUBLIC_API_URL } from "../config";

export function createApiUrl(endPoint: string = "/"): string {
    return `${PUBLIC_API_URL}${endPoint}`;
}

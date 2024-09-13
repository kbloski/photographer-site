import { ZodError } from "zod";

export function generateZodErrorString(zodError: ZodError): string {
    const errorMessages: string[] = [];

    // Iteracja po tablicy błędów
    for (const error of zodError.errors) {
        const path = error.path.join('.');
        errorMessages.push(`${path} - ${error.message}`);
    }

    return errorMessages.join(', ');
}

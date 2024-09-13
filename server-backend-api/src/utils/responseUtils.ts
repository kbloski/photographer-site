import { Request } from "express";
import { Response } from "express";
import { SuccessResponse } from "../types/ResponseTypes";

export async function sendError(
    req: Request,
    res: Response,
    errorCode: number = 500,
    errorMessage: string = 'Internal Server Error'
): Promise<void> {
    res.statusMessage = errorMessage;
    res.status(errorCode).json(
        {
            success: false,
            message: errorMessage,
            errorCode
        }
    )
}

export async function sendSuccess<T>(
    req: Request,
    res: Response,
    statusCode: number,
    data?: object,
    message?: string
): Promise<void> {
    res.status(statusCode).json({
        success: true,
        ...data,
        message
    } as SuccessResponse<T>);
}

import { Request } from "express";
import { Response } from "express";
import { SuccessResponse } from "../types/ResponseTypes";

export async function sendError(
    req: Request,
    res: Response,
    errorCode: number = 500,
    errorMessage?: string
): Promise<void> {
    let statusMessage : string; 
    switch (errorCode){
        case 301: 
            statusMessage = 'Moved Pernamently';
            break;
        case 302: 
            statusMessage = 'Found';
            break;
        case 304: 
            statusMessage = 'Not Modified';
            break;
        case 400: 
            statusMessage = 'Bad Request';
            break;
        case 401: 
            statusMessage = 'Unauthorized';
            break;
        case 403: 
            statusMessage = 'Forbidden';
            break;
        case 404: 
            statusMessage = 'Not Found';
            break;
        case 502: 
            statusMessage = 'Bad Gateway';
            break;
        case 404: 
            statusMessage = 'Service unavailable';
            break;
        default: // 500
            statusMessage = 'Internal Server Error'
    }
    
    const errMessage = `${statusMessage}: ${errorMessage ?? null}`
    res.statusMessage = errMessage ;
    res.status(errorCode).json(
        {
            success: false,
            message: errMessage,
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

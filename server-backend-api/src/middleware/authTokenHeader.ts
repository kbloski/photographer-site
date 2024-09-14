import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { sendError } from "../utils/responseUtils";
import { webTokenManager } from "../services/tokenManager";
import { userController } from "../controllers/controllers";
import { TokenType } from "../types/TokenType";

export async function authTokenHeader ( req : Request, res : Response, next : NextFunction){
    try {
        const authHeader = req?.headers['authorization'];
        const token : string  = authHeader?.split(' ')[1] ?? '';
        const tokenData : TokenType = webTokenManager.verifyWebToken( token );

        if (!tokenData.valid){
            // @ts-ignore
            req.user = null;
            return next();
        } 
        
        if (tokenData.decoded?.id){
            const userDb = await userController.getById( tokenData.decoded.id )
            // @ts-ignore
            req.user = userDb;
        }
        return next();
    } catch (err){
        sendError(req, res, 500);
    }
}
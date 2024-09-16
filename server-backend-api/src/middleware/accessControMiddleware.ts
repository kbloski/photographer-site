import { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/responseUtils";
import { rolePermissions } from "../permissions/rolePermissions";
import { UserRoles } from "../types/UserType";

export default function (req : Request, res : Response, next: NextFunction){
    try {
        // Development
        if (!rolePermissions.isResourseAllowedForRole( 
            req.user?.role, 
            req.path, 
            req.method
        )) return sendError(req, res, 403, `Forbidden: You do not have permission to access this resource.`);

        next();
    } catch(err) {
        console.log( err )
        return sendError(req, res, 500, 'Error Access')
    }
}
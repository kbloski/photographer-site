import { UserRoles } from "../types/UserType";

/*
// Album
/api/v1/album/all get
/api/v1/album/add post
/api/v1/album/:id get, patch, delete

// Message
/api/v1/message/all/inbox get 
/api/v1/message/:id get, patch, delete
/api/v1/message/sendTo/:recipientId post

// Photo
/api/v1/photo/list/add post
/api/v1/photo/list/all get
/api/v1/photo/list/:id get, delete
/api/v1/photo/list/for-album/:albumId` get

// Service
/api/v1/service/all get
/api/v1/service/add post
/api/v1/service/:id get, patch, delete

// User
/api/v1/user/all get
/api/v1/user/add post
/api/v1/user/:id get, patch, delete
*/

const userRoles  : {
    role: UserRoles, 
    allows: { resource: string, permission: string }[]
    }[]= [
    
]

const rolePermissions = {
    userRoles,
    addRoleParrents: function(targetRole : UserRoles, sourceRole : UserRoles){
        const targetData = this.userRoles.find( v => v.role === targetRole);
        const sourceData = this.userRoles.find( v => v.role === sourceRole);

        if (!targetData?.allows || !sourceData?.allows) return;
        targetData.allows = targetData?.allows.concat( sourceData.allows );
    },
    isResourseAllowedForRole: function ( userRole: UserRoles | undefined, resource: string, method: string ){
        // if (!userRole) userRole = guest

        if (userRole === UserRoles.ADMIN) return true;

        const roleData = this.userRoles.find( v => v.role == userRole);
        if (!roleData) return false;
        
        const resourceData = roleData.allows.find( v => v.resource === resource);
        if(!resourceData || !resourceData?.permission) return false;

        if (!Array.isArray( resourceData.permission)){
            if (
                resourceData.permission === '*' ||
                resourceData.permission === method
            ) return true;
        } else {
            if ( 
                resourceData.permission.find( v => v === '*') ||
                resourceData.permission.find( v => v === method)
            ) return true;
        } 
        return false;
    }
}







export {
    rolePermissions
}
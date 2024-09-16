import { UserRoles, UserType } from "../types/UserType";
import { loadJsonFileSync } from "../utils/filesOperation";
import path from "node:path";

type AllowsType = {
    resource: string;
    methods: string[];
};

type UserRolesType = {
    role: UserRoles | unknown;
    allows: AllowsType[];
};

const pathFilePermission = path.join(__dirname, '../../config', "./permission-config.json");
const userRoles: UserRolesType[] = loadJsonFileSync(pathFilePermission);

const rolePermissions = {
    userRoles,
    addRoleParrents: function (targetRole: UserRoles | string, sourceRole: UserRoles | string) {
        const targetData = this.userRoles.find((v) => v.role === targetRole);
        const sourceData = this.userRoles.find((v) => v.role === sourceRole);

        if (!targetData?.allows || !sourceData?.allows) return;
        targetData.allows = Array.from(
            new Set(targetData?.allows.concat(sourceData.allows))
        );
    },
    isResourseAllowedForRole: function (
        userRole: UserRoles | undefined,
        resource: string,
        method: string
    ) {
        // RoleData
        let roleData: UserRolesType = {
            role: "guest",
            allows:
                this.userRoles.find((v) => v.role === "guest")?.allows ?? [],
        };
        if (userRole)
            roleData = this.userRoles.find(
                (v) => v.role == userRole
            ) as UserRolesType;

        // Resource
        const resourceData = roleData.allows.find(
            (v) => v.resource === resource || v.resource === "*"
        );
        if (!resourceData || !resourceData?.methods) return false;

        // Check access control
        if (roleData.role === String(UserRoles.ADMIN)) return true;
        if (
            resourceData.methods.find((v) => v === "*") ||
            resourceData.methods.find(
                (v) => v.toUpperCase() === method.toUpperCase()
            )
        )
            return true;

        return false;
    },
};

rolePermissions.addRoleParrents( UserRoles.CLIENT, 'guest' )

export { rolePermissions };

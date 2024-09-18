import { UserRoles, UserType } from "../types/UserType";
// import { loadJsonFileSync } from "../utils/filesOperation";
import path from "node:path";
import { accessPermissions } from "../config/permission-config";
import { PermissionType } from "../types/PermissionType";

const pathFilePermission = path.join(
    __dirname,
    "../../config",
    "./permission-config.json"
);
const userRoles: PermissionType[] = accessPermissions;

const rolePermissions = {
    userRoles,
    addRoleParrents: function (
        targetRole: UserRoles | string,
        sourceRole: UserRoles | string
    ) {
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
        let roleData: PermissionType = {
            role: "guest",
            allows:
                this.userRoles.find((v) => v.role === "guest")?.allows ?? [],
        };
        if (userRole)
            roleData = this.userRoles.find(
                (v) => v.role == userRole
            ) as PermissionType;

        // Resource
        const resourceData = roleData.allows.find((v) => {
            // String
            if (typeof v.resource === "string") {
                if (v.resource === resource || v.resource === "*") return v;
            }

            // RegExp
            if (typeof v.resource !== "string") {
                if (v.resource.test(String(resource))) return v;
            }
        });
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

rolePermissions.addRoleParrents(UserRoles.CLIENT, "guest");

export { rolePermissions };

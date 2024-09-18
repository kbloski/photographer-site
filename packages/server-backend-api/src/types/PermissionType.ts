export type PermissionType = {
    role: string;
    allows: {
        resource: string | RegExp,
        methods: string[]
    }[]
}
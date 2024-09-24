import { PermissionType } from "../types/PermissionType";

export const accessPermissions: PermissionType[] = [
    {
        role: "admin",
        allows: [{ resource: "*", methods: ["*"] }],
    },
    {
        role: "client",
        allows: [
            { resource: "/api/v1/message/all/inbox", methods: ["get"] },
            {
                resource: /^\/api\/v1\/message\/sendTo\/(\d+)$/, // "/api/v1/message/sendTo/:recipientId"
                methods: ["post"],
            },
        ],
    },
    {
        role: "guest",
        allows: [
            { resource: /^\/api\/v1\/album\/(\d+)$/, methods: ["get"] }, // "/api/v1/album/:id"
            { resource: "/api/v1/album/all", methods: ["get"] },
            { resource: "/api/v1/photo/list/all", methods: ["get"] },
            // { resource: /^\/api\/v1\/photo\/(\d+)$/, methods: ["*"] }, // /api/v1/photo/:id
            {
                resource: /^\/api\/v1\/photo\/list\/for-album\/(\d+)$/, //"/api/v1/photo/list/for-album/:albumId"
                methods: ["get"],
            },
            { resource: "/api/v1/service/all", methods: ["get"] },
            { resource: "/api/v1/user/all", methods: ["get"] },
            { resource: "/api/login", methods: ["post"] },
            { resource: "/", methods: ["get"] },
            {
                resource: '/api/v1/reaction/add',
                methods: ["post"],
            }, 
            {
                resource: '/api/v1/reaction/all',
                methods: ["get"],
            }, 
            {
                resource: '/api/login',
                methods: ["post"],
            }, 
            { resource: '*', methods: ['*']}
        ],
    },
];

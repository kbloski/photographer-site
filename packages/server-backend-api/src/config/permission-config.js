"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessPermission = void 0;
exports.accessPermission = [
    {
        "role": "admin",
        "allows": [
            { "resource": "*", "methods": ["*"] }
        ]
    },
    {
        "role": "client",
        "allows": [
            { "resource": "/api/v1/message/all/inbox", "methods": ["get"] },
            { "resource": "/api/v1/message/sendTo/:recipientId", "methods": ["post"] }
        ]
    },
    {
        "role": "guest",
        "allows": [
            { "resource": "/api/v1/album/:id", "methods": ["get"] },
            { "resource": "/api/v1/album/all", "methods": ["get"] },
            { "resource": "/api/v1/photo/list/all", "methods": ["get"] },
            { "resource": "/api/v1/photo/:id", "methods": ["get"] },
            { "resource": "/api/v1/photo/list/for-album/:albumId", "methods": ["get"] },
            { "resource": "/api/v1/service/all", "methods": ["get"] },
            { "resource": "/api/v1/user/all", "methods": ["get"] },
            { "resource": "/api/login", "methods": ["post"] },
            { "resource": "/api/v1/photo/id", "methods": ["get"] }
        ]
    }
];

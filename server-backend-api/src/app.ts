// Cel: Konfiguracja i inicjalizacja aplikacji.

import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './config';
import { authTokenHeader } from './middleware/authTokenHeader';
import accessControMiddleware from './middleware/accessControMiddleware';

const app = express();

// Middleware CORS
app.use(cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Development -----
        callback(null, true) 
        // if (origin && ALLOWED_ORIGINS.includes(origin) || !origin) {
        //     callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'), false);
        // }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use( express.urlencoded());
app.use( express.json() );
app.use( express.static('./public'))

app.use( authTokenHeader );
app.use( accessControMiddleware );

export default app;
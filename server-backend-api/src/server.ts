import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS, API_PORT } from './config/config';

const app = express();

// Middleware CORS
app.use(cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (origin && ALLOWED_ORIGINS.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use( express.json());
app.use( express.static('./public'))

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Server started at PORT " + API_PORT
    })
})

app.listen(API_PORT, () => {
    console.log('Server running on port ' + API_PORT);
});

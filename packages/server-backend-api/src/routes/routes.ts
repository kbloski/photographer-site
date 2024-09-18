import { Express } from "express";
import userRouter from "./userRoutes";
import albumRouter from "./albumRoutes";
import photoRouter from "./photoRoutes";
import serviceRouter from "./serviceRoutes";
import messageRouter from "./messageRoutes";
import authRouter from "./authRoutes";
import reactionRouter from './reactionRoutes';

const routersArr = [
    userRouter,
    albumRouter,
    photoRouter,
    serviceRouter,
    messageRouter,
    authRouter,
    reactionRouter
];

const registerRoutes = (app: Express) => {
    for (const router of routersArr) {
        app.use(router);
    }
};

export default registerRoutes;

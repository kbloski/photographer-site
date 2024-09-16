import { Express } from "express";
import userRouter from "./userRoutes";
import albumRouter from "./albumRoutes";
import photoRouter from "./photoRoutes";
import serviceRouter from "./serviceRoutes";
import messageRouter from "./messageRoutes";
import authRouter from "./authRoutes";

const routersArr = [
    userRouter,
    albumRouter,
    photoRouter,
    serviceRouter,
    messageRouter,
    authRouter,
];

const registerRoutes = (app: Express) => {
    for (const router of routersArr) {
        app.use(router);
    }
};

export default registerRoutes;

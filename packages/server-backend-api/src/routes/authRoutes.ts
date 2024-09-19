import express from "express";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { UserSchema } from "shared/src/schemas/UserSchema";
import { z } from "zod";
import { generateZodErrorString } from "../utils/zodErrorsUtils";
import { userController } from "../controllers/controllers";
import { UserType } from "shared/src/types/UserType";
import { webTokenManager } from "../services/tokenManager";

const router = express.Router();

router.post("/api/login", async (req, res) => {
    try {
        const userData = (req.body ?? {}) as UserType;
        if (!userData.password || !userData.email)
            return sendError(req, res, 401, "Invalid user email or password");
        UserSchema.partial().parse(userData);

        const userExist = await userController.getByEmail(req.body.email);
        if (!userExist) return sendError(req, res, 401, "Invalid user email");

        const resultValid = await userController.validPassword(
            userData.password,
            userExist
        );
        if (!resultValid) return sendError(req, res, 401, "Invalid password");

        const payloudData: Partial<UserType> = userExist.dataValues;
        delete payloudData.password;

        const token = await webTokenManager.createWebtoken(
            payloudData as UserType
        );
        sendSuccess(req, res, 200, { token });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return sendError(req, res, 400, generateZodErrorString(err));
        }
        sendError(req, res, 500);
    }
});

export default router;

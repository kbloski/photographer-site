import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { userController } from "../controllers/controllers";
import { UserType } from "shared/src/types/UserType";
import { UserSchema } from "../schemas/UserSchema";
import { z } from "zod";
import { generateZodErrorString } from "../utils/zodErrorsUtils";
import { isNumberString } from "../utils/validation";

const router = express.Router();
const resource = "user";

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const usersDb: UserType[] | null = await userController.getAll();

        if (!usersDb || !usersDb.length) return sendError(req, res, 404);
        sendSuccess(req, res, 200, { users: usersDb });
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number(id)) return sendError(req, res, 400, "id: bad id");

        const userDb = await userController.getById(Number(id));
        if (!userDb) sendError(req, res, 404);

        sendSuccess(req, res, 200, { user: userDb });
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

router.post(apiUrlBuilderV1.createUrlAdd(resource), async (req, res) => {
    try {
        delete req.body.id;
        const userData: Partial<Omit<UserType, "id">> = req.body ?? {};
        UserSchema.parse(userData);

        const userExist = await userController.getByEmail(
            userData.email as string
        );
        if (userExist)
            return sendError(
                req,
                res,
                403,
                `User with email ${userExist.email} exist in database`
            );

        const userDb = await userController.create(userData as UserType);

        sendSuccess(req, res, 201, { created: true, user: userDb });
    } catch (err) {
        if (err instanceof z.ZodError)
            return sendError(req, res, 400, generateZodErrorString(err));
        sendError(req, res);
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        delete req.body.id;
        const updatedUser: UserType = req.body;
        UserSchema.partial().parse(updatedUser);

        const updated = await userController.updateById(
            Number(id),
            updatedUser
        );

        sendSuccess(req, res, 204);
    } catch (err) {
        if (err instanceof z.ZodError)
            return sendError(req, res, 400, generateZodErrorString(err));
        sendError(req, res);
    }
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");
        const deleted: number = await userController.deleteById(Number(id));
        sendSuccess(req, res, 204);
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

export default router;

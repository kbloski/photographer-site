import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { userController } from "../controllers/controllers";
import { UserType } from "../types/UserType";
import { error } from "console";
import { UserSchema } from "../schemas/UserSchema";
import { z, ZodError } from "zod";
import { generateZodErrorString } from "../utils/zodErrorsUtils";
import { send } from "process";
import { isNumberString } from "../utils/validation";

const router = express.Router();
const resource = "user";

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const usersDb: UserType[] | null = await userController.getAll();
        sendSuccess(req, res, 200, { users: usersDb });
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number(id)) return sendError(req, res, 400, "Bad request");

        const userDb = await userController.getById(Number(id));
        if (!userDb) sendError(req, res, 404, "Not found");

        sendSuccess(req, res, 200, { user: userDb });
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

router.post(apiUrlBuilderV1.createUrlAdd(resource), async (req, res) => {
    try {
        delete req.body.id;
        const userData: Partial<Omit<UserType, "id">> = req.body;
        UserSchema.parse(userData);

        const userDb = await userController.create(userData as UserType);

        sendSuccess(req, res, 201, { created: true, user: userDb });
    } catch (err) {
        if (err instanceof z.ZodError)
            return sendError(
                req,
                res,
                400,
                `Bad request: ${generateZodErrorString(err)}`
            );
        sendError(req, res);
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "Bad request");

        delete req.body.id;
        const updatedUser: UserType = req.body;
        UserSchema.partial().parse(updatedUser);

        const updated = await userController.updateById(
            Number(id),
            updatedUser
        );

        sendSuccess(req, res, 204, { updated });
    } catch (err) {
        if (err instanceof z.ZodError)
            return sendError(
                req,
                res,
                400,
                `Bad request: ${generateZodErrorString(err)}`
            );
        sendError(req, res);
    }
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "Bad request");
        const deleted: number = await userController.deleteById(Number(id));
        sendSuccess(req, res, 200, { deleted: deleted });
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

export default router;

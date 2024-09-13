import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { userController } from "../controllers/controllers";
import { UserType } from "../types/UserType";

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

router.post(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    // zapisz zasób na serwerze
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    // Update zasobu
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number(id)) return sendError(req, res, 400, "Bad request");
        const deleted : number = await userController.deleteById(Number(id));
        sendSuccess(req, res, 200, { deleted: deleted})
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

export default router;

import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { MessageStatus, MessageType } from "../types/MessageType";
import {
    messageController,
    serviceController,
    userController,
} from "../controllers/controllers";
import { isNumberString } from "../utils/validation";
import { generateZodErrorString } from "../utils/zodErrorsUtils";
import { z } from "zod";
import { MessageSchema } from "../schemas/MessageSchema";

const router = express.Router();
const resource = "message";

router.get(
    apiUrlBuilderV1.createCustomUrl(`${resource}/all/inbox`),
    async (req, res) => {
        try {
            if (!req.user?.id)
                return sendError(
                    req,
                    res,
                    401,
                    "Middleware authorization not authenticate user"
                );

            let statusParam: MessageStatus | undefined;
            const { status } = req.query;
            switch (status) {
                case "new":
                    statusParam = MessageStatus.NEW;
                    break;
                case "read":
                    statusParam = MessageStatus.READ;
                    break;
                case "archived":
                    statusParam = MessageStatus.ARCHIVED;
                    break;
                default:
                    statusParam = undefined;
            }

            const messagesDb: MessageType[] | null =
                await messageController.getAllByRecipientId(
                    Number(req.user.id),
                    statusParam
                );

            sendSuccess(req, res, 200, { messages: [messagesDb] });
        } catch (err) {
            console.log(err);
            sendError(req, res, 500);
        }
    }
);

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        const messageDb: MessageType | null = await messageController.getById(
            Number(id)
        );
        if (!messageDb) return sendError(req, res, 404);

        sendSuccess(req, res, 200, { message_data: messageDb });
    } catch (err) {
        sendError(req, res, 500);
    }
});

router.post(
    apiUrlBuilderV1.createCustomUrl(`${resource}/sendTo/:recipientId`),
    async (req, res) => {
        try {
            const { recipientId } = req.params;
            if (!isNumberString(recipientId))
                return sendError(
                    req,
                    res,
                    400,
                    "recipientId - bad recipient id"
                );

            if (req.body.id) delete req.body?.id;
            const messageData: Omit<MessageType, "id"> = req.body;

            MessageSchema.parse(messageData);
            const messageDb = await messageController.create(messageData);
            if (!messageDb) return sendError(req, res, 403);

            // Authorized user data
            if (req.user?.id) {
                const senderDb = await userController.getById(req.user.id);

                if (!senderDb) return;
                await messageController.setSender(messageDb, senderDb);
                await messageController.updateById(messageDb.id, {
                    email: senderDb.email,
                });
            }

            const recipientDb = await userController.getById(
                Number(recipientId)
            );
            if (!recipientDb)
                return sendError(req, res, 404, "Sender dont exits");

            await messageController.setRecipient(messageDb, recipientDb);

            sendSuccess(req, res, 204);
        } catch (err) {
            if (err instanceof z.ZodError)
                return sendError(req, res, 400, generateZodErrorString(err));
            sendError(req, res, 500);
        }
    }
);

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id - bad id");

        delete req.body.id;
        const updateData = req.body;
        MessageSchema.partial().parse(updateData);

        const update = await messageController.updateById(
            Number(id),
            updateData
        );
        sendSuccess(req, res, 204);
    } catch (err) {
        if (err instanceof z.ZodError)
            return sendError(req, res, 400, generateZodErrorString(err));
        sendError(req, res, 500);
    }
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        await serviceController.deleteById(Number(id));
        sendSuccess(req, res, 204);
    } catch (err) {
        sendError(req, res, 500);
    }
});

export default router;

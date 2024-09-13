import express from 'express';
import { apiUrlBuilderV1 } from '../services/ApiUrlBuilder';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { MessageType } from '../types/MessageType';
import { messageController, serviceController } from '../controllers/controllers';
import { isNumberString } from '../utils/validation';
import { generateZodErrorString } from '../utils/zodErrorsUtils';
import { z } from 'zod';
import { MessageSchema } from '../schemas/MessageSchema';

const router = express.Router();
const resource = 'message';

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const messagesDb : MessageType[] | null = await messageController.getAll();
        if (!messagesDb || ![].length) return sendError(req, res, 404);
        sendSuccess(req, res, 200, { messages: messagesDb});
    } catch (err){
        sendError(req, res, 500);   
    }
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const {id} = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, 'id: bad id');

        const messageDb : MessageType | null = await messageController.getById(Number(id));
        if (!messageDb) return sendError(req, res, 404);

        sendSuccess(req, res, 200, { message_data: messageDb });
    } catch (err){
        sendError(req, res, 500);
    }
});

router.post(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        delete req.body.id;
        const messageData : Omit<MessageType, 'id'>  = req.body;

        MessageSchema.parse(messageData);
        await messageController.create( messageData );
        sendSuccess(req, res, 204);
    } catch (err){
        if (err instanceof z.ZodError) return sendError(req, res, 400, generateZodErrorString(err));
        sendError(req, res, 500)
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const {id} = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, 'id - bad id');
    
        delete req.body.id;
        const updateData = req.body;
        MessageSchema.partial().parse(updateData);

        const update = await messageController.updateById(Number(id), updateData);
        sendSuccess(req, res, 204)
    } catch (err){
        if (err instanceof z.ZodError) return sendError(req, res, 400, generateZodErrorString(err));
        sendError(req, res, 500)
    }
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const {id} = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, 'id: bad id');

        await serviceController.deleteById( Number(id) );
        sendSuccess(req, res, 204);
    } catch (err){
        sendError(req, res, 500);
    }
});

export default router;
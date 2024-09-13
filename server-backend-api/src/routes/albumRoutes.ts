import express from 'express';
import { apiUrlBuilderV1 } from '../services/ApiUrlBuilder';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { AlbumType } from '../types/AlbumType';
import { albumController } from '../controllers/controllers';
import { isNumberString } from '../utils/validation';
import { z } from 'zod';
import { generateZodErrorString } from '../utils/zodErrorsUtils';
import { AlbumSchema } from '../schemas/AlbumSchema';

const router = express.Router();
const resource = 'album';

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const albumsDb : AlbumType[] | null = await albumController.getAll();

        sendSuccess(req, res, 200, { albums: albumsDb});
    } catch (err){
        sendError(req, res);
    } 
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const {id} = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, 'Bad request');
        const albumDb : AlbumType | null = await albumController.getById(Number(id));
        sendSuccess(req, res, 200, { album: albumDb});
    } catch (err){
        sendError(req, res);
    }
});

router.post(apiUrlBuilderV1.createUrlAdd(resource), async (req, res) => {
    try {
        delete req.body.id;
        const albumData : Omit<AlbumType, 'id'> = req.body;

        AlbumSchema.parse(albumData);

        const albumDb = await albumController.create(albumData);
        sendSuccess(req, res, 200, { album: albumDb});
    } catch (err){
        if (err instanceof z.ZodError) return sendError(req,res, 400, `Bad request: ${generateZodErrorString(err)}`);
        sendError(req, res);
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    const { id } = req.params;
    if (!isNumberString(id)) return sendError(req, res, 400, 'Bad Request');

    delete req.body.id;
    const albumUpdate : Omit<AlbumType, 'id'> = req.body;
    AlbumSchema.partial().parse(albumUpdate);

    const update = await albumController.updateById(Number(id), albumUpdate)
    sendSuccess(req, res, 204)
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, 'Bad request');

        await albumController.deleteById(Number(id));
        sendSuccess(req, res, 204)
    } catch (err){
        sendError(req, res);
    }
});

export default router;
import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { AlbumType } from "shared/src/types/AlbumType";
import { albumController, photoController } from "../controllers/controllers";
import { isNumberString } from "../utils/validation";
import { z } from "zod";
import { generateZodErrorString } from "../utils/zodErrorsUtils";
import { AlbumSchema } from "shared/src/schemas/AlbumSchema";
import { sequelize } from "../utils/db";

const router = express.Router();
const resource = "album";

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const albumsDb: AlbumType[] | null = await albumController.getAll();

        if (!albumsDb || !albumsDb.length ) return sendError(req, res, 404);
        sendSuccess(req, res, 200, { albums: albumsDb });
    } catch (err) {
        sendError(req, res);
    }
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");
        const albumDb: AlbumType | null = await albumController.getById(
            Number(id)
        );

        if (!albumDb) return sendError(req, res, 404);
        sendSuccess(req, res, 200, { album: albumDb });
    } catch (err) {
        sendError(req, res);
    }
});

router.post(apiUrlBuilderV1.createUrlAdd(resource), async (req, res) => {
    try {
        delete req.body.id;
        const albumData: Omit<AlbumType, "id"> = req.body;

        if (!req.user) return sendError(req, res, 401);
        albumData.user_id = req.user.id;

        AlbumSchema.parse(albumData);

        const albumDb = await albumController.create(albumData);
        sendSuccess(req, res, 201, { album: albumDb });
    } catch (err) {
        if (err instanceof z.ZodError)
            return sendError(req, res, 400, generateZodErrorString(err));
        sendError(req, res);
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    const { id } = req.params;
    if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

    delete req.body.id;
    const albumUpdate: Omit<AlbumType, "id"> = req.body;
    AlbumSchema.partial().parse(albumUpdate);

    const update = await albumController.updateById(Number(id), albumUpdate);
    sendSuccess(req, res, 204);
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        await photoController.deleteAllByAlbumId(Number(id));
        await albumController.deleteById(Number(id));

        await transaction.commit();
        sendSuccess(req, res, 204);
    } catch (err) {
        await transaction.rollback();
        sendError(req, res);
    }
});

export default router;

import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { deleteFile, upload, uploadPath } from "../utils/filesOperation";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { PhotoType } from "shared/src/types/PhotoType";
import { photoController, userController } from "../controllers/controllers";
import { isNumberString } from "../utils/validation";
import { sequelize } from "../utils/db";
import { FileUploadType } from "../types/FileUploadType";
import path from "path";
import { z } from "zod";
import { generateZodErrorString } from "../utils/zodErrorsUtils";
import { PhotoSchema } from "../schemas/PhotoSchema";

const router = express.Router();
const resource = "photo";

router.get(
    apiUrlBuilderV1.createCustomUrl(`${resource}/list/all`),
    async (req, res) => {
        try {
            const photosDb: PhotoType[] | null = await photoController.getAll();
            if (!photosDb || ![].length) return sendError(req, res, 404);

            sendSuccess(req, res, 200, { photos: photosDb });
        } catch (err) {
            sendError(req, res, 500);
        }
    }
);

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id - bad id");

        const photoDb: PhotoType | null = await photoController.getById(
            Number(id)
        );
        if (!photoDb) return sendError(req, res, 404);

        res.status(200).sendFile(path.resolve(photoDb.url));
    } catch (err) {
        sendError(req, res, 500);
    }
});

router.get(
    apiUrlBuilderV1.createCustomUrl(`${resource}/list/for-album/:albumId`),
    async (req, res) => {
        try {
            const { albumId } = req.params;
            if (!isNumberString(albumId))
                return sendError(req, res, 400, "Bad album id");

            const photosDb = await photoController.getAllByAlbumId(albumId);
            if (!photosDb) return sendError(req, res, 404);

            sendSuccess(req, res, 200, { albumPhotos: photosDb });
        } catch (err) {
            sendError(req, res, 500);
        }
    }
);

router.post(
    apiUrlBuilderV1.createUrlAdd(resource),
    upload.single("photo"),
    async (req, res) => {
        const fileUpload = (req.file ?? {}) as FileUploadType;
        const transaction = await sequelize.transaction();

        try {
            const photoData = req.body;
            PhotoSchema.partial().parse(photoData);

            const photoDb = await photoController.create({
                url: `${uploadPath}/${fileUpload.filename}`,
                title: photoData?.title ?? fileUpload.filename,
                description:
                    photoData.description ??
                    `About photo ${fileUpload.filename}`,
            });

            await transaction.commit();
            sendSuccess(req, res, 201);
        } catch (err) {
            const filePath = `${uploadPath}/${fileUpload.filename}`;
            deleteFile(filePath);

            transaction.rollback();
            if (err instanceof z.ZodError) {
                return sendError(req, res, 400, generateZodErrorString(err));
            }
            sendError(req, res, 500);
        }
    }
);

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id - bad id");

        const photoDb = await photoController.getById(Number(id));
        if (!photoDb) return sendError(req, res, 404);

        const pathFile = photoDb?.url;

        deleteFile(pathFile);
        await photoController.deleteById(photoDb.id);

        await transaction.commit();
        sendSuccess(req, res, 204);
    } catch (err) {
        await transaction.rollback();
        sendError(req, res, 500);
    }
});

export default router;

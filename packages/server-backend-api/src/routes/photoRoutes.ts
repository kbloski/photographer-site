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
import { PhotoSchema } from "shared/src/schemas/PhotoSchema";
import { Photo } from "../models/PhotoModel";

const router = express.Router();
const resource = "photo";

function deletePhotoUrl( photoDb : Photo ){
    const photoData : Partial<PhotoType> = photoDb.dataValues;
    delete photoData.url;
    return photoData;
}

router.get(
    apiUrlBuilderV1.createCustomUrl(`${resource}/list/all`),
    async (req, res) => {
        try {
            const photosDb: Photo[] | null = await photoController.getAll();
            if (!photosDb || !photosDb.length) return sendError(req, res, 404);

            const dataToSend = photosDb.map( photo => deletePhotoUrl(photo) )

            sendSuccess(req, res, 200, { photos: dataToSend });
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

        res.status(200).sendFile(path.resolve(photoDb.url), (err) =>{
            return sendError(req, res, 404)
        });
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

            const photosDb = await photoController.getAllByAlbumId(Number(albumId));
            if (!photosDb) return sendError(req, res, 404);

            const dataToSend = photosDb.map( photo => deletePhotoUrl(photo) )

            sendSuccess(req, res, 200, { albumPhotos: dataToSend });
        } catch (err) {
            sendError(req, res, 500);
        }
    }
);

router.post(
    apiUrlBuilderV1.createCustomUrl(`${resource}/add/list`),
    upload.array("images"),
    async (req, res) => {
        const filesUpload = (req.files ?? []) as FileUploadType[];
        const transaction = await sequelize.transaction();

        try {
            if (filesUpload.length === 0) return sendError(req, res, 400, "The images was not sent in the variable 'images.' ");

            for (const photo of filesUpload){
                await photoController.create({
                    url: `${uploadPath}/${photo.filename}`,
                    title: photo.filename,
                    description: `Image from gallery`
                })
            }
          

            await transaction.commit();
            sendSuccess(req, res, 201);
        } catch (err) {
            transaction.rollback();

            for(const photo of filesUpload){
                const filePath = `${uploadPath}/${photo.filename}`;
                deleteFile(filePath);
            }

            if (err instanceof z.ZodError) {
                return sendError(req, res, 400, generateZodErrorString(err));
            }
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
            console.log( fileUpload )
            if ( Object.keys(fileUpload).length === 0) return sendError(req, res, 400, "The photo was not sent in the variable 'photo.' ");

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

router.patch(
    apiUrlBuilderV1.createUrlWithId(resource),
    upload.single("photo"),
    async (req, res) => {
        const updateFile = req.file;
        const transaction = await sequelize.transaction();

        try {
            const { id } = req.params;
            if (!isNumberString(id)) return sendError(req, res, 400, "Id must be number");

            const photoDb = await photoController.getById(Number(id));
            if (!photoDb) return sendError(req, res, 404);

            const updatePhotoDbData : Partial<PhotoType> = req.body;
            delete updatePhotoDbData?.id;
            delete updatePhotoDbData.url;

            const oldUrl : string = photoDb.url;
            if ( updateFile ) {
                updatePhotoDbData.url = `${uploadPath}/${updateFile.filename}`;
            }

            PhotoSchema.partial().parse(updatePhotoDbData);

            try {
                const updated = await photoController.updateById(Number(id), updatePhotoDbData );

                if (!updated) return sendError(req, res, 409);
                
                deleteFile( oldUrl );
                await transaction.commit();
            } catch (err){
                await transaction.rollback();
                throw new Error('Error update to database')
            }
            
            sendSuccess(req, res,200)
        } catch (err){
            await transaction.rollback();
            if (err instanceof z.ZodError){
                return sendError(req, res, 400, generateZodErrorString(err));
            }
            sendError(req, res, 500)
        }
})

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

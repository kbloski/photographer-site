import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { isNumberString } from "../utils/validation";
import {
    albumController,
    photoController,
    reactionController,
} from "../controllers/controllers";
import { ReactionEmotions, ReactionType } from "shared/src/types/ReactionType";

const router = express.Router();
const resource = "reaction";

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const { photoId, albumId } = req.query;

        if (
            (!photoId && !albumId) ||
            (photoId && !isNumberString(String(photoId))) ||
            (albumId && !isNumberString(String(albumId)))
        )
            return sendError(
                req,
                res,
                400,
                "Require query params photoId or albumId type number"
            );

        let reactionsDb: [] = [];
        if (photoId) {
            const photoDb = await photoController.getById(Number(photoId));
            if (!photoDb)
                return sendError(
                    req,
                    res,
                    404,
                    "Photo don't exist in database"
                );

            reactionsDb = await reactionController.countByPhotoId(
                Number(photoId)
            );
        }

        if (albumId) {
            const albumDb = await albumController.getById(Number(albumId));
            if (!albumDb)
                return sendError(
                    req,
                    res,
                    404,
                    "Album don't exist in database"
                );

            reactionsDb = await reactionController.countByAlbumId(
                Number(albumId)
            );
        }

        sendSuccess(req, res, 200, { reactions: reactionsDb });
    } catch (err) {
        sendError(req, res);
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        const updateData: Partial<ReactionType> = req.body;
        const reactionDb = await reactionController.getById(Number(id));
        if (!reactionDb) return sendError(req, res, 404);

        if (req.user) updateData.user_id = req.user.id;

        const updated = await reactionController.updateById(
            Number(id),{
                reaction: updateData.reaction
            } as Partial<ReactionType>
        );

        sendSuccess(req, res, 204)
    } catch (err) {
        sendError(req, res, 500);
    }
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        await reactionController.deleteById(Number(id));

        sendSuccess(req, res, 204);
    } catch (err) {
        sendError(req, res);
    }
});

export default router;

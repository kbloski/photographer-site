import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { isNumberString } from "../utils/validation";
import {
    albumController,
    photoController,
    reactionController,
} from "../controllers/controllers";
import { Emotions, ReactionType } from "shared/src/types/ReactionType";

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

router.get(
    apiUrlBuilderV1.createCustomUrl(`${resource}/all/forUser`),
    async (req, res) => {
        try {
            if (!req.user) return sendError(req, res, 401);

            const userReactions = await reactionController.getByUserId(
                Number(req.user.id)
            );
            if (!userReactions.length) return sendError(req, res, 404);

            sendSuccess(req, res, 200, { reactions: userReactions });
        } catch (err) {
            sendError(req, res, 500);
        }
    }
);

// /api/v1/reaction?photoId={photoId}&albumId={albumId}
router.get(apiUrlBuilderV1.createCustomUrl(resource), async (req, res) => {
    try {
        if (!req.user) return sendError(req, res, 401);

        // Check correct query
        const { photoId, albumId } = req.query;
        if (
            (!photoId && !albumId) ||
            (photoId && albumId) ||
            (photoId && !isNumberString(String(photoId))) ||
            (albumId && !isNumberString(String(albumId)))
        )
            return sendError(
                req,
                res,
                400,
                "Require one of query params  [photoId or albumId] type number"
            );

        const whereOption: Partial<ReactionType> = { user_id: req.user.id };
        if (albumId) whereOption.album_id = Number(albumId);
        else if (photoId) whereOption.photo_id = Number(photoId);

        const reactionExist = await reactionController.findOneWhere({
            ...whereOption,
        });

        return sendSuccess(req, res, 200, { reaction: reactionExist });
    } catch (err) {
        sendError(req, res);
    }
});

router.post(apiUrlBuilderV1.createCustomUrl(resource), async (req, res) => {
    try {
        if (!req.user) return sendError(req, res, 401);

        // Check correct reactionType
        const reaction = req.body.reaction;
        if (!reaction)
            return sendError(req, res, 404, "Variable 'emotion' is undefined.");
        if (!Object.values(Emotions).includes(Number(reaction)))
            return sendError(req, res, 404, "Bad reaction type");

        // Check correct query
        const { photoId, albumId } = req.query;
        if (
            (!photoId && !albumId) ||
            (photoId && albumId) ||
            (photoId && !isNumberString(String(photoId))) ||
            (albumId && !isNumberString(String(albumId)))
        )
            return sendError(
                req,
                res,
                400,
                "Require one of query params  [photoId or albumId] type number"
            );

        // ---- exist reaction in database ----
        let reactionExist = undefined;
        const userReactions = await reactionController.getByUserId(req.user.id);
        for (const reaction of userReactions) {
            if (reaction.album_id === Number(albumId)) {
                reactionExist = reaction;
                break;
            } else if (reaction.photo_id === Number(photoId)) {
                reactionExist = reaction;
                break;
            }
        }

        if (reactionExist) {
            await reactionController.updateById(Number(reactionExist.id), {
                reaction,
            });
        } else {
            const reactionData: ReactionType = {
                reaction,
            };
            reactionData.user_id = req.user.id;
            if (albumId) reactionData.album_id = Number(albumId);
            if (photoId) reactionData.photo_id = Number(photoId);

            await reactionController.create(reactionData);
        }

        sendSuccess(req, res, 201);
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

        const updated = await reactionController.updateById(Number(id), {
            reaction: updateData.reaction,
        } as Partial<ReactionType>);

        sendSuccess(req, res, 204);
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

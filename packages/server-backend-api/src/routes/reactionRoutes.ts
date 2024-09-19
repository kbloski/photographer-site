import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { isNumberString } from "../utils/validation";
import {
    albumController,
    photoController,
    reactionController,
} from "../controllers/controllers";
import { ReactionEmotions } from "shared/src/types/ReactionType";

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

// router.post(apiUrlBuilderV1.createUrlAdd(resource), async (req, res) => {
//     try {
//         const { photoId, albumId, reaction } = req.query;

//         if (
//             !reaction ||
//             !Object.values(ReactionEmotions).includes(Number(reaction))
//         )
//             return sendError(
//                 req,
//                 res,
//                 400,
//                 "Need query param reaction type number"
//             );

//         if (
//             (!photoId && !albumId) ||
//             (photoId && !isNumberString(photoId as string)) ||
//             (albumId && !isNumberString(albumId as string))
//         )
//             return sendError(
//                 req,
//                 res,
//                 400,
//                 "Param query (photoId or albumId) must be number"
//             );

//         if (photoId) {
//             const photoDb = await photoController.getById(Number(photoId));
//             if (!photoDb)
//                 return sendError(req, res, 404, "Not found photo in database");
//         } else if (albumId) {
//             const albumDb = await albumController.getById(Number(albumId));
//             if (!albumDb)
//                 return sendError(req, res, 404, "Not found album in database");
//         }

//         const reactionOption = Number(reaction) as ReactionEmotions;
//         const reactionDb = await reactionController.create({
//             reaction: reactionOption,
//             user_id: Number(req.user?.id) ?? undefined,
//             album_id: Number(albumId) ?? undefined,
//             photo_id: Number(photoId) ?? undefined,
//         });

//         sendSuccess(req, res, 200, { reaction: reactionDb });
//     } catch (err) {
//         console.error(err);
//         sendError(req, res);
//     }
// });

// router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
//     // const { id } = req.params;
//     // if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");
//     // delete req.body.id;
//     // const albumUpdate: Omit<AlbumType, "id"> = req.body;
//     // AlbumSchema.partial().parse(albumUpdate);
//     // const update = await albumController.updateById(Number(id), albumUpdate);
//     // sendSuccess(req, res, 204);
// });

// router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
//     // try {
//     //     const { id } = req.params;
//     //     if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");
//     //     await albumController.deleteById(Number(id));
//     //     sendSuccess(req, res, 204);
//     // } catch (err) {
//     //     sendError(req, res);
//     // }
// });

export default router;

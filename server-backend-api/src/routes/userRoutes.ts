import express from 'express';
import { apiUrlBuilderV1 } from '../services/ApiUrlBuilder';
import { sendError, sendSuccess } from '../utils/responseUtils';

const router = express.Router();
const resource = 'user';

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        sendSuccess(req, res, 200, { users: []})
    } catch (err){
        console.error(err);
        sendError(req, res, 500, 'Internal Server Error');
    }
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    // pobierz zasób o podanym id
});

router.post(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    // zapisz zasób na serwerze
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    // Update zasobu
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    // usuń zaób
});

export default router;
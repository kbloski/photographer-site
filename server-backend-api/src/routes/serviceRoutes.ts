import express from 'express';
import { apiUrlBuilderV1 } from '../services/ApiUrlBuilder';

const router = express.Router();
const resource = 'service';

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    // pobierz wszytskie zasoby
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
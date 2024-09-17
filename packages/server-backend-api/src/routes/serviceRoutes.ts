import express from "express";
import { apiUrlBuilderV1 } from "../services/ApiUrlBuilder";
import { sendError, sendSuccess } from "../utils/responseUtils";
import { ServiceType } from "../types/ServiceType";
import { serviceController } from "../controllers/controllers";
import { isNumberString } from "../utils/validation";
import { ServiceSchema } from "../schemas/ServiceSchema";
import { z } from "zod";
import { generateZodErrorString } from "../utils/zodErrorsUtils";

const router = express.Router();
const resource = "service";

router.get(apiUrlBuilderV1.createUrlAll(resource), async (req, res) => {
    try {
        const servicesDb: ServiceType[] | null =
            await serviceController.getAll();

        if (!servicesDb || ![].length) return sendError(req, res, 404);
        sendSuccess(req, res, 200, { services: servicesDb });
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

router.get(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 300, "id: bad id");

        const userDb = await serviceController.getById(Number(id));
        if (!userDb) return sendError(req, res, 404);

        sendSuccess(req, res, 200, { user: userDb });
    } catch (err) {
        sendError(req, res);
    }
});

router.post(apiUrlBuilderV1.createUrlAdd(resource), async (req, res) => {
    try {
        delete req.body.id;
        if (req.body.price) req.body.price = Number(req.body.price);

        const serviceData: Omit<ServiceType, "id"> = req.body;
        ServiceSchema.parse(serviceData);

        const serviceDb = await serviceController.create(serviceData);
        sendSuccess(req, res, 201, { service: serviceDb });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return sendError(req, res, 400, generateZodErrorString(err));
        }
        sendError(req, res);
    }
});

router.patch(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        delete req.body.id;
        const serviceData: Omit<ServiceType, "id"> = req.body;
        ServiceSchema.partial().parse(req.body);

        const update = await serviceController.updateById(
            Number(id),
            serviceData
        );
        sendSuccess(req, res, 204);
    } catch (err) {}
});

router.delete(apiUrlBuilderV1.createUrlWithId(resource), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumberString(id)) return sendError(req, res, 400, "id: bad id");

        await serviceController.deleteById(Number(id));
        sendError(req, res, 204);
    } catch (err) {
        console.error(err);
        sendError(req, res);
    }
});

export default router;

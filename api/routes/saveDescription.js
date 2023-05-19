import { Router } from "express";
import gallery from "../../models/gallery.js";
import { GalleryService } from "../../services/gallery.js";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";

const route = Router();

export default (app) => {
    app.use("/saveDescription", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { id, description } = req.body;
                const GalleryServiceInstance = new GalleryService({ gallery });
                const result = await GalleryServiceInstance.saveGalleryDescription(id, description);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: result,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "갤러리 이미지 설명글 저장에 실패했습니다",
                    data: String(error),
                });
            }
    }));
};
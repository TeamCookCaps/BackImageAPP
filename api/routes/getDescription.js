import { Router } from "express";
import gallery from "../../models/gallery.js";
import { GalleryService } from "../../services/gallery.js";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";

const route = Router();

export default (app) => {
    app.use("/getDescription", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { id } = req.body;
                const GalleryServiceInstance = new GalleryService({ gallery });
                const result = await GalleryServiceInstance.getGalleryDescription(id);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: result,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "갤러리 이미지 설명글 조회에 실패했습니다",
                    data: String(error),
                });
            }
    }));
};
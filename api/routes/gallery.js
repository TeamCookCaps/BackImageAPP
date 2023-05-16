import { Router } from "express";
import gallery from "../../models/gallery.js";
import { GalleryService } from "../../services/gallery.js";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";

const route = Router();

export default (app) => {
    app.use("/gallery", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { uid } = req.body;
                const GalleryServiceInstance = new GalleryService({ gallery });
                const galleryImgInfo = await GalleryServiceInstance.getGalleryImage(uid);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: galleryImgInfo,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "갤러리 이미지 조회에 실패했습니다",
                    data: String(error),
                });
            }
    }));
};
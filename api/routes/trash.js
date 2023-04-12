import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import ImageInfo from "../../models/imageInfo.js";
import { DeleteService } from "../../services/delete.js";

const route = Router();

export default (app) => {
    app.use("/trash", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { uid } = req.body;
                const deleteServiceInstance = new DeleteService({ ImageInfo });
                const trashImageInfo = await deleteServiceInstance.getTrashImage(uid);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: trashImageInfo,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "휴지통 이미지 조회에 실패했습니다",
                    data: String(error),
                });
            }
        })
    );
};

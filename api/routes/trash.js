import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import trash from "../../models/trash.js";
import { TrashService } from "../../services/trash.js";

const route = Router();

export default (app) => {
    app.use("/trash", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { uid } = req.body;
                const trashServiceInstance = new TrashService({ trash });
                const trashImageInfo = await trashServiceInstance.getTrashImage(uid);
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

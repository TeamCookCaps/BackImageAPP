import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import trash from "../../models/trash.js";
import { TrashService } from "../../services/trash.js";

const route = Router();

export default (app) => {
    app.use("/restoreAll", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { trashId } = req.body;
                const trashServiceInstance = new TrashService({ trash });
                const result = await trashServiceInstance.restoreAllImage(trashId);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: result,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "휴지통 전체 복구가 실패했습니다",
                    data: String(error),
                });
            }
        })
    );
};

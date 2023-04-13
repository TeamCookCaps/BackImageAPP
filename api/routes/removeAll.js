import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import removeImage from "../../models/removeImage.js";
import { DeleteService } from "../../services/delete.js";

const route = Router();

export default (app) => {
    app.use("/removeAll", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { trashId } = req.body;
                const deleteServiceInstance = new DeleteService({ removeImage });
                const result = await deleteServiceInstance.removeAllImage(trashId);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: result,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "휴지통 전체 삭제가 실패했습니다",
                    data: String(error),
                });
            }
        })
    );
};

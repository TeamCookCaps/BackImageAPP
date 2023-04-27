import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import recommand from "../../models/recommand.js";
import { RecommandImageService } from "../../services/recommand.js";

const route = Router();

export default (app) => {
    app.use("/recommand", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { uid } = req.body;
                const recommandImageServiceInstance = new RecommandImageService({recommand})
                const recommandImageInfo = await recommandImageServiceInstance.getRecommandImage(uid);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: recommandImageInfo,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "배경 추천화면 조회에 실패했습니다",
                    data: String(error),
                });
            }
        })
    );
};

import { Router } from "express";
import story from "../../models/story.js";
import { StoryService } from "../../services/story.js";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";

const route = Router();

export default (app) => {
    app.use("/story", route);

    route.post("/", asyncErrorWrapper(async (req, res, next) => {
            try {
                const { uid } = req.body;
                const StoryServiceInstance = new StoryService({ story });
                const storyImgInfo = await StoryServiceInstance.getStoryImage(uid);
                res.status(201).json({
                    location: "success",
                    msg: null,
                    data: storyImgInfo,
                });
            } catch (error) {
                res.status(400).json({
                    location: "error",
                    msg: "스토리 이미지 조회에 실패했습니다",
                    data: String(error),
                });
            }
    }));
};
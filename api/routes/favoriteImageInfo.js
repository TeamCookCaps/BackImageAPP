import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import ImageInfo from "../../models/imageInfo.js";
import { ImageInfoService } from "../../services/imageInfo.js";

const route = Router();

export default (app) => {
  app.use("/favoriteImages", route);

  route.post(
    "/",
    asyncErrorWrapper(async (req, res, next) => {
      try {
        const { uid } = req.body;
        const imageInfoServiceInstance = new ImageInfoService({ ImageInfo });
        const imageInfo = await imageInfoServiceInstance.getFavoriteImageInfo(uid);
        res.status(201).json({
          location: "success",
          msg: null,
          data: imageInfo,
        });
      } catch (error) {
        res.status(400).json({
          location: "error",
          msg: "좋아요 이미지 정보 조회에 실패했습니다",
          data: String(error),
        });
      }
    })
  );
};

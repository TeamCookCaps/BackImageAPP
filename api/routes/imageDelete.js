import { Router } from "express";
import { asyncErrorWrapper } from "../../asyncErrorWrapper.js";
import trash from "../../models/trash.js";
import { TrashService } from "../../services/trash.js";

const route = Router();

export default (app) => {
  app.use("/delete", route);

  route.post(
    "/",
    asyncErrorWrapper(async (req, res) => {
      try {
        const { uid, trashId } = req.body;
        console.log(uid + "님이 휴지통에 삭제한 사진은 " + trashId + "입니다");
        console.log(req);
        const trashServiceInstance = new TrashService({ trash });
        const imageDelete = await trashServiceInstance.removeOneImage(
          uid,
          trashId
        );
        res.status(201).json({
          location: "success",
          msg: null,
          data: imageDelete,
        });
      } catch (error) {
        res.status(400).json({
          location: "error",
          msg: "삭제 실패했습니다",
          data: String(error),
        });
      }
    })
  );
};

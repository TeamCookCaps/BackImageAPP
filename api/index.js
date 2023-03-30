import { Router } from "express";
import user from "./routes/user.js";
import ImageInfo from "./routes/imageInfo.js";

export default () => {
  const app = Router();
  user(app);
  ImageInfo(app);
  return app;
};
